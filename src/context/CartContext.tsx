import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  customName?: string;
  customNumber?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity: number, size?: string, customName?: string, customNumber?: string) => void;
  removeItem: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  total: number;
  discount: number;
  finalTotal: number;
  itemCount: number;
  promoLabel: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, quantity: number, size?: string, customName?: string, customNumber?: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.size === size && i.customName === customName && i.customNumber === customNumber
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size && i.customName === customName && i.customNumber === customNumber
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity, size, customName, customNumber }];
    });
  };

  const removeItem = (productId: string, size?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.size === size))
    );
  };

  const updateQuantity = (productId: string, quantity: number, size?: string) => {
    if (quantity <= 0) return removeItem(productId, size);
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.size === size
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const CUSTOM_FEE = 19.90;
  const total = items.reduce((sum, i) => {
    const customExtra = (i.customName || i.customNumber) ? CUSTOM_FEE : 0;
    return sum + (i.product.price + customExtra) * i.quantity;
  }, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  // Promo: leve 3 pague 2 → menor item grátis; leve 6 pague 3 → 3 menores grátis
  const discount = (() => {
    if (itemCount < 3) return 0;
    // Expand items by quantity into individual prices, sorted ascending
    const allPrices: number[] = [];
    items.forEach((i) => {
      for (let q = 0; q < i.quantity; q++) allPrices.push(i.product.price);
    });
    allPrices.sort((a, b) => a - b);

    if (itemCount >= 6) {
      // 3 cheapest free
      return allPrices.slice(0, 3).reduce((s, p) => s + p, 0);
    }
    // 1 cheapest free
    return allPrices[0];
  })();

  const finalTotal = total - discount;
  const promoLabel = itemCount >= 6 ? "Leve 6 Pague 3" : itemCount >= 3 ? "Leve 3 Pague 2" : "";

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, discount, finalTotal, itemCount, promoLabel }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

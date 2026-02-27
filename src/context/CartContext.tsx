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
  shipping: number;
  finalTotal: number;
  itemCount: number;
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
    const isFree = i.product.freeCustomization;
    const customExtra = (!isFree && (i.customName || i.customNumber)) ? CUSTOM_FEE : 0;
    return sum + (i.product.price + customExtra) * i.quantity;
  }, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const SHIPPING_FEE = 39.90;
  const shipping = itemCount >= 3 ? 0 : (itemCount > 0 ? SHIPPING_FEE : 0);
  const finalTotal = total + shipping;

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, shipping, finalTotal, itemCount }}
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

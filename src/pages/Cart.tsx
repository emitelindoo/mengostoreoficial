import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingCart, Gift, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { fbEvent } from "@/lib/fbpixel";

const Cart = () => {
  const { items, updateQuantity, removeItem, total, discount, shipping, finalTotal, itemCount } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (items.length > 0) {
      fbEvent("ViewContent", {
        content_ids: items.map(i => i.product.id),
        contents: items.map(i => ({ id: i.product.id, quantity: i.quantity })),
        content_type: "product",
        value: total,
        currency: "BRL",
      });
    }
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 px-4 flex items-center justify-center min-h-[70vh]">
          <div className="text-center">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-display font-bold mb-2">Seu carrinho está vazio</h1>
            <p className="text-muted-foreground mb-6">Adicione produtos para continuar</p>
            <Link
              to="/#produtos"
              className="inline-block px-8 py-3 bg-primary hover:bg-aura-dark-blue text-primary-foreground font-display font-semibold rounded-lg transition-colors"
            >
              Ver Produtos
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link to="/#produtos" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Continuar comprando
          </Link>

          {/* Promo Banner */}
          {itemCount < 3 && (
            <div className="mb-6">
              <div className="bg-aura-cyan/10 border border-aura-cyan/30 rounded-xl p-4 flex items-center gap-3">
                <Gift className="w-6 h-6 text-aura-cyan flex-shrink-0" />
                <div>
                  <p className="font-display font-bold text-foreground text-sm">🔥 LEVE 3, PAGUE 2!</p>
                  <p className="text-xs text-muted-foreground">Adicione {3 - itemCount} {3 - itemCount === 1 ? "produto" : "produtos"} a mais e o menor valor sai de graça!</p>
                </div>
              </div>
            </div>
          )}
          {itemCount >= 3 && itemCount < 6 && (
            <div className="mb-6">
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-display font-bold text-foreground text-sm">⚡ LEVE 6, PAGUE 3!</p>
                  <p className="text-xs text-muted-foreground">Adicione {6 - itemCount} {6 - itemCount === 1 ? "produto" : "produtos"} a mais e pague apenas metade!</p>
                </div>
              </div>
            </div>
          )}

          <h1 className="text-2xl md:text-3xl font-display font-bold mb-8 flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-primary" /> Carrinho ({itemCount} {itemCount === 1 ? "item" : "itens"})
          </h1>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="bg-card border border-border rounded-xl p-4 flex gap-4"
                >
                  <Link to={`/produto/${item.product.id}`}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-contain rounded-lg bg-secondary flex-shrink-0"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/produto/${item.product.id}`}>
                      <h3 className="font-semibold text-foreground text-sm line-clamp-2 hover:text-primary transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    {item.size && (
                      <p className="text-xs text-muted-foreground mt-1">Tamanho: {item.size}</p>
                    )}
                    {(item.customName || item.customNumber) && (
                      <p className="text-xs text-primary mt-1 font-semibold">
                        Personalizado: {item.customName && `${item.customName}`}{item.customName && item.customNumber && " • "}{item.customNumber && `Nº ${item.customNumber}`} {item.product.freeCustomization ? "(grátis)" : "(+R$ 19,90)"}
                      </p>
                    )}
                    <p className="text-primary font-bold mt-2">
                      R$ {item.product.price.toFixed(2).replace(".", ",")}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size)}
                          className="w-8 h-8 rounded-lg border border-border bg-secondary flex items-center justify-center hover:border-primary/50 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-display font-bold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size)}
                          className="w-8 h-8 rounded-lg border border-border bg-secondary flex items-center justify-center hover:border-primary/50 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h2 className="font-display font-bold text-lg mb-4">Resumo</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({itemCount} itens)</span>
                    <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-500">
                      <span>Desconto promoção</span>
                      <span>- R$ {discount.toFixed(2).replace(".", ",")}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete</span>
                    {shipping === 0 ? (
                      <span className="text-primary font-semibold">Grátis</span>
                    ) : (
                      <span className="text-foreground">R$ {shipping.toFixed(2).replace(".", ",")}</span>
                    )}
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-primary">🚚 Frete grátis a partir de 3 itens!</p>
                  )}
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-border pt-4">
                  <span>Total</span>
                  <span className="text-primary">R$ {finalTotal.toFixed(2).replace(".", ",")}</span>
                </div>

                <Link
                  to="/checkout"
                  onClick={() => {
                    fbEvent("InitiateCheckout", {
                      content_ids: items.map(i => i.product.id),
                      contents: items.map(i => ({ id: i.product.id, quantity: i.quantity })),
                      content_type: "product",
                      value: finalTotal,
                      currency: "BRL",
                      num_items: itemCount,
                    });
                  }}
                  className="block w-full mt-6 py-4 bg-primary hover:bg-aura-dark-blue text-primary-foreground font-display font-bold text-lg tracking-wider rounded-lg transition-all duration-300 animate-pulse-glow text-center"
                >
                  FINALIZAR COMPRA
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;

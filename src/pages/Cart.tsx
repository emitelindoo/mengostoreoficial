import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingCart, Gift, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { fbEvent } from "@/lib/fbpixel";

const Cart = () => {
  const { items, updateQuantity, removeItem, total, shipping, finalTotal, itemCount } = useCart();
  const [cep, setCep] = useState("");
  const [shippingCalculated, setShippingCalculated] = useState(false);
  const [calculatingCep, setCalculatingCep] = useState(false);
  const freeShipping = itemCount >= 3;

  const handleCalculateShipping = () => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length !== 8) return;
    setCalculatingCep(true);
    setTimeout(() => {
      setShippingCalculated(true);
      setCalculatingCep(false);
    }, 800);
  };

  const maskCEP = (v: string) => v.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");

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

          {/* Shipping Banner */}
          {itemCount > 0 && itemCount < 3 && (
            <div className="mb-6">
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 flex items-center gap-3">
                <Gift className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="font-display font-bold text-foreground text-sm">🚚 FRETE GRÁTIS A PARTIR DE 3 ITENS!</p>
                  <p className="text-xs text-muted-foreground">Adicione {3 - itemCount} {3 - itemCount === 1 ? "produto" : "produtos"} a mais e ganhe frete grátis!</p>
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
                  {/* CEP Shipping Calculator */}
                  {freeShipping ? (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frete</span>
                      <span className="text-primary font-semibold">Grátis 🎉</span>
                    </div>
                  ) : !shippingCalculated ? (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Calcular frete:</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="00000-000"
                          value={cep}
                          onChange={(e) => setCep(maskCEP(e.target.value))}
                          maxLength={9}
                          inputMode="numeric"
                          className="flex-1 px-3 py-2 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <button
                          onClick={handleCalculateShipping}
                          disabled={cep.replace(/\D/g, "").length !== 8 || calculatingCep}
                          className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-aura-dark-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                        >
                          {calculatingCep ? (
                            <span className="animate-spin">⏳</span>
                          ) : (
                            <><Truck className="w-4 h-4" /> Calcular</>
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-primary mt-1.5">🚚 Frete grátis a partir de 3 itens!</p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Frete (SEDEX) — CEP {cep}</span>
                        <span className="text-foreground font-semibold">R$ {shipping.toFixed(2).replace(".", ",")}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-muted-foreground">Prazo: 7 dias úteis</p>
                        <button onClick={() => { setShippingCalculated(false); setCep(""); }} className="text-xs text-primary hover:underline">Alterar CEP</button>
                      </div>
                      <p className="text-xs text-primary mt-1">🚚 Frete grátis a partir de 3 itens!</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-border pt-4">
                  <span>Total</span>
                  <span className="text-primary">R$ {(shippingCalculated || freeShipping ? finalTotal : total).toFixed(2).replace(".", ",")}</span>
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

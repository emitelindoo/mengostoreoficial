import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShieldCheck, Truck, ArrowLeft, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";

const Checkout = () => {
  const { items, total, discount, finalTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", email: "", phone: "", cpf: "",
    cep: "", street: "", number: "", complement: "",
    neighborhood: "", city: "", state: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (items.length === 0 && !submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Carrinho vazio</h1>
          <Link to="/#produtos" className="text-primary hover:underline">Voltar aos produtos</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 px-4 flex items-center justify-center min-h-[80vh]">
          <div className="max-w-md text-center">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-display font-bold mb-4">Pedido Confirmado! 🔥</h1>
            <p className="text-muted-foreground mb-2">Obrigado pela compra, {form.name.split(" ")[0]}!</p>
            <p className="text-muted-foreground mb-8">Você receberá os detalhes do pedido no email <span className="text-foreground font-semibold">{form.email}</span></p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-primary hover:bg-flamengo-dark-red text-primary-foreground font-display font-semibold rounded-lg transition-colors"
            >
              Voltar à Loja
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>

          <h1 className="text-2xl md:text-3xl font-display font-bold mb-8 flex items-center gap-3">
            <Lock className="w-6 h-6 text-primary" /> Checkout Seguro
          </h1>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
            {/* Form */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-display font-bold text-lg mb-4">Dados Pessoais</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required placeholder="Nome completo" value={form.name} onChange={(e) => updateField("name", e.target.value)} className="col-span-2 w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                  <input required type="email" placeholder="Email" value={form.email} onChange={(e) => updateField("email", e.target.value)} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                  <input required placeholder="Telefone" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                  <input required placeholder="CPF" value={form.cpf} onChange={(e) => updateField("cpf", e.target.value)} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-display font-bold text-lg mb-4">Endereço de Entrega</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required placeholder="CEP" value={form.cep} onChange={(e) => updateField("cep", e.target.value)} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                  <div />
                  <input required placeholder="Rua" value={form.street} onChange={(e) => updateField("street", e.target.value)} className="col-span-2 w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                  <input required placeholder="Número" value={form.number} onChange={(e) => updateField("number", e.target.value)} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                  <input placeholder="Complemento" value={form.complement} onChange={(e) => updateField("complement", e.target.value)} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                  <input required placeholder="Bairro" value={form.neighborhood} onChange={(e) => updateField("neighborhood", e.target.value)} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                  <input required placeholder="Cidade" value={form.city} onChange={(e) => updateField("city", e.target.value)} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                  <input required placeholder="Estado" value={form.state} onChange={(e) => updateField("state", e.target.value)} className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h2 className="font-display font-bold text-lg mb-4">Resumo do Pedido</h2>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-contain rounded-lg bg-secondary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground line-clamp-2">{item.product.name}</p>
                        {item.size && <p className="text-xs text-muted-foreground">Tam: {item.size}</p>}
                        <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                        <p className="text-sm text-primary font-bold">R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-emerald-500">
                      <span>Desconto promoção</span>
                      <span>- R$ {discount.toFixed(2).replace(".", ",")}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete</span>
                    <span className="text-primary font-semibold">Grátis</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-border pt-3 mt-3">
                    <span>Total</span>
                    <span className="text-primary">R$ {finalTotal.toFixed(2).replace(".", ",")}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-4 bg-primary hover:bg-flamengo-dark-red text-primary-foreground font-display font-bold text-lg tracking-wider rounded-lg transition-all duration-300 animate-pulse-glow"
                >
                  FINALIZAR COMPRA
                </button>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-primary" /> Compra 100% segura
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Truck className="w-4 h-4 text-primary" /> Entrega garantida
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Checkout;

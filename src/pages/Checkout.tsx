import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ShieldCheck, Truck, ArrowLeft, Lock, User, MapPin, CreditCard, Check, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";

const steps = [
  { id: 1, label: "Dados Pessoais", icon: User },
  { id: 2, label: "Endereço", icon: MapPin },
  { id: 3, label: "Pagamento", icon: CreditCard },
];

const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace(".", ",")}`;

const Checkout = () => {
  const { items, total, discount, finalTotal, clearCart, itemCount } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", cpf: "",
    cep: "", street: "", number: "", complement: "",
    neighborhood: "", city: "", state: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

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

  const handleSubmit = () => {
    setSubmitted(true);
    clearCart();
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canAdvanceStep1 = form.name && form.email && form.phone && form.cpf;
  const canAdvanceStep2 = form.cep && form.street && form.number && form.neighborhood && form.city && form.state;

  const inputClass = "w-full px-4 py-3.5 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-sm";

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 px-4 flex items-center justify-center min-h-[80vh]">
          <div className="max-w-md text-center animate-fade-in">
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
        <div className="container mx-auto max-w-5xl">
          {/* Back button */}
          <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> {step > 1 ? "Voltar" : "Voltar ao carrinho"}
          </button>

          {/* Stepper */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-0">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const isActive = step === s.id;
                const isDone = step > s.id;
                return (
                  <div key={s.id} className="flex items-center">
                    <button
                      onClick={() => isDone && setStep(s.id)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                          : isDone
                            ? "bg-primary/15 text-primary cursor-pointer hover:bg-primary/25"
                            : "bg-secondary/50 text-muted-foreground"
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        isActive ? "bg-primary-foreground/20" : isDone ? "bg-primary/20" : "bg-muted"
                      }`}>
                        {isDone ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                      </div>
                      <span className="font-display font-semibold text-sm hidden sm:inline">{s.label}</span>
                    </button>
                    {i < steps.length - 1 && (
                      <div className={`w-8 md:w-16 h-0.5 mx-1 rounded-full transition-colors duration-300 ${
                        step > s.id ? "bg-primary" : "bg-border"
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form Area */}
            <div className="lg:col-span-3">
              {/* Step 1: Dados Pessoais */}
              {step === 1 && (
                <div className="animate-fade-in">
                  <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-display font-bold text-lg">Dados Pessoais</h2>
                        <p className="text-xs text-muted-foreground">Preencha seus dados para entrega</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Nome completo</label>
                        <input required placeholder="Ex: João da Silva" value={form.name} onChange={(e) => updateField("name", e.target.value)} className={inputClass} />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                          <input required type="email" placeholder="seu@email.com" value={form.email} onChange={(e) => updateField("email", e.target.value)} className={inputClass} />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Telefone</label>
                          <input required placeholder="(11) 99999-9999" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className={inputClass} />
                        </div>
                      </div>
                      <div className="sm:w-1/2">
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">CPF</label>
                        <input required placeholder="000.000.000-00" value={form.cpf} onChange={(e) => updateField("cpf", e.target.value)} className={inputClass} />
                      </div>
                    </div>
                    <button
                      onClick={() => canAdvanceStep1 && setStep(2)}
                      disabled={!canAdvanceStep1}
                      className="w-full mt-8 py-4 bg-primary hover:bg-flamengo-dark-red text-primary-foreground font-display font-bold text-base tracking-wider rounded-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      Continuar <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Endereço */}
              {step === 2 && (
                <div className="animate-fade-in">
                  <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-display font-bold text-lg">Endereço de Entrega</h2>
                        <p className="text-xs text-muted-foreground">Para onde devemos enviar?</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="sm:w-1/2">
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">CEP</label>
                        <input required placeholder="00000-000" value={form.cep} onChange={(e) => updateField("cep", e.target.value)} className={inputClass} />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Rua</label>
                        <input required placeholder="Nome da rua" value={form.street} onChange={(e) => updateField("street", e.target.value)} className={inputClass} />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Número</label>
                          <input required placeholder="123" value={form.number} onChange={(e) => updateField("number", e.target.value)} className={inputClass} />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Complemento</label>
                          <input placeholder="Apto, bloco... (opcional)" value={form.complement} onChange={(e) => updateField("complement", e.target.value)} className={inputClass} />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Bairro</label>
                        <input required placeholder="Seu bairro" value={form.neighborhood} onChange={(e) => updateField("neighborhood", e.target.value)} className={inputClass} />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Cidade</label>
                          <input required placeholder="Sua cidade" value={form.city} onChange={(e) => updateField("city", e.target.value)} className={inputClass} />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Estado</label>
                          <input required placeholder="UF" value={form.state} onChange={(e) => updateField("state", e.target.value)} className={inputClass} />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => canAdvanceStep2 && setStep(3)}
                      disabled={!canAdvanceStep2}
                      className="w-full mt-8 py-4 bg-primary hover:bg-flamengo-dark-red text-primary-foreground font-display font-bold text-base tracking-wider rounded-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      Continuar <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmação */}
              {step === 3 && (
                <div className="animate-fade-in">
                  <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-display font-bold text-lg">Confirmar Pedido</h2>
                        <p className="text-xs text-muted-foreground">Revise seus dados e finalize</p>
                      </div>
                    </div>

                    {/* Review cards */}
                    <div className="space-y-4 mb-6">
                      <div className="bg-secondary/30 rounded-xl p-4 flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Dados Pessoais</p>
                          <p className="text-sm font-semibold">{form.name}</p>
                          <p className="text-xs text-muted-foreground">{form.email} · {form.phone}</p>
                        </div>
                        <button onClick={() => setStep(1)} className="text-xs text-primary hover:underline font-semibold">Editar</button>
                      </div>
                      <div className="bg-secondary/30 rounded-xl p-4 flex items-start justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Endereço de Entrega</p>
                          <p className="text-sm font-semibold">{form.street}, {form.number}</p>
                          <p className="text-xs text-muted-foreground">{form.neighborhood} · {form.city}/{form.state} · CEP {form.cep}</p>
                        </div>
                        <button onClick={() => setStep(2)} className="text-xs text-primary hover:underline font-semibold">Editar</button>
                      </div>
                    </div>

                    {/* Products list */}
                    <div className="border-t border-border pt-4 mb-6">
                      <p className="text-xs text-muted-foreground mb-3 font-medium">Produtos ({itemCount} {itemCount === 1 ? "item" : "itens"})</p>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div key={`${item.product.id}-${item.size}`} className="flex gap-3 items-center">
                            <img src={item.product.image} alt={item.product.name} className="w-14 h-14 object-contain rounded-lg bg-secondary" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-foreground line-clamp-1">{item.product.name}</p>
                              <p className="text-xs text-muted-foreground">{item.size && `Tam: ${item.size} · `}Qtd: {item.quantity}</p>
                            </div>
                            <p className="text-sm text-primary font-bold whitespace-nowrap">{formatCurrency(item.product.price * item.quantity)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Totals */}
                    <div className="border-t border-border pt-4 mb-6 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatCurrency(total)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm text-emerald-500 font-semibold">
                          <span>Desconto promoção 🔥</span>
                          <span>- {formatCurrency(discount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Frete</span>
                        <span className="text-emerald-500 font-semibold">Grátis</span>
                      </div>
                      <div className="flex justify-between font-bold text-xl border-t border-border pt-3 mt-2">
                        <span>Total</span>
                        <span className="text-primary">{formatCurrency(finalTotal)}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="w-full py-4 bg-primary hover:bg-flamengo-dark-red text-primary-foreground font-display font-bold text-lg tracking-wider rounded-xl transition-all duration-300 animate-pulse-glow flex items-center justify-center gap-2"
                    >
                      <Lock className="w-5 h-5" /> FINALIZAR COMPRA
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                <h2 className="font-display font-bold text-lg mb-4">Resumo do Pedido</h2>

                {/* Items mini list */}
                <div className="space-y-3 mb-5 max-h-48 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-contain rounded-lg bg-secondary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground line-clamp-1">{item.product.name}</p>
                        {item.size && <p className="text-[10px] text-muted-foreground">Tam: {item.size}</p>}
                        <div className="flex justify-between items-center">
                          <p className="text-[10px] text-muted-foreground">Qtd: {item.quantity}</p>
                          <p className="text-xs text-primary font-bold">{formatCurrency(item.product.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-emerald-500">
                      <span>Desconto promoção 🔥</span>
                      <span>- {formatCurrency(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete</span>
                    <span className="text-emerald-500 font-semibold">Grátis</span>
                  </div>
                  <div className="flex justify-between font-bold text-xl border-t border-border pt-4 mt-3">
                    <span>Total</span>
                    <span className="text-primary">{formatCurrency(finalTotal)}</span>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="mt-6 space-y-2.5 border-t border-border pt-5">
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Compra 100% segura e protegida</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <Truck className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>Entrega garantida para todo Brasil</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <Lock className="w-4 h-4 text-flamengo-gold flex-shrink-0" />
                    <span>Dados criptografados com SSL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;

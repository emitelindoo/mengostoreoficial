import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ShieldCheck, Truck, ArrowLeft, Lock, User, MapPin, CreditCard, Check, ChevronRight, Loader2, Copy, CheckCircle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { markPurchased } from "@/context/CartContext";
import { toast } from "sonner";
import { fbEvent, updatePixelUserData } from "@/lib/fbpixel";

const maskCPF = (v: string) => v.replace(/\D/g, "").slice(0, 11).replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 10) return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
};
const maskCEP = (v: string) => v.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");

const EMAIL_DOMAINS = ["@gmail.com", "@hotmail.com", "@outlook.com", "@yahoo.com.br", "@icloud.com", "@live.com"];

const UF_OPTIONS = [
  "AC","AL","AM","AP","BA","CE","DF","ES","GO","MA","MG","MS","MT","PA",
  "PB","PE","PI","PR","RJ","RN","RO","RR","RS","SC","SE","SP","TO"
];

const steps = [
  { id: 1, label: "Dados Pessoais", icon: User },
  { id: 2, label: "Endereço", icon: MapPin },
  { id: 3, label: "Pagamento", icon: CreditCard },
];

const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace(".", ",")}`;

const Checkout = () => {
  const { items, total, shipping, finalTotal, clearCart, itemCount, firstPurchaseDiscount } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", cpf: "",
    cep: "", street: "", number: "", complement: "",
    neighborhood: "", city: "", state: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pixData, setPixData] = useState<{ qrCode?: string; qrCodeUrl?: string; copyPaste?: string; transactionId?: number } | null>(null);
  const [pixCopied, setPixCopied] = useState(false);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [savedOrderId, setSavedOrderId] = useState<string | null>(null);
  const [savedOrderCode, setSavedOrderCode] = useState<string>("");
  const emailRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const fetchCep = async (cep: string) => {
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) return;
    setLoadingCep(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setForm(prev => ({
          ...prev,
          street: data.logradouro || prev.street,
          neighborhood: data.bairro || prev.neighborhood,
          city: data.localidade || prev.city,
          state: data.uf || prev.state,
        }));
      }
    } catch {} finally {
      setLoadingCep(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (emailRef.current && !emailRef.current.contains(e.target as Node)) setShowEmailSuggestions(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEmailChange = (value: string) => {
    updateField("email", value);
    const atIndex = value.indexOf("@");
    if (atIndex > 0) {
      const typed = value.slice(atIndex);
      const matches = EMAIL_DOMAINS.filter(d => d.startsWith(typed) && d !== typed);
      setEmailSuggestions(matches.map(d => value.slice(0, atIndex) + d));
      setShowEmailSuggestions(matches.length > 0);
    } else if (value.length > 0 && !value.includes("@")) {
      setEmailSuggestions(EMAIL_DOMAINS.map(d => value + d));
      setShowEmailSuggestions(true);
    } else {
      setShowEmailSuggestions(false);
    }
  };

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

  const saveOrderToDb = async (orderCode: string, transactionId?: string | number, status = "pending_payment") => {
    try {
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          order_code: orderCode,
          customer_name: form.name,
          customer_email: form.email.toLowerCase(),
          customer_phone: form.phone,
          customer_cpf: form.cpf,
          address_street: form.street,
          address_number: form.number,
          address_complement: form.complement || null,
          address_neighborhood: form.neighborhood,
          address_city: form.city,
          address_state: form.state,
          address_cep: form.cep,
          subtotal: total,
          shipping,
          discount: firstPurchaseDiscount,
          total: finalTotal,
          status: status as any,
          transaction_id: transactionId ? String(transactionId) : null,
        })
        .select("id")
        .single();

      if (orderError) { console.error("Order save error:", orderError); return null; }

      const orderItems = items.map((item) => ({
        order_id: orderData.id,
        product_name: item.product.name,
        product_id: item.product.id,
        size: item.size || null,
        quantity: item.quantity,
        unit_price: item.product.price,
        custom_name: item.customName || null,
        custom_number: item.customNumber || null,
      }));

      await supabase.from("order_items").insert(orderItems);
      return orderData.id;
    } catch (err) {
      console.error("Save order error:", err);
      return null;
    }
  };




  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-payment", {
        body: {
          amount: finalTotal,
          customer: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            cpf: form.cpf,
          },
          items: items.map((item) => ({
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
          })),
          address: {
            street: form.street,
            number: form.number,
            complement: form.complement,
            neighborhood: form.neighborhood,
            city: form.city,
            state: form.state,
            cep: form.cep,
          },
        },
      });

      if (error) throw error;

      if (data?.status === "refused" || data?.status === "error") {
        const reason = data?.refusedReason?.description || "Transação recusada. Verifique seus dados e tente novamente.";
        toast.error(reason);
        return;
      }

      const pixQrCode = data?.pix?.qrcode;
      const transactionId = data?.id;

      if (pixQrCode) {
        // Generate order code and save to DB
        const orderCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        setSavedOrderCode(orderCode);
        const orderId = await saveOrderToDb(orderCode, transactionId, "pending_payment");
        setSavedOrderId(orderId);

        setPixData({
          qrCode: pixQrCode,
          copyPaste: pixQrCode,
          transactionId: transactionId,
        });
        fbEvent("AddPaymentInfo", {
          content_ids: items.map(i => i.product.id),
          contents: items.map(i => ({ id: i.product.id, quantity: i.quantity })),
          content_type: "product",
          value: finalTotal,
          currency: "BRL",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (data?.status === "paid") {
        const orderCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        setSavedOrderCode(orderCode);
        await saveOrderToDb(orderCode, data?.id, "paid");
        setSubmitted(true);
        markPurchased();
        clearCart();
      } else {
        toast.error("Não foi possível gerar o PIX. Tente novamente.");
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      toast.error("Erro ao processar pagamento. Tente novamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyPix = () => {
    if (pixData?.copyPaste) {
      navigator.clipboard.writeText(pixData.copyPaste);
      setPixCopied(true);
      toast.success("Código PIX copiado!");
      setTimeout(() => setPixCopied(false), 3000);
    }
  };

  const handleConfirmPixPayment = async () => {
    if (!pixData?.transactionId) return;
    setCheckingPayment(true);
    try {
      const { data, error } = await supabase.functions.invoke("check-payment", {
        body: { transactionId: pixData.transactionId },
      });
      if (error) throw error;

      if (data?.status === "paid") {
        // Update order status in DB
        if (savedOrderId) {
          await supabase.from("orders").update({ status: "paid" as any }).eq("id", savedOrderId);
        }
        fbEvent("Purchase", {
          content_ids: items.map(i => i.product.id),
          contents: items.map(i => ({ id: i.product.id, quantity: i.quantity })),
          content_type: "product",
          value: finalTotal,
          currency: "BRL",
          num_items: itemCount,
        });
        setSubmitted(true);
        markPurchased();
        clearCart();
        toast.success("Pagamento confirmado! 🎉");
      } else {
        toast.error("Pagamento ainda não identificado. Aguarde alguns instantes e tente novamente.");
      }
    } catch (err: any) {
      console.error("Check payment error:", err);
      toast.error("Erro ao verificar pagamento. Tente novamente.");
    } finally {
      setCheckingPayment(false);
    }
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
            {savedOrderCode && (
              <div className="bg-primary/10 border border-primary/20 rounded-xl px-6 py-3 mb-4 inline-block">
                <p className="text-xs text-muted-foreground">Código do Pedido</p>
                <p className="text-2xl font-display font-bold text-primary">{savedOrderCode}</p>
              </div>
            )}
            <p className="text-muted-foreground mb-2">Obrigado pela compra, {form.name.split(" ")[0]}!</p>
            <p className="text-muted-foreground mb-6">Você receberá os detalhes do pedido no email <span className="text-foreground font-semibold">{form.email}</span></p>
            
            {/* Account creation prompt */}
            <div className="bg-card border border-border rounded-xl p-4 mb-6 text-left">
              <p className="text-sm font-semibold mb-1">📱 Quer acompanhar seus pedidos com facilidade?</p>
              <p className="text-xs text-muted-foreground mb-3">Crie uma conta gratuita com seu email e acompanhe todos os seus pedidos em um só lugar.</p>
              <Link
                to={`/login?email=${encodeURIComponent(form.email)}&redirect=/minha-conta`}
                className="inline-block px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-display font-semibold text-sm rounded-lg transition-colors"
              >
                Criar Conta Grátis
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/rastrear"
                className="inline-block px-8 py-3 bg-secondary hover:bg-secondary/80 text-foreground font-display font-semibold rounded-lg transition-colors"
              >
                Rastrear Pedido
              </Link>
              <Link
                to="/"
                className="inline-block px-8 py-3 bg-secondary hover:bg-secondary/80 text-foreground font-display font-semibold rounded-lg transition-colors"
              >
                Voltar à Loja
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="pt-24 pb-16 px-4 overflow-x-hidden">
        <div className="container mx-auto max-w-5xl">
          {/* Back button */}
          <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> {step > 1 ? "Voltar" : "Voltar ao carrinho"}
          </button>

          {/* Stepper */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-0 overflow-x-auto">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const isActive = step === s.id;
                const isDone = step > s.id;
                return (
                  <div key={s.id} className="flex items-center">
                    <button
                      onClick={() => isDone && setStep(s.id)}
                      className={`flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-300 flex-shrink-0 ${
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
                        <div ref={emailRef} className="relative">
                          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                          <input
                            required
                            type="email"
                            placeholder="seu@email.com"
                            value={form.email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            onFocus={() => form.email.length > 0 && handleEmailChange(form.email)}
                            className={inputClass}
                            autoComplete="off"
                          />
                          {showEmailSuggestions && emailSuggestions.length > 0 && (
                            <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                              {emailSuggestions.map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-primary/10 transition-colors text-foreground"
                                  onClick={() => { updateField("email", s); setShowEmailSuggestions(false); }}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Telefone</label>
                          <input required placeholder="(11) 99999-9999" value={form.phone} onChange={(e) => updateField("phone", maskPhone(e.target.value))} className={inputClass} inputMode="numeric" />
                        </div>
                      </div>
                      <div className="sm:w-1/2">
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">CPF</label>
                        <input required placeholder="000.000.000-00" value={form.cpf} onChange={(e) => updateField("cpf", maskCPF(e.target.value))} className={inputClass} inputMode="numeric" />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (!canAdvanceStep1) return;
                        const nameParts = form.name.trim().split(" ");
                        updatePixelUserData({
                          email: form.email,
                          phone: form.phone,
                          firstName: nameParts[0],
                          lastName: nameParts.length > 1 ? nameParts.slice(1).join(" ") : undefined,
                        });
                        setStep(2);
                      }}
                      disabled={!canAdvanceStep1}
                      className="w-full mt-8 py-4 bg-primary hover:bg-aura-dark-blue text-primary-foreground font-display font-bold text-base tracking-wider rounded-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                        <input required placeholder="00000-000" value={form.cep} onChange={(e) => { const v = maskCEP(e.target.value); updateField("cep", v); if (v.replace(/\D/g, "").length === 8) fetchCep(v); }} className={inputClass} inputMode="numeric" />
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
                          <select required value={form.state} onChange={(e) => updateField("state", e.target.value)} className={inputClass}>
                            <option value="">Selecione</option>
                            {UF_OPTIONS.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (!canAdvanceStep2) return;
                        updatePixelUserData({
                          email: form.email,
                          phone: form.phone,
                          firstName: form.name.trim().split(" ")[0],
                          lastName: form.name.trim().split(" ").slice(1).join(" ") || undefined,
                          city: form.city,
                          state: form.state,
                          zipCode: form.cep,
                        });
                        fbEvent("InitiateCheckout", {
                          content_ids: items.map(i => i.product.id),
                          contents: items.map(i => ({ id: i.product.id, quantity: i.quantity })),
                          content_type: "product",
                          value: finalTotal,
                          currency: "BRL",
                          num_items: itemCount,
                        });
                        setStep(3);
                      }}
                      disabled={!canAdvanceStep2}
                      className="w-full mt-8 py-4 bg-primary hover:bg-aura-dark-blue text-primary-foreground font-display font-bold text-base tracking-wider rounded-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

                    {!pixData && (
                      <>
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
                      {firstPurchaseDiscount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-green-400 font-semibold">🎉 Desconto 1ª compra</span>
                          <span className="text-green-400 font-semibold">- {formatCurrency(firstPurchaseDiscount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Frete</span>
                        {shipping === 0 ? (
                          <span className="text-emerald-500 font-semibold">Grátis</span>
                        ) : (
                          <span className="text-foreground">R$ {shipping.toFixed(2).replace(".", ",")}</span>
                        )}
                      </div>
                      <div className="flex justify-between font-bold text-xl border-t border-border pt-3 mt-2">
                        <span>Total</span>
                        <span className="text-primary">{formatCurrency(finalTotal)}</span>
                      </div>
                    </div>
                      </>
                    )}

                    {!pixData ? (
                      <button
                        onClick={handleSubmit}
                        disabled={isProcessing}
                        className="w-full py-4 bg-primary hover:bg-aura-dark-blue text-primary-foreground font-display font-bold text-lg tracking-wider rounded-xl transition-all duration-300 animate-pulse-glow flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? (
                          <><Loader2 className="w-5 h-5 animate-spin" /> PROCESSANDO...</>
                        ) : (
                          <><Lock className="w-5 h-5" /> PAGAR COM PIX</>
                        )}
                      </button>
                    ) : (
                      <div className="space-y-5 animate-fade-in">
                        <div className="text-center">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-full text-sm font-semibold mb-4">
                            <CheckCircle className="w-4 h-4" /> PIX Gerado com Sucesso
                          </div>
                          <p className="text-sm text-muted-foreground">Escaneie o QR Code ou copie o código abaixo</p>
                        </div>

                        {pixData.qrCode && (
                          <div className="flex justify-center">
                            <div className="bg-white p-4 rounded-xl">
                              <QRCodeSVG value={pixData.qrCode} size={192} />
                            </div>
                          </div>
                        )}

                        {pixData.copyPaste && (
                          <div className="overflow-hidden">
                            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Código PIX Copia e Cola</label>
                            <div className="flex gap-2">
                              <input
                                readOnly
                                value={pixData.copyPaste}
                                className="flex-1 min-w-0 px-3 py-3 bg-secondary/50 border border-border rounded-xl text-foreground text-xs truncate"
                              />
                              <button
                                onClick={handleCopyPix}
                                className="px-3 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm flex items-center gap-1 flex-shrink-0 hover:bg-aura-dark-blue transition-colors"
                              >
                                {pixCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                <span className="hidden sm:inline">{pixCopied ? "Copiado" : "Copiar"}</span>
                              </button>
                            </div>
                          </div>
                        )}

                        <button
                          onClick={handleConfirmPixPayment}
                          disabled={checkingPayment}
                          className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-primary-foreground font-display font-bold text-base tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {checkingPayment ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> VERIFICANDO PAGAMENTO...</>
                          ) : (
                            <><CheckCircle className="w-5 h-5" /> JÁ FIZ O PAGAMENTO</>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Summary */}
            <div className="hidden lg:block lg:col-span-2">
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
                  {firstPurchaseDiscount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-400 font-semibold">🎉 Desconto 1ª compra</span>
                      <span className="text-green-400 font-semibold">- {formatCurrency(firstPurchaseDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Frete</span>
                    {shipping === 0 ? (
                      <span className="text-emerald-500 font-semibold">Grátis</span>
                    ) : (
                      <span className="text-foreground">R$ {shipping.toFixed(2).replace(".", ",")}</span>
                    )}
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
                    <Lock className="w-4 h-4 text-aura-cyan flex-shrink-0" />
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

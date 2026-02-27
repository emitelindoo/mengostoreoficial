import { Shield, Truck, RefreshCw, CreditCard } from "lucide-react";

const trustItems = [
  { icon: Shield, title: "Compra Segura", desc: "Pagamento 100% protegido via PIX" },
  { icon: Truck, title: "Frete Grátis", desc: "SEDEX para todo o Brasil" },
  { icon: RefreshCw, title: "Troca Fácil", desc: "30 dias para troca" },
  { icon: CreditCard, title: "Melhor Preço", desc: "Garantia de menor preço" },
];

const TrustBadges = () => {
  return (
    <section className="py-8 px-4 border-y border-border/50">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustItems.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-display text-sm tracking-wider">{item.title.toUpperCase()}</p>
                <p className="text-[10px] text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;

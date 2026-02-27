import { Star } from "lucide-react";

const testimonials = [
  {
    text: "Produto top, chegou rápido! Qualidade excelente, super recomendo.",
    name: "Carlos S.",
    location: "RJ",
  },
  {
    text: "Camisa linda, tecido de primeira qualidade. Meu filho amou!",
    name: "Maria L.",
    location: "SP",
  },
  {
    text: "Entrega super rápida e produto exatamente como nas fotos.",
    name: "João O.",
    location: "MG",
  },
  {
    text: "Comprei para presente e ficou perfeito. Já quero mais!",
    name: "Ana C.",
    location: "BA",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1 bg-aura-cyan rounded-full" />
          <div>
            <h2 className="text-3xl md:text-4xl font-display tracking-wider leading-none">
              AVALIAÇÕES
            </h2>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">
              +10.000 clientes satisfeitos
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-secondary/50 border border-border/50 rounded-lg p-4 hover:border-primary/20 transition-colors"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-aura-cyan text-aura-cyan" />
                ))}
              </div>
              <p className="text-foreground text-sm mb-3 italic leading-relaxed">"{t.text}"</p>
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{t.name}</span> • {t.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

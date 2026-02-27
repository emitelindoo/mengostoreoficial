import { Star } from "lucide-react";

const testimonials = [
  {
    text: "Produto top, chegou rápido! Qualidade excelente, super recomendo.",
    name: "Carlos Silva",
    location: "Rio de Janeiro - RJ",
  },
  {
    text: "Camisa linda, tecido de primeira qualidade. Meu filho amou!",
    name: "Maria Santos",
    location: "São Paulo - SP",
  },
  {
    text: "Entrega super rápida e produto exatamente como nas fotos. Parabéns!",
    name: "João Oliveira",
    location: "Belo Horizonte - MG",
  },
  {
    text: "Comprei para o meu marido e ele ficou apaixonado. Produto incrível!",
    name: "Ana Costa",
    location: "Salvador - BA",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 bg-secondary/50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-3">
          O que nossos clientes dizem
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Mais de 10.000 clientes satisfeitos. Veja os depoimentos!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-aura-cyan text-aura-cyan" />
                ))}
              </div>
              <p className="text-foreground mb-4 italic">"{t.text}"</p>
              <p className="text-sm text-muted-foreground">
                — <span className="font-semibold text-foreground">{t.name}</span>, {t.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

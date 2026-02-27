import { useEffect, useState } from "react";

const FlashOffer = () => {
  const [time, setTime] = useState({ hours: 2, minutes: 15, seconds: 24 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-gradient-to-br from-primary/20 via-card to-card border border-primary/30 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
            ⚡ OFERTA RELÂMPAGO
          </h2>
          <p className="text-lg font-semibold text-foreground mb-1">
            Últimas Unidades Disponíveis!
          </p>
          <p className="text-muted-foreground mb-8">
            Não perca esta oportunidade única. Estoque limitado!
          </p>

          <p className="text-sm text-muted-foreground mb-4">⏰ Oferta expira em:</p>

          <div className="flex justify-center gap-4 mb-8">
            {[
              { val: pad(time.hours), label: "Horas" },
              { val: pad(time.minutes), label: "Minutos" },
              { val: pad(time.seconds), label: "Segundos" },
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-2xl md:text-3xl font-display font-bold">
                  {t.val}
                </div>
                <span className="text-xs text-muted-foreground mt-1">{t.label}</span>
              </div>
            ))}
          </div>

          <a
            href="#produtos"
            className="inline-block w-full max-w-sm px-8 py-4 bg-primary hover:bg-aura-dark-blue text-primary-foreground font-display font-bold text-lg tracking-wider rounded-lg transition-all duration-300 animate-pulse-glow"
          >
            🚨 GARANTIR O MEU AGORA
          </a>

          <p className="mt-4 text-sm text-muted-foreground">
            ✅ Frete Grátis • ✅ Entrega em 7 dias úteis via SEDEX
          </p>
        </div>
      </div>
    </section>
  );
};

export default FlashOffer;

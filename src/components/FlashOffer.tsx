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
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-lg border border-primary/30"
          style={{
            background: "linear-gradient(135deg, hsl(220 25% 4%) 0%, hsl(210 60% 12%) 50%, hsl(210 100% 25%) 100%)"
          }}
        >
          {/* Glow effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full" />
          
          <div className="relative z-10 p-8 md:p-10 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">⏰ Oferta expira em</p>
            
            <div className="flex justify-center gap-3 mb-6">
              {[
                { val: pad(time.hours), label: "H" },
                { val: pad(time.minutes), label: "M" },
                { val: pad(time.seconds), label: "S" },
              ].map((t, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/20 border border-primary/30 text-foreground rounded-lg flex items-center justify-center text-2xl md:text-3xl font-display">
                    {t.val}
                  </div>
                  <span className="text-[10px] text-muted-foreground mt-1 uppercase">{t.label}</span>
                </div>
              ))}
            </div>

            <h2 className="text-3xl md:text-5xl font-display tracking-wider mb-2">
              OFERTA RELÂMPAGO
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Últimas unidades disponíveis. Estoque limitado!
            </p>

            <a
              href="#produtos"
              className="inline-block px-10 py-3 bg-primary hover:bg-aura-dark-blue text-primary-foreground font-display text-base tracking-widest rounded transition-all duration-300 animate-pulse-glow"
            >
              VER PRODUTOS
            </a>

            <p className="mt-4 text-[11px] text-muted-foreground">
              ✅ Frete Grátis acima de 3 itens • ✅ Entrega em 7 dias úteis via SEDEX
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashOffer;

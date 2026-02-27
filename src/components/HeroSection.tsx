import heroBanner from "@/assets/hero-banner.png";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-end pt-16 overflow-hidden">
      <div className="w-full">
        <img
          src={heroBanner}
          alt="Coleção de Camisas de Futebol 2026"
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto pb-16 -mt-32 md:-mt-48">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider bg-primary text-primary-foreground rounded-full animate-fade-in-up">
          COLEÇÃO 2026
        </span>
        
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-2 animate-fade-in-up text-white drop-shadow-lg" style={{ animationDelay: "0.1s" }}>
          Vista sua Paixão
        </h1>
        
        <p className="text-2xl md:text-4xl font-display font-bold text-primary mb-4 animate-fade-in-up drop-shadow-lg" style={{ animationDelay: "0.2s" }}>
          com a AURA FUT
        </p>
        
        <p className="text-white/80 mb-8 animate-fade-in-up drop-shadow" style={{ animationDelay: "0.3s" }}>
          As melhores camisas de futebol, estoque limitado
        </p>

        <a
          href="#produtos"
          className="w-full max-w-md px-8 py-4 bg-primary hover:bg-aura-dark-blue text-primary-foreground font-display font-bold text-lg tracking-wider rounded-lg transition-all duration-300 animate-pulse-glow animate-fade-in-up text-center block"
          style={{ animationDelay: "0.4s" }}
        >
          COMPRAR AGORA
        </a>

        <p className="mt-4 text-sm text-white/70 animate-fade-in-up drop-shadow" style={{ animationDelay: "0.5s" }}>
          ✅ Frete Grátis • ✅ Entrega em 7 dias úteis via SEDEX
        </p>
      </div>
    </section>
  );
};

export default HeroSection;

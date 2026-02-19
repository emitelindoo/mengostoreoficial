import heroImage from "@/assets/hero-flamengo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-flamengo-black via-background to-background" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider bg-primary text-primary-foreground rounded-full animate-fade-in-up">
          EDIÇÃO LIMITADA
        </span>
        
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-2 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Coleção Oficial Flamengo
        </h1>
        
        <p className="text-2xl md:text-4xl font-display font-bold text-primary mb-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Veste a Nação
        </p>
        
        <p className="text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          Edição limitada, estoque reduzido
        </p>

        <div className="w-full max-w-md mb-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <img
            src={heroImage}
            alt="Camisa Flamengo 2025"
            className="w-full h-auto object-contain max-h-[500px]"
          />
        </div>

        <a
          href="#produtos"
          className="w-full max-w-md px-8 py-4 bg-primary hover:bg-flamengo-dark-red text-primary-foreground font-display font-bold text-lg tracking-wider rounded-lg transition-all duration-300 animate-pulse-glow animate-fade-in-up text-center block"
          style={{ animationDelay: "0.5s" }}
        >
          COMPRAR AGORA
        </a>

        <p className="mt-4 text-sm text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          Frete grátis para todo o Brasil
        </p>
      </div>
    </section>
  );
};

export default HeroSection;

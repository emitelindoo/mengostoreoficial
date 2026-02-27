import heroBanner from "@/assets/hero-banner.png";

const HeroSection = () => {
  return (
    <section className="relative pt-16 overflow-hidden">
      {/* Full banner image */}
      <div className="w-full">
        <img
          src={heroBanner}
          alt="Coleção de Camisas de Futebol"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Gradient overlay from bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;

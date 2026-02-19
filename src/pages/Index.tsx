import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatsSection from "@/components/StatsSection";
import FlashOffer from "@/components/FlashOffer";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProductsSection />
      <TestimonialsSection />
      <StatsSection />
      <FlashOffer />
      <Footer />
    </div>
  );
};

export default Index;

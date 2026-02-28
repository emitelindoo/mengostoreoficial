import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import CategoryBanners from "@/components/CategoryBanners";
import ProductsSection from "@/components/ProductsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatsSection from "@/components/StatsSection";
import FlashOffer from "@/components/FlashOffer";

import Footer from "@/components/Footer";
import FirstPurchaseBanner from "@/components/FirstPurchaseBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <FirstPurchaseBanner />
      <Header />
      <HeroSection />
      <TrustBadges />
      <CategoryBanners />
      <ProductsSection />
      <FlashOffer />
      <TestimonialsSection />
      <StatsSection />
      
      <Footer />
    </div>
  );
};

export default Index;

import ProductCard from "./ProductCard";
import { products } from "@/data/products";

const BestSellersSection = () => {
  // Filtra produtos com badge "Mais Vendido" ou com mais de 1000 avaliações
  const bestSellers = products
    .filter((product) => product.badge === "Mais Vendido" || product.reviews > 1000)
    .sort((a, b) => b.reviews - a.reviews) // Ordena por avaliações decrescente
    .slice(0, 3); // Pega apenas os top 3

  return (
    <section id="mais-vendidos" className="py-12 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1 bg-aura-cyan rounded-full" />
          <div>
            <h2 className="text-3xl md:text-4xl font-display tracking-wider leading-none uppercase">
              Mais Vendidos
            </h2>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">
              Os preferidos da torcida
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;

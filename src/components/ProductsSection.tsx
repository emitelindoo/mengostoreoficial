import ProductCard from "./ProductCard";
import { products } from "@/data/products";

const ProductsSection = () => {
  return (
    <section id="produtos" className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <div>
            <h2 className="text-3xl md:text-4xl font-display tracking-wider leading-none">
              NOSSOS PRODUTOS
            </h2>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">
              Coleção 2025/2026
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;

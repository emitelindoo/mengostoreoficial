import ProductCard from "./ProductCard";
import { products } from "@/data/products";

const ProductsSection = () => {
  return (
    <section id="produtos" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-3">
          Produtos Oficiais
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
          Vista a camisa da Nação com orgulho. Produtos oficiais com qualidade garantida.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} link={`/produto/${product.id}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;

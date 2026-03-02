import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

const ProductsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const lancamentos = products.filter((p) =>
    p.category.includes("lancamentos-2026")
  );

  return (
    <section id="produtos" className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/categoria/lancamentos-2026"
            className="flex items-center gap-3 group"
          >
            <div className="h-8 w-1 bg-primary rounded-full" />
            <div>
              <h2 className="text-2xl md:text-4xl font-display tracking-wider leading-none group-hover:text-primary transition-colors">
                LANÇAMENTOS 2026
              </h2>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">
                Novidades da temporada
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full border border-border hover:bg-secondary active:scale-95 transition-all"
              aria-label="Rolar para esquerda"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full border border-border hover:bg-secondary active:scale-95 transition-all"
              aria-label="Rolar para direita"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4"
        >
          {lancamentos.map((product) => (
            <div
              key={product.id}
              className="min-w-[260px] w-[75vw] max-w-[300px] snap-start flex-shrink-0"
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

        <Link
          to="/categoria/lancamentos-2026"
          className="mt-4 inline-block text-sm text-primary hover:underline font-medium"
        >
          Ver todos →
        </Link>
      </div>
    </section>
  );
};

export default ProductsSection;

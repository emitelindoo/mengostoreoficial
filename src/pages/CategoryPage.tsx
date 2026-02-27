import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, ProductCategory } from "@/data/products";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const categoryLabels: Record<string, { title: string; subtitle: string }> = {
  "lancamentos-2026": { title: "LANÇAMENTOS 2026", subtitle: "As novidades da temporada 2026" },
  "selecoes": { title: "SELEÇÕES", subtitle: "Camisas das seleções nacionais" },
  "todos": { title: "TODOS OS PRODUTOS", subtitle: "Confira nosso catálogo completo" },
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const info = categoryLabels[slug || ""] || categoryLabels["todos"];

  const filtered = slug === "todos" || !slug
    ? products
    : products.filter((p) => p.category.includes(slug as ProductCategory));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-primary rounded-full" />
            <div>
              <h1 className="text-3xl md:text-4xl font-display tracking-wider leading-none">
                {info.title}
              </h1>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">
                {info.subtitle}
              </p>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-16">Nenhum produto encontrado nesta categoria.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;

import { Link } from "react-router-dom";
import bannerSelecoes from "@/assets/banner-selecoes.png";
import bannerBrasileiro from "@/assets/banner-brasileirao.png";
import bannerChampions from "@/assets/banner-champions.png";

const banners = [
  { image: bannerSelecoes, to: "/categoria/selecoes", alt: "Seleções - Temporada 2025" },
  { image: bannerBrasileiro, to: "/categoria/brasileirao", alt: "Brasileirão - Temporada 2025" },
  { image: bannerChampions, to: "/categoria/champions", alt: "Champions League - Times Europeus" },
];

const CategoryBanners = () => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <div>
            <h2 className="text-3xl md:text-4xl font-display tracking-wider leading-none">
              CATEGORIAS
            </h2>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-0.5">
              Encontre por categoria
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {banners.map((banner) => (
            <Link
              key={banner.to}
              to={banner.to}
              className="group relative rounded-lg overflow-hidden border border-border/50 hover:border-primary/40 transition-all duration-300"
            >
              <img
                src={banner.image}
                alt={banner.alt}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBanners;

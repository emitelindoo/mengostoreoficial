import { Star } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  soldOut?: boolean;
  link?: string;
}

const ProductCard = ({
  name,
  price,
  originalPrice,
  discount,
  rating,
  reviews,
  image,
  badge,
  soldOut = false,
  link = "#",
}: ProductCardProps) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 group">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 0 && !soldOut && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-md">
            -{discount}%
          </span>
        )}
        {badge && !soldOut && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-flamengo-gold text-flamengo-black text-xs font-bold rounded-md uppercase">
            {badge}
          </span>
        )}
        {soldOut && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
            <span className="px-6 py-2 bg-muted text-muted-foreground font-display font-bold text-lg rounded-lg">
              ESGOTADO
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-flamengo-gold text-flamengo-gold" : "text-muted-foreground"}`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">({reviews.toLocaleString("pt-BR")})</span>
        </div>

        <h3 className="font-semibold text-foreground text-sm mb-3 line-clamp-2">{name}</h3>

        {!soldOut ? (
          <>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-xl font-bold text-primary">
                R$ {price.toFixed(2).replace(".", ",")}
              </span>
              {originalPrice > price && (
                <span className="text-sm text-muted-foreground line-through">
                  R$ {originalPrice.toFixed(2).replace(".", ",")}
                </span>
              )}
            </div>
            <a
              href={link}
              className="block w-full py-3 bg-primary hover:bg-flamengo-dark-red text-primary-foreground font-display font-semibold tracking-wider rounded-lg transition-colors text-center"
            >
              Comprar Agora
            </a>
          </>
        ) : (
          <div className="py-3 bg-muted text-muted-foreground font-display font-semibold tracking-wider rounded-lg text-center">
            Esgotado
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

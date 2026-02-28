import { Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";
import { fbEvent } from "@/lib/fbpixel";

interface ProductCardProps extends Product {}

const ProductCard = (product: ProductCardProps) => {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleBuy = () => {
    addItem(product, 1);
    fbEvent("AddToCart", {
      content_name: product.name,
      content_ids: [product.id],
      contents: [{ id: product.id, quantity: 1 }],
      content_type: "product",
      value: product.price,
      currency: "BRL",
      num_items: 1,
    });
    navigate("/carrinho");
  };

  return (
    <div className="group relative rounded-lg overflow-hidden border border-border/50 bg-gradient-to-b from-secondary to-background hover:border-primary/40 transition-all duration-300">
      <Link to={`/produto/${product.id}`} className="block relative aspect-[3/4] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background/80 z-10" />
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.discount > 0 && !product.soldOut && (
          <span className="absolute top-3 left-3 z-20 px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded">
            -{product.discount}%
          </span>
        )}
        {product.badge && !product.soldOut && (
          <span className="absolute top-3 right-3 z-20 px-3 py-1 bg-aura-cyan text-aura-deep text-xs font-bold rounded uppercase tracking-wider">
            {product.badge}
          </span>
        )}
        {product.soldOut && (
          <div className="absolute inset-0 z-20 bg-background/80 flex items-center justify-center">
            <span className="px-4 py-1.5 bg-muted text-muted-foreground font-display text-lg rounded">
              ESGOTADO
            </span>
          </div>
        )}
      </Link>

      <div className="p-4 relative z-10">
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-aura-cyan text-aura-cyan" : "text-muted-foreground/30"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviews.toLocaleString("pt-BR")})</span>
        </div>

        <Link to={`/produto/${product.id}`}>
          <h3 className="font-medium text-foreground text-sm md:text-base mb-3 line-clamp-2 hover:text-primary transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        {!product.soldOut ? (
          <>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-xl md:text-2xl font-bold text-primary font-display tracking-wide">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-muted-foreground line-through">
                  R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                </span>
              )}
            </div>
            <button
              onClick={handleBuy}
              className="block w-full py-3 bg-primary hover:bg-aura-dark-blue text-primary-foreground font-display text-base tracking-widest rounded transition-colors text-center"
            >
              COMPRAR
            </button>
          </>
        ) : (
          <div className="py-3 bg-muted text-muted-foreground font-display text-base tracking-widest rounded text-center">
            ESGOTADO
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

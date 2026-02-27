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
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.discount > 0 && !product.soldOut && (
          <span className="absolute top-2 left-2 z-20 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-bold rounded">
            -{product.discount}%
          </span>
        )}
        {product.badge && !product.soldOut && (
          <span className="absolute top-2 right-2 z-20 px-2 py-0.5 bg-aura-cyan text-aura-deep text-[10px] font-bold rounded uppercase tracking-wider">
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

      <div className="p-3 relative z-10">
        <div className="flex items-center gap-0.5 mb-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-aura-cyan text-aura-cyan" : "text-muted-foreground/30"}`}
            />
          ))}
          <span className="text-[10px] text-muted-foreground ml-1">({product.reviews.toLocaleString("pt-BR")})</span>
        </div>

        <Link to={`/produto/${product.id}`}>
          <h3 className="font-medium text-foreground text-xs mb-2 line-clamp-2 hover:text-primary transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>

        {!product.soldOut ? (
          <>
            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="text-lg font-bold text-primary font-display tracking-wide">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-[10px] text-muted-foreground line-through">
                  R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                </span>
              )}
            </div>
            <button
              onClick={handleBuy}
              className="block w-full py-2.5 bg-primary hover:bg-aura-dark-blue text-primary-foreground font-display text-sm tracking-widest rounded transition-colors text-center"
            >
              COMPRAR
            </button>
          </>
        ) : (
          <div className="py-2.5 bg-muted text-muted-foreground font-display text-sm tracking-widest rounded text-center">
            ESGOTADO
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

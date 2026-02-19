import { Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";

interface ProductCardProps extends Product {}

const ProductCard = (product: ProductCardProps) => {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleBuy = () => {
    addItem(product, 1);
    navigate("/carrinho");
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 group">
      <Link to={`/produto/${product.id}`} className="block relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.discount > 0 && !product.soldOut && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-md">
            -{product.discount}%
          </span>
        )}
        {product.badge && !product.soldOut && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-flamengo-gold text-flamengo-black text-xs font-bold rounded-md uppercase">
            {product.badge}
          </span>
        )}
        {product.soldOut && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
            <span className="px-6 py-2 bg-muted text-muted-foreground font-display font-bold text-lg rounded-lg">
              ESGOTADO
            </span>
          </div>
        )}
      </Link>

      <div className="p-4">
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-flamengo-gold text-flamengo-gold" : "text-muted-foreground"}`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">({product.reviews.toLocaleString("pt-BR")})</span>
        </div>

        <Link to={`/produto/${product.id}`}>
          <h3 className="font-semibold text-foreground text-sm mb-3 line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
        </Link>

        {!product.soldOut ? (
          <>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-xl font-bold text-primary">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-muted-foreground line-through">
                  R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                </span>
              )}
            </div>
            <button
              onClick={handleBuy}
              className="block w-full py-3 bg-primary hover:bg-flamengo-dark-red text-primary-foreground font-display font-semibold tracking-wider rounded-lg transition-colors text-center"
            >
              Comprar Agora
            </button>
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

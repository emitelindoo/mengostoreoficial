import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { fbEvent } from "@/lib/fbpixel";

interface ProductCardProps extends Product {}

const ProductCard = (product: ProductCardProps) => {

  const handleBuy = () => {
    fbEvent("AddToCart", {
      content_name: product.name,
      content_ids: [product.id],
      contents: [{ id: product.id, quantity: 1 }],
      content_type: "product",
      value: product.price,
      currency: "BRL",
      num_items: 1,
    });
    const WHATSAPP_NUMBER = "5511979519503";
    const msg = `Olá! Tenho interesse em comprar:\n\n*${product.name}*\nValor: R$ ${product.price.toFixed(2).replace(".", ",")}\n`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
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
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#1da851] text-white font-display text-sm tracking-widest rounded transition-colors text-center"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.592-.838-6.313-2.236l-.44-.37-3.528 1.183 1.183-3.528-.37-.44A9.953 9.953 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
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

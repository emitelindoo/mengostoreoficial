import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, ShieldCheck, Truck, ArrowLeft, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { getProductById } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || "");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Produto não encontrado</h1>
          <Link to="/#produtos" className="text-primary hover:underline">Voltar aos produtos</Link>
        </div>
      </div>
    );
  }

  const handleBuy = () => {
    const sizeParam = selectedSize ? `&size=${selectedSize}` : "";
    navigate(`/checkout?product=${product.id}&qty=${quantity}${sizeParam}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden bg-secondary border border-border">
              <img src={product.image} alt={product.name} className="w-full h-auto object-contain aspect-square" />
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 px-4 py-1.5 bg-primary text-primary-foreground font-bold rounded-lg text-sm">
                  -{product.discount}%
                </span>
              )}
              {product.badge && (
                <span className="absolute top-4 right-4 px-4 py-1.5 bg-flamengo-gold text-flamengo-black text-xs font-bold rounded-lg uppercase">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < product.rating ? "fill-flamengo-gold text-flamengo-gold" : "text-muted-foreground"}`} />
                ))}
                <span className="text-sm text-muted-foreground ml-2">({product.reviews.toLocaleString("pt-BR")} avaliações)</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">{product.name}</h1>

              <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-primary">R$ {product.price.toFixed(2).replace(".", ",")}</span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-muted-foreground line-through">R$ {product.originalPrice.toFixed(2).replace(".", ",")}</span>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                ou <span className="font-semibold text-foreground">3x de R$ {(product.price / 3).toFixed(2).replace(".", ",")}</span> sem juros
              </p>

              {/* Size selector */}
              {product.sizes && (
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-3">Tamanho:</p>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-lg border font-display font-semibold text-sm transition-all ${
                          selectedSize === size
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-card text-foreground hover:border-primary/50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <p className="text-sm font-semibold mb-3">Quantidade:</p>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center hover:border-primary/50 transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-display font-bold text-lg w-8 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center hover:border-primary/50 transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleBuy}
                disabled={product.sizes && !selectedSize}
                className="w-full py-4 bg-primary hover:bg-flamengo-dark-red text-primary-foreground font-display font-bold text-lg tracking-wider rounded-lg transition-all duration-300 animate-pulse-glow disabled:opacity-50 disabled:animate-none disabled:cursor-not-allowed"
              >
                {product.sizes && !selectedSize ? "SELECIONE O TAMANHO" : "COMPRAR AGORA"}
              </button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Truck className="w-5 h-5 text-primary" />
                  <span>Frete grátis para todo o Brasil</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span>Compra 100% segura • Produto oficial</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;

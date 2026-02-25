import { useParams, useNavigate, Link } from "react-router-dom";
import { Star, ShieldCheck, Truck, ArrowLeft, Minus, Plus, ChevronDown, Package } from "lucide-react";
import { useState, useEffect } from "react";
import { getProductById, sizeChart } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialProofGallery from "@/components/SocialProofGallery";
import { fbEvent } from "@/lib/fbpixel";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = getProductById(id || "");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [customName, setCustomName] = useState("");
  const [customNumber, setCustomNumber] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (product) {
      fbEvent("ViewContent", {
        content_name: product.name,
        content_ids: [product.id],
        content_type: "product",
        value: product.price,
        currency: "BRL",
      });
    }
  }, [product]);

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
    addItem(product, quantity, selectedSize || undefined, customName || undefined, customNumber || undefined);
    fbEvent("AddToCart", {
      content_name: product.name,
      content_ids: [product.id],
      contents: [{ id: product.id, quantity }],
      content_type: "product",
      value: product.price * quantity,
      currency: "BRL",
      num_items: quantity,
    });
    navigate("/carrinho");
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
            {/* Image Gallery */}
            <div>
              <div className="relative rounded-2xl overflow-hidden bg-secondary border border-border mb-3">
                <img
                  src={product.images ? product.images[selectedImage] : product.image}
                  alt={product.name}
                  className="w-full h-auto object-contain aspect-square"
                />
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
              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                        selectedImage === i
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-border hover:border-primary/50 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`${product.name} - foto ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
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
                Pagamento exclusivo via <span className="font-semibold text-foreground">PIX</span> • Envio via <span className="font-semibold text-foreground">SEDEX</span> • Frete Grátis
              </p>

              {/* Stock indicator */}
              {product.stock !== undefined && (
                <div className="flex items-center gap-2 mb-6">
                  <Package className="w-4 h-4 text-primary" />
                  {product.stock <= 5 ? (
                    <span className="text-sm font-semibold text-primary">🔥 Restam apenas {product.stock} unidades!</span>
                  ) : product.stock <= 15 ? (
                    <span className="text-sm font-semibold text-flamengo-gold">⚡ Apenas {product.stock} em estoque</span>
                  ) : (
                    <span className="text-sm text-muted-foreground">Em estoque: {product.stock} unidades</span>
                  )}
                </div>
              )}

              {/* Size selector */}
              {product.sizes && (
                <div className="mb-4">
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

                  {/* Size chart collapsible */}
                  <Collapsible className="mt-3">
                    <CollapsibleTrigger className="flex items-center gap-1 text-sm text-primary hover:underline cursor-pointer group">
                      📏 Guia de Tamanhos
                      <ChevronDown className="w-3.5 h-3.5 transition-transform group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      {(() => {
                        const isFeminina = product.id.includes("feminina") || product.id.includes("cropete");
                        const isBermuda = product.id.includes("bermuda");
                        const chart = isBermuda ? sizeChart.bermuda : isFeminina ? sizeChart.feminino : sizeChart.masculino;
                        return (
                          <div className="overflow-x-auto rounded-lg border border-border">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="bg-secondary/50">
                                  {chart.headers.map((h) => (
                                    <th key={h} className="px-3 py-2 text-left font-semibold text-foreground">{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {chart.rows.filter(row => product.sizes?.includes(row[0])).map((row) => (
                                  <tr key={row[0]} className="border-t border-border hover:bg-secondary/30 transition-colors">
                                    {row.map((cell, i) => (
                                      <td key={i} className={`px-3 py-2 ${i === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{cell}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      })()}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              )}

              {/* Customization - only for shirts */}
              {product.customizable && (
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-1">Personalizar (opcional):</p>
                  {product.freeCustomization ? (
                    <p className="text-xs text-green-500 font-semibold mb-3">✓ Personalização grátis inclusa</p>
                  ) : (
                    <p className="text-xs text-primary font-semibold mb-3">+ R$ 19,90 por personalização</p>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Nome nas costas</label>
                      <input
                        type="text"
                        placeholder="Ex: GABIGOL"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value.toUpperCase().slice(0, 15))}
                        maxLength={15}
                        className="w-full px-3 py-2.5 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm font-display tracking-wider"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Número</label>
                      <input
                        type="text"
                        placeholder="Ex: 10"
                        value={customNumber}
                        onChange={(e) => setCustomNumber(e.target.value.replace(/\D/g, "").slice(0, 2))}
                        maxLength={2}
                        inputMode="numeric"
                        className="w-full px-3 py-2.5 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm font-display tracking-wider"
                      />
                    </div>
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
              <p className="text-center text-sm text-muted-foreground mt-2">Frete grátis para todo o Brasil</p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Truck className="w-5 h-5 text-primary" />
                  <span>Frete grátis para todo o Brasil</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span>Compra 100% segura • Qualidade garantida</span>
                </div>
              </div>
          </div>

          {/* Social Proof Gallery - spans full width */}
          <div className="md:col-span-2">
            <SocialProofGallery />
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;

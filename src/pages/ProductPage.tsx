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
                  <span className="absolute top-4 right-4 px-4 py-1.5 bg-aura-cyan text-aura-deep text-xs font-bold rounded uppercase">
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
                  <Star key={i} className={`w-4 h-4 ${i < product.rating ? "fill-aura-cyan text-aura-cyan" : "text-muted-foreground/30"}`} />
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
                Pague via <span className="font-semibold text-foreground">PIX</span> ou <span className="font-semibold text-foreground">Cartão de Crédito</span> • Envio via <span className="font-semibold text-foreground">SEDEX</span> • A partir de R$ 29,90
              </p>

              {/* Stock indicator */}
              {product.stock !== undefined && (
                <div className="flex items-center gap-2 mb-6">
                  <Package className="w-4 h-4 text-primary" />
                  {product.stock <= 5 ? (
                    <span className="text-sm font-semibold text-primary">🔥 Restam apenas {product.stock} unidades!</span>
                  ) : product.stock <= 15 ? (
                    <span className="text-sm font-semibold text-aura-cyan">⚡ Apenas {product.stock} em estoque</span>
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

              <div className="space-y-3">
                <button
                  onClick={handleBuy}
                  disabled={product.sizes && !selectedSize}
                  className="w-full py-4 bg-primary hover:bg-aura-dark-blue text-primary-foreground font-display font-bold text-lg tracking-wider rounded-lg transition-all duration-300 animate-pulse-glow disabled:opacity-50 disabled:animate-none disabled:cursor-not-allowed"
                >
                  {product.sizes && !selectedSize ? "SELECIONE O TAMANHO" : "COMPRAR AGORA"}
                </button>

                <a
                  href={`https://wa.me/5511967131733?text=${encodeURIComponent(`Olá! Quero comprar: ${product.name}${selectedSize ? ` - Tamanho: ${selectedSize}` : ""}${customName ? ` - Nome: ${customName}` : ""}${customNumber ? ` - Número: ${customNumber}` : ""} - Quantidade: ${quantity}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => fbEvent("Lead", {
                    content_name: product.name,
                    content_category: "whatsapp_compra",
                    content_ids: [product.id],
                    value: product.price * quantity,
                    currency: "BRL",
                  })}
                  className="w-full py-4 bg-[#25D366] hover:bg-[#1ebe57] text-white font-display font-bold text-lg tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <svg viewBox="0 0 32 32" className="w-6 h-6 fill-white">
                    <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.502 1.14 6.746 3.072 9.382L1.062 31.19l5.996-1.97A15.916 15.916 0 0016.004 32C24.826 32 32 24.824 32 16.004 32 7.176 24.826 0 16.004 0zm9.31 22.608c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.95.324-5.67-1.218-4.762-1.972-7.826-6.81-8.064-7.124-.228-.314-1.924-2.562-1.924-4.888 0-2.326 1.218-3.468 1.65-3.942.39-.428 1.026-.624 1.632-.624.198 0 .372.01.534.018.468.02.702.048 1.014.786.39.924 1.338 3.264 1.452 3.504.12.24.24.552.078.87-.15.324-.282.522-.522.804-.24.282-.498.63-.708.846-.24.246-.492.51-.21.996.282.486 1.254 2.07 2.694 3.354 1.848 1.65 3.408 2.16 3.894 2.4.486.24.768.204 1.05-.12.288-.33 1.236-1.434 1.566-1.926.324-.492.654-.408 1.098-.246.45.168 2.832 1.338 3.318 1.578.486.246.81.366.93.57.114.204.114 1.188-.276 2.286z"/>
                  </svg>
                  COMPRAR PELO WHATSAPP
                </a>

                <p className="text-center text-sm text-muted-foreground">Frete a partir de R$ 29,90 via SEDEX</p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Truck className="w-5 h-5 text-primary" />
                  <span>Entrega via SEDEX para todo o Brasil • 7 a 15 dias úteis</span>
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

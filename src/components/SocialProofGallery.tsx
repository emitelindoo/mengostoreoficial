import { useState } from "react";
import { X, Star } from "lucide-react";
import provaSocial1 from "@/assets/prova-social-1.webp";
import provaSocial2 from "@/assets/prova-social-2.webp";
import provaSocial3 from "@/assets/prova-social-3.webp";
import provaSocial4 from "@/assets/prova-social-4.webp";
import provaSocial5 from "@/assets/prova-social-5.webp";
import provaSocial6 from "@/assets/prova-social-6.webp";

const socialReviews = [
  { src: provaSocial1, name: "Carlos M.", rating: 5, text: "Chegou certinho, qualidade top! Recomendo demais." },
  { src: provaSocial2, name: "Fernanda S.", rating: 5, text: "Amei! Tecido muito bom, qualidade incrível." },
  { src: provaSocial3, name: "Rafael O.", rating: 5, text: "Produto original, entrega super rápida. Nota 10!" },
  { src: provaSocial4, name: "Ana Paula R.", rating: 5, text: "Meu marido amou o presente. Produto incrível!" },
  { src: provaSocial5, name: "Lucas F.", rating: 4, text: "Muito boa! Só demorou um pouquinho pra chegar." },
  { src: provaSocial6, name: "Juliana C.", rating: 5, text: "Comprei 2 e vieram perfeitas. Já quero mais!" },
];

const SocialProofGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="mt-12">
      <h2 className="text-xl md:text-2xl font-display font-bold mb-2">
        📸 Fotos de Clientes
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Veja o que nossos clientes estão recebendo em casa!
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {socialReviews.map((review, i) => (
          <div key={i} className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
            <button onClick={() => setSelectedImage(review.src)} className="w-full aspect-square overflow-hidden">
              <img src={review.src} alt={`Avaliação de ${review.name}`} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </button>
            <div className="p-3">
              <div className="flex gap-0.5 mb-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-3.5 h-3.5 ${j < review.rating ? "fill-aura-cyan text-aura-cyan" : "text-muted-foreground"}`} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic leading-snug mb-1">"{review.text}"</p>
              <p className="text-xs font-semibold text-foreground">{review.name}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-4 right-4 text-white/80 hover:text-white" onClick={() => setSelectedImage(null)}>
            <X className="w-8 h-8" />
          </button>
          <img src={selectedImage} alt="Foto de cliente" className="max-w-full max-h-[90vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
};

export default SocialProofGallery;

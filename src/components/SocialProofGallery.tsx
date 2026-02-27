import { useState } from "react";
import { X, Star } from "lucide-react";
import provaSocial7 from "@/assets/prova-social-7.png";
import provaSocial8 from "@/assets/prova-social-8.png";
import provaSocial9 from "@/assets/prova-social-9.png";

const socialReviews = [
  { src: provaSocial7, name: "Elber de Oliveira", rating: 5, text: "Linda demais tá maluco. Top top, muito obrigado irmão! Qualidade 1000 🙏🙌🖤" },
  { src: provaSocial8, name: "Brian", rating: 5, text: "Encomenda recebida irmão. Até uma próxima 🤝🚀" },
  { src: provaSocial9, name: "William", rating: 5, text: "Tudo na mais alta qualidade de sempre! Já retorno pra fazer mais encomendas 🙏" },
];

const SocialProofGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="mt-12">
      <h2 className="text-xl md:text-2xl font-display font-bold mb-2">
        📸 Avaliações dos Clientes
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Veja o que nossos clientes estão dizendo!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {socialReviews.map((review, i) => (
          <div key={i} className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
            <button onClick={() => setSelectedImage(review.src)} className="w-full aspect-[9/16] overflow-hidden">
              <img src={review.src} alt={`Avaliação de ${review.name}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
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

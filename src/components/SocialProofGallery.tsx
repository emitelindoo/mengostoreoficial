import { useState } from "react";
import { X } from "lucide-react";
import provaSocial1 from "@/assets/prova-social-1.webp";
import provaSocial2 from "@/assets/prova-social-2.webp";
import provaSocial3 from "@/assets/prova-social-3.webp";
import provaSocial4 from "@/assets/prova-social-4.webp";
import provaSocial5 from "@/assets/prova-social-5.webp";
import provaSocial6 from "@/assets/prova-social-6.webp";

const socialImages = [
  { src: provaSocial1, alt: "Cliente satisfeito - Camisa vermelha" },
  { src: provaSocial2, alt: "Cliente satisfeito - Camisa branca" },
  { src: provaSocial3, alt: "Cliente satisfeito - Short oficial" },
  { src: provaSocial4, alt: "Cliente satisfeito - Camisa rubro-negra" },
  { src: provaSocial5, alt: "Cliente satisfeito - Kit camisas" },
  { src: provaSocial6, alt: "Cliente satisfeito - Produto com etiqueta oficial" },
];

const SocialProofGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="mt-12">
      <h2 className="text-xl md:text-2xl font-display font-bold mb-2">
        📸 Fotos de Clientes
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Veja o que a Nação está recebendo em casa!
      </p>

      <div className="grid grid-cols-3 gap-3">
        {socialImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(img.src)}
            className="aspect-square rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-colors"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Foto de cliente"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default SocialProofGallery;

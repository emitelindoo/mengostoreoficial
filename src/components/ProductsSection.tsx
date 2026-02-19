import ProductCard from "./ProductCard";
import camisaFlamengo2026 from "@/assets/camisa-flamengo-2026.webp";
import camisaBranca from "@/assets/camisa-flamengo-branca.webp";
import mochilaFlamengo from "@/assets/mochila-flamengo.webp";
import cropeteBege from "@/assets/cropete-flamengo-bege.webp";

const products = [
  {
    name: "Camisa Flamengo I 2026 Vermelha e Preta",
    price: 149.90,
    originalPrice: 199.90,
    discount: 42,
    rating: 5,
    reviews: 1523,
    image: camisaFlamengo2026,
    link: "#",
  },
  {
    name: "Camisa Flamengo II 2025 Branca Reserva Masculina",
    price: 129.90,
    originalPrice: 199.90,
    discount: 57,
    rating: 5,
    reviews: 2847,
    image: camisaBranca,
    badge: "Mais Vendido",
    link: "#",
  },
  {
    name: "Mochila Oficial Flamengo CRF Preta",
    price: 179.90,
    originalPrice: 249.90,
    discount: 28,
    rating: 5,
    reviews: 987,
    image: mochilaFlamengo,
    link: "#",
  },
  {
    name: "Cropete Flamengo 2025 Bege Feminino",
    price: 89.90,
    originalPrice: 139.90,
    discount: 36,
    rating: 5,
    reviews: 654,
    image: cropeteBege,
    link: "#",
  },
];

const ProductsSection = () => {
  return (
    <section id="produtos" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-3">
          Produtos Oficiais
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
          Vista a camisa da Nação com orgulho. Produtos oficiais com qualidade garantida.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;

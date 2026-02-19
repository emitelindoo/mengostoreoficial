import ProductCard from "./ProductCard";

const products = [
  {
    name: "Camisa Flamengo I 2025 Vermelha e Preta",
    price: 149.90,
    originalPrice: 199.90,
    discount: 42,
    rating: 5,
    reviews: 1523,
    image: "/placeholder.svg",
    link: "#",
  },
  {
    name: "Camisa Polo Flamengo Vermelha Casual Masculina",
    price: 129.90,
    originalPrice: 199.90,
    discount: 57,
    rating: 5,
    reviews: 2847,
    image: "/placeholder.svg",
    badge: "Mais Vendido",
    link: "#",
  },
  {
    name: "Camisa Oficial Flamengo 2025 Preta",
    price: 179.90,
    originalPrice: 249.90,
    discount: 0,
    rating: 5,
    reviews: 987,
    image: "/placeholder.svg",
    soldOut: true,
  },
  {
    name: "Blusa Flamengo Masculina Vermelha",
    price: 179.90,
    originalPrice: 249.90,
    discount: 0,
    rating: 5,
    reviews: 654,
    image: "/placeholder.svg",
    soldOut: true,
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

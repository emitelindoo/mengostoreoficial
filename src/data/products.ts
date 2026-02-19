import camisaFlamengo2026 from "@/assets/camisa-flamengo-2026.webp";
import camisaBranca from "@/assets/camisa-flamengo-branca.webp";
import mochilaFlamengo from "@/assets/mochila-flamengo.webp";
import cropeteBege from "@/assets/cropete-flamengo-bege.webp";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  soldOut?: boolean;
  description: string;
  sizes?: string[];
}

export const products: Product[] = [
  {
    id: "camisa-flamengo-i-2026",
    name: "Camisa Flamengo I 2026 Vermelha e Preta",
    price: 149.90,
    originalPrice: 199.90,
    discount: 42,
    rating: 5,
    reviews: 1523,
    image: camisaFlamengo2026,
    description: "A nova camisa oficial do Flamengo 2026, nas cores rubro-negras tradicionais. Tecido de alta qualidade com tecnologia de absorção de suor. Ideal para jogos e uso casual.",
    sizes: ["P", "M", "G", "GG", "XGG"],
  },
  {
    id: "camisa-flamengo-ii-2025-branca",
    name: "Camisa Flamengo II 2025 Branca Reserva Masculina",
    price: 129.90,
    originalPrice: 199.90,
    discount: 57,
    rating: 5,
    reviews: 2847,
    image: camisaBranca,
    badge: "Mais Vendido",
    description: "Camisa reserva oficial do Flamengo 2025, modelo branco com detalhes em vermelho e preto. Conforto e estilo para o dia a dia da Nação.",
    sizes: ["P", "M", "G", "GG", "XGG"],
  },
  {
    id: "mochila-flamengo-crf",
    name: "Mochila Oficial Flamengo CRF Preta",
    price: 179.90,
    originalPrice: 249.90,
    discount: 28,
    rating: 5,
    reviews: 987,
    image: mochilaFlamengo,
    description: "Mochila oficial do Flamengo com escudo bordado, bolsos laterais e compartimento para notebook. Perfeita para o dia a dia do torcedor.",
  },
  {
    id: "cropete-flamengo-bege-2025",
    name: "Cropete Flamengo 2025 Bege Feminino",
    price: 89.90,
    originalPrice: 139.90,
    discount: 36,
    rating: 5,
    reviews: 654,
    image: cropeteBege,
    description: "Cropete feminino oficial do Flamengo 2025, modelo bege com detalhes dourados. Elegância e paixão rubro-negra para a torcedora.",
    sizes: ["P", "M", "G", "GG"],
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);

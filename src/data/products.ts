import camisaFlamengo2026 from "@/assets/camisa-flamengo-2026.webp";
import camisaBranca from "@/assets/camisa-flamengo-branca.webp";
import mochilaFlamengo from "@/assets/mochila-flamengo.webp";
import cropeteBege from "@/assets/cropete-flamengo-bege.webp";
import bermudaBranca from "@/assets/bermuda-flamengo-branca.webp";
import bermudaPreta from "@/assets/bermuda-flamengo-preta.webp";
import camisaCreme from "@/assets/camisa-flamengo-creme.png";
import bermudaCreme from "@/assets/bermuda-flamengo-creme.webp";

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
  {
    id: "bermuda-flamengo-i-2025-branca",
    name: "Bermuda Flamengo I 2025 Branca Masculina",
    price: 89.90,
    originalPrice: 139.90,
    discount: 31,
    rating: 5,
    reviews: 743,
    image: bermudaBranca,
    description: "Bermuda oficial do Flamengo 2025, modelo branco com listras vermelhas laterais e escudo CRF bordado. Tecido leve com tecnologia Climacool.",
    sizes: ["P", "M", "G", "GG", "XGG"],
  },
  {
    id: "bermuda-flamengo-ii-2025-preta",
    name: "Bermuda Flamengo II 2025 Preta Masculina",
    price: 89.90,
    originalPrice: 139.90,
    discount: 29,
    rating: 5,
    reviews: 512,
    image: bermudaPreta,
    description: "Bermuda reserva oficial do Flamengo 2025, modelo preto com detalhes em vermelho e escudo CRF bordado. Design moderno com tecnologia Climacool.",
    sizes: ["P", "M", "G", "GG", "XGG"],
  },
  {
    id: "camisa-flamengo-iii-2025-creme-feminina",
    name: "Camisa Flamengo III 2025 Creme Dourada Feminina",
    price: 139.90,
    originalPrice: 219.90,
    discount: 36,
    rating: 5,
    reviews: 1187,
    image: camisaCreme,
    badge: "Lançamento",
    description: "Camisa especial do Flamengo 2025, modelo creme com detalhes dourados e listras rubro-negras nos ombros. Escudo CRF bordado em dourado. Elegância e tradição em uma peça única.",
    sizes: ["P", "M", "G", "GG", "XGG"],
  },
  {
    id: "bermuda-flamengo-iii-2025-creme",
    name: "Bermuda Flamengo III 2025 Creme Dourada",
    price: 99.90,
    originalPrice: 159.90,
    discount: 38,
    rating: 5,
    reviews: 632,
    image: bermudaCreme,
    description: "Bermuda especial do Flamengo 2025, modelo creme com detalhes dourados e listras rubro-negras laterais. Escudo CRF bordado. Combina perfeitamente com a camisa III.",
    sizes: ["P", "M", "G", "GG", "XGG"],
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);

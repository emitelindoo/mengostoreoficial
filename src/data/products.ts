import camisaFlamengo2026 from "@/assets/camisa-flamengo-2026.webp";
import camisa2026Costas from "@/assets/camisa-2026-costas.webp";
import camisaFlamengo2026SP from "@/assets/camisa-flamengo-2026-sp.webp";
import camisaTreino from "@/assets/camisa-flamengo-treino.png";
import camisaTreinoCostas from "@/assets/camisa-treino-costas.png";
import camisaBranca from "@/assets/camisa-flamengo-branca.webp";
import camisaBrancaCostas from "@/assets/camisa-branca-costas.webp";
import mochilaFlamengo from "@/assets/mochila-flamengo.webp";
import mochilaCostas from "@/assets/mochila-flamengo-costas.webp";
import mochilaLateral from "@/assets/mochila-flamengo-lateral.webp";
import bolsaFlamengo from "@/assets/bolsa-flamengo.webp";
import cropeteBege from "@/assets/cropete-flamengo-bege.webp";
import bermudaBranca from "@/assets/bermuda-flamengo-branca.webp";
import bermudaBrancaCostas from "@/assets/bermuda-branca-costas.webp";
import bermudaPreta from "@/assets/bermuda-flamengo-preta.webp";
import bermudaPretaFrente from "@/assets/bermuda-preta-frente.avif";
import bermudaPretaCostas from "@/assets/bermuda-preta-costas.webp";
import bermudaPretaDetalhe from "@/assets/bermuda-preta-detalhe.webp";
import camisaCreme from "@/assets/camisa-flamengo-creme.png";
import camisaCremeFemCostas from "@/assets/camisa-creme-fem-costas.png";
import camisaCremeM from "@/assets/camisa-flamengo-creme-masc.png";
import camisaCremeMascCostas from "@/assets/camisa-creme-masc-costas.png";
import bermudaCreme from "@/assets/bermuda-flamengo-creme.webp";
import bermudaCremeCostas from "@/assets/bermuda-creme-costas.webp";
import camisaFem2026 from "@/assets/camisa-flamengo-i-2026-fem.webp";
import camisaFem2026Costas from "@/assets/camisa-flamengo-i-2026-fem-costas.webp";
import camisaFem2026Detalhe from "@/assets/camisa-flamengo-i-2026-fem-detalhe.webp";
import camisaBrancaFemFrente from "@/assets/camisa-branca-fem-frente.png";
import camisaBrancaFemCostas from "@/assets/camisa-branca-fem-costas.png";
import camisaBrasilAzulFrente from "@/assets/camisa-brasil-azul-frente.png";
import camisaBrasilAzulDetalhe1 from "@/assets/camisa-brasil-azul-detalhe1.png";
import camisaBrasilAzulDetalhe2 from "@/assets/camisa-brasil-azul-detalhe2.png";
import camisaBrasilAzulCostas from "@/assets/camisa-brasil-azul-costas.png";
import camisaBrasilAmarelaFrente from "@/assets/camisa-brasil-amarela-frente.png";
import camisaBrasilAmarelaDetalhe1 from "@/assets/camisa-brasil-amarela-detalhe1.png";
import camisaBrasilAmarelaDetalhe2 from "@/assets/camisa-brasil-amarela-detalhe2.png";
import camisaBrasilAmarelaDetalhe3 from "@/assets/camisa-brasil-amarela-detalhe3.png";
import camisaFlamengoNovaFrente from "@/assets/camisa-flamengo-nova-frente.png";
import camisaFlamengoNovaDetalhe1 from "@/assets/camisa-flamengo-nova-detalhe1.png";
import camisaFlamengoNovaDetalhe2 from "@/assets/camisa-flamengo-nova-detalhe2.png";
import camisaFlamengoNovaCostas from "@/assets/camisa-flamengo-nova-costas.png";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  badge?: string;
  soldOut?: boolean;
  description: string;
  sizes?: string[];
  customizable?: boolean;
  freeCustomization?: boolean;
  stock?: number;
}

export const sizeChart = {
  masculino: {
    headers: ["Tamanho", "Largura (cm)", "Comprimento (cm)", "Manga (cm)"],
    rows: [
      ["P", "50", "70", "20"],
      ["M", "53", "72", "21"],
      ["G", "56", "74", "22"],
      ["GG", "59", "76", "23"],
      ["XGG", "62", "78", "24"],
    ],
  },
  feminino: {
    headers: ["Tamanho", "Largura (cm)", "Comprimento (cm)", "Manga (cm)"],
    rows: [
      ["P", "44", "64", "17"],
      ["M", "47", "66", "18"],
      ["G", "50", "68", "19"],
      ["GG", "53", "70", "20"],
    ],
  },
  bermuda: {
    headers: ["Tamanho", "Cintura (cm)", "Quadril (cm)", "Comprimento (cm)"],
    rows: [
      ["P", "72", "96", "45"],
      ["M", "76", "100", "46"],
      ["G", "80", "104", "47"],
      ["GG", "84", "108", "48"],
      ["XGG", "88", "112", "49"],
    ],
  },
};

export const products: Product[] = [
  {
    id: "camisa-flamengo-i-2026",
    name: "Camisa Rubro-Negra I 2026 Vermelha e Preta",
    price: 164.90,
    originalPrice: 349.90,
    discount: 53,
    rating: 5,
    reviews: 1523,
    image: camisaFlamengoNovaFrente,
    images: [camisaFlamengoNovaFrente, camisaFlamengoNovaDetalhe1, camisaFlamengoNovaDetalhe2, camisaFlamengoNovaCostas],
    badge: "Mais Vendido",
    description: "Camisa do Mengão I 2026 com patrocinadores. Confeccionada em poliéster reciclado com tecnologia de absorção de suor. Gola polo clássica, escudo bordado no peito e corte regular confortável. Tecido leve e respirável, ideal para jogos no estádio ou uso no dia a dia.",
    sizes: ["P", "M", "G", "GG", "XGG"],
    customizable: true,
    freeCustomization: true,
    stock: 12,
  },
  {
    id: "camisa-selecao-brasileira-azul-2627",
    name: "Camisa de Time Seleção Brasileira Copa do Mundo Azul 26/27",
    price: 189.90,
    originalPrice: 349.90,
    discount: 46,
    rating: 5,
    reviews: 892,
    image: camisaBrasilAzulFrente,
    images: [camisaBrasilAzulFrente, camisaBrasilAzulDetalhe1, camisaBrasilAzulDetalhe2, camisaBrasilAzulCostas],
    badge: "Lançamento",
    description: "Camisa da Seleção Brasileira modelo visitante azul para a Copa do Mundo 26/27. Tecido 100% poliéster com tecnologia de secagem rápida e ventilação otimizada. Estampa exclusiva em tons de azul e preto, escudo da CBF bordado e detalhes em amarelo. Corte regular confortável, ideal para torcer pelo Brasil.",
    sizes: ["P", "M", "G", "GG", "XGG"],
    customizable: true,
    stock: 15,
  },
  {
    id: "camisa-selecao-brasileira-amarela-2627",
    name: "Camisa de Time Seleção Brasileira Copa do Mundo Amarela 26/27",
    price: 189.90,
    originalPrice: 349.90,
    discount: 46,
    rating: 5,
    reviews: 1340,
    image: camisaBrasilAmarelaFrente,
    images: [camisaBrasilAmarelaFrente, camisaBrasilAmarelaDetalhe1, camisaBrasilAmarelaDetalhe2, camisaBrasilAmarelaDetalhe3],
    badge: "Lançamento",
    description: "Camisa da Seleção Brasileira modelo titular amarela para a Copa do Mundo 26/27. Tecido 100% poliéster com tecnologia de secagem rápida. Gola V clássica com detalhes em verde, escudo da CBF bordado e textura exclusiva. Corte regular confortável, perfeita para torcer pelo Brasil com estilo.",
    sizes: ["P", "M", "G", "GG", "XGG"],
    customizable: true,
    stock: 10,
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);

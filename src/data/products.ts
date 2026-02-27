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
import camisaListradaFemFrente from "@/assets/camisa-flamengo-listrada-fem-frente.png";
import camisaListradaFemDetalhe1 from "@/assets/camisa-flamengo-listrada-fem-detalhe1.png";
import camisaListradaFemDetalhe2 from "@/assets/camisa-flamengo-listrada-fem-detalhe2.png";
import camisaListradaFemDetalhe3 from "@/assets/camisa-flamengo-listrada-fem-detalhe3.png";
import camisaListradaFemCostas from "@/assets/camisa-flamengo-listrada-fem-costas.png";
import camisaRealMadridAzulFrente from "@/assets/camisa-real-madrid-azul-frente.png";
import camisaRealMadridAzulDetalhe1 from "@/assets/camisa-real-madrid-azul-detalhe1.png";
import camisaRealMadridAzulDetalhe2 from "@/assets/camisa-real-madrid-azul-detalhe2.png";
import camisaRealMadridAzulDetalhe3 from "@/assets/camisa-real-madrid-azul-detalhe3.png";
import camisaRealMadridAzulCostas from "@/assets/camisa-real-madrid-azul-costas.png";
import camisaCruzeiroAzulFrente from "@/assets/camisa-cruzeiro-azul-frente.png";
import camisaCruzeiroAzulDetalhe1 from "@/assets/camisa-cruzeiro-azul-detalhe1.png";
import camisaCruzeiroAzulDetalhe2 from "@/assets/camisa-cruzeiro-azul-detalhe2.png";
import camisaCruzeiroAzulDetalhe3 from "@/assets/camisa-cruzeiro-azul-detalhe3.png";
import camisaCruzeiroAzulCostas from "@/assets/camisa-cruzeiro-azul-costas.png";
import camisaAlemanhaBrancaFrente from "@/assets/camisa-alemanha-branca-frente.png";
import camisaAlemanhaBrancaDetalhe1 from "@/assets/camisa-alemanha-branca-detalhe1.png";
import camisaAlemanhaBrancaDetalhe2 from "@/assets/camisa-alemanha-branca-detalhe2.png";
import camisaAlemanhaBrancaDetalhe3 from "@/assets/camisa-alemanha-branca-detalhe3.png";
import camisaAlemanhaBrancaCostas from "@/assets/camisa-alemanha-branca-costas.png";

export type ProductCategory = "lancamentos-2026" | "selecoes" | "brasileirao" | "champions";

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
  category: ProductCategory[];
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
    category: ["lancamentos-2026", "brasileirao"],
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
    category: ["selecoes"],
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
    category: ["selecoes"],
  },
  {
    id: "camisa-flamengo-listrada-2627-fem",
    name: "Camisa de Time Flamengo Listrada 26/27 Feminina",
    price: 164.90,
    originalPrice: 349.90,
    discount: 53,
    rating: 5,
    reviews: 743,
    image: camisaListradaFemFrente,
    images: [camisaListradaFemFrente, camisaListradaFemDetalhe1, camisaListradaFemDetalhe2, camisaListradaFemDetalhe3, camisaListradaFemCostas],
    badge: "Lançamento",
    description: "Camisa do Flamengo Listrada 26/27 modelo feminino. Confeccionada em poliéster reciclado com tecnologia de absorção de suor. Gola polo clássica com detalhes em vermelho, escudo CRF bordado no peito e logo Adidas. Corte feminino ajustado para maior conforto. Tecido leve e respirável, perfeita para jogos ou uso casual.",
    sizes: ["P", "M", "G", "GG"],
    customizable: true,
    freeCustomization: true,
    stock: 8,
    category: ["lancamentos-2026", "brasileirao"],
  },
  {
    id: "camisa-cruzeiro-azul-dourado-2526",
    name: "Camisa de Time Cruzeiro Azul c/ Dourado 25/26",
    price: 164.90,
    originalPrice: 349.90,
    discount: 53,
    rating: 5,
    reviews: 687,
    image: camisaCruzeiroAzulFrente,
    images: [camisaCruzeiroAzulFrente, camisaCruzeiroAzulDetalhe1, camisaCruzeiroAzulDetalhe2, camisaCruzeiroAzulDetalhe3, camisaCruzeiroAzulCostas],
    badge: "Lançamento",
    description: "Camisa do Cruzeiro Azul com detalhes dourados 25/26. Confeccionada em poliéster com tecnologia de absorção de suor. Escudo bordado no peito, detalhes em dourado e corte regular confortável. Tecido leve e respirável, ideal para jogos ou uso casual.",
    sizes: ["P", "M", "G", "GG", "XGG"],
    customizable: true,
    stock: 15,
    category: ["brasileirao"],
  },
  {
    id: "camisa-selecao-alemanha-branca-2627",
    name: "Camisa de Time Seleção Alemanha Copa do Mundo Branca 26/27",
    price: 189.90,
    originalPrice: 349.90,
    discount: 46,
    rating: 5,
    reviews: 920,
    image: camisaAlemanhaBrancaFrente,
    images: [camisaAlemanhaBrancaFrente, camisaAlemanhaBrancaDetalhe1, camisaAlemanhaBrancaDetalhe2, camisaAlemanhaBrancaDetalhe3, camisaAlemanhaBrancaCostas],
    badge: "Lançamento",
    description: "Camisa da Seleção Alemanha modelo titular branca para a Copa do Mundo 26/27. Tecido 100% poliéster com tecnologia de secagem rápida. Escudo bordado, detalhes clássicos e corte regular confortável. Perfeita para torcer com estilo.",
    sizes: ["P", "M", "G", "GG", "XGG"],
    customizable: true,
    stock: 12,
    category: ["selecoes"],
  },
  {
    id: "camisa-real-madrid-azul-2025",
    name: "Camisa de Time Real Madrid Azul 2025",
    price: 189.90,
    originalPrice: 349.90,
    discount: 46,
    rating: 5,
    reviews: 1105,
    image: camisaRealMadridAzulFrente,
    images: [camisaRealMadridAzulFrente, camisaRealMadridAzulDetalhe1, camisaRealMadridAzulDetalhe2, camisaRealMadridAzulDetalhe3, camisaRealMadridAzulCostas],
    badge: "Lançamento",
    description: "Camisa do Real Madrid modelo visitante azul 2025. Confeccionada em poliéster com tecnologia AEROREADY de absorção de suor. Gola V com detalhes em branco, escudo bordado no peito e três listras nos ombros. Tecido leve e respirável com textura exclusiva, ideal para jogos ou uso casual.",
    sizes: ["P", "M", "G", "GG", "XGG"],
    customizable: true,
    stock: 14,
    category: ["champions"],
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);

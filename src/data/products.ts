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
}

export const products: Product[] = [
  {
    id: "camisa-flamengo-i-2026",
    name: "Camisa Flamengo I 2026 Vermelha e Preta",
    price: 199.90,
    originalPrice: 349.90,
    discount: 43,
    rating: 5,
    reviews: 1523,
    image: camisaFlamengo2026,
    images: [camisaFlamengo2026, camisa2026Costas],
    badge: "Mais Vendido",
    description: "Camisa oficial do Flamengo I 2026 com patrocinadores. Confeccionada em poliéster reciclado com tecnologia AEROREADY de absorção de suor. Gola polo clássica, escudo CRF bordado no peito e corte regular confortável. Tecido leve e respirável, ideal para jogos no estádio ou uso no dia a dia. Produto licenciado pela Adidas.",
    sizes: ["P", "M", "G", "GG", "XGG"],
    customizable: true,
    freeCustomization: true,
  },
  {
    id: "camisa-flamengo-i-2026-feminina",
    name: "Camisa Flamengo I 2026 Feminina Vermelha e Preta",
    price: 99.90,
    originalPrice: 199.90,
    discount: 50,
    rating: 5,
    reviews: 1102,
    image: camisaFem2026,
    images: [camisaFem2026, camisaFem2026Costas, camisaFem2026Detalhe],
    badge: "Novo",
    description: "Camisa oficial feminina do Flamengo I 2026 Adidas. Tecido 100% poliéster reciclado com tecnologia AEROREADY de absorção de suor. Gola polo clássica, escudo CRF bordado no peito e modelagem feminina ajustada. Tecido leve e respirável, perfeita para jogos no estádio ou uso no dia a dia. Produto licenciado.",
    sizes: ["P", "M", "G", "GG"],
    customizable: true,
  },
  {
    id: "camisa-flamengo-i-2026-sp",
    name: "Camisa Flamengo I 2026 Sem Patrocinadores",
    price: 99.90,
    originalPrice: 199.90,
    discount: 45,
    rating: 5,
    reviews: 876,
    image: camisaFlamengo2026SP,
    images: [camisaFlamengo2026SP],
    badge: "Sem Patrocínio",
    description: "O manto rubro-negro na versão limpa, sem nenhum patrocinador. Tecido 100% poliéster reciclado com tecnologia AEROREADY que mantém o corpo seco. Gola polo, escudo CRF bordado e acabamento premium. Perfeita para quem valoriza a pureza do manto sagrado. Produto licenciado.",
    sizes: ["P", "M", "G", "GG", "XGG"],
    customizable: true,
  },
  {
    id: "camisa-flamengo-treino-2026",
    name: "Camisa de Treino Flamengo 2026 Masculina",
    price: 99.90,
    originalPrice: 179.90,
    discount: 44,
    rating: 5,
    reviews: 734,
    image: camisaTreino,
    images: [camisaTreino, camisaTreinoCostas],
    badge: "Novo",
    description: "Camisa de treino oficial do Flamengo 2026 Adidas. Tecido 100% poliéster com tecnologia AEROREADY de secagem rápida e ventilação otimizada. Corte atlético, gola careca e estampa exclusiva em tons de vermelho e preto. Ideal para treinos, academia e atividades físicas.",
    sizes: ["P", "M", "G", "GG", "XGG"],
    customizable: true,
  },
  {
    id: "camisa-flamengo-ii-2025-branca",
    name: "Camisa Flamengo II 2025 Branca Reserva Masculina",
    price: 99.90,
    originalPrice: 199.90,
    discount: 50,
    rating: 5,
    reviews: 2847,
    image: camisaBranca,
    images: [camisaBranca, camisaBrancaCostas],
    
    description: "Camisa reserva oficial do Flamengo II 2025 Adidas, modelo branco com detalhes em vermelho e preto nas mangas. Tecido 100% poliéster reciclado com tecnologia AEROREADY de controle de umidade. Gola careca, escudo CRF bordado em vermelho e costura reforçada. Conforto e estilo para representar a Nação.",
    sizes: ["P", "M", "G", "GG", "XGG"],
    customizable: true,
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
    images: [mochilaFlamengo, mochilaCostas, mochilaLateral, bolsaFlamengo],
    description: "Kit Mochila + Bolsa Shoulder Bag oficial do Flamengo. Mochila em poliéster resistente com escudo CRF bordado, compartimento acolchoado para notebook até 15\", bolsos laterais em tela e alças acolchoadas ajustáveis. Acompanha bolsa transversal destacável com zíper e alça regulável. Capacidade de 25L.",
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
    description: "Cropete feminino oficial do Flamengo 2025, modelo bege com acabamento dourado. Tecido em algodão e poliéster com toque macio e caimento justo. Escudo CRF bordado, barra cortada e modelagem cropped moderna. Perfeito para compor looks casuais com atitude rubro-negra.",
    sizes: ["P", "M", "G", "GG"],
    customizable: true,
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
    images: [bermudaBranca, bermudaBrancaCostas],
    description: "Shorts oficial do Flamengo I 2025 Adidas, modelo branco com listras vermelhas laterais. Tecido 100% poliéster reciclado com tecnologia Climacool de ventilação. Cós elástico com cordão interno, escudo CRF bordado e bolsos laterais. Leve, confortável e com secagem rápida.",
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
    images: [bermudaPreta, bermudaPretaFrente, bermudaPretaCostas, bermudaPretaDetalhe],
    description: "Shorts reserva oficial do Flamengo II 2025 Adidas, modelo preto com detalhes em vermelho. Tecido 100% poliéster reciclado com tecnologia Climacool para máxima ventilação. Cós elástico com cordão, escudo CRF bordado e acabamento premium. Ideal para jogos e treinos.",
    sizes: ["P", "M", "G", "GG", "XGG"],
  },
  {
    id: "camisa-flamengo-iii-2025-creme-feminina",
    name: "Camisa Flamengo III 2025 Creme Dourada Feminina",
    price: 99.90,
    originalPrice: 219.90,
    discount: 55,
    rating: 5,
    reviews: 1187,
    image: camisaCreme,
    images: [camisaCreme, camisaCremeFemCostas],
    
    description: "Camisa especial feminina do Flamengo III 2025 Adidas, modelo creme com detalhes dourados. Tecido 100% poliéster reciclado com tecnologia AEROREADY de absorção de suor. Listras rubro-negras nos ombros, escudo CRF bordado em dourado e modelagem feminina ajustada. Elegância e tradição em cada detalhe.",
    sizes: ["P", "M", "G", "GG"],
    customizable: true,
  },
  {
    id: "camisa-flamengo-iii-2025-creme-masculina",
    name: "Camisa Flamengo III 2025 Creme Dourada Masculina",
    price: 99.90,
    originalPrice: 219.90,
    discount: 55,
    rating: 5,
    reviews: 943,
    image: camisaCremeM,
    images: [camisaCremeM, camisaCremeMascCostas],
    
    description: "Camisa especial masculina do Flamengo III 2025 Adidas, modelo creme com detalhes dourados. Tecido 100% poliéster reciclado com tecnologia AEROREADY de secagem rápida. Listras rubro-negras nos ombros, escudo CRF bordado em dourado e corte regular. Uma peça de colecionador para o torcedor exigente.",
    sizes: ["P", "M", "G", "GG", "XGG"],
    customizable: true,
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
    images: [bermudaCreme, bermudaCremeCostas],
    description: "Shorts especial do Flamengo III 2025 Adidas, modelo creme com detalhes dourados e listras rubro-negras laterais. Tecido 100% poliéster reciclado com tecnologia Climacool. Cós elástico com cordão, escudo CRF bordado em dourado. Combina perfeitamente com a camisa III para o uniforme completo.",
    sizes: ["P", "M", "G", "GG", "XGG"],
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);

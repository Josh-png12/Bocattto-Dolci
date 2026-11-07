/**
 * Catálogo de Bocatto Dolci extraído de su menú público en OlaClick.
 *
 * Fuente de datos (solo investigación, no canal de pedidos): https://bocatto-dolci.ola.click/products
 * Fecha de consulta: 2026-11-07 (America/Bogota).
 *
 * Reglas:
 * - `name` y `description` se copian literalmente de OlaClick (incluidas erratas y emojis).
 * - `displayName` elimina emojis y corrige espacios/tildes evidentes para titulares
 *   (p. ej. "FrutosRojos + Maracuya" → "Frutos Rojos + Maracuyá"); `name` conserva el literal.
 * - Los precios están en COP y pueden cambiar; la demo no garantiza precios ni disponibilidad.
 * - `traits` se derivan exclusivamente de palabras presentes en la descripción oficial
 *   (ver `evidence`), y alimentan el recomendador local.
 */

export const CATALOG_SOURCE = {
  menuUrl: "https://bocatto-dolci.ola.click/products",
  baseUrl: "https://bocatto-dolci.ola.click",
  retrievedAt: "2026-11-07",
  retrievedAtLabel: "7 de noviembre de 2026",
  instagramUrl: "https://www.instagram.com/bocatto.dolci/",
  city: "Riohacha, La Guajira",
  /**
   * Configuración que OlaClick mostraba al momento de la consulta. Solo como referencia:
   * NO se muestra ni se suma en Bocatto Experience hasta que Bocatto confirme sus condiciones.
   */
  olaclickReference: { deliveryFee: 5000, averageTime: "20 - 30 min", paymentMethods: ["Efectivo", "Transferencia"] },
} as const;

export type CategoryId =
  | "cheesecakes-artesanales"
  | "duos-bono-de-regalo"
  | "postres-xl-por-encargo"
  | "complementos";

export interface Category {
  id: CategoryId;
  /** Nombre exacto en OlaClick. */
  name: string;
  /** Nombre sin emojis para la interfaz. */
  label: string;
  /** Orden en que OlaClick muestra las categorías. */
  position: number;
}

export const CATEGORIES: Category[] = [
  { id: "duos-bono-de-regalo", name: "Dúos + Bono de Regalo", label: "Dúos + Bono de Regalo", position: 0 },
  { id: "cheesecakes-artesanales", name: "Cheesecakes Artesanales", label: "Cheesecakes Artesanales", position: 1 },
  { id: "postres-xl-por-encargo", name: "Postres XL 🧡 – Por Encargo", label: "Postres XL – Por Encargo", position: 2 },
  { id: "complementos", name: "Complementos", label: "Complementos", position: 3 },
];

export interface ModifierOption {
  name: string;
  /** Valor adicional en COP. */
  price: number;
}

export interface ModifierGroup {
  name: string;
  required: boolean;
  min: number;
  max: number;
  options: ModifierOption[];
}

export type FlavorBase = "chocolate" | "fruta";
export type FlavorProfile = "intenso" | "refrescante" | "equilibrado";
export type Format = "individual" | "duo" | "xl" | "complemento";

export interface Product {
  id: string;
  slug: string;
  category: CategoryId;
  /** Nombre exacto en OlaClick. */
  name: string;
  displayName: string;
  /** Descripción exacta en OlaClick. */
  description: string;
  /** Precio actual en COP. */
  price: number;
  /** Precio anterior en COP cuando OlaClick muestra un descuento. */
  originalPrice?: number;
  image: { base: string; alt: string; sourceUrl: string };
  modifiers: ModifierGroup[];
  /** Condiciones especiales literales (anticipación, porciones). */
  conditions?: string[];
  /** Aparece en la categoría oculta "Destacados" de OlaClick. */
  featured?: boolean;
  traits: {
    base: FlavorBase[];
    profile: FlavorProfile[];
    format: Format;
    /** Fragmentos de la descripción oficial que justifican los rasgos. */
    evidence: string[];
  };
}

/** Grupo "Adicionales" compartido por los cheesecakes y dúos (obligatorio, elegir 1). */
const ADICIONALES: ModifierGroup = {
  name: "Adicionales",
  required: true,
  min: 1,
  max: 1,
  options: [
    { name: "Leche Condesada 25Gr", price: 1000 },
    { name: "Chips de Chocolate", price: 1000 },
    { name: "Brownie de chocolate", price: 1500 },
    { name: "Brownie de milo", price: 1500 },
    { name: "Salsa de Mango", price: 1000 },
    { name: "Sin Adicional", price: 0 },
  ],
};

const OLA_IMG = "https://assets.olaclick.app/companies/products/images/800/";

export const PRODUCTS: Product[] = [
  // ——— Cheesecakes Artesanales (orden de OlaClick) ———
  {
    id: "9f1d901a-c8e5-45f7-979e-078614443d99",
    slug: "cheesecake-de-oreo",
    category: "cheesecakes-artesanales",
    name: "Cheesecake de Oreo",
    displayName: "Cheesecake de Oreo",
    description:
      "Un clásico que nunca falla. Cremoso cheesecake con salsa de chocolate, galleta Oreo triturada y el toque final: una galleta Oreo partida por la mitad. Textura crujiente, sabor intenso y puro placer en cada bocado.",
    price: 13000,
    image: {
      base: "cheesecake-de-oreo",
      alt: "Vaso kraft con cheesecake de Oreo, salsa de chocolate y media galleta encima, sostenido en la mano en un jardín",
      sourceUrl: OLA_IMG + "bcab00d7-2d2f-41d3-8ea9-fb4c012aada6.jpg",
    },
    modifiers: [ADICIONALES],
    traits: {
      base: ["chocolate"],
      profile: ["intenso"],
      format: "individual",
      evidence: ["salsa de chocolate", "galleta Oreo triturada", "sabor intenso", "Textura crujiente"],
    },
  },
  {
    id: "a01395d1-4674-4426-996e-056027a30961",
    slug: "cheesecake-de-nutella",
    category: "cheesecakes-artesanales",
    name: "Cheesecake de Nutella",
    displayName: "Cheesecake de Nutella",
    description:
      "Una base crocante de galletas Ducales, cubierta con una suave y cremosa mezcla de queso y crema de avellanas. Coronado con un irresistible toque de Nutella y trocitos de maní que aportan el equilibrio perfecto entre lo dulce, lo cremoso y lo crocante. Un postre hecho para los verdaderos amantes del chocolate.",
    price: 14000,
    image: {
      base: "cheesecake-de-nutella",
      alt: "Vaso kraft abierto con cheesecake de Nutella cubierto de trocitos de maní sobre mármol",
      sourceUrl: OLA_IMG + "02489f4d-ac75-4b3d-a755-5e932f82ecff.jpg",
    },
    modifiers: [ADICIONALES],
    traits: {
      base: ["chocolate"],
      profile: ["intenso", "equilibrado"],
      format: "individual",
      evidence: ["crema de avellanas", "trocitos de maní", "verdaderos amantes del chocolate", "equilibrio perfecto"],
    },
  },
  {
    id: "9f327462-2efa-4541-927e-8a14a658ef73",
    slug: "cheesecake-de-frutos-rojos",
    category: "cheesecakes-artesanales",
    name: "Cheesecake de Frutos Rojos🌟",
    displayName: "Cheesecake de Frutos Rojos",
    description:
      "Una explosión de sabor intenso y equilibrado. Decorado con nuestra mermelada artesanal de frutos rojos y coronado con frambuesas cubiertas de chocolate. Cada cucharada es una mezcla perfecta de dulzura, acidez y textura.",
    price: 14500,
    featured: true,
    image: {
      base: "cheesecake-de-frutos-rojos",
      alt: "Vaso kraft con cheesecake de frutos rojos, mermelada brillante y frambuesas, sostenido en la mano frente a un jardín",
      sourceUrl: OLA_IMG + "e3814c3c-3f57-4a17-9a2c-c0e2a2bc4599.jpg",
    },
    modifiers: [ADICIONALES],
    traits: {
      base: ["fruta"],
      profile: ["intenso", "equilibrado"],
      format: "individual",
      evidence: ["sabor intenso y equilibrado", "mermelada artesanal de frutos rojos", "dulzura, acidez y textura"],
    },
  },
  {
    id: "9f1d901a-c039-47b4-8b31-9d3421a9d6df",
    slug: "cheesecake-de-maracuya",
    category: "cheesecakes-artesanales",
    name: "Cheesecake de Maracuyá",
    displayName: "Cheesecake de Maracuyá",
    description:
      "Una base crocante de galleta, relleno suave y cremoso con un toque cítrico, cubierto con nuestra clásica mermelada de maracuyá artesanal. El equilibrio perfecto entre lo dulce y lo ácido, para los que aman los sabores intensos y refrescantes.",
    price: 13000,
    image: {
      base: "cheesecake-de-maracuya",
      alt: "Vaso kraft con cheesecake cubierto de mermelada de maracuyá amarilla, sostenido en la mano en un jardín",
      sourceUrl: OLA_IMG + "ca4467f8-1528-4a94-a170-47be111fd2a5.jpg",
    },
    modifiers: [ADICIONALES],
    traits: {
      base: ["fruta"],
      profile: ["refrescante", "intenso"],
      format: "individual",
      evidence: ["toque cítrico", "mermelada de maracuyá artesanal", "sabores intensos y refrescantes"],
    },
  },
  {
    id: "9f327463-f9fd-4ba3-8a3d-84f2a01b0e90",
    slug: "cheesecake-de-milo",
    category: "cheesecakes-artesanales",
    name: "Cheesecake de Milo",
    displayName: "Cheesecake de Milo",
    description:
      "Una cremosa mezcla con todo el sabor del Milo, ahora mejorada con nuggets de Milo dentro de la crema, polvo de Milo espolvoreado como topping y una galleta partida por la mitad coronando el postre junto a trozos extra de nuggets para una experiencia intensamente chocolatera.",
    price: 14000,
    image: {
      base: "cheesecake-de-milo",
      alt: "Vaso kraft con cheesecake de Milo espolvoreado y media galleta, sostenido en la mano en un jardín",
      sourceUrl: OLA_IMG + "f8d346b2-27af-4144-83d3-3fa6c3ee5ba1.jpg",
    },
    modifiers: [ADICIONALES],
    traits: {
      base: ["chocolate"],
      profile: ["intenso"],
      format: "individual",
      evidence: ["nuggets de Milo", "polvo de Milo espolvoreado", "intensamente chocolatera"],
    },
  },

  // ——— Dúos + Bono de Regalo ———
  {
    id: "9fe25f47-a264-45a6-87a2-f863bc46d7e8",
    slug: "cheesecake-de-milo-oreo",
    category: "duos-bono-de-regalo",
    name: "Cheesecake de Milo + Oreo",
    displayName: "Cheesecake de Milo + Oreo",
    description:
      "La combinación perfecta para los amantes del chocolate: cheesecake cremoso de Milo con nuggets y topping espolvoreado, junto a un clásico cheesecake de Oreo con su toque crujiente e intenso sabor.",
    price: 25300,
    originalPrice: 28200,
    featured: true,
    image: {
      base: "cheesecake-de-milo-oreo",
      alt: "Dos vasos kraft, cheesecake de Milo y cheesecake de Oreo, junto a galletas y salsa de chocolate sobre mármol",
      sourceUrl: OLA_IMG + "1f6aaf06-cbd2-47a8-ba8b-f6bcca492b49.jpg",
    },
    modifiers: [ADICIONALES],
    traits: {
      base: ["chocolate"],
      profile: ["intenso"],
      format: "duo",
      evidence: ["amantes del chocolate", "intenso sabor", "dos cheesecakes"],
    },
  },
  {
    id: "9fe2fd7f-21c4-4e91-8f1b-90ce2fae9c9f",
    slug: "cheesecake-de-frutosrojos-maracuya",
    category: "duos-bono-de-regalo",
    name: "Cheesecake de FrutosRojos + Maracuya",
    displayName: "Cheesecake de Frutos Rojos + Maracuyá",
    description:
      "La frescura tropical del maracuyá se une a la intensidad de los frutos rojos en dos cheesecakes cremosos, con bases crocantes y mermeladas artesanales que equilibran dulzura y acidez en cada bocado.",
    price: 25500,
    originalPrice: 27500,
    image: {
      base: "cheesecake-de-frutosrojos-maracuya",
      alt: "Dos vasos kraft, cheesecake de maracuyá y cheesecake de frutos rojos, con fresas y arándanos sobre mármol",
      sourceUrl: OLA_IMG + "30a87348-1884-4356-9cff-f24f88717e85.jpg",
    },
    modifiers: [ADICIONALES],
    traits: {
      base: ["fruta"],
      profile: ["refrescante", "intenso", "equilibrado"],
      format: "duo",
      evidence: ["frescura tropical del maracuyá", "intensidad de los frutos rojos", "equilibran dulzura y acidez"],
    },
  },
  {
    id: "a04539ff-f4bd-4fcb-828f-b6dbb5c2f40b",
    slug: "cheesecake-de-nutella-oreo",
    category: "duos-bono-de-regalo",
    name: "Cheesecake de Nutella + Oreo",
    displayName: "Cheesecake de Nutella + Oreo",
    description:
      "Una base crocante de galletas Ducales sostiene una suave y cremosa mezcla de queso con crema de avellanas. Coronado con un irresistible toque de Nutella, trocitos de maní y galleta Oreo triturada que aportan el equilibrio perfecto entre lo dulce, lo cremoso y lo crocante. Un postre hecho para los verdaderos amantes del chocolate: textura crujiente, sabor intenso y puro placer en cada bocado.",
    price: 24500,
    originalPrice: 27000,
    image: {
      base: "cheesecake-de-nutella-oreo",
      alt: "Dos vasos kraft, cheesecake de Oreo y cheesecake de Nutella con maní, junto a un frasco de crema de avellanas sobre mármol",
      sourceUrl: OLA_IMG + "bbeee88a-e826-47a8-84f3-5a5ab63b589b.jpg",
    },
    modifiers: [ADICIONALES],
    traits: {
      base: ["chocolate"],
      profile: ["intenso", "equilibrado"],
      format: "duo",
      evidence: ["verdaderos amantes del chocolate", "sabor intenso", "equilibrio perfecto"],
    },
  },

  // ——— Postres XL – Por Encargo ———
  {
    id: "9f94990b-d0d2-439a-9f34-1f0bfcc55962",
    slug: "cheescake-xl-10-12-porciones",
    category: "postres-xl-por-encargo",
    name: "Cheescake XL (10-12 porciones)",
    displayName: "Cheescake XL (10-12 porciones)",
    description:
      "(24 horas de anticipación). Este irresistible cheesecake XL es perfecto para sorprender y compartir en grande. Con una base de galleta dorada y crujiente, combina a la perfección dos sabores: la frescura cítrica del limón y la dulzura intensa de los frutos rojos. Su suave y cremosa textura está decorada con mermelada artesanal, fresas, arándanos y Moras  frescas, creando una experiencia única en cada bocado. Ideal para toda ocasión especial.",
    price: 50000,
    image: {
      base: "cheescake-xl-10-12-porciones",
      alt: "Cheesecake XL redondo visto desde arriba: mitad frutos rojos con mermelada y mitad limón con galletas, con el sello de Bocatto Dolci al centro",
      sourceUrl: OLA_IMG + "63063aba-b344-473f-9774-786ec7eb4363.jpeg",
    },
    modifiers: [
      {
        name: "Combina tu Postre",
        required: false,
        min: 1,
        max: 1,
        options: [{ name: "Combina tu Postre", price: 8000 }],
      },
    ],
    conditions: ["24 horas de anticipación", "10-12 porciones"],
    traits: {
      base: ["fruta"],
      profile: ["refrescante", "intenso"],
      format: "xl",
      evidence: ["frescura cítrica del limón", "dulzura intensa de los frutos rojos", "compartir en grande"],
    },
  },

  // ——— Complementos ———
  {
    id: "9f8a1699-2228-42cd-960f-5998d407aefe",
    slug: "tarjeta-personalizada",
    category: "complementos",
    name: "Tarjeta Personalizada",
    displayName: "Tarjeta Personalizada",
    description: "Frase corta con mensaje personalizado",
    price: 1000,
    image: {
      base: "tarjeta-personalizada",
      alt: "Tarjeta de Bocatto Dolci con borde a rayas y un mensaje escrito a mano sobre una bolsa kraft",
      sourceUrl: OLA_IMG + "00203468-5865-4b33-bc98-0225e2955e4f.jpg",
    },
    modifiers: [],
    traits: { base: [], profile: [], format: "complemento", evidence: ["mensaje personalizado"] },
  },
];

/** URL del producto en OlaClick: solo trazabilidad de la fuente, no se usa para pedir. */
export const sourceProductUrl = (p: Product) => `${CATALOG_SOURCE.baseUrl}/${p.category}/${p.slug}`;

export const imageSrc = (p: Product, w: 400 | 800) => `/images/products/${p.image.base}-${w}.webp`;

export const imageSrcSet = (p: Product) =>
  `${imageSrc(p, 400)} 400w, ${imageSrc(p, 800)} 800w`;

export const discountPercent = (p: Product) =>
  p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;

export const bySlug = (slug: string) => {
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) throw new Error(`Producto no encontrado: ${slug}`);
  return p;
};

export const categoryOf = (p: Product) => CATEGORIES.find((c) => c.id === p.category)!;

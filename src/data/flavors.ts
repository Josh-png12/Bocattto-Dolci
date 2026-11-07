import type { IngredientKind } from "../components/Ingredient";

/**
 * Dirección de arte por sabor para el explorador. Los colores se tomaron
 * de las fotografías reales (mermelada, cobertura) y de la paleta de marca.
 * Los ingredientes decorativos solo incluyen elementos mencionados en la
 * descripción oficial de cada producto.
 */
export interface FlavorTheme {
  slug: string;
  /** Nombre corto para la pestaña. */
  short: string;
  /** Línea editorial breve, parafraseando la descripción oficial. */
  line: string;
  bg: string;
  ink: string;
  /** Tono del anillo/acento sobre el fondo. */
  accent: string;
  /** Color de la "crema" dentro del sello. */
  cream: string;
  ingredients: IngredientKind[];
  /** Palabras clave (literales de la descripción) para las etiquetas. */
  notes: string[];
}

export const FLAVORS: FlavorTheme[] = [
  {
    slug: "cheesecake-de-frutos-rojos",
    short: "Frutos Rojos",
    line: "Mermelada artesanal y frambuesas cubiertas de chocolate.",
    bg: "#9E122C",
    ink: "#FFF1E6",
    accent: "#F7B9B0",
    cream: "#FCECDF",
    ingredients: ["raspberry", "raspberry", "chocolate-chip", "raspberry"],
    notes: ["Intenso y equilibrado", "Dulzura y acidez", "Mermelada artesanal"],
  },
  {
    slug: "cheesecake-de-maracuya",
    short: "Maracuyá",
    line: "Toque cítrico y la clásica mermelada de maracuyá de la casa.",
    bg: "#F2B33D",
    ink: "#2A1712",
    accent: "#9E122C",
    cream: "#FFF4D6",
    ingredients: ["passionfruit", "seeds", "cookie-crumb", "passionfruit"],
    notes: ["Intenso y refrescante", "Dulce y ácido", "Base crocante"],
  },
  {
    slug: "cheesecake-de-oreo",
    short: "Oreo",
    line: "Salsa de chocolate, galleta triturada y media galleta de corona.",
    bg: "#2A1712",
    ink: "#FCECDF",
    accent: "#EE6A43",
    cream: "#F4E6D6",
    ingredients: ["sandwich-cookie", "cookie-crumb", "chocolate-chip", "sandwich-cookie"],
    notes: ["Un clásico", "Textura crujiente", "Sabor intenso"],
  },
  {
    slug: "cheesecake-de-nutella",
    short: "Nutella",
    line: "Crema de avellanas sobre base de galletas Ducales, con maní.",
    bg: "#6B3A22",
    ink: "#FCECDF",
    accent: "#F3B58A",
    cream: "#E9C9A6",
    ingredients: ["peanut", "hazelnut", "peanut", "cookie-crumb"],
    notes: ["Dulce, cremoso y crocante", "Base Ducales", "Trocitos de maní"],
  },
  {
    slug: "cheesecake-de-milo",
    short: "Milo",
    line: "Nuggets dentro de la crema y polvo de Milo por encima.",
    bg: "#D8BE97",
    ink: "#2A1712",
    accent: "#9E122C",
    cream: "#8A5A3B",
    ingredients: ["nugget", "nugget", "cookie-crumb", "chocolate-chip"],
    notes: ["Intensamente chocolatero", "Nuggets de Milo", "Galleta de corona"],
  },
];

import { PRODUCTS, type FlavorBase, type FlavorProfile, type Product } from "../data/catalog";

export type Occasion = "solo" | "duo" | "grupo";

export interface CravingAnswers {
  base?: FlavorBase;
  profile?: Exclude<FlavorProfile, "equilibrado">;
  occasion?: Occasion;
}

export interface Recommendation {
  product: Product;
  score: number;
  /** Razones legibles, cada una respaldada por la descripción oficial. */
  reasons: string[];
  /** true cuando ningún producto cumple las tres respuestas a la vez. */
  approximate: boolean;
}

const FORMAT_FOR: Record<Occasion, Product["traits"]["format"]> = {
  solo: "individual",
  duo: "duo",
  grupo: "xl",
};

/**
 * Recomendador local y determinista. Puntúa cada postre según rasgos
 * verificables (base de sabor, perfil y formato) y devuelve el ranking.
 * Pesos: formato 6 (domina: es lo único que no se ajusta al pedir), base 3, perfil 2.
 */
export function recommend(a: Required<CravingAnswers>): Recommendation[] {
  const wantedFormat = FORMAT_FOR[a.occasion];
  const candidates = PRODUCTS.filter((p) => p.traits.format !== "complemento");

  const scored = candidates.map((p) => {
    let score = 0;
    const reasons: string[] = [];
    const matchesFormat = p.traits.format === wantedFormat;
    const matchesBase = p.traits.base.includes(a.base);
    const matchesProfile = p.traits.profile.includes(a.profile);

    if (matchesFormat) {
      score += 6;
      reasons.push(
        wantedFormat === "individual"
          ? "Porción individual en su vaso kraft."
          : wantedFormat === "duo"
            ? "Son dos cheesecakes: uno para ti y otro para compartir o regalar."
            : "Rinde 10-12 porciones. Pídelo con 24 horas de anticipación.",
      );
    }
    if (matchesBase) {
      score += 3;
      reasons.push(a.base === "chocolate" ? "Va directo al antojo de chocolate." : "Lleva fruta y mermelada artesanal.");
    }
    if (matchesProfile) {
      score += 2;
      const quote = p.traits.evidence.find((e) =>
        a.profile === "intenso" ? /intens|chocolat/i.test(e) : /fresc|cítric|refresc/i.test(e),
      );
      if (quote) reasons.push(`En palabras de Bocatto: “${quote}”.`);
    }
    // Pequeño desempate: los destacados en OlaClick primero.
    if (p.featured) score += 0.25;

    return { product: p, score, reasons, approximate: !(matchesFormat && matchesBase && matchesProfile) };
  });

  return scored.sort((x, y) => y.score - x.score);
}

export const QUESTIONS = [
  {
    key: "base",
    title: "¿Chocolate o fruta?",
    options: [
      { value: "chocolate", label: "Chocolate", hint: "Oreo, Nutella, Milo" },
      { value: "fruta", label: "Fruta", hint: "Frutos rojos, maracuyá, limón" },
    ],
  },
  {
    key: "profile",
    title: "¿Algo intenso o refrescante?",
    options: [
      { value: "intenso", label: "Intenso", hint: "Para un antojo con todo" },
      { value: "refrescante", label: "Refrescante", hint: "Cítrico, ligero, tropical" },
    ],
  },
  {
    key: "occasion",
    title: "¿Para ti o para compartir?",
    options: [
      { value: "solo", label: "Solo para mí", hint: "Un vaso individual" },
      { value: "duo", label: "Para dos o de regalo", hint: "Dúos con descuento" },
      { value: "grupo", label: "Para el grupo", hint: "XL de 10-12 porciones" },
    ],
  },
] as const;

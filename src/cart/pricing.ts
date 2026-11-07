import { PRODUCTS, type Product } from "../data/catalog";
import { ORDERING } from "../config/ordering";

/** Opción elegida dentro de un grupo de modificadores del producto. */
export interface ChosenOption {
  group: string;
  name: string;
}

/** Línea guardada en el carrito: solo referencias, nunca precios. */
export interface CartLine {
  key: string;
  productId: string;
  qty: number;
  options: ChosenOption[];
  /** Mensaje de la Tarjeta Personalizada (único texto libre por producto). */
  note?: string;
}

/** Línea con precios calculados SIEMPRE desde el catálogo. */
export interface PricedLine extends CartLine {
  product: Product;
  options: (ChosenOption & { price: number })[];
  unit: number;
  subtotal: number;
}

export const lineKey = (productId: string, options: ChosenOption[], note?: string) =>
  [productId, ...options.map((o) => `${o.group}=${o.name}`).sort(), note?.trim() ?? ""].join("|");

export const clampQty = (n: number) => Math.max(1, Math.min(ORDERING.maxQtyPerLine, Math.round(n) || 1));

/**
 * Valida una selección contra el catálogo: el producto existe, cada opción
 * pertenece a su grupo, y los grupos obligatorios tienen entre min y max opciones.
 */
export function validateSelection(product: Product, options: ChosenOption[]): string | null {
  for (const o of options) {
    const g = product.modifiers.find((m) => m.name === o.group);
    if (!g || !g.options.some((x) => x.name === o.name)) return `La opción “${o.name}” no existe para ${product.displayName}.`;
  }
  for (const g of product.modifiers) {
    const n = options.filter((o) => o.group === g.name).length;
    if (g.required && n < g.min) return `Elige una opción de “${g.name}”.`;
    if (n > g.max) return `Solo puedes elegir ${g.max} en “${g.name}”.`;
  }
  return null;
}

/** Precio unitario = precio del producto + suma de opciones elegidas. */
export function priceLine(line: CartLine): PricedLine | null {
  const product = PRODUCTS.find((p) => p.id === line.productId);
  if (!product || validateSelection(product, line.options)) return null;
  const options = line.options.map((o) => {
    const opt = product.modifiers.find((m) => m.name === o.group)!.options.find((x) => x.name === o.name)!;
    return { ...o, price: opt.price };
  });
  const unit = product.price + options.reduce((s, o) => s + o.price, 0);
  const qty = clampQty(line.qty);
  return { ...line, qty, product, options, unit, subtotal: unit * qty };
}

export const orderTotal = (lines: PricedLine[]) => lines.reduce((s, l) => s + l.subtotal, 0);
export const itemCount = (lines: PricedLine[]) => lines.reduce((s, l) => s + l.qty, 0);

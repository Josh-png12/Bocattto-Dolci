import { ORDERING, whatsappLink } from "../config/ordering";
import { orderTotal, type PricedLine } from "./pricing";

/** Quita emojis y símbolos pictográficos del texto libre: la redirección de wa.me los convierte en "�". */
export const stripEmoji = (s: string) =>
  s
    .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}\u{20E3}]/gu, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

/** "$28.000" — formato compacto para el mensaje de WhatsApp. */
const money = (n: number) => `$${n.toLocaleString("es-CO", { maximumFractionDigits: 0 })}`;

/**
 * Mensaje del pedido para WhatsApp. Incluye por producto: nombre, cantidad,
 * opciones elegidas, precio unitario y subtotal; al final el total estimado.
 * El texto deja claro que Bocatto debe confirmar disponibilidad, pago y entrega.
 */
export function buildOrderMessage(lines: PricedLine[], orderNote?: string): string {
  const out: string[] = [ORDERING.greeting, ""];
  for (const l of lines) {
    out.push(`- ${l.qty} × ${l.product.displayName} — ${money(l.subtotal)}`);
    for (const o of l.options) {
      const label = o.group === o.name ? o.name : `${o.group}: ${o.name}`;
      out.push(`   ${label}${o.price ? ` (+${money(o.price)})` : ""}`);
    }
    const card = l.note ? stripEmoji(l.note) : "";
    if (card) out.push(`   Mensaje de la tarjeta: “${card}”`);
    out.push(`   Precio unitario: ${money(l.unit)}`);
    out.push(`   Subtotal: ${money(l.subtotal)}`);
  }
  out.push("", `Total estimado: ${money(orderTotal(lines))} COP (sin domicilio)`);
  const note = orderNote ? stripEmoji(orderNote) : "";
  if (note) out.push("", `Nota: ${note}`);
  out.push("", ORDERING.closing);
  return out.join("\n");
}

export const orderWhatsappUrl = (lines: PricedLine[], note?: string) => whatsappLink(buildOrderMessage(lines, note));

export const inquiryWhatsappUrl = () => whatsappLink(ORDERING.inquiry);

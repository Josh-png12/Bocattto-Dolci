import { CATALOG_SOURCE } from "../data/catalog";
import { useCart } from "../cart/CartContext";
import { InquiryLink } from "../components/InquiryLink";
import { Seal } from "../components/Seal";
import { Bag, Chat, Clock } from "../components/Icons";
import { formatCOP } from "../lib/format";

/** Cómo pedir: flujo propio de Bocatto Experience, presentado como un recibo kraft. */
const STEPS = [
  { title: "Elige y personaliza", detail: "Adicional + cantidad", body: "Agrega tus postres con su adicional y la cantidad que quieras." },
  { title: "Revisa tu pedido", detail: "Total estimado", body: "Cambia cantidades o quita productos. El total se calcula con los precios del menú." },
  {
    title: "Envíalo por WhatsApp",
    detail: "Bocatto confirma",
    body: "Se abre WhatsApp con tu pedido organizado. Bocatto te confirma disponibilidad, pago y entrega.",
  },
];

export function HowToOrder() {
  const { count, total, openCart } = useCart();
  return (
    <section
      id="pedir"
      aria-labelledby="pedir-title"
      className="grain relative overflow-hidden bg-cacao text-peach"
      style={{ ["--focus" as string]: "var(--color-peach)" }}
    >
      <div className="mx-auto grid max-w-[88rem] *:min-w-0 gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12 lg:px-10">
        <div className="relative lg:col-span-5">
          <h2 id="pedir-title" className="display text-[clamp(2.75rem,7.5vw,5rem)]">
            Del antojo
            <br />a tu puerta.
          </h2>
          <p className="mt-5 max-w-[42ch] text-lg text-peach/85">
            Arma tu pedido aquí mismo y envíalo por WhatsApp. Enviar el mensaje no confirma la compra: Bocatto te responde para confirmarla.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button type="button" onClick={openCart} aria-haspopup="dialog" className="btn btn-cream">
              <Bag className="size-5" />
              {count > 0 ? (
                <span>
                  Ver mi pedido <span className="tabular-nums">· {formatCOP(total)}</span>
                </span>
              ) : (
                <span>Ver mi pedido</span>
              )}
            </button>
            <InquiryLink label="Consultas por WhatsApp" className="btn btn-ghost text-peach">
              <Chat className="size-5" /> Consultas
            </InquiryLink>
          </div>
        </div>

        {/* Recibo kraft con borde dentado. */}
        <div className="lg:col-span-7 lg:self-center">
          <div className="receipt grain relative mx-auto max-w-[40rem] rotate-[-1.2deg] bg-kraft px-6 pb-12 pt-8 text-cacao shadow-[0_40px_60px_-30px_rgb(0_0_0/0.7)] sm:px-10">
            <p className="flex flex-col gap-1 border-b-2 border-dashed border-cacao/30 pb-4 text-sm font-semibold uppercase tracking-[0.14em] text-cacao-soft sm:flex-row sm:items-baseline sm:justify-between">
              <span>Tu pedido</span>
              <span>Bocatto Dolci · {CATALOG_SOURCE.city}</span>
            </p>
            <ol className="divide-y-2 divide-dashed divide-cacao/20">
              {STEPS.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2.75rem_1fr] gap-x-3 py-5">
                  <span className="display text-4xl text-carmine" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="flex items-end gap-3 text-xl font-bold leading-tight">
                      <span className="sr-only">Paso {i + 1}: </span>
                      <span>{s.title}</span>
                      <span className="dotted-leader hidden sm:block" aria-hidden="true" />
                      <span className="hidden shrink-0 text-base font-semibold text-cacao-soft sm:block">{s.detail}</span>
                    </h3>
                    <p className="mt-1 text-[0.95rem] font-semibold text-cacao-soft sm:hidden">{s.detail}</p>
                    <p className="mt-1.5 text-[0.98rem] leading-relaxed text-cacao/85">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-2 flex items-start gap-3 rounded-2xl bg-carmine px-4 py-3.5 text-[0.95rem] leading-snug text-peach">
              <Clock className="mt-0.5 size-5 shrink-0" />
              <span>
                <strong>El Cheesecake XL se pide con 24 horas de anticipación.</strong> El costo del domicilio y la forma de pago los
                confirma Bocatto por WhatsApp.
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-64 opacity-[0.1] sm:w-80" aria-hidden="true">
        <Seal bare cream="var(--color-peach)" shadow="transparent" />
      </div>
    </section>
  );
}

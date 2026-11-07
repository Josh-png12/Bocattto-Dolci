import { useEffect, useRef, useState } from "react";
import { useCart } from "../cart/CartContext";
import { buildOrderMessage, orderWhatsappUrl } from "../cart/message";
import { ORDERING, ORDERS_ENABLED } from "../config/ordering";
import { formatCOP } from "../lib/format";
import { gsap, prefersReducedMotion } from "../animations/gsap";
import { Sheet } from "./Sheet";
import { Seal } from "./Seal";
import { ProductImage } from "./ProductImage";
import { QtyStepper } from "./QtyStepper";
import { Chat, ChevronDown, Clock, Close, Trash } from "./Icons";

export function CartDrawer() {
  const { cartOpen, closeCart, lines, count, total, note, setNote, setQty, remove, clear } = useCart();
  const [sent, setSent] = useState(false);
  const [preview, setPreview] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  // Confirmación visual: el sello se estampa cuando se abre WhatsApp (no es una compra confirmada).
  useEffect(() => {
    if (!sent || prefersReducedMotion()) return;
    gsap.fromTo(".sent-seal", { scale: 2.2, rotate: -50, autoAlpha: 0 }, { scale: 1, rotate: 8, autoAlpha: 1, duration: 0.6, ease: "power4.in" });
    gsap.fromTo(".sent-seal .seal-swirl", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, delay: 0.5, ease: "power2.inOut" });
  }, [sent]);

  const hasXL = lines.some((l) => l.product.conditions?.includes("24 horas de anticipación"));

  const removeLine = (key: string) => {
    const li = listRef.current?.querySelector<HTMLElement>(`[data-key="${CSS.escape(key)}"]`);
    if (!li || prefersReducedMotion()) return remove(key);
    gsap.to(li, { autoAlpha: 0, x: 40, height: 0, paddingTop: 0, paddingBottom: 0, duration: 0.35, ease: "power3.in", onComplete: () => remove(key) });
  };

  const close = () => {
    closeCart();
    window.setTimeout(() => setSent(false), 450);
  };

  const goToMenu = () => {
    close();
    window.setTimeout(() => document.getElementById("menu")?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" }), 420);
  };

  return (
    <Sheet open={cartOpen} onClose={close} labelledBy="cart-title">
      <div className="flex items-center justify-between gap-4 px-5 pb-3 pt-4 md:px-7 md:pt-7">
        <h2 id="cart-title" className="display text-[2.25rem] text-carmine">
          Tu pedido
          {count > 0 && <span className="ml-2 align-middle font-sans text-base font-bold tracking-normal text-cacao-soft">({count})</span>}
        </h2>
        <button
          type="button"
          onClick={close}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-peach-deep transition-colors hover:bg-kraft"
          aria-label="Cerrar pedido"
        >
          <Close />
        </button>
      </div>

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-14 pt-6 text-center">
          <div className="sheet-stagger w-28 opacity-90">
            <Seal title={undefined} />
          </div>
          <p className="sheet-stagger display-soft mt-6 text-2xl">Tu pedido está vacío.</p>
          <p className="sheet-stagger mt-2 max-w-[28ch] text-cacao-soft">Elige un postre del menú y agrégalo con sus adicionales.</p>
          <button type="button" onClick={goToMenu} className="sheet-stagger btn btn-primary mt-6">
            Explorar el menú
          </button>
        </div>
      ) : sent && !ORDERS_ENABLED ? (
        <div className="flex min-h-0 flex-1 flex-col items-center overflow-y-auto px-6 pb-10 pt-2 text-center" role="status">
          <div className="sent-seal w-28 shrink-0">
            <Seal title="Sello Bocatto" />
          </div>
          <p className="display-soft mt-5 text-2xl">Modo demostración.</p>
          <p className="mt-3 max-w-[36ch] leading-relaxed text-cacao/85">
            <strong>No se envió ningún mensaje.</strong> Cuando Bocatto apruebe la propuesta, este botón abrirá WhatsApp con este pedido
            para que Bocatto lo confirme:
          </p>
          <pre className="mt-5 w-full whitespace-pre-wrap rounded-2xl bg-kraft/60 p-4 text-left font-sans text-sm leading-relaxed text-cacao">
            {buildOrderMessage(lines, note)}
          </pre>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => setSent(false)} className="btn btn-primary">
              Volver a mi pedido
            </button>
          </div>
        </div>
      ) : sent ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-12 pt-4 text-center" role="status">
          <div className="sent-seal w-32">
            <Seal title="Sello Bocatto" />
          </div>
          <p className="display-soft mt-6 text-2xl">Tu mensaje está listo en WhatsApp.</p>
          <p className="mt-3 max-w-[34ch] leading-relaxed text-cacao/85">
            Envíalo desde WhatsApp para que Bocatto revise tu pedido. <strong>Aún no está confirmado:</strong> Bocatto te confirmará la
            disponibilidad, el pago y la entrega.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={orderWhatsappUrl(lines, note)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost text-carmine">
              Abrir WhatsApp de nuevo
            </a>
            <button type="button" onClick={() => setSent(false)} className="btn btn-primary">
              Volver a mi pedido
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              clear();
              close();
            }}
            className="mt-5 min-h-11 text-sm font-semibold text-cacao-soft underline underline-offset-4 hover:text-carmine"
          >
            Ya lo envié, vaciar el pedido
          </button>
        </div>
      ) : (
        <>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 md:px-7">
            <ul ref={listRef} className="divide-y-2 divide-dashed divide-cacao/15">
              {lines.map((l) => (
                <li key={l.key} data-key={l.key} className="sheet-stagger overflow-hidden py-4">
                  <div className="flex gap-3.5">
                    <ProductImage product={l.product} sizes="64px" className="size-16 shrink-0 rounded-full ring-4 ring-kraft" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="display-soft text-lg leading-tight">{l.product.displayName}</h3>
                        <span className="shrink-0 font-bold tabular-nums">{formatCOP(l.subtotal)}</span>
                      </div>
                      {l.options.map((o) => (
                        <p key={o.group} className="mt-0.5 text-sm text-cacao-soft">
                          {o.group === o.name ? o.name : `${o.group}: ${o.name}`}
                          {o.price > 0 && <span className="tabular-nums"> (+{formatCOP(o.price)})</span>}
                        </p>
                      ))}
                      {l.note && <p className="mt-0.5 text-sm italic text-cacao-soft">“{l.note}”</p>}
                      <p className="mt-0.5 text-sm tabular-nums text-cacao-soft">{formatCOP(l.unit)} c/u</p>
                      <div className="mt-2.5 flex items-center justify-between gap-2">
                        <QtyStepper size="sm" value={l.qty} onChange={(n) => setQty(l.key, n)} label={`Cantidad de ${l.product.displayName}`} />
                        <button
                          type="button"
                          onClick={() => removeLine(l.key)}
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-cacao-soft transition-colors hover:bg-carmine/10 hover:text-carmine"
                          aria-label={`Quitar ${l.product.displayName} del pedido`}
                        >
                          <Trash className="size-4" /> Quitar
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {hasXL && (
              <p className="mt-2 flex items-start gap-2 rounded-2xl bg-carmine px-4 py-3 text-sm text-peach">
                <Clock className="mt-0.5 size-4 shrink-0" />
                El Cheesecake XL se pide con 24 horas de anticipación.
              </p>
            )}

            <label htmlFor="order-note" className="mt-5 block font-bold">
              Nota para Bocatto <span className="text-sm font-semibold text-cacao-soft">(opcional)</span>
            </label>
            <textarea
              id="order-note"
              value={note}
              maxLength={ORDERING.maxOrderNote}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Por ejemplo: barrio o la hora en que lo quieres."
              aria-describedby="order-note-hint"
              className="mt-2 w-full resize-none rounded-2xl bg-cream px-4 py-3 text-base shadow-[inset_0_0_0_1.5px_rgb(42_23_18/0.15)] placeholder:text-cacao/45 focus:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--color-carmine)]"
            />
            <p id="order-note-hint" className="mt-1 text-xs text-cacao-soft">
              Solo texto: los emojis no llegan por el enlace de WhatsApp.
            </p>

            <button
              type="button"
              aria-expanded={preview}
              aria-controls="wa-preview"
              onClick={() => setPreview((v) => !v)}
              className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-cacao hover:text-carmine"
            >
              Ver el mensaje que se enviará
              <ChevronDown className={`size-4 transition-transform duration-500 ${preview ? "rotate-180" : ""}`} />
            </button>
            <pre
              id="wa-preview"
              hidden={!preview}
              className="mb-4 whitespace-pre-wrap rounded-2xl bg-kraft/60 p-4 font-sans text-sm leading-relaxed text-cacao"
            >
              {buildOrderMessage(lines, note)}
            </pre>

            <button
              type="button"
              onClick={() => clear()}
              className="mb-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-cacao-soft hover:text-carmine"
            >
              <Trash className="size-4" /> Vaciar pedido
            </button>
          </div>

          <div className="border-t-2 border-dashed border-cacao/15 bg-peach px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 md:px-7">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-bold">Total estimado</span>
              <span className="text-2xl font-bold tabular-nums">{formatCOP(total)}</span>
            </div>
            <p className="mt-1 text-[0.8125rem] leading-snug text-cacao-soft">
              No incluye domicilio. Bocatto confirma disponibilidad, costo de entrega y forma de pago por WhatsApp.
            </p>
            {ORDERS_ENABLED ? (
              <a
                href={orderWhatsappUrl(lines, note)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSent(true)}
                className="btn btn-primary mt-3 w-full"
                aria-label="Pedir por WhatsApp (abre WhatsApp con el mensaje del pedido)"
              >
                <Chat className="size-5" /> Pedir por WhatsApp
              </a>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setSent(true)}
                  className="btn btn-primary mt-3 w-full"
                  aria-label="Pedir por WhatsApp (modo demostración: no se envía ningún mensaje)"
                >
                  <Chat className="size-5" /> Pedir por WhatsApp
                </button>
                <p className="mt-2 text-center text-xs font-semibold text-carmine">Modo demostración: no se enviará ningún mensaje.</p>
              </>
            )}
          </div>
        </>
      )}
    </Sheet>
  );
}

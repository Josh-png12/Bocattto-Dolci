import { useState } from "react";
import { useCart } from "../cart/CartContext";
import { validateSelection, type ChosenOption } from "../cart/pricing";
import { ORDERING } from "../config/ordering";
import { categoryOf, type Product } from "../data/catalog";
import { formatCOP } from "../lib/format";
import { stripEmoji } from "../cart/message";
import { Sheet } from "./Sheet";
import { ProductImage } from "./ProductImage";
import { Price } from "./Price";
import { QtyStepper } from "./QtyStepper";
import { Clock, Close, Plus } from "./Icons";

/** Opción por defecto: en grupos obligatorios, la opción sin costo ("Sin Adicional"). */
function defaults(p: Product): ChosenOption[] {
  return p.modifiers
    .filter((g) => g.required)
    .map((g) => ({ group: g.name, name: (g.options.find((o) => o.price === 0) ?? g.options[0]).name }));
}

function Body({ product }: { product: Product }) {
  const { add, closeProduct } = useCart();
  const [options, setOptions] = useState<ChosenOption[]>(() => defaults(product));
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const isCard = product.slug === "tarjeta-personalizada";
  const error = validateSelection(product, options);

  const unit =
    product.price +
    options.reduce((s, o) => s + (product.modifiers.find((g) => g.name === o.group)?.options.find((x) => x.name === o.name)?.price ?? 0), 0);

  const toggle = (group: string, name: string, single: boolean) => {
    setOptions((cur) => {
      const has = cur.some((o) => o.group === group && o.name === name);
      if (single) return [...cur.filter((o) => o.group !== group), { group, name }];
      return has ? cur.filter((o) => !(o.group === group && o.name === name)) : [...cur, { group, name }];
    });
  };

  const submit = () => {
    if (error) return;
    add(product, options, qty, isCard ? stripEmoji(note) : undefined);
    closeProduct();
  };

  return (
    <>
      <div className="flex items-start gap-4 px-5 pb-4 pt-4 md:px-7 md:pt-7">
        <ProductImage product={product} sizes="96px" className="sheet-stagger size-20 shrink-0 rounded-full ring-[5px] ring-kraft md:size-24" />
        <div className="sheet-stagger min-w-0 flex-1 pt-1">
          <h2 id="product-sheet-title" className="display-soft text-2xl leading-tight md:text-[1.75rem]">
            {product.displayName}
          </h2>
          <p className="mt-0.5 text-sm text-cacao-soft">{categoryOf(product).label}</p>
          <Price product={product} className="mt-2" />
        </div>
        <button
          type="button"
          onClick={closeProduct}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-peach-deep transition-colors hover:bg-kraft"
          aria-label="Cerrar"
        >
          <Close />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6 md:px-7">
        <p className="sheet-stagger text-[0.98rem] leading-relaxed text-cacao/90">{product.description}</p>

        {product.conditions && (
          <ul className="sheet-stagger mt-4 flex flex-wrap gap-2">
            {product.conditions.map((c) => (
              <li key={c} className="inline-flex items-center gap-1.5 rounded-full bg-carmine px-3 py-1.5 text-sm font-bold text-peach">
                {c.includes("horas") && <Clock className="size-4" />} {c}
              </li>
            ))}
          </ul>
        )}

        {product.modifiers.map((g) => {
          const single = g.max === 1 && g.required;
          return (
            <fieldset key={g.name} className="sheet-stagger mt-6">
              <legend className="mb-3 flex w-full items-baseline justify-between gap-3">
                <span className="text-lg font-bold">{g.name}</span>
                <span className={`text-sm font-semibold ${g.required ? "text-carmine" : "text-cacao-soft"}`}>
                  {g.required ? `Obligatorio · elige ${g.max}` : "Opcional"}
                </span>
              </legend>
              <div className="grid gap-2">
                {g.options.map((o) => {
                  const checked = options.some((x) => x.group === g.name && x.name === o.name);
                  return (
                    <label
                      key={o.name}
                      className="choice flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl bg-peach-deep px-4 py-3 transition-[background-color,color,box-shadow] duration-300 hover:bg-kraft"
                    >
                      <input
                        type={single ? "radio" : "checkbox"}
                        name={`${product.slug}-${g.name}`}
                        checked={checked}
                        onChange={() => toggle(g.name, o.name, single)}
                        className="size-5 shrink-0 accent-cream"
                      />
                      <span className="flex-1 font-medium">{o.name}</span>
                      <span className="choice-price shrink-0 text-sm font-semibold tabular-nums text-cacao-soft">
                        {o.price ? `+${formatCOP(o.price)}` : "Sin costo"}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          );
        })}

        {isCard && (
          <div className="sheet-stagger mt-6">
            <label htmlFor="card-note" className="text-lg font-bold">
              Mensaje de la tarjeta <span className="text-sm font-semibold text-cacao-soft">(opcional)</span>
            </label>
            <textarea
              id="card-note"
              value={note}
              maxLength={ORDERING.maxCardMessage}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Una frase corta, por ejemplo: ¡Feliz cumpleaños!"
              className="mt-2 w-full resize-none rounded-2xl bg-cream px-4 py-3 text-base shadow-[inset_0_0_0_1.5px_rgb(42_23_18/0.15)] placeholder:text-cacao/45 focus:outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--color-carmine)]"
            />
            <p className="mt-1 flex justify-between gap-3 text-xs text-cacao-soft">
              <span>Solo texto: los emojis no llegan por WhatsApp.</span>
              <span className="tabular-nums">
                {note.length}/{ORDERING.maxCardMessage}
              </span>
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 border-t-2 border-dashed border-cacao/15 bg-peach px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 md:px-7">
        <QtyStepper value={qty} onChange={(n) => setQty(Math.max(1, Math.min(ORDERING.maxQtyPerLine, n)))} label={`Cantidad de ${product.displayName}`} />
        <button type="button" onClick={submit} disabled={!!error} className="btn btn-primary flex-1 !gap-2 !px-4 disabled:opacity-50">
          <Plus className="hidden size-5 sm:block" />
          <span className="whitespace-nowrap">
            Agregar <span className="tabular-nums">· {formatCOP(unit * qty)}</span>
          </span>
        </button>
      </div>
      {error && (
        <p role="alert" className="px-5 pb-3 text-sm font-semibold text-carmine md:px-7">
          {error}
        </p>
      )}
    </>
  );
}

export function ProductSheet() {
  const { sheetProduct, closeProduct } = useCart();
  // Mantiene el último producto visible durante la animación de cierre.
  const [shown, setShown] = useState<Product | null>(null);
  const [prev, setPrev] = useState<Product | null>(null);
  const [session, setSession] = useState(0);
  if (sheetProduct !== prev) {
    setPrev(sheetProduct);
    if (sheetProduct) {
      setShown(sheetProduct);
      setSession((s) => s + 1); // cada apertura empieza con la selección por defecto
    }
  }

  return (
    <Sheet open={!!sheetProduct} onClose={closeProduct} labelledBy="product-sheet-title">
      {shown && <Body key={session} product={shown} />}
    </Sheet>
  );
}

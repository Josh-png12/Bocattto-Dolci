import { useEffect, useRef, useState } from "react";
import { CATALOG_SOURCE, CATEGORIES, PRODUCTS, categoryOf, type CategoryId } from "../data/catalog";
import { Flip, gsap, useGSAP, prefersReducedMotion } from "../animations/gsap";
import { ProductImage } from "../components/ProductImage";
import { AddButton } from "../components/AddButton";
import { Price } from "../components/Price";
import { ChevronDown, Clock } from "../components/Icons";
import { formatCOP } from "../lib/format";

type Filter = "todos" | CategoryId;

const FILTERS: { id: Filter; label: string; count: number }[] = [
  { id: "todos", label: "Todos", count: PRODUCTS.length },
  ...[...CATEGORIES]
    .sort((a, b) => a.position - b.position)
    .map((c) => ({ id: c.id as Filter, label: c.label, count: PRODUCTS.filter((p) => p.category === c.id).length })),
];

// Orden de lectura: primero los individuales, luego dúos, XL y complementos.
const ORDER: CategoryId[] = ["cheesecakes-artesanales", "duos-bono-de-regalo", "postres-xl-por-encargo", "complementos"];
const ITEMS = [...PRODUCTS].sort((a, b) => ORDER.indexOf(a.category) - ORDER.indexOf(b.category));

export function Menu() {
  const [filter, setFilter] = useState<Filter>("todos");
  const [open, setOpen] = useState<string | null>(null);
  const root = useRef<HTMLElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const visible = (cat: CategoryId) => filter === "todos" || filter === cat;

  const changeFilter = (f: Filter) => {
    if (f === filter) return;
    if (!prefersReducedMotion() && root.current) {
      flipState.current = Flip.getState(root.current.querySelectorAll(".menu-item"));
    }
    setFilter(f);
  };

  useGSAP(
    () => {
      const state = flipState.current;
      if (!state) return;
      flipState.current = null;
      Flip.from(state, {
        targets: ".menu-item",
        duration: 0.7,
        ease: "expo.out",
        absolute: true,
        scale: false,
        nested: true,
        onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.04, delay: 0.1 }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, y: -12, duration: 0.3 }),
      });
    },
    { scope: root, dependencies: [filter] },
  );

  // Enlaces "Ver detalles" desde otras secciones: muestra y abre el producto.
  useEffect(() => {
    const sync = () => {
      const m = window.location.hash.match(/^#item-(.+)$/);
      if (!m) return;
      const p = PRODUCTS.find((x) => x.slug === m[1]);
      if (!p) return;
      setFilter((f) => (f === "todos" || f === p.category ? f : "todos"));
      setOpen(p.slug);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <section id="menu" ref={root} aria-labelledby="menu-title" className="relative bg-peach">
      <div className="mx-auto max-w-[88rem] px-4 py-20 sm:px-6 md:py-28 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="menu-title" className="display text-[clamp(2.75rem,8vw,5.5rem)] text-carmine">
              El menú completo.
            </h2>
            <p className="mt-4 max-w-[60ch] text-[0.98rem] text-cacao-soft">
              Precios en pesos colombianos tomados del menú de Bocatto el {CATALOG_SOURCE.retrievedAtLabel}. Son estimados: Bocatto
              confirma precio y disponibilidad por WhatsApp.
            </p>
          </div>
        </div>

        <div role="group" aria-label="Filtrar por categoría" className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {FILTERS.map((f) => {
            const on = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={on}
                onClick={() => changeFilter(f.id)}
                className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 py-2 font-semibold transition-all duration-500 ease-[var(--ease-squish)] active:scale-95 ${
                  on ? "bg-carmine text-peach shadow-[0_10px_18px_-12px_rgb(118_12_32/0.9)]" : "bg-peach-deep text-cacao hover:bg-kraft"
                }`}
              >
                {f.label}
                <span className={`rounded-full px-2 text-xs tabular-nums ${on ? "bg-peach/20" : "bg-cacao/10"}`}>{f.count}</span>
              </button>
            );
          })}
        </div>

        <ul className="mt-10 grid items-start gap-x-12 *:min-w-0 lg:grid-cols-2">
          {ITEMS.map((p) => {
            const isOpen = open === p.slug;
            const cat = categoryOf(p);
            return (
              <li
                key={p.slug}
                id={`item-${p.slug}`}
                data-flip-id={p.slug}
                className={`menu-item scroll-mt-28 border-b-2 border-dashed border-cacao/15 ${visible(p.category) ? "" : "hidden"}`}
              >
                <div className="flex gap-4 py-5 sm:gap-5">
                  <ProductImage product={p} sizes="112px" className="size-24 shrink-0 rounded-full ring-[6px] ring-kraft sm:size-28" />
                  <div className="min-w-0 flex-1">
                    <div className="menu-line relative sm:pr-28">
                      <h3 className="display-soft text-[1.3rem] leading-tight sm:text-2xl">
                        <span className="menu-title">{p.displayName}</span>
                      </h3>
                      <span className="menu-price absolute bottom-0 right-0 hidden pl-2 text-lg font-bold leading-tight tabular-nums sm:block">
                        {formatCOP(p.price)}
                      </span>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-[0.95rem] leading-snug text-cacao-soft">{p.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="sm:hidden">
                        <Price product={p} />
                      </span>
                      {p.originalPrice && (
                        <span className="hidden items-baseline gap-2 text-sm tabular-nums sm:inline-flex">
                          <s className="opacity-70">Antes {formatCOP(p.originalPrice)}</s>
                          <span className="rounded-full bg-orange px-2 py-0.5 text-xs font-bold text-cacao">
                            −{Math.round((1 - p.price / p.originalPrice) * 100)}%
                          </span>
                        </span>
                      )}
                      {p.conditions?.includes("24 horas de anticipación") && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-carmine px-2.5 py-1 text-xs font-bold text-peach">
                          <Clock className="size-3.5" /> Por encargo · 24 h
                        </span>
                      )}
                      <span className="rounded-full bg-cacao/[0.07] px-2.5 py-1 text-xs font-semibold text-cacao-soft">{cat.label}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                      <AddButton product={p} className="!min-h-11 !px-4 !py-2 text-[0.9375rem]">
                        Agregar
                      </AddButton>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`details-${p.slug}`}
                        onClick={() => setOpen(isOpen ? null : p.slug)}
                        className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-cacao hover:text-carmine"
                      >
                        {p.modifiers.length ? "Detalles y adicionales" : "Detalles"}
                        <ChevronDown className={`size-5 transition-transform duration-500 ease-[var(--ease-squish)] ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  id={`details-${p.slug}`}
                  hidden={!isOpen}
                  className="mb-6 rounded-2xl bg-peach-deep/70 p-4 text-[0.95rem] sm:ml-[8.25rem] sm:p-5"
                >
                  <p className="leading-relaxed">{p.description}</p>
                  {p.modifiers.map((g) => (
                    <div key={g.name} className="mt-4">
                      <p className="font-bold">
                        {g.name}{" "}
                        <span className="font-medium text-cacao-soft">
                          {g.required ? `(obligatorio, elige ${g.max})` : "(opcional)"}
                        </span>
                      </p>
                      <ul className="mt-2 grid max-w-md gap-y-1">
                        {g.options.map((o) => (
                          <li key={o.name} className="flex items-baseline gap-2">
                            <span>{o.name}</span>
                            <span className="dotted-leader" aria-hidden="true" />
                            <span className="whitespace-nowrap tabular-nums font-semibold">{o.price ? `+${formatCOP(o.price)}` : "Sin costo"}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <p className="mt-4 text-sm text-cacao-soft">Eliges el adicional al agregar el producto a tu pedido.</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import { useRef, useState, type KeyboardEvent } from "react";
import { bySlug } from "../data/catalog";
import { FLAVORS } from "../data/flavors";
import { gsap, MOTION_OK, useGSAP } from "../animations/gsap";
import { ProductImage } from "../components/ProductImage";
import { Ingredient } from "../components/Ingredient";
import { AddButton } from "../components/AddButton";
import { Seal } from "../components/Seal";
import { formatCOP } from "../lib/format";

const ITEMS = FLAVORS.map((f) => ({ flavor: f, product: bySlug(f.slug) }));

/** Posiciones de los ingredientes alrededor de la foto (mismo orden en todos los sabores). */
const SPOTS = [
  "left-[-7%] top-[6%] w-[19%]",
  "right-[-6%] top-[18%] w-[15%]",
  "right-[4%] bottom-[-5%] w-[17%]",
  "left-[6%] bottom-[-4%] w-[13%]",
];

export function FlavorExplorer() {
  const [active, setActive] = useState(0);
  const prev = useRef(0);
  const root = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const { flavor, product } = ITEMS[active];
  const lightInk = flavor.ink.toLowerCase().startsWith("#f");

  useGSAP(
    () => {
      const photos = gsap.utils.toArray<HTMLElement>(".flv-photo");
      const from = prev.current;
      photos.forEach((el, i) => {
        gsap.killTweensOf(el);
        gsap.set(el, { zIndex: i === active ? 3 : i === from ? 2 : 1, autoAlpha: i === active || i === from ? 1 : 0 });
      });
      prev.current = active;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (from !== active) {
          // Barrido circular: el vaso visto desde arriba "se llena" con el nuevo sabor.
          gsap.fromTo(
            photos[active],
            { clipPath: "circle(0% at 50% 50%)" },
            {
              clipPath: "circle(75% at 50% 50%)",
              duration: 0.85,
              ease: "expo.inOut",
              onComplete: () => gsap.set(photos[from], { autoAlpha: 0 }),
            },
          );
          gsap.fromTo(photos[active].querySelector("img"), { scale: 1.18, rotate: -4 }, { scale: 1, rotate: 0, duration: 1.2 });
        }
        gsap.from(".flv-reveal", { y: 22, autoAlpha: 0, duration: 0.7, stagger: 0.055, delay: 0.08 });
        gsap.from(".flv-ing", {
          scale: 0,
          rotate: () => gsap.utils.random(-140, 140),
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.07,
          ease: "back.out(2.2)",
          delay: 0.25,
        });
        gsap.fromTo(".flv-seal .seal-swirl", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" });
        gsap.fromTo(".flv-price", { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5 });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        photos.forEach((el, i) => gsap.set(el, { autoAlpha: i === active ? 1 : 0, clipPath: "none" }));
      });
    },
    { scope: root, dependencies: [active] },
  );

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = ITEMS.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = i === last ? 0 : i + 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = i === 0 ? last : i - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabs.current[next]?.focus();
    }
  };

  return (
    <section
      id="sabores"
      ref={root}
      aria-labelledby="sabores-title"
      className="grain relative overflow-hidden transition-[background-color,color] duration-700 ease-[var(--ease-out-expo)]"
      style={{ backgroundColor: flavor.bg, color: flavor.ink, ["--focus" as string]: flavor.ink }}
    >
      <div className="mx-auto grid max-w-[88rem] *:min-w-0 gap-10 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12 lg:gap-12 lg:px-10">
        {/* Encabezado + pestañas */}
        <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
          <h2 id="sabores-title" className="display text-[clamp(2.75rem,8vw,5.5rem)]">
            Cambia de sabor.
          </h2>
          <p className="mt-4 max-w-[46ch] text-lg opacity-90">
            Los cinco cheesecakes artesanales de Bocatto, cada uno en su vaso kraft. Toca un sabor y mira qué lleva.
          </p>

          <div
            role="tablist"
            aria-label="Sabores de cheesecake"
            aria-orientation="vertical"
            className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
          >
            {ITEMS.map(({ flavor: f }, i) => {
              const selected = i === active;
              return (
                <button
                  key={f.slug}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${f.slug}`}
                  aria-selected={selected}
                  aria-controls="flavor-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`group relative shrink-0 rounded-full px-5 py-2.5 text-left font-semibold transition-all duration-500 ease-[var(--ease-out-expo)] lg:rounded-none lg:px-0 lg:py-1.5 ${
                    selected
                      ? "bg-[var(--chip)] text-[var(--chip-ink)] lg:bg-transparent lg:text-current"
                      : "bg-current/10 lg:bg-transparent"
                  }`}
                  style={{ ["--chip" as string]: flavor.ink, ["--chip-ink" as string]: flavor.bg }}
                >
                  <span
                    className={`lg:display-soft lg:block lg:text-[clamp(2rem,3.4vw,3.25rem)] lg:leading-[1.08] lg:transition-[opacity,transform] lg:duration-500 ${
                      selected ? "lg:translate-x-3 lg:opacity-100" : "lg:opacity-45 lg:group-hover:translate-x-1.5 lg:group-hover:opacity-80"
                    }`}
                  >
                    <span className="lg:hidden">{f.short}</span>
                    <span className="hidden lg:inline">
                      {selected && (
                        <span aria-hidden="true" className="mr-3 inline-block size-[0.42em] -translate-y-[0.12em] rounded-full align-middle" style={{ background: flavor.accent }} />
                      )}
                      {f.short}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fotografía con ingredientes */}
        <div className="relative mx-auto w-full max-w-[34rem] lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-center">
          <div className="relative aspect-square">
            <div className="absolute inset-[5%] overflow-hidden rounded-[2.5rem] shadow-[0_40px_70px_-40px_rgb(0_0_0/0.7)]">
              {ITEMS.map(({ product: p }, i) => (
                <div key={p.slug} className="flv-photo absolute inset-0" style={{ opacity: i === 0 ? 1 : 0 }}>
                  <ProductImage product={p} sizes="(min-width: 1024px) 45vw, 90vw" className="size-full" />
                </div>
              ))}
            </div>

            <div key={`ing-${active}`} aria-hidden="true">
              {flavor.ingredients.map((k, i) => (
                <div key={i} className={`flv-ing pointer-events-none absolute z-10 ${SPOTS[i]}`}>
                  <Ingredient kind={k} className="float-y w-full" style={{ animationDelay: `${i * -1.7}s` }} />
                </div>
              ))}
            </div>

            <div className="flv-seal absolute -top-[3%] right-[10%] z-20 w-[22%] rotate-12">
              <Seal disc={flavor.ink} ring={flavor.bg} cream={flavor.cream} text="Bocatto Dolci · Hecho a mano · " />
            </div>

            <div className="absolute bottom-[9%] left-[-2%] z-20 overflow-hidden sm:left-[-4%]">
              <p
                className="flv-price ticket px-5 py-2.5 text-cacao shadow-lg"
                aria-live="polite"
              >
                <span className="sr-only">Precio de {product.displayName}: </span>
                <span className="text-2xl font-bold tabular-nums sm:text-3xl">{formatCOP(product.price)}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Panel de información */}
        <div
          id="flavor-panel"
          role="tabpanel"
          aria-labelledby={`tab-${flavor.slug}`}
          className="lg:col-span-6 lg:col-start-7 lg:row-start-2"
        >
          <div key={active}>
            <h3 className="flv-reveal display-soft text-[clamp(1.6rem,3vw,2.25rem)] leading-tight">{product.displayName}</h3>
            <p className="flv-reveal mt-3 max-w-[48ch] text-lg opacity-90">{flavor.line}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Notas de sabor">
              {flavor.notes.map((n) => (
                <li
                  key={n}
                  className="flv-reveal rounded-full px-3.5 py-1.5 text-sm font-semibold"
                  style={{ boxShadow: `inset 0 0 0 1.5px ${flavor.ink}` }}
                >
                  {n}
                </li>
              ))}
            </ul>
            <div className="flv-reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <AddButton product={product} variant={lightInk ? "cream" : "primary"}>
                Agregar {flavor.short}
              </AddButton>
              <a href={`#item-${product.slug}`} className="link-underline font-semibold">
                Ver detalles y adicionales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

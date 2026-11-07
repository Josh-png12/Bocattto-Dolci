import { useRef } from "react";
import { bySlug, PRODUCTS } from "../data/catalog";
import { useCart } from "../cart/CartContext";
import { gsap, MOTION_OK, useGSAP } from "../animations/gsap";
import { ProductImage } from "../components/ProductImage";
import { AddButton } from "../components/AddButton";
import { Price } from "../components/Price";
import { Ingredient } from "../components/Ingredient";
import { Clock, Plus } from "../components/Icons";
import { formatCOP } from "../lib/format";

const duos = PRODUCTS.filter((p) => p.category === "duos-bono-de-regalo");
const duoHero = bySlug("cheesecake-de-nutella-oreo");
const card = bySlug("tarjeta-personalizada");
const xl = bySlug("cheescake-xl-10-12-porciones");

export function Occasions() {
  const root = useRef<HTMLDivElement>(null);
  const { openProduct } = useCart();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Dúos: la foto crece al entrar, como si se acercara a la mesa.
        gsap.fromTo(
          ".duo-photo",
          { scale: 0.82, rotate: -3 },
          { scale: 1, rotate: 0, ease: "none", scrollTrigger: { trigger: ".duo-spread", start: "top bottom", end: "center center", scrub: 0.8 } },
        );
        gsap.fromTo(
          ".duo-photo img",
          { yPercent: -6 },
          { yPercent: 6, ease: "none", scrollTrigger: { trigger: ".duo-spread", start: "top bottom", end: "bottom top", scrub: true } },
        );
        gsap.from(".duo-row", {
          x: 40,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1,
          scrollTrigger: { trigger: ".duo-list", start: "top 82%" },
        });
        gsap.from(".duo-card", {
          y: 60,
          rotate: 14,
          autoAlpha: 0,
          duration: 1.2,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".duo-card", start: "top 90%" },
        });

        // XL: el pastel gira despacio, como en una base giratoria.
        gsap.fromTo(
          ".xl-photo img",
          { rotate: -10, scale: 1.2 },
          { rotate: 10, scale: 1.2, ease: "none", scrollTrigger: { trigger: ".xl-spread", start: "top bottom", end: "bottom top", scrub: true } },
        );
        gsap.from(".xl-ticket", {
          y: 50,
          rotate: () => gsap.utils.random(-10, 10),
          autoAlpha: 0,
          stagger: 0.12,
          duration: 1,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: ".xl-tickets", start: "top 85%" },
        });
        gsap.from(".xl-title .xl-word", {
          yPercent: 110,
          stagger: 0.08,
          duration: 1.1,
          scrollTrigger: { trigger: ".xl-title", start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {/* ——— Dúos + Bono de Regalo ——— */}
      <section aria-labelledby="duos-title" className="duo-spread grain relative overflow-hidden bg-kraft text-cacao">
        <div className="mx-auto grid max-w-[88rem] *:min-w-0 items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12 lg:px-10">
          <div className="relative lg:col-span-6">
            <div className="duo-photo relative mx-auto aspect-square max-w-[36rem] overflow-hidden rounded-[2.5rem] shadow-[0_40px_70px_-40px_rgb(42_23_18/0.7)]">
              <ProductImage product={duoHero} sizes="(min-width: 1024px) 45vw, 92vw" className="size-full" imgClassName="scale-110" />
            </div>
            <Ingredient kind="hazelnut" className="float-y absolute -left-2 top-[8%] w-[16%] max-w-24 rotate-12" />
            <Ingredient kind="sandwich-cookie" className="float-y absolute -right-2 bottom-[6%] w-[18%] max-w-28 -rotate-12 [animation-delay:-2s]" />
          </div>

          <div className="lg:col-span-6 lg:pl-6">
            <h2 id="duos-title" className="display text-[clamp(2.75rem,7.5vw,5.25rem)] text-carmine">
              Dos antojos,
              <br />
              un solo pedido.
            </h2>
            <p className="mt-5 max-w-[44ch] text-lg">
              Los dúos combinan dos cheesecakes en un mismo pedido, con precio especial. Para compartir o para regalar.
            </p>

            <ul className="duo-list mt-8 divide-y-2 divide-dashed divide-cacao/20 border-y-2 border-dashed border-cacao/20">
              {duos.map((d) => (
                <li key={d.slug} className="duo-row">
                  <button
                    type="button"
                    onClick={() => openProduct(d.slug)}
                    aria-haspopup="dialog"
                    className="group flex w-full flex-wrap items-baseline gap-x-3 gap-y-1 py-4 text-left transition-colors hover:text-carmine"
                    aria-label={`Agregar ${d.displayName}, ${formatCOP(d.price)}, antes ${formatCOP(d.originalPrice ?? d.price)}`}
                  >
                    <span className="display-soft text-xl sm:text-2xl">{d.displayName.replace("Cheesecake de ", "")}</span>
                    <span className="dotted-leader hidden sm:block" aria-hidden="true" />
                    <Price product={d} />
                    <Plus className="size-5 shrink-0 transition-transform duration-500 group-hover:rotate-90" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="duo-card mt-10 flex items-center gap-5 rounded-3xl bg-peach/80 p-4 pr-6 shadow-[0_18px_30px_-22px_rgb(42_23_18/0.6)]">
              <ProductImage product={card} sizes="96px" className="size-24 shrink-0 rotate-[-4deg] rounded-2xl" />
              <p className="text-[0.98rem] leading-snug">
                <strong className="font-bold">Súmale una Tarjeta Personalizada</strong> por {formatCOP(card.price)}: una frase corta con tu
                mensaje. Está en “Complementos”, y escribes el mensaje al agregarla.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Postres XL – Por Encargo ——— */}
      <section aria-labelledby="xl-title" className="xl-spread grain relative overflow-hidden bg-carmine text-peach" style={{ ["--focus" as string]: "var(--color-peach)" }}>
        <div className="mx-auto grid max-w-[88rem] *:min-w-0 items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <div className="xl-photo relative mx-auto aspect-square max-w-[36rem] overflow-hidden rounded-[2.5rem] ring-[10px] ring-peach/15 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.8)]">
              <ProductImage product={xl} sizes="(min-width: 1024px) 45vw, 92vw" className="size-full" />
            </div>
          </div>

          <div className="lg:col-span-6 lg:row-start-1">
            <h2 id="xl-title" className="xl-title display text-[clamp(2.75rem,8vw,5.75rem)]">
              {["Para", "compartir", "en grande."].map((w) => (
                <span key={w} className="block overflow-hidden pb-[0.05em]">
                  <span className="xl-word block">{w}</span>
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-[46ch] text-lg text-peach/90">
              El Cheesecake XL combina la frescura cítrica del limón y la dulzura de los frutos rojos, decorado con mermelada
              artesanal, fresas, arándanos y moras frescas. Es por encargo.
            </p>

            <ul className="xl-tickets mt-8 flex flex-wrap gap-3" aria-label="Condiciones del pedido XL">
              <li className="xl-ticket ticket rotate-[-3deg] px-5 py-3 text-cacao">
                <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-cacao-soft">Rinde</span>
                <span className="text-xl font-bold">10-12 porciones</span>
              </li>
              <li className="xl-ticket ticket rotate-[2deg] bg-peach px-5 py-3 text-cacao">
                <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-cacao-soft">Anticipación</span>
                <span className="inline-flex items-center gap-2 text-xl font-bold">
                  <Clock className="size-5" /> 24 horas
                </span>
              </li>
              <li className="xl-ticket ticket rotate-[-1deg] px-5 py-3 text-cacao">
                <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-cacao-soft">Precio</span>
                <span className="text-xl font-bold tabular-nums">{formatCOP(xl.price)}</span>
              </li>
            </ul>

            <p className="mt-6 text-sm text-peach/80">
              Tiene la opción “Combina tu Postre” por +{formatCOP(8000)}, que puedes elegir al agregarlo.
            </p>

            <div className="mt-8">
              <AddButton product={xl} variant="cream">
                Encargar el XL
              </AddButton>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-10 -left-10 w-48 opacity-90 sm:w-64" aria-hidden="true">
          <Ingredient kind="strawberry" className="float-y w-1/2" />
          <Ingredient kind="blueberry" className="float-y absolute left-[45%] top-[40%] w-1/4 [animation-delay:-3s]" />
        </div>
      </section>
    </div>
  );
}

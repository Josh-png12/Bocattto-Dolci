import { useRef } from "react";
import { bySlug } from "../data/catalog";
import { gsap, MOTION_OK, useGSAP } from "../animations/gsap";
import { Seal } from "../components/Seal";
import { Ingredient, type IngredientKind } from "../components/Ingredient";
import { ProductImage } from "../components/ProductImage";
import { AddButton } from "../components/AddButton";
import { ArrowRight } from "../components/Icons";
import { formatCOP } from "../lib/format";

const hero = bySlug("cheesecake-de-frutos-rojos");

const LINES = ["El antojo", "comienza", "aquí."];

/** Ingredientes del Cheesecake de Frutos Rojos y de su gemelo de maracuyá. */
const FLOATERS: { kind: IngredientKind; className: string; depth: number }[] = [
  { kind: "raspberry", className: "left-[-4%] top-[8%] w-[22%] rotate-[-14deg]", depth: 1.2 },
  { kind: "chocolate-chip", className: "right-[-5%] top-[30%] w-[11%] rotate-[24deg]", depth: 0.7 },
  { kind: "raspberry", className: "right-[6%] bottom-[-6%] w-[17%] rotate-[18deg]", depth: 1.5 },
  { kind: "cookie-crumb", className: "left-[8%] bottom-[2%] w-[14%] rotate-[8deg]", depth: 0.9 },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(".hero-line-inner", { yPercent: 115, rotate: 4, duration: 1.15, stagger: 0.11 }, 0.1)
          .fromTo(
            ".hero-frame",
            { clipPath: "inset(100% 0% 0% 0% round 999px 999px 32px 32px)" },
            { clipPath: "inset(0% 0% 0% 0% round 999px 999px 32px 32px)", duration: 1.4, clearProps: "clipPath" },
            0.15,
          )
          .from(".hero-frame img", { scale: 1.25, duration: 1.8 }, 0.15)
          .from(".hero-seal", { scale: 0.2, rotate: -120, autoAlpha: 0, duration: 1.2, ease: "back.out(1.6)" }, 0.75)
          .fromTo(".hero-seal .seal-swirl", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, 0.9)
          .from(".hero-floater", { scale: 0, rotate: -40, autoAlpha: 0, duration: 1, stagger: 0.08, ease: "back.out(2)" }, 0.9)
          .from(".hero-fade", { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 0.55)
          .from(".hero-ticket", { y: 30, rotate: -8, autoAlpha: 0, duration: 1 }, 1.05);

        // Parallax sutil al hacer scroll (solo transform).
        gsap.utils.toArray<HTMLElement>(".hero-floater").forEach((el) => {
          const depth = Number(el.dataset.depth ?? 1);
          gsap.to(el, {
            yPercent: -60 * depth,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
          });
        });
        gsap.to(".hero-frame img", {
          yPercent: 8,
          scale: 1.06,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      // Respuesta al puntero en escritorio: los ingredientes "respiran" con el cursor.
      mm.add(`${MOTION_OK} and (pointer: fine)`, () => {
        const xs = gsap.utils.toArray<HTMLElement>(".hero-floater-inner").map((el) => ({
          el,
          x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
          d: Number(el.parentElement?.dataset.depth ?? 1),
        }));
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          xs.forEach(({ x, y, d }) => {
            x(nx * 28 * d);
            y(ny * 22 * d);
          });
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      });
    },
    { scope: root },
  );

  return (
    <section
      id="inicio"
      ref={root}
      aria-labelledby="hero-title"
      className="grain relative overflow-hidden bg-peach"
    >
      <div className="mx-auto grid max-w-[88rem] *:min-w-0 gap-10 px-4 pb-16 pt-8 sm:px-6 md:pt-12 lg:grid-cols-12 lg:gap-6 lg:px-10 lg:pb-24">
        {/* Columna tipográfica */}
        <div className="relative z-10 flex flex-col justify-center lg:col-span-7">
          <h1 id="hero-title" className="display text-[clamp(3.6rem,15.5vw,9.25rem)] text-carmine">
            {LINES.map((l) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]">
                <span className="hero-line-inner block will-change-transform">{l}</span>
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-6 max-w-[34ch] text-lg leading-relaxed text-cacao sm:text-xl">
            Cheesecakes artesanales en vaso, con mermeladas hechas en casa, desde Riohacha.{" "}
            <em className="display-soft not-italic text-carmine">La dolce vita en cada cucharada.</em>
          </p>

          <div className="hero-fade mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <AddButton product={hero}>Agregar al pedido</AddButton>
            <a href="#sabores" className="group inline-flex min-h-11 items-center gap-2 font-semibold text-cacao">
              <span className="link-underline">Explorar sabores</span>
              <ArrowRight className="size-5 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Columna de producto */}
        <div className="relative mx-auto w-full max-w-[30rem] lg:col-span-5 lg:max-w-none">
          <div className="relative aspect-[4/5] w-full">
            {FLOATERS.map((f, i) => (
              <div key={i} data-depth={f.depth} className={`hero-floater pointer-events-none absolute z-20 ${f.className}`}>
                <div className="hero-floater-inner">
                  <Ingredient kind={f.kind} className="float-y w-full" style={{ animationDelay: `${i * -1.4}s` }} />
                </div>
              </div>
            ))}

            <div
              className="hero-frame absolute inset-[4%] overflow-hidden rounded-t-[999px] rounded-b-[32px] shadow-[0_40px_60px_-30px_rgb(42_23_18/0.55)] ring-[10px] ring-kraft"
            >
              <ProductImage
                product={hero}
                eager
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="size-full"
                imgClassName="object-[50%_40%] will-change-transform"
              />
            </div>

            <div className="hero-seal absolute bottom-[10%] left-[-6%] z-30 w-[38%] drop-shadow-[0_18px_22px_rgb(42_23_18/0.35)] sm:left-[-10%]">
              <Seal spin title="Sello Bocatto: ¡Bocados que enamoran!" />
            </div>

            <div className="hero-ticket ticket absolute right-[-2%] top-[8%] z-30 rotate-[6deg] px-5 py-3 text-cacao shadow-lg sm:right-[-6%]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cacao-soft">Frutos Rojos</p>
              <p className="text-2xl font-bold tabular-nums">{formatCOP(hero.price)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

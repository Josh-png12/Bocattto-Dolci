import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, MOTION_OK, useGSAP, prefersReducedMotion } from "../animations/gsap";
import { QUESTIONS, recommend, type CravingAnswers } from "../lib/recommend";
import { bySlug } from "../data/catalog";
import { useCart } from "../cart/CartContext";
import { Seal } from "../components/Seal";
import { ProductImage } from "../components/ProductImage";
import { AddButton } from "../components/AddButton";
import { Price } from "../components/Price";
import { ArrowLeft, Check, Plus, Refresh } from "../components/Icons";
import { formatCOP } from "../lib/format";

type Key = (typeof QUESTIONS)[number]["key"];

export function CravingQuiz() {
  const [answers, setAnswers] = useState<CravingAnswers>({});
  const [index, setIndex] = useState(0);
  const [picking, setPicking] = useState<string | null>(null);
  const { openProduct } = useCart();
  const root = useRef<HTMLElement>(null);
  const focusRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const done = index >= QUESTIONS.length;

  const results = useMemo(
    () => (done ? recommend(answers as Required<CravingAnswers>) : []),
    [done, answers],
  );

  // Mueve el foco al nuevo paso para lectores de pantalla y teclado.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    focusRef.current?.focus({ preventScroll: true });
  }, [index]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (done) {
          const tl = gsap.timeline();
          tl.from(".quiz-card", { y: 60, rotate: -3, autoAlpha: 0, duration: 1, ease: "expo.out" })
            .from(".quiz-stamp", { scale: 2.4, rotate: -60, autoAlpha: 0, duration: 0.6, ease: "power4.in" }, 0.35)
            .to(".quiz-card", { x: 3, yoyo: true, repeat: 3, duration: 0.05, ease: "none" }, 0.95)
            .fromTo(".quiz-stamp .seal-swirl", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" }, 0.9)
            .from(".quiz-res", { y: 20, autoAlpha: 0, stagger: 0.07, duration: 0.7 }, 0.6);
        } else {
          gsap.from(".quiz-step > *", { x: 36, autoAlpha: 0, stagger: 0.06, duration: 0.7, ease: "expo.out" });
        }
      });
    },
    { scope: root, dependencies: [index, done], revertOnUpdate: true },
  );

  const choose = (key: Key, value: string) => {
    if (picking) return;
    setPicking(value);
    const delay = prefersReducedMotion() ? 0 : 560;
    window.setTimeout(() => {
      setAnswers((a) => ({ ...a, [key]: value }));
      setIndex((i) => i + 1);
      setPicking(null);
    }, delay);
  };

  const back = () => setIndex((i) => Math.max(0, i - 1));
  const restart = () => {
    setAnswers({});
    setIndex(0);
  };

  const q = QUESTIONS[Math.min(index, QUESTIONS.length - 1)];
  const top = results[0];
  const alternates = results.slice(1, 3);
  const card = bySlug("tarjeta-personalizada");

  return (
    <section
      id="antojo"
      ref={root}
      aria-labelledby="antojo-title"
      className="grain relative overflow-hidden bg-peach-deep text-cacao"
    >
      <div className="mx-auto grid max-w-[88rem] *:min-w-0 gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-4">
          <h2 id="antojo-title" className="display text-[clamp(2.75rem,7.5vw,5rem)] text-carmine">
            Descubre tu antojo.
          </h2>
          <p className="mt-5 max-w-[36ch] text-lg">
            Tres preguntas y te decimos qué postre de Bocatto se parece más a lo que tienes ganas de comer.
          </p>
          {!done && (
            <div className="mt-8 flex items-center gap-3" aria-hidden="true">
              <span className="mr-1 text-sm font-semibold tabular-nums text-cacao-soft">
                {index + 1}/{QUESTIONS.length}
              </span>
              {QUESTIONS.map((_, i) => (
                <span
                  key={i}
                  className={`grid size-9 place-items-center rounded-full border-2 border-carmine transition-colors duration-500 ${
                    i < index ? "bg-carmine text-peach" : i === index ? "bg-peach" : "border-carmine/30"
                  }`}
                >
                  {i < index && <Check className="size-4" />}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-8">
          {!done ? (
            <fieldset key={index} className="quiz-step min-w-0">
              <legend className="contents">
                <h3 ref={focusRef} tabIndex={-1} className="display-soft block text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] outline-none">
                  <span className="sr-only">Pregunta {index + 1} de {QUESTIONS.length}: </span>
                  {q.title}
                </h3>
              </legend>

              <div className="mt-8 flex flex-wrap gap-4 sm:gap-6">
                {q.options.map((o) => {
                  const picked = picking === o.value;
                  const current = (answers as Record<string, string>)[q.key] === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => choose(q.key, o.value)}
                      aria-pressed={current || picked}
                      disabled={!!picking && !picked}
                      className={`lid group relative grid aspect-square w-[clamp(9rem,40vw,13.5rem)] place-items-center rounded-full p-5 text-center transition-[transform,background-color,box-shadow,opacity] duration-500 ease-[var(--ease-squish)] hover:-translate-y-1.5 active:scale-95 disabled:opacity-40 ${
                        picked || current
                          ? "bg-carmine text-peach shadow-[0_20px_30px_-18px_rgb(118_12_32/0.9)]"
                          : "bg-kraft text-cacao shadow-[0_16px_26px_-18px_rgb(42_23_18/0.7),inset_0_0_0_6px_rgb(184_149_106/0.6)] hover:shadow-[0_24px_34px_-18px_rgb(42_23_18/0.7),inset_0_0_0_6px_rgb(158_18_44/0.5)]"
                      }`}
                      style={{ ["--focus" as string]: "var(--color-carmine)" }}
                    >
                      <span
                        className={`pointer-events-none absolute inset-[14%] transition-opacity duration-300 ${picked ? "lid-swirl-on opacity-100" : "opacity-0"}`}
                        aria-hidden="true"
                      >
                        <Seal bare cream="rgb(252 236 223 / 0.35)" shadow="transparent" />
                      </span>
                      <span className="relative">
                        <span className="display-soft block text-[clamp(1.25rem,3.6vw,1.75rem)] leading-tight">{o.label}</span>
                        <span className={`mt-1 block text-[0.8125rem] font-medium leading-snug ${picked || current ? "text-peach/85" : "text-cacao-soft"}`}>
                          {o.hint}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {index > 0 && (
                <button type="button" onClick={back} className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-cacao hover:text-carmine">
                  <ArrowLeft className="size-5" /> Pregunta anterior
                </button>
              )}
            </fieldset>
          ) : (
            top && (
              <div className="relative">
                <article className="quiz-card striped-card relative rounded-[1.75rem] p-5 shadow-[0_40px_60px_-36px_rgb(42_23_18/0.7)] sm:p-8">
                  <div className="quiz-stamp absolute -right-5 -top-8 z-10 w-24 rotate-12 sm:-right-8 sm:w-32">
                    <Seal title="Sello Bocatto" />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8">
                    <ProductImage product={top.product} sizes="(min-width: 640px) 240px, 80vw" className="quiz-res aspect-square rounded-2xl" />
                    <div className="min-w-0">
                      <h3 ref={focusRef} tabIndex={-1} className="quiz-res display text-[clamp(2rem,4.6vw,3.25rem)] sm:pr-20 text-carmine outline-none">
                        {top.product.displayName}
                      </h3>
                      {top.approximate && (
                        <p className="quiz-res mt-2 text-base font-medium text-cacao-soft">Es lo más cercano a tu antojo en el menú actual.</p>
                      )}
                      <ul className="mt-4 space-y-2">
                        {top.reasons.map((r) => (
                          <li key={r} className="quiz-res flex gap-2.5 text-[1.0125rem] leading-snug">
                            <Check className="mt-0.5 size-5 shrink-0 text-carmine" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                      {top.approximate && answers.base === "chocolate" && answers.profile === "refrescante" && (
                        <p className="quiz-res mt-3 text-sm text-cacao-soft">
                          El menú actual no tiene un postre de chocolate refrescante; este conserva lo más importante de tus respuestas.
                        </p>
                      )}
                      <div className="quiz-res mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                        <Price product={top.product} size="lg" />
                        <AddButton product={top.product}>Agregar mi antojo</AddButton>
                      </div>
                      {answers.occasion !== "solo" && (
                        <p className="quiz-res mt-4 text-sm text-cacao-soft">
                          ¿Es un regalo? Puedes sumar la {card.displayName} por {formatCOP(card.price)} con tu mensaje.
                        </p>
                      )}
                    </div>
                  </div>
                </article>

                {alternates.length > 0 && (
                  <div className="quiz-res mt-10">
                    <h4 className="text-lg font-bold">También podría ser</h4>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {alternates.map((a) => (
                        <li key={a.product.slug}>
                          <button
                            type="button"
                            onClick={() => openProduct(a.product.slug)}
                            aria-haspopup="dialog"
                            className="group flex w-full items-center text-left gap-4 rounded-2xl bg-peach p-3 pr-4 shadow-[0_12px_20px_-16px_rgb(42_23_18/0.6)] transition-transform duration-500 ease-[var(--ease-squish)] hover:-translate-y-1"
                          >
                            <ProductImage product={a.product} sizes="64px" className="size-16 shrink-0 rounded-full ring-4 ring-kraft" />
                            <span className="min-w-0 flex-1">
                              <span className="block font-semibold leading-tight">{a.product.displayName}</span>
                              <span className="mt-0.5 block text-sm tabular-nums text-cacao-soft">{formatCOP(a.product.price)}</span>
                            </span>
                            <Plus className="size-5 shrink-0 text-carmine transition-transform duration-500 group-hover:rotate-90" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button type="button" onClick={restart} className="btn btn-ghost quiz-res mt-8 text-carmine">
                  <Refresh className="size-5" /> Volver a empezar
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

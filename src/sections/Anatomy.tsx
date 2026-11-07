import { useRef, useState } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP, prefersReducedMotion } from "../animations/gsap";
import { Seal } from "../components/Seal";
import { formatCOP } from "../lib/format";

/**
 * Scroll narrativo: el vaso kraft en corte transversal se arma capa por capa.
 * Todo el texto se apoya en frases de las descripciones oficiales.
 */
const STEPS = [
  {
    title: "Base crocante",
    body: "Galletas Ducales en el de Nutella, galleta dorada y crujiente en el XL. Todo empieza con algo que cruje.",
    source: "“Una base crocante de galletas Ducales…”",
  },
  {
    title: "Crema que enamora",
    body: "Una mezcla de queso suave y cremosa: con crema de avellanas, con nuggets de Milo o con un toque cítrico.",
    source: "“…relleno suave y cremoso con un toque cítrico…”",
  },
  {
    title: "Mermeladas de la casa",
    body: "Frutos rojos y maracuyá, preparadas artesanalmente. Equilibran dulzura y acidez en cada bocado.",
    source: "“…mermeladas artesanales que equilibran dulzura y acidez…”",
  },
  {
    title: "El toque final",
    body: "Media galleta Oreo, frambuesas cubiertas de chocolate, trocitos de maní o polvo de Milo espolvoreado.",
    source: "“…coronado con frambuesas cubiertas de chocolate.”",
  },
  {
    title: "Tu adicional",
    body: `Leche condensada, chips de chocolate, brownie de chocolate o de Milo, salsa de mango, o sin adicional. Desde ${formatCOP(1000)} extra; lo eliges al agregarlo a tu pedido.`,
    source: "Opciones del grupo “Adicionales” del menú",
  },
];

function Cup({ step }: { step: number }) {
  const on = (i: number) => (step >= i ? "layer layer-on" : "layer");
  return (
    <svg viewBox="0 0 320 400" className="h-full w-full" role="img" aria-label={`Corte de un vaso de cheesecake: ${STEPS.slice(0, step + 1).map((s) => s.title.toLowerCase()).join(", ")}`}>
      <defs>
        <clipPath id="cup-inside">
          <path d="M52 112 L268 112 L246 360 L74 360 Z" />
        </clipPath>
        <pattern id="kraft-lines" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">
          <path d="M0 4 H8" stroke="#B8956A" strokeOpacity="0.35" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Sombra del vaso */}
      <ellipse cx="160" cy="372" rx="104" ry="12" fill="rgb(42 23 18 / 0.18)" />

      {/* Pared trasera del vaso */}
      <path d="M40 100 L280 100 L256 366 L64 366 Z" fill="#CDB088" />

      <g clipPath="url(#cup-inside)">
        <rect x="40" y="100" width="240" height="270" fill="#E9DCC8" />

        {/* 0 — Base crocante */}
        <g className={on(0)} style={{ transitionDelay: "0ms" }}>
          <rect x="40" y="304" width="240" height="70" fill="#C9944F" />
          <path d="M40 306 Q70 296 100 306 T160 304 T220 306 T280 302 V316 H40 Z" fill="#B07A3A" />
          {[[78, 330], [104, 344], [132, 326], [168, 340], [196, 328], [226, 344], [92, 352], [150, 354], [210, 354], [240, 322]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 4 : 2.6} fill={i % 2 ? "#8A5A2B" : "#E3B577"} />
          ))}
        </g>

        {/* 1 — Crema */}
        <g className={on(1)}>
          <rect x="40" y="170" width="240" height="140" fill="#FFF3E2" />
          <path d="M40 304 Q100 296 160 304 T280 300 V312 H40 Z" fill="#F4E2C9" />
          <path d="M80 220 q30 -14 60 0 t60 0 t60 0" stroke="#F2DFC4" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M70 260 q30 -12 60 0 t60 0 t60 0" stroke="#F2DFC4" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>

        {/* 2 — Mermelada */}
        <g className={on(2)}>
          <path d="M40 140 Q80 128 120 140 T200 138 T280 136 V178 Q240 186 200 176 T120 180 T40 176 Z" fill="#B3163A" />
          <path d="M40 176 Q80 186 120 178 T200 178 T280 176 V186 H40 Z" fill="#8E1030" opacity="0.5" />
          <path d="M70 146 q20 -6 40 0" stroke="#F06C84" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8" />
          <path d="M180 144 q16 -5 32 0" stroke="#F06C84" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
        </g>
      </g>

      {/* 3 — Toque final (por encima del borde) */}
      <g className={on(3)}>
        {/* media galleta */}
        <g transform="translate(150 96) rotate(-14)">
          <path d="M-34 0 A34 34 0 0 1 34 0 Z" fill="#1F1513" />
          <path d="M-26 0 A26 26 0 0 1 26 0" stroke="#3A2A26" strokeWidth="2.5" fill="none" strokeDasharray="3 4" />
          <rect x="-34" y="-1" width="68" height="7" fill="#FFF3E2" />
        </g>
        {/* frambuesas */}
        {[[92, 120], [112, 112], [222, 116]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="11" fill="#B3163A" />
            <circle cx={x - 4} cy={y - 4} r="3.5" fill="#E9566F" />
            <path d={`M${x - 8} ${y + 2} q8 8 16 0`} stroke="#4A2A1D" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
        ))}
        {/* maní */}
        {[[198, 124], [246, 124], [74, 128]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="6" ry="4" fill="#E7C08B" transform={`rotate(${i * 40} ${x} ${y})`} />
        ))}
      </g>

      {/* 4 — Adicional: hilo de leche condensada + tapa con sello */}
      <g className={on(4)}>
        <path d="M118 30 C120 60 128 70 126 92 M204 24 C200 54 196 72 200 104" stroke="#FFFDF7" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M118 30 C120 60 128 70 126 92 M204 24 C200 54 196 72 200 104" stroke="#E8D9C0" strokeWidth="2" fill="none" strokeLinecap="round" transform="translate(2 1)" />
      </g>

      {/* Pared frontal (corte) */}
      <path d="M40 100 L52 112 L74 360 L64 366 Z" fill="#B8956A" />
      <path d="M280 100 L268 112 L246 360 L256 366 Z" fill="#B8956A" />
      <path d="M36 96 H284 V108 H36 Z" fill="#D8BE97" />
      <path d="M36 96 H284 V108 H36 Z" fill="url(#kraft-lines)" />
      <path d="M64 366 H256" stroke="#A88458" strokeWidth="3" />
    </svg>
  );
}

export function Anatomy() {
  const [step, setStep] = useState(0);
  const [reduced] = useState(prefersReducedMotion);
  const root = useRef<HTMLElement>(null);
  const shown = reduced ? STEPS.length - 1 : step;

  useGSAP(
    () => {
      const steps = gsap.utils.toArray<HTMLElement>(".anat-step");
      steps.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 70%",
          end: "bottom 70%",
          onToggle: (self) => {
            if (self.isActive) setStep(i);
          },
        });
      });
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        steps.forEach((el) => {
          gsap.from(el.querySelectorAll(".anat-reveal"), {
            y: 36,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 1,
            scrollTrigger: { trigger: el, start: "top 80%" },
          });
        });
        gsap.fromTo(
          ".anat-lid",
          { y: -40, rotate: -18, autoAlpha: 0 },
          {
            y: 0,
            rotate: 8,
            autoAlpha: 1,
            ease: "back.out(1.8)",
            duration: 1,
            scrollTrigger: { trigger: steps[steps.length - 1], start: "top 70%", toggleActions: "play none none reverse" },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section id="anatomia" ref={root} aria-labelledby="anatomia-title" className="relative bg-peach">
      <div className="mx-auto max-w-[88rem] px-4 pt-20 sm:px-6 md:pt-28 lg:px-10">
        <h2 id="anatomia-title" className="display max-w-[14ch] text-[clamp(2.75rem,8vw,5.5rem)] text-carmine">
          Anatomía de un antojo.
        </h2>
        <p className="mt-5 max-w-[52ch] text-lg text-cacao-soft">
          Lo que hay dentro de cada vaso, capa por capa, contado con las palabras del menú de Bocatto.
        </p>
      </div>

      <div className="mx-auto grid max-w-[88rem] *:min-w-0 px-4 pb-24 sm:px-6 md:grid-cols-2 md:gap-12 lg:px-10">
        {/* Vaso: sticky mientras las capas avanzan */}
        <div className="sticky top-[4.75rem] z-10 -mx-4 bg-peach px-4 pb-3 pt-4 md:top-24 md:mx-0 md:h-[calc(100svh-8rem)] md:bg-transparent md:px-0 md:pt-10">
          <div className="relative mx-auto h-[34svh] max-h-[26rem] md:h-full md:max-h-[40rem]">
            <Cup step={shown} />
            <div className="anat-lid pointer-events-none absolute left-1/2 top-0 w-[24%] -translate-x-1/2 md:w-[22%]">
              <Seal title={undefined} spin />
            </div>
          </div>
          <ol className="mt-3 flex justify-center gap-2 md:hidden" aria-hidden="true">
            {STEPS.map((s, i) => (
              <li key={s.title} className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? "w-8 bg-carmine" : "w-3 bg-carmine/25"}`} />
            ))}
          </ol>
        </div>

        {/* Pasos */}
        <ol className="relative z-0">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="anat-step flex min-h-[56svh] flex-col justify-center py-10 md:min-h-[64svh]"
              aria-current={i === step ? "step" : undefined}
            >
              <h3
                className={`anat-reveal display text-[clamp(2.2rem,5vw,3.75rem)] transition-colors duration-500 ${
                  i === step ? "text-carmine" : "text-cacao/35"
                }`}
              >
                {s.title}
              </h3>
              <p className="anat-reveal mt-4 max-w-[40ch] text-lg leading-relaxed text-cacao sm:text-xl">{s.body}</p>
              <p className="anat-reveal mt-4 text-sm font-medium text-cacao-soft">{s.source}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

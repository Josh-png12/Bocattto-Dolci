import { useId } from "react";

/**
 * FIRMA VISUAL BOCATTO — "La espiral".
 * Un vaso visto desde arriba: el disco es el sello redondo que Bocatto pega
 * en sus vasos kraft; dentro, una espiral de crema trazada de un solo gesto.
 * La espiral se dibuja con stroke-dashoffset (pathLength=1), así GSAP puede
 * "servir" la crema animando `.seal-swirl` de 1 → 0.
 */

function spiralPath(cx: number, cy: number, rMax: number, turns: number, steps = 220) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Arranca fuera y termina en el centro, como una manga pastelera.
    const r = rMax * (1 - t) ** 0.92;
    const a = -Math.PI / 2 + t * turns * Math.PI * 2;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a) * 0.96;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return d;
}

const SWIRL = spiralPath(100, 100, 52, 3.2);

interface SealProps {
  className?: string;
  disc?: string;
  ring?: string;
  cream?: string;
  shadow?: string;
  text?: string;
  /** Gira lentamente el anillo de texto (desactivado con reduced-motion vía CSS). */
  spin?: boolean;
  /** Muestra solo la espiral, sin disco ni texto (para cargadores o fondos). */
  bare?: boolean;
  title?: string;
}

export function Seal({
  className = "",
  disc = "var(--color-carmine)",
  ring = "var(--color-peach)",
  cream = "var(--color-peach)",
  shadow = "rgb(0 0 0 / 0.22)",
  text = "¡Bocados que enamoran! · La dolce vita en cada cucharada · ",
  spin = false,
  bare = false,
  title,
}: SealProps) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 200 200"
      className={`seal ${className}`}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {!bare && (
        <>
          <circle className="seal-disc" cx="100" cy="100" r="98" fill={disc} />
          <circle cx="100" cy="100" r="68" fill="none" stroke={ring} strokeOpacity="0.35" strokeWidth="1.2" />
          <g className={spin ? "spin-slow" : undefined} style={{ transformOrigin: "100px 100px", transformBox: "view-box" }}>
            <path id={`ring-${id}`} d="M100 100 m-82 0 a82 82 0 1 1 164 0 a82 82 0 1 1 -164 0" fill="none" />
            <text
              fill={ring}
              style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13.2, letterSpacing: "0.16em", textTransform: "uppercase" }}
            >
              <textPath href={`#ring-${id}`} textLength="510" lengthAdjust="spacing">
                {text}
              </textPath>
            </text>
          </g>
        </>
      )}
      <path
        className="seal-swirl seal-swirl-shadow"
        d={SWIRL}
        pathLength={1}
        fill="none"
        stroke={shadow}
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(1.6 2.6)"
      />
      <path
        className="seal-swirl"
        d={SWIRL}
        pathLength={1}
        fill="none"
        stroke={cream}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="seal-swirl seal-swirl-gloss"
        d={SWIRL}
        pathLength={1}
        fill="none"
        stroke="#fff"
        strokeOpacity="0.45"
        strokeWidth="2.4"
        strokeLinecap="round"
        transform="translate(-2 -2.4)"
      />
    </svg>
  );
}

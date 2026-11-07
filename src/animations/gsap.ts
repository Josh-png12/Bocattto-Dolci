import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

// Registro único de plugins (antes del primer useGSAP).
gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);

gsap.defaults({ ease: "expo.out", duration: 0.9 });

/** Query que activa las animaciones de entrada; con reduced-motion todo queda estático y visible. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, Flip, useGSAP };

// Recalcula posiciones de ScrollTrigger cuando cargan fuentes e imágenes (evita disparos desfasados).
if (typeof window !== "undefined") {
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh);
  document.fonts?.ready.then(refresh);
}

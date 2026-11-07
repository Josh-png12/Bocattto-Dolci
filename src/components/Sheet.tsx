import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "../animations/gsap";

interface Props {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  className?: string;
}

/**
 * Panel modal sobre <dialog> nativo (foco atrapado, Esc, foco devuelto al cerrar).
 * Móvil: hoja que sube desde abajo. Escritorio: panel lateral derecho.
 */
export function Sheet({ open, onClose, labelledBy, children, className = "" }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = dialog.current;
    const p = panel.current;
    if (!d || !p) return;
    const reduced = prefersReducedMotion();
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const away = desktop ? { xPercent: 104, yPercent: 0 } : { yPercent: 104, xPercent: 0 };

    if (open && !d.open) {
      d.showModal();
      document.documentElement.classList.add("sheet-lock");
      if (!reduced) {
        gsap.fromTo(p, away, { xPercent: 0, yPercent: 0, duration: 0.65, ease: "expo.out" });
        gsap.fromTo(p.querySelectorAll(".sheet-stagger"), { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.6, delay: 0.12 });
      }
    } else if (!open && d.open) {
      const done = () => {
        d.close();
        gsap.set(p, { clearProps: "transform" });
        if (!document.querySelector("dialog[open]")) document.documentElement.classList.remove("sheet-lock");
      };
      if (reduced) done();
      else gsap.to(p, { ...away, duration: 0.38, ease: "power3.in", onComplete: done });
    }
  }, [open]);

  useEffect(() => () => document.documentElement.classList.remove("sheet-lock"), []);

  return (
    <dialog
      ref={dialog}
      aria-labelledby={labelledBy}
      className="sheet m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-cacao"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panel}
        className={`absolute inset-x-0 bottom-0 flex max-h-[92svh] flex-col overflow-hidden rounded-t-[2rem] bg-peach shadow-[0_-20px_60px_-20px_rgb(42_23_18/0.6)] md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[30rem] md:rounded-l-[2rem] md:rounded-tr-none ${className}`}
      >
        <span aria-hidden="true" className="mx-auto mt-2.5 block h-1.5 w-12 shrink-0 rounded-full bg-cacao/20 md:hidden" />
        {children}
      </div>
    </dialog>
  );
}

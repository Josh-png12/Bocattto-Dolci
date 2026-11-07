import { useEffect, useRef } from "react";
import { useCart } from "../cart/CartContext";
import { gsap, prefersReducedMotion } from "../animations/gsap";
import { Seal } from "./Seal";

/** Confirmación al agregar: el sello sirve su espiral y ofrece ir al pedido. */
export function AddedToast() {
  const { toast, dismissToast, openCart } = useCart();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toast) return;
    if (ref.current && !prefersReducedMotion()) {
      gsap.fromTo(ref.current, { y: 40, autoAlpha: 0, scale: 0.94 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(1.8)" });
      gsap.fromTo(ref.current.querySelectorAll(".seal-swirl"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut", delay: 0.1 });
    }
    const t = window.setTimeout(dismissToast, 4200);
    return () => window.clearTimeout(t);
  }, [toast, dismissToast]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] z-50 flex justify-center px-3 md:bottom-8" role="status" aria-live="polite">
      {toast && (
        <div
          ref={ref}
          key={toast.id}
          className="pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-full bg-cacao py-2 pl-2 pr-2 text-peach shadow-[0_20px_40px_-18px_rgb(42_23_18/0.9)]"
        >
          <span className="size-11 shrink-0">
            <Seal bare={false} text="Agregado · Bocatto · " />
          </span>
          <p className="min-w-0 flex-1 text-[0.95rem] leading-tight">
            <span className="font-bold">Agregado</span>
            <span className="block truncate text-peach/80">
              {toast.qty} × {toast.name}
            </span>
          </p>
          <button type="button" onClick={openCart} className="btn btn-cream !min-h-11 shrink-0 !px-4 !py-2 text-[0.9rem]">
            Ver pedido
          </button>
        </div>
      )}
    </div>
  );
}

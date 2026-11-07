import { useEffect, useRef, useState } from "react";
import { useCart } from "../cart/CartContext";
import { Bag } from "./Icons";

/** Acceso al pedido en el encabezado; el contador "salta" al agregar productos. */
export function CartButton() {
  const { count, openCart } = useCart();
  const [bump, setBump] = useState(false);
  const prev = useRef(count);

  useEffect(() => {
    if (count > prev.current) {
      setBump(true);
      const t = window.setTimeout(() => setBump(false), 520);
      prev.current = count;
      return () => window.clearTimeout(t);
    }
    prev.current = count;
  }, [count]);

  return (
    <button
      type="button"
      onClick={openCart}
      aria-haspopup="dialog"
      aria-label={count ? `Ver tu pedido: ${count} ${count === 1 ? "producto" : "productos"}` : "Ver tu pedido (vacío)"}
      className="btn btn-primary relative !min-h-11 !px-4 !py-2 text-[0.9375rem] sm:!px-5"
    >
      <Bag className="size-5" />
      <span>Tu pedido</span>
      {count > 0 && (
        <span
          aria-hidden="true"
          className={`absolute -right-1.5 -top-1.5 grid min-w-6 place-items-center rounded-full bg-orange px-1.5 py-0.5 text-xs font-bold tabular-nums text-cacao ring-2 ring-peach ${bump ? "bump" : ""}`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

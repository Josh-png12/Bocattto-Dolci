import { useCart } from "../cart/CartContext";
import { inquiryWhatsappUrl } from "../cart/message";
import { formatCOP } from "../lib/format";
import { Bag, Chat } from "./Icons";

/**
 * Acceso rápido en móvil: muestra el resumen del pedido y lo abre.
 * Incluye un acceso discreto a WhatsApp para consultas generales.
 */
export function StickyOrderBar({ show }: { show: boolean }) {
  const { count, total, openCart } = useCart();
  const visible = show || count > 0;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-500 ease-[var(--ease-out-expo)] md:hidden ${
        visible ? "translate-y-0" : "translate-y-[120%]"
      }`}
      inert={!visible}
    >
      <div className="flex items-center gap-2 rounded-full bg-cacao p-1.5 text-peach shadow-[0_18px_30px_-14px_rgb(42_23_18/0.8)]">
        <a
          href={inquiryWhatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Consultas por WhatsApp (abre WhatsApp)"
          className="grid size-11 shrink-0 place-items-center rounded-full text-peach/85 transition-colors hover:bg-peach/10"
        >
          <Chat className="size-5" />
        </a>
        {count > 0 ? (
          <>
            <p className="min-w-0 flex-1 text-[0.95rem] leading-tight">
              <span className="font-semibold">
                {count} {count === 1 ? "producto" : "productos"}
              </span>
              <span className="block tabular-nums text-peach/75">{formatCOP(total)}</span>
            </p>
            <button type="button" onClick={openCart} aria-haspopup="dialog" className="btn btn-primary !min-h-11 !py-2.5 text-[0.95rem]">
              <Bag className="size-5" /> Ver pedido
            </button>
          </>
        ) : (
          <>
            <p className="min-w-0 flex-1 text-[0.95rem] font-semibold">Arma tu pedido</p>
            <a href="#menu" className="btn btn-primary !min-h-11 !py-2.5 text-[0.95rem]">
              Ver menú
            </a>
          </>
        )}
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import { useCart } from "../cart/CartContext";
import { inquiryWhatsappUrl } from "../cart/message";
import { ORDERS_ENABLED } from "../config/ordering";

interface Props {
  className?: string;
  label: string;
  children: ReactNode;
  style?: React.CSSProperties;
}

/**
 * Acceso a WhatsApp para consultas. En modo demostración no abre WhatsApp:
 * avisa que la demo no contacta al negocio.
 */
export function InquiryLink({ className = "", label, children, style }: Props) {
  const { notify } = useCart();
  if (ORDERS_ENABLED) {
    return (
      <a href={inquiryWhatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label={`${label} (abre WhatsApp)`} className={className} style={style}>
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={() => notify("Modo demostración", "WhatsApp está desactivado hasta que Bocatto apruebe la propuesta.")}
      aria-label={`${label} (modo demostración: desactivado)`}
      className={className}
      style={style}
    >
      {children}
    </button>
  );
}

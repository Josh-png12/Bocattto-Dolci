import { InquiryLink } from "./InquiryLink";
import { Chat } from "./Icons";

/** Acceso discreto a WhatsApp para consultas generales (escritorio; en móvil vive en la barra inferior). */
export function WhatsAppQuick() {
  return (
    <InquiryLink
      label="Consultas por WhatsApp"
      className="group fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-cacao py-3 pl-3.5 pr-3.5 text-peach shadow-[0_16px_30px_-14px_rgb(42_23_18/0.9)] transition-[padding,background-color] duration-500 ease-[var(--ease-out-expo)] hover:bg-carmine hover:pr-5 md:inline-flex"
      style={{ ["--focus" as string]: "var(--color-carmine)" }}
    >
      <Chat className="size-5" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-[max-width] duration-500 ease-[var(--ease-out-expo)] group-hover:max-w-40 group-focus-visible:max-w-40">
        ¿Una consulta?
      </span>
    </InquiryLink>
  );
}

import { CATALOG_SOURCE } from "../data/catalog";
import { Logo } from "./Logo";
import { Camera, Chat } from "./Icons";
import { InquiryLink } from "./InquiryLink";
import { ORDERING } from "../config/ordering";

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-carmine text-peach" style={{ ["--focus" as string]: "var(--color-peach)" }}>
      <div className="mx-auto max-w-[88rem] px-4 pb-28 pt-20 sm:px-6 md:pb-16 lg:px-10">
        <p className="display text-[clamp(3rem,11vw,9rem)] leading-[0.88]">
          ¡Bocados
          <br />
          que enamoran!
        </p>

        <div className="mt-14 grid gap-10 border-t border-peach/25 pt-10 md:grid-cols-12">
          <div className="flex items-start gap-4 md:col-span-4">
            <Logo className="size-20" />
            <div className="text-[0.95rem] leading-relaxed">
              <p className="font-bold">Bocatto Dolci</p>
              <p className="text-peach/80">{CATALOG_SOURCE.city}</p>
              <div className="mt-3 flex flex-col gap-1">
                <InquiryLink label={`WhatsApp ${ORDERING.whatsappDisplay}`} className="inline-flex min-h-8 items-center gap-1.5 font-semibold underline">
                  <Chat className="size-4" /> {ORDERING.whatsappDisplay}
                </InquiryLink>
                <a href={CATALOG_SOURCE.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-1.5 font-semibold underline">
                  <Camera className="size-4" /> @bocatto.dolci
                </a>
              </div>
            </div>
          </div>

          <div className="text-[0.9rem] leading-relaxed text-peach/85 md:col-span-8">
            <p className="font-bold text-peach">Sobre esta demo</p>
            <p className="mt-2 max-w-[70ch]">
              Bocatto Experience es un concepto independiente y no oficial creado por DeepSun Studio como propuesta de colaboración.
              Bocatto Dolci no lo ha aprobado ni publicado. El nombre, el logotipo y las fotografías pertenecen a Bocatto Dolci y se usan
              aquí solo como referencia para la propuesta.
            </p>
            <p className="mt-3 max-w-[70ch]">
              Productos, descripciones, opciones y precios tomados del menú público de Bocatto en OlaClick el{" "}
              {CATALOG_SOURCE.retrievedAtLabel}. Los totales son estimados y no incluyen domicilio. Enviar el pedido por WhatsApp no es
              una compra confirmada: Bocatto confirma disponibilidad, pago y entrega.
            </p>
            <p className="mt-6 text-peach/70">Diseño y desarrollo del concepto: DeepSun Studio.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { CartButton } from "./CartButton";
import { ORDERS_ENABLED } from "../config/ordering";

const NAV = [
  { href: "#sabores", label: "Sabores" },
  { href: "#anatomia", label: "Anatomía" },
  { href: "#antojo", label: "Tu antojo" },
  { href: "#menu", label: "Menú" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#contenido"
        className="btn btn-primary sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-3 focus-visible:z-[60] focus-visible:!px-6 focus-visible:!py-3"
      >
        Saltar al contenido
      </a>

      {/* Aviso permanente: la demo no es el sitio oficial de Bocatto Dolci. */}
      <div className="relative z-50 bg-cacao px-4 py-2 text-center text-[0.8125rem] leading-snug text-peach">
        <strong className="font-semibold">Concepto independiente de DeepSun Studio, pendiente de aprobación de Bocatto Dolci.</strong>{" "}
        <span className="text-peach/85">
          {ORDERS_ENABLED ? "Cada pedido lo confirma Bocatto por WhatsApp." : "Modo demostración: los pedidos no se envían."}
        </span>
      </div>

      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
          scrolled ? "bg-peach/95 shadow-[0_8px_24px_-18px_rgb(42_23_18/0.6)]" : "bg-peach"
        }`}
      >
        <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-10">
          <a href="#inicio" className="flex items-center gap-3 rounded-xl" aria-label="Bocatto Dolci, ir al inicio">
            <Logo className="size-12 sm:size-14" />
            <span className="hidden text-sm font-semibold leading-tight text-cacao-soft xs:block">
              Bocatto
              <br />
              Experience
            </span>
          </a>

          <nav aria-label="Secciones" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="rounded-full px-4 py-2 font-semibold text-cacao transition-colors hover:bg-carmine/10 hover:text-carmine"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <CartButton />
        </div>
      </header>
    </>
  );
}

import { discountPercent, type Product } from "../data/catalog";
import { formatCOP } from "../lib/format";

/** Precio en COP con precio anterior tachado y % de descuento cuando OlaClick lo muestra. */
export function Price({ product, className = "", size = "md" }: { product: Product; className?: string; size?: "md" | "lg" }) {
  const off = discountPercent(product);
  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-2 gap-y-1 tabular-nums ${className}`}>
      <span className={size === "lg" ? "text-2xl font-bold sm:text-3xl" : "text-lg font-bold"}>{formatCOP(product.price)}</span>
      {product.originalPrice && (
        <>
          <s className="text-[0.95em] opacity-70" aria-label={`Antes ${formatCOP(product.originalPrice)}`}>
            {formatCOP(product.originalPrice)}
          </s>
          <span className="rounded-full bg-orange px-2 py-0.5 text-xs font-bold tracking-wide text-cacao">−{off}%</span>
        </>
      )}
    </span>
  );
}

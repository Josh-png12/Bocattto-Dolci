import { useState } from "react";
import { imageSrc, imageSrcSet, type Product } from "../data/catalog";

interface Props {
  product: Product;
  sizes: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}

/**
 * Fotografía de producto con srcset WebP, lazy loading y estados:
 * - cargando: plato kraft con grano;
 * - error: placa kraft con el nombre del postre (nunca un ícono roto).
 */
export function ProductImage({ product, sizes, className = "", imgClassName = "", eager = false }: Props) {
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  return (
    <div className={`img-plate relative overflow-hidden ${className}`}>
      {state !== "error" ? (
        <img
          src={imageSrc(product, 800)}
          srcSet={imageSrcSet(product)}
          sizes={sizes}
          alt={product.image.alt}
          width={800}
          height={800}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          decoding="async"
          onLoad={() => setState("ok")}
          onError={() => setState("error")}
          className={`size-full object-cover transition-opacity duration-700 ${state === "ok" ? "opacity-100" : "opacity-0"} ${imgClassName}`}
        />
      ) : (
        <div role="img" aria-label={product.image.alt} className="grid size-full place-items-center p-4 text-center">
          <span className="display-soft text-lg text-cacao/70">{product.displayName}</span>
        </div>
      )}
    </div>
  );
}

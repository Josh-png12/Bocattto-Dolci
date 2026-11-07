import type { ReactNode } from "react";
import { useCart } from "../cart/CartContext";
import type { Product } from "../data/catalog";
import { Plus } from "./Icons";

interface Props {
  product: Product;
  children?: ReactNode;
  variant?: "primary" | "cream" | "ghost";
  className?: string;
}

/** Abre la hoja del producto para elegir opciones y cantidad, y agregarlo al pedido. */
export function AddButton({ product, children = "Agregar al pedido", variant = "primary", className = "" }: Props) {
  const { openProduct } = useCart();
  return (
    <button
      type="button"
      onClick={() => openProduct(product.slug)}
      className={`btn btn-${variant} ${className}`}
      aria-haspopup="dialog"
      aria-label={`${typeof children === "string" ? children : "Agregar al pedido"}: ${product.displayName}`}
    >
      <Plus className="btn-arrow size-5" />
      <span>{children}</span>
    </button>
  );
}

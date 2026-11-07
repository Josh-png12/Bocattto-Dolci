import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import { ORDERING } from "../config/ordering";
import { PRODUCTS, type Product } from "../data/catalog";
import { clampQty, itemCount, lineKey, orderTotal, priceLine, type CartLine, type ChosenOption, type PricedLine } from "./pricing";

interface State {
  lines: CartLine[];
  note: string;
}

type Action =
  | { type: "add"; productId: string; options: ChosenOption[]; qty: number; note?: string }
  | { type: "setQty"; key: string; qty: number }
  | { type: "remove"; key: string }
  | { type: "note"; note: string }
  | { type: "clear" };

function reducer(state: State, a: Action): State {
  switch (a.type) {
    case "add": {
      const note = a.note?.trim().slice(0, ORDERING.maxCardMessage) || undefined;
      const key = lineKey(a.productId, a.options, note);
      const existing = state.lines.find((l) => l.key === key);
      const lines = existing
        ? state.lines.map((l) => (l.key === key ? { ...l, qty: clampQty(l.qty + a.qty) } : l))
        : [...state.lines, { key, productId: a.productId, options: a.options, qty: clampQty(a.qty), note }];
      return { ...state, lines };
    }
    case "setQty":
      return { ...state, lines: state.lines.map((l) => (l.key === a.key ? { ...l, qty: clampQty(a.qty) } : l)) };
    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.key !== a.key) };
    case "note":
      return { ...state, note: a.note.slice(0, ORDERING.maxOrderNote) };
    case "clear":
      return { lines: [], note: "" };
  }
}

/** Lee el pedido guardado; descarta todo lo que ya no exista en el catálogo. */
function load(): State {
  try {
    const raw = sessionStorage.getItem(ORDERING.storageKey);
    if (!raw) return { lines: [], note: "" };
    const data = JSON.parse(raw) as Partial<State>;
    const lines = Array.isArray(data.lines) ? data.lines.filter((l) => l && priceLine(l)) : [];
    return { lines, note: typeof data.note === "string" ? data.note : "" };
  } catch {
    return { lines: [], note: "" };
  }
}

interface Toast {
  id: number;
  title: string;
  detail: string;
  /** Muestra el botón "Ver pedido". */
  action?: "cart";
}

interface CartApi {
  lines: PricedLine[];
  count: number;
  total: number;
  note: string;
  add: (product: Product, options: ChosenOption[], qty: number, note?: string) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  setNote: (note: string) => void;
  clear: () => void;
  /** Hoja de producto (selección de opciones y cantidad). */
  sheetProduct: Product | null;
  openProduct: (slug: string) => void;
  closeProduct: () => void;
  /** Panel del pedido. */
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toast: Toast | null;
  dismissToast: () => void;
  notify: (title: string, detail: string) => void;
}

const Ctx = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  const [sheetSlug, setSheetSlug] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  // Conserva la selección mientras el usuario navega (vive hasta cerrar la pestaña).
  useEffect(() => {
    try {
      sessionStorage.setItem(ORDERING.storageKey, JSON.stringify(state));
    } catch {
      /* almacenamiento no disponible: el carrito sigue funcionando en memoria */
    }
  }, [state]);

  const lines = useMemo(() => state.lines.map(priceLine).filter((l): l is PricedLine => l !== null), [state.lines]);

  const add = useCallback<CartApi["add"]>((product, options, qty, note) => {
    dispatch({ type: "add", productId: product.id, options, qty, note });
    setToast({ id: Date.now(), title: "Agregado", detail: `${qty} × ${product.displayName}`, action: "cart" });
  }, []);

  const api: CartApi = {
    lines,
    count: itemCount(lines),
    total: orderTotal(lines),
    note: state.note,
    add,
    setQty: (key, qty) => dispatch({ type: "setQty", key, qty }),
    remove: (key) => dispatch({ type: "remove", key }),
    setNote: (note) => dispatch({ type: "note", note }),
    clear: () => dispatch({ type: "clear" }),
    sheetProduct: sheetSlug ? PRODUCTS.find((p) => p.slug === sheetSlug) ?? null : null,
    openProduct: (slug) => {
      setCartOpen(false);
      setSheetSlug(slug);
    },
    closeProduct: () => setSheetSlug(null),
    cartOpen,
    openCart: () => {
      setSheetSlug(null);
      setToast(null);
      setCartOpen(true);
    },
    closeCart: () => setCartOpen(false),
    toast,
    dismissToast: () => setToast(null),
    notify: (title, detail) => setToast({ id: Date.now(), title, detail }),
  };

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return c;
}

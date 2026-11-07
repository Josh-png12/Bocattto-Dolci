import { ORDERING } from "../config/ordering";
import { Minus, Plus } from "./Icons";

interface Props {
  value: number;
  onChange: (n: number) => void;
  label: string;
  size?: "md" | "sm";
}

/** Selector de cantidad accesible (1–máximo configurado). */
export function QtyStepper({ value, onChange, label, size = "md" }: Props) {
  const btn =
    size === "md"
      ? "size-11"
      : "size-10";
  const base = `${btn} grid place-items-center rounded-full transition-transform duration-300 ease-[var(--ease-squish)] active:scale-90 disabled:opacity-35 disabled:active:scale-100`;
  return (
    <div role="group" aria-label={label} className="inline-flex items-center gap-1 rounded-full bg-peach-deep p-1">
      <button
        type="button"
        className={`${base} hover:bg-kraft`}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Disminuir cantidad"
      >
        <Minus className="size-4" />
      </button>
      <output aria-live="polite" aria-label={`Cantidad: ${value}`} className="min-w-7 text-center text-lg font-bold tabular-nums">
        {value}
      </output>
      <button
        type="button"
        className={`${base} bg-carmine text-cream hover:bg-carmine-deep`}
        onClick={() => onChange(value + 1)}
        disabled={value >= ORDERING.maxQtyPerLine}
        aria-label="Aumentar cantidad"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

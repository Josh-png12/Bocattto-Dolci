const cop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

/** "$ 14.500" — mismo formato que OlaClick (símbolo a la izquierda, punto de miles). */
export const formatCOP = (value: number) => cop.format(value).replace(/ /g, " ");

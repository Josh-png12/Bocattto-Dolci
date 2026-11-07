/** Iconos dibujados a mano para el proyecto: trazo 2px, puntas redondas. */
type P = { className?: string };
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: "false" as const,
};

export const ArrowRight = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M4 12h15M13 6l6 6-6 6" /></svg>
);
export const ArrowUpRight = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const ChevronDown = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="m6 9 6 6 6-6" /></svg>
);
export const ArrowLeft = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M20 12H5M11 6l-6 6 6 6" /></svg>
);
export const Refresh = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6" /></svg>
);
export const Chat = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M4 19.5 5.4 15A8 8 0 1 1 9 18.6Z" /><path d="M9 10.5c.3 1.8 1.7 3.2 3.5 3.6l1.2-1 1.8.8" /></svg>
);
export const Camera = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="3.8" /><circle cx="17" cy="7" r=".6" fill="currentColor" /></svg>
);
export const Clock = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
);
export const Bag = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 8h14l-1 12H6Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>
);
export const Spoon = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><ellipse cx="15.5" cy="7.5" rx="3.6" ry="4.6" transform="rotate(40 15.5 7.5)" /><path d="M12.6 10.6 4 19.5" /></svg>
);
export const Check = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
);
export const Plus = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M12 5v14M5 12h14" /></svg>
);
export const Minus = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 12h14" /></svg>
);
export const Close = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Trash = ({ className = "size-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}><path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12" /></svg>
);

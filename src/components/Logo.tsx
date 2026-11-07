/**
 * Logotipo original de Bocatto Dolci (archivo de OlaClick, sin redibujar).
 * Se presenta como "sticker" con sus esquinas redondeadas originales.
 */
export function Logo({ className = "size-14" }: { className?: string }) {
  return (
    <img
      src="/brand/bocatto-dolci-logo-160.webp"
      srcSet="/brand/bocatto-dolci-logo-160.webp 160w, /brand/bocatto-dolci-logo-320.webp 320w"
      sizes="(min-width: 768px) 80px, 56px"
      width={160}
      height={160}
      alt="Bocatto Dolci"
      className={`rounded-[18%] shadow-[0_6px_14px_-8px_rgb(42_23_18/0.5)] ${className}`}
    />
  );
}

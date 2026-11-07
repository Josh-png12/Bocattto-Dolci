import { useEffect, useState, type RefObject } from "react";

/** true cuando el elemento ya quedó por encima del viewport (se pasó al hacer scroll). */
export function useScrolledPast(ref: RefObject<Element | null>) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => {
      setPast(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return past;
}

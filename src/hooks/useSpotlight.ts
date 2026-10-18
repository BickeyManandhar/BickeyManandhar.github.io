import { useEffect } from "react";

/** Feeds pointer position into --mx/--my on any `.spot` card so CSS can draw a soft highlight. */
export function useSpotlight() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(".spot") as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    addEventListener("pointermove", onMove, { passive: true });
    return () => removeEventListener("pointermove", onMove);
  }, []);
}

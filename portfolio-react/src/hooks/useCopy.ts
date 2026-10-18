import { useCallback, useState } from "react";

/** Copy text to the clipboard; falls back to selecting the given element's text. */
export function useCopy() {
  const [state, setState] = useState<"idle" | "copied" | "selected">("idle");
  const copy = useCallback((text: string, fallbackEl?: HTMLElement | null) => {
    const done = (s: "copied" | "selected") => {
      setState(s);
      setTimeout(() => setState("idle"), 1500);
    };
    navigator.clipboard
      .writeText(text)
      .then(() => done("copied"))
      .catch(() => {
        if (fallbackEl) {
          const r = document.createRange();
          r.selectNodeContents(fallbackEl);
          const s = getSelection();
          s?.removeAllRanges();
          s?.addRange(r);
        }
        done("selected");
      });
  }, []);
  return { state, copy };
}

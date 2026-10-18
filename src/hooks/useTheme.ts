import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const systemTheme = (): Theme => (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

/** Explicit choice is stored; otherwise the OS setting wins. */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(
    () => (document.documentElement.dataset.theme as Theme | undefined) ?? systemTheme(),
  );

  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!document.documentElement.dataset.theme) setThemeState(systemTheme());
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem("theme", t);
    } catch {
      /* storage can be unavailable in private windows */
    }
    setThemeState(t);
  }, []);

  const toggle = useCallback(() => setTheme(theme === "dark" ? "light" : "dark"), [theme, setTheme]);

  return { theme, toggle };
}

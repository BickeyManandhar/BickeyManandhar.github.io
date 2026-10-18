import { profile, sections } from "../content";
import type { Theme } from "../hooks/useTheme";

type Props = { theme: Theme; onToggleTheme: () => void; onOpenPalette: () => void; active: string | null; progress: number };

export function Header({ theme, onToggleTheme, onOpenPalette, active, progress }: Props) {
  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);
  return (
    <header className="bar">
      <div className="wrap">
        <a className="logo" href="#top">
          <span className="dot" aria-hidden="true" />
          {profile.handle}
        </a>
        <nav className="links" aria-label="Sections">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined}>
              /{s.label}
            </a>
          ))}
        </nav>
        <div className="tools">
          <button className="btn" onClick={onOpenPalette} aria-label="Open command palette">
            <kbd>{isMac ? "⌘K" : "Ctrl K"}</kbd>
          </button>
          <button className="btn" onClick={onToggleTheme} aria-label="Toggle light and dark theme">
            <span aria-hidden="true">{theme === "dark" ? "☾" : "☀"}</span>
            <span>{theme}</span>
          </button>
        </div>
      </div>
      <div className="progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    </header>
  );
}

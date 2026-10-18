import { useEffect, useMemo, useRef, useState } from "react";

export type Command = { label: string; hint: string; run: () => void };

export function CommandPalette({ open, onClose, commands }: { open: boolean; onClose: () => void; commands: Command[] }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const shown = useMemo(() => {
    const needle = q.toLowerCase().replace(/^>\s*/, "");
    return commands.filter((c) => c.label.includes(needle));
  }, [q, commands]);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  if (!open) return null;

  const run = (i: number) => {
    const c = shown[i];
    if (!c) return;
    onClose();
    c.run();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => (s + 1) % Math.max(shown.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => (s - 1 + shown.length) % Math.max(shown.length, 1));
    } else if (e.key === "Enter") run(sel);
  };

  return (
    <div className="pal-bg" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="pal" role="dialog" aria-label="Command palette" onKeyDown={onKey}>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setSel(0);
          }}
          placeholder="> type a command…"
          autoComplete="off"
          aria-label="Command"
        />
        <ul role="listbox">
          {shown.length ? (
            shown.map((c, i) => (
              <li key={c.label} role="option" aria-selected={i === sel} onMouseEnter={() => setSel(i)} onClick={() => run(i)}>
                <span>&gt; {c.label}</span>
                <span className="k">{c.hint}</span>
              </li>
            ))
          ) : (
            <li>no matching command</li>
          )}
        </ul>
        <div className="pal-foot">
          <span>
            <kbd>↑</kbd> <kbd>↓</kbd> move
          </span>
          <span>
            <kbd>↵</kbd> run
          </span>
          <span>
            <kbd>esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}

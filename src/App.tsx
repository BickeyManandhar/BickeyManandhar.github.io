import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { CommandPalette, type Command } from "./components/CommandPalette";
import { useTheme } from "./hooks/useTheme";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useActiveSection } from "./hooks/useActiveSection";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { useSpotlight } from "./hooks/useSpotlight";
import { profile, sections } from "./content";

const SECTION_IDS = [...sections.map((s) => s.id), "education"];

export default function App() {
  const { theme, toggle } = useTheme();
  const reduceMotion = useReducedMotion();
  const active = useActiveSection(SECTION_IDS);
  const progress = useScrollProgress();
  const [paletteOpen, setPaletteOpen] = useState(false);
  useSpotlight();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  const commands = useMemo<Command[]>(() => {
    const go = (id: string) => () =>
      document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    return [
      ...["about", "experience", "skills", "projects", "education", "contact"].map((id) => ({
        label: id,
        hint: `#${id}`,
        run: go(id),
      })),
      { label: "toggle theme", hint: "run", run: toggle },
      {
        label: "copy email",
        hint: "run",
        run: () => navigator.clipboard?.writeText(profile.email).catch(() => {}),
      },
      { label: "open linkedin", hint: "↗", run: () => window.open(profile.linkedin, "_blank", "noopener") },
      { label: "open github", hint: "↗", run: () => window.open(profile.github, "_blank", "noopener") },
      { label: "top", hint: "#top", run: go("top") },
    ];
  }, [toggle, reduceMotion]);

  return (
    <>
      <Header
        theme={theme}
        onToggleTheme={toggle}
        onOpenPalette={() => setPaletteOpen(true)}
        active={active}
        progress={progress}
      />
      <main>
        <Hero theme={theme} reduceMotion={reduceMotion} />
        <About reduceMotion={reduceMotion} />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <footer>
        <div className="wrap">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>react · static · no database · 0 servers harmed</span>
        </div>
      </footer>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} commands={commands} />
    </>
  );
}

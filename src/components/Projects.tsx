import { projects } from "../content";
import { SectionHead } from "./SectionHead";

export function Projects() {
  return (
    <section className="svc" id="projects">
      <div className="wrap">
        <SectionHead service="projects-service" title="Projects" alias="side services" />
        <div className="grid-p">
          {projects.map((p) => (
            <article key={p.title} className="proj spot">
              <div className="arch">
                <svg viewBox="0 0 320 150" aria-hidden="true">
                  {p.arch.map((label, i) => (
                    <g key={label}>
                      <rect x={16 + i * 105} y="55" width="78" height="40" rx="6" />
                      <text x={55 + i * 105} y="79" textAnchor="middle">
                        {label}
                      </text>
                    </g>
                  ))}
                  <path className="a" d="M94 75H121" />
                  <path className="a" d="M199 75H226" />
                  {p.archNote && (
                    <text x="55" y="42" textAnchor="middle">
                      {p.archNote}
                    </text>
                  )}
                </svg>
              </div>
              <div className="in">
                <div className="status">
                  <span className="pill">{p.status}</span>
                  <span>{p.kind}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <div className="stack">
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                {p.link && (
                  <a className="src" href={p.link} target="_blank" rel="noopener">
                    view source →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

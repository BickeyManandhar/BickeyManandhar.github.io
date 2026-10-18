import { releases } from "../content";
import { SectionHead } from "./SectionHead";

export function Experience() {
  return (
    <section className="svc" id="experience">
      <div className="wrap">
        <SectionHead service="experience-service" title="Experience" alias="deployment log" />
        <div className="log">
          {releases.map((r, i) => (
            <article key={r.tag} className={`rel${i === 0 ? " current" : ""}`}>
              <span className="node" aria-hidden="true" />
              <div>
                <div className="rel-meta">
                  <span className="tag">{r.tag}</span>
                  {r.when && <span>{r.when}</span>}
                  {r.live && <span className="pill">live</span>}
                </div>
                <h3>{r.title}</h3>
                <p className="org">{r.org}</p>
                {r.wins && (
                  <ul className="wins">
                    {r.wins.map((w) => (
                      <li key={w.impact} className="spot">
                        <span className="impact">
                          <span className="impact-tag">impact</span>
                          {w.impact}
                        </span>
                        {w.proof && <span className="proof">{w.proof}</span>}
                        <span className="how">{w.how}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {r.stack && (
                  <div className="stack">
                    {r.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

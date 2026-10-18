import { skills } from "../content";
import { SectionHead } from "./SectionHead";

export function Skills() {
  return (
    <section className="svc" id="skills">
      <div className="wrap">
        <SectionHead service="skills-service" title="Skills" alias="topology" />
        <div className="topo">
          {skills.map((g) => (
            <div key={g.group} className="cluster spot">
              <h4>
                {g.group} <span>{g.items.length} nodes</span>
              </h4>
              <div className="chips">
                {g.items.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

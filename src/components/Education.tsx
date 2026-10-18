import { education } from "../content";
import { SectionHead } from "./SectionHead";

export function Education() {
  return (
    <section className="svc" id="education">
      <div className="wrap">
        <SectionHead service="education-service" title="Education" />
        <div className="edu">
          {education.map((e) => (
            <div key={e.degree}>
              <b>{e.degree}</b>
              <span>{e.school}</span>
              <small>{e.status}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

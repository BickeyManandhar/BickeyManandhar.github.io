import { about, profile } from "../content";
import { Journey } from "./Journey";
import { SectionHead } from "./SectionHead";

export function About({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <section className="svc" id="about">
      <div className="wrap">
        <SectionHead service="about-service" title={about.title} />
        <Journey reduceMotion={reduceMotion} />
        <div className="about">
          <div className="prose">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="side">
            <figure className="portrait">
              <img src={profile.photo} alt={`Portrait of ${profile.name} in a navy suit`} width={640} height={800} loading="lazy" />
              <span className="tick tl" aria-hidden="true" />
              <span className="tick tr" aria-hidden="true" />
              <figcaption>
                <span>
                  <b>{profile.name}</b>
                  {profile.role}
                </span>
                <span className="on">online</span>
              </figcaption>
            </figure>
            <dl className="facts">
              {about.facts.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd className={k === "status" ? "ok" : undefined}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

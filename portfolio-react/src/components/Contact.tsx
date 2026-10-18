import { useRef } from "react";
import { contact } from "../content";
import { useCopy } from "../hooks/useCopy";
import { SectionHead } from "./SectionHead";

function Endpoint({ method, label, href, copy: text }: (typeof contact.endpoints)[number]) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const { state, copy } = useCopy();
  return (
    <div className="ep">
      <span className="m">{method}</span>
      <span className="v" ref={valueRef}>
        {href ? (
          <a href={href} target="_blank" rel="noopener">
            {label}
          </a>
        ) : (
          label
        )}
      </span>
      <button type="button" onClick={() => copy(text, valueRef.current)} aria-label={`Copy ${label}`}>
        {state === "idle" ? "copy" : state}
      </button>
    </div>
  );
}

export function Contact() {
  return (
    <section className="svc" id="contact">
      <div className="wrap">
        <SectionHead service="contact-service" status="accepting connections" title="Contact" alias="open a connection" />
        <div className="contact">
          <p>{contact.pitch}</p>
          <div className="endpoints">
            {contact.endpoints.map((e) => (
              <Endpoint key={e.label} {...e} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

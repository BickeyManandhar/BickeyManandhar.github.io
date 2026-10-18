type Props = { service: string; status?: string; title: string; alias?: string };

/** Plain-language title for everyone, with the engineering name alongside. */
export function SectionHead({ service, status = "healthy", title, alias }: Props) {
  return (
    <div className="svc-head">
      <span className="svc-name">
        {service} <i>● {status}</i>
      </span>
      <h2>
        {title}
        {alias && <span className="alias">/ {alias}</span>}
      </h2>
    </div>
  );
}

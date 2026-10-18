import { useCallback, useRef, useState } from "react";
import { ArchitectureGraph, nodeLabel, type Edge } from "./ArchitectureGraph";
import { hero, stats } from "../content";
import type { Theme } from "../hooks/useTheme";

type Hop = { id: number; time: string; from: string; to: string; verb: string };

const SEED: Edge[] = [
  ["alb", "svc", "f"],
  ["svc", "cache", "f"],
  ["svc", "kafka", "f"],
  ["aurora", "dr", "r"],
  ["flink", "lake", "f"],
  ["lake", "snow", "f"],
];

const toHop = (e: Edge, id: number): Hop => ({
  id,
  time: new Date().toTimeString().slice(0, 8),
  from: nodeLabel(e[0]),
  to: nodeLabel(e[1]),
  verb: e[2] === "r" ? "replicated" : "delivered",
});

export function Hero({ theme, reduceMotion }: { theme: Theme; reduceMotion: boolean }) {
  const counter = useRef(SEED.length);
  const last = useRef(0);
  const [hops, setHops] = useState<Hop[]>(() => SEED.map((e, i) => toHop(e, i)).reverse());

  // the traffic log mirrors packets that finish a hop in the graph, at most ~1 per second
  const onHop = useCallback((e: Edge) => {
    const now = performance.now();
    if (now - last.current < 900) return;
    last.current = now;
    setHops((h) => [toHop(e, counter.current++), ...h].slice(0, 7));
  }, []);

  return (
    <section className="hero" aria-label="Introduction" id="top">
      <ArchitectureGraph className="net" theme={theme} reduceMotion={reduceMotion} onHop={onHop} />
      <div className="wrap hero-copy">
        <div className="eyebrow rise" style={{ "--d": 0 } as React.CSSProperties}>
          {hero.eyebrow.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <h1 className="rise" style={{ "--d": 1 } as React.CSSProperties}>
          {hero.headline} <span className="hl">{hero.highlight}</span>
        </h1>
        <p className="lede rise" style={{ "--d": 2 } as React.CSSProperties}>
          {hero.lede.map((part, i) => (typeof part === "string" ? part : <b key={i}>{part.b}</b>))}
        </p>
        <div className="cta rise" style={{ "--d": 3 } as React.CSSProperties}>
          <a className="primary" href="#experience">
            view experience →
          </a>
          <a href="#contact">contact me</a>
        </div>
      </div>
      <div className="legend" aria-hidden="true">
        <span>
          <i className="l f" />
          request / event flow
        </span>
        <span>
          <i className="l r" />
          cross-region replication
        </span>
        <span>
          <i className="l p" />
          builds · deploys · provisions
        </span>
      </div>
      <div className="ticker" aria-hidden="true">
        <div className="wrap">
          <span className="sim">● simulated traffic</span>
          {hops.map((h) => (
            <span key={h.id} className="hop">
              {h.time} <b>{h.from}</b> → <b>{h.to}</b> <span className="ev">{h.verb}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="stats">
        <div className="wrap">
          <dl>
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

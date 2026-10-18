import { useEffect, useRef, useState } from "react";

const PATH =
  "M 120 100 C 184 45 284 40 311 88 C 335 128 251 140 266 108 C 280 76 393 58 457 96 C 517 132 590 140 627 112 C 663 84 598 58 570 82 C 543 106 685 126 740 106 C 780 92 809 94 842 98";

type Step = { x: number; y: number; rot: number; side: 1 | -1 };

/** Animated footsteps walking from Nepal to the United States along a looping path. */
export function Journey({ reduceMotion }: { reduceMotion: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [k, setK] = useState(1.3);
  const [head, setHead] = useState(0);

  // lay footprints along the path; larger prints on narrow screens so they stay visible
  useEffect(() => {
    const build = () => {
      const path = pathRef.current!;
      const scale = (svgRef.current?.clientWidth || 1000) / 1000;
      const kk = Math.max(1.3, 0.7 / scale);
      const L = path.getTotalLength();
      const out: Step[] = [];
      for (let i = 0, s = 10; s < L - 6; i++, s += 15 * kk) {
        const p = path.getPointAtLength(s);
        const q = path.getPointAtLength(Math.min(s + 1, L));
        const ang = Math.atan2(q.y - p.y, q.x - p.x);
        const side: 1 | -1 = i % 2 ? 1 : -1;
        out.push({
          x: p.x + Math.cos(ang + Math.PI / 2) * 4.5 * kk * side,
          y: p.y + Math.sin(ang + Math.PI / 2) * 4.5 * kk * side,
          rot: (ang * 180) / Math.PI + 90,
          side,
        });
      }
      setK(kk);
      setSteps(out);
    };
    build();
    addEventListener("resize", build);
    return () => removeEventListener("resize", build);
  }, []);

  useEffect(() => {
    if (reduceMotion || !steps.length) return;
    const id = setInterval(() => setHead((h) => (h > steps.length + 10 ? 0 : h + 1)), 160);
    return () => clearInterval(id);
  }, [reduceMotion, steps.length]);

  const stars = [];
  for (let r = 0; r < 5; r++)
    for (let c = 0; c < 6; c++) if (!(r % 2 && c === 5)) stars.push([4 + c * 7.6 + (r % 2 ? 3.8 : 0), 4.2 + r * 7.6]);

  return (
    <figure className="journey spot" aria-label="Animated footsteps walking from Nepal to the United States">
      <svg ref={svgRef} viewBox="0 30 1000 150" role="img" aria-hidden="true">
        <g transform="translate(30,48)">
          <path d="M2 2 L64 44 L22 44 L64 92 L2 92 Z" fill="#DC143C" stroke="#003893" strokeWidth="4" strokeLinejoin="round" />
          <path d="M12 28 a9 9 0 0 0 18 0 a9 7 0 0 1 -18 0 Z" fill="#fff" />
          <circle cx="21" cy="25" r="3.2" fill="#fff" />
          <g transform="translate(21,72)" fill="#fff">
            <circle r="6" />
            <path d="M0-11 2-6 6-9.5 6-4.5 11-4 7.5 0 11 4 6 4.5 6 9.5 2 6 0 11-2 6-6 9.5-6 4.5-11 4-7.5 0-11-4-6-4.5-6-9.5-2-6Z" />
          </g>
        </g>
        <g transform="translate(860,58)">
          <rect width="112" height="72" fill="#B22234" rx="1" />
          <g fill="#fff">
            {[5.5, 16.6, 27.7, 38.8, 49.9, 61].map((y) => (
              <rect key={y} y={y} width="112" height="5.5" />
            ))}
          </g>
          <rect width="46" height="38.8" fill="#3C3B6E" />
          <g fill="#fff">
            {stars.map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.3} />
            ))}
          </g>
        </g>
        <path ref={pathRef} d={PATH} fill="none" className="jpath" strokeWidth="1.5" strokeDasharray="3 6" />
        <g>
          {steps.map((s, i) => {
            const on = reduceMotion || i < head;
            const fresh = !reduceMotion && on && head - i <= 4;
            return (
              <g
                key={i}
                className={`fp${fresh && head - i <= 2 ? " now" : ""}`}
                style={{ opacity: on ? (reduceMotion ? 0.9 : fresh ? 1 : 0.6) : 0 }}
                transform={`translate(${s.x.toFixed(1)},${s.y.toFixed(1)}) rotate(${s.rot.toFixed(1)}) scale(${(s.side * k).toFixed(2)},${k.toFixed(2)})`}
              >
                <ellipse cx="0" cy="1.5" rx="2.6" ry="3.9" />
                <circle cx="-1.7" cy="-3.9" r="1" />
                <circle cx=".2" cy="-4.7" r="1" />
                <circle cx="2" cy="-3.9" r=".9" />
              </g>
            );
          })}
        </g>
        <text x="63" y="168" textAnchor="middle">
          Nepal
        </text>
        <text x="916" y="168" textAnchor="middle">
          United States
        </text>
      </svg>
    </figure>
  );
}

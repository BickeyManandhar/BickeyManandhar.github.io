import { useEffect, useRef } from "react";
import type { Theme } from "../hooks/useTheme";

/** kind: f = request/event flow, r = cross-region replication, p = builds/deploys/provisions */
export type EdgeKind = "f" | "r" | "p";
export type Edge = [from: string, to: string, kind: EdgeKind];

// [id, label, short label for phones, u, v] — u,v place the node inside the graph area (0..1)
const NODES: [string, string, string, number, number][] = [
  ["users", "Users", "Users", 0.02, 0.4],
  ["alb", "ALB", "ALB", 0.17, 0.24],
  ["nlb", "NLB", "NLB", 0.17, 0.56],
  ["svc", "Spring Boot · ECS", "Spring Boot", 0.38, 0.4],
  ["java", "Java", "Java", 0.36, 0.1],
  ["kafka", "Kafka · Avro", "Kafka", 0.6, 0.1],
  ["cache", "ElastiCache · Redis/Valkey", "ElastiCache", 0.64, 0.32],
  ["aurora", "Aurora PostgreSQL", "Aurora PG", 0.6, 0.56],
  ["ddb", "DynamoDB", "DynamoDB", 0.56, 0.8],
  ["lambda", "Lambda", "Lambda", 0.34, 0.78],
  ["flink", "Flink", "Flink", 0.8, 0.02],
  ["lake", "S3 · Glue data lake", "S3 · Glue", 0.96, 0.14],
  ["athena", "Athena", "Athena", 0.98, 0.34],
  ["snow", "Snowflake", "Snowflake", 0.84, 0.44],
  ["dr", "us-east-2 · DR", "us-east-2 DR", 0.92, 0.7],
  ["tf", "Terraform", "Terraform", 0.06, 0.9],
  ["jenkins", "Jenkins", "Jenkins", 0.06, 0.72],
  ["spin", "Spinnaker", "Spinnaker", 0.2, 0.82],
];

export const EDGES: Edge[] = [
  ["users", "alb", "f"],
  ["users", "nlb", "f"],
  ["alb", "svc", "f"],
  ["nlb", "svc", "f"],
  ["java", "svc", "p"],
  ["svc", "kafka", "f"],
  ["svc", "cache", "f"],
  ["svc", "aurora", "f"],
  ["lambda", "ddb", "f"],
  ["kafka", "lambda", "f"],
  ["kafka", "flink", "f"],
  ["flink", "lake", "f"],
  ["lake", "athena", "f"],
  ["lake", "snow", "f"],
  ["aurora", "dr", "r"],
  ["ddb", "dr", "r"],
  ["cache", "dr", "r"],
  ["jenkins", "spin", "p"],
  ["spin", "svc", "p"],
  ["tf", "alb", "p"],
  ["tf", "nlb", "p"],
];

const IDX = Object.fromEntries(NODES.map((n, i) => [n[0], i]));
export const nodeLabel = (id: string) => NODES[IDX[id]][1];

type Props = {
  theme: Theme;
  reduceMotion: boolean;
  onHop?: (edge: Edge) => void;
  className?: string;
};

export function ArchitectureGraph({ theme, reduceMotion, onHop, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onHopRef = useRef(onHop);
  onHopRef.current = onHop;

  useEffect(() => {
    const cv = canvasRef.current!;
    const cx = cv.getContext("2d")!;
    const root = document.documentElement;
    const col: Record<string, string> = {};
    const s = getComputedStyle(root);
    ["--accent", "--event", "--line", "--muted", "--fg", "--bg"].forEach((k) => (col[k] = s.getPropertyValue(k).trim()));

    let W = 0,
      H = 0,
      narrow = false,
      raf = 0,
      hover = -1;
    let mouse = { x: -999, y: -999 };
    let nodes: { id: string; l: string; bx: number; by: number; x: number; y: number; ph: number; r: number }[] = [];
    let packets: { e: Edge; t: number; s: number }[] = [];
    const t0 = performance.now();

    const layout = () => {
      const r = cv.getBoundingClientRect();
      W = r.width;
      H = r.height;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      cv.width = W * dpr;
      cv.height = H * dpr;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      narrow = W < 820;
      const x0 = narrow ? W * 0.07 : W * 0.52,
        x1 = W * 0.93,
        y0 = H * 0.12,
        y1 = narrow ? H * 0.86 : H * 0.8;
      nodes = NODES.map(([id, l, short, u, v], i) => ({
        id,
        l: narrow ? short : l,
        bx: x0 + u * (x1 - x0),
        by: y0 + v * (y1 - y0),
        x: 0,
        y: 0,
        ph: i * 1.7,
        r: id === "svc" ? 8 : id === "dr" ? 7 : 5,
      }));
      packets = [];
    };

    const draw = (now?: number) => {
      const t = ((now ?? performance.now()) - t0) / 1000;
      const amp = reduceMotion ? 0 : 4;
      cx.clearRect(0, 0, W, H);
      nodes.forEach((n) => {
        n.x = n.bx + Math.sin(t * 0.5 + n.ph) * amp;
        n.y = n.by + Math.cos(t * 0.4 + n.ph) * amp;
      });
      hover = nodes.findIndex((n) => Math.hypot(n.x - mouse.x, n.y - mouse.y) < 22);

      cx.font = '500 11px "JetBrains Mono", monospace';
      cx.fillStyle = col["--accent"];
      cx.fillText("us-east-1 · primary", nodes[IDX.users].bx - 4, H * 0.07);

      // a hovered node lights its edges; everything else dims a little so the path reads
      EDGES.forEach(([a, b, k]) => {
        const A = nodes[IDX[a]],
          B = nodes[IDX[b]];
        const lit = hover === IDX[a] || hover === IDX[b];
        cx.setLineDash(k === "r" ? [6, 5] : k === "p" ? [2, 4] : []);
        cx.strokeStyle = lit ? col["--accent"] : k === "r" ? col["--event"] : col["--line"];
        cx.globalAlpha = lit ? 1 : hover >= 0 ? 0.35 : k === "r" ? 0.55 : 0.9;
        cx.lineWidth = lit ? 1.8 : 1.1;
        cx.beginPath();
        cx.moveTo(A.x, A.y);
        cx.lineTo(B.x, B.y);
        cx.stroke();
      });
      cx.setLineDash([]);
      cx.globalAlpha = 1;

      if (!reduceMotion && Math.random() < 0.09 && packets.length < 22) {
        const live = EDGES.filter((e) => e[2] !== "p");
        packets.push({ e: live[Math.floor(Math.random() * live.length)], t: 0, s: 0.005 + Math.random() * 0.008 });
      }
      packets = packets.filter((p) => {
        if (p.t > 1) {
          onHopRef.current?.(p.e);
          return false;
        }
        return true;
      });
      packets.forEach((p) => {
        p.t += p.s;
        const A = nodes[IDX[p.e[0]]],
          B = nodes[IDX[p.e[1]]];
        const c = p.e[2] === "r" ? col["--event"] : col["--accent"];
        cx.fillStyle = c;
        cx.shadowColor = c;
        cx.shadowBlur = 10;
        cx.beginPath();
        cx.arc(A.x + (B.x - A.x) * p.t, A.y + (B.y - A.y) * p.t, 2.4, 0, 7);
        cx.fill();
        cx.shadowBlur = 0;
      });

      nodes.forEach((n, i) => {
        const lit = i === hover;
        cx.fillStyle = col["--bg"];
        cx.strokeStyle = n.id === "dr" ? col["--event"] : col["--accent"];
        cx.lineWidth = lit ? 2.5 : 1.6;
        cx.beginPath();
        cx.arc(n.x, n.y, lit ? n.r + 3 : n.r, 0, 7);
        cx.fill();
        cx.stroke();
        cx.font = `${lit ? 600 : 500} ${narrow ? 10 : 11}px "JetBrains Mono", monospace`;
        cx.fillStyle = lit ? col["--fg"] : col["--muted"];
        cx.textAlign = "center";
        const w = cx.measureText(n.l).width;
        cx.fillText(n.l, Math.min(Math.max(n.x, w / 2 + 4), W - w / 2 - 4), n.y + n.r + 15);
        cx.textAlign = "start";
      });

      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    const host = cv.parentElement!;
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (reduceMotion) draw();
    };
    const onLeave = () => {
      mouse = { x: -999, y: -999 };
      if (reduceMotion) draw();
    };
    const onResize = () => {
      layout();
      if (reduceMotion) draw();
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    addEventListener("resize", onResize);
    layout();
    draw();
    // fonts arrive after first paint; redraw labels once they do
    document.fonts?.ready.then(() => reduceMotion && draw());

    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      removeEventListener("resize", onResize);
    };
  }, [theme, reduceMotion]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

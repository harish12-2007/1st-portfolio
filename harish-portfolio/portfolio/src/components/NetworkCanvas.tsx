import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../hooks/hooks";

type Node = { x: number; y: number; vx: number; vy: number; r: number };
type Pulse = { a: number; b: number; t: number; hops: number };

const LINK = 150;

/**
 * A small drifting graph. Every so often a signal leaves one node and hops
 * along its edges, a loose picture of a forward pass. Pauses when off screen.
 */
export default function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = prefersReducedMotion();
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let lastSpawn = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    const pointer = { x: -999, y: -999 };

    const neighbours = (i: number) => {
      const out: number[] = [];
      const n = nodes[i];
      for (let j = 0; j < nodes.length; j++) {
        if (j === i) continue;
        const dx = n.x - nodes[j].x;
        const dy = n.y - nodes[j].y;
        if (dx * dx + dy * dy < LINK * LINK) out.push(j);
      }
      return out;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d > LINK) continue;
          const mx = (a.x + b.x) / 2 - pointer.x;
          const my = (a.y + b.y) / 2 - pointer.y;
          const near = Math.max(0, 1 - Math.hypot(mx, my) / 180);
          ctx.strokeStyle = `rgba(139,156,255,${(1 - d / LINK) * (0.16 + near * 0.35)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = "rgba(200,208,255,0.55)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (const p of pulses) {
        const a = nodes[p.a];
        const b = nodes[p.b];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 12);
        g.addColorStop(0, "rgba(92,225,230,0.95)");
        g.addColorStop(1, "rgba(92,225,230,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const spawn = (from?: number) => {
      const a = from ?? Math.floor(Math.random() * nodes.length);
      const nb = neighbours(a);
      if (!nb.length) return;
      pulses.push({ a, b: nb[Math.floor(Math.random() * nb.length)], t: 0, hops: from === undefined ? 0 : 1 });
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(64, Math.max(22, (w * h) / 20000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: 1 + Math.random() * 1.5,
      }));
      pulses = [];
      draw();
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      if (t - lastSpawn > 900 && pulses.length < 5) {
        lastSpawn = t;
        spawn();
      }
      const next: Pulse[] = [];
      for (const p of pulses) {
        p.t += 0.018;
        if (p.t < 1) next.push(p);
        else if (p.hops < 3) {
          const nb = neighbours(p.b).filter((k) => k !== p.a);
          if (nb.length) next.push({ a: p.b, b: nb[Math.floor(Math.random() * nb.length)], t: 0, hops: p.hops + 1 });
        }
      }
      pulses = next;
      draw();
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    if (!still) {
      raf = requestAnimationFrame(frame);
      window.addEventListener("pointermove", onMove, { passive: true });
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-80 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
    />
  );
}

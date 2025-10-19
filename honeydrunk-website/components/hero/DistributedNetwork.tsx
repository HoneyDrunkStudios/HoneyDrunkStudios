'use client';

/**
 * DistributedNetwork — Peripheral node constellation with connections
 * Phases: boot → expansion → formation → idle
 * Interactions: hover pulse, diagonal signal sweep, slow parallax
 */

import { useEffect, useImperativeHandle, useRef, forwardRef } from 'react';
import { colors } from '@/lib/tokens';

export interface DistributedNetworkHandle {
  startBoot: () => void;
  enterIdle: () => void;
  triggerHoverPulse: (x: number, y: number) => void;
  reset: () => void;
}

interface DistributedNetworkProps {
  className?: string;
  mouseRef?: React.MutableRefObject<{ x: number; y: number }>;
  enableParallax?: boolean;
  reduceMotion?: boolean;
}

type NodeColor = 'blue' | 'violet' | 'gold' | 'pink';

interface NetNode {
  x: number; // base pos
  y: number;
  depth: number; // 0..1, used for parallax
  size: number; // px radius
  color: NodeColor;
  activeTime: number; // ms when it becomes active during boot
  intensity: number; // 0..1
  target: number; // 0..1
  vx: number; // px/sec
  vy: number; // px/sec
}

interface Connection {
  a: number; // node index
  b: number; // node index
  visibleTime: number; // ms when it appears
}

export default forwardRef<DistributedNetworkHandle, DistributedNetworkProps>(function DistributedNetwork(
  { className = '', mouseRef, enableParallax = false, reduceMotion = false },
  ref
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const nodesRef = useRef<NetNode[]>([]);
  const connsRef = useRef<Connection[]>([]);
  const startTimeRef = useRef<number>(0);
  const phaseRef = useRef<'idle' | 'boot'>('idle');
  const sweepRef = useRef<{ start: number; duration: number; angle: number } | null>(null);
  const hoverPulsesRef = useRef<Array<{ start: number; duration: number; x: number; y: number }>>([]);
  const sweepTimerRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(Date.now());

  useImperativeHandle(ref, () => ({
    startBoot: () => {
      phaseRef.current = 'boot';
      startTimeRef.current = Date.now();
      initScene();
      // Cancel sweeps until idle
      if (sweepTimerRef.current) {
        window.clearInterval(sweepTimerRef.current);
        sweepTimerRef.current = null;
      }
    },
    enterIdle: () => {
      phaseRef.current = 'idle';
      // Diagonal signal sweep every ~10s (skip if reduced motion)
      if (!reduceMotion && !sweepTimerRef.current) {
        sweepTimerRef.current = window.setInterval(() => {
          sweepRef.current = {
            start: Date.now(),
            duration: 1200,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45° with small variance
          };
        }, 10000 + Math.floor(Math.random() * 2000));
      }
    },
    triggerHoverPulse: (x: number, y: number) => {
      hoverPulsesRef.current.push({ start: Date.now(), duration: 700, x, y });
    },
    reset: () => {
      nodesRef.current = [];
      connsRef.current = [];
      phaseRef.current = 'idle';
      sweepRef.current = null;
      if (sweepTimerRef.current) {
        window.clearInterval(sweepTimerRef.current);
        sweepTimerRef.current = null;
      }
    },
  }));

  // Initialize node field and connections
  const initScene = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.width;
    const h = canvas.height;

  const isMobile = w < 768;
  const nodeCount = isMobile ? 12 : 18;
  // Slightly larger so the border ring reads like NodeGlyph at small scale
  const sizes = isMobile ? [5, 7, 9] : [6, 8, 10, 12];

  const nodes: NetNode[] = [];
  const centerX = w / 2;
  const centerY = h / 2;
  const margin = 48;
  const safeRadius = Math.min(w, h) * 0.2; // keep center clear for copy
  const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY) - margin; // reach to corners

    const palette: NodeColor[] = ['blue', 'violet', 'gold', 'pink'];

    // Distribute nodes across entire screen with bands and occasional edge anchoring
    let attempts = 0;
    while (nodes.length < nodeCount && attempts < nodeCount * 50) {
      attempts++;

      // Choose a placement mode to diversify distribution
      const mode = Math.random();
      let x = 0;
      let y = 0;

      if (mode < 0.65) {
        // Radial band sampling (biased to outer radii)
        const angle = Math.random() * Math.PI * 2;
        const t = 0.55 + 0.45 * Math.random(); // 55%..100% of outer band
        const radius = safeRadius + t * (maxRadius - safeRadius);
        x = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 60;
        y = centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 60;
      } else {
        // Edge-biased rectangular sampling (near screen edges/corners)
        const edge = Math.random();
        const inset = margin;
        if (edge < 0.25) {
          // top edge band
          x = inset + Math.random() * (w - inset * 2);
          y = inset + Math.random() * 60;
        } else if (edge < 0.5) {
          // bottom edge band
          x = inset + Math.random() * (w - inset * 2);
          y = h - inset - Math.random() * 60;
        } else if (edge < 0.75) {
          // left edge band
          x = inset + Math.random() * 60;
          y = inset + Math.random() * (h - inset * 2);
        } else {
          // right edge band
          x = w - inset - Math.random() * 60;
          y = inset + Math.random() * (h - inset * 2);
        }
      }

      // Keep outside center safe zone and within margins
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < safeRadius) continue;
      if (x < margin || x > w - margin || y < margin || y > h - margin) continue;

      const depth = Math.random();
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const color = palette[Math.floor(Math.random() * palette.length)];

      const activeTime = 200 + Math.random() * 1200; // 0.2–1.4s after boot
      // Slow drift velocity (px/sec), scaled by depth for parallax harmony
      const speed = 6 + Math.random() * 14; // 6–20 px/sec
      const ang = Math.random() * Math.PI * 2;
      const vx = Math.cos(ang) * speed * (0.6 + depth * 0.8);
      const vy = Math.sin(ang) * speed * (0.6 + depth * 0.8);

      nodes.push({ x, y, depth, size, color, activeTime, intensity: 0, target: 0, vx, vy });
    }

    // Add ~5 extra Electric Blue nodes (explicit) to ensure presence
    const extraBlue = 5;
    let extraTries = 0; let addedBlue = 0;
    while (addedBlue < extraBlue && extraTries < 200) {
      extraTries++;
      // Reuse placement strategies (radial band preferred)
      const placeMode = Math.random();
      let x = 0, y = 0;
      if (placeMode < 0.7) {
        const angle = Math.random() * Math.PI * 2;
        const t = 0.6 + 0.4 * Math.random();
        const radius = safeRadius + t * (maxRadius - safeRadius);
        x = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 40;
        y = centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 40;
      } else {
        const inset = margin;
        const edge = Math.random();
        if (edge < 0.25) { x = inset + Math.random() * (w - inset * 2); y = inset + Math.random() * 60; }
        else if (edge < 0.5) { x = inset + Math.random() * (w - inset * 2); y = h - inset - Math.random() * 60; }
        else if (edge < 0.75) { x = inset + Math.random() * 60; y = inset + Math.random() * (h - inset * 2); }
        else { x = w - inset - Math.random() * 60; y = inset + Math.random() * (h - inset * 2); }
      }
      // keep constraints
      const dx = x - centerX; const dy = y - centerY; const dist = Math.hypot(dx, dy);
      if (dist < safeRadius) continue;
      if (x < margin || x > w - margin || y < margin || y > h - margin) continue;

      const depth = Math.random();
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const activeTime = 200 + Math.random() * 1200;
      const speed = 6 + Math.random() * 14;
      const ang = Math.random() * Math.PI * 2;
      const vx = Math.cos(ang) * speed * (0.6 + depth * 0.8);
      const vy = Math.sin(ang) * speed * (0.6 + depth * 0.8);
      nodes.push({ x, y, depth, size, color: 'blue', activeTime, intensity: 0, target: 0, vx, vy });
      addedBlue++;
    }

    // Ensure connectivity: build a spanning tree (Prim-like) then add a few extra edges
    const conns: Connection[] = [];
    if (nodes.length > 1) {
      const connected = new Set<number>();
      const remaining = new Set<number>(nodes.map((_, i) => i));
      // start with the farthest-from-center to spread
      let startIdx = 0;
      let maxDist = -1;
      for (let i = 0; i < nodes.length; i++) {
        const dx = nodes[i].x - centerX;
        const dy = nodes[i].y - centerY;
        const d = dx * dx + dy * dy;
        if (d > maxDist) { maxDist = d; startIdx = i; }
      }
      connected.add(startIdx);
      remaining.delete(startIdx);

      while (remaining.size > 0) {
        let bestA = -1;
        let bestB = -1;
        let bestDist = Infinity;
        for (const a of connected) {
          for (const b of remaining) {
            const dx = nodes[a].x - nodes[b].x;
            const dy = nodes[a].y - nodes[b].y;
            const d = dx * dx + dy * dy;
            if (d < bestDist) {
              bestDist = d; bestA = a; bestB = b;
            }
          }
        }
        if (bestA !== -1 && bestB !== -1) {
          const visibleTime = 1500 + Math.random() * 1500; // 1.5–3.0s
          conns.push({ a: bestA, b: bestB, visibleTime });
          connected.add(bestB);
          remaining.delete(bestB);
        } else {
          // Fallback: connect any remaining to previous
          const b = remaining.values().next().value as number;
          const a = Array.from(connected)[0];
          conns.push({ a, b, visibleTime: 2000 });
          connected.add(b);
          remaining.delete(b);
        }
      }
      // Add a few extra random edges for interest
      const extra = Math.min(4, Math.floor(nodes.length / 3));
      const setKey = (a: number, b: number) => (a < b ? `${a}-${b}` : `${b}-${a}`);
      const existing = new Set(conns.map(c => setKey(c.a, c.b)));
      let tries = 0; let added = 0;
      while (added < extra && tries < 50) {
        tries++;
        const a = Math.floor(Math.random() * nodes.length);
  const b = Math.floor(Math.random() * nodes.length);
  if (a === b) continue;
  const key = setKey(a, b);
        if (existing.has(key)) continue;
        existing.add(key);
        conns.push({ a, b, visibleTime: 1800 + Math.random() * 1200 });
        added++;
      }
    }

    nodesRef.current = nodes;
    connsRef.current = conns;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initScene();
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Background faint noise overlay (very subtle)
      ctx.fillStyle = 'rgba(0,0,0,0.0)';
      ctx.fillRect(0, 0, w, h);

      const now = Date.now();
      const t = now - startTimeRef.current;
      const isBoot = phaseRef.current === 'boot';

      // Parallax offset by depth
      const parallaxX = enableParallax && mouseRef ? mouseRef.current.x * 20 : 0;
      const parallaxY = enableParallax && mouseRef ? mouseRef.current.y * 10 : 0;

      // Move nodes slowly across the screen (disabled in reduced motion)
      const last = lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;
      const dtSec = Math.min(0.05, Math.max(0, (now - last) / 1000)); // clamp to avoid jumps
      if (!reduceMotion) {
        const w = canvas.width; const h = canvas.height; const margin = 48;
        const cx = w / 2; const cy = h / 2;
        const safeRadius = Math.min(w, h) * 0.2;
        nodesRef.current.forEach((n) => {
          // Integrate position
          n.x += n.vx * dtSec;
          n.y += n.vy * dtSec;

          // Gentle noise drift: nudge velocity a bit
          const jitter = 0.2 * dtSec; // px/sec^2 approx
          n.vx += (Math.random() - 0.5) * jitter;
          n.vy += (Math.random() - 0.5) * jitter;

          // Keep speed within bounds
          const spd = Math.hypot(n.vx, n.vy);
          const minSpd = 4; const maxSpd = 24;
          if (spd < minSpd) { const f = (minSpd + 0.1) / (spd + 1e-5); n.vx *= f; n.vy *= f; }
          if (spd > maxSpd) { const f = maxSpd / spd; n.vx *= f; n.vy *= f; }

          // Edge bounce
          if (n.x < margin) { n.x = margin; n.vx = Math.abs(n.vx); }
          if (n.x > w - margin) { n.x = w - margin; n.vx = -Math.abs(n.vx); }
          if (n.y < margin) { n.y = margin; n.vy = Math.abs(n.vy); }
          if (n.y > h - margin) { n.y = h - margin; n.vy = -Math.abs(n.vy); }

          // Keep center clear: push outward if entering safe zone
          const dx = n.x - cx; const dy = n.y - cy; const d = Math.hypot(dx, dy);
          if (d < safeRadius) {
            const nx = dx / (d || 1); const ny = dy / (d || 1);
            n.vx += nx * 8 * dtSec; n.vy += ny * 8 * dtSec;
            n.x = cx + nx * (safeRadius + 4);
            n.y = cy + ny * (safeRadius + 4);
          }
        });
      }

      // Update node intensities (boot flicker → formation → idle breathing)
      nodesRef.current.forEach((n) => {
        let target = 0.0;
        if (reduceMotion) {
          target = 0.6; // static glow
        } else if (isBoot) {
          // Boot: nodes activate after their activeTime; quick ramp to ~0.6
          target = t > n.activeTime ? 0.6 : 0.0;
        } else {
          // Idle: asynchronous slow pulses (8–12s)
          const cycle = 8000 + (n.depth * 4000); // 8–12s range
          const phase = ((now + n.depth * 1000) % cycle) / cycle; // 0..1
          target = 0.45 + Math.sin(phase * Math.PI * 2) * 0.15; // 0.3–0.6
        }

        // Hover pulses add on top
        for (const p of hoverPulsesRef.current) {
          const progress = (now - p.start) / p.duration;
          if (progress < 1) {
            const dx = (n.x - p.x);
            const dy = (n.y - p.y);
            const dist = Math.sqrt(dx * dx + dy * dy);
            const boost = Math.max(0, 1 - dist / 300) * (1 - progress);
            target = Math.max(target, 0.6 + boost * 0.6);
          }
        }

        // Smooth intensity approach
        n.target = target;
        n.intensity += (n.target - n.intensity) * 0.08;
      });

      // Clear expired hover pulses
      hoverPulsesRef.current = hoverPulsesRef.current.filter((p) => now - p.start < p.duration);

      // Draw connections
      connsRef.current.forEach((c) => {
        // Only visible after their reveal time or always in reduced motion
        if (reduceMotion || t > c.visibleTime) {
          const a = nodesRef.current[c.a];
          const b = nodesRef.current[c.b];
          if (!a || !b) return;

          const ax = a.x + parallaxX * a.depth;
          const ay = a.y + parallaxY * a.depth;
          const bx = b.x + parallaxX * b.depth;
          const by = b.y + parallaxY * b.depth;

          // Base connection glow (blue/violet mix)
          const grad = ctx.createLinearGradient(ax, ay, bx, by);
          grad.addColorStop(0, `${colors.electricBlue}40`);
          grad.addColorStop(1, `${colors.violetFlux}40`);

          ctx.lineWidth = 1;
          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();

          // Pink pulse traveling when nodes sync (during expansion or on sweeps/hover)
          if (!reduceMotion) {
            // During expansion window (1.5–3.5s) add occasional pulse
            if (isBoot && t > 1500 && t < 3500 && Math.random() > 0.98) {
              drawPulse(ctx, ax, ay, bx, by, (now % 800) / 800);
            }
            // Diagonal sweep enhances all connections along band
            if (sweepRef.current) {
              const s = sweepRef.current;
              const prog = (now - s.start) / s.duration;
              if (prog >= 0 && prog <= 1) {
                // Distance of midpoint to sweep line
                const mx = (ax + bx) / 2;
                const my = (ay + by) / 2;
                const dist = pointToDiag(mx, my, s.angle, w, h);
                if (Math.abs(dist) < 80) {
                  drawPulse(ctx, ax, ay, bx, by, prog);
                }
              }
            }
          }
        }
      });

      // Draw nodes on top (respecting depth)
      const sorted = [...nodesRef.current].sort((n1, n2) => n1.depth - n2.depth);
      for (const n of sorted) {
        const x = n.x + parallaxX * n.depth;
        const y = n.y + parallaxY * n.depth;
        const inten = n.intensity;
        if (inten <= 0.01) continue;

        // Match NodeGlyph style: outer glow + core with border + subtle inner fill
        const { r, g, b } = nodeColorToRgb(n.color);
        const glowBlur = 10 + n.size * 2 + n.depth * 8;
        const glowAlpha = 0.25 + inten * 0.35; // stronger when pulsing

        // Outer glow
        ctx.save();
        ctx.shadowBlur = glowBlur;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${glowAlpha})`;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.18 + inten * 0.2})`;
        ctx.beginPath();
        ctx.arc(x, y, n.size * (1.6 + inten * 0.2), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Core circle with colored border
        const baseRadius = n.size * (1 + inten * 0.1);
        ctx.beginPath();
        ctx.arc(x, y, baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.12)`; // like color20 in css
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.9})`;
        ctx.lineWidth = Math.max(1, Math.min(3, 0.6 + baseRadius * 0.2));
        ctx.fill();
        ctx.stroke();

        // Inner energy disc
        ctx.beginPath();
        ctx.arc(x, y, Math.max(1, baseRadius * 0.6), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.25 + inten * 0.3})`;
        ctx.fill();
      }

      // End sweep when completed
      if (sweepRef.current && now - sweepRef.current.start > sweepRef.current.duration) {
        sweepRef.current = null;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const drawPulse = (
      ctx: CanvasRenderingContext2D,
      ax: number,
      ay: number,
      bx: number,
      by: number,
      t: number
    ) => {
      const x = ax + (bx - ax) * t;
      const y = ay + (by - ay) * t;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, 60);
      grad.addColorStop(0, `${colors.neonPink}AA`);
      grad.addColorStop(1, `${colors.neonPink}00`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, 60, 0, Math.PI * 2);
      ctx.fill();
    };

    const pointToDiag = (x: number, y: number, angle: number, w: number, h: number) => {
      // Signed distance to a diagonal line crossing canvas center at angle
      const cx = w / 2;
      const cy = h / 2;
      const nx = Math.cos(angle + Math.PI / 2);
      const ny = Math.sin(angle + Math.PI / 2);
      return (x - cx) * nx + (y - cy) * ny;
    };

    const nodeColorToRgb = (c: NodeColor) => {
      switch (c) {
        case 'blue': return hexToRgb(colors.electricBlue);
        case 'violet': return hexToRgb(colors.violetFlux);
        case 'gold': return hexToRgb(colors.aurumGold);
        case 'pink': return hexToRgb(colors.neonPink);
      }
    };

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (sweepTimerRef.current) window.clearInterval(sweepTimerRef.current);
    };
  }, [enableParallax, mouseRef, reduceMotion]);

  return (
    <canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none ${className}`} style={{ zIndex: 2 }} />
  );
});

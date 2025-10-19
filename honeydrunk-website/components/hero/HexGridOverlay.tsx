'use client';

/**
 * HexGridOverlay — Full-screen shader-based hex grid
 * Supports animated pulse sweep with blue→gold color transition
 */

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { colors } from '@/lib/tokens';

export interface HexGridOverlayHandle {
  startBoot: (config: { durationMs: number; axis?: 'x' | 'y' }) => void;
  enterIdle: (opts?: { heartbeat?: boolean }) => void;
  triggerRipple: (x: number, y: number) => void;
  setIntensity: (value: number) => void;
  reset: () => void;
}

interface HexGridOverlayProps {
  className?: string;
  mouseRef?: React.MutableRefObject<{ x: number; y: number }>;
  enableParallax?: boolean;
}

const HexGridOverlay = forwardRef<HexGridOverlayHandle, HexGridOverlayProps>(
  function HexGridOverlay({ className = '', mouseRef, enableParallax = false }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const pulseProgressRef = useRef<number>(0);
    const isBootingRef = useRef<boolean>(false);
    const isIdleRef = useRef<boolean>(false);
    const bootAxisRef = useRef<'x' | 'y'>('x');
    const startTimeRef = useRef<number>(0);
    const durationRef = useRef<number>(2000);
    const intensityRef = useRef<number>(0); // Boot intensity for power-up cells
  const ripplesRef = useRef<Array<{ x: number; y: number; startTime: number; duration: number }>>([]);
  const idleHeartbeatTimerRef = useRef<number | null>(null);

    // Expose control methods via ref
    useImperativeHandle(ref, () => ({
      startBoot: ({ durationMs, axis = 'x' }) => {
        isBootingRef.current = true;
        isIdleRef.current = false;
        bootAxisRef.current = axis;
        durationRef.current = durationMs;
        startTimeRef.current = Date.now();
        pulseProgressRef.current = 0;
        intensityRef.current = 0;
        // Stop idle heartbeat while booting
        if (idleHeartbeatTimerRef.current) {
          window.clearInterval(idleHeartbeatTimerRef.current);
          idleHeartbeatTimerRef.current = null;
        }
      },
      enterIdle: (opts?: { heartbeat?: boolean }) => {
        isIdleRef.current = true;
        isBootingRef.current = false;
        intensityRef.current = 1; // Full intensity in idle
        // Start low-frequency heartbeat ripples from center every ~9s
        const shouldHeartbeat = opts?.heartbeat !== false;
        if (shouldHeartbeat && !idleHeartbeatTimerRef.current) {
          idleHeartbeatTimerRef.current = window.setInterval(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            ripplesRef.current.push({
              x: canvas.width / 2,
              y: canvas.height / 2,
              startTime: Date.now(),
              duration: 1400,
            });
          }, 9000 + Math.floor(Math.random() * 1000)); // 9–10s slight variance
        }
      },
      triggerRipple: (x: number, y: number) => {
        ripplesRef.current.push({
          x,
          y,
          startTime: Date.now(),
          duration: 1000, // 1 second ripple
        });
      },
      setIntensity: (value: number) => {
        intensityRef.current = Math.max(0, Math.min(1, value));
      },
      reset: () => {
        isBootingRef.current = false;
        isIdleRef.current = false;
        pulseProgressRef.current = 0;
        startTimeRef.current = 0;
        intensityRef.current = 0;
        ripplesRef.current = [];
        if (idleHeartbeatTimerRef.current) {
          window.clearInterval(idleHeartbeatTimerRef.current);
          idleHeartbeatTimerRef.current = null;
        }
      },
    }));

    // Hex grid shader rendering
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      resize();
      window.addEventListener('resize', resize);

      // Hex grid parameters
  const hexSize = 30; // Size of each hexagon (keeps density lighter than typical 24)
      const hexHeight = hexSize * 2;
      const hexWidth = Math.sqrt(3) * hexSize;
      const vertDist = hexHeight * 3 / 4;
      const horizDist = hexWidth;

      const drawHexGrid = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Intensity is maintained for future use (e.g., theme ramps), but not needed for grid drawing right now

        // Parallax offset
        let offsetY = 0;
        if (enableParallax && mouseRef && isIdleRef.current) {
          offsetY = mouseRef.current.y * 10; // ±10px vertical movement
        }

        ctx.save();
        ctx.translate(0, offsetY);

        // Calculate grid bounds
        const cols = Math.ceil(canvas.width / horizDist) + 2;
        const rows = Math.ceil(canvas.height / vertDist) + 2;

        // Center of screen for distance calculations
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Idle breathing effect - grid supports, never leads (now slightly brighter)
        let baseOpacity = 0.05; // increased baseline visibility
        if (isIdleRef.current) {
          const breathe = Math.sin(Date.now() * 0.001) * 0.5 + 0.5;
          baseOpacity = 0.035 + breathe * 0.03; // 0.035–0.065
        }

        // Shimmer effect during boot (every third line lights briefly)
        const shimmerTime = Date.now() * 0.003;
        const isBooting = isBootingRef.current;

        for (let row = -1; row < rows; row++) {
          for (let col = -1; col < cols; col++) {
            const x = col * horizDist + ((row % 2) * (horizDist / 2));
            const y = row * vertDist;

            // Calculate distance from center (for fade out + power-up cluster)
            const dx = x - centerX;
            const dy = y - centerY;
            const distFromCenter = Math.sqrt(dx * dx + dy * dy);
            const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
            
            // Fade out toward edges (0 at edges, 1 at center)
            const edgeFade = 1 - Math.min(distFromCenter / maxDist, 1);
            
            // Calculate shimmer
            // Visibility scales with boot/idle intensity
            const vis = 0.9 + intensityRef.current * 0.9; // 0.9–1.8
            // Ensure edges still visible while focusing center (edgeFade 0..1)
            let opacity = baseOpacity * vis * (0.3 + 0.7 * edgeFade);
            // 10% brighter overall
            opacity *= 1.1;
            if (isBooting && (row + col) % 3 === 0) {
              const shimmer = Math.sin(shimmerTime + (row + col) * 0.2) * 0.5 + 0.5;
              opacity = opacity + shimmer * 0.1;
            }

            // Center-safe zone: reduce line opacity behind headline to avoid busy middle
            const safeRadius = 220;
            if (distFromCenter < safeRadius) {
              const factor = Math.max(0.35, distFromCenter / safeRadius); // slightly less aggressive fade at center
              opacity *= factor;
            }

            // Electric blue grid lines (soft glow), no gold fills
            ctx.strokeStyle = colors.electricBlue + Math.floor(opacity * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = 2.0; // +1 thicker
            drawHexagon(ctx, x, y, hexSize, { strokeOnly: true });
          }
        }

        // If booting, draw pulse sweep
        if (isBootingRef.current && pulseProgressRef.current < 1) {
          const elapsed = Date.now() - startTimeRef.current;
          const progress = Math.min(elapsed / durationRef.current, 1);
          pulseProgressRef.current = progress;

          // Determine pulse position based on axis
          const pulsePosition = bootAxisRef.current === 'x'
            ? progress * canvas.width
            : progress * canvas.height;

          // Color transition: blue → aurumGold (electric yellow)
          const pulseColorStart = blendColors(
            colors.electricBlue,
            colors.aurumGold,
            progress * 0.5
          );
          const pulseColorEnd = blendColors(
            colors.electricBlue,
            colors.aurumGold,
            progress
          );

          // Draw pulse gradient
          const gradient = bootAxisRef.current === 'x'
            ? ctx.createLinearGradient(
                pulsePosition - 200, 0,
                pulsePosition + 200, 0
              )
            : ctx.createLinearGradient(
                0, pulsePosition - 200,
                0, pulsePosition + 200
              );

          gradient.addColorStop(0, 'transparent');
          gradient.addColorStop(0.3, pulseColorStart + '40');
          gradient.addColorStop(0.5, pulseColorEnd + '80');
          gradient.addColorStop(0.7, pulseColorStart + '40');
          gradient.addColorStop(1, 'transparent');

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;

          // Redraw grid in pulse zone with enhanced visibility
          for (let row = -1; row < rows; row++) {
            for (let col = -1; col < cols; col++) {
              const x = col * horizDist + ((row % 2) * (horizDist / 2));
              const y = row * vertDist;

              // Check if hex is in pulse zone
              const distFromPulse = bootAxisRef.current === 'x'
                ? Math.abs(x - pulsePosition)
                : Math.abs(y - pulsePosition);

              if (distFromPulse < 200) {
                drawHexagon(ctx, x, y, hexSize, { strokeOnly: true });
              }
            }
          }

          // Check if complete
          if (progress >= 1) {
            isBootingRef.current = false;
          }
        }

  // Draw ripples (hover pulses + idle heartbeat)
        const now = Date.now();
        ripplesRef.current = ripplesRef.current.filter(ripple => {
          const elapsed = now - ripple.startTime;
          if (elapsed > ripple.duration) return false; // Remove expired ripples

          const progress = elapsed / ripple.duration;
          const radius = progress * 320; // Ripple expands slightly larger
          const opacity = (1 - progress) * 0.55; // Fade out

          // Draw ripple gradient
          const gradient = ctx.createRadialGradient(
            ripple.x, ripple.y, 0,
            ripple.x, ripple.y, radius
          );

          gradient.addColorStop(0, 'transparent');
          gradient.addColorStop(Math.max(0, progress - 0.1), colors.aurumGold + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
          gradient.addColorStop(progress, colors.aurumGold + Math.floor(opacity * 0.5 * 255).toString(16).padStart(2, '0'));
          gradient.addColorStop(1, 'transparent');

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;

          // Redraw grid in ripple zone
          for (let row = -1; row < rows; row++) {
            for (let col = -1; col < cols; col++) {
              const x = col * horizDist + ((row % 2) * (horizDist / 2));
              const y = row * vertDist;

              const dist = Math.sqrt((x - ripple.x) ** 2 + (y - ripple.y) ** 2);
              if (Math.abs(dist - radius) < 50) {
                drawHexagon(ctx, x, y, hexSize, { strokeOnly: true });
              }
            }
          }

          return true; // Keep ripple
        });

        // Subtle edge vignette to focus attention toward center
  const vignetteInner = Math.min(canvas.width, canvas.height) * 0.45;
  const vignetteOuter = Math.max(canvas.width, canvas.height) * 0.85;
        const vignette = ctx.createRadialGradient(
          centerX, centerY, vignetteInner,
          centerX, centerY, vignetteOuter
        );
        vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.3)');

        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        ctx.restore(); // Restore after parallax transform
      };

      const animate = () => {
        drawHexGrid();
        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('resize', resize);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [enableParallax, mouseRef]); // Animation loop manages state via refs

    return (
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none ${className}`}
        style={{ zIndex: 1 }}
      />
    );
  }
);

// Helper: Draw a hexagon
function drawHexagon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  options: { strokeOnly?: boolean } = {}
) {
  const { strokeOnly = false } = options;

  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const hx = x + size * Math.cos(angle);
    const hy = y + size * Math.sin(angle);
    if (i === 0) {
      ctx.moveTo(hx, hy);
    } else {
      ctx.lineTo(hx, hy);
    }
  }
  ctx.closePath();

  if (strokeOnly) {
    ctx.stroke();
  } else {
    ctx.fill();
  }
}

// Helper: Blend two hex colors
function blendColors(color1: string, color2: string, ratio: number): string {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);

  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * ratio);
  const g = Math.round(g1 + (g2 - g1) * ratio);
  const b = Math.round(b1 + (b2 - b1) * ratio);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export default HexGridOverlay;

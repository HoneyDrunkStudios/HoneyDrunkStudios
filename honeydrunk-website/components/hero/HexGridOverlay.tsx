'use client';

/**
 * HexGridOverlay — Full-screen shader-based hex grid
 * Supports animated pulse sweep with blue→gold color transition
 */

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { colors } from '@/lib/tokens';

export interface HexGridOverlayHandle {
  startBoot: (config: { durationMs: number; axis?: 'x' | 'y' }) => void;
  enterIdle: () => void;
  triggerRipple: (x: number, y: number) => void;
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
    const ripplesRef = useRef<Array<{ x: number; y: number; startTime: number; duration: number }>>([]);

    // Expose control methods via ref
    useImperativeHandle(ref, () => ({
      startBoot: ({ durationMs, axis = 'x' }) => {
        isBootingRef.current = true;
        isIdleRef.current = false;
        bootAxisRef.current = axis;
        durationRef.current = durationMs;
        startTimeRef.current = Date.now();
        pulseProgressRef.current = 0;
      },
      enterIdle: () => {
        isIdleRef.current = true;
        isBootingRef.current = false;
      },
      triggerRipple: (x: number, y: number) => {
        ripplesRef.current.push({
          x,
          y,
          startTime: Date.now(),
          duration: 1000, // 1 second ripple
        });
      },
      reset: () => {
        isBootingRef.current = false;
        isIdleRef.current = false;
        pulseProgressRef.current = 0;
        startTimeRef.current = 0;
        ripplesRef.current = [];
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
      const hexSize = 30; // Size of each hexagon
      const hexHeight = hexSize * 2;
      const hexWidth = Math.sqrt(3) * hexSize;
      const vertDist = hexHeight * 3 / 4;
      const horizDist = hexWidth;

      const drawHexGrid = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

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

        // Idle breathing effect
        let baseOpacity = 0.08;
        if (isIdleRef.current) {
          const breathe = Math.sin(Date.now() * 0.001) * 0.5 + 0.5; // 0 to 1
          baseOpacity = 0.04 + breathe * 0.06; // Darken slightly: breathe between 0.04 and 0.10
        }

        // Shimmer effect during boot (every third line lights briefly)
        const shimmerTime = Date.now() * 0.003;
        const isBooting = isBootingRef.current;

        for (let row = -1; row < rows; row++) {
          for (let col = -1; col < cols; col++) {
            const x = col * horizDist + ((row % 2) * (horizDist / 2));
            const y = row * vertDist;

            // Calculate shimmer for this hex
            let opacity = baseOpacity;
            if (isBooting && (row + col) % 3 === 0) {
              const shimmer = Math.sin(shimmerTime + (row + col) * 0.2) * 0.5 + 0.5;
              opacity = baseOpacity + shimmer * 0.12; // Add shimmer flash
            }

            // Background grid with breathing/shimmer opacity
            ctx.strokeStyle = colors.aurumGold + Math.floor(opacity * 255).toString(16).padStart(2, '0');
            ctx.lineWidth = 1;

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

          // Color transition: blue → gold
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

        // Draw ripples
        const now = Date.now();
        ripplesRef.current = ripplesRef.current.filter(ripple => {
          const elapsed = now - ripple.startTime;
          if (elapsed > ripple.duration) return false; // Remove expired ripples

          const progress = elapsed / ripple.duration;
          const radius = progress * 300; // Ripple expands to 300px
          const opacity = (1 - progress) * 0.6; // Fade out

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
    }, []); // Empty deps - animation loop manages its own state via refs

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

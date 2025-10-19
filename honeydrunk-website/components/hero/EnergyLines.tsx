'use client';

/**
 * EnergyLines — Dynamic vertical/diagonal energy beams
 * Power conduits that flicker during boot and respond to CTA hovers
 */

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { colors } from '@/lib/tokens';

export interface EnergyLinesHandle {
  setBootIntensity: (intensity: number) => void;
  triggerHoverPulse: (x: number, y: number) => void;
}

interface EnergyLinesProps {
  className?: string;
  mouseRef?: React.MutableRefObject<{ x: number; y: number }>;
  enableParallax?: boolean;
}

interface Line {
  x: number;
  y: number;
  angle: number;
  length: number;
  width: number;
  phase: number;
  baseIntensity: number;
}

const EnergyLines = forwardRef<EnergyLinesHandle, EnergyLinesProps>(
  function EnergyLines({ className = '', mouseRef, enableParallax = false }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const intensityRef = useRef<number>(0);
    const linesRef = useRef<Line[]>([]);
    const hoverPulsesRef = useRef<Array<{ x: number; y: number; startTime: number; duration: number }>>([]);

    useImperativeHandle(ref, () => ({
      setBootIntensity: (intensity: number) => {
        intensityRef.current = Math.max(0, Math.min(1, intensity));
      },
      triggerHoverPulse: (x: number, y: number) => {
        hoverPulsesRef.current.push({
          x,
          y,
          startTime: Date.now(),
          duration: 800,
        });
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeLines();
      };

      // Initialize energy lines
      const initializeLines = () => {
        const lines: Line[] = [];
        const lineCount = Math.floor(window.innerWidth / 150); // ~1 line per 150px

        for (let i = 0; i < lineCount; i++) {
          const isVertical = Math.random() > 0.3; // 70% vertical, 30% diagonal
          lines.push({
            x: (i / lineCount) * canvas.width + Math.random() * 100 - 50,
            y: isVertical ? 0 : Math.random() * canvas.height,
            angle: isVertical ? 90 : 60 + Math.random() * 60, // 60-120 degrees
            length: isVertical ? canvas.height : canvas.height * 0.6,
            width: 1 + Math.random(),
            phase: Math.random() * Math.PI * 2,
            baseIntensity: 0.2 + Math.random() * 0.3,
          });
        }

        linesRef.current = lines;
      };

      resize();
      window.addEventListener('resize', resize);

      // Parse colors
      const blueColor = hexToRgb(colors.electricBlue);
      const goldColor = hexToRgb(colors.aurumGold);

      const drawLines = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Parallax offset (1/3 speed of grid for depth)
        let offsetY = 0;
        if (enableParallax && mouseRef) {
          offsetY = mouseRef.current.y * 3.33; // 1/3 of grid speed
        }

        ctx.save();
        ctx.translate(0, offsetY);

        const intensity = intensityRef.current;
        const time = Date.now() * 0.001;

        // Color transition
        const t = Math.min(intensity * 1.2, 1);
        const r = Math.round(blueColor.r + (goldColor.r - blueColor.r) * t);
        const g = Math.round(blueColor.g + (goldColor.g - blueColor.g) * t);
        const b = Math.round(blueColor.b + (goldColor.b - blueColor.b) * t);

        // Draw each line
        linesRef.current.forEach((line) => {
          // Heartbeat flicker
          const flicker = 0.7 + Math.sin(time * 2 + line.phase) * 0.3;
          let lineIntensity = line.baseIntensity * intensity * flicker;

          // Check hover pulses
          const now = Date.now();
          hoverPulsesRef.current = hoverPulsesRef.current.filter(pulse => {
            const elapsed = now - pulse.startTime;
            if (elapsed > pulse.duration) return false;

            // Calculate distance from line to pulse center
            const dx = line.x - pulse.x;
            const dy = line.y - pulse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Brighten if within range
            if (dist < 300) {
              const progress = elapsed / pulse.duration;
              const boost = (1 - progress) * (1 - dist / 300) * 0.8;
              lineIntensity += boost;
            }

            return true;
          });

          lineIntensity = Math.min(lineIntensity, 1);

          if (lineIntensity < 0.01) return;

          // Draw line
          ctx.save();
          ctx.translate(line.x, line.y);
          ctx.rotate((line.angle * Math.PI) / 180);

          const gradient = ctx.createLinearGradient(0, 0, 0, line.length);
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${lineIntensity * 0.3})`);
          gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${lineIntensity * 0.6})`);
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = line.width;
          ctx.lineCap = 'round';

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, line.length);
          ctx.stroke();

          ctx.restore();
        });

        ctx.restore(); // Restore after parallax transform
      };

      const animate = () => {
        drawLines();
        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('resize', resize);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none ${className}`}
        style={{ zIndex: 3 }}
      />
    );
  }
);

// Helper: Convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export default EnergyLines;

'use client';

/**
 * HiveCore — Floating energy core with rotating rings and hex fragments
 * Symbolic depth scene representing the HoneyDrunk system
 */

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { colors } from '@/lib/tokens';

export interface HiveCoreHandle {
  setBootIntensity: (intensity: number) => void;
  enterIdle: () => void;
}

interface HiveCoreProps {
  className?: string;
  mouseRef?: React.MutableRefObject<{ x: number; y: number }>;
  enableParallax?: boolean;
  reduceMotion?: boolean;
}

interface Ring {
  radius: number;
  width: number;
  speed: number;
  offset: number;
  opacity: number;
}

interface HexFragment {
  x: number;
  y: number;
  size: number;
  angle: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
  opacity: number;
}

const HiveCore = forwardRef<HiveCoreHandle, HiveCoreProps>(
  function HiveCore({ className = '', mouseRef, enableParallax = false, reduceMotion = false }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const intensityRef = useRef<number>(0);
    const isIdleRef = useRef<boolean>(false);
    const ringsRef = useRef<Ring[]>([]);
    const hexFragmentsRef = useRef<HexFragment[]>([]);

    useImperativeHandle(ref, () => ({
      setBootIntensity: (intensity: number) => {
        intensityRef.current = Math.max(0, Math.min(1, intensity));
      },
      enterIdle: () => {
        isIdleRef.current = true;
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
        initializeElements();
      };

      // Initialize rotating rings
      const initializeElements = () => {
        // Energy rings (3-4 concentric rings)
        ringsRef.current = [
          { radius: 120, width: 2, speed: 0.3, offset: 0, opacity: 0.4 },
          { radius: 180, width: 1.5, speed: -0.2, offset: Math.PI / 3, opacity: 0.3 },
          { radius: 250, width: 2.5, speed: 0.15, offset: Math.PI / 2, opacity: 0.35 },
          { radius: 320, width: 1, speed: -0.1, offset: Math.PI, opacity: 0.25 },
        ];

        // Hex fragments orbiting the core (8-12 fragments)
        const fragmentCount = 10;
        hexFragmentsRef.current = [];
        for (let i = 0; i < fragmentCount; i++) {
          hexFragmentsRef.current.push({
            x: 0,
            y: 0,
            size: 15 + Math.random() * 20,
            angle: (i / fragmentCount) * Math.PI * 2,
            orbitRadius: 150 + Math.random() * 150,
            orbitSpeed: 0.1 + Math.random() * 0.2,
            orbitOffset: Math.random() * Math.PI * 2,
            opacity: 0.2 + Math.random() * 0.3,
          });
        }
      };

      resize();
      window.addEventListener('resize', resize);

      // Parse colors
  const blueColor = hexToRgb(colors.electricBlue);
  const goldColor = hexToRgb(colors.aurumGold);

      // Draw hexagon helper
      const drawHexagon = (x: number, y: number, size: number, filled: boolean = false) => {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const hx = x + size * Math.cos(angle);
          const hy = y + size * Math.sin(angle);
          if (i === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        if (filled) ctx.fill();
        else ctx.stroke();
      };

      const drawHiveCore = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const intensity = intensityRef.current;
        if (intensity === 0) return;

  const time = reduceMotion ? 0 : Date.now() * 0.001;

  // Color transition: blue → gold
  const t = Math.min(intensity * 1.2, 1);
  const r = Math.round(blueColor.r + (goldColor.r - blueColor.r) * t);
  const g = Math.round(blueColor.g + (goldColor.g - blueColor.g) * t);
  const b = Math.round(blueColor.b + (goldColor.b - blueColor.b) * t);

        // Center point (with subtle parallax)
        let centerX = canvas.width / 2;
        let centerY = canvas.height / 2;

        if (enableParallax && mouseRef && isIdleRef.current) {
          centerX += mouseRef.current.x * 15;
          centerY += mouseRef.current.y * 15;
        }

        // Breathing effect in idle
        let breathe = 1;
        if (isIdleRef.current && !reduceMotion) {
          breathe = 0.9 + Math.sin(time * 0.6) * 0.1;
        }

        // === Core Energy Sphere ===
        const coreRadius = 42 * intensity * breathe;
        const coreGradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, coreRadius
        );
        coreGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.8 * intensity})`);
        coreGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${0.4 * intensity})`);
        coreGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, coreRadius * 2, 0, Math.PI * 2);
        ctx.fill();

        // === Lens streak (horizontal) for cinematic depth ===
        if (intensity > 0.3) {
          const streakGradient = ctx.createLinearGradient(centerX - 300, centerY, centerX + 300, centerY);
          streakGradient.addColorStop(0, 'transparent');
          streakGradient.addColorStop(0.48, `rgba(${r}, ${g}, ${b}, ${0.06 * intensity})`);
          streakGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${0.12 * intensity})`);
          streakGradient.addColorStop(0.52, `rgba(${r}, ${g}, ${b}, ${0.06 * intensity})`);
          streakGradient.addColorStop(1, 'transparent');
          ctx.fillStyle = streakGradient;
          ctx.fillRect(centerX - 300, centerY - 2, 600, 4);
        }

        // === Rotating Energy Rings ===
        ringsRef.current.forEach((ring) => {
          const rotationAngle = time * ring.speed + ring.offset;
          const ringOpacity = ring.opacity * intensity * breathe;

          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(rotationAngle);

          // Draw partial ring (not complete circle - broken segments)
          const segments = 6;
          const gapSize = 0.3;
          for (let i = 0; i < segments; i++) {
            const startAngle = (i / segments) * Math.PI * 2;
            const endAngle = startAngle + (Math.PI * 2 / segments) - gapSize;

            ctx.beginPath();
            ctx.arc(0, 0, ring.radius * intensity, startAngle, endAngle);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${ringOpacity})`;
            ctx.lineWidth = ring.width;
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${ringOpacity * 0.5})`;
            ctx.stroke();
          }

          ctx.restore();
        });

        // === Orbiting Hex Fragments ===
        hexFragmentsRef.current.forEach((frag) => {
          const orbitAngle = time * frag.orbitSpeed + frag.orbitOffset;
          const fragX = centerX + Math.cos(orbitAngle) * frag.orbitRadius * intensity;
          const fragY = centerY + Math.sin(orbitAngle) * frag.orbitRadius * intensity;

          ctx.save();
          ctx.translate(fragX, fragY);
          ctx.rotate(orbitAngle + time * 0.5);

          const fragOpacity = frag.opacity * intensity * breathe;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${fragOpacity})`;
          ctx.lineWidth = 1.5;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${fragOpacity * 0.6})`;

          drawHexagon(0, 0, frag.size);

          ctx.restore();
        });

        // === Volumetric Light Beams (subtle fog) ===
        if (intensity > 0.5 && !reduceMotion) {
          const beamCount = 4;
          for (let i = 0; i < beamCount; i++) {
            const beamAngle = (i / beamCount) * Math.PI * 2 + time * 0.1;
            const beamLength = 400 * intensity;

            const beamGradient = ctx.createLinearGradient(
              centerX,
              centerY,
              centerX + Math.cos(beamAngle) * beamLength,
              centerY + Math.sin(beamAngle) * beamLength
            );
            beamGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.08 * intensity})`);
            beamGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${0.03 * intensity})`);
            beamGradient.addColorStop(1, 'transparent');

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(beamAngle);

            ctx.fillStyle = beamGradient;
            ctx.fillRect(0, -30, beamLength, 60);

            ctx.restore();
          }
        }

        // === Ambient Particle Field (gold dust / data motes) ===
  if (isIdleRef.current && !reduceMotion && Math.random() > 0.985) {
          const particleAngle = Math.random() * Math.PI * 2;
          const particleDistance = 80 + Math.random() * 180;
          const px = centerX + Math.cos(particleAngle) * particleDistance;
          const py = centerY + Math.sin(particleAngle) * particleDistance;

          // Use gold for particles
          const goldColor = hexToRgb(colors.aurumGold);
          ctx.fillStyle = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, 0.7)`;
          ctx.shadowBlur = 12;
          ctx.shadowColor = `rgba(${goldColor.r}, ${goldColor.g}, ${goldColor.b}, 0.9)`;
          ctx.beginPath();
          ctx.arc(px, py, 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Vignette handled in HexGridOverlay to centralize composition
      };

      const animate = () => {
        drawHiveCore();
        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('resize', resize);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
  }, [mouseRef, enableParallax, reduceMotion]);

    return (
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none ${className}`}
        style={{ zIndex: 1 }}
      />
    );
  }
);

// Helper: Convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

export default HiveCore;

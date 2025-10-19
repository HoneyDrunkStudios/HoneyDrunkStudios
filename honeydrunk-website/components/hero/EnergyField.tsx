'use client';

/**
 * EnergyField — Radial gradient energy core
 * Expands and shifts color during boot sequence
 */

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { colors } from '@/lib/tokens';

export interface EnergyFieldHandle {
  setBootIntensity: (intensity: number) => void;
  enterIdle: () => void;
}

interface EnergyFieldProps {
  className?: string;
}

const EnergyField = forwardRef<EnergyFieldHandle, EnergyFieldProps>(
  function EnergyField({ className = '' }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number | undefined>(undefined);
    const intensityRef = useRef<number>(0);
    const isIdleRef = useRef<boolean>(false);

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
      };

      resize();
      window.addEventListener('resize', resize);

      // Parse colors
      const blueColor = hexToRgb(colors.electricBlue);
      const goldColor = hexToRgb(colors.aurumGold);

      const drawEnergyField = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const intensity = intensityRef.current;
        if (intensity === 0 && !isIdleRef.current) return; // Don't draw at start

        // Breathing effect in idle
        let breathe = 1;
        if (isIdleRef.current) {
          breathe = 0.85 + Math.sin(Date.now() * 0.001) * 0.15; // Pulsate between 0.85 and 1
        }

        // Color transition: blue → gold
        const t = Math.min(intensity * 1.2, 1); // Speed up transition slightly
        const r = Math.round(blueColor.r + (goldColor.r - blueColor.r) * t);
        const g = Math.round(blueColor.g + (goldColor.g - blueColor.g) * t);
        const b = Math.round(blueColor.b + (goldColor.b - blueColor.b) * t);

        // Center of screen
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Radial gradient size (grows with intensity)
        const maxRadius = Math.max(canvas.width, canvas.height) * 0.6;
        const currentRadius = maxRadius * intensity * breathe;

        // Create radial gradient
        const gradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, currentRadius
        );

        // Core glow (bright center)
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.3 * intensity * breathe})`);
        gradient.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, ${0.15 * intensity * breathe})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${0.05 * intensity * breathe})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add vignette (darkens edges, brightest at center)
        const vignetteGradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, Math.max(canvas.width, canvas.height) * 0.7
        );
        vignetteGradient.addColorStop(0, 'transparent');
        vignetteGradient.addColorStop(0.5, 'rgba(10, 14, 18, 0.3)'); // Deep space color
        vignetteGradient.addColorStop(1, 'rgba(10, 14, 18, 0.7)');

        ctx.fillStyle = vignetteGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add subtle grain/noise effect
        if (intensity > 0.3) {
          ctx.globalAlpha = 0.02 * intensity;
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const noise = (Math.random() - 0.5) * 20;
            data[i] += noise;     // R
            data[i + 1] += noise; // G
            data[i + 2] += noise; // B
          }
          ctx.putImageData(imageData, 0, 0);
          ctx.globalAlpha = 1;
        }
      };

      const animate = () => {
        drawEnergyField();
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
        style={{ zIndex: 2 }}
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

export default EnergyField;

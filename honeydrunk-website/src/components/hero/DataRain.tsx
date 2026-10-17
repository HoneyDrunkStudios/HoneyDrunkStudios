'use client';

/**
 * DataRain — Matrix-style particle rain effect
 * Bits and data streaming down the screen in cyberpunk colors
 */

import { useEffect, useRef, useState } from 'react';
import { colors } from '@/lib/tokens';

interface RainDrop {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
  color: string;
  chars: string[]; // Array of characters for the trail
}

interface DataRainProps {
  density?: number;
  className?: string;
}

export default function DataRain({
  density = 50,
  className = '',
}: DataRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<RainDrop[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Encoded data symbols - hex, binary, and cryptic characters
  const dataChars = '0123456789ABCDEF<>[]{}()+-*/=|\\^~`!@#$%&?:.;';

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize rain drops
    const initRainDrops = () => {
      const drops: RainDrop[] = [];
      const actualDensity = prefersReducedMotion ? Math.floor(density * 0.3) : density;
      const columnWidth = 20;
      const columns = Math.floor(window.innerWidth / columnWidth);

      for (let i = 0; i < actualDensity; i++) {
        const trailLength = Math.random() * 15 + 10;
        // Generate random characters for each position in the trail
        const chars = Array.from({ length: Math.ceil(trailLength) }, () =>
          dataChars[Math.floor(Math.random() * dataChars.length)]
        );

        drops.push({
          x: Math.floor(Math.random() * columns) * columnWidth,
          y: Math.random() * -500, // Start above viewport
          speed: Math.random() * 1.5 + 1, // Slowed down from 3+2 to 1.5+1
          length: trailLength,
          opacity: Math.random() * 0.4 + 0.5, // Increased opacity for visibility
          color: colors.neonPink,
          chars: chars,
        });
      }
      dropsRef.current = drops;
    };

    // Set canvas size and reinitialize drops
    let resizeTimeout: NodeJS.Timeout;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Debounce drop reinitialization
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initRainDrops();
      }, 250);
    };

    resizeCanvas();
    initRainDrops();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas (fully transparent for trail effect)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw rain drops
      dropsRef.current.forEach((drop) => {
        if (prefersReducedMotion) {
          // Static mode - just draw without updating
          ctx.save();
          ctx.globalAlpha = drop.opacity * 0.5;
          ctx.fillStyle = drop.color;
          ctx.font = '14px monospace';
          ctx.fillText(drop.chars[0], drop.x, drop.y);
          ctx.restore();
          return;
        }

        // Update position
        drop.y += drop.speed;

        // Reset when drop goes off screen
        if (drop.y > canvas.height + 50) {
          drop.y = Math.random() * -500;
          drop.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
          // Regenerate random characters for the new trail
          drop.chars = Array.from({ length: Math.ceil(drop.length) }, () => 
            dataChars[Math.floor(Math.random() * dataChars.length)]
          );
        }

        // Draw the trail
        for (let i = 0; i < drop.length; i++) {
          const trailY = drop.y - i * 20;
          if (trailY < 0) continue;

          ctx.save();
          const fadeOpacity = drop.opacity * (1 - i / drop.length);
          ctx.globalAlpha = fadeOpacity;
          
          // Brighter head of the trail with stronger glow
          if (i === 0) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = drop.color;
            ctx.fillStyle = drop.color;
          } else if (i < 3) {
            // Medium glow for near-head symbols
            ctx.shadowBlur = 10;
            ctx.shadowColor = drop.color;
            ctx.fillStyle = drop.color;
          } else {
            ctx.fillStyle = drop.color;
          }

          ctx.font = 'bold 16px monospace'; // Larger and bold for better visibility
          // Use the specific character for this position in the trail
          const char = drop.chars[i % drop.chars.length];
          ctx.fillText(char, drop.x, trailY);
          ctx.restore();
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearTimeout(resizeTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [density, prefersReducedMotion, dataChars]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
}

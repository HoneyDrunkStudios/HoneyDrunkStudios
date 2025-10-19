'use client';

/**
 * CursorTrail — Neon cursor trail effect
 * Follows mouse movement with glowing particles
 */

import { useEffect, useRef, useState } from 'react';
import { colors } from '@/lib/tokens';

interface TrailParticle {
  x: number;
  y: number;
  opacity: number;
  size: number;
  color: string;
  symbol: string;
  rotation: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<TrailParticle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const mousePos = useRef({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Cyberpunk symbols to use
    const symbols = [
      '0', '1', // Binary
      '>', '<', '/', '\\', '|', // Brackets and slashes
      '{', '}', '[', ']', // Brackets
      'A', 'B', 'C', 'D', 'E', 'F', // Hex
      '◆', '◇', '▲', '▼', '►', '◄', // Geometric
      '⚡', '※', '§', '¶', // Special
    ];

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Add new particles at mouse position
      if (isActive && particlesRef.current.length < 25) {
        const trailColors = [colors.neonPink, colors.electricBlue, colors.violetFlux, colors.aurumGold];
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          opacity: 0.9,
          size: Math.random() * 8 + 12,
          color: trailColors[Math.floor(Math.random() * trailColors.length)],
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          rotation: Math.random() * Math.PI * 2,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas completely (transparent)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.opacity -= 0.015;
        particle.rotation += 0.02;
        particle.y += 0.5; // Slight downward drift

        if (particle.opacity <= 0) return false;

        // Draw symbol
        ctx.save();
        ctx.globalAlpha = particle.opacity;

        // Move to particle position and rotate
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);

        // Draw glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;

        // Draw the symbol
        ctx.font = `bold ${particle.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = particle.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(particle.symbol, 0, 0);

        ctx.restore();

        return true;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9997]"
      />

      {/* Toggle button */}
      <button
        onClick={() => setIsActive(!isActive)}
        className="fixed bottom-4 right-4 z-[10000] px-3 py-2 rounded-lg text-xs font-mono border backdrop-blur-sm transition-all hover:scale-105"
        style={{
          backgroundColor: `${colors.deepSpace}95`,
          borderColor: isActive ? colors.neonPink : `${colors.slateLight}40`,
          color: isActive ? colors.neonPink : colors.slateLight,
        }}
        title="Toggle cursor trail"
      >
        {isActive ? '✨ ON' : '✨ OFF'}
      </button>
    </>
  );
}

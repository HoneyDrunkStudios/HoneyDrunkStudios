'use client';

/**
 * StaticNeonCity — Volumetric neon towers matching reference aesthetic
 * Solid forms with faces, strong glow, depth through fog
 */

import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface StaticNeonCityProps {
  onDrawComplete?: () => void;
  enablePulse?: boolean;
}

export function StaticNeonCity({
  onDrawComplete,
  enablePulse = true,
}: StaticNeonCityProps) {
  const [isDrawing, setIsDrawing] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setIsDrawing(false);
      onDrawComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setIsDrawing(false);
      onDrawComplete?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [reducedMotion, onDrawComplete]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #000408 0%, #000A14 50%, #001220 100%)',
      }}
    >
      {/* Atmospheric glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(0, 209, 255, 0.15) 0%, rgba(0, 100, 180, 0.08) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* City towers with volume */}
      <svg
        viewBox="0 0 1920 1080"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: isDrawing ? 0 : 1,
          transition: reducedMotion ? 'none' : 'opacity 2s ease-out',
        }}
      >
        <defs>
          {/* Glow filters */}
          <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur1"/>
            <feGaussianBlur in="blur1" stdDeviation="16" result="blur2"/>
            <feMerge>
              <feMergeNode in="blur2"/>
              <feMergeNode in="blur1"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* Gradients for volumetric faces */}
          <linearGradient id="frontFace" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00D1FF" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#0064B4" stopOpacity="0.15"/>
          </linearGradient>

          <linearGradient id="sideFace" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#004080" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#002040" stopOpacity="0.1"/>
          </linearGradient>

          <linearGradient id="topFace" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D1FF" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#0080C0" stopOpacity="0.3"/>
          </linearGradient>

          <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="1"/>
            <stop offset="50%" stopColor="#00D1FF" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#0080C0" stopOpacity="0.3"/>
          </linearGradient>
        </defs>

        <g filter="url(#strongGlow)">
          {/* Back layer towers */}
          <g opacity="0.4">
            <Tower x={1650} y={650} width={70} height={430} />
            <Tower x={1780} y={600} width={60} height={480} />
            <Tower x={1520} y={700} width={80} height={380} />
            <Tower x={180} y={750} width={65} height={330} />
            <Tower x={100} y={720} width={70} height={360} />
          </g>

          {/* Mid layer towers */}
          <g opacity="0.7">
            <Tower x={1350} y={550} width={85} height={530} />
            <Tower x={1180} y={500} width={95} height={580} />
            <Tower x={950} y={450} width={100} height={630} />
            <Tower x={750} y={600} width={120} height={480} />
            <Tower x={550} y={650} width={105} height={430} />
            <Tower x={350} y={550} width={90} height={530} />
          </g>

          {/* Front layer towers */}
          <g opacity="0.95">
            <Tower x={1450} y={320} width={110} height={760} />
            <Tower x={1250} y={250} width={130} height={830} />
            <Tower x={620} y={400} width={115} height={680} />
            <Tower x={420} y={450} width={125} height={630} />
          </g>
        </g>
      </svg>

      {/* Atmospheric bloom */}
      <div
        style={{
          position: 'absolute',
          inset: '-20%',
          background: 'radial-gradient(ellipse at 50% 70%, rgba(0, 180, 255, 0.25) 0%, rgba(0, 100, 180, 0.12) 30%, transparent 60%)',
          filter: 'blur(100px)',
          opacity: isDrawing ? 0 : 0.8,
          transition: 'opacity 2s ease-out 1s',
          zIndex: -1,
        }}
      />

      {/* Floor grid */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: `
            linear-gradient(0deg, transparent 0%, rgba(0, 150, 220, 0.1) 50%, transparent 100%),
            repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(0, 180, 255, 0.2) 60px, rgba(0, 180, 255, 0.2) 61px),
            repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(0, 180, 255, 0.2) 60px, rgba(0, 180, 255, 0.2) 61px)
          `,
          transform: 'perspective(500px) rotateX(70deg)',
          transformOrigin: 'bottom',
          opacity: isDrawing ? 0 : 0.4,
          transition: 'opacity 1.5s ease-out 1.5s',
        }}
      />
    </div>
  );
}

// Tower component with volumetric faces
function Tower({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
  const sideWidth = width * 0.3; // Side face perspective

  return (
    <g>
      {/* Side face (darker, depth) */}
      <polygon
        points={`${x + width},${y + 10} ${x + width + sideWidth},${y} ${x + width + sideWidth},${y + height} ${x + width},${y + height + 10}`}
        fill="url(#sideFace)"
      />

      {/* Front face (main visible face) */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="url(#frontFace)"
      />

      {/* Top face */}
      <polygon
        points={`${x},${y} ${x + sideWidth},${y - 10} ${x + width + sideWidth},${y} ${x + width},${y + 10}`}
        fill="url(#topFace)"
      />

      {/* Edge highlights */}
      <line x1={x} y1={y} x2={x} y2={y + height} stroke="url(#edgeGlow)" strokeWidth="2" opacity="0.8"/>
      <line x1={x + width} y1={y + 10} x2={x + width} y2={y + height + 10} stroke="url(#edgeGlow)" strokeWidth="1.5" opacity="0.6"/>
      <line x1={x} y1={y} x2={x + sideWidth} y2={y - 10} stroke="url(#edgeGlow)" strokeWidth="1.5" opacity="0.7"/>
    </g>
  );
}

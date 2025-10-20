'use client';

/**
 * CyberspaceHero — High-res city image with layered cyberpunk effects
 * 
 * Entry Sequence: Jack-In (1.8-2.5s)
 *   - Micro-zoom: 1.02× → 1.00× ease-out
 *   - Light sweep: horizontal cyan pass with glow halo
 *   - Chromatic tick: 1-2px RGB split during sweep
 *   - Scanline stutter: brief vertical jitter for signal lock
 * 
 * Idle Loop (8-10s seamless):
 *   - Parallax drift: gentle multi-layer motion
 *   - Floating packets: 12-20 elements (45% blue, 45% violet, 10% gold)
 *   - Circuit lines: distant horizontal streaks
 *   - Heartbeat: periodic Aurum pulse (6-8s interval)
 *   - Static scanline texture overlay
 * 
 * Design constraints:
 *   - No layout shift, text remains legible at all times
 *   - Global glow ceiling ≤40%
 *   - Rhythmic, architectural motion (no chaos)
 *   - Full prefers-reduced-motion support
 */

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { colors } from '@/lib/tokens';

interface CyberspaceHeroProps {
  onJackInComplete?: () => void;
  triggerJackIn?: boolean;
}

// Enhanced particle system: 40 floating data packets with varied behaviors
// Distribution: 45% Electric Blue, 45% Violet, 10% Aurum Gold
const generateParticles = () => Array.from({ length: 40 }).map((_, i) => {
  const rand = Math.random();
  const color = rand > 0.9 ? colors.aurumGold : rand > 0.45 ? colors.electricBlue : colors.violetCore;
  
  return {
    id: i,
    x: 2 + (i % 8) * 12 + Math.random() * 10, // More spread across width
    y: 50 + Math.random() * 45, // Wider vertical distribution
    size: 1.5 + Math.random() * 4, // More size variety
    speed: 3.5 + Math.random() * 4, // 3.5-7.5s float time (more variation)
    delay: Math.random() * 12, // Longer stagger window
    color,
    drift: Math.random() * 6 - 3, // Horizontal drift: -3 to +3
  };
});

// Data stream lines: Fast vertical streaks
const generateDataStreams = () => Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  x: 10 + i * 12 + Math.random() * 5,
  height: 20 + Math.random() * 40,
  speed: 1.5 + Math.random() * 1, // 1.5-2.5s duration
  delay: Math.random() * 8,
  color: Math.random() > 0.5 ? colors.electricBlue : colors.violetCore,
}));

// Floating glyphs: Rotating hex symbols
const generateGlyphs = () => Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  x: 15 + i * 15 + Math.random() * 8,
  y: 20 + Math.random() * 60,
  char: ['◊', '◈', '◇', '⬡', '⬢', '⬣'][Math.floor(Math.random() * 6)],
  size: 12 + Math.random() * 8,
  speed: 8 + Math.random() * 4, // Rotation duration
  delay: Math.random() * 10,
  color: [colors.electricBlue, colors.violetCore, colors.aurumGold][Math.floor(Math.random() * 3)],
}));

// Pulsing glow spots: Breathing light sources
const generateGlowSpots = () => Array.from({ length: 5 }).map((_, i) => ({
  id: i,
  x: 20 + i * 20 + Math.random() * 10,
  y: 30 + Math.random() * 40,
  size: 100 + Math.random() * 150,
  speed: 3 + Math.random() * 2, // Pulse duration
  delay: Math.random() * 5,
  color: [colors.electricBlue, colors.violetCore][Math.floor(Math.random() * 2)],
}));

export function CyberspaceHero({ onJackInComplete, triggerJackIn = true }: CyberspaceHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isJackingIn, setIsJackingIn] = useState(false);
  const [showLightSweep, setShowLightSweep] = useState(false);
  const [showHeartbeat, setShowHeartbeat] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [_imagesLoaded, setImagesLoaded] = useState(false); // Track image preloading
  const reducedMotion = useReducedMotion();
  
  // Memoize all particle systems for consistency
  const PARTICLES = useMemo(() => generateParticles(), []);
  const DATA_STREAMS = useMemo(() => generateDataStreams(), []);
  const GLYPHS = useMemo(() => generateGlyphs(), []);
  const GLOW_SPOTS = useMemo(() => generateGlowSpots(), []);

  // Preload images for smooth entry
  useEffect(() => {
    const imageSources = [
      '/hero/city-desktop.webp',
      '/hero/city-tablet.webp', 
      '/hero/city-mobile.webp',
      '/hero/city-desktop-blur.webp',
    ];

    let loadedCount = 0;
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === imageSources.length) {
        setImagesLoaded(true);
      }
    };

    // Preload with Image API (respects browser cache)
    imageSources.forEach(src => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded; // Still mark as "loaded" on error (fallback will show)
      img.src = src;
    });
  }, []);

  // Jack-in sequence orchestration
  useEffect(() => {
    if (!triggerJackIn) return;

    if (reducedMotion) {
      setIsJackingIn(false);
      onJackInComplete?.();
      return;
    }

    // Start jack-in
    setIsJackingIn(true);

    // Timeline:
    // 0ms: Micro-zoom starts
    // 300ms: Light sweep + chromatic tick + scanline stutter begin
    // 550ms: Effects complete
    // 2000ms: Jack-in complete, enter idle

    const sweepTimer = setTimeout(() => {
      setShowLightSweep(true);
      setTimeout(() => setShowLightSweep(false), 250); // 250ms sweep duration
    }, 300);

    const completeTimer = setTimeout(() => {
      setIsJackingIn(false);
      onJackInComplete?.();
    }, 2000);

    return () => {
      clearTimeout(sweepTimer);
      clearTimeout(completeTimer);
    };
  }, [reducedMotion, onJackInComplete, triggerJackIn]);

  // Heartbeat pulse every 6-8s (random interval for organic feel)
  useEffect(() => {
    if (reducedMotion || isJackingIn || isPaused) return;

    const scheduleHeartbeat = () => {
      const interval = 6000 + Math.random() * 2000; // 6-8s random
      return setTimeout(() => {
        setShowHeartbeat(true);
        setTimeout(() => setShowHeartbeat(false), 200); // 200ms pulse duration
        scheduleHeartbeat(); // Recursive scheduling
      }, interval);
    };

    const timer = scheduleHeartbeat();
    return () => clearTimeout(timer);
  }, [reducedMotion, isJackingIn, isPaused]);

  // Pause animations when tab is hidden (performance)
  useEffect(() => {
    const handleVisibility = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <div
      ref={containerRef}
      className="cyberspace-hero"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        backgroundColor: colors.deepSpace,
      }}
    >
      {/* Layer 0: Background gradient with subtle noise */}
      <div
        className="background-gradient"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 70%, ${colors.deepSpace} 0%, #040406 100%)`,
          backgroundBlendMode: 'multiply',
          zIndex: 0,
        }}
      />

      {/* Layer 1: Bloom ghost (blurred city for glow effect) */}
      <img
        src="/hero/city-desktop-blur.webp"
        alt=""
        className="bloom-ghost"
        style={{
          position: 'absolute',
          inset: '-5%',
          width: '110%',
          height: '110%',
          objectFit: 'cover',
          objectPosition: 'center',
          filter: 'blur(50px) brightness(1.4) saturate(1.3)',
          opacity: 0.35,
          zIndex: 1,
        }}
      />

      {/* Layer 2: Main city image with animations */}
      <img
        src="/hero/city-desktop.webp"
        alt="Neon cyberspace city"
        className="city-image"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          animation: reducedMotion 
            ? 'none' 
            : isJackingIn 
              ? 'jackInZoom 2s cubic-bezier(0.4, 0.0, 0.2, 1) forwards' 
              : isPaused 
                ? 'none' 
                : 'idleDrift 9s ease-in-out infinite',
          willChange: isJackingIn || !isPaused ? 'transform' : 'auto',
          zIndex: 2,
        }}
      />

      {/* Layer 3: Chromatic aberration (jack-in only) */}
      {isJackingIn && !reducedMotion && (
        <img
          src="/hero/city-desktop.webp"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.5,
            mixBlendMode: 'color-dodge',
            animation: 'chromaticTick 250ms cubic-bezier(0.4, 0.0, 0.2, 1) 300ms forwards',
            filter: 'hue-rotate(10deg)',
            zIndex: 3,
          }}
        />
      )}

      {/* Layer 4: Circuit lines (horizontal scrolling stripes) */}
      {!reducedMotion && !isPaused && (
        <div
          className="circuit-lines"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 100px,
              rgba(0, 209, 255, 0.04) 100px,
              rgba(0, 209, 255, 0.04) 101px
            )`,
            animation: isJackingIn ? 'none' : 'circuitScroll 40s linear infinite',
            opacity: isJackingIn ? 0 : 1,
            transition: 'opacity 1.5s ease-in 2s',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Layer 5a: Pulsing glow spots (breathing light sources) */}
      {!reducedMotion && !isPaused && GLOW_SPOTS.map((spot) => (
        <div
          key={`glow-${spot.id}`}
          className="glow-spot"
          style={{
            position: 'absolute',
            left: `${spot.x}%`,
            top: `${spot.y}%`,
            width: `${spot.size}px`,
            height: `${spot.size}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${spot.color}40 0%, ${spot.color}15 40%, transparent 70%)`,
            opacity: isJackingIn ? 0 : 0.3,
            animation: `glowPulse ${spot.speed}s ease-in-out ${spot.delay}s infinite`,
            filter: 'blur(30px)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Layer 5b: Data stream lines (vertical streaks) */}
      {!reducedMotion && !isPaused && DATA_STREAMS.map((stream) => (
        <div
          key={`stream-${stream.id}`}
          className="data-stream"
          style={{
            position: 'absolute',
            left: `${stream.x}%`,
            top: '-20%',
            width: '2px',
            height: `${stream.height}%`,
            background: `linear-gradient(180deg, transparent 0%, ${stream.color} 50%, transparent 100%)`,
            boxShadow: `0 0 8px ${stream.color}`,
            opacity: isJackingIn ? 0 : 0.6,
            animation: `streamFall ${stream.speed}s linear ${stream.delay}s infinite`,
            filter: 'blur(1px)',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Layer 5c: Floating data packets (enhanced) */}
      {!reducedMotion && !isPaused && PARTICLES.map((particle) => (
        <div
          key={`packet-${particle.id}`}
          className="data-packet"
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            bottom: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}99, inset 0 0 ${particle.size}px ${particle.color}33`,
            opacity: isJackingIn ? 0 : 0.7,
            animation: `packetFloatDrift ${particle.speed}s ease-in-out ${particle.delay}s infinite`,
            borderRadius: '1px',
            willChange: 'transform, opacity',
            zIndex: 4,
            pointerEvents: 'none',
            transform: `translateX(${particle.drift}px)`,
          }}
        />
      ))}

      {/* Layer 5d: Floating glyphs (hex symbols) */}
      {!reducedMotion && !isPaused && GLYPHS.map((glyph) => (
        <div
          key={`glyph-${glyph.id}`}
          className="floating-glyph"
          style={{
            position: 'absolute',
            left: `${glyph.x}%`,
            top: `${glyph.y}%`,
            fontSize: `${glyph.size}px`,
            color: glyph.color,
            fontFamily: 'monospace',
            fontWeight: 'bold',
            textShadow: `0 0 ${glyph.size}px ${glyph.color}80`,
            opacity: isJackingIn ? 0 : 0.4,
            animation: `glyphFloat ${glyph.speed}s ease-in-out ${glyph.delay}s infinite`,
            zIndex: 4,
            pointerEvents: 'none',
          }}
        >
          {glyph.char}
        </div>
      ))}

      {/* Layer 5e: Ambient scan beams (diagonal sweeps) */}
      {!reducedMotion && !isPaused && (
        <>
          <div
            className="scan-beam-1"
            style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '2px',
              background: `linear-gradient(90deg, transparent 0%, ${colors.electricBlue}20 45%, ${colors.electricBlue}60 50%, ${colors.electricBlue}20 55%, transparent 100%)`,
              transform: 'rotate(-45deg)',
              transformOrigin: 'center',
              opacity: isJackingIn ? 0 : 0.25,
              animation: 'beamSweep1 15s ease-in-out infinite',
              filter: 'blur(2px)',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          />
          <div
            className="scan-beam-2"
            style={{
              position: 'absolute',
              top: '150%',
              right: '-50%',
              width: '200%',
              height: '1px',
              background: `linear-gradient(90deg, transparent 0%, ${colors.violetCore}30 45%, ${colors.violetCore}70 50%, ${colors.violetCore}30 55%, transparent 100%)`,
              transform: 'rotate(35deg)',
              transformOrigin: 'center',
              opacity: isJackingIn ? 0 : 0.2,
              animation: 'beamSweep2 18s ease-in-out 5s infinite',
              filter: 'blur(1px)',
              zIndex: 3,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Layer 6: Light sweep (jack-in sequence) */}
      {showLightSweep && (
        <div
          className="light-sweep"
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(0, 209, 255, 0.15) 30%,
              rgba(0, 255, 255, 0.35) 50%, 
              rgba(0, 209, 255, 0.15) 70%, 
              transparent 100%)`,
            animation: 'lightSweep 250ms cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
            filter: 'blur(30px)',
            zIndex: 5,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Layer 7: Heartbeat pulse (Aurum gold scan) */}
      {showHeartbeat && (
        <div
          className="heartbeat-pulse"
          style={{
            position: 'absolute',
            top: '48%',
            left: '-100%',
            width: '100%',
            height: '2px',
            background: `linear-gradient(90deg, 
              transparent 0%, 
              ${colors.aurumGold}33 10%,
              ${colors.aurumGold} 50%, 
              ${colors.aurumGold}33 90%, 
              transparent 100%)`,
            boxShadow: `0 0 20px ${colors.aurumGold}, 0 0 40px ${colors.aurumGold}66`,
            animation: 'heartbeatSweep 200ms cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Layer 8: Scanline stutter (jack-in only) */}
      {isJackingIn && !reducedMotion && (
        <div
          className="scanline-stutter"
          style={{
            position: 'absolute',
            inset: 0,
            background: `rgba(0, 209, 255, 0.06)`,
            animation: 'scanlineStutter 120ms cubic-bezier(0.4, 0.0, 0.2, 1) 350ms forwards',
            zIndex: 6,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Layer 9: Static scanline texture overlay */}
      <div
        className="scanline-texture"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 209, 255, 0.025) 2px,
            rgba(0, 209, 255, 0.025) 3px
          )`,
          opacity: 0.4,
          zIndex: 6,
          pointerEvents: 'none',
        }}
      />

      {/* Layer 10: Vignette for depth */}
      <div
        className="vignette"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 45%, transparent 25%, rgba(0, 0, 0, 0.4) 85%, rgba(0, 0, 0, 0.7) 100%)',
          zIndex: 7,
          pointerEvents: 'none',
        }}
      />

      {/* Pause/Resume control */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        aria-label={isPaused ? 'Resume animations' : 'Pause animations'}
        className="motion-control"
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: `2px solid ${colors.electricBlue}`,
          backgroundColor: 'rgba(10, 10, 15, 0.85)',
          color: colors.electricBlue,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontFamily: 'var(--font-mono)',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)',
          zIndex: 20,
          boxShadow: `0 0 12px ${colors.electricBlue}40`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = `${colors.electricBlue}20`;
          e.currentTarget.style.boxShadow = `0 0 24px ${colors.electricBlue}80`;
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(10, 10, 15, 0.85)';
          e.currentTarget.style.boxShadow = `0 0 12px ${colors.electricBlue}40`;
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {isPaused ? '▶' : '⏸'}
      </button>

      {/* Inline CSS Animations */}
      <style jsx>{`
        /* Jack-in micro-zoom: 1.02× → 1.00× */
        @keyframes jackInZoom {
          0% {
            transform: scale(1.02);
          }
          100% {
            transform: scale(1.0);
          }
        }

        /* Idle drift: gentle 4px multi-directional sway (9s loop) */
        @keyframes idleDrift {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(4px, -2px);
          }
          50% {
            transform: translate(-4px, 3px);
          }
          75% {
            transform: translate(3px, 2px);
          }
        }

        /* Light sweep: horizontal pass with brightness boost */
        @keyframes lightSweep {
          0% {
            left: -100%;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        /* Chromatic tick: 2px RGB split during sweep */
        @keyframes chromaticTick {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.5;
          }
          50% {
            transform: translate(2px, -1px);
            opacity: 0.7;
          }
        }

        /* Data packet float with drift: rise, drift, and fade (3.5-7.5s per particle) */
        @keyframes packetFloatDrift {
          0% {
            transform: translateY(0) translateX(0) scale(1) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          50% {
            transform: translateY(-35vh) translateX(10px) scale(0.9) rotate(180deg);
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-70vh) translateX(-5px) scale(0.5) rotate(360deg);
            opacity: 0;
          }
        }

        /* Data stream fall: Fast vertical descent */
        @keyframes streamFall {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(120vh);
            opacity: 0;
          }
        }

        /* Glyph float: Rotate and drift */
        @keyframes glyphFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-20px) rotate(90deg) scale(1.1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10px) rotate(180deg) scale(0.95);
            opacity: 0.5;
          }
          75% {
            transform: translateY(-25px) rotate(270deg) scale(1.05);
            opacity: 0.55;
          }
        }

        /* Glow pulse: Breathing light effect */
        @keyframes glowPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.5;
          }
        }

        /* Scan beam sweeps: Diagonal ambient scans */
        @keyframes beamSweep1 {
          0%, 100% {
            transform: rotate(-45deg) translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.25;
          }
          50% {
            transform: rotate(-45deg) translateY(150vh);
            opacity: 0.25;
          }
          60% {
            opacity: 0;
          }
        }

        @keyframes beamSweep2 {
          0%, 100% {
            transform: rotate(35deg) translateY(0);
            opacity: 0;
          }
          15% {
            opacity: 0.2;
          }
          55% {
            transform: rotate(35deg) translateY(-150vh);
            opacity: 0.2;
          }
          70% {
            opacity: 0;
          }
        }

        /* Circuit lines: vertical scroll (40s loop) */
        @keyframes circuitScroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100px);
          }
        }

        /* Heartbeat sweep: Aurum gold horizontal scan */
        @keyframes heartbeatSweep {
          0% {
            left: -100%;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }

        /* Scanline stutter: brief vertical jitter for signal lock */
        @keyframes scanlineStutter {
          0%, 100% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            transform: translateY(2px);
            opacity: 0.06;
          }
        }

        /* Reduced motion: disable all animations */
        @media (prefers-reduced-motion: reduce) {
          .city-image,
          .data-packet,
          .data-stream,
          .floating-glyph,
          .glow-spot,
          .scan-beam-1,
          .scan-beam-2,
          .light-sweep,
          .heartbeat-pulse,
          .scanline-stutter,
          .circuit-lines,
          .bloom-ghost {
            animation: none !important;
            transition: none !important;
          }
        }

        /* Mobile: hide/reduce complex particles for performance */
        @media (max-width: 768px) {
          .data-packet {
            opacity: 0.5;
          }
          .data-packet:nth-child(n+21) {
            display: none; /* Show only first 20 on mobile */
          }
          .data-stream {
            display: none;
          }
          .floating-glyph {
            display: none;
          }
          .glow-spot {
            opacity: 0.2;
          }
          .scan-beam-1,
          .scan-beam-2 {
            display: none;
          }
          .circuit-lines {
            opacity: 0.3;
          }
        }

        /* Tablet: reduce particle density */
        @media (min-width: 769px) and (max-width: 1024px) {
          .data-packet:nth-child(n+31) {
            display: none; /* Show only first 30 on tablet */
          }
          .glow-spot {
            opacity: 0.25;
          }
        }

        /* High-res displays: enhance glow effects */
        @media (min-resolution: 2dppx) {
          .bloom-ghost {
            filter: blur(60px) brightness(1.5) saturate(1.4);
          }
          .glow-spot {
            filter: blur(35px);
          }
        }
      `}</style>
    </div>
  );
}

'use client';

/**
 * EntryGate — Minimal "JACK IN" gate with localStorage persistence
 * Supports reset via footer link
 */

import { useState } from 'react';
import { colors } from '@/lib/tokens';
import NeonGridCanvas from '../NeonGridCanvas';

const STORAGE_KEY = 'hd.jacked_in';

interface EntryGateProps {
  onComplete: () => void;
}

export default function EntryGate({ onComplete }: EntryGateProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleJackIn = () => {
    console.log('[Analytics] jack_in_clicked');
    setIsTransitioning(true);

    // Persist flag
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, 'true');
    }

    // Transition to hero after fade
    setTimeout(
      () => {
        onComplete();
      },
      prefersReducedMotion ? 150 : 400
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleJackIn();
    }
  };

  if (isTransitioning) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center transition-opacity"
        style={{
          backgroundColor: colors.deepSpace,
          opacity: 0,
          animation: `fadeToBlack ${prefersReducedMotion ? '150ms' : '400ms'} ease-out forwards`,
        }}
      />
    );
  }

  return (
    <>
      {/* Background grid */}
      <NeonGridCanvas particleCount={80} enableMotion={!prefersReducedMotion} />

      {/* Gate content */}
      <div className="fixed inset-0 z-40 flex items-center justify-center">
        <button
          onClick={handleJackIn}
          onKeyDown={handleKeyPress}
          className="group relative px-12 py-5 font-mono font-bold text-lg md:text-xl uppercase tracking-wider cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            backgroundColor: `${colors.neonPink}20`,
            borderWidth: '2px',
            borderColor: colors.neonPink,
            color: colors.offWhite,
            boxShadow: `0 0 40px ${colors.neonPink}70, inset 0 0 15px ${colors.neonPink}20`,
            clipPath:
              'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
            animation: prefersReducedMotion ? 'none' : 'gatePulse 2s ease-in-out infinite',
          }}
        >
          {/* Animated glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10 blur-xl"
            style={{
              backgroundColor: colors.neonPink,
            }}
          />

          <span className="relative z-10">JACK IN</span>

          {/* Pulse ring */}
          {!prefersReducedMotion && (
            <div
              className="absolute inset-0 animate-ping opacity-20"
              style={{
                borderWidth: '2px',
                borderColor: colors.neonPink,
                clipPath:
                  'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              }}
            />
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeToBlack {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes gatePulse {
          0%,
          100% {
            box-shadow: 0 0 40px ${colors.neonPink}70,
              inset 0 0 15px ${colors.neonPink}20;
          }
          50% {
            box-shadow: 0 0 60px ${colors.neonPink}90,
              inset 0 0 20px ${colors.neonPink}30;
          }
        }
      `}</style>
    </>
  );
}

// Export helper to check if user has jacked in
export function hasJackedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY) === 'true';
}

// Export helper to reset intro (for footer link)
export function resetIntro(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}

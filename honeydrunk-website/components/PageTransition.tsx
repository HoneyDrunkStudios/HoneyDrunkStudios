'use client';

/**
 * PageTransition — Glitch effect during page navigation
 */

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { colors } from '@/lib/tokens';

export default function PageTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isTransitioning) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{
        animation: 'fadeOut 400ms ease-out forwards',
      }}
    >
      {/* Glitch overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${colors.deepSpace} 50%, transparent 100%)`,
          animation: 'glitch 200ms steps(2, end) 2',
        }}
      />

      {/* Data stream lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px"
            style={{
              top: `${20 * i + 10}%`,
              left: 0,
              right: 0,
              backgroundColor: colors.electricBlue,
              opacity: 0.5,
              animation: `slideRight ${200 + i * 50}ms ease-out forwards`,
            }}
          />
        ))}
      </div>

      {/* Hexadecimal data stream */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-mono text-xs opacity-30 whitespace-pre"
        style={{
          color: colors.neonPink,
          animation: 'fadeOut 300ms ease-out forwards',
        }}
      >
        {`> LOADING_SECTOR...
> 0x${Math.random().toString(16).substring(2, 10).toUpperCase()}
> INITIALIZING_NODES...
> SYNC_COMPLETE`}
      </div>

      <style jsx>{`
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes slideRight {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

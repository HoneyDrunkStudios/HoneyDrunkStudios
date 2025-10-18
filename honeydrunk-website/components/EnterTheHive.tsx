'use client';

/**
 * EnterTheHive — Cinematic gate sequence
 * Boot animation that reveals The Grid
 */

import { useState, useEffect } from 'react';
import { colors } from '@/lib/tokens';

interface EnterTheHiveProps {
  onComplete: () => void;
}

const BOOT_MESSAGES = [
  '> INITIALIZING HIVE_PROTOCOL.SYS',
  '> MOUNTING NODE_REGISTRY... [OK]',
  '> ESTABLISHING NEURAL_MESH... [OK]',
  '> SYNCING SIGNAL_MATRIX... [OK]',
  '> LOADING GRID_INTERFACE.EXE',
  '> SYSTEM READY. JACK IN.',
];

export default function EnterTheHive({ onComplete }: EnterTheHiveProps) {
  const [isBooting, setIsBooting] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isBooting) return;

    // Progress animation
    const progressInterval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 24);

    // Message rotation
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => {
        if (prev >= BOOT_MESSAGES.length - 1) {
          clearInterval(messageInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [isBooting]);

  useEffect(() => {
    if (bootProgress >= 100) {
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 600);
      }, 300);
    }
  }, [bootProgress, onComplete]);

  const handleEnter = () => {
    setIsBooting(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleEnter();
    }
  };

  if (isComplete) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center
                   bg-deep-space transition-opacity duration-600"
        style={{
          opacity: 0,
          animation: 'fadeOut 600ms ease-out forwards',
        }}
      />
    );
  }

  if (isBooting) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center
                   bg-deep-space"
      >
        <div className="max-w-2xl w-full px-8">
          {/* Boot messages */}
          <div className="mb-8 space-y-2 font-mono text-sm">
            {BOOT_MESSAGES.map((message, index) => (
              <div
                key={message}
                className="transition-opacity duration-200"
                style={{
                  opacity: index <= currentMessage ? 1 : 0.3,
                  color: index === currentMessage ? colors.neonPink : (index < currentMessage ? colors.electricBlue : colors.slateLight),
                  textShadow: index === currentMessage ? `0 0 10px ${colors.neonPink}80` : 'none',
                }}
              >
                {message}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="relative h-3 bg-gunmetal overflow-hidden"
            style={{
              clipPath: 'polygon(3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%, 0 3px)',
            }}
          >
            <div
              className="absolute inset-y-0 left-0 transition-all duration-100"
              style={{
                width: `${bootProgress}%`,
                background: `linear-gradient(90deg, ${colors.neonPink} 0%, ${colors.violetFlux} 50%, ${colors.electricBlue} 100%)`,
                boxShadow: `0 0 30px ${colors.neonPink}`,
              }}
            />
          </div>

          {/* Progress percentage */}
          <div
            className="mt-4 text-center font-mono text-xl font-bold tracking-wider"
            style={{
              color: colors.neonPink,
              textShadow: `0 0 20px ${colors.neonPink}`,
            }}
          >
            {bootProgress}%
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center"
      style={{
        backgroundImage: 'url(/thelab.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: `${colors.deepSpace}70`,
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-8 w-full min-h-screen">
        {/* Tagline */}
        <div className="text-center w-full flex flex-col items-center justify-center flex-1 gap-2">
          <h1
            className="text-6xl md:text-8xl font-display font-bold tracking-tight uppercase mb-2"
            style={{
              background: `linear-gradient(135deg, ${colors.neonPink} 0%, ${colors.violetFlux} 50%, ${colors.electricBlue} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(255, 42, 109, 0.5))',
            }}
          >
            HoneyDrunk
          </h1>
          <div
            className="text-xl md:text-2xl font-mono font-bold tracking-widest uppercase mb-8"
            style={{
              color: colors.aurumGold,
              textShadow: `0 0 20px ${colors.aurumGold}80`,
            }}
          >
            [INIT_HIVE_PROTOCOL]
          </div>
          
        <button
          onClick={handleEnter}
          onKeyDown={handleKeyPress}
          className="group relative px-10 py-4 font-mono font-bold text-base md:text-lg uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            backgroundColor: `${colors.neonPink}20`,
            borderWidth: '2px',
            borderColor: colors.neonPink,
            color: colors.offWhite,
            boxShadow: `0 0 40px ${colors.neonPink}70, inset 0 0 15px ${colors.neonPink}20`,
            clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
          }}
        >
        {/* Animated glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100
                     transition-opacity duration-200 -z-10 blur-xl"
          style={{
            backgroundColor: colors.neonPink,
          }}
        />

        <span className="relative z-10">&gt;&gt; JACK IN</span>

        {/* Pulse ring */}
        <div
          className="absolute inset-0 animate-ping opacity-20"
          style={{
            borderWidth: '2px',
            borderColor: colors.neonPink,
            clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
          }}
        />
        </button>
        </div>

        {/* Footer line */}
        <div
          className="absolute bottom-8 left-0 right-0 text-center font-mono text-xs md:text-sm tracking-widest uppercase px-6 py-4"
          style={{ color: colors.electricBlue, textShadow: `0 0 10px ${colors.electricBlue}80` }}
        >
          [ SYS.STATUS: ONLINE ] • [ NODES: SYNCHRONIZED ] • [ READY_STATE: TRUE ]
        </div>
      </div>
    </div>
  );
}

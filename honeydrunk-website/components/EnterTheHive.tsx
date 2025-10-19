'use client';

/**
 * EnterTheHive — Cinematic gate sequence
 * Boot animation that reveals The Grid
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { colors } from '@/lib/tokens';
import HeroBoot from './hero/HeroBoot';

interface EnterTheHiveProps {
  onComplete: () => void;
}

export default function EnterTheHive({ onComplete: _onComplete }: EnterTheHiveProps) {
  const router = useRouter();
  const [isBooting, setIsBooting] = useState(false);

  const handleEnter = () => {
    console.log('[Analytics] jack_in_clicked');
    setIsBooting(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleEnter();
    }
  };

  const handleBootComplete = () => {
    // Redirect all users to home page after intro
    router.push('/home');
  };

  const handleExploreGrid = () => {
    console.log('[Analytics] cta_explore_grid');
    // Clicking "Explore the Grid" should complete the boot and show TheGrid
    handleBootComplete();
  };

  // Show the new boot sequence
  if (isBooting) {
    return (
      <HeroBoot
        onBootComplete={handleBootComplete}
        onExploreGrid={handleExploreGrid}
      />
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
            className="text-6xl md:text-8xl font-display font-bold tracking-tight uppercase mb-2 holographic-text"
            style={{
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
          className="glitch-hover group relative px-10 py-4 font-mono font-bold text-base md:text-lg uppercase tracking-wider cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:outline-none"
          data-text=">> JACK IN"
          aria-label="Enter the HoneyDrunk Hive"
          style={{
            backgroundColor: `${colors.neonPink}20`,
            borderWidth: '2px',
            borderColor: colors.neonPink,
            color: colors.offWhite,
            boxShadow: `0 0 40px ${colors.neonPink}70, inset 0 0 15px ${colors.neonPink}20`,
            clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.electricBlue}, 0 0 40px ${colors.neonPink}70, inset 0 0 15px ${colors.neonPink}20`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = `0 0 40px ${colors.neonPink}70, inset 0 0 15px ${colors.neonPink}20`;
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

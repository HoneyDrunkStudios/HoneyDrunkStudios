'use client';

/**
 * HeroBoot — Orchestrates the entire boot sequence
 * Timeline: gate → black → pulse → lab lights → gold handover → emblem → headline → subline → CTAs → idle
 */

import { useRef, useEffect, useState } from 'react';
import { useIsMobile } from '@/lib/hooks/useIsMobile';
import HexGridOverlay, { type HexGridOverlayHandle } from './HexGridOverlay';
import DistributedNetwork, { type DistributedNetworkHandle } from './DistributedNetwork';
import HeroCopy, { type HeroCopyHandle } from './HeroCopy';
import { colors } from '@/lib/tokens';

type BootState = 'gate' | 'booting' | 'idle';

interface HeroBootProps {
  onExploreGrid?: () => void;
  onFollowSignal?: () => void;
  onBootComplete?: () => void;
}

export default function HeroBoot({
  onExploreGrid,
  onFollowSignal,
  onBootComplete,
}: HeroBootProps) {
  const [bootState, setBootState] = useState<BootState>('booting');
  const isMobile = useIsMobile();

  const hexGridRef = useRef<HexGridOverlayHandle>(null);
  const networkRef = useRef<DistributedNetworkHandle>(null);
  const heroCopyRef = useRef<HeroCopyHandle>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Track mouse position for parallax
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (bootState !== 'booting') return;

    // Timeline configuration (in ms from start)
    const timeline = [
      { time: 0, action: 'startBlack' },
      { time: 300, action: 'startPulse' },
      { time: 1000, action: 'labLightsStart' },
      { time: 1800, action: 'goldHandover' },
      { time: 2500, action: 'showEmblem' },
      { time: 3000, action: 'showHeadline' },
      { time: 4000, action: 'showSubline' },
      { time: 4000, action: 'showCTAs' },
      { time: 5000, action: 'enterIdle' },
    ];

    // Track which actions have been executed
    const executedActions = new Set<string>();

    const startTime = Date.now();

    const runTimeline = () => {
      const elapsed = Date.now() - startTime;

      timeline.forEach(({ time, action }) => {
        if (elapsed >= time && !executedActions.has(action)) {
          executedActions.add(action);

          switch (action) {
            case 'startBlack':
              // Already in black state
              break;

            case 'startPulse':
              console.log('[Analytics] hero_pulse_started');
              hexGridRef.current?.startBoot({
                durationMs: 2000,
                axis: isMobile ? 'y' : 'x',
              });
              networkRef.current?.startBoot();
              break;

            case 'labLightsStart':
              // Expansion of distributed nodes (no central core intensity)
              // Use grid intensity to gently ramp visual presence
              animateGridIntensity(0.2, 0.5, 800);
              break;

            case 'goldHandover':
              // Formation – settle grid presence
              animateGridIntensity(0.5, 0.6, 700);
              console.log('[Analytics] hero_pulse_completed');
              break;

            case 'showEmblem':
              heroCopyRef.current?.showEmblem();
              break;

            case 'showHeadline':
              heroCopyRef.current?.showHeadline();
              break;

            case 'showSubline':
              heroCopyRef.current?.showSubline();
              break;

            case 'showCTAs':
              heroCopyRef.current?.showCTAs();
              console.log('[Analytics] hero_ctas_visible');
              break;

            case 'enterIdle':
              setBootState('idle');
              hexGridRef.current?.enterIdle({ heartbeat: !prefersReducedMotion });
              networkRef.current?.enterIdle();
              // User must click CTA button to continue (no auto-redirect)
              break;
          }
        }
      });

      if (elapsed < timeline[timeline.length - 1].time + 100) {
        requestAnimationFrame(runTimeline);
      }
    };

    // Start timeline
    if (prefersReducedMotion) {
      // Fast-forward for reduced motion - show static gold-lit scene
      // Reduced motion: settle grid and show static network
      heroCopyRef.current?.showEmblem();
      heroCopyRef.current?.showHeadline();
      heroCopyRef.current?.showSubline();
      heroCopyRef.current?.showCTAs();
      setBootState('idle');
      hexGridRef.current?.enterIdle({ heartbeat: false });
      networkRef.current?.enterIdle();
      // User must click button (no auto-redirect)
    } else {
      runTimeline();
    }
  }, [bootState, isMobile, onBootComplete, prefersReducedMotion]);

  // Helper: Animate hive core intensity
  const animateGridIntensity = (from: number, to: number, duration: number) => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const intensity = from + (to - from) * progress;
      hexGridRef.current?.setIntensity(intensity);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  const handleExploreGrid = () => {
    console.log('[Analytics] cta_explore_grid');
    onExploreGrid?.();
  };

  const handleFollowSignal = () => {
    console.log('[Analytics] cta_follow_signal');
    // Open X profile in new tab
    window.open('https://x.com/tatteddev', '_blank', 'noopener,noreferrer');
    onFollowSignal?.();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: colors.deepSpace }}>
      {/* Background hex grid with parallax */}
      <HexGridOverlay
        ref={hexGridRef}
        mouseRef={mouseRef}
        enableParallax={bootState === 'idle' && !prefersReducedMotion && !isMobile}
      />

      {/* Distributed network layer */}
      <DistributedNetwork
        ref={networkRef}
        mouseRef={mouseRef}
        enableParallax={bootState === 'idle' && !prefersReducedMotion && !isMobile}
        reduceMotion={prefersReducedMotion}
      />

      {/* Hero copy (headline/subline/CTAs) */}
      <HeroCopy
        ref={heroCopyRef}
        onExploreGrid={handleExploreGrid}
        onFollowSignal={handleFollowSignal}
        hexGridRef={hexGridRef}
        distributedRef={networkRef}
      />
    </div>
  );
}

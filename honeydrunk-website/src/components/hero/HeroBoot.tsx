'use client';

/**
 * HeroBoot — Orchestrates the entire boot sequence
 * Timeline: gate → black → pulse → lab lights → gold handover → emblem → headline → subline → CTAs → idle
 */

import { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/lib/hooks/useIsMobile';
import HexGridOverlay, { type HexGridOverlayHandle } from './HexGridOverlay';
import HeroCopy, { type HeroCopyHandle } from './HeroCopy';
import DataRain from './DataRain';
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
}: HeroBootProps) {
  const [sequenceState, setBootState] = useState<BootState>('booting');
  const prefersReducedMotion = useReducedMotion();
  const bootState = prefersReducedMotion ? 'idle' : sequenceState;
  // Once skipped, the boot sequence stays complete if the preference changes back.
  if (prefersReducedMotion && sequenceState !== 'idle') {
    setBootState('idle');
  }
  const isMobile = useIsMobile();

  const hexGridRef = useRef<HexGridOverlayHandle>(null);
  const heroCopyRef = useRef<HeroCopyHandle>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

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
    if (bootState !== 'booting' && !prefersReducedMotion) return;

    let timelineFrame = 0;
    const intensityFrames = new Set<number>();
    const animateGridIntensity = (from: number, to: number, duration: number) => {
      const startTime = Date.now();
      const animate = () => {
        const progress = Math.min((Date.now() - startTime) / duration, 1);
        hexGridRef.current?.setIntensity(from + (to - from) * progress);
        if (progress < 1) {
          const frame = requestAnimationFrame(() => {
            intensityFrames.delete(frame);
            animate();
          });
          intensityFrames.add(frame);
        }
      };
      animate();
    };

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
              // User must click CTA button to continue (no auto-redirect)
              break;
          }
        }
      });

      if (elapsed < timeline[timeline.length - 1].time + 100) {
        timelineFrame = requestAnimationFrame(runTimeline);
      }
    };

    // Start timeline
    if (prefersReducedMotion) {
      // Fast-forward for reduced motion - show static gold-lit scene
      heroCopyRef.current?.showEmblem();
      heroCopyRef.current?.showHeadline();
      heroCopyRef.current?.showSubline();
      heroCopyRef.current?.showCTAs();
      hexGridRef.current?.enterIdle({ heartbeat: false });
      // User must click button (no auto-redirect)
    } else {
      timelineFrame = requestAnimationFrame(runTimeline);
    }
    return () => {
      cancelAnimationFrame(timelineFrame);
      intensityFrames.forEach(cancelAnimationFrame);
    };
  }, [bootState, isMobile, prefersReducedMotion]);

  const handleExploreGrid = () => {
    console.log('[Analytics] cta_jack_in');
    onExploreGrid?.();
  };

  const handleFollowSignal = () => {
    console.log('[Analytics] cta_view_sectors');
    // Navigate to /sectors on mobile, /grid on desktop
    window.location.href = isMobile ? '/sectors' : '/grid';
    onFollowSignal?.();
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden" 
      style={{ 
        backgroundColor: colors.deepSpace,
        backgroundImage: 'url(/neoncity.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Data rain effect */}
      <DataRain density={60} />

      {/* Background hex grid with parallax */}
      <HexGridOverlay
        ref={hexGridRef}
        mouseRef={mouseRef}
        enableParallax={bootState === 'idle' && !prefersReducedMotion && !isMobile}
      />

      {/* Hero copy (headline/subline/CTAs) */}
      <HeroCopy
        ref={heroCopyRef}
        onExploreGrid={handleExploreGrid}
        onFollowSignal={handleFollowSignal}
        hexGridRef={hexGridRef}
      />
    </div>
  );
}

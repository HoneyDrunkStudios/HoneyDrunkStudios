'use client';

/**
 * HeroCopy — Headline, subline, and CTAs with animations
 * Supports typewriter effect for headline and slide-up for subline
 */

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/lib/tokens';
import type { HexGridOverlayHandle } from './HexGridOverlay';

export interface HeroCopyHandle {
  showEmblem: () => void;
  showHeadline: () => void;
  showSubline: () => void;
  showCTAs: () => void;
  reset: () => void;
}

interface HeroCopyProps {
  onExploreGrid?: () => void;
  onFollowSignal?: () => void;
  hexGridRef?: React.RefObject<HexGridOverlayHandle | null>;
}

const HeroCopy = forwardRef<HeroCopyHandle, HeroCopyProps>(
  function HeroCopy({ onExploreGrid, onFollowSignal, hexGridRef }, ref) {
    const [emblemVisible, setEmblemVisible] = useState(false);
    const [headlineVisible, setHeadlineVisible] = useState(false);
    const [sublineVisible, setSublineVisible] = useState(false);
    const [ctasVisible, setCtasVisible] = useState(false);
    const [displayedHeadline, setDisplayedHeadline] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const exploreButtonRef = useRef<HTMLButtonElement>(null);
    const signalButtonRef = useRef<HTMLButtonElement>(null);

    const fullHeadline = 'Structure meets soul. Code meets art.';

    // Trigger ripple on button hover
    const triggerButtonEffects = (buttonRef: React.RefObject<HTMLElement | null>) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Trigger hex grid ripple
      hexGridRef?.current?.triggerRipple(x, y);
    };

    useImperativeHandle(ref, () => ({
      showEmblem: () => setEmblemVisible(true),
      showHeadline: () => {
        setHeadlineVisible(true);
        setIsTyping(true);
      },
      showSubline: () => setSublineVisible(true),
      showCTAs: () => setCtasVisible(true),
      reset: () => {
        setEmblemVisible(false);
        setHeadlineVisible(false);
        setSublineVisible(false);
        setCtasVisible(false);
        setDisplayedHeadline('');
        setIsTyping(false);
      },
    }));

    // Typewriter effect for headline
    useEffect(() => {
      if (!isTyping) return;

      let currentIndex = 0;
      const typingSpeed = 40; // ms per character

      const interval = setInterval(() => {
        if (currentIndex <= fullHeadline.length) {
          setDisplayedHeadline(fullHeadline.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(interval);
        }
      }, typingSpeed);

      return () => clearInterval(interval);
    }, [isTyping]);

    // Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ zIndex: 10 }}>
        <div className="max-w-5xl w-full px-4 md:px-8 flex justify-center">
          {/* Main content card wrapper - only show when content is visible */}
          {(emblemVisible || headlineVisible || sublineVisible || ctasVisible) && (
          <div
            className="pointer-events-auto space-y-8 w-full text-center"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(12px)',
              padding: '3rem 2.5rem',
              borderRadius: '16px',
              border: '1px solid rgba(123, 97, 255, 0.25)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 0 60px rgba(123, 97, 255, 0.08)',
            }}
          >
          {/* HoneyDrunk Studios Logo Text */}
          <AnimatePresence>
            {emblemVisible && (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center mb-6"
                style={{ gap: '4rem' }}
              >
                <div
                  className="relative cursor-pointer group"
                  onClick={onExploreGrid}
                  role="button"
                  tabIndex={0}
                  aria-label="Go to home page"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onExploreGrid?.();
                    }
                  }}
                  onMouseEnter={(e) => triggerButtonEffects({ current: e.currentTarget })}
                  onFocus={(e) => triggerButtonEffects({ current: e.currentTarget })}
                >
                  {/* Main logo text - HONEYDRUNK (AURUM GOLD - YELLOW) */}
                  <h1
                    className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight relative"
                    style={{
                      color: colors.aurumGold,
                      textShadow: `
                        0 0 50px ${colors.aurumGold}FF,
                        0 0 30px ${colors.aurumGold}CC,
                        0 0 15px ${colors.aurumGold}80,
                        0 0 5px ${colors.aurumGold}60,
                        0 2px 8px rgba(0,0,0,0.8)
                      `,
                      letterSpacing: '0.05em',
                    }}
                  >
                    <span className="relative inline-block">
                      HONEYDRUNK
                      {/* Glitch effect bars - gold/yellow accent */}
                      <div
                        className="absolute top-0 left-0 w-full h-0.5 opacity-50"
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, ${colors.aurumGold} 30%, ${colors.aurumGold} 70%, transparent 100%)`,
                          transform: 'translateY(-10px)',
                          boxShadow: `0 0 8px ${colors.aurumGold}80`,
                        }}
                      />
                      <div
                        className="absolute bottom-0 left-0 w-full h-0.5 opacity-50"
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, ${colors.aurumGold} 30%, ${colors.aurumGold} 70%, transparent 100%)`,
                          transform: 'translateY(10px)',
                          boxShadow: `0 0 8px ${colors.aurumGold}80`,
                        }}
                      />
                    </span>
                  </h1>

                  {/* Studios subtitle - NEON PINK/VIOLET */}
                  <div
                    className="text-xl md:text-3xl font-mono font-bold uppercase tracking-widest text-center relative"
                    style={{
                      marginTop: '2.5rem',
                      color: colors.violetCore,
                      textShadow: `
                        0 0 60px ${colors.violetCore}FF,
                        0 0 40px ${colors.violetCore}FF,
                        0 0 25px ${colors.violetCore}EE,
                        0 0 15px ${colors.violetCore}DD,
                        0 0 8px ${colors.violetCore}CC,
                        0 3px 15px rgba(0,0,0,0.9),
                        0 5px 25px rgba(0,0,0,0.8),
                        0 8px 35px rgba(0,0,0,0.7)
                      `,
                      letterSpacing: '0.8em',
                      marginLeft: '0.8em', // Compensate for letter-spacing
                      filter: 'brightness(1.3) contrast(1.2)',
                    }}
                  >
                    <span className="relative inline-block">
                      STUDIOS
                      {/* Glitch effect bars - violet/purple (top) */}
                      <div
                        className="absolute top-0 left-0 w-full h-0.5 opacity-50"
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, ${colors.violetCore} 30%, ${colors.violetCore} 70%, transparent 100%)`,
                          transform: 'translateY(-10px)',
                          boxShadow: `0 0 8px ${colors.violetCore}80`,
                        }}
                      />
                      {/* Glitch effect bars - violet/purple (bottom) */}
                      <div
                        className="absolute bottom-0 left-0 w-full h-0.5 opacity-50"
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, ${colors.violetCore} 30%, ${colors.violetCore} 70%, transparent 100%)`,
                          transform: 'translateY(10px)',
                          boxShadow: `0 0 8px ${colors.violetCore}80`,
                        }}
                      />
                    </span>
                  </div>

                  {/* Hover glow effect - dual color */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${colors.electricBlue}15 0%, ${colors.aurumGold}10 50%, transparent 70%)`,
                      filter: 'blur(20px)',
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Headline */}
          <AnimatePresence>
            {headlineVisible && (
              <motion.h1
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-display font-bold tracking-tight"
                style={{
                  color: colors.offWhite,
                  textShadow: `0 0 40px ${colors.aurumGold}40`,
                }}
              >
                {prefersReducedMotion ? fullHeadline : (displayedHeadline || ' ')}
                {isTyping && <span className="animate-pulse">|</span>}
              </motion.h1>
            )}
          </AnimatePresence>

          {/* Subline */}
          <AnimatePresence>
            {sublineVisible && (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full flex justify-center mb-4"
              >
                <p
                  className="text-lg md:text-xl font-mono max-w-3xl"
                  style={{
                    color: colors.slateLight,
                    textAlign: 'center',
                  }}
                >
                  We&apos;re building the HoneyDrunk Grid — interlinked systems, SDKs, games, and embodied agents.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTAs */}
          <AnimatePresence>
            {ctasVisible && (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center pointer-events-auto mt-8"
              >
                <button
                  ref={exploreButtonRef}
                  onClick={onExploreGrid}
                  aria-label="Jack into the HoneyDrunk Hive"
                  className="font-mono font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:outline-none group relative overflow-hidden cursor-pointer"
                  style={{
                    padding: '0.75rem 2rem',
                    backgroundColor: `${colors.aurumGold}50`,
                    borderWidth: '2px',
                    borderColor: colors.aurumGold,
                    color: colors.offWhite,
                    boxShadow: `0 0 50px ${colors.aurumGold}90, 0 0 25px ${colors.aurumGold}70, inset 0 0 25px ${colors.aurumGold}40`,
                    clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                    filter: 'brightness(1.1)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.electricBlue}, 0 0 30px ${colors.aurumGold}60, inset 0 0 10px ${colors.aurumGold}20`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 30px ${colors.aurumGold}60, inset 0 0 10px ${colors.aurumGold}20`;
                  }}
                  onMouseEnter={(e) => {
                    if (!prefersReducedMotion) {
                      e.currentTarget.style.backgroundColor = `${colors.aurumGold}30`;
                      e.currentTarget.style.boxShadow = `0 0 40px ${colors.aurumGold}80, inset 0 0 15px ${colors.aurumGold}30`;
                      triggerButtonEffects(exploreButtonRef);
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${colors.aurumGold}20`;
                    e.currentTarget.style.boxShadow = `0 0 30px ${colors.aurumGold}60, inset 0 0 10px ${colors.aurumGold}20`;
                  }}
                >
                  &gt;&gt; Jack In
                </button>

                <button
                  ref={signalButtonRef}
                  onClick={onFollowSignal}
                  aria-label="Follow the Signal on X (Twitter)"
                  className="font-mono font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:outline-none cursor-pointer"
                  style={{
                    padding: '0.75rem 2rem',
                    backgroundColor: `${colors.electricBlue}45`,
                    borderWidth: '2px',
                    borderColor: colors.electricBlue,
                    color: colors.offWhite,
                    boxShadow: `0 0 50px ${colors.electricBlue}85, 0 0 25px ${colors.electricBlue}65, inset 0 0 20px ${colors.electricBlue}35`,
                    filter: 'brightness(1.1)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.electricBlue}, 0 0 20px ${colors.electricBlue}40`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 20px ${colors.electricBlue}40`;
                  }}
                  onMouseEnter={(e) => {
                    if (!prefersReducedMotion) {
                      e.currentTarget.style.backgroundColor = `${colors.electricBlue}25`;
                      e.currentTarget.style.boxShadow = `0 0 30px ${colors.electricBlue}60`;
                      triggerButtonEffects(signalButtonRef);
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${colors.electricBlue}15`;
                    e.currentTarget.style.boxShadow = `0 0 20px ${colors.electricBlue}40`;
                  }}
                >
                  Follow the Signal
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
          )}
        </div>
      </div>
    );
  }
);

export default HeroCopy;

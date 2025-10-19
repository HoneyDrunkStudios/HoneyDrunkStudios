'use client';

/**
 * HeroCopy — Headline, subline, and CTAs with animations
 * Supports typewriter effect for headline and slide-up for subline
 */

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/lib/tokens';
import type { HexGridOverlayHandle } from './HexGridOverlay';
import type { EnergyLinesHandle } from './EnergyLines';

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
  energyLinesRef?: React.RefObject<EnergyLinesHandle | null>;
}

const HeroCopy = forwardRef<HeroCopyHandle, HeroCopyProps>(
  function HeroCopy({ onExploreGrid, onFollowSignal, hexGridRef, energyLinesRef }, ref) {
    const [emblemVisible, setEmblemVisible] = useState(false);
    const [headlineVisible, setHeadlineVisible] = useState(false);
    const [sublineVisible, setSublineVisible] = useState(false);
    const [ctasVisible, setCtasVisible] = useState(false);
    const [displayedHeadline, setDisplayedHeadline] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const exploreButtonRef = useRef<HTMLButtonElement>(null);
    const signalButtonRef = useRef<HTMLButtonElement>(null);

    const fullHeadline = 'Structure meets soul. Code meets art.';

    // Trigger ripple and energy pulse on button hover
    const triggerButtonEffects = (buttonRef: React.RefObject<HTMLButtonElement | null>) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Trigger hex grid ripple
      hexGridRef?.current?.triggerRipple(x, y);

      // Trigger energy lines pulse
      energyLinesRef?.current?.triggerHoverPulse(x, y);
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
        <div className="max-w-5xl w-full px-8 text-center space-y-8">
          {/* HoneyDrunk Studios Logo Text */}
          <AnimatePresence>
            {emblemVisible && (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center gap-2 mb-6 pointer-events-auto"
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
                >
                  {/* Main logo text */}
                  <h1
                    className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight relative"
                    style={{
                      color: colors.aurumGold,
                      textShadow: `
                        0 0 40px ${colors.aurumGold}90,
                        0 0 20px ${colors.aurumGold}60,
                        0 2px 4px rgba(0,0,0,0.8)
                      `,
                      letterSpacing: '0.05em',
                    }}
                  >
                    <span className="relative">
                      HONEYDRUNK
                      {/* Glitch effect bars */}
                      <div
                        className="absolute top-0 left-0 w-full h-0.5 opacity-60"
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, ${colors.electricBlue} 30%, ${colors.electricBlue} 70%, transparent 100%)`,
                          transform: 'translateY(-8px)',
                        }}
                      />
                      <div
                        className="absolute bottom-0 left-0 w-full h-0.5 opacity-60"
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, ${colors.electricBlue} 30%, ${colors.electricBlue} 70%, transparent 100%)`,
                          transform: 'translateY(8px)',
                        }}
                      />
                    </span>
                  </h1>

                  {/* Studios subtitle */}
                  <div
                    className="text-sm md:text-base font-mono font-bold uppercase tracking-widest text-center mt-1"
                    style={{
                      color: colors.electricBlue,
                      textShadow: `0 0 10px ${colors.electricBlue}80`,
                      letterSpacing: '0.3em',
                    }}
                  >
                    [ STUDIOS ]
                  </div>

                  {/* Heartbeat pulse indicator */}
                  {!prefersReducedMotion && (
                    <motion.div
                      className="absolute -right-3 top-1/2 -translate-y-1/2 flex gap-1"
                      animate={{
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: colors.aurumGold }}
                      />
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: colors.aurumGold }}
                      />
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: colors.aurumGold }}
                      />
                    </motion.div>
                  )}
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
              <motion.p
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl font-mono max-w-3xl mx-auto"
                style={{
                  color: colors.slateLight,
                }}
              >
                We&apos;re building the HoneyDrunk Grid — interlinked systems, SDKs, games, and embodied agents.
              </motion.p>
            )}
          </AnimatePresence>

          {/* CTAs */}
          <AnimatePresence>
            {ctasVisible && (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center pointer-events-auto"
              >
                <button
                  ref={exploreButtonRef}
                  onClick={onExploreGrid}
                  aria-label="Jack into the HoneyDrunk Hive"
                  className="font-mono font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:outline-none group relative overflow-hidden cursor-pointer"
                  style={{
                    padding: '0.75rem 2rem',
                    backgroundColor: `${colors.aurumGold}20`,
                    borderWidth: '2px',
                    borderColor: colors.aurumGold,
                    color: colors.offWhite,
                    boxShadow: `0 0 30px ${colors.aurumGold}60, inset 0 0 10px ${colors.aurumGold}20`,
                    clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
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
                    backgroundColor: `${colors.electricBlue}15`,
                    borderWidth: '2px',
                    borderColor: colors.electricBlue,
                    color: colors.electricBlue,
                    boxShadow: `0 0 20px ${colors.electricBlue}40`,
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
      </div>
    );
  }
);

export default HeroCopy;

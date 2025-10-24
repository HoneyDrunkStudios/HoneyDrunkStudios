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
    
    // Hold-to-press state
    const [exploreProgress, setExploreProgress] = useState(0);
    const [signalProgress, setSignalProgress] = useState(0);
    const [isHoldingExplore, setIsHoldingExplore] = useState(false);
    const [isHoldingSignal, setIsHoldingSignal] = useState(false);
    const holdAnimationRef = useRef<number | null>(null);
    const holdStartRef = useRef<number>(0);
    const holdDuration = 1000; // ms to hold for activation

    const exploreButtonRef = useRef<HTMLButtonElement>(null);
    const signalButtonRef = useRef<HTMLButtonElement>(null);

    const fullHeadline = 'Structure meets soul. Code meets art.';

    // Helper to render headline with colored words during typewriter
    const renderColoredHeadline = (text: string) => {
      // Split on line break point
      const parts = text.split('.');
      const firstLine = parts[0] ? parts[0] + '.' : '';
      const secondLine = parts[1] || '';
      
      // Highlight logic with glow
      const highlightWord = (line: string, word: string, color: string) => {
        if (!line.includes(word)) return line;
        const index = line.indexOf(word);
        const glowStyle = {
          color,
          textShadow: `
            0 0 50px ${color}FF,
            0 0 30px ${color}CC,
            0 0 15px ${color}80,
            0 0 5px ${color}60,
            0 2px 8px rgba(0,0,0,0.8)
          `
        };
        return (
          <>
            {line.slice(0, index)}
            <span style={glowStyle}>{word}</span>
            {line.slice(index + word.length)}
          </>
        );
      };

      return (
        <>
          {highlightWord(firstLine, 'soul', colors.signalGreen)}
          {text.includes('Code') && <br />}
          {secondLine && highlightWord(secondLine, 'art', colors.neonPink)}
        </>
      );
    };

    // Trigger ripple on button hover
    const triggerButtonEffects = (buttonRef: React.RefObject<HTMLElement | null>) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // Trigger hex grid ripple
      hexGridRef?.current?.triggerRipple(x, y);
    };

    // Hold-to-press handlers
    const startHold = (buttonType: 'explore' | 'signal') => {
      if (buttonType === 'explore') {
        setIsHoldingExplore(true);
      } else {
        setIsHoldingSignal(true);
      }
      holdStartRef.current = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - holdStartRef.current;
        const progress = Math.min((elapsed / holdDuration) * 100, 100);
        
        if (buttonType === 'explore') {
          setExploreProgress(progress);
          
          if (progress >= 100) {
            setIsHoldingExplore(false);
            onExploreGrid?.();
            setExploreProgress(0);
            return;
          }
        } else {
          setSignalProgress(progress);
          
          if (progress >= 100) {
            setIsHoldingSignal(false);
            onFollowSignal?.();
            setSignalProgress(0);
            return;
          }
        }

        // Continue animation if still holding
        const isStillHolding = buttonType === 'explore' ? isHoldingExplore : isHoldingSignal;
        if (progress < 100) {
          holdAnimationRef.current = requestAnimationFrame(animate);
        }
      };

      holdAnimationRef.current = requestAnimationFrame(animate);
    };

    const cancelHold = (buttonType: 'explore' | 'signal') => {
      if (holdAnimationRef.current) {
        cancelAnimationFrame(holdAnimationRef.current);
        holdAnimationRef.current = null;
      }
      
      if (buttonType === 'explore') {
        setIsHoldingExplore(false);
        setExploreProgress(0);
      } else {
        setIsHoldingSignal(false);
        setSignalProgress(0);
      }
    };

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        if (holdAnimationRef.current) {
          cancelAnimationFrame(holdAnimationRef.current);
        }
      };
    }, []);

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
      const typingSpeed = 80; // ms per character (slowed down by half from 40)

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
            className="pointer-events-auto space-y-4 md:space-y-8 w-full text-center"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(12px)',
              padding: '1.5rem 1rem',
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
                className="flex flex-col items-center justify-center mb-2 md:mb-6"
                style={{ gap: '1.5rem' }}
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
                    className="text-3xl sm:text-5xl md:text-7xl font-display font-bold uppercase tracking-tight relative"
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
                    className="text-sm sm:text-xl md:text-3xl font-mono font-bold uppercase tracking-widest text-center relative"
                    style={{
                      marginTop: '2rem',
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
                      letterSpacing: '0.3em',
                      marginLeft: '0.3em', // Compensate for letter-spacing
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
                className="text-2xl sm:text-4xl md:text-6xl font-display font-bold tracking-tight px-2 text-center"
                style={{
                  color: colors.offWhite,
                  textShadow: `0 0 40px ${colors.aurumGold}40`,
                }}
              >
                {prefersReducedMotion ? (
                  <>
                    Structure meets <span style={{ 
                      color: colors.signalGreen,
                      textShadow: `
                        0 0 50px ${colors.signalGreen}FF,
                        0 0 30px ${colors.signalGreen}CC,
                        0 0 15px ${colors.signalGreen}80,
                        0 0 5px ${colors.signalGreen}60,
                        0 2px 8px rgba(0,0,0,0.8)
                      `
                    }}>soul</span>.<br />
                    Code meets <span style={{ 
                      color: colors.neonPink,
                      textShadow: `
                        0 0 50px ${colors.neonPink}FF,
                        0 0 30px ${colors.neonPink}CC,
                        0 0 15px ${colors.neonPink}80,
                        0 0 5px ${colors.neonPink}60,
                        0 2px 8px rgba(0,0,0,0.8)
                      `
                    }}>art</span>.
                  </>
                ) : (
                  isTyping ? (
                    <>
                      {renderColoredHeadline(displayedHeadline || ' ')}
                      <span className="animate-pulse">|</span>
                    </>
                  ) : (
                    <>
                      Structure meets{' '}
                      <motion.span
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{
                          opacity: [0, 1, 1],
                          scale: [1, 1.01, 1],
                        }}
                        transition={{
                          duration: 0.4,
                          delay: 0.1,
                          times: [0, 0.3, 1],
                        }}
                        style={{
                          display: 'inline-block',
                          color: colors.signalGreen,
                          textShadow: `
                            0 0 50px ${colors.signalGreen}FF,
                            0 0 30px ${colors.signalGreen}CC,
                            0 0 15px ${colors.signalGreen}80,
                            0 0 5px ${colors.signalGreen}60,
                            0 2px 8px rgba(0,0,0,0.8)
                          `,
                          animation: prefersReducedMotion ? 'none' : 'breatheSoul 2.8s ease-in-out infinite',
                        }}
                      >
                        soul
                      </motion.span>
                      .<br />
                      Code meets{' '}
                      <motion.span
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{
                          opacity: [0, 1, 1],
                          scale: [1, 1.01, 1],
                        }}
                        transition={{
                          duration: 0.4,
                          delay: 0.28,
                          times: [0, 0.3, 1],
                        }}
                        style={{
                          display: 'inline-block',
                          color: colors.neonPink,
                          textShadow: `
                            0 0 50px ${colors.neonPink}FF,
                            0 0 30px ${colors.neonPink}CC,
                            0 0 15px ${colors.neonPink}80,
                            0 0 5px ${colors.neonPink}60,
                            0 2px 8px rgba(0,0,0,0.8)
                          `,
                          animation: prefersReducedMotion ? 'none' : 'breatheArt 2.8s ease-in-out infinite 0.3s',
                        }}
                      >
                        art
                      </motion.span>
                      .
                    </>
                  )
                )}
              </motion.h1>
            )}
          </AnimatePresence>

          <style jsx>{`
            @keyframes breatheSoul {
              0%, 100% {
                filter: drop-shadow(0 0 4px ${colors.signalGreen}40);
                opacity: 1;
              }
              50% {
                filter: drop-shadow(0 0 12px ${colors.signalGreen}88);
                opacity: 1;
              }
            }
            
            @keyframes breatheArt {
              0%, 100% {
                filter: drop-shadow(0 0 4px ${colors.neonPink}40);
                opacity: 1;
              }
              50% {
                filter: drop-shadow(0 0 12px ${colors.neonPink}88);
                opacity: 1;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              @keyframes breatheSoul,
              @keyframes breatheArt {
                0%, 100% {
                  filter: none;
                  opacity: 1;
                }
              }
            }
          `}</style>

          {/* Subline */}
          <AnimatePresence>
            {sublineVisible && (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full flex justify-center mb-2 md:mb-4"
              >
                <p
                  className="text-sm sm:text-base md:text-lg font-mono max-w-3xl px-2"
                  style={{
                    color: colors.slateLight,
                    textAlign: 'center',
                  }}
                >
                  Building the HoneyDrunk Grid — open systems, tools, games, and cyberware that empower creators.
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
                className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center pointer-events-auto mt-4 md:mt-8"
              >
                {/* Primary CTA - Jack In */}
                <button
                  ref={exploreButtonRef}
                  onMouseDown={() => startHold('explore')}
                  onMouseUp={() => cancelHold('explore')}
                  onMouseLeave={() => cancelHold('explore')}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    startHold('explore');
                  }}
                  onTouchEnd={() => cancelHold('explore')}
                  onTouchCancel={() => cancelHold('explore')}
                  aria-label="Jack In"
                  className="font-mono font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:outline-none group relative overflow-hidden cursor-pointer w-full sm:w-auto"
                  style={{
                    padding: '0.65rem 1.5rem',
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
                      triggerButtonEffects(exploreButtonRef);
                    }
                  }}
                >
                  {/* Progress fill bar */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg, ${colors.aurumGold}FF 0%, ${colors.aurumGold}CC 100%)`,
                      width: `${exploreProgress}%`,
                      clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                      boxShadow: exploreProgress > 0 ? `0 0 30px ${colors.aurumGold}FF, inset 0 0 20px ${colors.aurumGold}AA` : 'none',
                      transition: exploreProgress === 0 ? 'width 0.2s ease-out, box-shadow 0.2s ease-out' : 'none',
                    }}
                  />
                  <span className="relative z-10">&gt;&gt; JACK IN</span>
                </button>

                {/* Secondary CTA - View The Grid */}
                <button
                  ref={signalButtonRef}
                  onMouseDown={() => startHold('signal')}
                  onMouseUp={() => cancelHold('signal')}
                  onMouseLeave={() => cancelHold('signal')}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    startHold('signal');
                  }}
                  onTouchEnd={() => cancelHold('signal')}
                  onTouchCancel={() => cancelHold('signal')}
                  aria-label="View The Grid"
                  className="font-mono font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:outline-none cursor-pointer w-full sm:w-auto relative overflow-hidden"
                  style={{
                    padding: '0.65rem 1.5rem',
                    backgroundColor: `${colors.electricBlue}15`,
                    borderWidth: '2px',
                    borderColor: colors.electricBlue,
                    color: colors.offWhite,
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
                      triggerButtonEffects(signalButtonRef);
                    }
                  }}
                >
                  {/* Progress fill bar */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(90deg, ${colors.electricBlue}FF 0%, ${colors.electricBlue}CC 100%)`,
                      width: `${signalProgress}%`,
                      boxShadow: signalProgress > 0 ? `0 0 30px ${colors.electricBlue}FF, inset 0 0 20px ${colors.electricBlue}AA` : 'none',
                      transition: signalProgress === 0 ? 'width 0.2s ease-out, box-shadow 0.2s ease-out' : 'none',
                    }}
                  />
                  <span className="relative z-10">VIEW THE GRID</span>
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

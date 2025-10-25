'use client';

/**
 * LandingFooter — Site footer with links, social, heartbeat, and reset intro
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { colors } from '@/lib/tokens';
import SnakeModal from './SnakeModal';
import GalleryModal from './GalleryModal';

const STORAGE_KEY = 'hd.jacked_in';


// Global callback for console open
let openConsoleCallback: ((command?: string) => void) | null = null;

export function registerConsoleCallback(callback: (command?: string) => void) {
  openConsoleCallback = callback;
}

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();
  const [snakeOpen, setSnakeOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  // Listen for snake and gallery open events from console commands
  useEffect(() => {
    const handleOpenSnake = () => setSnakeOpen(true);
    const handleOpenGallery = () => setGalleryOpen(true);

    window.addEventListener('open-snake', handleOpenSnake as EventListener);
    window.addEventListener('open-gallery', handleOpenGallery as EventListener);

    return () => {
      window.removeEventListener('open-snake', handleOpenSnake as EventListener);
      window.removeEventListener('open-gallery', handleOpenGallery as EventListener);
    };
  }, []);

  const handleResetIntro = () => {
    console.log('[Analytics] reset_intro_clicked');
    // Clear sessionStorage and reload to show intro again
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEY);
      window.location.href = '/';
    }
  };

  const handleOpenConsole = () => {
    // Open console via custom event
    const event = new CustomEvent('open-console', { detail: {} });
    window.dispatchEvent(event);
  };

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <>
      <footer
        className="w-full border-t-2"
        style={{
          backgroundColor: colors.gunmetal,
          borderColor: `${colors.electricBlue}30`,
        }}
      >
        {/* Console Access */}
        <div
          className="w-full py-6 px-4 md:py-8 md:px-8 lg:border-b"
          style={{
            borderColor: `${colors.graphite}60`,
            backgroundColor: colors.gunmetal,
          }}
        >
          <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
            <button
              onClick={handleOpenConsole}
              className="px-8 py-4 text-base md:text-lg font-mono font-bold border-2 rounded-lg transition-all"
              style={{
                color: colors.electricBlue,
                borderColor: colors.electricBlue,
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.electricBlue}20`;
                e.currentTarget.style.boxShadow = `0 0 20px ${colors.electricBlue}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {'>'} OPEN CONSOLE
            </button>
            <span
              className="text-xs md:text-sm font-mono"
              style={{
                color: colors.slateLight,
              }}
            >
              Press <kbd
                className="px-1.5 py-0.5 rounded border mx-1"
                style={{
                  color: colors.electricBlue,
                  borderColor: `${colors.electricBlue}40`,
                  backgroundColor: `${colors.electricBlue}10`,
                }}
              >`</kbd> or click above to access the console
            </span>
          </div>
        </div>

        {/* Footer Content - Hidden on mobile/tablet, shown on desktop */}
        <div className="hidden lg:block max-w-7xl mx-auto py-12 px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Links */}
          <div>
            <h3
              className="text-sm font-mono font-bold uppercase tracking-wider"
              style={{ 
                color: colors.aurumGold,
                marginBottom: '20px',
              }}
            >
              Navigate
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Flow', href: '/flow' },
                { label: 'Grid', href: '/grid' },
                { label: 'Spotlight', href: '/spotlight' },
                { label: 'Services', href: '/services' },
                { label: 'About', href: '/about' },
                { label: 'Brand', href: '/brand' },
                { label: 'Signal', href: '/signal' },
                { label: 'Status', href: '/status' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-mono transition-all"
                    style={{ color: colors.slateLight }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.electricBlue;
                      e.currentTarget.style.textShadow = `0 0 10px ${colors.electricBlue}80`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.slateLight;
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3
              className="text-sm font-mono font-bold uppercase tracking-wider"
              style={{ 
                color: colors.aurumGold,
                marginBottom: '20px',
              }}
            >
              Connect
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'X / Twitter', href: 'https://x.com/HoneyDrunkLab' },
                { label: 'GitHub', href: 'https://github.com/HoneyDrunkStudios' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono transition-all"
                    style={{ color: colors.slateLight }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.electricBlue;
                      e.currentTarget.style.textShadow = `0 0 10px ${colors.electricBlue}80`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.slateLight;
                      e.currentTarget.style.textShadow = 'none';
                    }}
                  >
                    {link.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Heartbeat & Reset */}
          <div>
            <h3
              className="text-sm font-mono font-bold uppercase tracking-wider"
              style={{ 
                color: colors.aurumGold,
                marginBottom: '20px',
              }}
            >
              System
            </h3>

            {/* Heartbeat indicator */}
            <div className="flex items-center gap-2 mb-4">
              {!prefersReducedMotion ? (
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors.signalGreen }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ) : (
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors.signalGreen }}
                />
              )}
              <span
                className="text-xs font-mono"
                style={{ color: colors.slateLight }}
              >
                Hive heartbeat: operational
              </span>
            </div>

            {/* Reset intro link */}
            <button
              onClick={handleResetIntro}
              className="text-sm font-mono transition-all underline-offset-2 hover:underline"
              style={{ color: colors.slateLight }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.neonPink;
                e.currentTarget.style.textShadow = `0 0 10px ${colors.neonPink}80`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.slateLight;
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              Reset intro sequence
            </button>
          </div>
        </div>

          {/* Bottom bar */}
          <div
            className="pt-8 border-t text-center"
            style={{ borderColor: `${colors.graphite}60` }}
          >
            <p className="text-xs font-mono" style={{ color: colors.slateLight }}>
              © {currentYear} HoneyDrunk Studios. Boot. Build. Refactor. Evolve.
            </p>
          </div>
        </div>

        {/* Minimal copyright for mobile/tablet */}
        <div className="lg:hidden py-6 text-center">
          <p className="text-xs font-mono" style={{ color: colors.slateLight }}>
            © {currentYear} HoneyDrunk Studios
          </p>
        </div>
      </footer>

      {/* Modals */}
      <SnakeModal isOpen={snakeOpen} onClose={() => setSnakeOpen(false)} />
      <GalleryModal isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </>
  );
}

'use client';

/**
 * LandingFooter — Site footer with links, social, heartbeat, and reset intro
 */

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { colors } from '@/lib/tokens';
import { triggerGridPulse } from './GridPulse';
import SnakeModal from './SnakeModal';
import GalleryModal from './GalleryModal';

const STORAGE_KEY = 'hd.jacked_in';

interface Command {
  verb: string;
  tooltip: string;
  action: 'console' | 'snake' | 'gallery' | 'pulse' | 'hive' | 'playground';
  command?: string;
}

const COMMANDS: Command[] = [
  {
    verb: 'help',
    tooltip: 'Show available commands',
    action: 'console',
    command: 'help',
  },
  {
    verb: 'boot.honeycore',
    tooltip: 'Initialize kernel link',
    action: 'console',
    command: 'boot.honeycore',
  },
  {
    verb: 'list.nodes',
    tooltip: 'Enumerate active projects',
    action: 'console',
    command: 'list.nodes',
  },
  {
    verb: 'decrypt.archive',
    tooltip: 'Reveal vault fragment',
    action: 'console',
    command: 'decrypt.archive',
  },
  {
    verb: 'trace.signal',
    tooltip: 'Ping the grid',
    action: 'pulse',
  },
  {
    verb: 'run.snake',
    tooltip: 'Load recreational process',
    action: 'snake',
  },
  {
    verb: 'open.gallery',
    tooltip: 'Cycle visual feed',
    action: 'gallery',
  },
  {
    verb: 'access.hive',
    tooltip: 'Standby: connection port',
    action: 'hive',
  },
  {
    verb: 'run.playground',
    tooltip: 'Enter simulation bay',
    action: 'playground',
  },
];

// Global callback for console open
let openConsoleCallback: ((command?: string) => void) | null = null;

export function registerConsoleCallback(callback: (command?: string) => void) {
  openConsoleCallback = callback;
}

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();
  const [snakeOpen, setSnakeOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const handleResetIntro = () => {
    console.log('[Analytics] reset_intro_clicked');
    // Clear sessionStorage and reload to show intro again
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEY);
      window.location.href = '/';
    }
  };

  const handleCommandClick = (cmd: Command) => {
    switch (cmd.action) {
      case 'console':
        if (cmd.command) {
          // Open console via the registered callback (from HiveConsole)
          const event = new CustomEvent('open-console', { detail: { command: cmd.command } });
          window.dispatchEvent(event);
        }
        break;

      case 'pulse':
        triggerGridPulse();
        break;

      case 'snake':
        setSnakeOpen(true);
        break;

      case 'gallery':
        setGalleryOpen(true);
        break;

      case 'hive':
        // Placeholder: future access.hive feature
        alert('access.hive — connection port under construction.');
        break;

      case 'playground':
        window.location.href = '/playground';
        break;
    }
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
        {/* Command Bay - Full Width, Sticky on Mobile */}
        <div
          className="w-full py-4 px-4 md:py-8 md:px-8 border-b sticky md:static bottom-0 z-50"
          style={{
            borderColor: `${colors.graphite}60`,
            backgroundColor: colors.gunmetal,
          }}
        >
          <div className="max-w-7xl mx-auto">
            <h3
              className="text-xs md:text-sm font-mono font-bold uppercase tracking-wider"
              style={{
                color: colors.aurumGold,
                marginBottom: '12px',
              }}
            >
              {'>'} Command Bay
            </h3>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {COMMANDS.map((cmd) => (
                <button
                  key={cmd.verb}
                  onClick={() => handleCommandClick(cmd)}
                  className="px-2 py-1.5 md:px-3 md:py-2 text-[10px] md:text-xs font-mono border rounded transition-all touch-manipulation"
                  style={{
                    color: colors.electricBlue,
                    borderColor: `${colors.electricBlue}40`,
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${colors.electricBlue}20`;
                    e.currentTarget.style.borderColor = colors.electricBlue;
                    e.currentTarget.style.boxShadow = `0 0 10px ${colors.electricBlue}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = `${colors.electricBlue}40`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  title={cmd.tooltip}
                >
                  {cmd.verb}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="max-w-7xl mx-auto py-12 px-8">
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
                { label: 'Playground', href: '/playground' },
                { label: 'Services', href: '/services' },
                { label: 'About', href: '/about' },
                { label: 'Brand', href: '/brand' },
                { label: 'Signal', href: '/signal' },
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
      </footer>

      {/* Modals */}
      <SnakeModal isOpen={snakeOpen} onClose={() => setSnakeOpen(false)} />
      <GalleryModal isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} />
    </>
  );
}

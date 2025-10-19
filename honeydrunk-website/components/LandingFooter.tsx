'use client';

/**
 * LandingFooter — Site footer with links, social, heartbeat, and reset intro
 */

import Link from 'next/link';
import { motion } from 'framer-motion';
import { colors } from '@/lib/tokens';
import { resetIntro } from './hero/EntryGate';

export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  const handleResetIntro = () => {
    console.log('[Analytics] reset_intro_clicked');
    resetIntro();
  };

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <footer
      className="w-full py-12 px-8 border-t-2"
      style={{
        backgroundColor: colors.gunmetal,
        borderColor: `${colors.electricBlue}30`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Links */}
          <div>
            <h3
              className="text-sm font-mono font-bold uppercase tracking-wider mb-4"
              style={{ color: colors.aurumGold }}
            >
              Navigate
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Nodes', href: '/nodes' },
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
              className="text-sm font-mono font-bold uppercase tracking-wider mb-4"
              style={{ color: colors.aurumGold }}
            >
              Connect
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'X / Twitter', href: 'https://x.com/tatteddev' },
                { label: 'GitHub', href: 'https://github.com/honeydrunkstudios' },
                { label: 'TattedDev Blog', href: 'https://tatteddev.com' },
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
              className="text-sm font-mono font-bold uppercase tracking-wider mb-4"
              style={{ color: colors.aurumGold }}
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
  );
}

'use client';

/**
 * Header — Shared navigation header across all pages
 */

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { colors } from '@/lib/tokens';
import { useIsMobile } from '@/lib/hooks/useIsMobile';

export default function Header() {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/nodes', label: 'GRID', hideOnMobile: true },
    { href: '/services', label: 'SERVICES' },
    { href: '/signal', label: 'SIGNAL' },
    { href: '/brand', label: 'BRAND' },
    { href: '/about', label: 'ABOUT' },
  ];

  return (
    <>
      <header
        className="absolute top-0 left-0 right-0 z-30 border-b-2 backdrop-blur-sm"
        style={{
          borderColor: colors.neonPink,
          backgroundColor: `${colors.deepSpace}95`,
          boxShadow: `0 4px 20px ${colors.neonPink}20`,
        }}
      >
        <div className="w-full px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
          <Link
            href={isMobile ? "/services" : "/"}
            className="flex items-center gap-2 md:gap-3 transition-opacity hover:opacity-80"
          >
            <Image
              src="/honeydrunk.png"
              alt="HoneyDrunk Logo"
              width={40}
              height={40}
              className="w-8 h-8 md:w-10 md:h-10 animate-pulse-glow"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(255, 42, 109, 0.5))',
              }}
            />
            <h1
              className="text-lg md:text-2xl font-mono font-bold uppercase tracking-wider"
              style={{
                color: colors.neonPink,
                textShadow: `0 0 20px ${colors.neonPink}80`,
              }}
            >
              [HONEYDRUNK]
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4 lg:gap-6 text-sm font-mono font-bold uppercase tracking-wider">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link glitch-hover transition-all duration-200 px-3 lg:px-4 py-2 border hover:shadow-[0_0_15px_rgba(255,42,109,0.6)] relative"
                data-text={link.label}
                style={{
                  color: colors.electricBlue,
                  borderColor: `${colors.electricBlue}40`,
                  backgroundColor: `${colors.electricBlue}10`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 border-2 rounded"
            style={{
              borderColor: colors.neonPink,
              backgroundColor: `${colors.neonPink}10`,
            }}
            aria-label="Toggle menu"
          >
            <span
              className="w-5 h-0.5 transition-all"
              style={{
                backgroundColor: colors.neonPink,
                transform: mobileMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
              }}
            />
            <span
              className="w-5 h-0.5 transition-all"
              style={{
                backgroundColor: colors.neonPink,
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              className="w-5 h-0.5 transition-all"
              style={{
                backgroundColor: colors.neonPink,
                transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 md:hidden"
          style={{
            backgroundColor: `${colors.deepSpace}f5`,
            backdropFilter: 'blur(10px)',
            paddingTop: '80px',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <nav className="flex flex-col gap-4 p-6">
            {navLinks
              .filter((link) => !(isMobile && link.hideOnMobile))
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="nav-link transition-all duration-200 px-6 py-4 border text-center font-mono font-bold uppercase tracking-wider text-base"
                  style={{
                    color: colors.electricBlue,
                    borderColor: `${colors.electricBlue}60`,
                    backgroundColor: `${colors.electricBlue}15`,
                    boxShadow: `0 0 20px ${colors.electricBlue}40`,
                  }}
                >
                  {link.label}
                </Link>
              ))}
          </nav>
        </div>
      )}
    </>
  );
}

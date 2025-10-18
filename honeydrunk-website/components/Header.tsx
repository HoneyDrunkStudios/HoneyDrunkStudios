'use client';

/**
 * Header — Shared navigation header across all pages
 */

import Link from 'next/link';
import Image from 'next/image';
import { colors } from '@/lib/tokens';

export default function Header() {
  return (
    <header
      className="absolute top-0 left-0 right-0 z-30 border-b-2 backdrop-blur-sm"
      style={{
        borderColor: colors.neonPink,
        backgroundColor: `${colors.deepSpace}95`,
        boxShadow: `0 4px 20px ${colors.neonPink}20`,
      }}
    >
      <div className="w-full px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Image 
            src="/honeydrunk.png" 
            alt="HoneyDrunk Logo" 
            width={40}
            height={40}
            className="w-10 h-10"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(255, 42, 109, 0.5))',
            }}
          />
          <h1
            className="text-2xl font-mono font-bold uppercase tracking-wider"
            style={{
              color: colors.neonPink,
              textShadow: `0 0 20px ${colors.neonPink}80`,
            }}
          >
            [HONEYDRUNK]
          </h1>
        </Link>

        <nav className="flex gap-6 text-sm font-mono font-bold uppercase tracking-wider">
          <Link
            href="/nodes"
            className="transition-all px-4 py-2 border"
            style={{
              color: colors.electricBlue,
              borderColor: `${colors.electricBlue}40`,
              backgroundColor: `${colors.electricBlue}10`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.neonPink;
              e.currentTarget.style.borderColor = colors.neonPink;
              e.currentTarget.style.backgroundColor = `${colors.neonPink}20`;
              e.currentTarget.style.boxShadow = `0 0 15px ${colors.neonPink}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.electricBlue;
              e.currentTarget.style.borderColor = `${colors.electricBlue}40`;
              e.currentTarget.style.backgroundColor = `${colors.electricBlue}10`;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            GRID
          </Link>
          <Link
            href="/signal"
            className="transition-all px-4 py-2 border"
            style={{
              color: colors.electricBlue,
              borderColor: `${colors.electricBlue}40`,
              backgroundColor: `${colors.electricBlue}10`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.neonPink;
              e.currentTarget.style.borderColor = colors.neonPink;
              e.currentTarget.style.backgroundColor = `${colors.neonPink}20`;
              e.currentTarget.style.boxShadow = `0 0 15px ${colors.neonPink}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.electricBlue;
              e.currentTarget.style.borderColor = `${colors.electricBlue}40`;
              e.currentTarget.style.backgroundColor = `${colors.electricBlue}10`;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            SIGNAL
          </Link>
          <Link
            href="/brand"
            className="transition-all px-4 py-2 border"
            style={{
              color: colors.electricBlue,
              borderColor: `${colors.electricBlue}40`,
              backgroundColor: `${colors.electricBlue}10`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.neonPink;
              e.currentTarget.style.borderColor = colors.neonPink;
              e.currentTarget.style.backgroundColor = `${colors.neonPink}20`;
              e.currentTarget.style.boxShadow = `0 0 15px ${colors.neonPink}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.electricBlue;
              e.currentTarget.style.borderColor = `${colors.electricBlue}40`;
              e.currentTarget.style.backgroundColor = `${colors.electricBlue}10`;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            BRAND
          </Link>
          <Link
            href="/about"
            className="transition-all px-4 py-2 border"
            style={{
              color: colors.electricBlue,
              borderColor: `${colors.electricBlue}40`,
              backgroundColor: `${colors.electricBlue}10`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.neonPink;
              e.currentTarget.style.borderColor = colors.neonPink;
              e.currentTarget.style.backgroundColor = `${colors.neonPink}20`;
              e.currentTarget.style.boxShadow = `0 0 15px ${colors.neonPink}60`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.electricBlue;
              e.currentTarget.style.borderColor = `${colors.electricBlue}40`;
              e.currentTarget.style.backgroundColor = `${colors.electricBlue}10`;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            ABOUT
          </Link>
        </nav>
      </div>
    </header>
  );
}

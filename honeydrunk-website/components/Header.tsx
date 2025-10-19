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
            className="nav-link transition-all duration-200 px-4 py-2 border hover:shadow-[0_0_15px_rgba(255,42,109,0.6)]"
            style={{
              color: colors.electricBlue,
              borderColor: `${colors.electricBlue}40`,
              backgroundColor: `${colors.electricBlue}10`,
            }}
          >
            GRID
          </Link>
          <Link 
            href="/services" 
            className="nav-link transition-all duration-200 px-4 py-2 border hover:shadow-[0_0_15px_rgba(255,42,109,0.6)]"
            style={{
              color: colors.electricBlue,
              borderColor: `${colors.electricBlue}40`,
              backgroundColor: `${colors.electricBlue}10`,
            }}
          >
            SERVICES
          </Link>
          <Link 
            href="/signal" 
            className="nav-link transition-all duration-200 px-4 py-2 border hover:shadow-[0_0_15px_rgba(255,42,109,0.6)]"
            style={{
              color: colors.electricBlue,
              borderColor: `${colors.electricBlue}40`,
              backgroundColor: `${colors.electricBlue}10`,
            }}
          >
            SIGNAL
          </Link>
          <Link 
            href="/brand" 
            className="nav-link transition-all duration-200 px-4 py-2 border hover:shadow-[0_0_15px_rgba(255,42,109,0.6)]"
            style={{
              color: colors.electricBlue,
              borderColor: `${colors.electricBlue}40`,
              backgroundColor: `${colors.electricBlue}10`,
            }}
          >
            BRAND
          </Link>
          <Link 
            href="/about" 
            className="nav-link transition-all duration-200 px-4 py-2 border hover:shadow-[0_0_15px_rgba(255,42,109,0.6)]"
            style={{
              color: colors.electricBlue,
              borderColor: `${colors.electricBlue}40`,
              backgroundColor: `${colors.electricBlue}10`,
            }}
          >
            ABOUT
          </Link>
        </nav>
      </div>
    </header>
  );
}

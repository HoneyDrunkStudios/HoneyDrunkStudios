'use client';

/**
 * Spotlight Hub Page
 * Central showcase for all major systems
 */

import Link from 'next/link';
import { colors } from '@/lib/tokens';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';

const spotlightSystems = [
  {
    id: 'honeyplay',
    title: 'HoneyPlay',
    tagline: 'Stories wired to the soul.',
    subtext: 'Tools for building worlds — and the worlds themselves.',
    signal: 'Seed',
    signalColor: colors.slateLight,
    accentColor: colors.neonPink,
    cta: 'Explore System',
    href: '/spotlight/honeyplay',
  },
  {
    id: 'cyberware',
    title: 'Cyberware',
    tagline: 'Form meets function.',
    subtext: 'Embodied agents and simulation — from neon couriers to real servos.',
    signal: 'Seed',
    signalColor: colors.slateLight,
    accentColor: colors.electricBlue,
    cta: 'Peek Into the Lab',
    href: '/spotlight/cyberware',
  },
];

export default function SpotlightHub() {
  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: colors.deepSpace }}>
      <Header />
      
      <div className="pt-24">
        {/* Hero Section */}
        <section className="w-full py-20 px-8" style={{ backgroundColor: colors.deepSpace }}>
          <div className="max-w-5xl mx-auto text-center">
            <h1
              className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight"
              style={{
                color: colors.aurumGold,
                textShadow: `
                  0 0 60px ${colors.aurumGold}FF,
                  0 0 40px ${colors.aurumGold}CC,
                  0 0 20px ${colors.aurumGold}80,
                  0 2px 8px rgba(0,0,0,0.8)
                `,
                marginBottom: '32px',
              }}
            >
              Spotlight Systems
            </h1>
            
            <p
              className="text-xl md:text-2xl font-mono font-bold"
              style={{ 
                color: colors.offWhite,
                marginBottom: '24px',
              }}
            >
              Where the Grid's experiments become experiences.
            </p>
            
            <div className="max-w-3xl mx-auto space-y-4" style={{ color: colors.slateLight }}>
              <p className="text-base md:text-lg">
                Each Spotlight is a living system — a Node evolving in public.
              </p>
              <p className="text-base md:text-lg">
                Games, tools, and cyberware built from the same DNA.
              </p>
            </div>
          </div>
        </section>

        {/* Spotlight Grid */}
        <section className="w-full py-16 px-8" style={{ backgroundColor: colors.gunmetal }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {spotlightSystems.map((system) => (
                <SpotlightCard key={system.id} {...system} />
              ))}
            </div>
          </div>
        </section>

        {/* Closing Section */}
        <section className="w-full py-16 px-8" style={{ backgroundColor: colors.deepSpace }}>
          <div className="max-w-4xl mx-auto text-center">
            <p
              className="text-lg md:text-xl font-mono"
              style={{ 
                color: colors.slateLight,
                marginBottom: '16px',
              }}
            >
              New Spotlights will activate as the Hive evolves.
            </p>
            <p
              className="text-sm md:text-base font-mono font-bold"
              style={{ 
                color: colors.offWhite,
                marginBottom: '32px',
              }}
            >
              Boot. Build. Refactor. Evolve.
            </p>
            
            <Link
              href="https://x.com/HoneyDrunkLab"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono font-bold text-sm uppercase tracking-wider px-8 py-4 border-2 transition-all duration-200 hover:scale-105"
              style={{
                color: colors.violetCore,
                borderColor: colors.violetCore,
                backgroundColor: `${colors.violetCore}15`,
                boxShadow: `0 0 30px ${colors.violetCore}40`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.violetCore}25`;
                e.currentTarget.style.boxShadow = `0 0 40px ${colors.violetCore}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.violetCore}15`;
                e.currentTarget.style.boxShadow = `0 0 30px ${colors.violetCore}40`;
              }}
              onClick={() => console.log('[Analytics] hub_follow_signal')}
            >
              Follow the Signal →
            </Link>
          </div>
        </section>
      </div>

      <LandingFooter />
    </div>
  );
}

function SpotlightCard({
  title,
  tagline,
  subtext,
  signal,
  signalColor,
  accentColor,
  cta,
  href,
}: {
  title: string;
  tagline: string;
  subtext: string;
  signal: string;
  signalColor: string;
  accentColor: string;
  cta: string;
  href: string;
}) {
  return (
    <div
      className="relative p-8 md:p-10 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-[1.02] group"
      style={{
        backgroundColor: `${colors.gunmetal}95`,
        borderColor: `${accentColor}40`,
        boxShadow: `0 0 30px ${accentColor}20`,
        clipPath:
          'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentColor;
        e.currentTarget.style.boxShadow = `0 0 40px ${accentColor}35`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${accentColor}40`;
        e.currentTarget.style.boxShadow = `0 0 30px ${accentColor}20`;
      }}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 left-0 w-20 h-20 opacity-20"
        style={{
          background: `radial-gradient(circle at top left, ${accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Signal badge */}
      <div className="mb-4">
        <span
          className="text-xs font-mono font-bold uppercase px-3 py-1 border"
          style={{
            color: signalColor,
            borderColor: signalColor,
            backgroundColor: `${signalColor}15`,
          }}
        >
          Signal: {signal}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-3xl md:text-4xl font-display font-bold mb-2"
        style={{
          color: accentColor,
          textShadow: `0 0 20px ${accentColor}60`,
        }}
      >
        {title}
      </h3>

      {/* Tagline */}
      <p
        className="text-lg md:text-xl font-mono font-bold mb-4 italic"
        style={{ color: colors.offWhite }}
      >
        {tagline}
      </p>

      {/* Subtext */}
      <p
        className="text-sm md:text-base leading-relaxed"
        style={{ color: colors.slateLight, marginBottom: '40px' }}
      >
        {subtext}
      </p>

      {/* CTA */}
      <Link
        href={href}
        className="inline-block font-mono font-bold text-sm uppercase tracking-wider px-6 py-3 border-2 transition-all duration-200 hover:scale-105"
        style={{
          color: accentColor,
          borderColor: accentColor,
          backgroundColor: `${accentColor}15`,
          boxShadow: `0 0 20px ${accentColor}30`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = `${accentColor}25`;
          e.currentTarget.style.boxShadow = `0 0 30px ${accentColor}50`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = `${accentColor}15`;
          e.currentTarget.style.boxShadow = `0 0 20px ${accentColor}30`;
        }}
        onClick={() => console.log(`[Analytics] hub_to_${href.split('/').pop()}`)}
      >
        {cta} →
      </Link>

      {/* Bottom-right corner accent */}
      <div
        className="absolute bottom-0 right-0 w-24 h-24 opacity-15"
        style={{
          background: `radial-gradient(circle at bottom right, ${accentColor} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}

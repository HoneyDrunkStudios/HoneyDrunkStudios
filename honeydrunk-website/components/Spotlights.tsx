'use client';

/**
 * Spotlights — HoneyPlay & HoneyMech feature panels
 * Side-by-side on desktop, stacked on mobile
 */

import Link from 'next/link';
import { colors } from '@/lib/tokens';

const spotlights = [
  {
    title: 'HoneyPlay',
    tagline: 'Stories wired to the soul.',
    description:
      'We build tools that build worlds — and the worlds themselves.',
    cta: 'See the vision',
    href: '/nodes?sector=Play',
    accent: colors.neonPink,
  },
  {
    title: 'HoneyMech',
    tagline: 'Form meets function.',
    description:
      'Embodied agents and simulation. From neon couriers to real servos.',
    cta: 'Peek into the lab',
    href: '/nodes?sector=Mech',
    accent: colors.electricBlue,
  },
];

export default function Spotlights() {
  return (
    <section className="w-full py-20 px-8" style={{ backgroundColor: colors.deepSpace }}>
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-display font-bold text-center mb-12 uppercase tracking-wide"
          style={{
            color: colors.aurumGold,
            textShadow: `0 0 20px ${colors.aurumGold}60`,
          }}
        >
          Spotlight Systems
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {spotlights.map((spotlight, index) => (
            <SpotlightPanel key={index} {...spotlight} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpotlightPanel({
  title,
  tagline,
  description,
  cta,
  href,
  accent,
}: {
  title: string;
  tagline: string;
  description: string;
  cta: string;
  href: string;
  accent: string;
}) {
  return (
    <div
      className="relative p-8 md:p-10 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-[1.02] group"
      style={{
        backgroundColor: `${colors.gunmetal}95`,
        borderColor: `${accent}40`,
        boxShadow: `0 0 30px ${accent}20`,
        clipPath:
          'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accent;
        e.currentTarget.style.boxShadow = `0 0 40px ${accent}35`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${accent}40`;
        e.currentTarget.style.boxShadow = `0 0 30px ${accent}20`;
      }}
    >
      {/* Corner accent */}
      <div
        className="absolute top-0 left-0 w-20 h-20 opacity-20"
        style={{
          background: `radial-gradient(circle at top left, ${accent} 0%, transparent 70%)`,
        }}
      />

      {/* Title */}
      <h3
        className="text-3xl md:text-4xl font-display font-bold mb-2"
        style={{
          color: accent,
          textShadow: `0 0 20px ${accent}60`,
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

      {/* Description */}
      <p
        className="text-sm md:text-base leading-relaxed mb-6"
        style={{ color: colors.slateLight }}
      >
        {description}
      </p>

      {/* CTA */}
      <Link
        href={href}
        className="inline-block font-mono font-bold text-sm uppercase tracking-wider px-6 py-3 border-2 transition-all duration-200 hover:scale-105"
        style={{
          color: accent,
          borderColor: accent,
          backgroundColor: `${accent}15`,
          boxShadow: `0 0 20px ${accent}30`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = `${accent}25`;
          e.currentTarget.style.boxShadow = `0 0 30px ${accent}50`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = `${accent}15`;
          e.currentTarget.style.boxShadow = `0 0 20px ${accent}30`;
        }}
      >
        {cta} →
      </Link>

      {/* Bottom-right corner accent */}
      <div
        className="absolute bottom-0 right-0 w-24 h-24 opacity-15"
        style={{
          background: `radial-gradient(circle at bottom right, ${accent} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}

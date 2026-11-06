/**
 * CtaBand — Links to studio updates and the Grid
 */

import Link from 'next/link';
import { colors } from '@/lib/tokens';

export default function CtaBand() {
  return (
    <section
      className="w-full py-20 px-8"
      style={{
        backgroundColor: colors.deepSpace,
        borderTop: `2px solid ${colors.aurumGold}30`,
        borderBottom: `2px solid ${colors.aurumGold}30`,
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wide"
          style={{
            color: colors.aurumGold,
            textShadow: `0 0 20px ${colors.aurumGold}60`,
            marginBottom: '16px',
          }}
        >
          Boot. Build. Refactor. Evolve.
        </h2>

        <p
          className="text-sm md:text-base font-mono"
          style={{ color: colors.slateLight, marginBottom: '24px' }}
        >
          Follow the apps, games and worlds taking shape at the studio.
        </p>

        <Link
          href="/signal"
          className="inline-block mb-6 px-6 py-3 border-2 font-mono text-sm uppercase tracking-wider hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{ color: colors.aurumGold, borderColor: colors.aurumGold }}
        >
          Read studio updates →
        </Link>

        {/* Secondary CTA */}
        <Link
          href="/grid"
          className="block w-fit mx-auto font-mono text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105"
          style={{
            color: colors.electricBlue,
          }}
        >
          Explore the Grid →
        </Link>
      </div>
    </section>
  );
}

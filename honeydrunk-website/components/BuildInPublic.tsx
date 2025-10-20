'use client';

/**
 * BuildInPublic — Devlog + Social feed
 * Left: Latest devlog, Right: X/Social link
 */

import Link from 'next/link';
import { colors } from '@/lib/tokens';

export default function BuildInPublic() {
  return (
    <section className="w-full py-20 px-8" style={{ backgroundColor: colors.gunmetal }}>
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-display font-bold text-center uppercase tracking-wide"
          style={{
            color: colors.violetFlux,
            textShadow: `0 0 20px ${colors.violetFlux}60`,
            marginBottom: '60px',
          }}
        >
          Build-in-Public
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Devlog */}
          <div
            className="p-8 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: `${colors.deepSpace}90`,
              borderColor: `${colors.aurumGold}40`,
              boxShadow: `0 0 25px ${colors.aurumGold}20`,
              clipPath:
                'polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.aurumGold;
              e.currentTarget.style.boxShadow = `0 0 35px ${colors.aurumGold}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${colors.aurumGold}40`;
              e.currentTarget.style.boxShadow = `0 0 25px ${colors.aurumGold}20`;
            }}
          >
            <h3
              className="text-xl font-display font-bold mb-3"
              style={{
                color: colors.aurumGold,
                textShadow: `0 0 15px ${colors.aurumGold}60`,
              }}
            >
              Latest from the Lab
            </h3>

            <p
              className="text-sm font-mono leading-relaxed"
              style={{ color: colors.slateLight, marginBottom: '32px' }}
            >
              Follow the journey as we architect, refactor, and evolve the Grid. Every node tells a story.
            </p>

            <Link
              href="https://tatteddev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono font-bold text-sm uppercase tracking-wider px-6 py-3 border-2 transition-all duration-200 hover:scale-105"
              style={{
                color: colors.aurumGold,
                borderColor: colors.aurumGold,
                backgroundColor: `${colors.aurumGold}15`,
                boxShadow: `0 0 20px ${colors.aurumGold}30`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.aurumGold}25`;
                e.currentTarget.style.boxShadow = `0 0 30px ${colors.aurumGold}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.aurumGold}15`;
                e.currentTarget.style.boxShadow = `0 0 20px ${colors.aurumGold}30`;
              }}
            >
              Read the devlog →
            </Link>
          </div>

          {/* Social / X */}
          <div
            className="p-8 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: `${colors.deepSpace}90`,
              borderColor: `${colors.electricBlue}40`,
              boxShadow: `0 0 25px ${colors.electricBlue}20`,
              clipPath:
                'polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.electricBlue;
              e.currentTarget.style.boxShadow = `0 0 35px ${colors.electricBlue}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${colors.electricBlue}40`;
              e.currentTarget.style.boxShadow = `0 0 25px ${colors.electricBlue}20`;
            }}
          >
            <h3
              className="text-xl font-display font-bold mb-3"
              style={{
                color: colors.electricBlue,
                textShadow: `0 0 15px ${colors.electricBlue}60`,
              }}
            >
              Follow the Signal
            </h3>

            <p
              className="text-sm font-mono leading-relaxed"
              style={{ color: colors.slateLight, marginBottom: '32px' }}
            >
              Real-time updates, insights, and behind-the-scenes from the grid. Join the conversation.
            </p>

            <Link
              href="https://x.com/tatteddev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono font-bold text-sm uppercase tracking-wider px-6 py-3 border-2 transition-all duration-200 hover:scale-105"
              style={{
                color: colors.electricBlue,
                borderColor: colors.electricBlue,
                backgroundColor: `${colors.electricBlue}15`,
                boxShadow: `0 0 20px ${colors.electricBlue}30`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.electricBlue}25`;
                e.currentTarget.style.boxShadow = `0 0 30px ${colors.electricBlue}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.electricBlue}15`;
                e.currentTarget.style.boxShadow = `0 0 20px ${colors.electricBlue}30`;
              }}
            >
              Follow on X →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

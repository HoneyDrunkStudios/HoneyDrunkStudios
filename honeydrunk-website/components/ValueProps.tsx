'use client';

/**
 * ValueProps — "Why the Grid" value proposition cards
 * Desktop: 3-up grid, Mobile: stack
 */

import { colors } from '@/lib/tokens';

const props = [
  {
    title: 'Enterprise spine. Indie heart.',
    description:
      'Disciplined architecture, handcrafted feel. Build once. Reuse everywhere.',
    accent: colors.violetFlux,
  },
  {
    title: 'Build in Public',
    description:
      'Every Node ships with devlogs, visuals, and lessons.\nTransparency isn\'t marketing — it\'s the message.',
    accent: colors.aurumGold,
  },
  {
    title: 'Agentic by Design',
    description:
      'From observability to robotics, agents amplify the creator.\nAutomation with intention. Intelligence with soul.',
    accent: colors.electricBlue,
  },
  {
    title: 'Cost-Disciplined',
    description:
      'Serverless first. Free tiers when possible.\nZero-bloat is a directive, not a preference.',
    accent: colors.signalGreen,
  },
];

export default function ValueProps() {
  return (
    <section className="w-full py-12 px-12" style={{ backgroundColor: colors.deepSpace }}>
      <div className="max-w-[1600px] mx-auto">
        <h2
          className="text-3xl md:text-4xl font-display font-bold text-center uppercase tracking-wide"
          style={{
            color: colors.aurumGold,
            textShadow: `0 0 20px ${colors.aurumGold}60`,
            marginBottom: '60px',
          }}
        >
          Why the Grid
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">
          {props.map((prop, index) => (
            <ValuePropCard key={index} {...prop} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuePropCard({
  title,
  description,
  accent,
}: {
  title: string;
  description: string;
  accent: string;
}) {
  return (
    <div
      className="relative p-6 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 group cursor-default"
      style={{
        backgroundColor: `${colors.gunmetal}90`,
        borderColor: `${accent}40`,
        boxShadow: `0 0 20px ${accent}20`,
        clipPath:
          'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accent;
        e.currentTarget.style.boxShadow = `0 0 30px ${accent}40`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${accent}40`;
        e.currentTarget.style.boxShadow = `0 0 20px ${accent}20`;
      }}
    >
      {/* Accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
        style={{
          background: `linear-gradient(90deg, ${accent} 0%, transparent 100%)`,
          opacity: 0.6,
        }}
      />

      <h3
        className="text-xl font-display font-bold mb-3 group-hover:text-shadow-glow transition-all"
        style={{
          color: accent,
        }}
      >
        {title}
      </h3>

      <p
        className="text-sm leading-relaxed font-mono whitespace-pre-line"
        style={{
          color: colors.slateLight,
        }}
      >
        {description}
      </p>

      {/* Bottom-right corner accent */}
      <div
        className="absolute bottom-0 right-0 w-12 h-12 opacity-30"
        style={{
          background: `radial-gradient(circle at bottom right, ${accent} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}

import Header from '@/components/Header';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import { colors } from '@/lib/tokens';

export const metadata = {
  title: 'Signal — HoneyDrunk Studios',
  description: 'Devlog and changelog for HoneyDrunk Studios projects.',
};

export default function SignalPage() {
  // In production, this would pull from commits/releases
  const signals = [
    {
      date: '2025-10-18',
      title: 'The Grid v1.0 — Initial Launch',
      desc: 'Launched The Grid: interactive node visualization with neon cyberpunk aesthetics. Featured 10 initial nodes across Core, Ops, Creator, Life, Play, and Meta sectors.',
      tags: ['launch', 'grid', 'core'],
    },
    {
      date: '2025-10-17',
      title: 'Signal System Implementation',
      desc: 'Implemented the Signal state system for tracking node lifecycle: Seed → Awake → Wiring → Live → Echo → Archive. Each state has distinct visual characteristics.',
      tags: ['feature', 'visualization'],
    },
    {
      date: '2025-10-16',
      title: 'Brand System Finalized',
      desc: 'Locked in the cyberpunk realism color palette: Aurum Gold, Electric Blue, Violet Core against Deep Space. Zero-bloat typography with Space Grotesk, Inter, and JetBrains Mono.',
      tags: ['brand', 'design'],
    },
  ];

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: colors.deepSpace, color: colors.offWhite }}>
      {/* Background */}
      <div className="fixed inset-0">
        <NeonGridCanvas particleCount={100} enableMotion={true} />
      </div>

      {/* Header */}
      <Header />

      {/* Content */}
      <div className="relative z-10 pt-20 md:pt-32 px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-3xl mx-auto space-y-10 md:space-y-16">
          {/* Page Title */}
          <header className="space-y-4 md:space-y-6">
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold py-2 md:py-4 holographic-text"
          >
            Signal Feed
          </h1>
          <p className="text-base md:text-lg px-1 md:px-2" style={{ color: colors.slateLight }}>
            Build-in-public devlog. Every commit tells a story.
          </p>
        </header>

        {/* Signal Feed */}
        <div className="space-y-6 md:space-y-8">
          {signals.map((signal, index) => (
            <article
              key={index}
              className="p-5 md:p-8 rounded-lg border"
              style={{
                backgroundColor: `${colors.gunmetal}60`,
                borderColor: `${colors.slateLight}30`,
              }}
            >
              <div
                className="text-xs font-mono mb-2 md:mb-3"
                style={{ color: colors.slateLight }}
              >
                {signal.date}
              </div>

              <h2 className="text-xl md:text-2xl font-display font-bold mb-3">
                {signal.title}
              </h2>

              <p className="mb-4 text-sm md:text-base leading-relaxed" style={{ color: colors.slateLight }}>
                {signal.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {signal.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-mono"
                    style={{
                      backgroundColor: `${colors.electricBlue}20`,
                      borderWidth: '1px',
                      borderColor: colors.electricBlue,
                      color: colors.electricBlue,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Coming Soon */}
        <div
          className="p-5 md:p-6 rounded-lg border text-center"
          style={{
            backgroundColor: `${colors.gunmetal}40`,
            borderColor: `${colors.slateLight}20`,
          }}
        >
          <p className="text-sm md:text-base" style={{ color: colors.slateLight }}>
            More signals incoming. Subscribe to stay updated.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}

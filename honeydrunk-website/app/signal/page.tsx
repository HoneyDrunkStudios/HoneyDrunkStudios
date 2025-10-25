'use client';

import { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import { colors } from '@/lib/tokens';

function SignalContent() {
  const searchParams = useSearchParams();
  const sectorFilter = searchParams.get('sector');

  // In production, this would pull from commits/releases
  const signals = [
    {
      date: '2025-10-24',
      title: 'Flow Index System — Living Roadmap',
      desc: 'Implemented complete Flow Index system: Flow = (Energy × 0.4) + (Priority × 0.6). Five-tier classification (Critical/Active/Stable/Dormant/Archived). Flow-based visual mode in Grid with dynamic glow intensity. New /flow page with sortable rankings, /about/flow documentation, Flow Tier filtering in /nodes, and global header navigation. The Hive now breathes—showing what needs attention next.',
      tags: ['feature', 'grid', 'core', 'ux'],
      sector: 'Core',
    },
    {
      date: '2025-10-24',
      title: 'Grid Enhancements — Color, Copy, and Scale',
      desc: 'Sector color expansion (Chrome Teal for Mech, Synth Magenta for AI). Copy refinement across landing pages—cyberpunk minimalism, em-dash rhythm. Expanded to 43 Nodes across 8 sectors (AgentKit, Signal, Data, Grid orchestration).',
      tags: ['brand', 'design', 'grid', 'content'],
      sector: 'Core',
    },
    {
      date: '2025-10-18',
      title: 'The Grid v1.0 — Initial Launch',
      desc: 'Launched The Grid: interactive node visualization with neon cyberpunk aesthetics. Featured nodes across Core, Ops, Creator, Life, Play, Mech, and Meta sectors.',
      tags: ['launch', 'grid', 'core'],
      sector: 'Core',
    },
    {
      date: '2025-10-17',
      title: 'Signal System Implementation',
      desc: 'Implemented the Signal state system for tracking node lifecycle: Seed → Awake → Wiring → Live → Echo → Archive. Each state has distinct visual characteristics.',
      tags: ['feature', 'visualization'],
      sector: 'Core',
    },
    {
      date: '2025-10-16',
      title: 'Brand System Finalized',
      desc: 'Locked in the cyberpunk realism color palette: Aurum Gold, Electric Blue, Violet Flux against Deep Space. Zero-bloat typography with Space Grotesk, Inter, and JetBrains Mono.',
      tags: ['brand', 'design'],
      sector: 'Core',
    },
  ];

  // Filter signals by sector if parameter is provided
  const filteredSignals = useMemo(() => {
    if (!sectorFilter) return signals;
    return signals.filter(signal => signal.sector === sectorFilter);
  }, [sectorFilter]);

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
            Signal Feed {sectorFilter && `— ${sectorFilter}`}
          </h1>
          <p className="text-base md:text-lg px-1 md:px-2" style={{ color: colors.slateLight }}>
            Real-time updates from the Grid. Every Node tells a story.
          </p>
        </header>

        {/* Signal Feed */}
        <div className="space-y-6 md:space-y-8">
          {filteredSignals.length > 0 ? (
            filteredSignals.map((signal, index) => (
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
                style={{ color: colors.aurumGold }}
              >
                {signal.date}
              </div>

              <h2 className="text-xl md:text-2xl font-display font-bold mb-3">
                {signal.title}
              </h2>

              <p className="text-sm md:text-base leading-relaxed" style={{ color: colors.slateLight, marginBottom: '24px' }}>
                {signal.desc}
              </p>

              <div className="flex flex-wrap gap-2 md:gap-3">
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
          ))
          ) : (
            <div
              className="p-5 md:p-8 rounded-lg border text-center"
              style={{
                backgroundColor: `${colors.gunmetal}60`,
                borderColor: `${colors.slateLight}30`,
              }}
            >
              <p className="text-base md:text-lg" style={{ color: colors.slateLight }}>
                No signals found for {sectorFilter}. Check back soon.
              </p>
            </div>
          )}
        </div>

        {/* Coming Soon */}
        <div
          className="p-5 md:p-6 rounded-lg border text-center"
          style={{
            backgroundColor: `${colors.gunmetal}40`,
            borderColor: `${colors.slateLight}20`,
          }}
        >
          <p className="text-sm md:text-base font-mono" style={{ color: colors.slateLight }}>
            More signals incoming. Follow <a href="https://x.com/HoneyDrunkLab" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline" style={{ color: colors.electricBlue }}>@HoneyDrunkLab</a> for real-time updates.
          </p>
        </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <LandingFooter />
      </div>
    </div>
  );
}

export default function SignalPage() {
  return (
    <Suspense fallback={
      <div className="relative min-h-screen" style={{ backgroundColor: colors.deepSpace, color: colors.offWhite }}>
        <div className="fixed inset-0">
          <NeonGridCanvas particleCount={100} enableMotion={true} />
        </div>
        <Header />
        <div className="relative z-10 pt-20 md:pt-32 px-4 md:px-8 lg:px-16 pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg font-mono" style={{ color: colors.slateLight }}>Loading signal feed...</p>
          </div>
        </div>
      </div>
    }>
      <SignalContent />
    </Suspense>
  );
}

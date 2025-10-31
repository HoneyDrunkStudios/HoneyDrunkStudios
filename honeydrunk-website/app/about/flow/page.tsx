'use client';

/**
 * /about/flow — Documentation for the Flow Index System
 * Explains Energy, Priority, and how Flow drives the living roadmap
 */

import Link from 'next/link';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import { colors } from '@/lib/tokens';
import { flowTierDefinitions } from '@/lib/nodes';

export default function AboutFlowPage() {
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
        <div className="max-w-4xl mx-auto space-y-10 md:space-y-12">
          {/* Page Title */}
          <header className="space-y-4 md:space-y-6 text-center md:text-left">
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold py-2 md:py-4 holographic-text"
            >
              Understanding Flow
            </h1>
            <p className="text-base md:text-lg px-1 md:px-2" style={{ color: colors.slateLight }}>
              The mathematics behind HoneyDrunk's living roadmap
            </p>
          </header>

          {/* The Formula */}
          <section
            className="p-8 rounded-lg border-2"
            style={{
              backgroundColor: `${colors.gunmetal}90`,
              borderColor: colors.aurumGold,
              boxShadow: `0 0 30px ${colors.aurumGold}20`,
            }}
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold" style={{ color: colors.aurumGold, marginBottom: '24px' }}>
              The Flow Index Formula
            </h2>
            <div
              className="text-center p-6 rounded-lg mb-6 font-mono text-xl md:text-2xl font-bold"
              style={{
                backgroundColor: `${colors.deepSpace}80`,
                color: colors.electricBlue,
              }}
            >
              Flow = (Energy × 0.35) + (Priority × 0.65)
            </div>
            <p className="text-base leading-relaxed" style={{ color: colors.slateLight }}>
              Flow Index is a weighted combination of two metrics that tells us{' '}
              <span className="font-bold" style={{ color: colors.offWhite }}>
                what needs attention next
              </span>
              . It's not a backlog—it's The Hive breathing, showing where energy flows naturally. Computed server-side with guardrails that respect dependencies and strategic priorities.
            </p>
          </section>

          {/* Energy */}
          <section className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-display font-bold" style={{ color: colors.electricBlue, marginBottom: '16px' }}>
              Energy (35% weight)
            </h2>
            <div
              className="p-6 rounded-lg border"
              style={{
                backgroundColor: `${colors.gunmetal}80`,
                borderColor: `${colors.electricBlue}40`,
              }}
            >
              <p className="text-base leading-relaxed mb-4" style={{ color: colors.slateLight }}>
                Energy measures <span className="font-bold" style={{ color: colors.offWhite }}>how ready and active</span> a node is:
              </p>
              <ul className="space-y-2 text-sm list-disc list-inside" style={{ color: colors.slateLight }}>
                <li><strong>Signal baseline:</strong> Live (90), Wiring (75), Awake (60), Echo (50), Seed (30)</li>
                <li><strong>Usage bump:</strong> +10 max based on how many nodes depend on it</li>
                <li><strong>Cooldown:</strong> ×0.8 if marked done or in Echo state</li>
                <li>Normalized 0–100 across all nodes</li>
              </ul>
              <div className="mt-4 p-4 rounded" style={{ backgroundColor: `${colors.deepSpace}60` }}>
                <p className="text-sm font-mono" style={{ color: colors.electricBlue }}>
                  <span className="font-bold">Example:</span> A Wiring node with 8 dependents would score ~85 raw energy (75 + 8), then get normalized to 0–100 range.
                </p>
              </div>
            </div>
          </section>

          {/* Priority */}
          <section className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-display font-bold" style={{ color: colors.violetCore, marginBottom: '16px' }}>
              Priority (65% weight)
            </h2>
            <div
              className="p-6 rounded-lg border"
              style={{
                backgroundColor: `${colors.gunmetal}80`,
                borderColor: `${colors.violetCore}40`,
              }}
            >
              <p className="text-base leading-relaxed mb-4" style={{ color: colors.slateLight }}>
                Priority measures <span className="font-bold" style={{ color: colors.offWhite }}>strategic impact</span> with multiple layers:
              </p>
              <ul className="space-y-2 text-sm list-disc list-inside" style={{ color: colors.slateLight }}>
                <li><strong>Sector weight:</strong> Core (1.6×), Transport (1.4×), Web.Rest (1.4×), Ops (1.25×), AI/Agents (1.15×)</li>
                <li><strong>Centrality:</strong> ln(1 + dependents) — nodes that unlock many others score higher</li>
                <li><strong>Stage score:</strong> Wiring (14), Awake (8), Live (6), Echo (2), Seed (0)</li>
                <li><strong>Tier boost:</strong> Platform (+8), Prod-Critical (+6), Internal (+4)</li>
                <li><strong>Time pressure:</strong> Manual urgency dial (0–10)</li>
                <li><strong>Guardrails:</strong> Foundational floor, ancestor override (parents ≥ children - 5)</li>
              </ul>
              <div className="mt-4 p-4 rounded" style={{ backgroundColor: `${colors.deepSpace}60` }}>
                <p className="text-sm font-mono" style={{ color: colors.violetCore }}>
                  <span className="font-bold">Example:</span> HoneyDrunk.Kernel (Core sector, 5 dependents, Wiring stage) scores 100 Priority—it's foundational and unlocks everything else.
                </p>
              </div>
            </div>
          </section>

          {/* Why the 35/65 split? */}
          <section
            className="p-6 rounded-lg border"
            style={{
              backgroundColor: `${colors.gunmetal}80`,
              borderColor: `${colors.slateLight}30`,
            }}
          >
            <h3 className="text-xl font-display font-bold" style={{ color: colors.offWhite, marginBottom: '16px' }}>
              Why 35% Energy / 65% Priority?
            </h3>
            <p className="text-base leading-relaxed" style={{ color: colors.slateLight }}>
              Priority gets the stronger weight because{' '}
              <span className="font-bold" style={{ color: colors.offWhite }}>
                strategic impact outlasts momentum
              </span>
              . A high-energy project can fade; a high-priority foundation stays critical. The 65/35 split ensures we follow the path of least resistance (Energy) <em>while prioritizing</em> the path that matters most (Priority).
            </p>
          </section>

          {/* Flow Tiers */}
          <section className="space-y-6 text-center md:text-left">
            <h2 className="text-2xl font-display font-bold" style={{ color: colors.aurumGold, marginBottom: '16px' }}>
              Flow Tiers
            </h2>
            <p className="text-base leading-relaxed" style={{ color: colors.slateLight, marginBottom: '24px' }}>
              Every node is assigned a Flow Tier based on its Flow Index score. This creates visual hierarchy and tells you at a glance what needs attention.
            </p>

            {/* Tier Cards */}
            <div className="space-y-4">
              {flowTierDefinitions.map(({ label, range, color, description }) => (
                <div
                  key={label}
                  className="p-5 rounded-lg border-2"
                  style={{
                    backgroundColor: `${color}10`,
                    borderColor: `${color}40`,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-display font-bold" style={{ color }}>
                      {label}
                    </h3>
                    <span className="text-sm font-mono" style={{ color: `${color}cc` }}>
                      {range}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: colors.slateLight }}>
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* How to use Flow */}
          <section
            className="p-6 rounded-lg border"
            style={{
              backgroundColor: `${colors.gunmetal}80`,
              borderColor: `${colors.slateLight}30`,
            }}
          >
            <h3 className="text-xl font-display font-bold" style={{ color: colors.offWhite, marginBottom: '16px' }}>
              How to Use Flow
            </h3>
            <ol className="space-y-3 text-base list-decimal list-inside" style={{ color: colors.slateLight }}>
              <li>
                <span className="font-bold" style={{ color: colors.offWhite }}>Visit the Flow page</span> —{' '}
                See all nodes sorted by Flow Index, highest first.
              </li>
              <li>
                <span className="font-bold" style={{ color: colors.offWhite }}>Enable Flow Mode on the Grid</span> —{' '}
                Toggle "Flow Mode" to see nodes color-coded by their Flow Tier instead of Signal.
              </li>
              <li>
                <span className="font-bold" style={{ color: colors.offWhite }}>Let it guide you</span> —{' '}
                No backlog grooming needed. The Grid shows you what's next.
              </li>
            </ol>
          </section>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-6">
            <Link
              href="/flow"
              className="px-8 py-4 rounded-lg font-display font-bold text-base
                       transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: colors.aurumGold,
                color: colors.deepSpace,
                boxShadow: `0 0 30px ${colors.aurumGold}40`,
              }}
            >
              View Flow Index
            </Link>
            <Link
              href="/grid?flowMode=true"
              className="px-8 py-4 rounded-lg font-display font-bold text-base
                       transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: `${colors.electricBlue}20`,
                borderWidth: '2px',
                borderColor: colors.electricBlue,
                color: colors.electricBlue,
              }}
            >
              Explore The Grid
            </Link>
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

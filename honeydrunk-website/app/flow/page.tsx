'use client';

/**
 * /flow — Flow Index View
 * Living roadmap sorted by Flow Index
 * Shows what needs attention next based on Energy + Priority
 */

import { useState } from 'react';
import Link from 'next/link';
import { getNodesByFlow } from '@/lib/nodes';
import type { VisualNode } from '@/lib/types';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';
import { colors } from '@/lib/tokens';

const flowTierDescriptions = {
  critical: 'Core lifeline — Must flow',
  active: 'Current focus — Heavy lift zone',
  supporting: 'On the periphery — Monitored, not driven',
  dormant: 'Paused intentionally',
  archived: 'Sunset or deprecated',
};

export default function FlowPage() {
  const allNodes = getNodesByFlow();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  // Filter by tier if selected
  const displayNodes = selectedTier
    ? allNodes.filter(node => node.flowMetrics.flowTier === selectedTier)
    : allNodes;

  // Group nodes by tier for stats
  const tierCounts = allNodes.reduce((acc, node) => {
    acc[node.flowMetrics.flowTier] = (acc[node.flowMetrics.flowTier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: colors.deepSpace, color: colors.offWhite }}>
      {/* Background */}
      <div className="fixed inset-0">
        <NeonGridCanvas particleCount={150} enableMotion={true} />
      </div>

      {/* Header */}
      <Header />

      {/* Content */}
      <div className="relative z-10 pt-20 md:pt-32 px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-6xl mx-auto space-y-10 md:space-y-12">
          {/* Page Title */}
          <header className="space-y-4 md:space-y-6 text-center md:text-left">
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold py-2 md:py-4 holographic-text"
            >
              Flow Index
            </h1>
            <p className="text-base md:text-lg px-1 md:px-2" style={{ color: colors.slateLight }}>
              The living roadmap. Sorted by Energy + Priority. The Hive tells you what's next.
            </p>
            <div className="flex gap-3 pt-2 justify-center md:justify-start">
              <Link
                href="/about/flow"
                className="px-6 py-3 rounded-lg text-sm font-mono font-bold uppercase tracking-wider
                           transition-all duration-200 hover:scale-105 border-2"
                style={{
                  backgroundColor: `${colors.aurumGold}20`,
                  borderColor: colors.aurumGold,
                  color: colors.aurumGold,
                  boxShadow: `0 0 20px ${colors.aurumGold}30`,
                }}
              >
                📚 Learn About Flow
              </Link>
              <Link
                href="/grid?flowMode=true"
                className="hidden md:flex px-6 py-3 rounded-lg text-sm font-mono font-bold uppercase tracking-wider
                           transition-all duration-200 hover:scale-105 border-2"
                style={{
                  backgroundColor: `${colors.electricBlue}15`,
                  borderColor: `${colors.electricBlue}60`,
                  color: colors.electricBlue,
                  boxShadow: `0 0 15px ${colors.electricBlue}20`,
                }}
              >
                🎨 Visual Grid
              </Link>
            </div>
          </header>

          {/* Flow Tier Filters */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button
              onClick={() => setSelectedTier(null)}
              className="px-5 py-2.5 rounded-full text-sm font-mono cursor-pointer transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: selectedTier === null ? `${colors.electricBlue}30` : `${colors.gunmetal}60`,
                borderWidth: '2px',
                borderColor: selectedTier === null ? colors.electricBlue : `${colors.slateLight}40`,
                color: selectedTier === null ? colors.electricBlue : colors.slateLight,
              }}
            >
              All ({allNodes.length})
            </button>
            {(['critical', 'active', 'supporting', 'dormant', 'archived'] as const).map((tier) => {
              const count = tierCounts[tier] || 0;
              const tierColor = getTierColor(tier);
              const isSelected = selectedTier === tier;

              return (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className="px-5 py-2.5 rounded-full text-sm font-mono cursor-pointer transition-all duration-200 hover:scale-105 capitalize"
                  style={{
                    backgroundColor: isSelected ? `${tierColor}30` : `${colors.gunmetal}60`,
                    borderWidth: '2px',
                    borderColor: isSelected ? tierColor : `${tierColor}40`,
                    color: isSelected ? tierColor : `${tierColor}cc`,
                  }}
                >
                  {tier} ({count})
                </button>
              );
            })}
          </div>

          {/* Flow Explanation */}
          <div
            className="p-6 md:p-8 rounded-lg border"
            style={{
              backgroundColor: `${colors.gunmetal}80`,
              borderColor: `${colors.slateLight}30`,
            }}
          >
            <h2 className="text-xl font-display font-bold mb-4" style={{ color: colors.aurumGold }}>
              How Flow Works
            </h2>
            <p className="text-sm md:text-base leading-relaxed mb-4" style={{ color: colors.slateLight }}>
              <span className="font-mono font-bold" style={{ color: colors.offWhite }}>
                Flow = (Energy × 0.4) + (Priority × 0.6)
              </span>
            </p>
            <div className="space-y-2 text-sm" style={{ color: colors.slateLight }}>
              <div><span className="font-bold" style={{ color: colors.offWhite }}>Energy (0–100)</span> — How active. Recent commits, connections firing, signals broadcast.</div>
              <div><span className="font-bold" style={{ color: colors.offWhite }}>Priority (0–100)</span> — Strategic impact. Unlocks others. Moves the Hive forward.</div>
              <div><span className="font-bold" style={{ color: colors.offWhite }}>Flow Index</span> — Your automatic "what's next" list. No backlog grooming. Just watch the Grid breathe.</div>
            </div>
          </div>

          {/* Node List */}
          <div className="space-y-4">
            {displayNodes.map((node) => (
              <FlowNodeCard key={node.id} node={node} />
            ))}
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

function FlowNodeCard({ node }: { node: VisualNode }) {
  const { flowIndex, flowTier, flowColor } = node.flowMetrics;

  return (
    <Link
      href={`/nodes/${node.id}`}
      className="block rounded-lg border-2 transition-all duration-300 hover:scale-[1.02]"
      style={{
        padding: '12px 16px',
        backgroundColor: `${colors.gunmetal}90`,
        borderColor: `${flowColor}40`,
        boxShadow: `0 0 20px ${flowColor}20`,
      }}
    >
      <div className="flex items-start justify-between gap-3" style={{ marginBottom: '8px' }}>
        <div className="flex-1 min-w-0">
          <h3
            className="font-display font-bold mb-1"
            style={{ 
              color: colors.offWhite,
              fontSize: '18px',
              lineHeight: '1.3',
            }}
          >
            {node.name}
          </h3>
          <p style={{ 
            color: colors.slateLight,
            fontSize: '13px',
            lineHeight: '1.4',
            marginBottom: '8px',
          }}>
            {node.short}
          </p>
        </div>

        {/* Flow Index Badge */}
        <div
          className="flex-shrink-0 text-center"
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            minWidth: '64px',
            backgroundColor: `${flowColor}20`,
            borderWidth: '2px',
            borderColor: flowColor,
            boxShadow: `0 0 15px ${flowColor}30`,
          }}
        >
          <div className="font-display font-bold" style={{ 
            color: flowColor,
            fontSize: '22px',
            lineHeight: '1',
          }}>
            {flowIndex}
          </div>
          <div className="font-mono uppercase" style={{ 
            color: flowColor,
            fontSize: '10px',
            marginTop: '2px',
          }}>
            Flow
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center font-mono" style={{ gap: '6px', fontSize: '11px' }}>
        {/* Tier */}
        <span
          className="capitalize"
          style={{
            padding: '3px 10px',
            borderRadius: '12px',
            backgroundColor: `${flowColor}20`,
            borderWidth: '1px',
            borderColor: flowColor,
            color: flowColor,
          }}
        >
          {flowTier}
        </span>

        {/* Signal */}
        <span
          style={{
            padding: '3px 10px',
            borderRadius: '12px',
            backgroundColor: `${node.signalVisuals.color}20`,
            borderWidth: '1px',
            borderColor: node.signalVisuals.color,
            color: node.signalVisuals.color,
          }}
        >
          {node.signal}
        </span>

        {/* Sector */}
        <span
          style={{
            padding: '3px 10px',
            borderRadius: '12px',
            backgroundColor: `${node.sectorVisuals.color}20`,
            borderWidth: '1px',
            borderColor: node.sectorVisuals.color,
            color: node.sectorVisuals.color,
          }}
        >
          {node.sector}
        </span>

        {/* Energy & Priority */}
        <span style={{ color: colors.slateLight }}>
          E: {node.energy ?? 50} | P: {node.priority ?? 50}
        </span>
      </div>
    </Link>
  );
}

function getTierColor(tier: string): string {
  switch (tier) {
    case 'critical': return colors.neonPink;
    case 'active': return colors.aurumGold;
    case 'supporting': return colors.signalGreen;
    case 'dormant': return colors.electricBlue;
    case 'archived': return colors.slateLight;
    default: return colors.slateLight;
  }
}

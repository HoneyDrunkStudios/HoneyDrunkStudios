'use client';

/**
 * /flow — Flow Index View
 * Living roadmap sorted by Flow Index
 * Shows what needs attention next based on Energy + Priority
 */

import { useState } from 'react';
import Link from 'next/link';
import { getNodesByFlow, getActiveFlowNodes, getCompletedFlowNodes } from '@/lib/nodes';
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
  future: 'Future work — Seeds waiting to grow',
};

export default function FlowPage() {
  const activeNodes = getActiveFlowNodes();
  const completedNodes = getCompletedFlowNodes();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<'active' | 'completed' | 'all'>('active');

  // Get display nodes based on section and tier filter
  const getDisplayNodes = () => {
    let baseNodes: VisualNode[];
    switch (selectedSection) {
      case 'active':
        baseNodes = activeNodes;
        break;
      case 'completed':
        baseNodes = completedNodes;
        break;
      case 'all':
        baseNodes = [...activeNodes, ...completedNodes];
        break;
    }

    return selectedTier
      ? baseNodes.filter(node => node.flowMetrics.flowTier === selectedTier)
      : baseNodes;
  };

  const displayNodes = getDisplayNodes();

  // Group nodes by tier for stats
  const tierCounts = [...activeNodes, ...completedNodes].reduce((acc, node) => {
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
                📚︎ Learn About Flow
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
                🎨︎ Visual Grid
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
              onMouseEnter={(e) => {
                if (selectedTier !== null) {
                  e.currentTarget.style.backgroundColor = `${colors.electricBlue}20`;
                  e.currentTarget.style.borderColor = `${colors.electricBlue}60`;
                  e.currentTarget.style.color = colors.electricBlue;
                  e.currentTarget.style.boxShadow = `0 0 15px ${colors.electricBlue}30`;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTier !== null) {
                  e.currentTarget.style.backgroundColor = `${colors.gunmetal}60`;
                  e.currentTarget.style.borderColor = `${colors.slateLight}40`;
                  e.currentTarget.style.color = colors.slateLight;
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              All ({activeNodes.length + completedNodes.length})
            </button>
            {(['critical', 'active', 'supporting', 'dormant', 'future'] as const).map((tier) => {
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
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = `${tierColor}20`;
                      e.currentTarget.style.borderColor = `${tierColor}80`;
                      e.currentTarget.style.color = tierColor;
                      e.currentTarget.style.boxShadow = `0 0 15px ${tierColor}30`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = `${colors.gunmetal}60`;
                      e.currentTarget.style.borderColor = `${tierColor}40`;
                      e.currentTarget.style.color = `${tierColor}cc`;
                      e.currentTarget.style.boxShadow = 'none';
                    }
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
                Flow = (Energy × 0.35) + (Priority × 0.65)
              </span>
            </p>
            <div className="space-y-2 text-sm" style={{ color: colors.slateLight }}>
              <div><span className="font-bold" style={{ color: colors.offWhite }}>Energy (0–100)</span> — Signal readiness + usage. How hot the node is based on its stage (Live, Wiring, Awake) and how many others depend on it.</div>
              <div><span className="font-bold" style={{ color: colors.offWhite }}>Priority (0–100)</span> — Strategic weight + centrality + guardrails. Sector importance, tier level, time pressure, and ancestor overrides ensure critical foundations stay ahead.</div>
              <div><span className="font-bold" style={{ color: colors.offWhite }}>Flow Index</span> — Your automatic "what's next" list. Recomputed server-side, respects circular dependencies, and caps surge work-in-progress. No backlog grooming. Just watch the Grid breathe.</div>
            </div>
          </div>

          {/* Section Selector */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button
              onClick={() => setSelectedSection('active')}
              className="px-6 py-3 rounded-lg text-sm font-mono font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 border-2"
              style={{
                backgroundColor: selectedSection === 'active' ? `${colors.cyberOrange}20` : `${colors.gunmetal}60`,
                borderColor: selectedSection === 'active' ? colors.cyberOrange : `${colors.slateLight}40`,
                color: selectedSection === 'active' ? colors.cyberOrange : colors.slateLight,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (selectedSection !== 'active') {
                  e.currentTarget.style.backgroundColor = `${colors.cyberOrange}15`;
                  e.currentTarget.style.borderColor = `${colors.cyberOrange}60`;
                  e.currentTarget.style.color = colors.cyberOrange;
                  e.currentTarget.style.boxShadow = `0 0 20px ${colors.cyberOrange}30`;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedSection !== 'active') {
                  e.currentTarget.style.backgroundColor = `${colors.gunmetal}60`;
                  e.currentTarget.style.borderColor = `${colors.slateLight}40`;
                  e.currentTarget.style.color = colors.slateLight;
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              🔥︎ Active ({activeNodes.length})
            </button>
            <button
              onClick={() => setSelectedSection('completed')}
              className="px-6 py-3 rounded-lg text-sm font-mono font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 border-2"
              style={{
                backgroundColor: selectedSection === 'completed' ? `${colors.signalGreen}20` : `${colors.gunmetal}60`,
                borderColor: selectedSection === 'completed' ? colors.signalGreen : `${colors.slateLight}40`,
                color: selectedSection === 'completed' ? colors.signalGreen : colors.slateLight,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (selectedSection !== 'completed') {
                  e.currentTarget.style.backgroundColor = `${colors.signalGreen}15`;
                  e.currentTarget.style.borderColor = `${colors.signalGreen}60`;
                  e.currentTarget.style.color = colors.signalGreen;
                  e.currentTarget.style.boxShadow = `0 0 20px ${colors.signalGreen}30`;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedSection !== 'completed') {
                  e.currentTarget.style.backgroundColor = `${colors.gunmetal}60`;
                  e.currentTarget.style.borderColor = `${colors.slateLight}40`;
                  e.currentTarget.style.color = colors.slateLight;
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              ✅︎ Completed ({completedNodes.length})
            </button>
            <button
              onClick={() => setSelectedSection('all')}
              className="px-6 py-3 rounded-lg text-sm font-mono font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 border-2"
              style={{
                backgroundColor: selectedSection === 'all' ? `${colors.electricBlue}20` : `${colors.gunmetal}60`,
                borderColor: selectedSection === 'all' ? colors.electricBlue : `${colors.slateLight}40`,
                color: selectedSection === 'all' ? colors.electricBlue : colors.slateLight,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                if (selectedSection !== 'all') {
                  e.currentTarget.style.backgroundColor = `${colors.electricBlue}15`;
                  e.currentTarget.style.borderColor = `${colors.electricBlue}60`;
                  e.currentTarget.style.color = colors.electricBlue;
                  e.currentTarget.style.boxShadow = `0 0 20px ${colors.electricBlue}30`;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedSection !== 'all') {
                  e.currentTarget.style.backgroundColor = `${colors.gunmetal}60`;
                  e.currentTarget.style.borderColor = `${colors.slateLight}40`;
                  e.currentTarget.style.color = colors.slateLight;
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              📊︎ All ({activeNodes.length + completedNodes.length})
            </button>
          </div>

          {/* Node List */}
          <div className="space-y-4">
            {displayNodes.length > 0 ? (
              displayNodes.map((node) => (
                <FlowNodeCard key={node.id} node={node} isCompleted={node.done === true} />
              ))
            ) : (
              <div className="text-center py-8" style={{ color: colors.slateLight }}>
                <p className="text-lg font-mono">No nodes in this section</p>
              </div>
            )}
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

function FlowNodeCard({ node, isCompleted = false }: { node: VisualNode; isCompleted?: boolean }) {
  const { flowIndex, flowTier, flowColor } = node.flowMetrics;
  
  // Use green for completed nodes, otherwise use the tier color
  const displayColor = isCompleted ? colors.signalGreen : flowColor;
  const displayTier = isCompleted ? 'completed' : flowTier;

  return (
    <Link
      href={`/nodes/${node.id}`}
      className="block rounded-lg border-2 transition-all duration-300 hover:scale-[1.02]"
      style={{
        padding: '12px 16px',
        backgroundColor: `${colors.gunmetal}90`,
        borderColor: `${displayColor}40`,
        boxShadow: `0 0 20px ${displayColor}20`,
        opacity: isCompleted ? 0.85 : 1,
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
            backgroundColor: `${displayColor}20`,
            borderWidth: '2px',
            borderColor: displayColor,
            boxShadow: `0 0 15px ${displayColor}30`,
          }}
        >
          <div className="font-display font-bold" style={{ 
            color: displayColor,
            fontSize: '22px',
            lineHeight: '1',
          }}>
            {flowIndex}
          </div>
          <div className="font-mono uppercase" style={{ 
            color: displayColor,
            fontSize: '10px',
            marginTop: '2px',
          }}>
            {isCompleted ? 'Done' : 'Flow'}
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
            backgroundColor: `${displayColor}20`,
            borderWidth: '1px',
            borderColor: displayColor,
            color: displayColor,
          }}
        >
          {isCompleted ? '✓ completed' : displayTier}
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
    case 'future': return colors.slateLight;
    default: return colors.slateLight;
  }
}

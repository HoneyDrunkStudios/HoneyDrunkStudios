'use client';

/**
 * FeaturedNodes — Live Grid Teaser
 * Displays 3-6 nodes from the heartbeat with status chips
 */

import Link from 'next/link';
import { colors } from '@/lib/tokens';
import type { VisualNode, Signal } from '@/lib/types';

interface FeaturedNodesProps {
  nodes: VisualNode[];
}

const signalEmojis: Record<Signal, string> = {
  Seed: '🟡',
  Awake: '🟣',
  Wiring: '🟠',
  Live: '🟢',
  Echo: '🔵',
  Archive: '🔴',
};

export default function FeaturedNodes({ nodes }: FeaturedNodesProps) {
  // Take first 6 nodes
  const displayNodes = nodes.slice(0, 6);

  return (
    <section
      id="featured-nodes"
      className="w-full py-16 px-8"
      style={{ backgroundColor: colors.gunmetal }}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-display font-bold text-center uppercase tracking-wide"
          style={{
            color: colors.electricBlue,
            textShadow: `0 0 20px ${colors.electricBlue}60`,
            marginBottom: '16px',
          }}
        >
          Featured Nodes
        </h2>

        <p
          className="text-center text-base font-mono w-full"
          style={{ color: colors.slateLight, marginBottom: '60px' }}
        >
          Live systems. Active experiments. The Grid in motion.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayNodes.map((node) => (
            <NodeCard key={node.id} node={node} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/grid"
            className="inline-block font-mono font-bold text-sm uppercase tracking-wider px-8 py-3 border-2 transition-all duration-200 hover:scale-105"
            style={{
              color: colors.electricBlue,
              borderColor: colors.electricBlue,
              backgroundColor: `${colors.electricBlue}10`,
              boxShadow: `0 0 20px ${colors.electricBlue}30`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${colors.electricBlue}20`;
              e.currentTarget.style.boxShadow = `0 0 30px ${colors.electricBlue}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${colors.electricBlue}10`;
              e.currentTarget.style.boxShadow = `0 0 20px ${colors.electricBlue}30`;
            }}
          >
            View All Nodes
          </Link>
        </div>
      </div>
    </section>
  );
}

function NodeCard({ node }: { node: VisualNode }) {
  const statusEmoji = signalEmojis[node.signal];
  const accentColor = node.sectorVisuals.color;

  return (
    <Link
      href={`/nodes/${node.id}`}
      className="block p-6 backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 group"
      style={{
        backgroundColor: `${colors.deepSpace}95`,
        borderColor: `${accentColor}30`,
        boxShadow: `0 0 15px ${accentColor}15`,
        clipPath:
          'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentColor;
        e.currentTarget.style.boxShadow = `0 0 25px ${accentColor}35`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${accentColor}30`;
        e.currentTarget.style.boxShadow = `0 0 15px ${accentColor}15`;
      }}
    >
      {/* Status chip */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wide border"
          style={{
            color: accentColor,
            borderColor: `${accentColor}50`,
            backgroundColor: `${accentColor}15`,
          }}
        >
          {statusEmoji} {node.signal}
        </span>
        <span
          className="text-xs font-mono"
          style={{ color: colors.slateLight }}
        >
          {node.sector}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-xl font-display font-bold mb-2 group-hover:text-shadow-glow transition-all"
        style={{ color: colors.offWhite }}
      >
        {node.name}
      </h3>

      {/* One-liner */}
      <p
        className="text-sm leading-relaxed font-mono mb-4"
        style={{ color: colors.slateLight }}
      >
        {node.short}
      </p>

      {/* View link */}
      <div
        className="text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1 group-hover:gap-2 transition-all"
        style={{ color: accentColor }}
      >
        View node
        <span className="transform group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>
    </Link>
  );
}

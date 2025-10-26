'use client';

/**
 * FlowLanes — Vertical flow lane visualization
 * Arranges nodes in columns by flow tier
 */

import { useState, useCallback } from 'react';
import { colors } from '@/lib/tokens';
import { getNodesByFlow, flowTierDefinitions } from '@/lib/nodes';
import type { VisualNode as EntitiesVisualNode } from '@/lib/entities';
import type { VisualNode as NodesVisualNode } from '@/lib/types';

interface FlowLanesProps {
  nodes: EntitiesVisualNode[];
  onNodeClick?: (node: EntitiesVisualNode) => void;
  className?: string;
}

export default function FlowLanes({ nodes, onNodeClick, className = '' }: FlowLanesProps) {
  const [hoveredId, setHoveredId] = useState<string | undefined>();

  // Get flow data for all nodes
  const flowNodes = getNodesByFlow();
  
  // Create a map of node IDs to flow metrics
  const flowMetricsMap = flowNodes.reduce((acc, node) => {
    acc[node.id] = node.flowMetrics;
    return acc;
  }, {} as Record<string, NodesVisualNode['flowMetrics']>);

  // Group nodes by flow tier
  const nodesByTier = nodes.reduce((acc, node) => {
    const flowMetrics = flowMetricsMap[node.id];
    const tier = flowMetrics?.flowTier || 'supporting';
    if (!acc[tier]) acc[tier] = [];
    acc[tier].push({ ...node, flowMetrics });
    return acc;
  }, {} as Record<string, Array<EntitiesVisualNode & { flowMetrics?: NodesVisualNode['flowMetrics'] }>>);

  // Sort each tier by flow index (descending - higher priority first)
  Object.keys(nodesByTier).forEach(tier => {
    nodesByTier[tier].sort((a, b) => 
      (b.flowMetrics?.flowIndex || 0) - (a.flowMetrics?.flowIndex || 0)
    );
  });

  const tiers = ['critical', 'active', 'supporting', 'dormant', 'archived'] as const;

  const flowTierLabels = {
    critical: 'Critical',
    active: 'Active',
    supporting: 'Supporting',
    dormant: 'Dormant',
    archived: 'Archived',
  };

  // Create a map of tier to color from flowTierDefinitions
  const tierColorMap = flowTierDefinitions.reduce((acc, def) => {
    acc[def.tier] = def.color;
    return acc;
  }, {} as Record<string, string>);

  // Get tier color from the definition map (always returns correct color even if tier is empty)
  const getTierColor = (tier: string) => {
    return tierColorMap[tier] || colors.slateLight;
  };

  const renderNode = useCallback((node: EntitiesVisualNode & { flowMetrics?: NodesVisualNode['flowMetrics'] }) => {
    const isHovered = node.id === hoveredId;
    const tierColor = node.flowMetrics?.flowColor || colors.slateLight;

    return (
      <div
        key={node.id}
        className="p-2.5 rounded-lg border-2 transition-all duration-200 cursor-pointer"
        style={{
          backgroundColor: isHovered ? `${tierColor}20` : `${tierColor}10`,
          borderColor: isHovered ? tierColor : `${tierColor}60`,
          boxShadow: isHovered ? `0 0 20px ${tierColor}40` : 'none',
        }}
        onMouseEnter={() => setHoveredId(node.id)}
        onMouseLeave={() => setHoveredId(undefined)}
        onClick={() => onNodeClick?.(node)}
      >
        {/* Node name */}
        <div
          className="text-sm font-mono font-bold mb-0.5"
          style={{ color: colors.offWhite }}
        >
          {node.name.startsWith('HoneyDrunk.') ? node.name.split('.').pop() : node.name}
        </div>

        {/* Flow index */}
        <div
          className="text-xs font-mono mb-1.5"
          style={{ color: tierColor }}
        >
          Flow: {node.flowMetrics?.flowIndex || 0}
        </div>

        {/* Sector & Signal */}
        <div className="flex gap-1.5 text-xs font-mono flex-wrap">
          <span
            className="px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: `${node.sectorColor}20`,
              color: node.sectorColor,
            }}
          >
            {node.sector}
          </span>
          <span
            className="px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: `${node.signalColor}20`,
              color: node.signalColor,
            }}
          >
            {node.signal}
          </span>
        </div>
      </div>
    );
  }, [hoveredId, onNodeClick]);

  return (
    <div className={`w-full h-full overflow-auto pb-6 ${className}`} style={{ paddingTop: '8rem' }}>
      <div className="flex gap-3 min-h-full justify-center px-8 max-w-[1600px] mx-auto">
        {tiers.map(tier => {
          const tierNodes = nodesByTier[tier] || [];
          const tierColor = getTierColor(tier);
          const tierLabel = flowTierLabels[tier as keyof typeof flowTierLabels];

          return (
            <div
              key={tier}
              className="flex-1 min-w-[160px] lg:min-w-[180px] xl:min-w-[200px]"
            >
              {/* Lane header */}
              <div
                className="sticky top-0 p-2.5 rounded-lg mb-3 backdrop-blur-sm border-2 z-10"
                style={{
                  backgroundColor: `${colors.deepSpace}90`,
                  borderColor: tierColor,
                  boxShadow: `0 0 15px ${tierColor}30`,
                }}
              >
                <div
                  className="text-sm font-mono font-bold uppercase tracking-wider mb-0.5"
                  style={{ color: tierColor }}
                >
                  {tierLabel}
                </div>
                <div
                  className="text-xs font-mono"
                  style={{ color: colors.slateLight }}
                >
                  {tierNodes.length} {tierNodes.length === 1 ? 'node' : 'nodes'}
                </div>
              </div>

              {/* Nodes in this lane */}
              <div className="space-y-2.5">
                {tierNodes.map(renderNode)}
              </div>

              {/* Empty state */}
              {tierNodes.length === 0 && (
                <div
                  className="text-center text-xs font-mono p-4 rounded-lg border"
                  style={{
                    color: colors.slateLight,
                    borderColor: `${tierColor}20`,
                    opacity: 0.5,
                  }}
                >
                  No nodes
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

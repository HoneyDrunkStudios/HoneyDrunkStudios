'use client';

/**
 * FlowLanes — Vertical flow lane visualization
 * Arranges nodes in columns by flow tier
 */

import { useState, useCallback, useMemo } from 'react';
import { colors } from '@/lib/tokens';
import { getNodesByFlow } from '@/lib/nodes';
import { getAllFlowTiers } from '@/lib/flow';
import type { VisualNode as EntitiesVisualNode } from '@/lib/entities';
import type { VisualNode as NodesVisualNode } from '@/lib/types';

interface FlowLanesProps {
  nodes: EntitiesVisualNode[];
  onNodeClick?: (node: EntitiesVisualNode) => void;
  className?: string;
}

export default function FlowLanes({ nodes, onNodeClick, className = '' }: FlowLanesProps) {
  const [hoveredId, setHoveredId] = useState<string | undefined>();

  // Get flow tier configurations from centralized config
  const flowTiers = useMemo(() => getAllFlowTiers(), []);

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
        {flowTiers.map(tierConfig => {
          const tierNodes = nodesByTier[tierConfig.id] || [];

          return (
            <div
              key={tierConfig.id}
              className="flex-1 min-w-[160px] lg:min-w-[180px] xl:min-w-[200px]"
            >
              {/* Lane header */}
              <div
                className="sticky top-0 p-2.5 rounded-lg mb-3 backdrop-blur-sm border-2 z-10"
                style={{
                  backgroundColor: `${colors.deepSpace}90`,
                  borderColor: tierConfig.color,
                  boxShadow: `0 0 15px ${tierConfig.color}30`,
                }}
              >
                <div
                  className="text-sm font-mono font-bold uppercase tracking-wider mb-0.5"
                  style={{ color: tierConfig.color }}
                >
                  {tierConfig.name}
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
                    borderColor: `${tierConfig.color}20`,
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

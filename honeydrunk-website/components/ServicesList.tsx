'use client';

/**
 * ServicesList — Client component wrapper for services with modal functionality
 */

import { useState } from 'react';
import { colors } from '@/lib/tokens';
import type { VisualNode, Sector } from '@/lib/types';
import NodeModal from './NodeModal';

interface ServicesListProps {
  nodesBySector: Record<Sector, VisualNode[]>;
  sectorColors: Record<string, string>;
  signalColors: Record<string, string>;
}

export default function ServicesList({ nodesBySector, sectorColors, signalColors }: ServicesListProps) {
  const [selectedNode, setSelectedNode] = useState<VisualNode | null>(null);
  const [selectedSectorColor, setSelectedSectorColor] = useState<string>('');
  const [selectedSignalColor, setSelectedSignalColor] = useState<string>('');

  const handleNodeClick = (node: VisualNode, sector: string) => {
    setSelectedNode(node);
    setSelectedSectorColor(sectorColors[sector]);
    setSelectedSignalColor(signalColors[node.signal]);
  };

  return (
    <>
      {Object.entries(nodesBySector).map(([sector, nodes]) => (
        <section key={sector} className="mb-12 md:mb-16">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-display font-bold pt-6 md:pt-10 border-b-2"
            style={{
              color: sectorColors[sector] || colors.electricBlue,
              borderColor: `${sectorColors[sector] || colors.electricBlue}30`,
              marginBottom: '48px',
            }}
          >
            {sector}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {nodes.map((node) => (
              <button
                key={node.id}
                onClick={() => handleNodeClick(node, sector)}
                className={`service-card-${sector.toLowerCase()} group p-4 md:p-6 rounded-lg border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-left w-full relative overflow-hidden`}
                style={{
                  backgroundColor: `${colors.gunmetal}60`,
                  borderColor: `${sectorColors[sector]}40`,
                }}
              >
                {/* Animated border trace on hover */}
                <svg
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ width: '100%', height: '100%' }}
                >
                  <rect
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    rx="6"
                    fill="none"
                    stroke={sectorColors[sector]}
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    style={{
                      animation: 'borderFlow 2s linear infinite',
                    }}
                  />
                </svg>
                {/* Header with name and signal */}
                <div className="flex items-start justify-between gap-2 mb-3 md:mb-4">
                  <h3 className="text-lg md:text-xl font-display font-bold" style={{ color: colors.offWhite }}>
                    {node.name}
                  </h3>
                  <span
                    className="px-2 md:px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap flex-shrink-0"
                    style={{
                      backgroundColor: `${signalColors[node.signal]}20`,
                      borderWidth: '1px',
                      borderColor: signalColors[node.signal],
                      color: signalColors[node.signal],
                    }}
                  >
                    {node.signal}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm mb-3 md:mb-4 leading-relaxed" style={{ color: colors.slateLight }}>
                  {node.short}
                </p>

                {/* Tags */}
                {node.tags && node.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2"
                    style={{ marginBottom: '32px' }}
                  >
                    {node.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded text-xs font-mono"
                        style={{
                          backgroundColor: `${colors.electricBlue}10`,
                          color: colors.slateLight,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Click hint */}
                <div className="flex items-center gap-2 pt-4 border-t" style={{ borderColor: `${colors.slateLight}20`, marginTop: '32px' }}>
                  <span className="text-xs font-mono" style={{ color: colors.electricBlue }}>
                    Click for details →
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      ))}

      {/* Modal */}
      <NodeModal
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        sectorColor={selectedSectorColor}
        signalColor={selectedSignalColor}
      />
    </>
  );
}

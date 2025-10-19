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
        <section key={sector} className="space-y-6">
          <h2
            className="text-3xl md:text-4xl font-display font-bold pt-8 pb-4 border-b"
            style={{ 
              color: sectorColors[sector] || colors.electricBlue,
              borderColor: `${sectorColors[sector] || colors.electricBlue}30`,
            }}
          >
            {sector}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nodes.map((node) => (
              <button
                key={node.id}
                onClick={() => handleNodeClick(node, sector)}
                className={`service-card-${sector.toLowerCase()} group p-6 rounded-lg border-2 transition-all duration-200 hover:scale-[1.02] text-left w-full`}
                style={{
                  backgroundColor: `${colors.gunmetal}60`,
                  borderColor: `${sectorColors[sector]}40`,
                }}
              >
                {/* Header with name and signal */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-display font-bold" style={{ color: colors.offWhite }}>
                    {node.name}
                  </h3>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap ml-3"
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
                <p className="text-sm mb-4 leading-relaxed" style={{ color: colors.slateLight }}>
                  {node.short}
                </p>

                {/* Tags */}
                {node.tags && node.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
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
                <div className="flex items-center gap-2 pt-4 border-t" style={{ borderColor: `${colors.slateLight}20` }}>
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

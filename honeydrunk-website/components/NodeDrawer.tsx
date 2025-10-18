'use client';

/**
 * NodeDrawer — Slide-in detail panel for nodes
 * Clear, readable information with proper spacing
 */

import { useEffect } from 'react';
import type { VisualNode } from '@/lib/types';
import { colors } from '@/lib/tokens';

interface NodeDrawerProps {
  node: VisualNode | null;
  onClose: () => void;
  connectedNodes?: VisualNode[];
}

export default function NodeDrawer({ node, onClose, connectedNodes = [] }: NodeDrawerProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (node) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [node, onClose]);

  if (!node) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
        onClick={onClose}
        style={{ animation: 'fadeIn 200ms ease-out' }}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-full md:w-[600px] z-50 overflow-y-auto shadow-2xl animate-slideInRight"
        style={{
          backgroundColor: colors.deepSpace,
          borderLeft: `2px solid ${node.sectorVisuals.color}`,
          animation: 'slideInRight 300ms ease-out',
        }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 px-10 py-8 border-b backdrop-blur-sm"
          style={{
            backgroundColor: `${colors.deepSpace}f0`,
            borderColor: `${colors.slateLight}30`,
          }}
        >
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div
                className="inline-block px-5 py-2.5 rounded-full text-xs font-mono mb-4"
                style={{
                  backgroundColor: `${node.sectorVisuals.color}20`,
                  borderWidth: '1px',
                  borderColor: node.sectorVisuals.color,
                  color: node.sectorVisuals.color,
                }}
              >
                {node.sector} • {node.signal}
              </div>

              <h2
                className="text-3xl font-display font-bold mb-3"
                style={{
                  color: node.signalVisuals.color,
                  textShadow: `0 0 20px ${node.signalVisuals.color}40`,
                }}
              >
                {node.name}
              </h2>

              <p
                className="text-lg leading-relaxed"
                style={{ color: colors.offWhite }}
              >
                {node.short}
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                backgroundColor: `${colors.gunmetal}80`,
                borderWidth: '1px',
                borderColor: `${colors.slateLight}40`,
                color: colors.slateLight,
              }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-10 py-10 space-y-8">
          {/* Description */}
          {node.description && (
            <section>
              <h3
                className="text-sm font-mono uppercase tracking-wider mb-4"
                style={{ color: colors.slateLight }}
              >
                Description
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{ color: colors.offWhite }}
              >
                {node.description}
              </p>
            </section>
          )}

          {/* Energy & Priority */}
          <section className="grid grid-cols-2 gap-6">
            <div
              className="p-8 rounded-lg border"
              style={{
                backgroundColor: `${colors.gunmetal}60`,
                borderColor: `${colors.slateLight}30`,
              }}
            >
              <div
                className="text-xs font-mono uppercase tracking-wider mb-3"
                style={{ color: colors.slateLight }}
              >
                Energy Level
              </div>
              <div className="text-3xl font-display font-bold" style={{ color: colors.electricBlue }}>
                {node.energy || 50}%
              </div>
            </div>

            <div
              className="p-8 rounded-lg border"
              style={{
                backgroundColor: `${colors.gunmetal}60`,
                borderColor: `${colors.slateLight}30`,
              }}
            >
              <div
                className="text-xs font-mono uppercase tracking-wider mb-3"
                style={{ color: colors.slateLight }}
              >
                Priority
              </div>
              <div className="text-3xl font-display font-bold" style={{ color: colors.violetCore }}>
                {node.priority || 0}
              </div>
            </div>
          </section>

          {/* Links */}
          {node.links && Object.keys(node.links).length > 0 && (
            <section>
              <h3
                className="text-sm font-mono uppercase tracking-wider mb-4"
                style={{ color: colors.slateLight }}
              >
                Links
              </h3>
              <div className="space-y-3">
                {node.links.repo && (
                  <a
                    href={node.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-6 py-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      backgroundColor: `${colors.gunmetal}60`,
                      borderColor: `${colors.slateLight}30`,
                      color: colors.offWhite,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">📦</span>
                      <div>
                        <div className="font-display font-semibold mb-1">Repository</div>
                        <div className="text-sm" style={{ color: colors.slateLight }}>
                          View source code
                        </div>
                      </div>
                    </div>
                  </a>
                )}

                {node.links.docs && (
                  <a
                    href={node.links.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-6 py-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      backgroundColor: `${colors.gunmetal}60`,
                      borderColor: `${colors.slateLight}30`,
                      color: colors.offWhite,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">📚</span>
                      <div>
                        <div className="font-display font-semibold mb-1">Documentation</div>
                        <div className="text-sm" style={{ color: colors.slateLight }}>
                          Read the docs
                        </div>
                      </div>
                    </div>
                  </a>
                )}

                {node.links.live && (
                  <a
                    href={node.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-6 py-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      backgroundColor: `${node.signalVisuals.color}20`,
                      borderColor: node.signalVisuals.color,
                      color: colors.offWhite,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">🚀</span>
                      <div>
                        <div className="font-display font-semibold mb-1">Live Site</div>
                        <div className="text-sm" style={{ color: colors.slateLight }}>
                          Visit live deployment
                        </div>
                      </div>
                    </div>
                  </a>
                )}

                {node.links.board && (
                  <a
                    href={node.links.board}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-6 py-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      backgroundColor: `${colors.gunmetal}60`,
                      borderColor: `${colors.slateLight}30`,
                      color: colors.offWhite,
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">📋</span>
                      <div>
                        <div className="font-display font-semibold mb-1">Project Board</div>
                        <div className="text-sm" style={{ color: colors.slateLight }}>
                          Track progress
                        </div>
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Tags */}
          {node.tags && node.tags.length > 0 && (
            <section>
              <h3
                className="text-sm font-mono uppercase tracking-wider mb-4"
                style={{ color: colors.slateLight }}
              >
                Tags
              </h3>
              <div className="flex flex-wrap gap-3">
                {node.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-5 py-2.5 rounded-full text-sm font-mono"
                    style={{
                      backgroundColor: `${colors.electricBlue}15`,
                      borderWidth: '1px',
                      borderColor: `${colors.electricBlue}40`,
                      color: colors.electricBlue,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Connected Nodes */}
          {connectedNodes.length > 0 && (
            <section>
              <h3
                className="text-sm font-mono uppercase tracking-wider mb-4"
                style={{ color: colors.slateLight }}
              >
                Connected Nodes ({connectedNodes.length})
              </h3>
              <div className="space-y-3">
                {connectedNodes.map((connected) => (
                  <div
                    key={connected.id}
                    className="px-8 py-5 rounded-lg border"
                    style={{
                      backgroundColor: `${colors.gunmetal}60`,
                      borderColor: `${colors.slateLight}30`,
                    }}
                  >
                    <div
                      className="font-display font-semibold mb-2"
                      style={{ color: connected.signalVisuals.color }}
                    >
                      {connected.name}
                    </div>
                    <div className="text-sm" style={{ color: colors.slateLight }}>
                      {connected.short}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Cluster */}
          {node.cluster && (
            <section>
              <h3
                className="text-sm font-mono uppercase tracking-wider mb-4"
                style={{ color: colors.slateLight }}
              >
                Cluster
              </h3>
              <div
                className="px-8 py-5 rounded-lg border inline-block"
                style={{
                  backgroundColor: `${colors.gunmetal}60`,
                  borderColor: `${colors.slateLight}30`,
                  color: colors.offWhite,
                }}
              >
                <span className="font-mono">{node.cluster}</span>
              </div>
            </section>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}

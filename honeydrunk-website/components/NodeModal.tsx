'use client';

/**
 * NodeModal — Full-screen modal for displaying detailed node information
 */

import { useEffect } from 'react';
import { colors } from '@/lib/tokens';
import { useIsMobile } from '@/lib/hooks/useIsMobile';
import type { VisualNode } from '@/lib/types';

interface NodeModalProps {
  node: VisualNode | null;
  onClose: () => void;
  sectorColor: string;
  signalColor: string;
}

export default function NodeModal({ node, onClose, sectorColor, signalColor }: NodeModalProps) {
  const isMobile = useIsMobile();

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (node) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [node, onClose]);

  if (!node) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden"
      style={{
        backgroundColor: `${colors.deepSpace}e6`,
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="relative w-full max-w-4xl max-h-[85vh] md:max-h-[90vh] flex flex-col rounded-lg border-2 overflow-hidden"
        style={{
          backgroundColor: colors.gunmetal,
          borderColor: sectorColor,
          boxShadow: `0 0 40px ${sectorColor}60, inset 0 0 60px ${colors.deepSpace}40`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Row with Title and Close Button */}
        <div className="flex-shrink-0 flex items-center justify-between gap-4 p-4 md:p-6 lg:p-8 border-b-2" style={{ borderColor: `${sectorColor}30` }}>
          <h2
            className="text-xl md:text-4xl lg:text-5xl font-display font-bold"
            style={{
              color: sectorColor,
              textShadow: `0 0 20px ${sectorColor}60`,
            }}
          >
            {node.name}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-200 hover:rotate-90 cursor-pointer flex-shrink-0"
            style={{
              color: colors.neonPink,
              borderColor: `${colors.neonPink}40`,
              backgroundColor: `${colors.neonPink}10`,
            }}
            aria-label="Close modal"
          >
            <span className="text-2xl font-bold">×</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          {/* Header Info */}
          <div className="space-y-3 mb-6">
          {/* Badges */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span
                className="px-2 md:px-3 py-1 rounded text-xs font-mono font-bold uppercase"
                style={{
                  backgroundColor: `${sectorColor}20`,
                  color: sectorColor,
                  borderWidth: '1px',
                  borderColor: `${sectorColor}60`,
                }}
              >
                {node.sector}
              </span>
              {node.energy !== undefined && (
                <span
                  className="px-2 md:px-3 py-1 rounded text-xs font-mono"
                  style={{
                    color: colors.aurumGold,
                    backgroundColor: `${colors.aurumGold}10`,
                  }}
                >
                  Energy: {node.energy}
                </span>
              )}
            </div>
            <span
              className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-mono whitespace-nowrap"
              style={{
                backgroundColor: `${signalColor}20`,
                borderWidth: '2px',
                borderColor: signalColor,
                color: signalColor,
                boxShadow: `0 0 15px ${signalColor}40`,
              }}
            >
              {node.signal}
            </span>
          </div>
        </div>

        {/* Short Description */}
        <p
          className="text-sm md:text-lg lg:text-xl mb-6 leading-relaxed"
          style={{ color: colors.offWhite }}
        >
          {node.short}
        </p>

        {/* Full Description */}
        {node.description && (
          <div className="mb-6 pt-3 md:pt-6">
            <h3
              className="text-lg md:text-2xl font-display font-bold mb-2 md:mb-4"
              style={{ color: colors.electricBlue }}
            >
              About
            </h3>
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: colors.slateLight }}
            >
              {node.description}
            </p>
          </div>
        )}

        {/* Tags */}
        {node.tags && node.tags.length > 0 && (
          <div className="mb-6">
            <h3
              className="text-lg md:text-2xl font-display font-bold mb-2 md:mb-4"
              style={{ color: colors.electricBlue }}
            >
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2 pt-3">
              {node.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-mono border"
                  style={{
                    backgroundColor: `${colors.electricBlue}15`,
                    borderColor: `${colors.electricBlue}40`,
                    color: colors.electricBlue,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Connections */}
        {node.connections && node.connections.length > 0 && (
          <div className="mb-6">
            <h3
              className="text-lg md:text-2xl font-display font-bold mb-2 md:mb-4"
              style={{ color: colors.electricBlue }}
            >
              Connected Systems
            </h3>
            <div className="flex flex-wrap gap-2 pt-3">
              {node.connections.map((connId) => (
                <span
                  key={connId}
                  className="px-2 md:px-3 py-1 rounded text-xs font-mono"
                  style={{
                    backgroundColor: `${colors.violetFlux}20`,
                    color: colors.violetFlux,
                    borderWidth: '1px',
                    borderColor: `${colors.violetFlux}40`,
                  }}
                >
                  {connId}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex flex-col md:flex-row flex-wrap items-stretch md:items-center justify-between gap-2 md:gap-4 pt-3 md:pt-6 pb-4 border-t-2" style={{ borderColor: `${sectorColor}30` }}>
          {/* External Links */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-4">
          {node.links?.repo && (
            <a
              href={node.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 md:px-6 py-2 md:py-3 rounded-lg border-2 font-mono text-xs md:text-sm transition-all duration-200 hover:scale-105 cursor-pointer text-center"
              style={{
                color: colors.electricBlue,
                borderColor: `${colors.electricBlue}60`,
                backgroundColor: `${colors.electricBlue}10`,
              }}
            >
              🔗 View Repository
            </a>
          )}
          {node.links?.live && (
            <a
              href={node.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 md:px-6 py-2 md:py-3 rounded-lg border-2 font-mono text-xs md:text-sm transition-all duration-200 hover:scale-105 cursor-pointer text-center"
              style={{
                color: colors.signalGreen,
                borderColor: `${colors.signalGreen}60`,
                backgroundColor: `${colors.signalGreen}10`,
              }}
            >
              🌐 View Live Site
            </a>
          )}
          {node.links?.docs && (
            <a
              href={node.links.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 md:px-6 py-2 md:py-3 rounded-lg border-2 font-mono text-xs md:text-sm transition-all duration-200 hover:scale-105 cursor-pointer text-center"
              style={{
                color: colors.aurumGold,
                borderColor: `${colors.aurumGold}60`,
                backgroundColor: `${colors.aurumGold}10`,
              }}
            >
              📚 Documentation
            </a>
          )}
          </div>

          {/* Right side - Grid Node Link (Desktop only) */}
          {!isMobile && (
            <a
              href={`/nodes?search=${encodeURIComponent(node.name)}`}
              onClick={onClose}
              className="px-6 py-3 rounded-lg border-2 font-mono text-sm transition-all duration-200 hover:scale-105 cursor-pointer"
              style={{
                color: colors.violetFlux,
                borderColor: `${colors.violetFlux}60`,
                backgroundColor: `${colors.violetFlux}10`,
              }}
            >
              ⚡ View in Grid
            </a>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

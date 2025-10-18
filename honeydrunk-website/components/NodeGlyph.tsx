'use client';

/**
 * NodeGlyph — Individual node representation
 * Displays a single node with energy glow, pulse, and hover effects
 */

import { useState, useEffect } from 'react';
import type { VisualNode } from '@/lib/types';
import { colors } from '@/lib/tokens';

interface NodeGlyphProps {
  node: VisualNode;
  isSelected?: boolean;
  isConnected?: boolean;
  onClick?: () => void;
  onHover?: (hovered: boolean) => void;
}

export default function NodeGlyph({
  node,
  isSelected = false,
  isConnected = false,
  onClick,
  onHover,
}: NodeGlyphProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [pulsePhase, setPulsePhase] = useState(0);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Pulse animation
  useEffect(() => {
    if (node.signalVisuals.pulseSpeed === 0) return;

    const interval = setInterval(() => {
      setPulsePhase((prev) => (prev + 0.1) % (Math.PI * 2));
    }, 50);

    return () => clearInterval(interval);
  }, [node.signalVisuals.pulseSpeed]);

  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setIsHovered(true);
    onHover?.(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsHovered(false);
      onHover?.(false);
    }, 300); // 300ms delay before hiding
    setHoverTimeout(timeout);
  };

  const handleTooltipEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setIsHovered(true);
  };

  const handleTooltipLeave = () => {
    setIsHovered(false);
    onHover?.(false);
  };

  const baseSize = 80 + (node.energy || 50) * 0.8; // 80-160px based on energy
  const pulseScale = 1 + Math.sin(pulsePhase) * 0.05 * node.signalVisuals.glowIntensity;
  const hoverScale = isHovered ? 1.1 : 1;
  const selectedScale = isSelected ? 1.05 : 1;
  const finalScale = pulseScale * hoverScale * selectedScale;

  const glowSize = baseSize * 2 * node.signalVisuals.glowIntensity;
  const glowOpacity = node.signalVisuals.opacity * 0.4;

  return (
    <div
      className="absolute cursor-pointer transition-all duration-200"
      style={{
        left: `${node.position.x}px`,
        top: `${node.position.y}px`,
        transform: `translate(-50%, -50%) scale(${finalScale})`,
        opacity: node.signalVisuals.opacity,
        zIndex: isSelected ? 100 : isHovered ? 50 : 10,
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`${node.name}: ${node.short}`}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full blur-xl pointer-events-none"
        style={{
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: node.signalVisuals.color,
          opacity: glowOpacity * (isHovered ? 1.5 : 1),
          transition: 'opacity 200ms ease-out',
        }}
      />

      {/* Core node */}
      <div
        className="relative rounded-full border-2 flex flex-col items-center justify-center p-4"
        style={{
          width: `${baseSize}px`,
          height: `${baseSize}px`,
          backgroundColor: `${node.signalVisuals.color}20`,
          borderColor: node.signalVisuals.color,
          boxShadow: `0 0 ${glowSize / 2}px ${node.signalVisuals.color}`,
        }}
      >
        {/* Energy indicator */}
        <div
          className="absolute inset-1 rounded-full"
          style={{
            backgroundColor: node.signalVisuals.color,
            opacity: (node.energy || 50) / 200,
          }}
        />

        {/* Sector color ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `3px solid ${node.sectorVisuals.color}`,
            opacity: 0.8,
            boxShadow: `inset 0 0 10px ${node.sectorVisuals.color}40`,
          }}
        />

        {/* Node name */}
        <div
          className="relative z-10 text-center font-display font-bold text-xs leading-tight px-2 flex items-center justify-center"
          style={{
            color: colors.offWhite,
            textShadow: `0 0 8px ${colors.deepSpace}`,
            maxWidth: '100%',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto',
          }}
        >
          {node.name}
        </div>
      </div>

      {/* Description (visible on hover) */}
      {isHovered && (
        <div
          className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2
                     px-6 py-4 rounded-lg text-xs font-mono max-w-sm
                     backdrop-blur-sm pointer-events-auto space-y-2"
          style={{
            backgroundColor: `${colors.deepSpace}f0`,
            border: `2px solid ${colors.electricBlue}60`,
            color: colors.offWhite,
            boxShadow: `0 0 20px ${colors.electricBlue}40`,
          }}
          onMouseEnter={handleTooltipEnter}
          onMouseLeave={handleTooltipLeave}
        >
          <div className="font-display font-bold text-sm mb-2" style={{ color: colors.neonPink, textShadow: `0 0 10px ${colors.neonPink}60` }}>
            {node.name}
          </div>
          <div className="text-xs leading-relaxed mb-2">{node.short}</div>
          <div className="flex items-center gap-2 text-xs">
            <span style={{ color: colors.electricBlue }}>Sector:</span>
            <span style={{ color: node.sectorVisuals.color }}>{node.sector}</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span style={{ color: colors.electricBlue }}>Signal:</span>
            <span style={{ color: node.signalVisuals.color }}>{node.signal}</span>
          </div>
          {node.tags && node.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t" style={{ borderColor: `${colors.electricBlue}30` }}>
              {node.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded text-xs"
                  style={{
                    backgroundColor: `${colors.electricBlue}20`,
                    color: colors.electricBlue,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick links (visible on hover) */}
      {isHovered && node.links && (
        <div 
          className="absolute -top-14 left-1/2 transform -translate-x-1/2 flex gap-3"
          onMouseEnter={handleTooltipEnter}
          onMouseLeave={handleTooltipLeave}
        >
          {node.links.repo && (
            <div className="relative group">
              <a
                href={node.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gunmetal/80 backdrop-blur-sm
                         flex items-center justify-center hover:scale-110 transition-transform
                         border"
                style={{
                  borderColor: `${node.signalVisuals.color}60`,
                  backgroundColor: `${colors.gunmetal}cc`,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-base">🔗</span>
              </a>
              <div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2
                           px-2 py-1 rounded text-xs font-mono whitespace-nowrap
                           opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  backgroundColor: `${colors.deepSpace}f0`,
                  border: `1px solid ${colors.electricBlue}60`,
                  color: colors.electricBlue,
                }}
              >
                Repo
              </div>
            </div>
          )}
          {node.links.live && (
            <div className="relative group">
              <a
                href={node.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gunmetal/80 backdrop-blur-sm
                         flex items-center justify-center hover:scale-110 transition-transform
                         border"
                style={{
                  borderColor: `${node.signalVisuals.color}60`,
                  backgroundColor: `${colors.gunmetal}cc`,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-base">🌐</span>
              </a>
              <div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2
                           px-2 py-1 rounded text-xs font-mono whitespace-nowrap
                           opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{
                  backgroundColor: `${colors.deepSpace}f0`,
                  border: `1px solid ${colors.electricBlue}60`,
                  color: colors.electricBlue,
                }}
              >
                Live Site
              </div>
            </div>
          )}
        </div>
      )}

      {/* Connection indicator */}
      {isConnected && !isSelected && (
        <div
          className="absolute inset-0 rounded-full border-2 border-dashed animate-pulse"
          style={{
            borderColor: node.signalVisuals.color,
            width: `${baseSize + 10}px`,
            height: `${baseSize + 10}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </div>
  );
}

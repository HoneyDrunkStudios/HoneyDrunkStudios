'use client';

/**
 * NodeGlyph — Individual node representation
 * Displays a single node with energy glow, pulse, and hover effects
 */

import { useState, useEffect, useRef } from 'react';
import type { VisualNode } from '@/lib/types';
import { colors } from '@/lib/tokens';

interface NodeGlyphProps {
  node: VisualNode;
  isSelected?: boolean;
  isConnected?: boolean;
  onClick?: (e?: React.MouseEvent) => void;
  onHover?: (hovered: boolean) => void;
  onDragStart?: () => void;
  onDrag?: (deltaX: number, deltaY: number) => void;
  onDragEnd?: () => void;
  zoom?: number;
}

export default function NodeGlyph({
  node,
  isSelected = false,
  isConnected = false,
  onClick,
  onHover,
  onDragStart,
  onDrag,
  onDragEnd,
  zoom = 1,
}: NodeGlyphProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [pulsePhase, setPulsePhase] = useState(0);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragDistance, setDragDistance] = useState(0);
  const dragZoomRef = useRef(1);
  const cumulativeDeltaRef = useRef({ x: 0, y: 0 });
  const lastUpdateTimeRef = useRef(0);

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

  // Drag handlers
  const handleDragMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent grid panning
    setIsDragging(true);
    setDragDistance(0);
    setDragStart({ x: e.clientX, y: e.clientY });
    cumulativeDeltaRef.current = { x: 0, y: 0 }; // Reset cumulative delta
    dragZoomRef.current = zoom; // Capture zoom at drag start
    onDragStart?.();
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Use the zoom value captured at drag start for consistency
      const currentZoom = dragZoomRef.current;
      const deltaX = (e.clientX - dragStart.x) / currentZoom;
      const deltaY = (e.clientY - dragStart.y) / currentZoom;

      // Accumulate the total delta from the start position
      cumulativeDeltaRef.current.x += deltaX;
      cumulativeDeltaRef.current.y += deltaY;

      // Track total distance moved
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      setDragDistance((prev) => prev + distance);

      // Throttle updates to ~60fps (16ms) for better performance
      const now = Date.now();
      if (now - lastUpdateTimeRef.current >= 16) {
        onDrag?.(cumulativeDeltaRef.current.x, cumulativeDeltaRef.current.y);
        lastUpdateTimeRef.current = now;
      }
      
      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // Send final position update
      onDrag?.(cumulativeDeltaRef.current.x, cumulativeDeltaRef.current.y);
      onDragEnd?.();

      // Reset dragDistance after a short delay to allow click handler to check it
      setTimeout(() => {
        setDragDistance(0);
      }, 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, onDrag, onDragEnd]);

  const baseSize = 80 + (node.energy || 50) * 0.8; // 80-160px based on energy
  const pulseScale = 1 + Math.sin(pulsePhase) * 0.05 * node.signalVisuals.glowIntensity;
  const hoverScale = isHovered ? 1.1 : 1;
  const selectedScale = isSelected ? 1.05 : 1;
  const finalScale = pulseScale * hoverScale * selectedScale;

  const glowSize = baseSize * 2 * node.signalVisuals.glowIntensity;
  const glowOpacity = node.signalVisuals.opacity * 0.4;

  const handleClick = (e: React.MouseEvent) => {
    // Only trigger onClick if we haven't dragged (dragDistance less than 5px)
    if (dragDistance < 5) {
      onClick?.(e);
    }
  };

  return (
    <div
      className={`absolute ${isDragging ? '' : 'transition-all duration-200'}`}
      style={{
        left: `${node.position.x}px`,
        top: `${node.position.y}px`,
        transform: `translate(-50%, -50%) scale(${finalScale})`,
        opacity: node.signalVisuals.opacity,
        zIndex: isSelected ? 100 : isHovered ? 50 : isDragging ? 150 : 10,
        cursor: isDragging ? 'grabbing' : 'grab',
        transition: isDragging ? 'none' : undefined,
      }}
      onClick={handleClick}
      onMouseDown={handleDragMouseDown}
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

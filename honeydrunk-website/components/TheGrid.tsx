'use client';

/**
 * TheGrid — Main node visualization container
 * Manages layout, pan/zoom, and node interactions
 */

import React, { useState, useRef, useEffect } from 'react';
import type { VisualNode } from '@/lib/types';
import NodeGlyph from './NodeGlyph';

interface TheGridProps {
  nodes: VisualNode[];
  selectedNodeId?: string;
  onNodeClick?: (node: VisualNode) => void;
  className?: string;
}

export default function TheGrid({
  nodes,
  selectedNodeId,
  onNodeClick,
  className = '',
}: TheGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Center view on mount
  useEffect(() => {
    if (!containerRef.current || nodes.length === 0) return;

    const container = containerRef.current;

    // Calculate bounds of all nodes
    const minX = Math.min(...nodes.map(n => n.position.x));
    const maxX = Math.max(...nodes.map(n => n.position.x));
    const minY = Math.min(...nodes.map(n => n.position.y));
    const nodesWidth = maxX - minX;
    // Center horizontally, but position higher vertically (top-aligned with margin)
    const centerX = (container.clientWidth - nodesWidth) / 2 - minX;
    const topMargin = 150; // Add some space from the top
    const centerY = topMargin - minY;

    setPan({ x: centerX, y: centerY });
  }, [nodes]);

  // Mouse/touch pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setIsPanning(true);
    setPanStart({
      x: e.clientX - pan.x,
      y: e.clientY - pan.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    setZoom((prev) => Math.min(Math.max(0.5, prev + delta), 2));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 50;
      switch (e.key) {
        case 'ArrowUp':
          setPan((prev) => ({ ...prev, y: prev.y + step }));
          e.preventDefault();
          break;
        case 'ArrowDown':
          setPan((prev) => ({ ...prev, y: prev.y - step }));
          e.preventDefault();
          break;
        case 'ArrowLeft':
          setPan((prev) => ({ ...prev, x: prev.x + step }));
          e.preventDefault();
          break;
        case 'ArrowRight':
          setPan((prev) => ({ ...prev, x: prev.x - step }));
          e.preventDefault();
          break;
        case '0':
          setZoom(1);
          e.preventDefault();
          break;
        case '+':
        case '=':
          setZoom((prev) => Math.min(prev + 0.1, 2));
          e.preventDefault();
          break;
        case '-':
          setZoom((prev) => Math.max(prev - 0.1, 0.5));
          e.preventDefault();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Get connected node IDs
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);
  const connectedNodeIds = new Set(selectedNode?.connections || []);

  // Draw connection lines - now showing ALL connections
  const renderConnections = () => {
    const drawnConnections = new Set<string>();
    const allConnections: React.ReactElement[] = [];

    nodes.forEach((node) => {
      if (!node.connections) return;

      node.connections.forEach((connectedId) => {
        const connectedNode = nodes.find((n) => n.id === connectedId);
        if (!connectedNode) return;

        // Create a unique key for this connection pair (alphabetically sorted to avoid duplicates)
        const connectionKey = [node.id, connectedId].sort().join('-');

        // Skip if we've already drawn this connection
        if (drawnConnections.has(connectionKey)) return;
        drawnConnections.add(connectionKey);

        // Determine if this connection involves the selected node
        const isHighlighted = node.id === selectedNodeId || connectedId === selectedNodeId;

        allConnections.push(
          <line
            key={`connection-${connectionKey}`}
            x1={node.position.x}
            y1={node.position.y}
            x2={connectedNode.position.x}
            y2={connectedNode.position.y}
            stroke={isHighlighted ? node.signalVisuals.color : node.signalVisuals.color}
            strokeWidth={isHighlighted ? "3" : "2"}
            strokeDasharray="5,5"
            opacity={isHighlighted ? "0.8" : "0.4"}
            className={isHighlighted ? "animate-pulse" : ""}
          />
        );
      });
    });

    if (allConnections.length === 0) return null;

    return (
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
      >
        {allConnections}
      </svg>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      style={{
        cursor: isPanning ? 'grabbing' : 'grab',
      }}
    >
      {/* Grid container with transform */}
      <div
        className="absolute inset-0 transition-transform duration-100"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
        }}
      >
        {/* Connection lines */}
        {renderConnections()}

        {/* Nodes */}
        {nodes.map((node) => (
          <NodeGlyph
            key={node.id}
            node={node}
            isSelected={node.id === selectedNodeId}
            isConnected={connectedNodeIds.has(node.id)}
            onClick={() => onNodeClick?.(node)}
          />
        ))}
      </div>

      {/* Controls hint */}
      <div
        className="absolute bottom-16 left-16 px-8 py-5 rounded-lg
                   bg-gunmetal/80 backdrop-blur-sm border border-slate-light/20
                   text-sm font-mono text-slate-light leading-relaxed"
      >
        <div className="mb-3">Drag to pan • Scroll to zoom • Arrow keys to navigate</div>
        <div className="opacity-60">
          Press 0 to reset zoom • +/- to zoom in/out
        </div>
      </div>

      {/* Zoom indicator */}
      <div
        className="absolute top-12 right-12 px-5 py-3 rounded-lg
                   bg-gunmetal/80 backdrop-blur-sm border border-slate-light/20
                   text-xs font-mono text-slate-light"
      >
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
}

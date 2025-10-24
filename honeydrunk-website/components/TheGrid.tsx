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
  useFlowVisuals?: boolean; // Toggle Flow-based visual mode
}

const STORAGE_KEY = 'honeydrunk_node_positions';

export default function TheGrid({
  nodes,
  selectedNodeId,
  onNodeClick,
  className = '',
  useFlowVisuals = false,
}: TheGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | undefined>();
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
  const [isDraggingNode, setIsDraggingNode] = useState(false);

  // Load saved positions from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setNodePositions(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load node positions:', error);
    }
  }, []);

  // Save positions to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(nodePositions).length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nodePositions));
      } catch (error) {
        console.error('Failed to save node positions:', error);
      }
    }
  }, [nodePositions]);

  // Get node with custom position
  const getNodePosition = (node: VisualNode) => {
    return nodePositions[node.id] || node.position;
  };

  // Update node positions with merged custom positions
  const nodesWithPositions = nodes.map((node) => ({
    ...node,
    position: getNodePosition(node),
  }));

  // Center view on mount and reset on resize
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!containerRef.current || nodes.length === 0) return;
    if (hasInitialized.current) return; // Only run once on mount

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
    hasInitialized.current = true;
  }, [nodes]);

  // Reset positions and zoom on window resize to prevent coordinate issues
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Clear custom positions and reset zoom
        setNodePositions({});
        setZoom(1);
        localStorage.removeItem(STORAGE_KEY);
      }, 500);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Node drag handlers with performance optimization
  const dragStateRef = useRef<{ nodeId: string; startPos: { x: number; y: number } } | null>(null);
  
  const handleNodeDragStart = (nodeId: string) => {
    setIsDraggingNode(true);
    // Store the initial position when drag starts
    const currentPos = nodePositions[nodeId] || nodes.find((n) => n.id === nodeId)?.position;
    if (currentPos) {
      dragStateRef.current = { nodeId, startPos: { ...currentPos } };
    }
  };

  const handleNodeDrag = (nodeId: string, deltaX: number, deltaY: number) => {
    // Use the stored start position and add the cumulative delta
    if (!dragStateRef.current || dragStateRef.current.nodeId !== nodeId) return;
    
    const { startPos } = dragStateRef.current;
    setNodePositions((prev) => ({
      ...prev,
      [nodeId]: {
        x: startPos.x + deltaX,
        y: startPos.y + deltaY,
      },
    }));
  };

  const handleNodeDragEnd = () => {
    setIsDraggingNode(false);
    dragStateRef.current = null;
  };

  // Mouse/touch pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    if (isDraggingNode) return; // Don't pan while dragging a node
    setIsPanning(true);
    setPanStart({
      x: e.clientX - pan.x,
      y: e.clientY - pan.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || isDraggingNode) return;
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
  const selectedNode = nodesWithPositions.find((n) => n.id === selectedNodeId);
  const connectedNodeIds = new Set(selectedNode?.connections || []);

  // Draw connection lines - now showing ALL connections
  const renderConnections = () => {
    const drawnConnections = new Set<string>();
    const allConnections: React.ReactElement[] = [];

    nodesWithPositions.forEach((node) => {
      if (!node.connections) return;

      node.connections.forEach((connectedId) => {
        const connectedNode = nodesWithPositions.find((n) => n.id === connectedId);
        if (!connectedNode) return;

        // Create a unique key for this connection pair (alphabetically sorted to avoid duplicates)
        const connectionKey = [node.id, connectedId].sort().join('-');

        // Skip if we've already drawn this connection
        if (drawnConnections.has(connectionKey)) return;
        drawnConnections.add(connectionKey);

        // Determine if this connection involves the selected or hovered node
        const isHighlighted = node.id === selectedNodeId || connectedId === selectedNodeId ||
                              node.id === hoveredNodeId || connectedId === hoveredNodeId;
        const lineColor = isHighlighted ? node.signalVisuals.color : node.sectorVisuals.color;

        allConnections.push(
          <g key={`connection-${connectionKey}`}>
            {/* Glow effect layer */}
            <line
              x1={node.position.x}
              y1={node.position.y}
              x2={connectedNode.position.x}
              y2={connectedNode.position.y}
              stroke={lineColor}
              strokeWidth={isHighlighted ? "8" : "4"}
              opacity={isHighlighted ? "0.3" : "0.1"}
              strokeLinecap="round"
            />
            {/* Main line with dash offset animation */}
            <line
              x1={node.position.x}
              y1={node.position.y}
              x2={connectedNode.position.x}
              y2={connectedNode.position.y}
              stroke={lineColor}
              strokeWidth={isHighlighted ? "2" : "1"}
              strokeDasharray={isHighlighted ? "8,4" : "4,4"}
              strokeDashoffset={isHighlighted ? "0" : "0"}
              opacity={isHighlighted ? "0.9" : "0.3"}
              strokeLinecap="round"
              style={isHighlighted ? {
                animation: 'dashFlow 1.5s linear infinite'
              } : undefined}
            />
          </g>
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
        {nodesWithPositions.map((node) => (
          <NodeGlyph
            key={node.id}
            node={node}
            isSelected={node.id === selectedNodeId}
            isConnected={connectedNodeIds.has(node.id)}
            onClick={() => onNodeClick?.(node)}
            onHover={(hovered) => setHoveredNodeId(hovered ? node.id : undefined)}
            onDragStart={() => handleNodeDragStart(node.id)}
            onDrag={(deltaX, deltaY) => handleNodeDrag(node.id, deltaX, deltaY)}
            onDragEnd={handleNodeDragEnd}
            zoom={zoom}
            useFlowVisuals={useFlowVisuals}
          />
        ))}
      </div>

      {/* Controls hint */}
      <div
        className="absolute bottom-16 left-16 px-8 py-5 rounded-lg
                   bg-gunmetal/80 backdrop-blur-sm border border-slate-light/20
                   text-sm font-mono text-slate-light leading-relaxed"
      >
        <div className="mb-3">Drag nodes to reposition • Drag canvas to pan • Scroll to zoom</div>
        <div className="opacity-60">
          Arrow keys to navigate • Press 0 to reset zoom • +/- to zoom in/out
        </div>
        <button
          onClick={() => setNodePositions({})}
          className="mt-3 px-4 py-2 rounded border text-xs cursor-pointer hover:bg-slate-light/10 transition-colors"
          style={{
            borderColor: 'rgba(148, 163, 184, 0.3)',
            color: 'rgb(148, 163, 184)',
          }}
        >
          Reset Node Positions
        </button>
      </div>

      {/* Zoom indicator */}
      <div
        className="absolute top-24 right-6 px-5 py-3 rounded-lg
                   bg-gunmetal/80 backdrop-blur-sm border border-slate-light/20
                   text-xs font-mono text-slate-light z-50"
      >
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
}

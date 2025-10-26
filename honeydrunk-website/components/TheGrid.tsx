'use client';

/**
 * TheGrid — Enhanced grid visualization for nodes, modules, and services
 * Renders all three entity types with proper visual hierarchy
 */

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import type { GridData, VisualNode, VisualModule, VisualService, GridEdge, GridPosition } from '@/lib/entities';
import { colors } from '@/lib/tokens';

interface TheGridProps {
  gridData: GridData;
  selectedEntityId?: string;
  onNodeClick?: (node: VisualNode) => void;
  onServiceClick?: (service: VisualService) => void;
  onModuleClick?: (module: VisualModule) => void;
  className?: string;
}

const STORAGE_KEY = 'honeydrunk_grid_positions';

export default function TheGrid({
  gridData,
  selectedEntityId,
  onNodeClick,
  onServiceClick,
  onModuleClick,
  className = '',
}: TheGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.8); // Start at 80% zoom
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [hoveredId, setHoveredId] = useState<string | undefined>();
  const [nodePositions, setNodePositions] = useState<Record<string, GridPosition>>({});
  const [isDraggingNode, setIsDraggingNode] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const dragStateRef = useRef<{ nodeId: string; startPos: GridPosition; startMouse: { x: number; y: number } } | null>(null);

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

  // Get node position (custom or default)
  const getNodePosition = (node: VisualNode): GridPosition => {
    return nodePositions[node.id] || node.position;
  };

  // Apply custom positions to nodes - memoized to prevent re-renders
  const nodesWithPositions = useMemo(() => 
    gridData.nodes.map(node => ({
      ...node,
      position: getNodePosition(node),
    })),
    [gridData.nodes, nodePositions]
  );

  // Recalculate module positions based on updated parent node positions - memoized
  const modulesWithPositions = useMemo(() => {
    return gridData.modules.map(module => {
      // Find the parent node and its current position
      const parentNode = nodesWithPositions.find(n => n.id === module.parent);
      if (!parentNode) return module;

      // Calculate the offset from the original parent position
      const originalParentPos = module.parentPosition;
      const currentParentPos = parentNode.position;
      const deltaX = currentParentPos.x - originalParentPos.x;
      const deltaY = currentParentPos.y - originalParentPos.y;

      // Apply the same offset to the module position
      return {
        ...module,
        position: {
          x: module.position.x + deltaX,
          y: module.position.y + deltaY,
        },
        parentPosition: currentParentPos,
      };
    });
  }, [gridData.modules, nodesWithPositions]);

  // Recalculate edges with updated node positions - memoized
  const edgesWithPositions = useMemo(() => {
    return gridData.edges.map(edge => {
      // Find the from/to entities and their current positions
      const fromNode = nodesWithPositions.find(n => n.id === edge.from);
      const fromService = gridData.services.find(s => s.id === edge.from);
      const toNode = nodesWithPositions.find(n => n.id === edge.to);
      const toModule = modulesWithPositions.find(m => m.id === edge.to);
      
      return {
        ...edge,
        fromPos: fromNode?.position || fromService?.position || edge.fromPos,
        toPos: toNode?.position || toModule?.position || edge.toPos,
      };
    });
  }, [gridData.edges, gridData.services, nodesWithPositions, modulesWithPositions]);

  // Center view on mount and when gridData changes
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only run on initial mount, not on subsequent updates
    if (hasInitialized.current) return;
    
    if (!containerRef.current) return;
    if (gridData.nodes.length === 0 && gridData.services.length === 0) return;

    const container = containerRef.current;

    // Calculate bounds of ALL entities (nodes, modules, services)
    const allX = [
      ...nodesWithPositions.map(n => n.position.x),
      ...modulesWithPositions.map(m => m.position.x),
      ...gridData.services.map(s => s.position.x),
    ];
    const allY = [
      ...nodesWithPositions.map(n => n.position.y),
      ...modulesWithPositions.map(m => m.position.y),
      ...gridData.services.map(s => s.position.y),
    ];

    if (allX.length === 0 || allY.length === 0) return;

    const minX = Math.min(...allX);
    const maxX = Math.max(...allX);
    const minY = Math.min(...allY);
    const maxY = Math.max(...allY);
    
    const contentWidth = maxX - minX;
    const contentHeight = maxY - minY;

    // Center horizontally, but position toward top vertically
    const contentCenterX = (minX + maxX) / 2;
    const contentCenterY = (minY + maxY) / 2;
    
    const viewportCenterX = container.clientWidth / 2;
    
    // Center horizontally, align top with viewport top
    const centerX = viewportCenterX - contentCenterX;
    const topMargin = 100; // Small margin from top
    const centerY = topMargin - minY; // Align content top near viewport top

    setPan({ x: centerX, y: centerY });
    hasInitialized.current = true;
  }, [nodesWithPositions, modulesWithPositions, gridData.services]);

  // Node drag handlers with proper click prevention
  const handleNodeDragStart = useCallback((e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDraggingNode(true);
    setDragDistance(0);
    const currentPos = nodePositions[nodeId] || gridData.nodes.find(n => n.id === nodeId)?.position;
    if (currentPos) {
      dragStateRef.current = { 
        nodeId, 
        startPos: { ...currentPos },
        startMouse: { x: e.clientX, y: e.clientY }
      };
    }
  }, [nodePositions, gridData.nodes]);

  const handleNodeDrag = useCallback((e: React.MouseEvent) => {
    if (!isDraggingNode || !dragStateRef.current) return;

    const { nodeId, startPos, startMouse } = dragStateRef.current;
    
    // Calculate total delta from start position
    const totalDeltaX = (e.clientX - startMouse.x) / zoom;
    const totalDeltaY = (e.clientY - startMouse.y) / zoom;
    
    // Track distance for click detection
    const distance = Math.sqrt(totalDeltaX * totalDeltaX + totalDeltaY * totalDeltaY);
    setDragDistance(distance);

    // Update position based on start position + total delta
    setNodePositions(prev => ({
      ...prev,
      [nodeId]: {
        x: startPos.x + totalDeltaX,
        y: startPos.y + totalDeltaY,
      },
    }));
  }, [isDraggingNode, zoom]);

  const handleNodeDragEnd = useCallback(() => {
    setIsDraggingNode(false);
    // Reset drag distance after a delay to allow click handler to check it
    setTimeout(() => {
      setDragDistance(0);
      dragStateRef.current = null;
    }, 100);
  }, []);

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    if (isDraggingNode) return; // Don't pan while dragging node
    setIsPanning(true);
    setPanStart({
      x: e.clientX - pan.x,
      y: e.clientY - pan.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingNode) {
      handleNodeDrag(e);
      return;
    }
    if (!isPanning) return;
    setPan({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    if (isDraggingNode) {
      handleNodeDragEnd();
    }
  };

  // Zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    setZoom((prev) => Math.min(Math.max(0.5, prev + delta), 2));
  };

  // Render connection edges with updated positions
  const renderEdges = useCallback(() => {
    return edgesWithPositions.map((edge, idx) => {
      const isHighlighted = edge.from === selectedEntityId ||
                           edge.to === selectedEntityId ||
                           edge.from === hoveredId ||
                           edge.to === hoveredId;

      const strokeDasharray = edge.style === 'dotted' ? '8,4' : undefined;

      return (
        <g key={`edge-${idx}`}>
          {/* Glow layer */}
          <line
            x1={edge.fromPos.x}
            y1={edge.fromPos.y}
            x2={edge.toPos.x}
            y2={edge.toPos.y}
            stroke={edge.color}
            strokeWidth={isHighlighted ? 8 : 4}
            opacity={isHighlighted ? 0.2 : 0.05}
            strokeLinecap="round"
          />
          {/* Main line */}
          <line
            x1={edge.fromPos.x}
            y1={edge.fromPos.y}
            x2={edge.toPos.x}
            y2={edge.toPos.y}
            stroke={edge.color}
            strokeWidth={isHighlighted ? 2 : 1}
            strokeDasharray={strokeDasharray}
            opacity={isHighlighted ? 0.7 : 0.2}
            strokeLinecap="round"
          />
        </g>
      );
    });
  }, [edgesWithPositions, selectedEntityId, hoveredId]);

  // Render a node as a hexagon
  const renderNode = useCallback((node: VisualNode) => {
    const isSelected = node.id === selectedEntityId;
    const isHovered = node.id === hoveredId;
    const size = 80;

    // Create hexagon points
    const points: string[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      const x = node.position.x + size * Math.cos(angle);
      const y = node.position.y + size * Math.sin(angle);
      points.push(`${x},${y}`);
    }

    return (
      <g
        key={node.id}
        onMouseEnter={() => setHoveredId(node.id)}
        onMouseLeave={() => setHoveredId(undefined)}
        onMouseDown={(e) => handleNodeDragStart(e, node.id)}
        onClick={(e) => {
          // Only trigger click if we haven't dragged more than 10 pixels
          if (dragDistance < 10) {
            onNodeClick?.(node);
          }
        }}
        style={{ cursor: isDraggingNode ? 'grabbing' : 'grab' }}
      >
        {/* Glow */}
        <polygon
          points={points.join(' ')}
          fill={node.sectorColor}
          opacity={0.2}
          filter={isSelected || isHovered ? `url(#glow-${node.id})` : undefined}
        />
        {/* Main hex */}
        <polygon
          points={points.join(' ')}
          fill={`${node.sectorColor}60`}
          stroke={isSelected ? node.signalColor : node.sectorColor}
          strokeWidth={isSelected || isHovered ? 3 : 2}
          opacity={isHovered ? 1 : 0.95}
        />
        {/* Node name */}
        <text
          x={node.position.x}
          y={node.position.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={colors.offWhite}
          fontSize="12"
          fontFamily="monospace"
          fontWeight="bold"
          pointerEvents="none"
          style={{
            textShadow: `0 0 10px ${node.sectorColor}`,
          }}
        >
          {node.name.startsWith('HoneyDrunk.') ? node.name.split('.').pop() : node.name}
        </text>
        {/* Signal indicator dot - positioned below text */}
        <circle
          cx={node.position.x}
          cy={node.position.y + 14}
          r={6}
          fill={node.signalColor}
          opacity={0.9}
          filter={`url(#signal-glow-${node.id})`}
          pointerEvents="none"
        />

        {/* Glow filter definition */}
        {(isSelected || isHovered) && (
          <defs>
            <filter id={`glow-${node.id}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        )}
        {/* Signal dot glow filter - always present */}
        <defs>
          <filter id={`signal-glow-${node.id}`} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="4" result="signalBlur"/>
            <feMerge>
              <feMergeNode in="signalBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </g>
    );
  }, [selectedEntityId, hoveredId, isDraggingNode, dragDistance, handleNodeDragStart, onNodeClick]);

  // Render a module as a larger, more descriptive chip
  const renderModule = useCallback((module: VisualModule) => {
    const isHovered = module.id === hoveredId;
    const isSelected = module.id === selectedEntityId;

    // Extract last part of module name (e.g., "Transport" from "HoneyDrunk.Transport")
    const shortName = module.name.split('.').pop() || module.name;
    
    // Split long names into two lines
    const maxCharsPerLine = 10;
    let line1 = shortName;
    let line2 = '';
    
    if (shortName.length > maxCharsPerLine) {
      // Try to break at a natural point (capital letter, space, etc.)
      let breakPoint = maxCharsPerLine;
      for (let i = maxCharsPerLine; i > 0; i--) {
        if (i < shortName.length && /[A-Z]/.test(shortName[i])) {
          breakPoint = i;
          break;
        }
      }
      line1 = shortName.substring(0, breakPoint);
      line2 = shortName.substring(breakPoint);
    }
    
    const hasMultipleLines = line2.length > 0;
    
    // Calculate dynamic width based on longest line
    const maxLineLength = Math.max(line1.length, line2.length);
    const textWidth = maxLineLength * 7; // Approximate char width in monospace
    const padding = 16;
    const pillWidth = textWidth + padding * 2;
    const pillHeight = hasMultipleLines ? 40 : 30;

    return (
      <g
        key={module.id}
        onMouseEnter={() => setHoveredId(module.id)}
        onMouseLeave={() => setHoveredId(undefined)}
        onClick={() => onModuleClick?.(module)}
        style={{ cursor: 'pointer' }}
      >
        {/* Connector line to parent */}
        <line
          x1={module.position.x}
          y1={module.position.y}
          x2={module.parentPosition.x}
          y2={module.parentPosition.y}
          stroke={module.signalColor}
          strokeWidth={isHovered || isSelected ? 2 : 1}
          opacity={isHovered || isSelected ? 0.5 : 0.3}
          strokeDasharray="3,3"
        />

        {/* Module background pill */}
        <rect
          x={module.position.x - pillWidth / 2}
          y={module.position.y - pillHeight / 2}
          width={pillWidth}
          height={pillHeight}
          rx={pillHeight / 2}
          fill={`${module.signalColor}70`}
          stroke={module.signalColor}
          strokeWidth={isHovered || isSelected ? 2 : 1.5}
          opacity={isHovered ? 1 : 0.95}
        />

        {/* Status dot if applicable */}
        {module.status_dot && (
          <circle
            cx={module.position.x - pillWidth / 2 + 12}
            cy={module.position.y}
            r={4}
            fill={module.status_dot === 'beta' ? colors.aurumGold : colors.violetFlux}
          />
        )}

        {/* Module name */}
        {hasMultipleLines ? (
          <>
            <text
              x={module.position.x}
              y={module.position.y - 6}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={colors.offWhite}
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
              pointerEvents="none"
              style={{
                textShadow: `0 0 8px ${module.signalColor}, 0 1px 2px rgba(0,0,0,0.8)`,
              }}
            >
              {line1}
            </text>
            <text
              x={module.position.x}
              y={module.position.y + 6}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={colors.offWhite}
              fontSize="11"
              fontFamily="monospace"
              fontWeight="bold"
              pointerEvents="none"
              style={{
                textShadow: `0 0 8px ${module.signalColor}, 0 1px 2px rgba(0,0,0,0.8)`,
              }}
            >
              {line2}
            </text>
          </>
        ) : (
          <text
            x={module.position.x}
            y={module.position.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={colors.offWhite}
            fontSize="11"
            fontFamily="monospace"
            fontWeight="bold"
            pointerEvents="none"
            style={{
              textShadow: `0 0 8px ${module.signalColor}, 0 1px 2px rgba(0,0,0,0.8)`,
            }}
          >
            {line1}
          </text>
        )}

        {/* Slot indicator */}
        <text
          x={module.position.x}
          y={module.position.y + (hasMultipleLines ? 28 : 24)}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={module.signalColor}
          fontSize="8"
          fontFamily="monospace"
          pointerEvents="none"
          opacity={0.9}
          style={{
            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
          }}
        >
          {module.slot}
        </text>
      </g>
    );
  }, [hoveredId, selectedEntityId, onModuleClick]);

  // Render a service as a rounded rectangle
  const renderService = useCallback((service: VisualService) => {
    const isSelected = service.id === selectedEntityId;
    const isHovered = service.id === hoveredId;
    const width = 180;
    const height = 60;

    return (
      <g
        key={service.id}
        onMouseEnter={() => setHoveredId(service.id)}
        onMouseLeave={() => setHoveredId(undefined)}
        onClick={() => onServiceClick?.(service)}
        style={{ cursor: 'pointer' }}
      >
        {/* Service box */}
        <rect
          x={service.position.x - width / 2}
          y={service.position.y - height / 2}
          width={width}
          height={height}
          rx={8}
          fill={`${service.tierColor}50`}
          stroke={isSelected ? service.signalColor : service.tierColor}
          strokeWidth={isSelected || isHovered ? 2 : 1}
          opacity={isHovered ? 1 : 0.9}
        />

        {/* Service name */}
        <text
          x={service.position.x}
          y={service.position.y - 8}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={colors.offWhite}
          fontSize="11"
          fontFamily="monospace"
          fontWeight="bold"
          pointerEvents="none"
        >
          {service.name}
        </text>

        {/* Service tier */}
        <text
          x={service.position.x}
          y={service.position.y + 8}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={service.tierColor}
          fontSize="8"
          fontFamily="monospace"
          pointerEvents="none"
        >
          {service.tier}
        </text>
      </g>
    );
  }, [selectedEntityId, hoveredId, onServiceClick]);

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
        {/* SVG for all grid elements */}
        <svg
          className="absolute inset-0"
          style={{
            width: '100%',
            height: '100%',
            overflow: 'visible',
          }}
        >
          {/* Render edges first (background) */}
          {renderEdges()}

          {/* Render nodes (with custom positions) */}
          {nodesWithPositions.map(renderNode)}

          {/* Render modules (with updated positions based on parent nodes) */}
          {modulesWithPositions.map(renderModule)}

          {/* Render services */}
          {gridData.services.map(renderService)}
        </svg>
      </div>

      {/* Controls hint */}
      <div
        className="absolute bottom-6 right-6 px-4 py-2 rounded-lg
                   backdrop-blur-sm border text-xs font-mono"
        style={{
          backgroundColor: `${colors.gunmetal}80`,
          borderColor: `${colors.slateLight}20`,
          color: colors.slateLight,
        }}
      >
        <div className="mb-1.5 opacity-80">Drag nodes • Drag canvas to pan • Scroll to zoom</div>
        <button
          onClick={() => {
            setNodePositions({});
            localStorage.removeItem(STORAGE_KEY);
          }}
          className="px-2 py-1 rounded border text-xs transition-colors hover:bg-slate-light/10 cursor-pointer"
          style={{
            borderColor: `${colors.slateLight}30`,
            color: colors.slateLight,
          }}
        >
          Reset Positions
        </button>
      </div>

      {/* Zoom indicator */}
      <div
        className="absolute top-24 right-6 px-4 py-2 rounded-lg
                   backdrop-blur-sm border text-xs font-mono z-50"
        style={{
          backgroundColor: `${colors.gunmetal}80`,
          borderColor: `${colors.slateLight}20`,
          color: colors.slateLight,
        }}
      >
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
}

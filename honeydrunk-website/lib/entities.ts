/**
 * HoneyDrunk Studios — Entity Data Utilities
 * Functions for loading nodes, modules, and services from the schema
 */

import nodesData from '@/data/schema/nodes.json';
import modulesData from '@/data/schema/modules.json';
import servicesData from '@/data/schema/services.json';
import { getSectorColorsMap } from './sectors';

// Entity types
export interface Node {
  id: string;
  type: 'node';
  name: string;
  short: string;
  description?: string;
  sector: string;
  signal: string;
  cluster?: string;
  energy?: number;
  priority?: number;
  slots?: string[];
  depends_on?: string[];
  tags?: string[];
  links?: {
    repo?: string;
    live?: string;
    docs?: string;
  };
  long_description?: {
    overview?: string;
    why_it_exists?: string;
    primary_audience?: string;
    value_props?: string[];
    monetization_signal?: string;
    roadmap_focus?: string;
    grid_relationship?: string;
    integration_depth?: string;
    demo_path?: string;
    signal_quote?: string;
    stability_tier?: string;
    impact_vector?: string;
  };
  _dictionary_ref?: {
    version: string;
    path: string;
  };
}

export interface Module {
  id: string;
  type: 'module';
  name: string;
  parent: string;
  slot: string;
  signal: string;
  status_dot?: 'beta' | 'experimental';
  integration_depth: 'shallow' | 'medium' | 'deep';
  tags?: string[];
  long_description?: {
    overview?: string;
    why_it_exists?: string;
    primary_audience?: string;
    value_props?: string[];
    monetization_signal?: string;
    roadmap_focus?: string;
    grid_relationship?: string;
    demo_path?: string;
    signal_quote?: string;
    stability_tier?: string;
    impact_vector?: string;
  };
  _dictionary_ref?: {
    version: string;
    path: string;
  };
}

export interface Service {
  id: string;
  type: 'service';
  name: string;
  owner: string;
  tier: 'prod-critical' | 'internal' | 'experimental';
  runtime: {
    language: string;
    target: string;
  };
  region: string;
  envs: string[];
  depends_on: string[];
  interfaces?: {
    http?: string[];
    events_in?: string[];
    events_out?: string[];
  };
  observability?: {
    pulse_dash?: string;
    alerts?: string[];
  };
  release_channel?: {
    ring?: string;
    flags?: string[];
  };
  last_deploy?: string;
  signal: string;
  long_description?: {
    overview?: string;
    why_it_exists?: string;
    primary_audience?: string;
    value_props?: string[];
    monetization_signal?: string;
    roadmap_focus?: string;
    grid_relationship?: string;
    integration_depth?: string;
    demo_path?: string;
    signal_quote?: string;
    stability_tier?: string;
    impact_vector?: string;
  };
  _dictionary_ref?: {
    version: string;
    path: string;
  };
}

export type Entity = Node | Module | Service;

// Cast imported data
const nodes = nodesData as Node[];
const modules = modulesData as Module[];
const services = servicesData as Service[];

/**
 * Get all nodes
 */
export function getNodes(): Node[] {
  return nodes;
}

/**
 * Get all modules
 */
export function getModules(): Module[] {
  return modules;
}

/**
 * Get all services
 */
export function getServices(): Service[] {
  return services;
}

/**
 * Get all entities (nodes + modules + services)
 */
export function getAllEntities(): Entity[] {
  return [...nodes, ...modules, ...services];
}

/**
 * Get a node by ID
 */
export function getNodeById(id: string): Node | undefined {
  return nodes.find(n => n.id === id);
}

/**
 * Get a module by ID
 */
export function getModuleById(id: string): Module | undefined {
  return modules.find(m => m.id === id);
}

/**
 * Get a service by ID
 */
export function getServiceById(id: string): Service | undefined {
  return services.find(s => s.id === id);
}

/**
 * Get any entity by ID
 */
export function getEntityById(id: string): Entity | undefined {
  return getNodeById(id) || getModuleById(id) || getServiceById(id);
}

/**
 * Get modules for a specific node (by parent ID)
 */
export function getModulesByParent(parentId: string): Module[] {
  return modules.filter(m => m.parent === parentId);
}

/**
 * Get modules by slot type
 */
export function getModulesBySlot(parentId: string, slot: string): Module[] {
  return modules.filter(m => m.parent === parentId && m.slot === slot);
}

/**
 * Get services that depend on a specific entity (node or module)
 */
export function getServicesByDependency(entityId: string): Service[] {
  return services.filter(s => s.depends_on.includes(entityId));
}

/**
 * Get nodes that a specific node depends on (downstream dependencies)
 */
export function getNodeDependencies(nodeId: string): Node[] {
  const node = nodes.find(n => n.id === nodeId);
  if (!node || !node.depends_on) return [];
  
  return node.depends_on
    .map(depId => nodes.find(n => n.id === depId))
    .filter((n): n is Node => n !== undefined);
}

/**
 * Get nodes that depend on a specific node (upstream dependents)
 */
export function getNodeDependents(nodeId: string): Node[] {
  return nodes.filter(n => n.depends_on?.includes(nodeId));
}

/**
 * Get nodes grouped by sector
 */
export function getNodesBySector(): Record<string, Node[]> {
  return nodes.reduce((acc, node) => {
    if (!acc[node.sector]) {
      acc[node.sector] = [];
    }
    acc[node.sector].push(node);
    return acc;
  }, {} as Record<string, Node[]>);
}

/**
 * Get modules grouped by parent
 */
export function getModulesByParentGrouped(): Record<string, Module[]> {
  return modules.reduce((acc, module) => {
    if (!acc[module.parent]) {
      acc[module.parent] = [];
    }
    acc[module.parent].push(module);
    return acc;
  }, {} as Record<string, Module[]>);
}

/**
 * Get all unique sectors
 */
export function getAllSectors(): string[] {
  return Array.from(new Set(nodes.map(n => n.sector))).sort();
}

/**
 * Get all unique signals
 */
export function getAllSignals(): string[] {
  const allSignals = new Set([
    ...nodes.map(n => n.signal),
    ...modules.map(m => m.signal),
    ...services.map(s => s.signal)
  ]);
  return Array.from(allSignals).sort();
}

/**
 * Filter nodes by sector, signal, or search query
 */
export function filterNodes(
  sectorFilter?: string[],
  signalFilter?: string[],
  searchQuery?: string
): Node[] {
  return nodes.filter(node => {
    const matchesSector = !sectorFilter || sectorFilter.length === 0 || sectorFilter.includes(node.sector);
    const matchesSignal = !signalFilter || signalFilter.length === 0 || signalFilter.includes(node.signal);
    const matchesSearch = !searchQuery ||
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.short?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSector && matchesSignal && matchesSearch;
  });
}

/**
 * Filter services by tier, owner, signal, or dependency
 */
export function filterServices(
  tierFilter?: string[],
  ownerFilter?: string[],
  signalFilter?: string[],
  dependencyFilter?: string[]
): Service[] {
  return services.filter(service => {
    const matchesTier = !tierFilter || tierFilter.length === 0 || tierFilter.includes(service.tier);
    const matchesOwner = !ownerFilter || ownerFilter.length === 0 || ownerFilter.includes(service.owner);
    const matchesSignal = !signalFilter || signalFilter.length === 0 || signalFilter.includes(service.signal);
    const matchesDependency = !dependencyFilter || dependencyFilter.length === 0 ||
      dependencyFilter.some(dep => service.depends_on.includes(dep));

    return matchesTier && matchesOwner && matchesSignal && matchesDependency;
  });
}

// ============================================================
// GRID VISUALIZATION TYPES AND FUNCTIONS
// ============================================================

export interface GridPosition {
  x: number;
  y: number;
  z?: number;
}

export interface VisualNode extends Node {
  position: GridPosition;
  sectorColor: string;
  signalColor: string;
}

export interface VisualModule extends Module {
  position: GridPosition;
  parentPosition: GridPosition;
  signalColor: string;
  angle: number; // Position around parent perimeter
}

export interface VisualService extends Service {
  position: GridPosition;
  tierColor: string;
  signalColor: string;
}

export interface GridEdge {
  from: string;
  to: string;
  type: 'node-node' | 'service-node' | 'service-module';
  fromPos: GridPosition;
  toPos: GridPosition;
  color: string;
  style: 'solid' | 'dotted';
}

export interface GridData {
  nodes: VisualNode[];
  modules: VisualModule[];
  edges: GridEdge[];
}

/**
 * Color mappings
 */
import { colors } from './tokens';

// Sector colors (now from sectors.json)
export const sectorColors = getSectorColorsMap();

const signalColorMap: Record<string, string> = {
  Seed: colors.slateLight,
  Awake: colors.violetFlux,
  Wiring: colors.aurumGold,
  Live: colors.signalGreen,
  Echo: colors.electricBlue,
  Archive: colors.neonPink,
};

const tierColorMap: Record<string, string> = {
  'prod-critical': colors.neonPink,
  'internal': colors.electricBlue,
  'experimental': colors.violetFlux,
};

/**
 * Export tier colors for external use
 */
export function getTierColorsMap(): Record<string, string> {
  return tierColorMap;
}

/**
 * Simple hash function for deterministic positions
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

/**
 * Seeded random number generator for consistent positions
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
}

/**
 * Generate grid position for a node
 */
function generateNodePosition(node: Node, index: number): GridPosition {
  const rng = new SeededRandom(hashString(node.id));

  // Hex lattice layout with 4 nodes per row
  const cols = 4;
  const hexWidth = 500; // Spacing for 4-column layout
  const hexHeight = 450; // Consistent spacing

  const col = index % cols;
  const row = Math.floor(index / cols);

  // Hex offset for alternating rows (creates honeycomb pattern)
  const offsetX = row % 2 === 1 ? hexWidth / 2 : 0;

  // Center the grid horizontally
  const gridCenterOffset = -(cols * hexWidth) / 2 + hexWidth / 2;

  // Base position
  let x = col * hexWidth + offsetX + gridCenterOffset;
  let y = row * hexHeight;

  // Add slight random variation for organic feel
  x += (rng.next() - 0.5) * 40;
  y += (rng.next() - 0.5) * 40;

  return { x, y, z: (node.energy || 50) / 100 };
}

/**
 * Generate position for a module (docked to parent node)
 */
function generateModulePosition(
  module: Module,
  parentPos: GridPosition,
  moduleIndex: number,
  totalModules: number
): { position: GridPosition; angle: number } {
  // Distribute modules evenly around parent perimeter
  const radius = 120; // Distance from parent center
  const angle = (moduleIndex / totalModules) * 2 * Math.PI;

  const x = parentPos.x + radius * Math.cos(angle);
  const y = parentPos.y + radius * Math.sin(angle);

  return {
    position: { x, y },
    angle,
  };
}

/**
 * Get all grid data with visual properties and positions
 */
export function getGridData(): GridData {
  const visualNodes: VisualNode[] = nodes
    .sort((a, b) => (b.priority || 0) - (a.priority || 0))
    .map((node, index) => ({
      ...node,
      position: generateNodePosition(node, index),
      sectorColor: sectorColors[node.sector] || colors.electricBlue,
      signalColor: signalColorMap[node.signal] || colors.slateLight,
    }));

  // Create position lookup for nodes
  const nodePositions = new Map<string, GridPosition>();
  visualNodes.forEach(node => {
    nodePositions.set(node.id, node.position);
  });

  // Generate visual modules
  const visualModules: VisualModule[] = [];
  const modulesByParent = getModulesByParentGrouped();

  Object.entries(modulesByParent).forEach(([parentId, parentModules]) => {
    const parentPos = nodePositions.get(parentId);
    if (!parentPos) return;

    parentModules.forEach((module, index) => {
      const { position, angle } = generateModulePosition(
        module,
        parentPos,
        index,
        parentModules.length
      );

      visualModules.push({
        ...module,
        position,
        parentPosition: parentPos,
        signalColor: signalColorMap[module.signal] || colors.slateLight,
        angle,
      });
    });
  });

  // Create position lookup for modules
  const modulePositions = new Map<string, GridPosition>();
  visualModules.forEach(module => {
    modulePositions.set(module.id, module.position);
  });

  // Generate edges
  const edges: GridEdge[] = [];

  // Node-to-node edges (solid)
  visualNodes.forEach(node => {
    if (!node.depends_on) return;

    node.depends_on.forEach(targetId => {
      const targetPos = nodePositions.get(targetId);
      if (!targetPos) return;

      edges.push({
        from: node.id,
        to: targetId,
        type: 'node-node',
        fromPos: node.position,
        toPos: targetPos,
        color: node.sectorColor,
        style: 'solid',
      });
    });
  });

  return {
    nodes: visualNodes,
    modules: visualModules,
    edges,
  };
}

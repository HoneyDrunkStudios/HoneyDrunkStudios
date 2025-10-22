/**
 * HoneyDrunk Studios — Node Data Utilities
 * Functions for loading, filtering, and transforming node data
 */

import nodesData from '@/data/nodes.json';
import type { Node, VisualNode, SignalVisuals, SectorVisuals, NodePosition, Signal, Sector } from './types';
import { colors } from './tokens';

// Type assertion for imported JSON
const nodes = nodesData as Node[];

/**
 * Signal → Visual mapping
 * Each signal state has distinct visual characteristics
 */
const signalVisualsMap: Record<Signal, SignalVisuals> = {
  Seed: {
    color: colors.slateLight,
    glowIntensity: 0.2,
    pulseSpeed: 3,
    particleCount: 5,
    opacity: 0.4,
  },
  Awake: {
    color: colors.violetFlux,
    glowIntensity: 0.5,
    pulseSpeed: 2,
    particleCount: 15,
    opacity: 0.7,
  },
  Wiring: {
    color: colors.aurumGold,
    glowIntensity: 0.7,
    pulseSpeed: 1.5,
    particleCount: 25,
    opacity: 0.85,
  },
  Live: {
    color: colors.signalGreen,
    glowIntensity: 0.75,
    pulseSpeed: 1,
    particleCount: 40,
    opacity: 1.0,
  },
  Echo: {
    color: colors.electricBlue,
    glowIntensity: 0.4,
    pulseSpeed: 4,
    particleCount: 10,
    opacity: 0.6,
  },
  Archive: {
    color: colors.neonPink,
    glowIntensity: 0.2,
    pulseSpeed: 0,
    particleCount: 0,
    opacity: 0.5,
  },
};

/**
 * Sector → Visual mapping
 */
const sectorVisualsMap: Record<Sector, SectorVisuals> = {
  Core: { color: colors.violetFlux },
  Ops: { color: colors.electricBlue },
  Creator: { color: colors.aurumGold },
  Life: { color: colors.signalGreen },
  Play: { color: colors.neonPink },
  Mech: { color: colors.electricBlue },
  Meta: { color: colors.slateLight },
};

/**
 * Seeded pseudo-random number generator
 * Ensures consistent positions across renders
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
 * Generate deterministic position for a node
 * Uses hex-lattice layout with slight variation
 */
function generateNodePosition(node: Node, index: number): NodePosition {
  const rng = new SeededRandom(hashString(node.id));

  // Hex lattice parameters - increased spacing for larger nodes
  const cols = 3;
  const hexWidth = 500;
  const hexHeight = 450;

  const col = index % cols;
  const row = Math.floor(index / cols);

  // Hex offset for alternating rows
  const offsetX = row % 2 === 1 ? hexWidth / 2 : 0;

  // Base position
  let x = col * hexWidth + offsetX;
  let y = row * hexHeight;

  // Add slight random variation (±20px)
  x += (rng.next() - 0.5) * 40;
  y += (rng.next() - 0.5) * 40;

  // Z-depth for parallax (based on energy)
  const z = (node.energy || 50) / 100;

  return { x, y, z };
}

/**
 * Simple string hash function for seeding
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Get all nodes with visual properties
 */
export function getNodes(): VisualNode[] {
  return nodes
    .sort((a, b) => (b.priority || 0) - (a.priority || 0))
    .map((node, index) => ({
      ...node,
      position: generateNodePosition(node, index),
      signalVisuals: signalVisualsMap[node.signal],
      sectorVisuals: sectorVisualsMap[node.sector],
    }));
}

/**
 * Get a single node by ID
 */
export function getNodeById(id: string): VisualNode | undefined {
  const allNodes = getNodes();
  return allNodes.find(node => node.id === id);
}

/**
 * Get featured nodes (active nodes - not Seed or Archive)
 */
export function getFeaturedNodes(count?: number): VisualNode[] {
  const allNodes = getNodes();
  const activeNodes = allNodes
    .filter(node => node.signal !== 'Seed' && node.signal !== 'Archive');

  return count ? activeNodes.slice(0, count) : activeNodes;
}

/**
 * Get all unique sectors
 */
export function getAllSectors(): Sector[] {
  return ['Core', 'Ops', 'Creator', 'Life', 'Play', 'Mech', 'Meta'];
}

/**
 * Get all unique signals
 */
export function getAllSignals(): Signal[] {
  return ['Seed', 'Awake', 'Wiring', 'Live', 'Echo', 'Archive'];
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  nodes.forEach(node => {
    node.tags?.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

/**
 * Filter nodes by criteria
 */
export function filterNodes(
  sectors?: Sector[],
  signals?: Signal[],
  search?: string,
  tags?: string[]
): VisualNode[] {
  let filtered = getNodes();

  if (sectors && sectors.length > 0) {
    filtered = filtered.filter(node => sectors.includes(node.sector));
  }

  if (signals && signals.length > 0) {
    filtered = filtered.filter(node => signals.includes(node.signal));
  }

  if (search && search.trim()) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(node =>
      node.name.toLowerCase().includes(searchLower) ||
      node.short.toLowerCase().includes(searchLower) ||
      node.description?.toLowerCase().includes(searchLower) ||
      node.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  if (tags && tags.length > 0) {
    filtered = filtered.filter(node =>
      node.tags?.some(tag => tags.includes(tag))
    );
  }

  return filtered;
}

/**
 * Get connected nodes for a given node
 */
export function getConnectedNodes(nodeId: string): VisualNode[] {
  const node = getNodeById(nodeId);
  if (!node || !node.connections) return [];

  return node.connections
    .map(id => getNodeById(id))
    .filter((n): n is VisualNode => n !== undefined);
}

/**
 * Get node stats for dashboard
 */
export function getNodeStats() {
  const allNodes = getNodes();

  return {
    total: allNodes.length,
    live: allNodes.filter(n => n.signal === 'Live').length,
    wiring: allNodes.filter(n => n.signal === 'Wiring').length,
    awake: allNodes.filter(n => n.signal === 'Awake').length,
    seed: allNodes.filter(n => n.signal === 'Seed').length,
    archived: allNodes.filter(n => n.signal === 'Archive').length,
    bySector: {
      core: allNodes.filter(n => n.sector === 'Core').length,
      ops: allNodes.filter(n => n.sector === 'Ops').length,
      creator: allNodes.filter(n => n.sector === 'Creator').length,
      life: allNodes.filter(n => n.sector === 'Life').length,
      play: allNodes.filter(n => n.sector === 'Play').length,
      mech: allNodes.filter(n => n.sector === 'Mech').length,
      meta: allNodes.filter(n => n.sector === 'Meta').length,
    },
  };
}

/**
 * Flow Tier Utilities
 * Centralized flow tier management from flow_tiers.json
 */

import flowTiersData from '@/data/schema/flow_tiers.json';
import { colors } from './tokens';

export type FlowTierId = 'critical' | 'active' | 'supporting' | 'dormant' | 'archived';

export interface FlowTierConfig {
  id: FlowTierId;
  name: string;
  minScore: number;
  maxScore: number;
  color: string;
  colorToken: keyof typeof colors;
  description: string;
  priority: number;
}

/**
 * Get all flow tier configurations
 */
export function getAllFlowTiers(): FlowTierConfig[] {
  return flowTiersData.tiers as FlowTierConfig[];
}

/**
 * Get a specific flow tier configuration by ID
 */
export function getFlowTierConfig(tierId: FlowTierId): FlowTierConfig | undefined {
  return flowTiersData.tiers.find(tier => tier.id === tierId) as FlowTierConfig | undefined;
}

/**
 * Determine flow tier from a flow index score
 */
export function getFlowTierFromScore(flowIndex: number): FlowTierConfig {
  const tiers = getAllFlowTiers();
  
  // Find the tier where flowIndex falls within range
  const tier = tiers.find(t => flowIndex >= t.minScore && flowIndex <= t.maxScore);
  
  // Fallback to archived if somehow out of range
  return tier || tiers.find(t => t.id === 'archived')!;
}

/**
 * Get color for a specific flow tier
 */
export function getFlowTierColor(tierId: FlowTierId): string {
  const config = getFlowTierConfig(tierId);
  return config ? config.color : colors.slateLight;
}

/**
 * Format flow tier range for display (e.g., "80-100")
 */
export function formatFlowTierRange(tier: FlowTierConfig): string {
  return `${tier.minScore}-${tier.maxScore}`;
}

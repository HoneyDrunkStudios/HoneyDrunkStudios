/**
 * Flow Tier Utilities
 * Centralized flow tier management from flow_tiers.json
 */

import flowTiersData from '@/data/schema/flow_tiers.json';
import { colors } from './tokens';

export type FlowTierId = 'critical' | 'active' | 'supporting' | 'dormant' | 'future';

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
 * Uses exclusive upper bounds: minScore <= score < maxScore (except for highest tier)
 */
export function getFlowTierFromScore(flowIndex: number): FlowTierConfig {
  const tiers = getAllFlowTiers();

  // Sort by priority (1 = highest) to check from top tier down
  const sortedTiers = [...tiers].sort((a, b) => a.priority - b.priority);

  // Check each tier from highest to lowest
  for (const tier of sortedTiers) {
    // For the highest tier (critical), include upper bound
    if (tier.maxScore === 100) {
      if (flowIndex >= tier.minScore && flowIndex <= tier.maxScore) {
        return tier;
      }
    } else {
      // For all other tiers, use exclusive upper bound
      if (flowIndex >= tier.minScore && flowIndex < tier.maxScore) {
        return tier;
      }
    }
  }

  // Fallback to future if somehow out of range
  return tiers.find(t => t.id === 'future')!;
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

/**
 * HoneyDrunk Studios — Sector Utilities
 * Centralized sector management and color mappings
 */

import { colors } from './tokens';
import sectorsData from '@/data/schema/sectors.json';
import type { Sector } from './types';

export interface SectorConfig {
  id: Sector;
  name: string;
  color: string;
  colorToken: keyof typeof colors;
  description: string;
  overview?: string;
  philosophy?: string;
  headerImage?: string;
  tagline: string;
  cta: string;
  priority: number;
}

/**
 * Get all sectors configuration
 */
export function getAllSectorConfigs(): SectorConfig[] {
  return sectorsData.sectors as SectorConfig[];
}

/**
 * Get sector color by sector ID
 */
export function getSectorColor(sector: Sector): string {
  const sectorConfig = sectorsData.sectors.find(s => s.id === sector);
  if (!sectorConfig) return colors.slateLight;
  
  // Return the actual color from tokens using the colorToken field
  return colors[sectorConfig.colorToken as keyof typeof colors] as string;
}

/**
 * Get all sector IDs
 */
export function getAllSectors(): Sector[] {
  return sectorsData.sectors.map(s => s.id as Sector);
}

/**
 * Get sector colors as a map
 */
export function getSectorColorsMap(): Record<string, string> {
  const map: Record<string, string> = {};
  sectorsData.sectors.forEach(sector => {
    map[sector.id] = colors[sector.colorToken as keyof typeof colors] as string;
  });
  return map;
}

/**
 * Get sector configuration by ID
 */
export function getSectorConfig(sector: Sector): SectorConfig | undefined {
  return sectorsData.sectors.find(s => s.id === sector) as SectorConfig | undefined;
}

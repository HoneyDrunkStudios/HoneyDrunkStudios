/**
 * HoneyDrunk Studios — Domain Types
 * Type definitions for The Grid nodes and visual system
 */

import sectorsData from '@/data/schema/sectors.json';

// Derive Sector type from sectors.json
export type Sector = typeof sectorsData.sectors[number]['id'];
export type Signal = 'Seed' | 'Awake' | 'Wiring' | 'Live' | 'Echo' | 'Archive';

export interface NodeLinks {
  repo?: string;
  docs?: string;
  board?: string;
  package?: string;
  live?: string;
}

export interface NodeMedia {
  cover?: string;
  gallery?: string[];
}

export interface Node {
  id: string;                // slug/guid
  name: string;              // e.g., HoneyDrunk.Kernel
  short: string;             // one-liner purpose
  sector: Sector;
  signal: Signal;
  cluster?: string;          // optional grouping
  connections?: string[];    // connected node ids (legacy - mapped from depends_on)
  depends_on?: string[];     // node dependencies (new field)
  energy?: number;           // 0–100 (pulse: how active/observed recently)
  priority?: number;         // 0–100 (compass: strategic importance to the Hive)
  flow?: number;             // 0–100 (computed server-side: (energy × 0.35) + (priority × 0.65))
  tags?: string[];
  links?: NodeLinks;
  media?: NodeMedia;
  description?: string;      // longer description for detail view

  // Governance fields (used by server-side Flow computation)
  foundational?: boolean;    // If true, gets floor boost when dependents are hot
  strategy_base?: number;    // Base strategic value (0-100)
  tier?: 'none' | 'internal' | 'prod-critical' | 'platform';
  time_pressure?: number;    // Manual urgency dial (0-10)
  done?: boolean;            // True when milestone complete (triggers cooldown)
  cooldown_days?: number;    // Informative; engine uses multiplier
  ops_bootstrap?: boolean;   // Temporary sprint boost for ops nodes
}

// Visual state derived from signal
export interface SignalVisuals {
  color: string;
  glowIntensity: number;
  pulseSpeed: number;
  particleCount: number;
  opacity: number;
}

// Sector visual mappings
export interface SectorVisuals {
  color: string;
  icon?: string;
}

// Grid position for layout
export interface NodePosition {
  x: number;
  y: number;
  z?: number; // for depth/parallax
}

// Flow Index calculation result
export interface FlowMetrics {
  flowIndex: number;        // 0–100 weighted: (energy × 0.35) + (priority × 0.65)
  flowTier: 'critical' | 'active' | 'supporting' | 'dormant' | 'future';
  flowColor: string;        // visual cue based on flow tier
}

// Enhanced node with computed visual props
export interface VisualNode extends Node {
  position: NodePosition;
  signalVisuals: SignalVisuals;
  sectorVisuals: SectorVisuals;
  flowMetrics: FlowMetrics;
}

// Filter state
export interface GridFilters {
  sectors: Sector[];
  signals: Signal[];
  search: string;
  tags: string[];
}

// Performance settings
export interface PerformanceMode {
  particleQuality: 'low' | 'medium' | 'high';
  enableAnimations: boolean;
  enableMotion: boolean;
  enableBloom: boolean;
}

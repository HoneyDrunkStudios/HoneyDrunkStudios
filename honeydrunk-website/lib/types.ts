/**
 * HoneyDrunk Studios — Domain Types
 * Type definitions for The Grid nodes and visual system
 */

export type Sector = 'Core' | 'Ops' | 'Creator' | 'Life' | 'Play' | 'Meta';
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
  connections?: string[];    // connected node ids
  energy?: number;           // 0–100 (glow/size)
  priority?: number;         // featured ordering (higher = more featured)
  tags?: string[];
  links?: NodeLinks;
  media?: NodeMedia;
  description?: string;      // longer description for detail view
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

// Enhanced node with computed visual props
export interface VisualNode extends Node {
  position: NodePosition;
  signalVisuals: SignalVisuals;
  sectorVisuals: SectorVisuals;
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

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

export interface NodeDocs {
  root?: string;              // GitHub repo root
  file_guide?: string;        // Link to FILE_GUIDE.md
  packages?: Record<string, string>;  // Package name -> README link
}

export interface NodeMedia {
  cover?: string;
  gallery?: string[];
}

export interface Node {
  id: string;                // slug/guid
  name: string;              // e.g., HoneyDrunk.Kernel
  public_name?: string;      // Display name (product branding, may differ from name)
  short: string;             // one-liner purpose
  sector: Sector;
  signal: Signal;
  cluster?: string;          // optional grouping
  connections?: string[];    // connected node ids (derived from relationships.json)
  energy?: number;           // 0–100 (pulse: how active/observed recently)
  priority?: number;         // 0–100 (compass: strategic importance to the Hive)
  tags?: string[];
  links?: NodeLinks;
  docs?: NodeDocs;           // Documentation links (GitHub READMEs, file guides)
  media?: NodeMedia;
  description?: string;      // longer description for detail view

  foundational?: boolean;    // Core infrastructure dependency
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

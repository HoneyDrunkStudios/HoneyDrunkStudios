# HoneyDrunk Studios Copilot Instructions

## Project Philosophy
**Build-in-Public. Zero-Bloat. Agents Amplify.**
- Transparent development with every commit telling a story
- Ruthless minimalism—every line must earn its keep  
- AI as creative collaborator, not replacement
- No external dependencies (servers, databases, APIs)—pure static excellence

## Architecture Overview

### The Grid System
This is an interactive cyberpunk visualization of the HoneyDrunk ecosystem. The core concept is **nodes** representing projects/systems connected in a network graph.

**Key Components:**
- `data/nodes.json` - Central node registry (single source of truth)
- `lib/nodes.ts` - Node data utilities and visual transformations
- `components/TheGrid.tsx` - Main grid layout with pan/zoom navigation
- `components/NodeGlyph.tsx` - Individual node visualization
- `components/NeonGridCanvas.tsx` - WebGL particle background

### Node Signal System
Every node has a **signal** state representing its lifecycle:
- `Seed` → `Awake` → `Wiring` → `Live` → `Echo` → `Archive`
- Each signal has distinct visuals (glow, color, particle count) in `lib/nodes.ts`
- Visual properties: `color`, `glowIntensity`, `pulseSpeed`, `particleCount`, `opacity`

### Brand System
Centralized in `lib/tokens.ts`:
- **Colors**: Cyberpunk realism palette (`aurumGold`, `electricBlue`, `violetCore`, etc.)
- **Typography**: Space Grotesk (display), Inter (body), JetBrains Mono (code)
- **Motion**: Configurable particle systems with `prefers-reduced-motion` support

## Development Patterns

### Adding New Nodes
1. Edit `data/nodes.json` with required fields: `id`, `name`, `short`, `sector`, `signal`
2. Optional: Add `connections` array for node linking
3. Use standardized naming: `ComponentName.System` format
4. Set `energy` (0-100) for glow intensity, `priority` for featured ordering

### Performance-First Development
- Canvas-based rendering for smooth 60fps
- Particle count scales with device capability (`motionConfig.particles`)
- Static-first: no runtime dependencies, builds to pure HTML/CSS/JS
- Lighthouse targets: ≥95 across all metrics

### Component Conventions
- All interactive components are client-side (`'use client'`)
- Visual state derived from data, not stored separately
- Semantic color mapping through `tokens.ts`, never hardcoded values
- TypeScript strict mode—comprehensive type coverage in `lib/types.ts`

## Tech Stack Specifics

### Next.js 15 + React 19
- App Router only (`app/` directory)
- Turbopack for dev/build (`--turbopack` flag)
- Zero external dependencies beyond React/Next/Tailwind

### Development Commands
```bash
npm run dev        # Development with Turbopack
npm run build      # Production build with Turbopack  
npm start          # Production server
npm run lint       # ESLint check
```

### TypeScript Patterns
- Strict type definitions in `lib/types.ts`
- `as const` for immutable token objects
- Interface segregation: separate `Node` vs `VisualNode` types
- JSON imports with type assertions: `nodesData as Node[]`

## Key Integration Points

### Filter System
- URL-synced filters in `/nodes` route (`useSearchParams`)
- Filter by `sector` (Core, Ops, Creator, Life, Play, Meta)
- Filter by `signal` state
- Search across `name`, `description`, `tags`

### Canvas Rendering
- `NeonGridCanvas` handles background particles
- Performance monitoring via `requestAnimationFrame`
- Graceful degradation for reduced motion preferences
- GPU-accelerated when available

### Deployment
- Vercel-optimized (`vercel.json` config)
- Security headers configured
- Static export ready—no server-side rendering needed

## Common Tasks

**Add new page**: Create in `app/[route]/page.tsx` (App Router)
**Modify visual theme**: Edit `lib/tokens.ts` and `app/globals.css`  
**Update node data**: Edit `data/nodes.json` (triggers automatic re-render)
**Performance tuning**: Adjust particle counts in `motionConfig.particles`
**Brand consistency**: Reference `tokens.ts` semantic colors, never hex values directly

## File Priority for Understanding
1. `data/nodes.json` - The data model
2. `lib/types.ts` - Type system
3. `lib/tokens.ts` - Design system
4. `components/TheGrid.tsx` - Core interaction logic
5. `README.md` - Comprehensive project overview
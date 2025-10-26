'use client';

import { useMemo, Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import { colors } from '@/lib/tokens';
import { getAllSectorConfigs } from '@/lib/sectors';
import { getNodes, getModules, getServices } from '@/lib/entities';

function SignalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sectorFilter = searchParams.get('sector');
  const dateSort = searchParams.get('sort') || 'desc'; // 'desc' or 'asc'
  const [showFilters, setShowFilters] = useState(false);

  // Get all sectors for filtering
  const allSectors = getAllSectorConfigs();
  
  // Get all nodes, modules, services to build sector entity map
  const allNodes = getNodes();
  const allModules = getModules();
  const allServices = getServices();
  
  // Build a map of entity names to their sectors
  const entityToSectorMap = useMemo(() => {
    const map: Record<string, string> = {};
    
    // Add nodes
    allNodes.forEach(node => {
      map[node.name] = node.sector;
      map[node.id] = node.sector;
    });
    
    // Add modules (inherit sector from parent node)
    allModules.forEach(module => {
      const parentNode = allNodes.find(n => n.id === module.parent);
      if (parentNode) {
        map[module.name] = parentNode.sector;
        map[module.id] = parentNode.sector;
      }
    });
    
    // Add services (use owner as sector)
    allServices.forEach(service => {
      map[service.name] = service.owner;
      map[service.id] = service.owner;
    });
    
    return map;
  }, [allNodes, allModules, allServices]);

  // In production, this would pull from commits/releases
  const signals = [
    {
      date: '2025-10-26',
      title: 'Entity Architecture — Sectors, Nodes, Services, Modules',
      desc: 'Clarified The Grid\'s entity hierarchy: Sectors (Core, Ops, Creator, Life, HoneyPlay, Cyberware, HoneyNet, Meta) are top-level divisions. Nodes are projects/systems within sectors. Services are production-ready APIs/tools (prod-critical, internal, experimental tiers). Modules are reusable components within nodes. Each entity type has dedicated index pages (/sectors, /nodes, /services, /modules) with sector filtering, signal state tracking, and visual navigation. The taxonomy now maps cleanly across Grid, Flow Index, and Signal systems.',
      tags: ['Core', 'Meta', 'HoneyDrunk.Grid'],
      sector: 'Core',
    },
    {
      date: '2025-10-26',
      title: 'SEO Infrastructure — Search Engine Optimization',
      desc: 'Implemented comprehensive SEO foundation: JSON-LD structured data with Organization schema, unique page metadata for About page and 404, improved sitemap with /sectors and /modules routes, verified OpenGraph image exists. Root layout includes full metadata with OpenGraph, Twitter cards, and proper robots directives. Site now fully optimized for search engines with structured data for rich results.',
      tags: ['Meta', 'HoneyDrunk.Grid'],
      sector: 'Meta',
    },
    {
      date: '2025-10-26',
      title: 'Mobile UX Polish — Responsive Refinements',
      desc: 'Systematic mobile optimization across 8+ pages: toast notifications (wider/shorter), responsive button text ("VIEW SECTORS" mobile, "VIEW THE GRID" desktop), centered headers with text-center md:text-left pattern, Flow cards compact styling, filter pills size reduction (4px/12px padding, 11px font), modules accordion compact design, footer tagline addition, HiveConsole [X] button on mobile. Inline styles for pixel-perfect control over Tailwind limitations.',
      tags: ['Core', 'HoneyDrunk.Grid', 'HoneyDrunk.Signal'],
      sector: 'Core',
    },
    {
      date: '2025-10-26',
      title: 'Navigation & Layout — Mobile-First Routing',
      desc: 'Enhanced navigation logic: mobile users land on /sectors (sector hub), desktop users on /grid (interactive visualization). Footer console helper text hidden on mobile, tagline "Boot. Build. Refactor. Evolve." added. Systematic spacing with inline marginBottom styles across About Flow page headings. Improved readability and mobile-first experience across The Grid.',
      tags: ['Core', 'Meta'],
      sector: 'Meta',
    },
    {
      date: '2025-10-25',
      title: 'HoneyNet — Security Division Launch',
      desc: 'Launched HoneyNet sector—the Hive\'s security division. Four active nodes: BreachLab.exe (white-hat CTF lab with Safety Manifests), HoneyDrunk.Sentinel (secure-by-default SDK), Vault (secrets management, moved from Core), and Pulse (observability suite, moved from Ops). Added Matrix Green (#00FF41) to the color system. Built complete /spotlight/honeynet page with hero, gallery, build log, philosophy. Integrated HoneyNet into spotlight hub, grid filtering, and cross-sector navigation. "Break it. Learn it. Build it stronger."',
      tags: ['HoneyNet', 'BreachLab.exe', 'HoneyDrunk.Sentinel', 'HoneyDrunk.Vault', 'Pulse'],
      sector: 'HoneyNet',
    },
    {
      date: '2025-10-24',
      title: 'Flow Index System — Living Roadmap',
      desc: 'Implemented complete Flow Index system: Flow = (Energy × 0.4) + (Priority × 0.6). Five-tier classification (Critical/Active/Stable/Dormant/Archived). Flow-based visual mode in Grid with dynamic glow intensity. New /flow page with sortable rankings, /about/flow documentation, Flow Tier filtering in /nodes, and global header navigation. The Hive now breathes—showing what needs attention next.',
      tags: ['Core', 'HoneyDrunk.Grid', 'HoneyDrunk.Signal'],
      sector: 'Core',
    },
    {
      date: '2025-10-24',
      title: 'Grid Enhancements — Color, Copy, and Scale',
      desc: 'Sector color expansion (Chrome Teal for Mech, Synth Magenta for AI). Copy refinement across landing pages—cyberpunk minimalism, em-dash rhythm. Expanded to 43 Nodes across 8 sectors (AgentKit, Signal, Data, Grid orchestration).',
      tags: ['Core', 'Cyberware', 'AI', 'HoneyDrunk.AgentKit', 'HoneyDrunk.Data'],
      sector: 'Core',
    },
    {
      date: '2025-10-18',
      title: 'The Grid v1.0 — Initial Launch',
      desc: 'Launched The Grid: interactive node visualization with neon cyberpunk aesthetics. Featured nodes across Core, Ops, Creator, Life, Play, Mech, and Meta sectors.',
      tags: ['Core', 'HoneyDrunk.Grid', 'Meta'],
      sector: 'Meta',
    },
    {
      date: '2025-10-17',
      title: 'Signal System Implementation',
      desc: 'Implemented the Signal state system for tracking node lifecycle: Seed → Awake → Wiring → Live → Echo → Archive. Each state has distinct visual characteristics.',
      tags: ['Core', 'HoneyDrunk.Signal'],
      sector: 'Core',
    },
    {
      date: '2025-10-16',
      title: 'Brand System Finalized',
      desc: 'Locked in the cyberpunk realism color palette: Aurum Gold, Electric Blue, Violet Flux against Deep Space. Zero-bloat typography with Space Grotesk, Inter, and JetBrains Mono.',
      tags: ['Core', 'Meta'],
      sector: 'Meta',
    },
  ];

  // Filter signals by sector if parameter is provided
  // Sector filter checks if the signal's sector matches OR if any tags belong to that sector
  const filteredAndSortedSignals = useMemo(() => {
    let filtered = signals;
    
    // Apply sector filter
    if (sectorFilter) {
      filtered = signals.filter(signal => {
        // Check if signal's sector matches
        if (signal.sector === sectorFilter) return true;
        
        // Check if any tags are the sector itself OR belong to the filtered sector
        return signal.tags.some(tag => 
          tag === sectorFilter || entityToSectorMap[tag] === sectorFilter
        );
      });
    }
    
    // Sort by date
    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateSort === 'desc' ? dateB - dateA : dateA - dateB;
    });
    
    return sorted;
  }, [sectorFilter, dateSort, entityToSectorMap]);

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: colors.deepSpace, color: colors.offWhite }}>
      {/* Background */}
      <div className="fixed inset-0">
        <NeonGridCanvas particleCount={100} enableMotion={true} />
      </div>

      {/* Header */}
      <Header />

      {/* Content */}
      <div className="relative z-10 pt-20 md:pt-32 px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-3xl mx-auto space-y-10 md:space-y-16">
          {/* Page Title */}
          <header className="space-y-4 md:space-y-6 text-center md:text-left">
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold py-2 md:py-4 holographic-text"
          >
            Signal Feed
          </h1>
          <p className="text-base md:text-lg px-1 md:px-2" style={{ color: colors.slateLight }}>
            Real-time updates from the Grid. Every Node tells a story.
          </p>

          {/* Sector Filters */}
          <div className="flex flex-wrap gap-2 items-center" style={{ marginTop: '32px' }}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 rounded border text-sm font-mono transition-all cursor-pointer"
              style={{
                color: colors.electricBlue,
                borderColor: colors.electricBlue,
                backgroundColor: showFilters ? `${colors.electricBlue}20` : 'transparent',
              }}
            >
              {showFilters ? '✕ Hide' : '⚙'} Filters
            </button>
            
            {/* Date Sort Toggle */}
            <Link
              href={`/signal?${sectorFilter ? `sector=${sectorFilter}&` : ''}sort=${dateSort === 'desc' ? 'asc' : 'desc'}`}
              className="px-4 py-2 rounded border text-sm font-mono transition-all cursor-pointer hover:scale-105"
              style={{
                color: colors.aurumGold,
                borderColor: colors.aurumGold,
                backgroundColor: `${colors.aurumGold}10`,
              }}
            >
              📅 Date: {dateSort === 'desc' ? 'Newest First' : 'Oldest First'}
            </Link>
            
            {sectorFilter && (
              <Link
                href={`/signal${dateSort !== 'desc' ? `?sort=${dateSort}` : ''}`}
                className="px-4 py-2 rounded border text-sm font-mono transition-all hover:scale-105"
                style={{
                  color: colors.neonPink,
                  borderColor: colors.neonPink,
                  backgroundColor: `${colors.neonPink}20`,
                }}
              >
                Clear Filter ✕
              </Link>
            )}
          </div>

          {showFilters && (
            <div
              className="p-6 rounded-lg border"
              style={{
                backgroundColor: `${colors.gunmetal}60`,
                borderColor: `${colors.slateLight}30`,
              }}
            >
              <h3 className="text-sm font-mono font-bold uppercase" style={{ color: colors.electricBlue, marginBottom: '24px' }}>
                Filter by Sector
              </h3>
              <div className="flex flex-wrap gap-2">
                {allSectors.map((sector) => {
                  const isSelected = sectorFilter === sector.id;
                  return (
                    <Link
                      key={sector.id}
                      href={`/signal?sector=${sector.id}${dateSort !== 'desc' ? `&sort=${dateSort}` : ''}`}
                      className="px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer hover:scale-105"
                      style={{
                        backgroundColor: isSelected ? `${sector.color}30` : `${sector.color}10`,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: isSelected ? sector.color : `${sector.color}40`,
                        color: isSelected ? sector.color : `${sector.color}cc`,
                      }}
                    >
                      {sector.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </header>

        {/* Signal Feed */}
        <div className="space-y-6 md:space-y-8">
          {filteredAndSortedSignals.length > 0 ? (
            filteredAndSortedSignals.map((signal, index) => (
            <article
              key={index}
              className="p-5 md:p-8 rounded-lg border"
              style={{
                backgroundColor: `${colors.gunmetal}60`,
                borderColor: `${colors.slateLight}30`,
              }}
            >
              <div
                className="text-xs font-mono mb-2 md:mb-3"
                style={{ color: colors.aurumGold }}
              >
                {signal.date}
              </div>

              <h2 className="text-xl md:text-2xl font-display font-bold" style={{ marginBottom: '12px' }}>
                {signal.title}
              </h2>

              <p className="text-sm md:text-base leading-relaxed" style={{ color: colors.slateLight, marginBottom: '24px' }}>
                {signal.desc}
              </p>

              <div className="flex flex-wrap gap-2 md:gap-3">
                {signal.tags.map((tag) => {
                  // Check if tag is a sector first
                  const tagAsSector = allSectors.find(s => s.id === tag || s.name === tag);
                  
                  // If not a sector, check if it's an entity
                  const tagSector = tagAsSector ? tag : entityToSectorMap[tag];
                  const tagSectorConfig = allSectors.find(s => s.id === tagSector);
                  const tagColor = tagSectorConfig?.color || colors.electricBlue;
                  
                  // Determine if we should link to sector filter or not
                  const shouldLink = !!tagSectorConfig;
                  const linkHref = shouldLink ? `/signal?sector=${tagSectorConfig.id}${dateSort !== 'desc' ? `&sort=${dateSort}` : ''}` : '#';
                  
                  return shouldLink ? (
                    <Link
                      key={tag}
                      href={linkHref}
                      className="px-3 py-1 rounded-full text-xs font-mono cursor-pointer transition-all hover:scale-105"
                      style={{
                        backgroundColor: `${tagColor}20`,
                        borderWidth: '1px',
                        borderColor: tagColor,
                        color: tagColor,
                      }}
                    >
                      {tag}
                    </Link>
                  ) : (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-mono"
                      style={{
                        backgroundColor: `${tagColor}20`,
                        borderWidth: '1px',
                        borderColor: tagColor,
                        color: tagColor,
                      }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </article>
          ))
          ) : (
            <div
              className="p-5 md:p-8 rounded-lg border text-center"
              style={{
                backgroundColor: `${colors.gunmetal}60`,
                borderColor: `${colors.slateLight}30`,
              }}
            >
              <p className="text-base md:text-lg" style={{ color: colors.slateLight }}>
                {sectorFilter ? `No signals found for ${sectorFilter}. Check back soon.` : 'No signals found. Check back soon.'}
              </p>
            </div>
          )}
        </div>

        {/* Coming Soon */}
        <div
          className="p-5 md:p-6 rounded-lg border text-center"
          style={{
            backgroundColor: `${colors.gunmetal}40`,
            borderColor: `${colors.slateLight}20`,
          }}
        >
          <p className="text-sm md:text-base font-mono" style={{ color: colors.slateLight }}>
            More signals incoming. Follow <a href="https://x.com/HoneyDrunkLab" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline" style={{ color: colors.electricBlue }}>@HoneyDrunkLab</a> for real-time updates.
          </p>
        </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <LandingFooter />
      </div>
    </div>
  );
}

export default function SignalPage() {
  return (
    <Suspense fallback={
      <div className="relative min-h-screen" style={{ backgroundColor: colors.deepSpace, color: colors.offWhite }}>
        <div className="fixed inset-0">
          <NeonGridCanvas particleCount={100} enableMotion={true} />
        </div>
        <Header />
        <div className="relative z-10 pt-20 md:pt-32 px-4 md:px-8 lg:px-16 pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg font-mono" style={{ color: colors.slateLight }}>Loading signal feed...</p>
          </div>
        </div>
      </div>
    }>
      <SignalContent />
    </Suspense>
  );
}

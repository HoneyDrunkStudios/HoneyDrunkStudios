'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import EntityCard from '@/components/EntityCard';
import { colors } from '@/lib/tokens';
import { getNodesBySector, getModulesByParent } from '@/lib/entities';
import { getSectorColorsMap, getAllSectorConfigs } from '@/lib/sectors';
import Link from 'next/link';

// Sector color mapping (now from sectors.json)
const sectorColors = getSectorColorsMap();

// Signal color mapping
const signalColors: Record<string, string> = {
  Seed: colors.slateLight,
  Awake: colors.violetFlux,
  Wiring: colors.aurumGold,
  Live: colors.signalGreen,
  Echo: colors.electricBlue,
  Archive: colors.neonPink,
};

function NodesContent() {
  const searchParams = useSearchParams();
  const sectorFilter = searchParams.get('sector');
  const [showFilters, setShowFilters] = useState(false);
  
  const nodesBySector = getNodesBySector();
  const allSectors = getAllSectorConfigs();
  
  // Filter nodes by sector if parameter is provided
  const filteredNodesBySector = useMemo(() => {
    if (!sectorFilter) return nodesBySector;
    return Object.fromEntries(
      Object.entries(nodesBySector).filter(([sector]) => sector === sectorFilter)
    );
  }, [nodesBySector, sectorFilter]);

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: colors.deepSpace, color: colors.offWhite }}>
      {/* Background */}
      <div className="fixed inset-0">
        <NeonGridCanvas particleCount={100} enableMotion={true} />
      </div>

      {/* Header */}
      <Header />

      {/* Content */}
      <div className="relative z-10 pt-20 md:pt-32 px-4 md:px-8 lg:px-16 pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
          {/* Page Title */}
          <header className="space-y-5 md:space-y-6 text-center md:text-left">
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold py-2 md:py-4 holographic-text"
            >
              Nodes
            </h1>
            <p className="text-base md:text-lg px-1 md:px-2" style={{ color: colors.slateLight }}>
              Product platforms in The Grid. Each Node defines stable contracts and exposes slots where Modules dock.
            </p>

            {/* Sector Filters */}
            <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start" style={{ marginTop: '32px' }}>
              <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 rounded border text-sm font-mono transition-all cursor-pointer"
              style={{
                color: colors.electricBlue,
                borderColor: colors.electricBlue,
                backgroundColor: showFilters ? `${colors.electricBlue}20` : 'transparent',
              }}
            >
              {showFilters ? '✕ Hide' : '⚙\uFE0E'} Filters
            </button>              {sectorFilter && (
                <Link
                  href="/nodes"
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
                <h3 className="text-sm font-mono font-bold uppercase mb-4" style={{ color: colors.electricBlue }}>
                  Filter by Sector
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allSectors.map((sector) => {
                    const isSelected = sectorFilter === sector.id;
                    return (
                      <Link
                        key={sector.id}
                        href={`/nodes?sector=${sector.id}`}
                        className="px-4 py-2 rounded border text-sm font-mono transition-all hover:scale-105"
                        style={{
                          color: sector.color,
                          borderColor: isSelected ? sector.color : `${sector.color}60`,
                          backgroundColor: isSelected ? `${sector.color}30` : `${sector.color}10`,
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

          {/* Nodes by Sector */}
          {Object.entries(filteredNodesBySector).map(([sector, nodes]) => {
            const sectorColor = sectorColors[sector] || colors.electricBlue;

            return (
              <section key={sector} className="space-y-8 md:space-y-10">
                <h2
                  className="text-2xl md:text-3xl lg:text-4xl font-display font-bold pt-6 md:pt-8 border-b-2"
                  style={{
                    color: sectorColor,
                    borderColor: `${sectorColor}30`,
                    paddingBottom: '16px',
                    marginBottom: '48px',
                  }}
                >
                  {sector}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {nodes.map((node) => {
                    const moduleCount = getModulesByParent(node.id).length;
                    const signalColor = signalColors[node.signal] || colors.slateLight;

                    return (
                      <EntityCard
                        key={node.id}
                        id={node.id}
                        name={node.name}
                        signal={node.signal}
                        signalColor={signalColor}
                        primaryColor={sectorColor}
                        description={node.short}
                        href={`/nodes/${node.id}`}
                        tags={node.tags}
                        badges={
                          moduleCount > 0 ? (
                            <span
                              className="inline-flex items-center gap-1 text-xs font-mono px-2 py-1 rounded"
                              style={{
                                backgroundColor: `${colors.electricBlue}15`,
                                color: colors.electricBlue,
                              }}
                            >
                              <span>🔌</span>
                              <span>{moduleCount} {moduleCount === 1 ? 'Module' : 'Modules'}</span>
                            </span>
                          ) : undefined
                        }
                      />
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <LandingFooter />
      </div>
    </div>
  );
}

export default function NodesIndexPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: colors.deepSpace }} />}>
      <NodesContent />
    </Suspense>
  );
}

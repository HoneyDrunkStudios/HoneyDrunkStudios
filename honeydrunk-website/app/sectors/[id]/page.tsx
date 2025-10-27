'use client';

/**
 * Dynamic Sector Detail Page
 * Showcases all nodes, projects, and information for a specific sector
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { colors } from '@/lib/tokens';
import { getSectorConfig, getAllSectorConfigs } from '@/lib/sectors';
import { getNodes, getModules, getServices } from '@/lib/entities';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';
import { use, useMemo } from 'react';
import signalsData from '@/data/schema/signals.json';

interface Signal {
  date: string;
  title: string;
  desc: string;
  tags: string[];
  sector: string;
}

const allSignals = signalsData as Signal[];

export default function SectorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const sectorId = resolvedParams.id;
  
  // Find sector config (case-insensitive)
  const allSectors = getAllSectorConfigs();
  const sector = allSectors.find(s => s.id.toLowerCase() === sectorId.toLowerCase());

  if (!sector) {
    notFound();
  }

  // Get all nodes for this sector
  const sectorNodes = getNodes().filter((node) => node.sector === sector.id);

  // Separate nodes by signal for display
  const activeNodes = sectorNodes.filter((n) => n.signal === 'Live' || n.signal === 'Wiring');
  const plannedNodes = sectorNodes.filter((n) => n.signal === 'Seed' || n.signal === 'Awake');

  // Build entity to sector map (same as signal page)
  const allNodes = getNodes();
  const allModules = getModules();
  const allServices = getServices();
  
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

  // Get latest 3 signal posts for this sector
  // Filter by: direct sector match OR any tag that maps to this sector
  const sectorSignals = allSignals
    .filter((signal) => {
      // Check if signal is directly assigned to this sector
      if (signal.sector === sector.id) return true;
      
      // Check if any tag maps to this sector
      return signal.tags.some(tag => {
        // Check if tag is the sector itself
        if (tag === sector.id || tag === sector.name) return true;
        
        // Check if tag is an entity that belongs to this sector
        return entityToSectorMap[tag] === sector.id;
      });
    })
    .slice(0, 3);

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: colors.deepSpace }}>
      <Header />

      <div>
        {/* Hero */}
        <section
          className="w-full py-20 px-8 relative overflow-hidden"
          style={{
            backgroundColor: colors.deepSpace,
            minHeight: '50vh',
          }}
        >
          {/* Header Image */}
          {sector.headerImage && (
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${sector.headerImage})`,
                backgroundSize: '110%',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                opacity: 1.0,
              }}
            />
          )}

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)`,
            }}
          />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h1
              className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight"
              style={{
                color: sector.color,
                textShadow: `
                  0 0 60px ${sector.color}FF,
                  0 0 40px ${sector.color}CC,
                  0 0 20px ${sector.color}80,
                  0 2px 8px rgba(0,0,0,0.8)
                `,
                marginBottom: '32px',
              }}
            >
              {sector.name}
            </h1>

            <p
              className="text-2xl md:text-3xl font-mono font-bold italic"
              style={{
                color: colors.offWhite,
                marginBottom: '16px',
              }}
            >
              {sector.tagline}
            </p>

            <p
              className="text-lg md:text-xl font-mono"
              style={{
                color: colors.slateLight,
                marginBottom: '48px',
              }}
            >
              {sector.description}
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href={`/nodes?sector=${sector.id}`}
                className="inline-block font-mono font-extrabold text-sm uppercase tracking-wider px-8 py-4 border-2 transition-all duration-200 hover:scale-105"
                style={{
                  color: colors.deepSpace,
                  borderColor: sector.color,
                  backgroundColor: sector.color,
                  boxShadow: `0 0 30px ${sector.color}40`,
                  fontWeight: '900',
                }}
              >
                View Nodes →
              </Link>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section id="overview" className="w-full py-16 px-8" style={{ backgroundColor: colors.gunmetal }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wide"
              style={{
                color: sector.color,
                textShadow: `0 0 20px ${sector.color}60`,
                marginBottom: '24px',
              }}
            >
              Overview
            </h2>
            
            <div className="space-y-6" style={{ color: colors.slateLight }}>
              <p className="text-base md:text-lg leading-relaxed">
                {sector.overview || sector.description}
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        {sector.philosophy && (
          <section id="philosophy" className="w-full py-16 px-8" style={{ backgroundColor: colors.deepSpace }}>
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wide text-center"
                style={{
                  color: sector.color,
                  textShadow: `0 0 20px ${sector.color}60`,
                  marginBottom: '24px',
                }}
              >
                Philosophy
              </h2>
              <blockquote
                className="text-2xl md:text-3xl font-display italic leading-relaxed text-center"
                style={{
                  color: sector.color,
                  textShadow: `0 0 30px ${sector.color}50`,
                }}
              >
                "{sector.philosophy}"
              </blockquote>
            </div>
          </section>
        )}

        {/* Active Nodes */}
        {activeNodes.length > 0 && (
          <section id="active" className="w-full py-16 px-8" style={{ backgroundColor: colors.gunmetal }}>
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wide"
                style={{
                  color: sector.color,
                  textShadow: `0 0 20px ${sector.color}60`,
                  marginBottom: '24px',
                }}
              >
                Active Nodes
              </h2>

              <div className="space-y-6">
                {activeNodes.map((node) => (
                  <Link
                    key={node.id}
                    href={`/nodes/${node.id}`}
                    className="block border-l-2 pl-4 transition-all hover:border-l-4"
                    style={{ borderColor: `${sector.color}60` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = sector.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${sector.color}60`;
                    }}
                  >
                    <h4 className="text-lg font-mono font-bold" style={{ color: sector.color, marginBottom: '8px' }}>
                      {node.name} →
                    </h4>
                    <p className="text-sm" style={{ color: colors.slateLight, marginBottom: '4px' }}>
                      {node.short || node.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="text-xs font-mono px-2 py-1 border"
                        style={{
                          color: colors.slateLight,
                          borderColor: `${colors.slateLight}60`,
                          backgroundColor: `${colors.slateLight}10`,
                        }}
                      >
                        Signal: {node.signal}
                      </span>
                      <span className="text-xs font-mono" style={{ color: colors.slateLight }}>
                        Energy: {node.energy}%
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Planned Projects */}
        {plannedNodes.length > 0 && (
          <section id="planned" className="w-full py-16 px-8" style={{ backgroundColor: colors.deepSpace }}>
            <div className="max-w-4xl mx-auto">
              <h2
                className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wide"
                style={{
                  color: sector.color,
                  textShadow: `0 0 20px ${sector.color}60`,
                  marginBottom: '24px',
                }}
              >
                Coming Soon
              </h2>

              <div className="space-y-6">
                {plannedNodes.map((node) => (
                  <div
                    key={node.id}
                    className="block border-l-2 pl-4"
                    style={{ 
                      borderColor: `${colors.slateLight}40`,
                      opacity: 0.7,
                    }}
                  >
                    <h4 className="text-lg font-mono font-bold" style={{ color: colors.slateLight, marginBottom: '8px' }}>
                      {node.name}
                    </h4>
                    <p className="text-sm" style={{ color: colors.slateLight, marginBottom: '4px' }}>
                      {node.short || node.description || 'In planning phase'}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="text-xs font-mono px-2 py-1 border"
                        style={{
                          color: colors.slateLight,
                          borderColor: `${colors.slateLight}60`,
                          backgroundColor: `${colors.slateLight}10`,
                        }}
                      >
                        Signal: {node.signal}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Build Log */}
        <section className="w-full py-16 px-8" style={{ backgroundColor: colors.gunmetal }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wide"
              style={{
                color: sector.color,
                textShadow: `0 0 20px ${sector.color}60`,
                marginBottom: '24px',
              }}
            >
              Build Log
            </h2>
            
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <span
                  className="text-sm font-mono font-bold uppercase px-3 py-1 border"
                  style={{
                    color: sector.color,
                    borderColor: sector.color,
                    backgroundColor: `${sector.color}15`,
                  }}
                >
                  Sector: {sector.name}
                </span>
                <span
                  className="text-sm font-mono font-bold uppercase px-3 py-1 border"
                  style={{
                    color: colors.slateLight,
                    borderColor: colors.slateLight,
                    backgroundColor: `${colors.slateLight}15`,
                  }}
                >
                  {sectorNodes.length} {sectorNodes.length === 1 ? 'Node' : 'Nodes'}
                </span>
              </div>
            </div>
            
            <div className="space-y-8">
              <h3 className="text-xl font-mono font-bold" style={{ color: colors.offWhite, marginBottom: '16px' }}>
                Status
              </h3>
              
              <div className="space-y-3">
                {activeNodes.length > 0 && (
                  <div className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2"
                      style={{ backgroundColor: colors.signalGreen }}
                    />
                    <p className="text-base" style={{ color: colors.slateLight }}>
                      {activeNodes.length} active {activeNodes.length === 1 ? 'node' : 'nodes'} in production or development
                    </p>
                  </div>
                )}
                {plannedNodes.length > 0 && (
                  <div className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2"
                      style={{ backgroundColor: colors.violetFlux }}
                    />
                    <p className="text-base" style={{ color: colors.slateLight }}>
                      {plannedNodes.length} {plannedNodes.length === 1 ? 'node' : 'nodes'} in planning phase
                    </p>
                  </div>
                )}
                {sectorNodes.length === 0 && (
                  <div className="flex items-start gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-2"
                      style={{ backgroundColor: colors.slateLight }}
                    />
                    <p className="text-base" style={{ color: colors.slateLight }}>
                      Sector initializing... Nodes coming soon
                    </p>
                  </div>
                )}
              </div>

              {/* Recent Updates */}
              {sectorSignals.length > 0 ? (
                <div className="mt-12">
                  <h3 className="text-xl font-mono font-bold" style={{ color: colors.offWhite, marginBottom: '16px' }}>
                    Recent Updates
                  </h3>
                  <div className="space-y-4">
                    {sectorSignals.map((signal, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border"
                        style={{
                          backgroundColor: `${colors.deepSpace}80`,
                          borderColor: `${sector.color}40`,
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div
                            className="text-xs font-mono"
                            style={{ color: colors.aurumGold }}
                          >
                            {signal.date}
                          </div>
                          <div className="flex gap-2">
                            {signal.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs font-mono px-2 py-0.5 rounded"
                                style={{
                                  backgroundColor: `${colors.slateLight}20`,
                                  color: colors.slateLight,
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <h4 className="text-base font-display font-bold mb-2" style={{ color: sector.color }}>
                          {signal.title}
                        </h4>
                        <p className="text-sm" style={{ color: colors.slateLight }}>
                          {signal.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/signal?sector=${sector.id}`}
                    className="inline-block mt-6 text-sm font-mono transition-all hover:underline"
                    style={{ color: sector.color }}
                  >
                    View all {sector.name} updates →
                  </Link>
                </div>
              ) : (
                <div className="mt-12">
                  <h3 className="text-xl font-mono font-bold" style={{ color: colors.offWhite, marginBottom: '16px' }}>
                    Recent Updates
                  </h3>
                  <div
                    className="p-6 rounded-lg border text-center"
                    style={{
                      backgroundColor: `${colors.deepSpace}80`,
                      borderColor: `${colors.slateLight}30`,
                    }}
                  >
                    <p className="text-base" style={{ color: colors.slateLight }}>
                      No signals found for {sector.name}. Check back soon.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="w-full py-16 px-8" style={{ backgroundColor: colors.deepSpace }}>
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wide text-center"
              style={{
                color: sector.color,
                textShadow: `0 0 20px ${sector.color}60`,
                marginBottom: '24px',
              }}
            >
              Gallery
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-video border-2 flex items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `${colors.graphite}40`,
                    borderColor: `${sector.color}30`,
                    boxShadow: `0 0 20px ${sector.color}20`,
                  }}
                >
                  <span className="text-sm font-mono" style={{ color: colors.slateLight }}>
                    Coming Soon
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Back to Sectors */}
        <section className="w-full py-16 px-8 text-center" style={{ backgroundColor: colors.gunmetal }}>
          <Link
            href="/sectors"
            className="inline-block font-mono text-sm uppercase tracking-wider px-6 py-3 border-2 transition-all duration-200 hover:scale-105"
            style={{
              color: colors.deepSpace,
              borderColor: sector.color,
              backgroundColor: sector.color,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${sector.color}CC`;
              e.currentTarget.style.boxShadow = `0 0 20px ${sector.color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = sector.color;
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            ← Back to All Sectors
          </Link>
        </section>
      </div>

      <LandingFooter />
    </div>
  );
}

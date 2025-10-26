'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import { colors } from '@/lib/tokens';
import { getModulesByParentGrouped, getNodeById } from '@/lib/entities';
import { getSectorColorsMap } from '@/lib/sectors';
import Link from 'next/link';

// Signal color mapping
const signalColors: Record<string, string> = {
  Seed: colors.slateLight,
  Awake: colors.violetFlux,
  Wiring: colors.aurumGold,
  Live: colors.signalGreen,
  Echo: colors.electricBlue,
  Archive: colors.neonPink,
};

// Status dot colors
const statusDotColors: Record<string, string> = {
  beta: colors.aurumGold,
  experimental: colors.violetFlux,
};

// Sector color mapping (now from sectors.json)
const sectorColors = getSectorColorsMap();

export default function ModulesIndexPage() {
  const modulesByParent = getModulesByParentGrouped();
  const [expandedParents, setExpandedParents] = useState<Set<string>>(new Set());

  const toggleParent = (parentId: string) => {
    const newExpanded = new Set(expandedParents);
    if (newExpanded.has(parentId)) {
      newExpanded.delete(parentId);
    } else {
      newExpanded.add(parentId);
    }
    setExpandedParents(newExpanded);
  };

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
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Page Title */}
          <header className="space-y-5 md:space-y-6 text-center md:text-left">
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold py-2 md:py-4 holographic-text"
            >
              Modules
            </h1>
            <p className="text-base md:text-lg px-1 md:px-2" style={{ color: colors.slateLight }}>
              Extensions that dock into Node slots. Modules implement adapters, providers, sinks, and harnesses.
            </p>
          </header>

          {/* Modules grouped by Parent Node */}
          <section className="space-y-6">
            {Object.entries(modulesByParent).map(([parentId, modules]) => {
              const parentNode = getNodeById(parentId);
              if (!parentNode) return null;

              const isExpanded = expandedParents.has(parentId);
              const sectorColor = sectorColors[parentNode.sector] || colors.electricBlue;

              return (
                <div
                  key={parentId}
                  className="rounded-lg border-2 overflow-hidden"
                  style={{
                    backgroundColor: `${colors.gunmetal}60`,
                    borderColor: `${sectorColor}40`,
                  }}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleParent(parentId)}
                    className="w-full transition-all hover:bg-opacity-80 cursor-pointer"
                    style={{
                      padding: '16px 16px',
                      backgroundColor: `${sectorColor}15`,
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <h2 className="font-display font-bold" style={{ 
                          color: sectorColor,
                          fontSize: '18px',
                          lineHeight: '1.3',
                        }}>
                          {parentNode.name}
                        </h2>
                        <span
                          className="rounded font-mono flex-shrink-0"
                          style={{
                            padding: '4px 10px',
                            fontSize: '12px',
                            backgroundColor: `${colors.electricBlue}20`,
                            color: colors.electricBlue,
                          }}
                        >
                          {modules.length}
                        </span>
                      </div>
                      <span
                        className="transition-transform duration-200 flex-shrink-0"
                        style={{
                          color: sectorColor,
                          fontSize: '20px',
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      >
                        ▼
                      </span>
                    </div>
                  </button>

                  {/* Accordion Content */}
                  {isExpanded && (
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {modules.map((module) => {
                        const signalColor = signalColors[module.signal] || colors.slateLight;
                        const statusColor = module.status_dot ? statusDotColors[module.status_dot] : null;

                        return (
                          <Link
                            key={module.id}
                            href={`/nodes/${parentId}#module-${module.id}`}
                            className="group block rounded-lg border-2 transition-all duration-300 hover:scale-[1.02]"
                            style={{
                              padding: '12px',
                              backgroundColor: `${signalColor}10`,
                              borderColor: `${signalColor}40`,
                              boxShadow: `0 0 10px ${signalColor}20`,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = signalColor;
                              e.currentTarget.style.boxShadow = `0 0 20px ${signalColor}60, inset 0 0 15px ${signalColor}10`;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = `${signalColor}40`;
                              e.currentTarget.style.boxShadow = `0 0 10px ${signalColor}20`;
                            }}
                            title={module.long_description?.overview || ''}
                          >
                            <div style={{ marginBottom: '8px' }}>
                              <div className="flex-1">
                                <div className="flex items-start flex-wrap" style={{ gap: '8px', marginBottom: '8px' }}>
                                  <h3 className="font-mono font-bold" style={{ 
                                    color: colors.offWhite,
                                    fontSize: '14px',
                                    lineHeight: '1.4',
                                    wordBreak: 'break-word',
                                    flex: '1 1 auto',
                                    minWidth: '0',
                                  }}>
                                    {module.name}
                                  </h3>
                                  {statusColor && (
                                    <span
                                      className="rounded font-mono flex items-center"
                                      style={{
                                        padding: '3px 8px',
                                        fontSize: '11px',
                                        gap: '4px',
                                        backgroundColor: `${statusColor}20`,
                                        color: statusColor,
                                      }}
                                    >
                                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor }} />
                                      {module.status_dot}
                                    </span>
                                  )}
                                </div>

                                {module.long_description?.overview && (
                                  <p style={{ 
                                    color: colors.slateLight,
                                    fontSize: '13px',
                                    lineHeight: '1.5',
                                    marginBottom: '8px',
                                  }}>
                                    {module.long_description.overview}
                                  </p>
                                )}
                              </div>

                              <span
                                className="rounded font-mono whitespace-nowrap flex-shrink-0"
                                style={{
                                  padding: '4px 10px',
                                  fontSize: '11px',
                                  backgroundColor: `${signalColor}20`,
                                  borderWidth: '1px',
                                  borderColor: signalColor,
                                  color: signalColor,
                                }}
                              >
                                {module.signal}
                              </span>
                            </div>

                            <div className="flex items-center flex-wrap" style={{ gap: '6px' }}>
                              <span
                                className="rounded font-mono capitalize"
                                style={{
                                  padding: '3px 8px',
                                  fontSize: '11px',
                                  backgroundColor: `${colors.violetFlux}15`,
                                  color: colors.violetFlux,
                                }}
                              >
                                Slot: {module.slot}
                              </span>
                              <span
                                className="rounded font-mono capitalize"
                                style={{
                                  padding: '3px 8px',
                                  fontSize: '11px',
                                  backgroundColor: `${colors.slateLight}15`,
                                  color: colors.slateLight,
                                }}
                              >
                                {module.integration_depth}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <LandingFooter />
      </div>
    </div>
  );
}

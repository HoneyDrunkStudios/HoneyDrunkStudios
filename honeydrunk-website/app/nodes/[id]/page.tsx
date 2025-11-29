'use client';

import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import SectionTooltip from '@/components/SectionTooltip';
import BuildLog from '@/components/BuildLog';
import { colors } from '@/lib/tokens';
import { getNodeById, getModulesByParent, getServicesByDependency, getNodesBySector, getNodes, getModules, getServices } from '@/lib/entities';
import { getNodeRelationshipMatrix, getNodeContractInfo } from '@/lib/relationships';
import { getSectorColorsMap } from '@/lib/sectors';
import Link from 'next/link';
import nodeManifestDictionary from '@/data/schema/node_manifest_dictionary.v1.json';
import signalsData from '@/data/schema/signals.json';
import { use, useMemo } from 'react';

interface Signal {
  date: string;
  title: string;
  desc: string;
  tags: string[];
  sector: string;
}

const allSignals = signalsData as Signal[];

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

// Status dot colors
const statusDotColors: Record<string, string> = {
  beta: colors.aurumGold,
  experimental: colors.violetFlux,
};

export default function NodeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const node = getNodeById(id);

  if (!node) {
    notFound();
  }

  const sectorColor = sectorColors[node.sector] || colors.electricBlue;
  const signalColor = signalColors[node.signal] || colors.slateLight;
  const modules = getModulesByParent(node.id);
  const services = getServicesByDependency(node.id);
  
  // Get rich relationship matrix
  const relationshipMatrix = getNodeRelationshipMatrix(node.id);
  const dependencies = relationshipMatrix?.upstream || [];
  const dependents = relationshipMatrix?.downstream || [];

  // Get node contract info
  const contractInfo = getNodeContractInfo(node.id);

  // Build entity to sector map for signal filtering
  const allNodes = getNodes();
  const allModules = getModules();
  const allServices = getServices();
  
  const entityToSectorMap = useMemo(() => {
    const map: Record<string, string> = {};
    
    // Add nodes
    allNodes.forEach(n => {
      map[n.name] = n.sector;
      map[n.id] = n.sector;
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

  // Filter signals for this specific node
  const nodeSignals = allSignals.filter((signal) => {
    // Check if signal mentions this node by name or ID in tags
    const mentionsNode = signal.tags.some(tag => 
      tag === node.name || tag === node.id || tag.toLowerCase() === node.name.toLowerCase()
    );
    
    // Also include signals from the same sector that might be relevant
    const sameSector = signal.sector === node.sector || entityToSectorMap[signal.sector] === node.sector;
    
    return mentionsNode || (sameSector && signal.tags.length > 0);
  }).slice(0, 3); // Show up to 3 most recent signals

  // Group modules by slot
  const modulesBySlot = modules.reduce((acc, module) => {
    if (!acc[module.slot]) {
      acc[module.slot] = [];
    }
    acc[module.slot].push(module);
    return acc;
  }, {} as Record<string, typeof modules>);

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: colors.deepSpace, color: colors.offWhite }}>
      {/* Background */}
      <div className="fixed inset-0">
        <NeonGridCanvas particleCount={100} enableMotion={true} />
      </div>

      {/* Header */}
      <Header />

      {/* Content */}
      <div className="relative z-10 pt-20 md:pt-32 px-6 md:px-8 lg:px-16 pb-20 md:pb-24">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Node Header */}
          <header className="space-y-6">
            <div>
              <Link
                href="/nodes"
                className="inline-flex items-center gap-2 text-sm font-mono mb-4 transition-colors"
                style={{ color: colors.slateLight }}
              >
                ← Back to Nodes
              </Link>
            </div>

            <div className="flex flex-col md:flex-row items-start md:justify-between gap-6">
              <div className="flex-1 w-full min-w-0">
                {/* Public Name (product branding) */}
                {node.public_name && node.public_name !== node.name && (
                  <p
                    className="text-sm font-mono uppercase tracking-wider"
                    style={{ color: colors.slateLight, marginBottom: '8px' }}
                  >
                    {node.public_name}
                  </p>
                )}
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold break-words"
                  style={{
                    color: sectorColor,
                    textShadow: `0 0 20px ${sectorColor}60`,
                    marginBottom: '16px',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                  }}
                >
                  {node.name}
                </h1>
                <p className="text-base md:text-lg" style={{ color: colors.offWhite }}>
                  {node.short}
                </p>
              </div>

              <div className="flex flex-row md:flex-col gap-3 items-start md:items-end flex-shrink-0">
                <span
                  className="px-4 py-2 rounded-full text-sm font-mono whitespace-nowrap"
                  style={{
                    backgroundColor: `${signalColor}20`,
                    borderWidth: '2px',
                    borderColor: signalColor,
                    color: signalColor,
                    boxShadow: `0 0 15px ${signalColor}40`,
                  }}
                >
                  {node.signal}
                </span>
                <span
                  className="px-3 py-1 rounded text-xs font-mono font-bold uppercase"
                  style={{
                    backgroundColor: `${sectorColor}20`,
                    color: sectorColor,
                    borderWidth: '1px',
                    borderColor: `${sectorColor}60`,
                  }}
                >
                  {node.sector}
                </span>
              </div>
            </div>
          </header>

          {/* Overview */}
          {node.long_description?.overview && (
            <section className="p-6 rounded-lg border" style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${sectorColor}30`,
            }}>
              <h2 className="text-2xl font-display font-bold flex justify-between items-center" style={{ color: sectorColor, marginBottom: '24px' }}>
                Overview
                <SectionTooltip text={nodeManifestDictionary.tooltips.overview} color={sectorColor} />
              </h2>
              <p className="text-base leading-relaxed" style={{ color: colors.slateLight }}>
                {node.long_description.overview}
              </p>
            </section>
          )}

          {/* Why it exists + Primary Audience */}
          {(node.long_description?.why_it_exists || node.long_description?.primary_audience) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {node.long_description?.why_it_exists && (
                <section className="p-6 rounded-lg border" style={{
                  backgroundColor: `${colors.gunmetal}60`,
                  borderColor: `${colors.slateLight}30`,
                }}>
                  <h3 className="text-lg font-display font-bold flex justify-between items-center" style={{ color: sectorColor, marginBottom: '24px' }}>
                    Why It Exists
                    <SectionTooltip text={nodeManifestDictionary.tooltips.why_it_exists} color={sectorColor} />
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: colors.slateLight }}>
                    {node.long_description.why_it_exists}
                  </p>
                </section>
              )}

              {node.long_description?.primary_audience && (
                <section className="p-6 rounded-lg border" style={{
                  backgroundColor: `${colors.gunmetal}60`,
                  borderColor: `${colors.slateLight}30`,
                }}>
                  <h3 className="text-lg font-display font-bold flex justify-between items-center" style={{ color: sectorColor, marginBottom: '24px' }}>
                    Primary Audience
                    <SectionTooltip text={nodeManifestDictionary.tooltips.primary_audience} color={sectorColor} />
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: colors.slateLight }}>
                    {node.long_description.primary_audience}
                  </p>
                </section>
              )}
            </div>
          )}

          {/* Value Props + Monetization Signal */}
          {(node.long_description?.value_props && node.long_description.value_props.length > 0) || node.long_description?.monetization_signal ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {node.long_description?.value_props && node.long_description.value_props.length > 0 && (
                <section className="p-6 rounded-lg border" style={{
                  backgroundColor: `${colors.gunmetal}60`,
                  borderColor: `${sectorColor}30`,
                }}>
                  <h2 className="text-2xl font-display font-bold flex justify-between items-center" style={{ color: sectorColor, marginBottom: '24px' }}>
                    Value Props
                    <SectionTooltip text={nodeManifestDictionary.tooltips.value_props} color={sectorColor} />
                  </h2>
                  <ul className="space-y-3">
                    {node.long_description.value_props.map((prop, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span style={{ color: sectorColor }}>✓</span>
                        <span className="text-sm" style={{ color: colors.slateLight }}>{prop}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {node.long_description?.monetization_signal && (
                <section className="p-6 rounded-lg border" style={{
                  backgroundColor: `${colors.gunmetal}60`,
                  borderColor: `${colors.slateLight}30`,
                }}>
                  <h2 className="text-2xl font-display font-bold flex justify-between items-center" style={{ color: sectorColor, marginBottom: '24px' }}>
                    Monetization Signal
                    <SectionTooltip text={nodeManifestDictionary.tooltips.monetization_signal} color={sectorColor} />
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: colors.slateLight }}>
                    {node.long_description.monetization_signal}
                  </p>
                </section>
              )}
            </div>
          ) : null}

          {/* Node Contract - Merged dependencies, dependents, and contract info */}
          {contractInfo && (
            <section className="p-6 rounded-lg border" style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${sectorColor}30`,
            }}>
              <h2 className="text-2xl font-display font-bold" style={{ color: sectorColor, marginBottom: '24px' }}>
                Node Contract
              </h2>

              {/* Role in Grid - Machine-generated narrative */}
              {relationshipMatrix?.roleInGrid && (
                <div className="mb-6 p-4 rounded-lg" style={{ 
                  backgroundColor: `${sectorColor}10`,
                  borderLeft: `4px solid ${sectorColor}`,
                }}>
                  <p className="text-sm leading-relaxed" style={{ color: colors.offWhite }}>
                    {relationshipMatrix.roleInGrid}
                  </p>
                </div>
              )}

              <div className="space-y-8">
                {/* Dependencies (What this node consumes) */}
                <div>
                  <h3 className="text-lg font-display font-semibold flex items-center gap-2" style={{ color: colors.offWhite, marginBottom: '16px' }}>
                    <span style={{ color: colors.electricBlue }}>↓</span>
                    Consumes
                  </h3>
                  {dependencies.length > 0 ? (
                    <div className="space-y-3">
                      {dependencies.map((rel) => {
                        const dep = rel.targetNode;
                        const depSectorColor = sectorColors[dep.sector] || colors.electricBlue;
                        const consumesDetail = contractInfo.consumes_detail[dep.id] || [];
                        
                        return (
                          <div key={dep.id} className="p-3 rounded-lg border" style={{
                            backgroundColor: `${depSectorColor}08`,
                            borderColor: `${depSectorColor}${rel.isFoundational ? '60' : '30'}`,
                          }}>
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <Link
                                  href={`/nodes/${dep.id}`}
                                  className="text-sm font-mono font-semibold hover:underline"
                                  style={{ color: depSectorColor }}
                                >
                                  {dep.name}
                                </Link>
                                {rel.isFoundational && (
                                  <span className="ml-2 text-xs px-2 py-0.5 rounded" style={{ 
                                    backgroundColor: `${colors.aurumGold}20`,
                                    color: colors.aurumGold,
                                  }}>
                                    foundational
                                  </span>
                                )}
                                <p className="text-xs mt-1" style={{ color: colors.slateLight }}>
                                  {rel.semanticReason}
                                </p>
                                {consumesDetail.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 mt-2">
                                    {consumesDetail.map((item) => (
                                      <span
                                        key={item}
                                        className="px-1.5 py-0.5 rounded text-xs font-mono"
                                        style={{
                                          backgroundColor: `${depSectorColor}15`,
                                          color: `${depSectorColor}CC`,
                                        }}
                                      >
                                        {item}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm" style={{ color: colors.slateLight }}>
                      No dependencies — foundational node
                    </p>
                  )}
                </div>

                {/* Exposes (contracts and packages) */}
                {(contractInfo.exposes.contracts.length > 0 || contractInfo.exposes.packages.length > 0) && (
                  <div>
                    <h3 className="text-lg font-display font-semibold flex items-center gap-2" style={{ color: colors.offWhite, marginBottom: '16px' }}>
                      <span style={{ color: colors.aurumGold }}>⇄</span>
                      Exposes
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {contractInfo.exposes.contracts.length > 0 && (
                        <div>
                          <h4 className="text-xs font-mono font-semibold uppercase" style={{ color: colors.slateLight, marginBottom: '8px' }}>
                            Contracts
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {contractInfo.exposes.contracts.map((contract) => (
                              <span
                                key={contract}
                                className="px-2 py-1 rounded text-xs font-mono"
                                style={{
                                  backgroundColor: `${sectorColor}15`,
                                  color: sectorColor,
                                }}
                              >
                                {contract}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {contractInfo.exposes.packages.length > 0 && (
                        <div>
                          <h4 className="text-xs font-mono font-semibold uppercase" style={{ color: colors.slateLight, marginBottom: '8px' }}>
                            Packages
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {contractInfo.exposes.packages.map((pkg) => (
                              <span
                                key={pkg}
                                className="px-2 py-1 rounded text-xs font-mono"
                                style={{
                                  backgroundColor: `${colors.electricBlue}15`,
                                  color: colors.electricBlue,
                                }}
                              >
                                {pkg}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Dependents (implemented + in-progress + planned) */}
                <div>
                  <h3 className="text-lg font-display font-semibold flex items-center gap-2" style={{ color: colors.offWhite, marginBottom: '16px' }}>
                    <span style={{ color: colors.neonPink }}>↑</span>
                    Consumed By
                  </h3>
                  
                  {/* Implemented dependents (Live, Echo) */}
                  {contractInfo.consumed_by_implemented.length > 0 && (
                    <>
                      <p className="text-xs font-mono uppercase" style={{ color: colors.signalGreen, marginBottom: '12px' }}>
                        Implemented
                      </p>
                      <div className="space-y-3 mb-6">
                        {contractInfo.consumed_by_implemented.map((nodeId) => {
                          const depNode = allNodes.find(n => n.id === nodeId);
                          if (!depNode) return null;
                          const depSectorColor = sectorColors[depNode.sector] || colors.electricBlue;
                          const rel = dependents.find(r => r.targetNode.id === nodeId);
                          
                          return (
                            <div key={nodeId} className="p-3 rounded-lg border" style={{
                              backgroundColor: `${depSectorColor}08`,
                              borderColor: `${colors.signalGreen}40`,
                            }}>
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                  <Link
                                    href={`/nodes/${nodeId}`}
                                    className="text-sm font-mono font-semibold hover:underline"
                                    style={{ color: depSectorColor }}
                                  >
                                    {depNode.name}
                                  </Link>
                                  {rel && (
                                    <p className="text-xs mt-1" style={{ color: colors.slateLight }}>
                                      {rel.semanticReason}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                  
                  {/* In Progress dependents (Wiring) */}
                  {contractInfo.consumed_by_in_progress.length > 0 && (
                    <>
                      <p className="text-xs font-mono uppercase" style={{ color: colors.aurumGold, marginBottom: '12px' }}>
                        In Progress
                      </p>
                      <div className="space-y-3 mb-6">
                        {contractInfo.consumed_by_in_progress.map((nodeId) => {
                          const depNode = allNodes.find(n => n.id === nodeId);
                          if (!depNode) return null;
                          const depSectorColor = sectorColors[depNode.sector] || colors.electricBlue;
                          const rel = dependents.find(r => r.targetNode.id === nodeId);
                          
                          return (
                            <div key={nodeId} className="p-3 rounded-lg border" style={{
                              backgroundColor: `${depSectorColor}08`,
                              borderColor: `${colors.aurumGold}40`,
                            }}>
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                  <Link
                                    href={`/nodes/${nodeId}`}
                                    className="text-sm font-mono font-semibold hover:underline"
                                    style={{ color: depSectorColor }}
                                  >
                                    {depNode.name}
                                  </Link>
                                  {rel && (
                                    <p className="text-xs mt-1" style={{ color: colors.slateLight }}>
                                      {rel.semanticReason}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                  
                  {/* Planned dependents (Seed, Awake) */}
                  {contractInfo.consumed_by_planned.length > 0 && (
                    <>
                      <p className="text-xs font-mono uppercase" style={{ color: colors.slateLight, marginBottom: '12px' }}>
                        Planned
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {contractInfo.consumed_by_planned.map((nodeId) => {
                          const depNode = allNodes.find(n => n.id === nodeId);
                          if (!depNode) return null;
                          const depSectorColor = sectorColors[depNode.sector] || colors.electricBlue;
                          return (
                            <Link
                              key={nodeId}
                              href={`/nodes/${nodeId}`}
                              className="px-3 py-1.5 rounded-lg border text-sm font-mono transition-all hover:scale-105"
                              style={{
                                backgroundColor: `${depSectorColor}08`,
                                borderColor: `${colors.slateLight}30`,
                                color: colors.slateLight,
                              }}
                            >
                              {depNode.name}
                            </Link>
                          );
                        })}
                      </div>
                    </>
                  )}
                  
                  {contractInfo.consumed_by_implemented.length === 0 && 
                   contractInfo.consumed_by_in_progress.length === 0 && 
                   contractInfo.consumed_by_planned.length === 0 && (
                    <p className="text-sm" style={{ color: colors.slateLight }}>
                      No dependents yet
                    </p>
                  )}
                </div>

                {/* Blocked By */}
                {contractInfo.blocked_by.length > 0 && (
                  <div>
                    <h3 className="text-lg font-display font-semibold flex items-center gap-2" style={{ color: colors.offWhite, marginBottom: '12px' }}>
                      <span style={{ color: colors.neonPink }}>⛔</span>
                      Blocked By
                    </h3>
                    <p className="text-xs" style={{ color: colors.slateLight, marginBottom: '12px' }}>
                      Progress on this node is blocked until these issues are resolved:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {contractInfo.blocked_by.map((blockerId) => {
                        const blockerNode = allNodes.find(n => n.id === blockerId);
                        return (
                          <Link
                            key={blockerId}
                            href={blockerNode ? `/nodes/${blockerId}` : '#'}
                            className="px-3 py-1.5 rounded-lg border text-sm font-mono transition-all hover:scale-105"
                            style={{
                              backgroundColor: `${colors.neonPink}15`,
                              borderColor: `${colors.neonPink}60`,
                              color: colors.neonPink,
                            }}
                          >
                            {blockerNode?.name || blockerId}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Modules (Slots Panel) */}
          {modules.length > 0 && (
            <section className="p-6 rounded-lg border" style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${sectorColor}30`,
            }}>
              <h2 className="text-2xl font-display font-bold flex justify-between items-center" style={{ color: sectorColor, marginBottom: '24px' }}>
                Modules
                <SectionTooltip text={nodeManifestDictionary.tooltips.modules} color={sectorColor} />
              </h2>

              {Object.entries(modulesBySlot).map(([slot, slotModules]) => (
                <div key={slot} style={{ marginBottom: '24px' }} className="last:mb-0">
                  <h3 className="text-lg font-mono font-semibold capitalize" style={{ color: colors.offWhite, marginBottom: '12px' }}>
                    {slot}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {slotModules.map((module) => {
                      const moduleSignalColor = signalColors[module.signal] || colors.slateLight;
                      const statusColor = module.status_dot ? statusDotColors[module.status_dot] : null;

                      return (
                        <div
                          key={module.id}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-all hover:scale-105"
                          style={{
                            backgroundColor: `${moduleSignalColor}15`,
                            borderColor: `${moduleSignalColor}40`,
                            color: moduleSignalColor,
                          }}
                          title={module.long_description?.overview || module.name}
                        >
                          <span className="text-sm font-mono">{module.name.split('.').pop()}</span>
                          {statusColor && (
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: statusColor }}
                              title={module.status_dot}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Used by Services */}
          {services.length > 0 && (
            <section className="p-6 rounded-lg border" style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${sectorColor}30`,
            }}>
              <h2 className="text-2xl font-display font-bold flex justify-between items-center" style={{ color: sectorColor, marginBottom: '24px' }}>
                Used by Services
                <SectionTooltip text={nodeManifestDictionary.tooltips.used_by_services} color={sectorColor} />
              </h2>
              <div className="flex flex-wrap gap-3">
                {services.map((service) => {
                  const serviceSignalColor = signalColors[service.signal] || colors.slateLight;

                  return (
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:scale-105"
                      style={{
                        backgroundColor: `${serviceSignalColor}15`,
                        borderColor: `${serviceSignalColor}40`,
                        color: serviceSignalColor,
                      }}
                    >
                      <span className="text-sm font-mono">{service.name}</span>
                      <span className="text-xs" style={{ color: colors.slateLight }}>
                        ({service.tier})
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Roadmap + Signal Quote */}
          {(node.long_description?.roadmap_focus || node.long_description?.signal_quote) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {node.long_description?.roadmap_focus && (
                <section className="p-6 rounded-lg border" style={{
                  backgroundColor: `${colors.gunmetal}60`,
                  borderColor: `${colors.slateLight}30`,
                }}>
                  <h3 className="text-lg font-display font-bold flex justify-between items-center" style={{ color: sectorColor, marginBottom: '24px' }}>
                    Roadmap Focus
                    <SectionTooltip text={nodeManifestDictionary.tooltips.roadmap_focus} color={sectorColor} />
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: colors.slateLight }}>
                    {node.long_description.roadmap_focus}
                  </p>
                </section>
              )}

              {node.long_description?.signal_quote && (
                <section className="p-6 rounded-lg border" style={{
                  backgroundColor: `${sectorColor}15`,
                  borderColor: `${sectorColor}40`,
                }}>
                  <blockquote className="text-base font-mono italic" style={{ color: sectorColor }}>
                    "{node.long_description.signal_quote}"
                  </blockquote>
                </section>
              )}
            </div>
          )}

          {/* Links */}
          {(node.links && Object.keys(node.links).length > 0) || node.docs ? (
            <section className="flex flex-wrap justify-center md:justify-start gap-4 pt-6 border-t" style={{ borderColor: `${colors.slateLight}30` }}>
              {node.links?.repo && (
                <a
                  href={node.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-mono text-sm transition-all hover:scale-105"
                  style={{
                    color: colors.electricBlue,
                    borderColor: `${colors.electricBlue}60`,
                    backgroundColor: `${colors.electricBlue}10`,
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Repository
                </a>
              )}
              {node.links?.live && (
                <a
                  href={node.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-mono text-sm transition-all hover:scale-105"
                  style={{
                    color: colors.signalGreen,
                    borderColor: `${colors.signalGreen}60`,
                    backgroundColor: `${colors.signalGreen}10`,
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  Live Site
                </a>
              )}
              {node.docs?.file_guide && (
                <a
                  href={node.docs.file_guide}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-mono text-sm transition-all hover:scale-105"
                  style={{
                    color: colors.aurumGold,
                    borderColor: `${colors.aurumGold}60`,
                    backgroundColor: `${colors.aurumGold}10`,
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  File Guide
                </a>
              )}
              {node.docs?.packages && Object.entries(node.docs.packages).map(([pkgName, pkgUrl]) => (
                <a
                  key={pkgName}
                  href={pkgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-mono text-sm transition-all hover:scale-105"
                  style={{
                    color: colors.violetCore,
                    borderColor: `${colors.violetCore}60`,
                    backgroundColor: `${colors.violetCore}10`,
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  {pkgName}
                </a>
              ))}
            </section>
          ) : null}

          {/* Build Log */}
          <BuildLog
            signals={nodeSignals}
            entityName={node.name}
            entityId={node.id}
            accentColor={sectorColor}
            viewAllLink={`/signal?sector=${node.sector}`}
            maxDisplay={3}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <LandingFooter />
      </div>
    </div>
  );
}

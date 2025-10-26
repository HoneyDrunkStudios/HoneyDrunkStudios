import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import SectionTooltip from '@/components/SectionTooltip';
import { colors } from '@/lib/tokens';
import { getNodeById, getModulesByParent, getServicesByDependency, getNodesBySector } from '@/lib/entities';
import { getSectorColorsMap } from '@/lib/sectors';
import Link from 'next/link';
import nodeManifestDictionary from '@/data/schema/node_manifest_dictionary.v1.json';

export async function generateStaticParams() {
  const nodesBySector = getNodesBySector();
  const nodes = Object.values(nodesBySector).flat();

  return nodes.map((node) => ({
    id: node.id,
  }));
}

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

export default async function NodeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const node = getNodeById(id);

  if (!node) {
    notFound();
  }

  const sectorColor = sectorColors[node.sector] || colors.electricBlue;
  const signalColor = signalColors[node.signal] || colors.slateLight;
  const modules = getModulesByParent(node.id);
  const services = getServicesByDependency(node.id);

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
      <div className="relative z-10 pt-20 md:pt-32 px-4 md:px-8 lg:px-16 pb-20 md:pb-24">
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

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1
                  className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
                  style={{
                    color: sectorColor,
                    textShadow: `0 0 20px ${sectorColor}60`,
                  }}
                >
                  {node.name}
                </h1>
                <p className="text-lg md:text-xl" style={{ color: colors.offWhite }}>
                  {node.short}
                </p>
              </div>

              <div className="flex flex-col gap-3 items-end">
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
          {node.links && (Object.keys(node.links).length > 0 || node.id) && (
            <section className="flex flex-wrap gap-4 pt-6 border-t" style={{ borderColor: `${colors.slateLight}30` }}>
              {node.links.repo && (
                <a
                  href={node.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg border-2 font-mono text-sm transition-all hover:scale-105"
                  style={{
                    color: colors.electricBlue,
                    borderColor: `${colors.electricBlue}60`,
                    backgroundColor: `${colors.electricBlue}10`,
                  }}
                >
                  🔗 Repository
                </a>
              )}
              {node.links.live && (
                <a
                  href={node.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg border-2 font-mono text-sm transition-all hover:scale-105"
                  style={{
                    color: colors.signalGreen,
                    borderColor: `${colors.signalGreen}60`,
                    backgroundColor: `${colors.signalGreen}10`,
                  }}
                >
                  🌐 Live Site
                </a>
              )}
              {node.links.docs && (
                <a
                  href={node.links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg border-2 font-mono text-sm transition-all hover:scale-105"
                  style={{
                    color: colors.aurumGold,
                    borderColor: `${colors.aurumGold}60`,
                    backgroundColor: `${colors.aurumGold}10`,
                  }}
                >
                  📚 Documentation
                </a>
              )}
            </section>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <LandingFooter />
      </div>
    </div>
  );
}

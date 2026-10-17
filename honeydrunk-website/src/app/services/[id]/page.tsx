import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import SectionTooltip from '@/components/SectionTooltip';
import { colors } from '@/lib/tokens';
import { getServiceById, getServices, getEntityById } from '@/lib/entities';
import Link from 'next/link';
import serviceManifestDictionary from '@/data/schema/service_manifest_dictionary.v1.json';

export async function generateStaticParams() {
  const services = getServices();

  return services.map((service) => ({
    id: service.id,
  }));
}

// Signal color mapping
const signalColors: Record<string, string> = {
  Seed: colors.slateLight,
  Awake: colors.violetFlux,
  Wiring: colors.aurumGold,
  Live: colors.signalGreen,
  Echo: colors.electricBlue,
  Archive: colors.neonPink,
};

// Tier color mapping
const tierColors: Record<string, string> = {
  'prod-critical': colors.neonPink,
  'internal': colors.electricBlue,
  'experimental': colors.violetFlux,
};

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    notFound();
  }

  const signalColor = signalColors[service.signal] || colors.slateLight;
  const tierColor = tierColors[service.tier] || colors.slateLight;

  // Resolve dependencies
  const dependencies = service.depends_on.map(id => ({
    id,
    entity: getEntityById(id),
  }));

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
          {/* Service Header */}
          <header className="space-y-6">
            <div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-mono mb-4 transition-colors"
                style={{ color: colors.slateLight }}
              >
                ← Back to Services
              </Link>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1
                  className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
                  style={{
                    color: tierColor,
                    textShadow: `0 0 20px ${tierColor}60`,
                  }}
                >
                  {service.name}
                </h1>
                <p className="text-lg md:text-xl" style={{ color: colors.offWhite }}>
                  {service.owner}
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
                  {service.signal}
                </span>
                <span
                  className="px-3 py-1 rounded text-xs font-mono font-bold uppercase"
                  style={{
                    backgroundColor: `${tierColor}20`,
                    color: tierColor,
                    borderWidth: '1px',
                    borderColor: `${tierColor}60`,
                  }}
                >
                  {service.tier}
                </span>
              </div>
            </div>
          </header>

          {/* Overview */}
          {service.long_description?.overview && (
            <section className="p-6 rounded-lg border" style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${tierColor}30`,
            }}>
              <h2 className="text-2xl font-display font-bold flex justify-between items-center" style={{ color: colors.electricBlue, marginBottom: '24px' }}>
                Overview
                <SectionTooltip text={serviceManifestDictionary.tooltips.overview} color={colors.electricBlue} />
              </h2>
              <p className="text-base leading-relaxed" style={{ color: colors.slateLight }}>
                {service.long_description.overview}
              </p>
              {service.long_description.signal_quote && (
                <div className="mt-4 pt-4 border-t" style={{ borderColor: `${colors.slateLight}20` }}>
                  <p className="text-lg font-mono italic" style={{ color: tierColor }}>
                    "{service.long_description.signal_quote}"
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Why It Exists */}
          {service.long_description?.why_it_exists && (
            <section className="p-6 rounded-lg border" style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${colors.violetFlux}30`,
            }}>
              <h2 className="text-2xl font-display font-bold flex justify-between items-center" style={{ color: colors.electricBlue, marginBottom: '24px' }}>
                Why It Exists
                <SectionTooltip text={serviceManifestDictionary.tooltips.why_it_exists} color={colors.electricBlue} />
              </h2>
              <p className="text-base leading-relaxed" style={{ color: colors.slateLight }}>
                {service.long_description.why_it_exists}
              </p>
            </section>
          )}

          {/* Value Props */}
          {service.long_description?.value_props && service.long_description.value_props.length > 0 && (
            <section className="p-6 rounded-lg border" style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${colors.signalGreen}30`,
            }}>
              <h2 className="text-2xl font-display font-bold flex justify-between items-center" style={{ color: colors.electricBlue, marginBottom: '24px' }}>
                Value Propositions
                <SectionTooltip text={serviceManifestDictionary.tooltips.value_props} color={colors.electricBlue} />
              </h2>
              <ul className="space-y-3">
                {service.long_description.value_props.map((prop, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-lg" style={{ color: colors.signalGreen }}>•</span>
                    <span className="text-base leading-relaxed flex-1" style={{ color: colors.slateLight }}>
                      {prop}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Audience & Impact */}
          {(service.long_description?.primary_audience || service.long_description?.impact_vector) && (
            <section className="p-6 rounded-lg border" style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${colors.aurumGold}30`,
            }}>
              <h2 className="text-2xl font-display font-bold flex justify-between items-center" style={{ color: colors.electricBlue, marginBottom: '24px' }}>
                Audience & Impact
                <SectionTooltip text={serviceManifestDictionary.tooltips.primary_audience} color={colors.electricBlue} />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.long_description.primary_audience && (
                  <div>
                    <h3 className="text-sm font-mono mb-2" style={{ color: colors.slateLight }}>Primary Audience</h3>
                    <p className="text-base" style={{ color: colors.offWhite }}>
                      {service.long_description.primary_audience}
                    </p>
                  </div>
                )}
                {service.long_description.impact_vector && (
                  <div>
                    <h3 className="text-sm font-mono mb-2" style={{ color: colors.slateLight }}>Impact Vector</h3>
                    <p className="text-base font-mono" style={{ color: colors.aurumGold }}>
                      {service.long_description.impact_vector}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Grid Relationship */}
          {service.long_description?.grid_relationship && (
            <section className="p-6 rounded-lg border" style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${colors.violetFlux}30`,
            }}>
              <h2 className="text-2xl font-display font-bold flex justify-between items-center" style={{ color: colors.electricBlue, marginBottom: '24px' }}>
                Grid Relationship
                <SectionTooltip text={serviceManifestDictionary.tooltips.grid_relationship} color={colors.electricBlue} />
              </h2>
              <p className="text-base leading-relaxed" style={{ color: colors.slateLight, marginBottom: '16px' }}>
                {service.long_description.grid_relationship}
              </p>
              {service.long_description.integration_depth && (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono" style={{ color: colors.slateLight }}>Integration Depth:</span>
                  <span 
                    className="px-3 py-1 rounded text-sm font-mono font-bold"
                    style={{
                      backgroundColor: service.long_description.integration_depth === 'deep' 
                        ? `${colors.neonPink}20` 
                        : service.long_description.integration_depth === 'medium' 
                        ? `${colors.aurumGold}20` 
                        : `${colors.slateLight}20`,
                      color: service.long_description.integration_depth === 'deep' 
                        ? colors.neonPink 
                        : service.long_description.integration_depth === 'medium' 
                        ? colors.aurumGold 
                        : colors.slateLight,
                    }}
                  >
                    {service.long_description.integration_depth}
                  </span>
                </div>
              )}
            </section>
          )}

          {/* Roadmap & Monetization */}
          {(service.long_description?.roadmap_focus || service.long_description?.monetization_signal) && (
            <section className="p-6 rounded-lg border" style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${colors.matrixGreen}30`,
            }}>
              <h2 className="text-2xl font-display font-bold flex justify-between items-center" style={{ color: colors.electricBlue, marginBottom: '24px' }}>
                Future Direction
                <SectionTooltip text={serviceManifestDictionary.tooltips.roadmap_focus} color={colors.electricBlue} />
              </h2>
              <div className="space-y-6">
                {service.long_description.roadmap_focus && (
                  <div>
                    <h3 className="text-sm font-mono" style={{ color: colors.slateLight, marginBottom: '8px' }}>Roadmap Focus</h3>
                    <p className="text-base leading-relaxed" style={{ color: colors.offWhite }}>
                      {service.long_description.roadmap_focus}
                    </p>
                  </div>
                )}
                {service.long_description.monetization_signal && (
                  <div>
                    <h3 className="text-sm font-mono" style={{ color: colors.slateLight, marginBottom: '8px' }}>Monetization Signal</h3>
                    <p className="text-base leading-relaxed" style={{ color: colors.offWhite }}>
                      {service.long_description.monetization_signal}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Stability & Demo */}
          {(service.long_description?.stability_tier || service.long_description?.demo_path) && (
            <section className="p-6 rounded-lg border" style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${colors.electricBlue}30`,
            }}>
              <h2 className="text-2xl font-display font-bold flex justify-between items-center" style={{ color: colors.electricBlue, marginBottom: '24px' }}>
                Technical Details
                <SectionTooltip text={serviceManifestDictionary.tooltips.technical_details} color={colors.electricBlue} />
              </h2>
              <div className="space-y-6">
                {service.long_description.stability_tier && (
                  <div>
                    <h3 className="text-sm font-mono" style={{ color: colors.slateLight, marginBottom: '8px' }}>Stability Tier</h3>
                    <span 
                      className="inline-block px-3 py-1 rounded text-sm font-mono font-bold uppercase"
                      style={{
                        backgroundColor: service.long_description.stability_tier === 'critical' 
                          ? `${colors.neonPink}20` 
                          : service.long_description.stability_tier === 'stable' 
                          ? `${colors.signalGreen}20` 
                          : service.long_description.stability_tier === 'beta'
                          ? `${colors.aurumGold}20`
                          : `${colors.violetFlux}20`,
                        color: service.long_description.stability_tier === 'critical' 
                          ? colors.neonPink 
                          : service.long_description.stability_tier === 'stable' 
                          ? colors.signalGreen 
                          : service.long_description.stability_tier === 'beta'
                          ? colors.aurumGold
                          : colors.violetFlux,
                      }}
                    >
                      {service.long_description.stability_tier}
                    </span>
                  </div>
                )}
                {service.long_description.demo_path && (
                  <div>
                    <h3 className="text-sm font-mono" style={{ color: colors.slateLight, marginBottom: '8px' }}>Demo Path</h3>
                    <p className="text-base leading-relaxed font-mono" style={{ color: colors.offWhite }}>
                      {service.long_description.demo_path}
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Runtime & Deployment */}
          <section className="p-6 rounded-lg border" style={{
            backgroundColor: `${colors.gunmetal}60`,
            borderColor: `${colors.electricBlue}30`,
          }}>
            <h2 className="text-2xl font-display font-bold flex justify-between items-center" style={{ color: colors.electricBlue, marginBottom: '24px' }}>
              Runtime & Deployment
              <SectionTooltip text={serviceManifestDictionary.tooltips.runtime_deployment} color={colors.electricBlue} />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Runtime */}
              <div>
                <h3 className="text-sm font-mono" style={{ color: colors.slateLight, marginBottom: '8px' }}>Runtime</h3>
                <p className="text-base font-mono" style={{ color: colors.offWhite }}>
                  {service.runtime.language} / {service.runtime.target}
                </p>
              </div>

              {/* Region */}
              <div>
                <h3 className="text-sm font-mono" style={{ color: colors.slateLight, marginBottom: '8px' }}>Region</h3>
                <p className="text-base font-mono" style={{ color: colors.offWhite }}>
                  {service.region}
                </p>
              </div>

              {/* Environments */}
              <div>
                <h3 className="text-sm font-mono" style={{ color: colors.slateLight, marginBottom: '8px' }}>Environments</h3>
                <div className="flex flex-wrap gap-2">
                  {service.envs.map(env => (
                    <span
                      key={env}
                      className="px-3 py-1 rounded text-sm font-mono"
                      style={{
                        backgroundColor: `${colors.signalGreen}20`,
                        color: colors.signalGreen,
                      }}
                    >
                      {env}
                    </span>
                  ))}
                </div>
              </div>

              {/* Release Channel */}
              {service.release_channel && (
                <div>
                  <h3 className="text-sm font-mono" style={{ color: colors.slateLight, marginBottom: '8px' }}>Release Channel</h3>
                  <p className="text-base font-mono" style={{ color: colors.offWhite }}>
                    {service.release_channel.ring || 'N/A'}
                  </p>
                </div>
              )}

              {/* Last Deploy */}
              {service.last_deploy && (
                <div>
                  <h3 className="text-sm font-mono" style={{ color: colors.slateLight, marginBottom: '8px' }}>Last Deploy</h3>
                  <p className="text-base font-mono" style={{ color: colors.offWhite }}>
                    {new Date(service.last_deploy).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Interfaces */}
          {service.interfaces && (Object.keys(service.interfaces).length > 0) && (
            <section className="p-6 rounded-lg border" style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${colors.violetFlux}30`,
            }}>
              <h2 className="text-2xl font-display font-bold flex justify-between items-center" style={{ color: colors.electricBlue, marginBottom: '24px' }}>
                Interfaces
                <SectionTooltip text={serviceManifestDictionary.tooltips.interfaces} color={colors.electricBlue} />
              </h2>

              <div className="space-y-6">
                {/* HTTP */}
                {service.interfaces.http && service.interfaces.http.length > 0 && (
                  <div>
                    <h3 className="text-lg font-mono font-semibold" style={{ color: colors.offWhite, marginBottom: '12px' }}>
                      HTTP Endpoints
                    </h3>
                    <div className="space-y-2">
                      {service.interfaces.http.map((endpoint, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-2 rounded font-mono text-sm"
                          style={{
                            backgroundColor: `${colors.electricBlue}15`,
                            color: colors.electricBlue,
                          }}
                        >
                          {endpoint}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Events In */}
                {service.interfaces.events_in && service.interfaces.events_in.length > 0 && (
                  <div>
                    <h3 className="text-lg font-mono font-semibold" style={{ color: colors.offWhite, marginBottom: '12px' }}>
                      Events In
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.interfaces.events_in.map((event, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded text-sm font-mono"
                          style={{
                            backgroundColor: `${colors.aurumGold}20`,
                            color: colors.aurumGold,
                          }}
                        >
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Events Out */}
                {service.interfaces.events_out && service.interfaces.events_out.length > 0 && (
                  <div>
                    <h3 className="text-lg font-mono font-semibold" style={{ color: colors.offWhite, marginBottom: '12px' }}>
                      Events Out
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.interfaces.events_out.map((event, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded text-sm font-mono"
                          style={{
                            backgroundColor: `${colors.violetFlux}20`,
                            color: colors.violetFlux,
                          }}
                        >
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Dependencies */}
          {dependencies.length > 0 && (
            <section className="p-6 rounded-lg border" style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${colors.aurumGold}30`,
            }}>
              <h2 className="text-2xl font-display font-bold flex justify-between items-center" style={{ color: colors.electricBlue, marginBottom: '24px' }}>
                Depends On
                <SectionTooltip text={serviceManifestDictionary.tooltips.depends_on} color={colors.electricBlue} />
              </h2>

              <div className="space-y-3">
                {dependencies.map(({ id, entity }) => {
                  if (!entity) {
                    return (
                      <div
                        key={id}
                        className="px-4 py-3 rounded-lg border"
                        style={{
                          backgroundColor: `${colors.slateLight}15`,
                          borderColor: `${colors.slateLight}40`,
                          color: colors.slateLight,
                        }}
                      >
                        {id} (not found)
                      </div>
                    );
                  }

                  const isNode = entity.type === 'node';
                  const isModule = entity.type === 'module';
                  const linkHref = isNode ? `/nodes/${entity.id}` : isModule ? `/nodes/${(entity as any).parent}#module-${entity.id}` : '#';
                  const entityColor = isNode ? colors.violetFlux : isModule ? colors.electricBlue : colors.slateLight;

                  return (
                    <Link
                      key={id}
                      href={linkHref}
                      className="block px-4 py-3 rounded-lg border transition-all hover:scale-105"
                      style={{
                        backgroundColor: `${entityColor}15`,
                        borderColor: `${entityColor}40`,
                        borderStyle: 'dotted',
                        borderWidth: '2px',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm" style={{ color: entityColor }}>
                          {entity.name}
                        </span>
                        <span className="text-xs font-mono" style={{ color: colors.slateLight }}>
                          {entity.type}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Observability */}
          {service.observability && (service.observability.pulse_dash || (service.observability.alerts && service.observability.alerts.length > 0)) && (
            <section className="p-6 rounded-lg border" style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${colors.matrixGreen}30`,
            }}>
              <h2 className="text-2xl font-display font-bold flex justify-between items-center" style={{ color: colors.electricBlue, marginBottom: '24px' }}>
                Observability
                <SectionTooltip text={serviceManifestDictionary.tooltips.observability} color={colors.electricBlue} />
              </h2>

              <div className="space-y-4">
                {service.observability.pulse_dash && (
                  <div>
                    <h3 className="text-sm font-mono" style={{ color: colors.slateLight, marginBottom: '8px' }}>Pulse Dashboard</h3>
                    <a
                      href={service.observability.pulse_dash}
                      className="inline-block px-4 py-2 rounded-lg border font-mono text-sm transition-all hover:scale-105"
                      style={{
                        color: colors.matrixGreen,
                        borderColor: `${colors.matrixGreen}60`,
                        backgroundColor: `${colors.matrixGreen}15`,
                      }}
                    >
                      Open Dashboard →
                    </a>
                  </div>
                )}

                {service.observability.alerts && service.observability.alerts.length > 0 && (
                  <div>
                    <h3 className="text-sm font-mono" style={{ color: colors.slateLight, marginBottom: '8px' }}>Alerts</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.observability.alerts.map((alert, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded text-sm font-mono"
                          style={{
                            backgroundColor: `${colors.neonPink}20`,
                            color: colors.neonPink,
                          }}
                        >
                          {alert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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

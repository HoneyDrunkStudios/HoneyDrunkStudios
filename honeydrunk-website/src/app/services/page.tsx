'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import CyberpunkEffects from '@/components/CyberpunkEffects';
import EntityCard from '@/components/EntityCard';
import { colors } from '@/lib/tokens';
import { getServices } from '@/lib/entities';
import { getAllSectorConfigs } from '@/lib/sectors';
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

// Tier color mapping
const tierColors: Record<string, string> = {
  'prod-critical': colors.neonPink,
  'internal': colors.electricBlue,
  'experimental': colors.violetFlux,
};

// Build sector color mapping from sectors.json
const sectorConfigs = getAllSectorConfigs();
const sectorColors: Record<string, string> = Object.fromEntries(
  sectorConfigs.map(sector => [sector.id, sector.color])
);

export default function ServicesIndexPage() {
  const allServices = getServices();
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);

  // Get unique values for filters
  const allTiers = Array.from(new Set(allServices.map(s => s.tier))).sort();
  const allOwners = Array.from(new Set(allServices.map(s => s.owner))).sort();
  const allSignals = Array.from(new Set(allServices.map(s => s.signal))).sort();

  // Filter services
  const filteredServices = allServices.filter(service => {
    const matchesTier = selectedTiers.length === 0 || selectedTiers.includes(service.tier);
    const matchesOwner = selectedOwners.length === 0 || selectedOwners.includes(service.owner);
    const matchesSignal = selectedSignals.length === 0 || selectedSignals.includes(service.signal);

    return matchesTier && matchesOwner && matchesSignal;
  });

  const toggleFilter = (value: string, selected: string[], setter: (vals: string[]) => void) => {
    if (selected.includes(value)) {
      setter(selected.filter(v => v !== value));
    } else {
      setter([...selected, value]);
    }
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
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Page Title */}
          <header className="space-y-5 md:space-y-6 text-center md:text-left">
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold py-2 md:py-4 holographic-text"
            >
              Services
            </h1>
            <p className="text-base md:text-lg px-1 md:px-2" style={{ color: colors.slateLight }}>
              Deployed runtimes consuming Nodes and Modules. APIs, workers, agents, and webapps.
            </p>
          </header>

          {/* Filters */}
          <section className="p-6 rounded-lg border space-y-4" style={{
            backgroundColor: `${colors.gunmetal}60`,
            borderColor: `${colors.slateLight}30`,
          }}>
            <h2 className="text-lg font-display font-bold" style={{ color: colors.electricBlue }}>
              Filters
            </h2>

            <div className="space-y-4">
              {/* Tier filter */}
              <div>
                <div className="text-sm font-mono mb-2" style={{ color: colors.slateLight }}>Tier</div>
                <div className="flex flex-wrap gap-2">
                  {allTiers.map(tier => {
                    const isSelected = selectedTiers.includes(tier);
                    const tierColor = tierColors[tier] || colors.slateLight;

                    return (
                      <button
                        key={tier}
                        onClick={() => toggleFilter(tier, selectedTiers, setSelectedTiers)}
                        className="px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer hover:scale-105"
                        style={{
                          backgroundColor: isSelected ? `${tierColor}30` : `${tierColor}10`,
                          borderWidth: '1px',
                          borderColor: isSelected ? tierColor : `${tierColor}40`,
                          color: isSelected ? tierColor : `${tierColor}cc`,
                        }}
                      >
                        {tier}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Signal filter */}
              <div>
                <div className="text-sm font-mono mb-2" style={{ color: colors.slateLight }}>Signal</div>
                <div className="flex flex-wrap gap-2">
                  {allSignals.map(signal => {
                    const isSelected = selectedSignals.includes(signal);
                    const signalColor = signalColors[signal] || colors.slateLight;

                    return (
                      <button
                        key={signal}
                        onClick={() => toggleFilter(signal, selectedSignals, setSelectedSignals)}
                        className="px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer hover:scale-105"
                        style={{
                          backgroundColor: isSelected ? `${signalColor}30` : `${signalColor}10`,
                          borderWidth: '1px',
                          borderColor: isSelected ? signalColor : `${signalColor}40`,
                          color: isSelected ? signalColor : `${signalColor}cc`,
                        }}
                      >
                        {signal}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sector filter */}
              <div>
                <div className="text-sm font-mono mb-2" style={{ color: colors.slateLight }}>Sector</div>
                <div className="flex flex-wrap gap-2">
                  {allOwners.map(owner => {
                    const isSelected = selectedOwners.includes(owner);
                    const sectorColor = sectorColors[owner] || colors.electricBlue;

                    return (
                      <button
                        key={owner}
                        onClick={() => toggleFilter(owner, selectedOwners, setSelectedOwners)}
                        className="px-3 py-1.5 rounded text-xs font-mono transition-all cursor-pointer hover:scale-105"
                        style={{
                          backgroundColor: isSelected ? `${sectorColor}30` : `${sectorColor}10`,
                          borderWidth: '1px',
                          borderColor: isSelected ? sectorColor : `${sectorColor}40`,
                          color: isSelected ? sectorColor : `${sectorColor}cc`,
                        }}
                      >
                        {owner}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Clear filters */}
            {(selectedTiers.length > 0 || selectedOwners.length > 0 || selectedSignals.length > 0) && (
              <button
                onClick={() => {
                  setSelectedTiers([]);
                  setSelectedOwners([]);
                  setSelectedSignals([]);
                }}
                className="text-xs font-mono px-3 py-1.5 rounded transition-all"
                style={{
                  color: colors.neonPink,
                  backgroundColor: `${colors.neonPink}15`,
                  borderWidth: '1px',
                  borderColor: `${colors.neonPink}40`,
                }}
              >
                Clear All Filters
              </button>
            )}
          </section>

          {/* Services Grid */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold" style={{ color: colors.offWhite }}>
                {filteredServices.length} Service{filteredServices.length !== 1 ? 's' : ''}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map((service) => {
                const signalColor = signalColors[service.signal] || colors.slateLight;
                const tierColor = tierColors[service.tier] || colors.slateLight;

                return (
                  <EntityCard
                    key={service.id}
                    id={service.id}
                    name={service.name}
                    signal={service.signal}
                    signalColor={signalColor}
                    primaryColor={tierColor}
                    description={service.long_description?.overview || ''}
                    href={`/services/${service.id}`}
                    badges={
                      <div className="flex flex-wrap gap-2">
                        <span
                          className="px-2 py-1 rounded text-xs font-mono"
                          style={{
                            backgroundColor: `${tierColor}20`,
                            color: tierColor,
                          }}
                        >
                          {service.tier}
                        </span>
                        <span
                          className="px-2 py-1 rounded text-xs font-mono"
                          style={{
                            backgroundColor: `${colors.slateLight}15`,
                            color: colors.slateLight,
                          }}
                        >
                          {service.runtime.language}/{service.runtime.target}
                        </span>
                        <span
                          className="px-2 py-1 rounded text-xs font-mono"
                          style={{
                            backgroundColor: `${colors.slateLight}15`,
                            color: colors.slateLight,
                          }}
                        >
                          {service.owner}
                        </span>
                      </div>
                    }
                  />
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <LandingFooter />
      </div>

      {/* Cyberpunk Effects for animations */}
      <CyberpunkEffects />
    </div>
  );
}

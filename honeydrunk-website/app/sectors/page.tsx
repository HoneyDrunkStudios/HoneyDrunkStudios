'use client';

/**
 * Sectors Hub Page
 * Central showcase for all sectors in The Grid
 */

import Link from 'next/link';
import { colors } from '@/lib/tokens';
import { getAllSectorConfigs } from '@/lib/sectors';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';
import NeonGridCanvas from '@/components/NeonGridCanvas';

export default function SectorsHub() {
  const sectors = getAllSectorConfigs();

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: colors.deepSpace, color: colors.offWhite }}>
      {/* Background */}
      <div className="fixed inset-0">
        <NeonGridCanvas particleCount={150} enableMotion={true} />
      </div>

      {/* Header */}
      <Header />

      {/* Content */}
      <div className="relative z-10 pt-20 md:pt-32 px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <header className="space-y-5 md:space-y-6 mb-12 md:mb-16 text-center md:text-left">
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-display font-bold py-2 md:py-4 holographic-text"
            >
              Sectors
            </h1>
            <p className="text-base md:text-lg px-1 md:px-2" style={{ color: colors.slateLight }}>
              The Grid is organized into sectors—each a distinct domain with its own purpose, projects, and signal strength.
            </p>
          </header>

          {/* Sectors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {sectors.map((sector) => (
              <Link
                key={sector.id}
                href={`/sectors/${sector.id.toLowerCase()}`}
                className="group relative p-6 md:p-8 rounded-lg border-2 transition-all duration-300 hover:scale-105 flex flex-col"
                style={{
                  backgroundColor: `${colors.gunmetal}60`,
                  borderColor: `${sector.color}40`,
                  boxShadow: `0 0 20px ${sector.color}20`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = sector.color;
                  e.currentTarget.style.boxShadow = `0 0 30px ${sector.color}60, inset 0 0 20px ${sector.color}10`;
                  // Light up the circle
                  const circle = e.currentTarget.querySelector('.sector-icon') as HTMLElement;
                  if (circle) {
                    circle.style.backgroundColor = sector.color;
                    circle.style.boxShadow = `0 0 50px ${sector.color}, inset 0 0 30px ${sector.color}80`;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${sector.color}40`;
                  e.currentTarget.style.boxShadow = `0 0 20px ${sector.color}20`;
                  // Reset the circle
                  const circle = e.currentTarget.querySelector('.sector-icon') as HTMLElement;
                  if (circle) {
                    circle.style.backgroundColor = `${sector.color}20`;
                    circle.style.boxShadow = `0 0 30px ${sector.color}40, inset 0 0 20px ${sector.color}30`;
                  }
                }}
              >
                {/* Sector Icon/Glow */}
                <div
                  className="sector-icon absolute top-4 right-4 w-12 h-12 rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: `${sector.color}20`,
                    boxShadow: `0 0 30px ${sector.color}40, inset 0 0 20px ${sector.color}30`,
                  }}
                />

                {/* Sector Name */}
                <h2
                  className="text-2xl md:text-3xl font-display font-bold transition-all duration-300"
                  style={{
                    color: sector.color,
                    textShadow: `0 0 20px ${sector.color}60`,
                    marginBottom: '12px',
                  }}
                >
                  {sector.name}
                </h2>

                {/* Description */}
                <p
                  className="text-sm md:text-base flex-grow"
                  style={{ color: colors.slateLight, marginBottom: '24px' }}
                >
                  {sector.description}
                </p>

                {/* CTA */}
                <div
                  className="inline-flex items-center gap-2 text-sm font-mono font-semibold transition-all duration-300 group-hover:gap-3 mt-auto"
                  style={{ color: sector.color }}
                >
                  <span>Explore Sector</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
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

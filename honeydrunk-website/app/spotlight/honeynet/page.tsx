'use client';

/**
 * HoneyNet Spotlight Page
 * Run the sim. Guard the Hive.
 */

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/lib/tokens';
import { getNodes } from '@/lib/nodes';
import type { VisualNode } from '@/lib/types';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';

export default function HoneyNetSpotlight() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Get all HoneyNet sector nodes
  const honeyNetNodes = useMemo(() => {
    return getNodes().filter((node: VisualNode) => node.sector === 'HoneyNet');
  }, []);

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: colors.deepSpace }}>
      <Header />

      <div className="pt-24">
        {/* Hero */}
        <section
          className="w-full py-20 px-8 relative overflow-hidden"
          style={{
            backgroundColor: colors.deepSpace,
            minHeight: '60vh',
          }}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(/spotlight/honeynet.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.7,
              filter: 'brightness(1)',
            }}
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: `linear-gradient(to bottom, ${colors.deepSpace}00 0%, ${colors.deepSpace}DD 100%)`,
            }}
          />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h1
              className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight"
              style={{
                color: colors.matrixGreen,
                textShadow: `
                  0 0 60px ${colors.matrixGreen}FF,
                  0 0 40px ${colors.matrixGreen}CC,
                  0 0 20px ${colors.matrixGreen}80,
                  0 2px 8px rgba(0,0,0,0.8)
                `,
                marginBottom: '32px',
              }}
            >
              HoneyNet
            </h1>

            <p
              className="text-2xl md:text-3xl font-mono font-bold italic"
              style={{
                color: colors.offWhite,
                marginBottom: '16px',
              }}
            >
              Run the sim. Guard the Hive.
            </p>

            <p
              className="text-lg md:text-xl font-mono"
              style={{
                color: colors.slateLight,
                marginBottom: '48px',
              }}
            >
              Where breaches are forged and defenses are born.
            </p>

            <button
              onClick={() => setIsGalleryOpen(true)}
              className="inline-block font-mono font-bold text-sm uppercase tracking-wider px-8 py-4 border-2 transition-all duration-200 hover:scale-105 cursor-pointer"
              style={{
                color: colors.matrixGreen,
                borderColor: colors.matrixGreen,
                backgroundColor: `${colors.matrixGreen}15`,
                boxShadow: `0 0 30px ${colors.matrixGreen}40`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.matrixGreen}25`;
                e.currentTarget.style.boxShadow = `0 0 40px ${colors.matrixGreen}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.matrixGreen}15`;
                e.currentTarget.style.boxShadow = `0 0 30px ${colors.matrixGreen}40`;
              }}
            >
              ENTER THE SECTOR →
            </button>
          </div>
        </section>

        {/* Overview */}
        <section id="overview" className="w-full py-16 px-8" style={{ backgroundColor: colors.gunmetal }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wide"
              style={{
                color: colors.matrixGreen,
                textShadow: `0 0 20px ${colors.matrixGreen}60`,
                marginBottom: '48px',
              }}
            >
              Overview
            </h2>

            <div className="space-y-6" style={{ color: colors.slateLight }}>
              <p className="text-base md:text-lg leading-relaxed">
                <span style={{ color: colors.matrixGreen, fontWeight: 'bold' }}>HoneyNet</span> is where offense meets defense.
                We run the simulations, crack the puzzles, and build the shields. Every breach we simulate
                teaches us how to harden the Hive.
              </p>

              <p className="text-base md:text-lg leading-relaxed">
                From CTF challenges in <span style={{ color: colors.matrixGreen, fontWeight: 'bold' }}>BreachLab.exe</span> to
                secure-by-default SDKs in <span style={{ color: colors.matrixGreen, fontWeight: 'bold' }}>HoneySentinel</span>,
                backed by <span style={{ color: colors.matrixGreen, fontWeight: 'bold' }}>Vault</span> for secrets management
                and <span style={{ color: colors.matrixGreen, fontWeight: 'bold' }}>Pulse</span> for observability.
              </p>

              <p className="text-base md:text-lg leading-relaxed">
                The best defense is knowing your enemy, and the best way to learn is by becoming them, safely.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="w-full py-16 px-8" style={{ backgroundColor: colors.deepSpace }}>
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wide text-center"
              style={{
                color: colors.matrixGreen,
                textShadow: `0 0 20px ${colors.matrixGreen}60`,
                marginBottom: '48px',
              }}
            >
              Gallery
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-video border-2 flex items-center justify-center"
                  style={{
                    backgroundColor: `${colors.graphite}40`,
                    borderColor: `${colors.matrixGreen}30`,
                    boxShadow: `0 0 20px ${colors.matrixGreen}20`,
                  }}
                >
                  <span className="text-sm font-mono" style={{ color: colors.slateLight }}>
                    Visual {i}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Build Log */}
        <section className="w-full py-16 px-8" style={{ backgroundColor: colors.gunmetal }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wide"
              style={{
                color: colors.matrixGreen,
                textShadow: `0 0 20px ${colors.matrixGreen}60`,
                marginBottom: '48px',
              }}
            >
              Build Log
            </h2>

            <div className="mb-8">
              <div className="flex items-center gap-3">
                <span
                  className="text-sm font-mono font-bold uppercase px-3 py-1 border"
                  style={{
                    color: colors.slateLight,
                    borderColor: colors.slateLight,
                    backgroundColor: `${colors.slateLight}15`,
                  }}
                >
                  Signal: Wiring
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-mono font-bold" style={{ color: colors.offWhite, marginBottom: '16px' }}>
                Milestones
              </h3>

              {[
                'BreachLab.exe: CTF infrastructure, vulnerable-by-design targets',
                'HoneySentinel: security SDKs, defensive patterns library',
                'Vault: secrets management, zero-trust architecture',
                'Pulse: observability stack, security event correlation',
              ].map((milestone, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-2 h-2 rounded-full mt-2"
                    style={{ backgroundColor: colors.matrixGreen }}
                  />
                  <p className="text-base" style={{ color: colors.slateLight }}>
                    {milestone}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 space-y-6">
              <h3 className="text-xl font-mono font-bold" style={{ color: colors.offWhite, marginBottom: '16px' }}>
                Active Projects
              </h3>

              {honeyNetNodes.length > 0 ? (
                honeyNetNodes.map((node: VisualNode) => (
                  <div
                    key={node.id}
                    className="border-l-2 pl-4"
                    style={{ borderColor: `${colors.matrixGreen}60` }}
                  >
                    <h4 className="text-lg font-mono font-bold" style={{ color: colors.matrixGreen, marginBottom: '8px' }}>
                      {node.name}
                    </h4>
                    <p className="text-sm" style={{ color: colors.slateLight, marginBottom: '4px' }}>
                      {node.description}
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
                  </div>
                ))
              ) : (
                <p className="text-base" style={{ color: colors.slateLight }}>
                  Projects initializing...
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="w-full py-16 px-8" style={{ backgroundColor: colors.deepSpace }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wide"
              style={{
                color: colors.matrixGreen,
                textShadow: `0 0 20px ${colors.matrixGreen}60`,
                marginBottom: '48px',
              }}
            >
              Tech Stack / Grid Links
            </h2>

            <p className="text-base md:text-lg font-mono" style={{ color: colors.slateLight, marginBottom: '24px' }}>
              Powered by:
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                'HoneyDrunk.Kernel',
                'HoneyDrunk.Auth',
                'HoneyDrunk.Transport',
                'Pulse',
                'Vault',
                'AgentKit',
              ].map((node) => (
                <Link
                  key={node}
                  href="/grid"
                  className="font-mono text-sm px-4 py-2 border transition-all hover:scale-105"
                  style={{
                    color: colors.matrixGreen,
                    borderColor: `${colors.matrixGreen}60`,
                    backgroundColor: `${colors.matrixGreen}10`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${colors.matrixGreen}20`;
                    e.currentTarget.style.borderColor = colors.matrixGreen;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${colors.matrixGreen}10`;
                    e.currentTarget.style.borderColor = `${colors.matrixGreen}60`;
                  }}
                >
                  {node}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="w-full py-16 px-8" style={{ backgroundColor: colors.gunmetal }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wide"
              style={{
                color: colors.matrixGreen,
                textShadow: `0 0 20px ${colors.matrixGreen}60`,
                marginBottom: '48px',
              }}
            >
              Philosophy
            </h2>

            <blockquote
              className="text-xl md:text-2xl font-mono italic border-l-4 pl-6"
              style={{
                color: colors.offWhite,
                borderColor: colors.matrixGreen,
              }}
            >
              "Break it. Learn it. Build it stronger."
            </blockquote>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="w-full py-16 px-8" style={{ backgroundColor: colors.deepSpace }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="https://x.com/HoneyDrunkLab"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-bold text-sm uppercase tracking-wider px-6 py-3 border-2 transition-all hover:scale-105"
                style={{
                  color: colors.matrixGreen,
                  borderColor: colors.matrixGreen,
                  backgroundColor: `${colors.matrixGreen}15`,
                }}
              >
                FOLLOW THE SIGNAL →
              </Link>

              <Link
                href="/signal?sector=HoneyNet"
                className="font-mono font-bold text-sm uppercase tracking-wider px-6 py-3 border-2 transition-all hover:scale-105"
                style={{
                  color: colors.matrixGreen,
                  borderColor: colors.matrixGreen,
                  backgroundColor: `${colors.matrixGreen}15`,
                }}
              >
                READ THE DEVLOG →
              </Link>

              <Link
                href="/grid?sector=HoneyNet"
                className="font-mono font-bold text-sm uppercase tracking-wider px-6 py-3 border-2 transition-all hover:scale-105"
                style={{
                  color: colors.matrixGreen,
                  borderColor: colors.matrixGreen,
                  backgroundColor: `${colors.matrixGreen}15`,
                }}
              >
                EXPLORE GRID →
              </Link>
            </div>

            {/* Cross-link to other spotlights */}
            <div className="text-center pt-8 border-t" style={{ borderColor: `${colors.graphite}60` }}>
              <p
                className="text-sm font-mono"
                style={{
                  color: colors.slateLight,
                  marginBottom: '16px',
                }}
              >
                Explore more systems
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/spotlight/honeyplay"
                  className="inline-block font-mono font-bold text-sm uppercase tracking-wider px-6 py-3 border-2 transition-all hover:scale-105"
                  style={{
                    color: colors.neonPink,
                    borderColor: colors.neonPink,
                    backgroundColor: `${colors.neonPink}15`,
                  }}
                >
                  HONEYPLAY →
                </Link>
                <Link
                  href="/spotlight/cyberware"
                  className="inline-block font-mono font-bold text-sm uppercase tracking-wider px-6 py-3 border-2 transition-all hover:scale-105"
                  style={{
                    color: colors.electricBlue,
                    borderColor: colors.electricBlue,
                    backgroundColor: `${colors.electricBlue}15`,
                  }}
                >
                  CYBERWARE →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <LandingFooter />

      {/* Gallery Modal */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
            onClick={() => setIsGalleryOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto p-8 border-2"
              style={{
                backgroundColor: colors.deepSpace,
                borderColor: colors.matrixGreen,
                boxShadow: `0 0 60px ${colors.matrixGreen}60`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center border-2 transition-all hover:scale-110 z-10"
                style={{
                  color: colors.matrixGreen,
                  borderColor: colors.matrixGreen,
                  backgroundColor: `${colors.deepSpace}DD`,
                }}
              >
                <span className="text-2xl">×</span>
              </button>

              <h2
                className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wide text-center mb-8"
                style={{
                  color: colors.matrixGreen,
                  textShadow: `0 0 20px ${colors.matrixGreen}60`,
                }}
              >
                HoneyNet Gallery
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="aspect-video border-2 flex items-center justify-center"
                    style={{
                      backgroundColor: `${colors.graphite}40`,
                      borderColor: `${colors.matrixGreen}30`,
                      boxShadow: `0 0 20px ${colors.matrixGreen}20`,
                    }}
                  >
                    <span className="text-sm font-mono" style={{ color: colors.slateLight }}>
                      Visual {i}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-base font-mono" style={{ color: colors.slateLight }}>
                  Gallery placeholders — add your visuals here
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

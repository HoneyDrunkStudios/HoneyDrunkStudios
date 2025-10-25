'use client';

/**
 * HoneyPlay Spotlight Page
 * Stories wired to the soul.
 */

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/lib/tokens';
import { getNodes } from '@/lib/nodes';
import type { VisualNode } from '@/lib/types';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';

export default function HoneyPlaySpotlight() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  
  // Get all Play sector nodes
  const playNodes = useMemo(() => {
    return getNodes().filter((node: VisualNode) => node.sector === 'Play');
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
              backgroundImage: 'url(/spotlight/gaming.png)',
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
                color: colors.neonPink,
                textShadow: `
                  0 0 60px ${colors.neonPink}FF,
                  0 0 40px ${colors.neonPink}CC,
                  0 0 20px ${colors.neonPink}80,
                  0 2px 8px rgba(0,0,0,0.8)
                `,
                marginBottom: '32px',
              }}
            >
              HoneyPlay
            </h1>
            
            <p
              className="text-2xl md:text-3xl font-mono font-bold italic"
              style={{ 
                color: colors.offWhite,
                marginBottom: '16px',
              }}
            >
              Stories wired to the soul.
            </p>
            
            <p
              className="text-lg md:text-xl font-mono"
              style={{ 
                color: colors.slateLight,
                marginBottom: '48px',
              }}
            >
              Tools for building worlds — and the worlds themselves.
            </p>
            
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="inline-block font-mono font-bold text-sm uppercase tracking-wider px-8 py-4 border-2 transition-all duration-200 hover:scale-105 cursor-pointer"
              style={{
                color: colors.neonPink,
                borderColor: colors.neonPink,
                backgroundColor: `${colors.neonPink}15`,
                boxShadow: `0 0 30px ${colors.neonPink}40`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.neonPink}25`;
                e.currentTarget.style.boxShadow = `0 0 40px ${colors.neonPink}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.neonPink}15`;
                e.currentTarget.style.boxShadow = `0 0 30px ${colors.neonPink}40`;
              }}
            >
              SEE THE VISION →
            </button>
          </div>
        </section>

        {/* Overview */}
        <section id="overview" className="w-full py-16 px-8" style={{ backgroundColor: colors.gunmetal }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wide"
              style={{
                color: colors.neonPink,
                textShadow: `0 0 20px ${colors.neonPink}60`,
                marginBottom: '48px',
              }}
            >
              Overview
            </h2>
            
            <div className="space-y-6" style={{ color: colors.slateLight }}>
              <p className="text-base md:text-lg leading-relaxed">
                HoneyPlay is our narrative lab. A place where story systems, music, and mechanics braid into playable emotion.
              </p>
              
              <p className="text-base md:text-lg leading-relaxed">
                We're building repeatable craft: pipelines for cutscenes, interaction motifs, and pacing that any indie team can adopt.
              </p>
              
              <p className="text-base md:text-lg leading-relaxed">
                The goal isn't a single game—it's a method for making many, faster, with more soul.
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
                color: colors.neonPink,
                textShadow: `0 0 20px ${colors.neonPink}60`,
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
                    borderColor: `${colors.neonPink}30`,
                    boxShadow: `0 0 20px ${colors.neonPink}20`,
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
                color: colors.neonPink,
                textShadow: `0 0 20px ${colors.neonPink}60`,
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
                  Signal: Seed
                </span>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-mono font-bold" style={{ color: colors.offWhite, marginBottom: '16px' }}>
                Active Projects
              </h3>
              
              {playNodes.length > 0 ? (
                playNodes.map((node) => (
                  <div
                    key={node.id}
                    className="border-l-2 pl-4"
                    style={{ borderColor: `${colors.neonPink}60` }}
                  >
                    <h4 className="text-lg font-mono font-bold" style={{ color: colors.neonPink, marginBottom: '8px' }}>
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
                color: colors.neonPink,
                textShadow: `0 0 20px ${colors.neonPink}60`,
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
                'HoneyDrunk.Transport',
                'HoneyCore.Web.Rest',
                'Pulse',
                'AgentKit',
              ].map((node) => (
                <Link
                  key={node}
                  href="/grid"
                  className="font-mono text-sm px-4 py-2 border transition-all hover:scale-105"
                  style={{
                    color: colors.neonPink,
                    borderColor: `${colors.neonPink}60`,
                    backgroundColor: `${colors.neonPink}10`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${colors.neonPink}20`;
                    e.currentTarget.style.borderColor = colors.neonPink;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${colors.neonPink}10`;
                    e.currentTarget.style.borderColor = `${colors.neonPink}60`;
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
                color: colors.neonPink,
                textShadow: `0 0 20px ${colors.neonPink}60`,
                marginBottom: '48px',
              }}
            >
              Philosophy
            </h2>
            
            <blockquote
              className="text-xl md:text-2xl font-mono italic border-l-4 pl-6"
              style={{
                color: colors.offWhite,
                borderColor: colors.neonPink,
              }}
            >
              "Code is craft. Systems are art. The right tools make feelings playable."
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
                  color: colors.neonPink,
                  borderColor: colors.neonPink,
                  backgroundColor: `${colors.neonPink}15`,
                }}
              >
                FOLLOW THE SIGNAL →
              </Link>
              
              <Link
                href="/signal?sector=Play"
                className="font-mono font-bold text-sm uppercase tracking-wider px-6 py-3 border-2 transition-all hover:scale-105"
                style={{
                  color: colors.neonPink,
                  borderColor: colors.neonPink,
                  backgroundColor: `${colors.neonPink}15`,
                }}
              >
                READ THE DEVLOG →
              </Link>
              
              <Link
                href="/signal"
                className="font-mono font-bold text-sm uppercase tracking-wider px-6 py-3 border-2 transition-all hover:scale-105"
                style={{
                  color: colors.neonPink,
                  borderColor: colors.neonPink,
                  backgroundColor: `${colors.neonPink}15`,
                }}
              >
                JOIN PLAYTESTS →
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
                <Link
                  href="/spotlight/honeynet"
                  className="inline-block font-mono font-bold text-sm uppercase tracking-wider px-6 py-3 border-2 transition-all hover:scale-105"
                  style={{
                    color: colors.matrixGreen,
                    borderColor: colors.matrixGreen,
                    backgroundColor: `${colors.matrixGreen}15`,
                  }}
                >
                  HONEYNET →
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
                borderColor: colors.neonPink,
                boxShadow: `0 0 60px ${colors.neonPink}60`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center border-2 transition-all hover:scale-110 z-10"
                style={{
                  color: colors.neonPink,
                  borderColor: colors.neonPink,
                  backgroundColor: `${colors.deepSpace}DD`,
                }}
              >
                <span className="text-2xl">×</span>
              </button>

              <h2
                className="text-3xl md:text-4xl font-display font-bold uppercase tracking-wide text-center mb-8"
                style={{
                  color: colors.neonPink,
                  textShadow: `0 0 20px ${colors.neonPink}60`,
                }}
              >
                HoneyPlay Gallery
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
                      borderColor: `${colors.neonPink}30`,
                      boxShadow: `0 0 20px ${colors.neonPink}20`,
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

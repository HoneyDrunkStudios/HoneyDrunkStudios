'use client';

/**
 * HoneyDrunk Playground — Simulation Bay
 * Public-facing sandbox for experimental, educational white-hat modules
 */

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { colors, shadows, zIndex } from '@/lib/tokens';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';
import manifest from '@/data/playground/manifest.json';

interface PlaygroundNode {
  id: string;
  name: string;
  status: 'Seed' | 'Awake' | 'Locked';
  tagline: string;
  route: string | null;
}

export default function PlaygroundPage() {
  const [hoveredPod, setHoveredPod] = useState<string | null>(null);

  const nodes = manifest as PlaygroundNode[];

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: colors.deepSpace }}>
      <Header />

      <main className="pt-32 pb-16 px-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold mb-4"
            style={{
              color: colors.aurumGold,
              textShadow: shadows.neonGold,
              fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            HoneyDrunk Playground
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg mb-6"
            style={{ color: colors.slateLight }}
          >
            The Hive's sandbox.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base max-w-2xl mx-auto"
            style={{ color: colors.offWhite }}
          >
            Where operators tinker with simulated exploits, encrypted puzzles, and system
            curiosities — not to harm, but to understand.
          </motion.p>
        </div>

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          role="alert"
          aria-live="polite"
          className="mb-12 p-6 rounded-lg border-2"
          style={{
            backgroundColor: `${colors.pulseRed}10`,
            borderColor: colors.pulseRed,
            boxShadow: `0 0 20px ${colors.pulseRed}30`,
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="text-2xl flex-shrink-0"
              style={{ color: colors.pulseRed }}
              aria-hidden="true"
            >
              ⚠
            </div>
            <div>
              <p className="font-mono text-sm mb-2" style={{ color: colors.pulseRed }}>
                SIMULATED ENVIRONMENT — EDUCATIONAL AND ETHICAL USE ONLY
              </p>
              <p className="text-sm" style={{ color: colors.offWhite }}>
                This is a controlled sandbox for learning security concepts. All activities are
                client-side and do not interact with real systems. Report real vulnerabilities via{' '}
                <Link
                  href="/signal"
                  className="underline transition-all"
                  style={{ color: colors.electricBlue }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.aurumGold;
                    e.currentTarget.style.textShadow = shadows.neonGold;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.electricBlue;
                    e.currentTarget.style.textShadow = 'none';
                  }}
                >
                  Responsible Disclosure
                </Link>
                .
              </p>
            </div>
          </div>
        </motion.div>

        {/* Playground Pods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nodes.map((node, index) => {
            const isLocked = node.status === 'Locked';
            const isActive = !isLocked;

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                onMouseEnter={() => setHoveredPod(node.id)}
                onMouseLeave={() => setHoveredPod(null)}
                className="relative p-6 rounded-lg border-2 transition-all"
                style={{
                  backgroundColor: isLocked ? colors.gunmetal : `${colors.violetFlux}08`,
                  borderColor:
                    hoveredPod === node.id && isActive
                      ? colors.violetFlux
                      : isLocked
                      ? colors.graphite
                      : `${colors.violetFlux}40`,
                  boxShadow:
                    hoveredPod === node.id && isActive
                      ? `0 0 30px ${colors.violetFlux}50`
                      : 'none',
                  cursor: isActive ? 'pointer' : 'not-allowed',
                  opacity: isLocked ? 0.6 : 1,
                }}
                role="article"
                aria-label={`${node.name} - ${node.status}`}
              >
                {/* Status Badge */}
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold mb-4"
                  style={{
                    backgroundColor:
                      node.status === 'Seed'
                        ? `${colors.signalGreen}20`
                        : node.status === 'Awake'
                        ? `${colors.electricBlue}20`
                        : `${colors.graphite}40`,
                    color:
                      node.status === 'Seed'
                        ? colors.signalGreen
                        : node.status === 'Awake'
                        ? colors.electricBlue
                        : colors.slateLight,
                    border: `1px solid ${
                      node.status === 'Seed'
                        ? colors.signalGreen
                        : node.status === 'Awake'
                        ? colors.electricBlue
                        : colors.graphite
                    }`,
                  }}
                >
                  {node.status.toUpperCase()}
                </div>

                {/* Title */}
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{
                    color: isLocked ? colors.slateLight : colors.aurumGold,
                    fontFamily: 'Space Grotesk, sans-serif',
                  }}
                >
                  {node.name}
                </h3>

                {/* Tagline */}
                <p className="text-sm mb-6" style={{ color: colors.slateLight }}>
                  {node.tagline}
                </p>

                {/* Launch Button */}
                {isActive && node.route ? (
                  <Link
                    href={node.route}
                    className="inline-block px-6 py-3 rounded-lg font-mono font-bold text-sm border-2 transition-all"
                    style={{
                      color: colors.deepSpace,
                      backgroundColor: colors.aurumGold,
                      borderColor: colors.aurumGold,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.electricBlue;
                      e.currentTarget.style.borderColor = colors.electricBlue;
                      e.currentTarget.style.boxShadow = shadows.neonBlue;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.aurumGold;
                      e.currentTarget.style.borderColor = colors.aurumGold;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        window.location.href = node.route!;
                      }
                    }}
                    tabIndex={0}
                    role="button"
                  >
                    LAUNCH
                  </Link>
                ) : (
                  <button
                    disabled
                    className="inline-block px-6 py-3 rounded-lg font-mono font-bold text-sm border-2 cursor-not-allowed"
                    style={{
                      color: colors.slateLight,
                      backgroundColor: 'transparent',
                      borderColor: colors.graphite,
                      opacity: 0.5,
                    }}
                    aria-disabled="true"
                  >
                    LOCKED
                  </button>
                )}

                {/* Glow effect on hover */}
                {isActive && hoveredPod === node.id && (
                  <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${colors.violetFlux}15, transparent 70%)`,
                      zIndex: -1,
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Legal Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center text-xs font-mono"
          style={{ color: colors.slateLight }}
        >
          Educational use only. Report real issues via{' '}
          <Link
            href="/signal"
            className="underline transition-all"
            style={{ color: colors.electricBlue }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.aurumGold;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.electricBlue;
            }}
          >
            Responsible Disclosure
          </Link>
          .
        </motion.div>
      </main>

      <LandingFooter />
    </div>
  );
}

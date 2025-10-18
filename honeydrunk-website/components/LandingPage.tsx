'use client';

/**
 * LandingPage — Main landing experience
 * Orchestrates gate → grid reveal sequence
 */

import { useState } from 'react';
import Image from 'next/image';
import { getFeaturedNodes, getNodeById, getConnectedNodes } from '@/lib/nodes';
import NeonGridCanvas from './NeonGridCanvas';
import EnterTheHive from './EnterTheHive';
import TheGrid from './TheGrid';
import NodeDrawer from './NodeDrawer';
import Link from 'next/link';
import { colors } from '@/lib/tokens';

export default function LandingPage() {
  const [hasEntered, setHasEntered] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>();

  const featuredNodes = getFeaturedNodes(); // Show all active nodes (non-Seed, non-Archive)
  const selectedNode = selectedNodeId ? getNodeById(selectedNodeId) : null;
  const connectedNodes = selectedNodeId ? getConnectedNodes(selectedNodeId) : [];

  if (!hasEntered) {
    return (
      <>
        <NeonGridCanvas particleCount={100} enableMotion={true} />
        <EnterTheHive onComplete={() => setHasEntered(true)} />
      </>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <NeonGridCanvas particleCount={150} enableMotion={true} />
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full h-full">
        {/* Header */}
        <header
          className="absolute z-20 border-b-2 backdrop-blur-sm"
          style={{
            top: 0,
            left: 0,
            right: 0,
            borderColor: colors.neonPink,
            backgroundColor: `${colors.deepSpace}95`,
            boxShadow: `0 4px 20px ${colors.neonPink}20`,
          }}
        >
          <div className="w-full px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image 
              src="/honeydrunk.png" 
              alt="HoneyDrunk Logo" 
              width={40}
              height={40}
              className="w-10 h-10"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(255, 42, 109, 0.5))',
              }}
            />
            <h1
              className="text-2xl font-mono font-bold uppercase tracking-wider"
              style={{
                color: colors.neonPink,
                textShadow: `0 0 20px ${colors.neonPink}80`,
              }}
            >
              [HONEYDRUNK]
            </h1>
          </div>

          <nav className="flex gap-6 text-sm font-mono font-bold uppercase tracking-wider">
            <Link
              href="/nodes"
              className="transition-all px-4 py-2 border"
              style={{
                color: colors.electricBlue,
                borderColor: `${colors.electricBlue}40`,
                backgroundColor: `${colors.electricBlue}10`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.neonPink;
                e.currentTarget.style.borderColor = colors.neonPink;
                e.currentTarget.style.backgroundColor = `${colors.neonPink}20`;
                e.currentTarget.style.boxShadow = `0 0 15px ${colors.neonPink}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.electricBlue;
                e.currentTarget.style.borderColor = `${colors.electricBlue}40`;
                e.currentTarget.style.backgroundColor = `${colors.electricBlue}10`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              GRID
            </Link>
            <Link
              href="/signal"
              className="transition-all px-4 py-2 border"
              style={{
                color: colors.electricBlue,
                borderColor: `${colors.electricBlue}40`,
                backgroundColor: `${colors.electricBlue}10`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.neonPink;
                e.currentTarget.style.borderColor = colors.neonPink;
                e.currentTarget.style.backgroundColor = `${colors.neonPink}20`;
                e.currentTarget.style.boxShadow = `0 0 15px ${colors.neonPink}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.electricBlue;
                e.currentTarget.style.borderColor = `${colors.electricBlue}40`;
                e.currentTarget.style.backgroundColor = `${colors.electricBlue}10`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              SIGNAL
            </Link>
            <Link
              href="/brand"
              className="transition-all px-4 py-2 border"
              style={{
                color: colors.electricBlue,
                borderColor: `${colors.electricBlue}40`,
                backgroundColor: `${colors.electricBlue}10`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.neonPink;
                e.currentTarget.style.borderColor = colors.neonPink;
                e.currentTarget.style.backgroundColor = `${colors.neonPink}20`;
                e.currentTarget.style.boxShadow = `0 0 15px ${colors.neonPink}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.electricBlue;
                e.currentTarget.style.borderColor = `${colors.electricBlue}40`;
                e.currentTarget.style.backgroundColor = `${colors.electricBlue}10`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              BRAND
            </Link>
            <Link
              href="/about"
              className="transition-all px-4 py-2 border"
              style={{
                color: colors.electricBlue,
                borderColor: `${colors.electricBlue}40`,
                backgroundColor: `${colors.electricBlue}10`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.neonPink;
                e.currentTarget.style.borderColor = colors.neonPink;
                e.currentTarget.style.backgroundColor = `${colors.neonPink}20`;
                e.currentTarget.style.boxShadow = `0 0 15px ${colors.neonPink}60`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.electricBlue;
                e.currentTarget.style.borderColor = `${colors.electricBlue}40`;
                e.currentTarget.style.backgroundColor = `${colors.electricBlue}10`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              ABOUT
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Grid */}
      <div className="relative w-full h-full">
        <TheGrid
          nodes={featuredNodes}
          selectedNodeId={selectedNodeId}
          onNodeClick={(node) => setSelectedNodeId(node.id)}
        />
      </div>

      {/* Featured content overlay */}
      <div
        className="absolute bottom-8 right-8 z-20 max-w-2xl
                   p-6 backdrop-blur-sm border-2"
        style={{
          backgroundColor: `${colors.deepSpace}95`,
          borderColor: colors.neonPink,
          boxShadow: `0 0 40px ${colors.neonPink}40, inset 0 0 20px ${colors.neonPink}10`,
          clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)',
        }}
      >
        <h2
          className="text-2xl font-mono font-bold mb-4 uppercase tracking-wide"
          style={{
            color: colors.neonPink,
            textShadow: `0 0 20px ${colors.neonPink}80`,
          }}
        >
          &gt;&gt; SYSTEM.STATUS
        </h2>
        <p
          className="text-sm mb-4 leading-loose font-mono"
          style={{ color: colors.electricBlue }}
        >
          <span style={{ color: colors.aurumGold }}>&gt;</span> Build-in-Public.exe --running<br />
          <span style={{ color: colors.aurumGold }}>&gt;</span> Zero-Bloat Architecture --enabled<br />
          <span style={{ color: colors.aurumGold }}>&gt;</span> AI Agents --amplifying<br />
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{ 
            color: colors.slateLight,
            marginBottom: '1.5rem'
          }}
        >
          A living grid of interconnected nodes. Every project earns its keep.
          Every line of code tells a story. Structure meets soul.
        </p>
        <div className="flex gap-3">
          <Link
            href="/nodes"
            className="font-mono font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105 group"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: `${colors.neonPink}20`,
              borderWidth: '2px',
              borderColor: colors.neonPink,
              color: colors.offWhite,
              boxShadow: `0 0 30px ${colors.neonPink}60, inset 0 0 10px ${colors.neonPink}20`,
              clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${colors.neonPink}30`;
              e.currentTarget.style.boxShadow = `0 0 40px ${colors.neonPink}80, inset 0 0 15px ${colors.neonPink}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = `${colors.neonPink}20`;
              e.currentTarget.style.boxShadow = `0 0 30px ${colors.neonPink}60, inset 0 0 10px ${colors.neonPink}20`;
            }}
          >
            &gt;&gt; EXPLORE GRID
          </Link>
          <Link
            href="/about"
            className="font-mono font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105"
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: `${colors.electricBlue}15`,
              borderWidth: '2px',
              borderColor: colors.electricBlue,
              color: colors.electricBlue,
              boxShadow: `0 0 20px ${colors.electricBlue}40`,
            }}
          >
            [ INFO ]
          </Link>
        </div>
      </div>

      {/* Node Detail Drawer */}
      <NodeDrawer
        node={selectedNode || null}
        onClose={() => setSelectedNodeId(undefined)}
        connectedNodes={connectedNodes}
      />
      </div>
    </div>
  );
}

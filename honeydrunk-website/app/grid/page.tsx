'use client';

/**
 * /grid — Full Grid view with filters
 */

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAllSectors, getAllSignals, filterNodes, getNodeById, getConnectedNodes } from '@/lib/nodes';
import type { Sector, Signal } from '@/lib/types';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import TheGrid from '@/components/TheGrid';
import NodeDrawer from '@/components/NodeDrawer';
import FilterChips, { getSectorColor, getSignalColor } from '@/components/FilterChips';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';
import { colors } from '@/lib/tokens';

function GridContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedSectors, setSelectedSectors] = useState<Sector[]>([]);
  const [selectedSignals, setSelectedSignals] = useState<Signal[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>();
  const [showFilters, setShowFilters] = useState(true);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [useFlowVisuals, setUseFlowVisuals] = useState(false); // Toggle for Flow-based visuals

  // Initialize from URL params
  useEffect(() => {
    const sectorsParam = searchParams.get('sectors');
    const signalsParam = searchParams.get('signals');
    const searchParam = searchParams.get('search');
    const flowModeParam = searchParams.get('flowMode');

    if (sectorsParam) {
      setSelectedSectors(sectorsParam.split(',') as Sector[]);
    }
    if (signalsParam) {
      setSelectedSignals(signalsParam.split(',') as Signal[]);
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    if (flowModeParam === 'true') {
      setUseFlowVisuals(true);
    }
  }, [searchParams]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedSectors.length > 0) {
      params.set('sectors', selectedSectors.join(','));
    }
    if (selectedSignals.length > 0) {
      params.set('signals', selectedSignals.join(','));
    }
    if (searchQuery) {
      params.set('search', searchQuery);
    }

    const newUrl = params.toString() ? `/grid?${params.toString()}` : '/grid';
    router.replace(newUrl, { scroll: false });
  }, [selectedSectors, selectedSignals, searchQuery, router]);

  const allSectors = getAllSectors();
  const allSignals = getAllSignals();

  const filteredNodes = filterNodes(
    selectedSectors.length > 0 ? selectedSectors : undefined,
    selectedSignals.length > 0 ? selectedSignals : undefined,
    searchQuery || undefined
  );

  // Auto-open drawer when navigating from services with search query (only once)
  useEffect(() => {
    if (searchQuery && filteredNodes.length === 1 && !hasAutoOpened) {
      setSelectedNodeId(filteredNodes[0].id);
      setHasAutoOpened(true);
    }
  }, [searchQuery, filteredNodes, hasAutoOpened]);

  const selectedNode = selectedNodeId ? getNodeById(selectedNodeId) : null;
  const connectedNodes = selectedNodeId ? getConnectedNodes(selectedNodeId) : [];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <NeonGridCanvas particleCount={200} enableMotion={true} />

      {/* Header */}
      <Header />

      {/* Search and Filter Bar */}
      <div className="absolute top-20 left-0 right-0 z-40 px-8 py-4 flex items-center justify-end gap-4">
        {/* Search */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search nodes..."
          className="px-6 py-4 rounded-lg text-sm font-mono
                   focus:outline-none focus:ring-2"
          style={{
            backgroundColor: `${colors.gunmetal}80`,
            borderWidth: '1px',
            borderColor: `${colors.slateLight}40`,
            color: colors.offWhite,
          }}
        />

        {/* Flow Visual toggle */}
        <button
          onClick={() => setUseFlowVisuals(!useFlowVisuals)}
          className="px-6 py-4 rounded-lg text-sm font-mono cursor-pointer
                   transition-all duration-200 hover:scale-105 whitespace-nowrap"
          style={{
            backgroundColor: useFlowVisuals
              ? `${colors.aurumGold}30`
              : `${colors.gunmetal}80`,
            borderWidth: '1px',
            borderColor: useFlowVisuals
              ? colors.aurumGold
              : `${colors.slateLight}40`,
            color: useFlowVisuals ? colors.aurumGold : colors.slateLight,
          }}
        >
          {useFlowVisuals ? '⚡ ' : ''}Flow Mode
        </button>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-6 py-4 rounded-lg text-sm font-mono cursor-pointer
                   transition-all duration-200 hover:scale-105 whitespace-nowrap"
          style={{
            backgroundColor: showFilters
              ? `${colors.violetCore}30`
              : `${colors.gunmetal}80`,
            borderWidth: '1px',
            borderColor: showFilters
              ? colors.violetCore
              : `${colors.slateLight}40`,
            color: showFilters ? colors.violetCore : colors.slateLight,
          }}
        >
          {showFilters ? '✓ ' : ''}Filters ({filteredNodes.length})
        </button>
      </div>

      {/* Filters sidebar */}
      {showFilters && (
        <aside
          className="absolute left-6 z-30 w-64
                     p-5 rounded-lg backdrop-blur-sm border space-y-5"
          style={{
            top: '7rem',
            backgroundColor: `${colors.deepSpace}90`,
            borderColor: `${colors.slateLight}30`,
          }}
        >
          <FilterChips
            label="Sector"
            options={allSectors}
            selected={selectedSectors}
            onChange={setSelectedSectors}
            getColor={getSectorColor}
          />

          <FilterChips
            label="Signal"
            options={allSignals}
            selected={selectedSignals}
            onChange={setSelectedSignals}
            getColor={getSignalColor}
          />

          {(selectedSectors.length > 0 ||
            selectedSignals.length > 0 ||
            searchQuery) && (
            <button
              onClick={() => {
                setSelectedSectors([]);
                setSelectedSignals([]);
                setSearchQuery('');
              }}
              className="w-full px-4 py-3 rounded-lg text-xs font-mono cursor-pointer
                       transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: `${colors.gunmetal}60`,
                borderWidth: '1px',
                borderColor: `${colors.slateLight}40`,
                color: colors.slateLight,
              }}
            >
              Clear All Filters
            </button>
          )}
        </aside>
      )}

      {/* Main Grid */}
      <div className="relative z-20 w-full h-full pt-20">
        <TheGrid
          nodes={filteredNodes}
          selectedNodeId={selectedNodeId}
          onNodeClick={(node) => setSelectedNodeId(node.id)}
          useFlowVisuals={useFlowVisuals}
        />
      </div>

      {/* Legend */}
      <div
        className="absolute right-6 z-10
                   p-4 rounded-lg backdrop-blur-sm border space-y-3"
        style={{
          top: '15rem',
          backgroundColor: `${colors.deepSpace}90`,
          borderColor: `${colors.slateLight}30`,
        }}
      >
        <div
          className="text-xs font-mono uppercase tracking-wider font-semibold"
          style={{ color: colors.slateLight }}
        >
          Legend
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono" style={{ color: colors.slateLight }}>
            <div className="font-semibold mb-2 text-xs" style={{ color: colors.offWhite }}>Signals</div>
            {allSignals.map((signal) => {
              const descriptions: Record<string, string> = {
                Seed: 'Queued/Backlog',
                Awake: 'Planning/Starting',
                Wiring: 'Active Development',
                Live: 'Production/Deployed',
                Echo: 'Maintenance/Iteration',
                Archive: 'Retired/Deprecated',
              };
              return (
                <div key={signal} className="flex items-start gap-2 mb-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full mt-0.5 flex-shrink-0"
                    style={{ backgroundColor: getSignalColor(signal) }}
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-xs" style={{ color: colors.offWhite }}>
                      {signal}
                    </div>
                    <div className="text-xs opacity-70 leading-tight">{descriptions[signal]}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Node Detail Drawer */}
      <NodeDrawer
        node={selectedNode || null}
        onClose={() => setSelectedNodeId(undefined)}
        connectedNodes={connectedNodes}
      />

      {/* Back to Home button */}
      <div
        className="absolute bottom-8 right-8 z-20 max-w-xs
                   p-4 backdrop-blur-sm border-2 hidden md:block"
        style={{
          backgroundColor: `${colors.deepSpace}95`,
          borderColor: colors.electricBlue,
          boxShadow: `0 0 30px ${colors.electricBlue}40, inset 0 0 20px ${colors.electricBlue}10`,
          clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)',
        }}
      >
        <Link
          href="/"
          className="font-mono font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105 cursor-pointer flex items-center justify-center"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: `${colors.electricBlue}20`,
            borderWidth: '2px',
            borderColor: colors.electricBlue,
            color: colors.offWhite,
            boxShadow: `0 0 20px ${colors.electricBlue}60, inset 0 0 10px ${colors.electricBlue}20`,
            clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
          }}
        >
          &lt;&lt; BACK TO HOME
        </Link>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <LandingFooter />
      </div>
    </div>
  );
}

export default function GridPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-deep-space" />}>
      <GridContent />
    </Suspense>
  );
}

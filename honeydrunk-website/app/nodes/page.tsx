'use client';

/**
 * /nodes — Full Grid view with filters
 */

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getAllSectors, getAllSignals, filterNodes, getNodeById, getConnectedNodes } from '@/lib/nodes';
import type { Sector, Signal } from '@/lib/types';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import TheGrid from '@/components/TheGrid';
import NodeDrawer from '@/components/NodeDrawer';
import FilterChips, { getSectorColor, getSignalColor } from '@/components/FilterChips';
import { colors } from '@/lib/tokens';
import Link from 'next/link';

function NodesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedSectors, setSelectedSectors] = useState<Sector[]>([]);
  const [selectedSignals, setSelectedSignals] = useState<Signal[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>();
  const [showFilters, setShowFilters] = useState(true);

  // Initialize from URL params
  useEffect(() => {
    const sectorsParam = searchParams.get('sectors');
    const signalsParam = searchParams.get('signals');
    const searchParam = searchParams.get('search');

    if (sectorsParam) {
      setSelectedSectors(sectorsParam.split(',') as Sector[]);
    }
    if (signalsParam) {
      setSelectedSignals(signalsParam.split(',') as Signal[]);
    }
    if (searchParam) {
      setSearchQuery(searchParam);
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

    const newUrl = params.toString() ? `/nodes?${params.toString()}` : '/nodes';
    router.replace(newUrl, { scroll: false });
  }, [selectedSectors, selectedSignals, searchQuery, router]);

  const allSectors = getAllSectors();
  const allSignals = getAllSignals();

  const filteredNodes = filterNodes(
    selectedSectors.length > 0 ? selectedSectors : undefined,
    selectedSignals.length > 0 ? selectedSignals : undefined,
    searchQuery || undefined
  );

  const selectedNode = selectedNodeId ? getNodeById(selectedNodeId) : null;
  const connectedNodes = selectedNodeId ? getConnectedNodes(selectedNodeId) : [];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <NeonGridCanvas particleCount={200} enableMotion={true} />

      {/* Header */}
      <header
        className="absolute top-0 left-0 right-0 z-30 px-8 py-8
                   border-b backdrop-blur-sm"
        style={{
          borderColor: `${colors.slateLight}20`,
          backgroundColor: `${colors.deepSpace}90`,
        }}
      >
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-display font-bold px-6 py-3"
            style={{
              background: `linear-gradient(135deg, ${colors.aurumGold} 0%, ${colors.violetCore} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ← HoneyDrunk
          </Link>

          <div className="flex items-center gap-8">
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

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-4 rounded-lg text-sm font-mono
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
        </div>
      </header>

      {/* Filters sidebar */}
      {showFilters && (
        <aside
          className="absolute top-28 left-8 z-30 w-80
                     p-8 rounded-lg backdrop-blur-sm border space-y-8"
          style={{
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
              className="w-full px-5 py-4 rounded-lg text-xs font-mono
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
        />
      </div>

      {/* Legend */}
      <div
        className="absolute top-24 right-8 z-30
                   p-6 rounded-lg backdrop-blur-sm border space-y-4"
        style={{
          backgroundColor: `${colors.deepSpace}90`,
          borderColor: `${colors.slateLight}30`,
        }}
      >
        <div
          className="text-xs font-mono uppercase tracking-wider"
          style={{ color: colors.slateLight }}
        >
          Legend
        </div>

        <div className="space-y-3">
          <div className="text-xs font-mono" style={{ color: colors.slateLight }}>
            <div className="font-semibold mb-3 text-sm">Signals</div>
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
                <div key={signal} className="flex items-start gap-3 mb-2">
                  <div
                    className="w-3 h-3 rounded-full mt-0.5 flex-shrink-0"
                    style={{ backgroundColor: getSignalColor(signal) }}
                  />
                  <div className="flex-1">
                    <div className="font-semibold" style={{ color: colors.offWhite }}>
                      {signal}
                    </div>
                    <div className="text-xs opacity-75">{descriptions[signal]}</div>
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
    </div>
  );
}

export default function NodesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-deep-space" />}>
      <NodesContent />
    </Suspense>
  );
}

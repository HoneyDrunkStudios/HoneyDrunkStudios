'use client';

/**
 * /grid — Full Grid view with filters
 */

import { useState, useEffect, Suspense, useMemo, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAllSectors as getNodesAllSectors, getAllSignals as getNodesAllSignals } from '@/lib/nodes';
import { getAllSectors, getAllSignals, getGridData, type VisualNode, type VisualService, type VisualModule } from '@/lib/entities';
import type { Sector, Signal } from '@/lib/types';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import TheGrid from '@/components/TheGrid';
import FlowLanes from '@/components/FlowLanes';
import FilterChips, { getSignalColor } from '@/components/FilterChips';
import { getSectorColor } from '@/lib/sectors';
import SignalLegend from '@/components/SignalLegend';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';
import { colors } from '@/lib/tokens';
import { useIsMobile } from '@/lib/hooks/useIsMobile';

function GridContent() {
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntityId, setSelectedEntityId] = useState<string | undefined>();
  const [showFilters, setShowFilters] = useState(true);
  const [flowMode, setFlowMode] = useState(false);
  const lastUrlRef = useRef<string>('');
  const filterStateBeforeFlowMode = useRef<boolean>(true);

  // Save filter state and hide when entering Flow Mode, restore when exiting
  useEffect(() => {
    if (flowMode) {
      // Entering Flow Mode - save current state and hide
      filterStateBeforeFlowMode.current = showFilters;
      setShowFilters(false);
    } else {
      // Exiting Flow Mode - restore previous state
      setShowFilters(filterStateBeforeFlowMode.current);
    }
  }, [flowMode]);

  // Initialize from URL params
  useEffect(() => {
    const sectorsParam = searchParams.get('sectors');
    const signalsParam = searchParams.get('signals');
    const searchParam = searchParams.get('search');
    const nodeParam = searchParams.get('node');
    const serviceParam = searchParams.get('service');
    const flowModeParam = searchParams.get('flowMode');

    if (sectorsParam) {
      setSelectedSectors(sectorsParam.split(','));
    }
    if (signalsParam) {
      setSelectedSignals(signalsParam.split(','));
    }
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    if (nodeParam) {
      setSelectedEntityId(nodeParam);
    }
    if (serviceParam) {
      setSelectedEntityId(serviceParam);
    }
    if (flowModeParam === 'true') {
      setFlowMode(true);
    }
  }, [searchParams]);

  // Update URL when filters change - but only if actually changed
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
    
    // Only update if URL actually changed
    if (newUrl !== lastUrlRef.current) {
      lastUrlRef.current = newUrl;
      router.replace(newUrl, { scroll: false });
    }
  }, [selectedSectors, selectedSignals, searchQuery, router]);

  const allSectors = getAllSectors();
  const allSignals = getAllSignals();

  // Create signal color map
  const signalColorMap = useMemo(() => {
    const map: Record<string, string> = {};
    allSignals.forEach(signal => {
      map[signal] = getSignalColor(signal as any);
    });
    return map;
  }, [allSignals]);

  // Get all grid data - memoized
  const fullGridData = useMemo(() => getGridData(), []);

  // Apply filters to grid data - memoized
  const filteredGridData = useMemo(() => {
    const filteredNodes = fullGridData.nodes.filter(node => {
      const matchesSector = selectedSectors.length === 0 || selectedSectors.includes(node.sector);
      const matchesSignal = selectedSignals.length === 0 || selectedSignals.includes(node.signal);
      const matchesSearch = !searchQuery ||
        node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.short?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSector && matchesSignal && matchesSearch;
    });

    const filteredModules = fullGridData.modules.filter(module => {
      // Show module if its parent node is visible
      const parentVisible = filteredNodes.some(node => node.id === module.parent);
      return parentVisible;
    });

    const filteredServices = fullGridData.services.filter(service => {
      const matchesSignal = selectedSignals.length === 0 || selectedSignals.includes(service.signal);
      const matchesSearch = !searchQuery ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSignal && matchesSearch;
    });

    const filteredEdges = fullGridData.edges.filter(edge => {
      // Show edge if both endpoints are visible
      const fromVisible =
        filteredNodes.some(n => n.id === edge.from) ||
        filteredServices.some(s => s.id === edge.from);
      const toVisible =
        filteredNodes.some(n => n.id === edge.to) ||
        filteredModules.some(m => m.id === edge.to);
      return fromVisible && toVisible;
    });

    return {
      nodes: filteredNodes,
      modules: filteredModules,
      services: filteredServices,
      edges: filteredEdges,
    };
  }, [fullGridData, selectedSectors, selectedSignals, searchQuery]);

  // Hide grid on mobile
  if (isMobile) {
    return (
      <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <NeonGridCanvas particleCount={100} enableMotion={true} />
        <Header />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div
            className="p-8 rounded-lg border-2 backdrop-blur-sm text-center max-w-md"
            style={{
              backgroundColor: `${colors.deepSpace}95`,
              borderColor: colors.neonPink,
              boxShadow: `0 0 30px ${colors.neonPink}30`,
            }}
          >
            <div
              className="text-2xl font-mono font-bold mb-4"
              style={{
                color: colors.neonPink,
                textShadow: `0 0 20px ${colors.neonPink}80`,
              }}
            >
              GRID UNAVAILABLE
            </div>
            <p
              className="text-sm font-mono"
              style={{ color: colors.slateLight, marginBottom: '32px' }}
            >
              The Grid view is only available on desktop devices for optimal visualization.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 rounded-lg border-2 font-mono font-bold transition-all"
              style={{
                color: colors.electricBlue,
                borderColor: colors.electricBlue,
                backgroundColor: `${colors.electricBlue}10`,
              }}
            >
              Return Home
            </Link>
          </div>
        </div>
        <LandingFooter />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <NeonGridCanvas particleCount={200} enableMotion={true} />

      {/* Header */}
      <Header />

      {/* Search and Filter Bar */}
      <div className="absolute top-20 left-0 right-0 z-40 px-8 py-4 flex items-center justify-end gap-4">
        {/* Search - hidden in Flow Mode */}
        {!flowMode && (
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
        )}

        {/* Filter toggle - hidden in Flow Mode */}
        {!flowMode && (
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
            {showFilters ? '✓ ' : ''}Filters ({filteredGridData.nodes.length}N / {filteredGridData.services.length}S)
          </button>
        )}

        {/* Flow Mode toggle */}
        <button
          onClick={() => setFlowMode(!flowMode)}
          className="px-6 py-4 rounded-lg text-sm font-mono cursor-pointer
                   transition-all duration-200 hover:scale-105 whitespace-nowrap"
          style={{
            backgroundColor: flowMode
              ? `${colors.aurumGold}30`
              : `${colors.gunmetal}80`,
            borderWidth: '1px',
            borderColor: flowMode
              ? colors.aurumGold
              : `${colors.slateLight}40`,
            color: flowMode ? colors.aurumGold : colors.slateLight,
          }}
        >
          {flowMode ? '✓ ' : ''}Flow Mode
        </button>
      </div>

      {/* Filters sidebar */}
      {showFilters && (
        <aside
          className="absolute left-6 z-30 w-56
                     p-4 rounded-lg backdrop-blur-sm border space-y-4"
          style={{
            top: '7rem',
            backgroundColor: `${colors.deepSpace}90`,
            borderColor: `${colors.slateLight}30`,
          }}
        >
          <FilterChips
            label="Sector"
            options={allSectors as any[]}
            selected={selectedSectors as any[]}
            onChange={setSelectedSectors as any}
            getColor={getSectorColor as any}
          />

          <FilterChips
            label="Signal"
            options={allSignals as any[]}
            selected={selectedSignals as any[]}
            onChange={setSelectedSignals as any}
            getColor={getSignalColor as any}
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

          {/* Stats */}
          <div
            className="pt-3 border-t space-y-1.5"
            style={{ borderColor: `${colors.slateLight}20` }}
          >
            <div
              className="text-xs font-mono uppercase tracking-wider mb-2"
              style={{ color: colors.slateLight }}
            >
              Grid Stats
            </div>
            <div className="text-xs font-mono space-y-0.5" style={{ color: colors.offWhite }}>
              <div>Nodes: {filteredGridData.nodes.length}</div>
              <div>Modules: {filteredGridData.modules.length}</div>
              <div>Services: {filteredGridData.services.length}</div>
              <div>Edges: {filteredGridData.edges.length}</div>
            </div>
          </div>

          {/* Shape Legend */}
          <div
            className="pt-3 border-t space-y-2"
            style={{ borderColor: `${colors.slateLight}20` }}
          >
            <div
              className="text-xs font-mono uppercase tracking-wider"
              style={{ color: colors.slateLight }}
            >
              Shape Guide
            </div>
            <div className="space-y-1.5">
              {/* Hexagon = Node */}
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <polygon
                    points="12,2 20,7 20,17 12,22 4,17 4,7"
                    fill={`${colors.violetFlux}30`}
                    stroke={colors.violetFlux}
                    strokeWidth="1.5"
                  />
                </svg>
                <span className="text-xs font-mono" style={{ color: colors.offWhite }}>
                  Hexagon = Node
                </span>
              </div>
              {/* Pill = Module */}
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <rect
                    x="4"
                    y="9"
                    width="16"
                    height="6"
                    rx="3"
                    fill={`${colors.aurumGold}50`}
                    stroke={colors.aurumGold}
                    strokeWidth="1.5"
                  />
                </svg>
                <span className="text-xs font-mono" style={{ color: colors.offWhite }}>
                  Pill = Module
                </span>
              </div>
              {/* Rectangle = Service */}
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <rect
                    x="5"
                    y="8"
                    width="14"
                    height="8"
                    rx="2"
                    fill={`${colors.electricBlue}30`}
                    stroke={colors.electricBlue}
                    strokeWidth="1.5"
                  />
                </svg>
                <span className="text-xs font-mono" style={{ color: colors.offWhite }}>
                  Rectangle = Service
                </span>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Main Grid / Flow View */}
      <div className="relative z-20 w-full h-full pt-20">
        {flowMode ? (
          <>
            {/* Flow Mode Header */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 z-40 px-6 py-3 rounded-lg backdrop-blur-sm border"
              style={{
                top: '6.5rem',
                backgroundColor: `${colors.deepSpace}90`,
                borderColor: `${colors.aurumGold}40`,
                maxWidth: '800px',
              }}
            >
              <div className="text-center">
                <div className="text-sm font-mono font-bold mb-1" style={{ color: colors.aurumGold }}>
                  Flow Index View
                </div>
                <div className="text-xs font-mono" style={{ color: colors.slateLight }}>
                  Organized by Flow = (Energy × 0.4) + (Priority × 0.6). Higher flow needs attention next.
                </div>
              </div>
            </div>
            <FlowLanes
              nodes={filteredGridData.nodes}
              onNodeClick={(node: VisualNode) => {
                router.push(`/nodes/${node.id}`);
              }}
            />
          </>
        ) : (
          <TheGrid
            gridData={filteredGridData}
            selectedEntityId={selectedEntityId}
            onNodeClick={(node: VisualNode) => {
              router.push(`/nodes/${node.id}`);
            }}
            onServiceClick={(service: VisualService) => {
              router.push(`/services/${service.id}`);
            }}
            onModuleClick={(module: VisualModule) => {
              router.push(`/nodes/${module.parent}#module-${module.id}`);
            }}
          />
        )}
      </div>

      {/* Signal Legend - hidden in Flow Mode */}
      {!flowMode && (
        <div className="absolute right-6 z-30" style={{ top: '15rem' }}>
          <SignalLegend signalColors={signalColorMap} />
        </div>
      )}

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

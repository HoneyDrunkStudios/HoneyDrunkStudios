/**
 * API Route: /api/nodes
 * Returns all nodes or filtered nodes based on query parameters
 *
 * Query parameters:
 * - sector: Filter by sector (Core, Ops, Creator, Life, Play, Mech, Meta)
 * - signal: Filter by signal status (Seed, Awake, Wiring, Live, Echo, Archive)
 * - cluster: Filter by cluster
 * - search: Search in name, short, description, tags
 *
 * Example: /api/nodes?sector=Core&signal=Live
 */

import { NextRequest, NextResponse } from 'next/server';
import nodesData from '@/data/schema/nodes.json';
import type { Node } from '@/lib/types';

const nodes = nodesData as Node[];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const sectorFilter = searchParams.get('sector');
    const signalFilter = searchParams.get('signal');
    const clusterFilter = searchParams.get('cluster');
    const searchQuery = searchParams.get('search')?.toLowerCase();

    let filteredNodes = [...nodes];

    // Filter by sector
    if (sectorFilter) {
      filteredNodes = filteredNodes.filter(
        node => node.sector.toLowerCase() === sectorFilter.toLowerCase()
      );
    }

    // Filter by signal
    if (signalFilter) {
      filteredNodes = filteredNodes.filter(
        node => node.signal.toLowerCase() === signalFilter.toLowerCase()
      );
    }

    // Filter by cluster
    if (clusterFilter) {
      filteredNodes = filteredNodes.filter(
        node => node.cluster?.toLowerCase() === clusterFilter.toLowerCase()
      );
    }

    // Search across name, short, description, and tags
    if (searchQuery) {
      filteredNodes = filteredNodes.filter(node => {
        const searchableText = [
          node.name,
          node.short,
          node.description,
          ...(node.tags || []),
        ].join(' ').toLowerCase();

        return searchableText.includes(searchQuery);
      });
    }

    // Sort by priority (highest first)
    filteredNodes.sort((a, b) => (b.priority || 0) - (a.priority || 0));

    return NextResponse.json({
      success: true,
      count: filteredNodes.length,
      total: nodes.length,
      nodes: filteredNodes,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch nodes',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

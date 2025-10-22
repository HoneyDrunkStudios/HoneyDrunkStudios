/**
 * API Route: /api/nodes/stats
 * Returns statistics and overview of all nodes
 *
 * Example: /api/nodes/stats
 */

import { NextResponse } from 'next/server';
import nodesData from '@/data/nodes.json';
import type { Node, Signal, Sector } from '@/lib/types';

const nodes = nodesData as Node[];

export async function GET() {
  try {
    // Count by signal status
    const signalCounts: Record<Signal, number> = {
      Seed: 0,
      Awake: 0,
      Wiring: 0,
      Live: 0,
      Echo: 0,
      Archive: 0,
    };

    // Count by sector
    const sectorCounts: Record<Sector, number> = {
      Core: 0,
      Ops: 0,
      Creator: 0,
      Life: 0,
      Play: 0,
      Meta: 0,
    };

    // Count by cluster
    const clusterCounts: Record<string, number> = {};

    // Calculate stats
    nodes.forEach(node => {
      // Signal counts
      signalCounts[node.signal]++;

      // Sector counts
      sectorCounts[node.sector]++;

      // Cluster counts
      if (node.cluster) {
        clusterCounts[node.cluster] = (clusterCounts[node.cluster] || 0) + 1;
      }
    });

    // Get high priority nodes (priority >= 90)
    const highPriorityNodes = nodes
      .filter(node => (node.priority || 0) >= 90)
      .sort((a, b) => (b.priority || 0) - (a.priority || 0))
      .map(node => ({
        id: node.id,
        name: node.name,
        signal: node.signal,
        sector: node.sector,
        priority: node.priority,
      }));

    // Get recently active nodes (Wiring or Live status)
    const activeNodes = nodes
      .filter(node => node.signal === 'Wiring' || node.signal === 'Live')
      .map(node => ({
        id: node.id,
        name: node.name,
        signal: node.signal,
        sector: node.sector,
        energy: node.energy,
      }));

    return NextResponse.json({
      success: true,
      total: nodes.length,
      bySignal: signalCounts,
      bySector: sectorCounts,
      byCluster: clusterCounts,
      highPriority: highPriorityNodes,
      active: activeNodes,
      generated: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch stats',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

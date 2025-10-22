/**
 * API Route: /api/nodes/[id]
 * Returns a single node by ID with its connected nodes
 *
 * Example: /api/nodes/honeydrunk-kernel
 */

import { NextRequest, NextResponse } from 'next/server';
import nodesData from '@/data/nodes.json';
import type { Node } from '@/lib/types';

const nodes = nodesData as Node[];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Find the requested node
    const node = nodes.find(n => n.id === id);

    if (!node) {
      return NextResponse.json(
        {
          success: false,
          error: 'Node not found',
          message: `No node found with ID: ${id}`,
        },
        { status: 404 }
      );
    }

    // Get connected nodes
    const connectedNodes = node.connections
      ? nodes.filter(n => node.connections?.includes(n.id))
      : [];

    return NextResponse.json({
      success: true,
      node,
      connected: connectedNodes,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch node',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

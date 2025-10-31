#!/usr/bin/env node
/**
 * Find circular dependencies in the node graph
 */

const fs = require('fs');
const path = require('path');

const NODES_PATH = path.join(__dirname, '..', 'data', 'schema', 'nodes.json');
const nodes = JSON.parse(fs.readFileSync(NODES_PATH, 'utf8'));

console.log('🔍 Searching for circular dependencies...\n');

const nodeMap = new Map(nodes.map(n => [n.id, n]));
const cycles = [];

function findCyclesFrom(startId, visited = new Set(), path = []) {
  if (visited.has(startId)) {
    // Found a cycle
    const cycleStart = path.indexOf(startId);
    if (cycleStart !== -1) {
      const cycle = path.slice(cycleStart).concat([startId]);
      return [cycle];
    }
    return [];
  }

  const node = nodeMap.get(startId);
  if (!node || !node.depends_on) return [];

  visited.add(startId);
  path.push(startId);

  const foundCycles = [];
  for (const depId of node.depends_on) {
    if (path.includes(depId)) {
      // Found a cycle
      const cycleStart = path.indexOf(depId);
      const cycle = path.slice(cycleStart).concat([depId]);
      foundCycles.push(cycle);
    } else if (nodeMap.has(depId)) {
      const subCycles = findCyclesFrom(depId, new Set(visited), [...path]);
      foundCycles.push(...subCycles);
    }
  }

  return foundCycles;
}

// Find all cycles
const allCycles = new Set();
nodes.forEach(node => {
  const nodeCycles = findCyclesFrom(node.id);
  nodeCycles.forEach(cycle => {
    const cycleStr = cycle.sort().join(' -> ');
    allCycles.add(cycleStr);
  });
});

if (allCycles.size === 0) {
  console.log('✅ No circular dependencies found!');
} else {
  console.log(`❌ Found ${allCycles.size} circular dependencies:\n`);

  Array.from(allCycles).forEach((cycleStr, i) => {
    const cycle = cycleStr.split(' -> ');
    console.log(`${i + 1}. ${cycle.join(' → ')}`);

    // Show priorities for nodes in cycle
    console.log('   Priorities:');
    cycle.forEach(id => {
      if (id !== cycle[cycle.length - 1]) { // Skip the duplicate at the end
        const node = nodeMap.get(id);
        if (node) {
          console.log(`     ${id}: ${node.priority}`);
        }
      }
    });
    console.log('');
  });

  console.log('\n💡 Recommendation: Remove circular dependencies from nodes.json');
  console.log('   Circular dependencies prevent proper ancestor override convergence.');
}

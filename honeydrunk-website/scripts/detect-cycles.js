/**
 * Detect circular dependencies in nodes.json
 */

const fs = require('fs');
const path = require('path');

const nodesPath = path.join(__dirname, '../data/schema/nodes.json');
const nodes = JSON.parse(fs.readFileSync(nodesPath, 'utf8'));

// Build adjacency list
const graph = new Map();
nodes.forEach(node => {
  graph.set(node.id, node.depends_on || []);
});

// Detect cycles using DFS
function findCycles() {
  const cycles = [];
  const visiting = new Set();
  const visited = new Set();
  
  function dfs(nodeId, path = []) {
    if (visiting.has(nodeId)) {
      // Found a cycle
      const cycleStart = path.indexOf(nodeId);
      const cycle = [...path.slice(cycleStart), nodeId];
      cycles.push(cycle);
      return;
    }
    
    if (visited.has(nodeId)) {
      return;
    }
    
    visiting.add(nodeId);
    path.push(nodeId);
    
    const deps = graph.get(nodeId) || [];
    for (const dep of deps) {
      if (graph.has(dep)) {
        dfs(dep, [...path]);
      }
    }
    
    visiting.delete(nodeId);
    visited.add(nodeId);
  }
  
  // Try starting from each node
  for (const nodeId of graph.keys()) {
    if (!visited.has(nodeId)) {
      dfs(nodeId);
    }
  }
  
  return cycles;
}

// Find all cycles
const cycles = findCycles();

if (cycles.length === 0) {
  console.log('✅ No circular dependencies found!');
} else {
  console.log(`❌ Found ${cycles.length} circular dependencies:\n`);
  
  // Deduplicate cycles (same cycle different starting points)
  const uniqueCycles = new Map();
  cycles.forEach(cycle => {
    const normalized = [...cycle].sort().join(' → ');
    if (!uniqueCycles.has(normalized)) {
      uniqueCycles.set(normalized, cycle);
    }
  });
  
  uniqueCycles.forEach((cycle, idx) => {
    console.log(`Cycle ${idx + 1}:`);
    cycle.forEach((nodeId, i) => {
      const node = nodes.find(n => n.id === nodeId);
      const name = node ? node.name : nodeId;
      const arrow = i < cycle.length - 1 ? ' → ' : '';
      console.log(`  ${name}${arrow}`);
    });
    console.log('');
  });
  
  // Show nodes involved in cycles
  const nodesInCycles = new Set();
  cycles.forEach(cycle => cycle.forEach(id => nodesInCycles.add(id)));
  
  console.log(`\nNodes involved in circular dependencies:`);
  nodesInCycles.forEach(id => {
    const node = nodes.find(n => n.id === id);
    if (node) {
      console.log(`  - ${node.name} (${id})`);
      console.log(`    depends_on: [${(node.depends_on || []).join(', ')}]`);
    }
  });
}

#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const NODES_PATH = path.join(__dirname, '..', 'data', 'schema', 'nodes.json');
const nodes = JSON.parse(fs.readFileSync(NODES_PATH, 'utf8'));

const selfLoops = [];
const twoNodeCycles = [];

nodes.forEach(node => {
  if (node.depends_on) {
    // Check for self-loops
    if (node.depends_on.includes(node.id)) {
      selfLoops.push(node.id);
    }

    // Check for two-node cycles
    node.depends_on.forEach(depId => {
      const dep = nodes.find(n => n.id === depId);
      if (dep && dep.depends_on && dep.depends_on.includes(node.id)) {
        const pair = [node.id, depId].sort().join(' <-> ');
        if (!twoNodeCycles.includes(pair)) {
          twoNodeCycles.push(pair);
        }
      }
    });
  }
});

console.log('🔍 Direct Circular Dependencies\n');
console.log(`Self-loops (node depends on itself): ${selfLoops.length}`);
selfLoops.forEach(id => console.log(`  - ${id}`));

console.log(`\nTwo-node cycles (A→B and B→A): ${twoNodeCycles.length}`);
twoNodeCycles.forEach(pair => console.log(`  - ${pair}`));

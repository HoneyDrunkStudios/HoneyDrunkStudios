/**
 * Validate dependency layers - prevent architectural violations
 */

const fs = require('fs');
const path = require('path');

const nodesPath = path.join(__dirname, '../data/schema/nodes.json');
const nodes = JSON.parse(fs.readFileSync(nodesPath, 'utf8'));

// Define architectural layers (bottom to top)
const layers = {
  0: {
    name: 'Tooling & Standards',
    nodes: ['honeydrunk-standards', 'honeydrunk-build'],
    canDependOn: []
  },
  1: {
    name: 'Kernel & Primitives',
    nodes: ['honeydrunk-kernel'],
    canDependOn: [0]
  },
  2: {
    name: 'Infrastructure',
    nodes: ['honeydrunk-data', 'honeydrunk-transport', 'honeydrunk-vault'],
    canDependOn: [0, 1]
  },
  3: {
    name: 'Cross-Cutting',
    nodes: ['pulse', 'honeydrunk-auth'],
    canDependOn: [0, 1, 2]
  },
  4: {
    name: 'Application Frameworks',
    nodes: ['honeycore-web-rest', 'honeydrunk-agentkit', 'honeysentinel', 'breachlab-exe'],
    canDependOn: [0, 1, 2, 3]
  },
  5: {
    name: 'Ops Tooling',
    nodes: ['honeydrunk-tools', 'honeydrunk-actions', 'honeydrunk-deploy', 'honeydrunk-pipelines'],
    canDependOn: [0, 1] // Ops tools form separate tree
  },
  6: {
    name: 'Business Logic & Apps',
    nodes: ['invoice', 'ledger', 'pay', 'subs', 'honeyhub', 'honeydrunk-signal', 'forge', 'grid', 'honeymech-sim', 'honeymech-courier', 'honeydrunk-testing'],
    canDependOn: [0, 1, 2, 3, 4]
  }
};

// Build node-to-layer map
const nodeLayer = new Map();
Object.entries(layers).forEach(([layerNum, layer]) => {
  layer.nodes.forEach(nodeId => {
    nodeLayer.set(nodeId, parseInt(layerNum));
  });
});

// Validate each node's dependencies
const violations = [];

nodes.forEach(node => {
  const nodeId = node.id;
  const currentLayer = nodeLayer.get(nodeId);
  
  if (currentLayer === undefined) {
    // Node not assigned to any layer - warning but not error
    console.log(`⚠️  ${node.name} (${nodeId}) not assigned to any layer`);
    return;
  }
  
  const allowedLayers = layers[currentLayer].canDependOn;
  
  (node.depends_on || []).forEach(depId => {
    const depLayer = nodeLayer.get(depId);
    
    if (depLayer === undefined) {
      // Dependency not in layer system - skip
      return;
    }
    
    if (!allowedLayers.includes(depLayer) && depLayer !== currentLayer) {
      const depNode = nodes.find(n => n.id === depId);
      violations.push({
        node: node.name,
        nodeId: nodeId,
        nodeLayer: layers[currentLayer].name,
        dep: depNode ? depNode.name : depId,
        depId: depId,
        depLayer: layers[depLayer].name,
      });
    }
  });
});

if (violations.length === 0) {
  console.log('\n✅ All dependencies respect layer boundaries!\n');
  console.log('Layer Architecture:');
  Object.entries(layers).forEach(([num, layer]) => {
    console.log(`  Layer ${num}: ${layer.name}`);
    console.log(`    Nodes: ${layer.nodes.join(', ')}`);
    console.log(`    Can depend on: Layer ${layer.canDependOn.join(', ')}`);
    console.log('');
  });
} else {
  console.log(`\n❌ Found ${violations.length} layer violations:\n`);
  violations.forEach(v => {
    console.log(`  ${v.node} [${v.nodeLayer}]`);
    console.log(`    → depends on ${v.dep} [${v.depLayer}]`);
    console.log(`    ⚠️  ${v.nodeLayer} cannot depend on ${v.depLayer}\n`);
  });
  process.exit(1);
}

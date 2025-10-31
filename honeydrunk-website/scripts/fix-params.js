const fs = require('fs');
const path = require('path');

const NODES_PATH = path.join(__dirname, '..', 'data', 'schema', 'nodes.json');

console.log('🔧 Updating node parameters...\n');

// Load nodes
const nodes = JSON.parse(fs.readFileSync(NODES_PATH, 'utf8'));

// Define parameter updates
const updates = [
  { id: "honeydrunk-pipelines", time_pressure: 4, strategy_base: 26 },
  { id: "honeydrunk-actions",   time_pressure: 3, strategy_base: 24 },
  { id: "honeydrunk-tools",     time_pressure: 2, strategy_base: 22 },
  { id: "honeydrunk-deploy",    time_pressure: 2, strategy_base: 21 },

  { id: "honeydrunk-kernel",    time_pressure: 3, strategy_base: 27, foundational: true },
  { id: "honeydrunk-transport", time_pressure: 3, strategy_base: 25, foundational: true },
  { id: "honeycore-web-rest",   time_pressure: 2, strategy_base: 24, foundational: true },
  { id: "honeydrunk-data",      time_pressure: 2, strategy_base: 24, foundational: true },

  { id: "pulse",                sector: "Ops",  time_pressure: 2, strategy_base: 22 },
  { id: "honeydrunk-vault",     sector: "Core", time_pressure: 2, strategy_base: 24 }
];

let updatedCount = 0;

// Apply updates
updates.forEach(update => {
  const node = nodes.find(n => n.id === update.id);
  if (node) {
    const changes = [];

    if (update.time_pressure !== undefined && node.time_pressure !== update.time_pressure) {
      node.time_pressure = update.time_pressure;
      changes.push(`time_pressure=${update.time_pressure}`);
    }

    if (update.strategy_base !== undefined && node.strategy_base !== update.strategy_base) {
      node.strategy_base = update.strategy_base;
      changes.push(`strategy_base=${update.strategy_base}`);
    }

    if (update.foundational !== undefined && node.foundational !== update.foundational) {
      node.foundational = update.foundational;
      changes.push(`foundational=${update.foundational}`);
    }

    if (update.sector !== undefined && node.sector !== update.sector) {
      node.sector = update.sector;
      changes.push(`sector=${update.sector}`);
    }

    if (changes.length > 0) {
      console.log(`✓ ${node.name}: ${changes.join(', ')}`);
      updatedCount++;
    } else {
      console.log(`⊘ ${node.name}: no changes needed`);
    }
  } else {
    console.log(`✗ Node ${update.id} not found`);
  }
});

// Write back to nodes.json
fs.writeFileSync(NODES_PATH, JSON.stringify(nodes, null, 2), 'utf8');

console.log(`\n✅ Updated ${updatedCount} nodes`);
console.log('💾 nodes.json updated successfully');

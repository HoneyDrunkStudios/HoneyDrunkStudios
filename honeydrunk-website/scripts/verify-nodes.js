const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/schema/nodes.json', 'utf8'));

const check = [
  'honeydrunk-actions',
  'honeydrunk-pipelines',
  'honeydrunk-tools',
  'honeydrunk-deploy',
  'honeydrunk-kernel',
  'honeydrunk-transport',
  'honeycore-web-rest',
  'honeydrunk-data',
  'honeydrunk-vault',
  'pulse'
];

console.log('Node Status After Flow Computation:');
console.log('='.repeat(60));

check.forEach(id => {
  const n = data.find(node => node.id === id);
  if(n) {
    console.log(`${n.name}:`);
    console.log(`  Sector: ${n.sector}, Tier: ${n.tier}, Stage: ${n.signal}`);
    console.log(`  Energy: ${n.energy}, Priority: ${n.priority}, Flow: ${n.flow}`);
    console.log(`  Flags: foundational=${n.foundational}, ops_bootstrap=${n.ops_bootstrap || false}`);
    console.log('');
  }
});

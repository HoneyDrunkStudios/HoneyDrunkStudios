const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/schema/nodes.json', 'utf8'));

const missing = data.filter(n => !n.description || n.description.trim() === '');

console.log(`Nodes missing descriptions (${missing.length}):`);
if (missing.length > 0) {
  missing.forEach(n => {
    console.log(`  - ${n.name} (id: ${n.id})`);
  });
} else {
  console.log('  ✓ All nodes have descriptions!');
}

console.log(`\nTotal nodes: ${data.length}`);
console.log(`Nodes with descriptions: ${data.length - missing.length}`);

const fs = require('fs');
const nodes = JSON.parse(fs.readFileSync('./data/schema/nodes.json', 'utf8'));

console.log('Tag Audit Report\n' + '='.repeat(60) + '\n');

// Check for missing tags
const noTags = nodes.filter(n => !n.tags || n.tags.length === 0);
console.log(`Nodes missing tags: ${noTags.length}`);
if (noTags.length > 0) {
  noTags.forEach(n => console.log(`  - ${n.name} (${n.sector})`));
  console.log('');
}

// Check for nodes with very few tags (might need enrichment)
const fewTags = nodes.filter(n => n.tags && n.tags.length === 1);
console.log(`\nNodes with only 1 tag: ${fewTags.length}`);
if (fewTags.length > 0) {
  fewTags.forEach(n => console.log(`  - ${n.name}: [${n.tags.join(', ')}]`));
  console.log('');
}

// Sector consistency check
console.log('\nTag-Sector alignment check:');
const sectorMismatches = [];
nodes.forEach(n => {
  if (n.tags) {
    const sectorTag = n.tags.find(t => ['Core', 'Ops', 'Meta', 'AI', 'Creator', 'Market', 'Life', 'HoneyPlay', 'Cyberware', 'HoneyNet'].includes(t));
    if (sectorTag && sectorTag !== n.sector) {
      sectorMismatches.push({name: n.name, sector: n.sector, tagSector: sectorTag});
    }
  }
});

if (sectorMismatches.length > 0) {
  console.log(`  Found ${sectorMismatches.length} mismatches:`);
  sectorMismatches.forEach(m => console.log(`    ${m.name}: sector="${m.sector}" but has tag="${m.tagSector}"`));
} else {
  console.log('  ✓ No sector-tag conflicts detected');
}

// Show tag distribution
console.log('\nTag usage statistics:');
const tagFreq = {};
nodes.forEach(n => {
  if (n.tags) {
    n.tags.forEach(tag => {
      tagFreq[tag] = (tagFreq[tag] || 0) + 1;
    });
  }
});
const sortedTags = Object.entries(tagFreq).sort((a, b) => b[1] - a[1]);
console.log('  Top 15 tags:');
sortedTags.slice(0, 15).forEach(([tag, count]) => {
  console.log(`    ${tag.padEnd(20)} (${count} nodes)`);
});

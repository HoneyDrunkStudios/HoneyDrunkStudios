const fs = require('fs');
const nodes = JSON.parse(fs.readFileSync('./data/schema/nodes.json', 'utf8'));

console.log('Comprehensive Tag Review:\n' + '='.repeat(60) + '\n');

// Check all nodes for potential improvements
const suggestions = [];

nodes.forEach(n => {
  const desc = (n.description || '').toLowerCase();
  const missingKeywords = [];

  // Check for common important keywords in description that aren't tagged
  const keywords = {
    'ai': /\b(ai|agent|llm|neural)\b/,
    'sdk': /\bsdk\b/,
    'api': /\bapi\b/,
    'database': /\b(database|db|postgres|sql)\b/,
    'security': /\b(security|secure|auth|vault)\b/,
    'testing': /\b(test|testing|qa)\b/,
    'monitoring': /\b(monitor|observability|telemetry)\b/,
    'deployment': /\b(deploy|deployment|release)\b/
  };

  Object.entries(keywords).forEach(([tag, regex]) => {
    if (regex.test(desc) && !n.tags.some(t => t.toLowerCase().includes(tag))) {
      missingKeywords.push(tag);
    }
  });

  if (missingKeywords.length > 0) {
    suggestions.push({
      name: n.name,
      sector: n.sector,
      currentTags: n.tags,
      suggestedAdd: missingKeywords,
      desc: n.description.substring(0, 80) + '...'
    });
  }
});

if (suggestions.length > 0) {
  console.log(`Nodes with potential tag additions (${suggestions.length}):\n`);
  suggestions.slice(0, 10).forEach(s => {
    console.log(s.name + ':');
    console.log('  Current: [' + s.currentTags.join(', ') + ']');
    console.log('  Consider adding: [' + s.suggestedAdd.join(', ') + ']');
    console.log('  Desc: ' + s.desc);
    console.log('');
  });

  if (suggestions.length > 10) {
    console.log(`... and ${suggestions.length - 10} more\n`);
  }
} else {
  console.log('✓ All node tags appear well-aligned with descriptions!');
}

console.log('\nOverall Tag Health:');
console.log('  Total nodes: ' + nodes.length);
console.log('  Nodes with tags: ' + nodes.filter(n => n.tags && n.tags.length > 0).length);
console.log('  Nodes potentially needing tag enrichment: ' + suggestions.length);

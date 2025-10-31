const fs = require('fs');
const nodes = JSON.parse(fs.readFileSync('./data/schema/nodes.json', 'utf8'));

console.log('=== Finding Nodes Missing Description Key ===\n');

let missingDescriptionKey = [];
let missingLongDescriptionKey = [];

nodes.forEach((node, index) => {
  // Check if 'description' key exists at all
  if (!node.hasOwnProperty('description')) {
    missingDescriptionKey.push({
      id: node.id,
      name: node.name,
      index: index
    });
  }
  
  // Check if 'long_description' key exists at all
  if (!node.hasOwnProperty('long_description')) {
    missingLongDescriptionKey.push({
      id: node.id,
      name: node.name,
      index: index
    });
  }
});

console.log(`=== Nodes Missing "description" Key (${missingDescriptionKey.length}) ===`);
if (missingDescriptionKey.length > 0) {
  missingDescriptionKey.forEach(node => {
    console.log(`❌ ${node.id} (${node.name}) - index ${node.index}`);
  });
} else {
  console.log('✅ All nodes have the "description" key');
}

console.log(`\n=== Nodes Missing "long_description" Key (${missingLongDescriptionKey.length}) ===`);
if (missingLongDescriptionKey.length > 0) {
  missingLongDescriptionKey.forEach(node => {
    console.log(`❌ ${node.id} (${node.name}) - index ${node.index}`);
  });
} else {
  console.log('✅ All nodes have the "long_description" key');
}

// Also check for empty description values
console.log(`\n=== Nodes with Empty Description Values ===`);
let emptyDescriptions = nodes.filter(node => 
  node.hasOwnProperty('description') && 
  (node.description === '' || node.description === null || node.description === undefined)
);

if (emptyDescriptions.length > 0) {
  emptyDescriptions.forEach(node => {
    console.log(`❌ ${node.id} (${node.name}) - has key but empty value`);
  });
} else {
  console.log('✅ All nodes with description key have non-empty values');
}
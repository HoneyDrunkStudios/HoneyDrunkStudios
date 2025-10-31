const fs = require('fs');
const path = require('path');

const NODES_PATH = path.join(__dirname, '..', 'data', 'schema', 'nodes.json');

console.log('📝 Adding descriptions to nodes...\n');

// Load nodes
const nodes = JSON.parse(fs.readFileSync(NODES_PATH, 'utf8'));

// Define descriptions based on long_description overviews
const descriptions = {
  'meta-devportal': 'Public developer portal for HoneyDrunk.OS. Documentation, SDK guides, changelogs, and onboarding for developers building on the Grid.',
  'meta-packagepublisher': 'Automated release orchestrator for SDKs and shared libraries. Handles versioning, changelogs, signing, and multi-feed publication (NuGet, NPM).',
  'meta-atlassync': 'Neural synchronization layer connecting manifests, documentation, and agent memory. Keeps the Hive\'s collective knowledge coherent.',
  'marketcore': 'Shared economic and payout logic for all Market-sector nodes. Pricing, royalties, XP monetization, and marketplace rules.',
  'honeydrunk-console': 'Studio control plane for the Hive. Operational cockpit where infrastructure nodes, deployments, and audit trails converge.',
  'audit-agent': 'Agentic governance node that logs, reviews, and enforces transparency across all automated and human actions within the Hive.'
};

let addedCount = 0;

// Add descriptions
Object.keys(descriptions).forEach(nodeId => {
  const node = nodes.find(n => n.id === nodeId);
  if (node) {
    if (!node.description || node.description.trim() === '') {
      node.description = descriptions[nodeId];
      console.log(`✓ Added description to ${node.name}`);
      addedCount++;
    } else {
      console.log(`⊘ ${node.name} already has a description`);
    }
  } else {
    console.log(`✗ Node ${nodeId} not found`);
  }
});

// Write back to nodes.json
fs.writeFileSync(NODES_PATH, JSON.stringify(nodes, null, 2), 'utf8');

console.log(`\n✅ Added ${addedCount} descriptions`);
console.log('💾 nodes.json updated successfully');

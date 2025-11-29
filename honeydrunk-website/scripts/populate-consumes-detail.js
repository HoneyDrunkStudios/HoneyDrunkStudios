/**
 * populate-consumes-detail.js
 * Populates consumes_detail for each node based on what contracts/packages 
 * are exposed by its dependencies.
 * 
 * This is a semi-automatic pass - we populate based on exposes, 
 * but you can refine manually after.
 */

const fs = require('fs');
const path = require('path');

const relPath = path.join(__dirname, '../data/schema/relationships.json');
const rel = JSON.parse(fs.readFileSync(relPath, 'utf8'));

// Build a map of nodeId -> exposes for quick lookup
const exposesMap = new Map();
for (const node of rel.nodes) {
  exposesMap.set(node.id, node.exposes);
}

// Define specific contract/package consumption based on edge reasons
// This is more granular than just "all exposes"
const consumptionPatterns = {
  // Kernel consumers - based on actual v0.3.x contracts
  // Only Transport is currently implemented, others are planned
  'honeydrunk-kernel': {
    // IMPLEMENTED dependent
    'honeydrunk-transport': ['IGridContext', 'IOperationContext', 'ITelemetryActivityFactory', 'HoneyDrunk.Kernel']
  },
  
  // Transport consumers
  'honeydrunk-transport': {
    'honeycore-web-rest': ['ITransportEnvelope', 'HoneyDrunk.Transport'],
    'honeydrunk-agentkit': ['ITransportEnvelope', 'IOutboxStore', 'HoneyDrunk.Transport'],
    'honeydrunk-assets': ['ITransportEnvelope', 'HoneyDrunk.Transport'],
    'honeydrunk-clientportalos': ['ITransportEnvelope', 'HoneyDrunk.Transport'],
    'honeydrunk-collector': ['ITransportEnvelope', 'HoneyDrunk.Transport'],
    'honeydrunk-comms': ['ITransportEnvelope', 'HoneyDrunk.Transport'],
    'operator': ['ITransportEnvelope', 'IOutboxStore', 'HoneyDrunk.Transport'],
    'pulse': ['ITransportEnvelope', 'HoneyDrunk.Transport'],
    'hivexp': ['ITransportEnvelope', 'HoneyDrunk.Transport'],
    'hivegigs': ['ITransportEnvelope', 'HoneyDrunk.Transport'],
    'honeydrunk-console': ['ITransportEnvelope', 'HoneyDrunk.Transport']
  },
  
  // Vault consumers
  'honeydrunk-vault': {
    'arcadia': ['ISecretStore', 'IConfigProvider', 'HoneyDrunk.Vault'],
    'breachlab-exe': ['ISecretStore', 'HoneyDrunk.Vault'],
    'dreammarket': ['ISecretStore', 'IConfigProvider', 'HoneyDrunk.Vault'],
    'honeydrunk-agentkit': ['ISecretStore', 'HoneyDrunk.Vault'],
    'honeydrunk-assets': ['ISecretStore', 'HoneyDrunk.Vault'],
    'honeydrunk-auth': ['ISecretStore', 'HoneyDrunk.Vault'],
    'honeydrunk-clarity': ['ISecretStore', 'IConfigProvider', 'HoneyDrunk.Vault'],
    'honeydrunk-clientportalos': ['ISecretStore', 'IConfigProvider', 'HoneyDrunk.Vault'],
    'honeydrunk-collector': ['ISecretStore', 'HoneyDrunk.Vault'],
    'honeydrunk-comms': ['ISecretStore', 'HoneyDrunk.Vault'],
    'honeydrunk-signal': ['ISecretStore', 'IConfigProvider', 'HoneyDrunk.Vault'],
    'honeysentinel': ['ISecretStore', 'HoneyDrunk.Vault'],
    'memorybank': ['ISecretStore', 'IConfigProvider', 'HoneyDrunk.Vault'],
    'operator': ['ISecretStore', 'IConfigProvider', 'HoneyDrunk.Vault'],
    'pulse': ['ISecretStore', 'IConfigProvider', 'HoneyDrunk.Vault'],
    'review': ['ISecretStore', 'HoneyDrunk.Vault'],
    'hivexp': ['ISecretStore', 'IConfigProvider', 'HoneyDrunk.Vault'],
    'hivegigs': ['ISecretStore', 'IConfigProvider', 'HoneyDrunk.Vault'],
    'honeydrunk-governor': ['ISecretStore', 'IConfigProvider', 'HoneyDrunk.Vault'],
    'honeydrunk-console': ['ISecretStore', 'IConfigProvider', 'HoneyDrunk.Vault'],
    'draft': ['ISecretStore', 'IConfigProvider', 'HoneyDrunk.Vault'],
    'game-prototype': ['ISecretStore', 'IConfigProvider', 'HoneyDrunk.Vault'],
    'tether': ['ISecretStore', 'IConfigProvider', 'HoneyDrunk.Vault'],
    'invoice': ['ISecretStore', 'HoneyDrunk.Vault'],
    'marketcore': ['ISecretStore', 'IConfigProvider', 'HoneyDrunk.Vault']
  },
  
  // Auth consumers
  'honeydrunk-auth': {
    'honeycore-web-rest': ['IAuthenticationProvider', 'IAuthorizationPolicy'],
    'hivegigs': ['IAuthenticationProvider', 'IAuthorizationPolicy'],
    'hivexp': ['IAuthenticationProvider', 'IAuthorizationPolicy']
  },
  
  // AgentKit consumers
  'honeydrunk-agentkit': {
    'honeydrunk-clarity': ['IAgent', 'IAgentContext'],
    'honeydrunk-governor': ['IAgent', 'IAgentContext'],
    'honeydrunk-signal': ['IAgent', 'IAgentContext']
  }
};

// Populate consumes_detail for each node
let updates = 0;
for (const node of rel.nodes) {
  const detail = {};
  
  for (const dep of node.consumes) {
    // Check if we have specific patterns defined
    const patterns = consumptionPatterns[dep];
    if (patterns && patterns[node.id]) {
      detail[dep] = patterns[node.id];
      updates++;
    } else {
      // Fall back to all exposes if the dependency has any
      const exposes = exposesMap.get(dep);
      if (exposes) {
        const allItems = [...(exposes.contracts || []), ...(exposes.packages || [])];
        if (allItems.length > 0) {
          detail[dep] = allItems;
          updates++;
        }
      }
    }
  }
  
  node.consumes_detail = detail;
}

// Write back
fs.writeFileSync(relPath, JSON.stringify(rel, null, 2), 'utf8');

console.log(`Populated consumes_detail for ${updates} dependency relationships`);

// Summary
console.log('\n=== Nodes with populated consumes_detail ===');
for (const node of rel.nodes) {
  const keys = Object.keys(node.consumes_detail);
  if (keys.length > 0) {
    console.log(`  ${node.id}:`);
    for (const [dep, items] of Object.entries(node.consumes_detail)) {
      console.log(`    ${dep}: ${items.join(', ')}`);
    }
  }
}

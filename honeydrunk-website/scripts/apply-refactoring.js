/**
 * Apply dependency refactoring to nodes.json
 * Removes circular dependencies according to REFACTOR_PLAN.md
 */

const fs = require('fs');
const path = require('path');

const nodesPath = path.join(__dirname, '../data/schema/nodes.json');
const nodes = JSON.parse(fs.readFileSync(nodesPath, 'utf8'));

console.log('🔧 Applying dependency refactoring...\n');

const refactorings = [
  // Layer 1: Kernel - remove all runtime dependencies
  {
    id: 'honeydrunk-kernel',
    remove: ['honeydrunk-data', 'honeydrunk-transport', 'honeycore-web-rest', 'honeydrunk-vault'],
    keep: ['honeydrunk-standards'],
    reason: 'Kernel is the foundation layer - provides abstractions only'
  },
  
  // Layer 2: Infrastructure
  {
    id: 'honeydrunk-data',
    remove: ['honeydrunk-transport', 'honeydrunk-tools'],
    keep: ['honeydrunk-kernel', 'pulse', 'honeydrunk-standards'],
    reason: 'Data layer doesn\'t need messaging or CLI tools'
  },
  {
    id: 'honeydrunk-transport',
    remove: ['pulse'],
    keep: ['honeydrunk-kernel', 'honeydrunk-data', 'honeydrunk-standards'],
    reason: 'Transport emits telemetry, doesn\'t consume Pulse'
  },
  {
    id: 'honeydrunk-vault',
    remove: ['pulse', 'honeydrunk-auth', 'honeysentinel', 'breachlab-exe'],
    keep: ['honeydrunk-kernel', 'honeydrunk-standards'],
    reason: 'Vault is a foundational secret store'
  },
  
  // Layer 3: Cross-cutting
  {
    id: 'pulse',
    remove: ['honeydrunk-agentkit', 'honeysentinel', 'breachlab-exe'],
    keep: ['honeydrunk-vault', 'honeydrunk-transport', 'honeydrunk-data', 'honeydrunk-standards'],
    reason: 'Pulse consumes telemetry, doesn\'t depend on consumers'
  },
  {
    id: 'honeydrunk-auth',
    remove: ['honeycore-web-rest'],
    keep: ['honeydrunk-kernel', 'honeydrunk-vault', 'honeydrunk-standards'],
    reason: 'Auth is middleware - Web.Rest uses Auth, not vice versa'
  },
  
  // Layer 5: Ops Tooling
  {
    id: 'honeydrunk-tools',
    remove: ['honeydrunk-pipelines', 'honeydrunk-actions', 'honeydrunk-deploy'],
    keep: ['honeydrunk-standards'],
    reason: 'CLI tools are standalone utilities'
  },
  {
    id: 'honeydrunk-actions',
    remove: [], // Already depends on Build + Tools correctly
    keep: ['honeydrunk-build', 'honeydrunk-tools', 'honeydrunk-standards'],
    reason: 'GitHub Actions depend on Build tooling'
  },
  {
    id: 'honeydrunk-deploy',
    remove: ['honeydrunk-pipelines'],
    keep: ['honeydrunk-tools', 'honeydrunk-standards'],
    reason: 'Deploy scripts use Tools, Pipelines orchestrates Deploy'
  },
  
  // Layer 6: Security
  {
    id: 'honeysentinel',
    remove: ['breachlab-exe'],
    keep: ['pulse', 'honeydrunk-vault', 'honeydrunk-standards'],
    reason: 'Sentinel detects threats, BreachLab executes responses'
  },
  
  // Layer 6: Business Logic - Financial
  {
    id: 'invoice',
    remove: ['ledger', 'pay'],
    keep: ['honeydrunk-standards'],
    reason: 'Invoice is the source entity - Ledger and Pay depend on it'
  },
  {
    id: 'ledger',
    remove: ['pay'],
    keep: ['invoice', 'honeydrunk-standards'],
    reason: 'Ledger records Invoices - Pay depends on both'
  },
  {
    id: 'pay',
    remove: ['subs'],
    keep: ['invoice', 'ledger', 'honeydrunk-standards'],
    reason: 'Payment processing - Subs depends on Pay'
  },
  
  // Layer 6: Content Platform
  {
    id: 'honeyhub',
    remove: ['honeydrunk-signal', 'forge'],
    keep: ['grid'], // Assuming grid is a valid dep
    reason: 'HoneyHub is the core platform - Signal and Forge extend it'
  },
  
  // Layer 6: HoneyMech
  {
    id: 'honeymech-sim',
    remove: ['honeymech-courier'],
    keep: ['honeydrunk-standards'],
    reason: 'Sim is the simulation engine - Courier uses it for delivery'
  },
];

let changesCount = 0;

refactorings.forEach(refactor => {
  const node = nodes.find(n => n.id === refactor.id);
  
  if (!node) {
    console.log(`⚠️  Node not found: ${refactor.id}`);
    return;
  }
  
  const originalDeps = node.depends_on || [];
  const newDeps = originalDeps.filter(dep => {
    // Keep if in keep list
    if (refactor.keep.includes(dep)) return true;
    // Remove if in remove list
    if (refactor.remove.includes(dep)) {
      changesCount++;
      return false;
    }
    // Keep anything not explicitly mentioned (e.g., existing valid deps)
    return true;
  });
  
  // Add any missing "keep" dependencies
  refactor.keep.forEach(dep => {
    if (!newDeps.includes(dep)) {
      newDeps.push(dep);
      changesCount++;
    }
  });
  
  const removed = originalDeps.filter(d => !newDeps.includes(d));
  const added = newDeps.filter(d => !originalDeps.includes(d));
  
  if (removed.length > 0 || added.length > 0) {
    console.log(`✏️  ${node.name} (${node.id})`);
    console.log(`   Reason: ${refactor.reason}`);
    if (removed.length > 0) {
      console.log(`   ❌ Removed: ${removed.join(', ')}`);
    }
    if (added.length > 0) {
      console.log(`   ✅ Added: ${added.join(', ')}`);
    }
    console.log('');
    
    node.depends_on = newDeps;
  }
});

// Write updated nodes.json
fs.writeFileSync(nodesPath, JSON.stringify(nodes, null, 2), 'utf8');

console.log(`\n✅ Refactoring complete! Applied ${changesCount} changes.`);
console.log('\nRun `node scripts/detect-cycles.js` to verify circular dependencies are resolved.\n');

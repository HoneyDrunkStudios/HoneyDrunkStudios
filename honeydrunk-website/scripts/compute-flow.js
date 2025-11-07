#!/usr/bin/env node
/**
 * Flow Computation Engine
 *
 * Recomputes Energy, Priority, and Flow for all Nodes in nodes.json
 * based on the rulebook in flow_config.json.
 *
 * Usage: node compute-flow.js
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION & DATA LOADING
// ============================================================================

const DATA_DIR = path.join(__dirname, '..', 'data', 'schema');
const NODES_PATH = path.join(DATA_DIR, 'nodes.json');
const CONFIG_PATH = path.join(DATA_DIR, 'flow_config.json');

console.log('🔧 Loading configuration and data...');

// Load flow configuration
const flowConfig = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8')).flow_config;
console.log('✓ Loaded flow_config.json');

// Load nodes
const nodes = JSON.parse(fs.readFileSync(NODES_PATH, 'utf8'));
console.log(`✓ Loaded ${nodes.length} nodes from nodes.json`);

// ============================================================================
// GOVERNANCE FIELD INITIALIZATION
// ============================================================================

console.log('\n📋 Initializing governance fields...');

// Add governance fields if missing
let addedFieldsCount = 0;
nodes.forEach(node => {
  let added = false;

  if (node.foundational === undefined) {
    node.foundational = false;
    added = true;
  }

  if (node.strategy_base === undefined) {
    node.strategy_base = 20;
    added = true;
  }

  if (node.tier === undefined) {
    node.tier = 'none';
    added = true;
  }

  if (node.time_pressure === undefined) {
    node.time_pressure = 0;
    added = true;
  }

  if (node.done === undefined) {
    node.done = false;
    added = true;
  }

  if (node.cooldown_days === undefined) {
    node.cooldown_days = 14;
    added = true;
  }

  if (added) addedFieldsCount++;
});

console.log(`✓ Added governance fields to ${addedFieldsCount} nodes`);

// ============================================================================
// GRAPH CONSTRUCTION
// ============================================================================

console.log('\n🕸️  Building dependency graph...');

// Create a map of node ID to node
const nodeMap = new Map();
nodes.forEach(node => nodeMap.set(node.id, node));

// Build graph: track direct dependents (reverse edges)
const directDependents = new Map();
nodes.forEach(node => {
  if (!directDependents.has(node.id)) {
    directDependents.set(node.id, []);
  }
});

nodes.forEach(node => {
  if (node.depends_on && Array.isArray(node.depends_on)) {
    node.depends_on.forEach(depId => {
      if (!directDependents.has(depId)) {
        directDependents.set(depId, []);
      }
      directDependents.get(depId).push(node.id);
    });
  }
});

// Store direct dependent count on each node
nodes.forEach(node => {
  node._directDependentCount = directDependents.get(node.id).length;
});

console.log('✓ Dependency graph built');

// ============================================================================
// ENERGY COMPUTATION
// ============================================================================

console.log('\n⚡ Computing Energy scores...');

const energyRaw = [];

nodes.forEach(node => {
  const signal = node.signal || 'Seed';
  const baseline = flowConfig.signal_to_energy[signal] || 30;

  // Usage bump
  const usageBump = Math.min(10, node._directDependentCount);

  // Calculate raw energy
  let energy = baseline + usageBump;

  // Apply decay if done or Echo
  if (node.done === true || signal === 'Echo') {
    energy *= (flowConfig.cooldown.energy_multiplier || 0.8);
  }

  energyRaw.push({ id: node.id, value: energy });
});

// Min-max normalization for Energy
const energyValues = energyRaw.map(e => e.value);
const energyMin = Math.min(...energyValues);
const energyMax = Math.max(...energyValues);
const energyRange = energyMax - energyMin || 1;

energyRaw.forEach(entry => {
  const node = nodeMap.get(entry.id);
  node.energy = Math.round(((entry.value - energyMin) / energyRange) * 100);
});

console.log(`✓ Energy normalized: range [${energyMin.toFixed(2)}, ${energyMax.toFixed(2)}]`);

// ============================================================================
// PRIORITY PRIME COMPUTATION
// ============================================================================

console.log('\n🎯 Computing PriorityPrime scores...');

const priorityRaw = [];

nodes.forEach(node => {
  // Sector weight
  const sector = node.sector || 'Default';
  const sectorWeight = flowConfig.weights.sector[sector] || flowConfig.weights.sector.Default;

  // Centrality
  const centralityK = flowConfig.weights.centrality_k;
  const centrality = centralityK * Math.log(1 + node._directDependentCount);

  // Stage score
  const signal = node.signal || 'Seed';
  const stageScore = flowConfig.stage_scores[signal] || 0;

  // Tier score
  const tierScore = flowConfig.tier_scores[node.tier] || 0;

  // Time pressure
  const timePressure = Math.min(10, Math.max(0, node.time_pressure || 0));

  // Calculate PriorityPrime
  let priority = sectorWeight * (
    node.strategy_base +
    centrality +
    stageScore +
    tierScore +
    timePressure
  );

  // NOTE: ops_bootstrap boost applied AFTER SCC normalization to avoid equalizing

  // Apply cooldown dampener if done or Echo
  if (node.done === true || signal === 'Echo') {
    priority *= (flowConfig.cooldown.priority_multiplier || 0.6);
  }

  priorityRaw.push({ id: node.id, value: priority });
});

// Min-max normalization for PriorityPrime
const priorityValues = priorityRaw.map(p => p.value);
const priorityMin = Math.min(...priorityValues);
const priorityMax = Math.max(...priorityValues);
const priorityRange = priorityMax - priorityMin || 1;

priorityRaw.forEach(entry => {
  const node = nodeMap.get(entry.id);
  node._priorityPrime = ((entry.value - priorityMin) / priorityRange) * 100;
});

console.log(`✓ PriorityPrime normalized: range [${priorityMin.toFixed(2)}, ${priorityMax.toFixed(2)}]`);

// ============================================================================
// GUARDRAILS: FOUNDATIONAL FLOOR
// ============================================================================

console.log('\n🛡️  Applying Foundational Floor guardrail...');

const foundationalFloorPercentile = flowConfig.foundational_floor_percentile;
const sortedPriorities = nodes.map(n => n._priorityPrime).sort((a, b) => a - b);
const floorThreshold = sortedPriorities[Math.floor(sortedPriorities.length * foundationalFloorPercentile / 100)];

let floorAdjustments = 0;

nodes.forEach(node => {
  if (node.foundational === true) {
    // Check if any dependent has PriorityPrime > 60
    const dependents = directDependents.get(node.id) || [];
    const hotDependent = dependents.some(depId => {
      const depNode = nodeMap.get(depId);
      return depNode && depNode._priorityPrime > 60;
    });

    if (hotDependent && node._priorityPrime < floorThreshold) {
      node._priorityPrime = floorThreshold;
      floorAdjustments++;
    }
  }
});

console.log(`✓ Applied floor to ${floorAdjustments} foundational nodes`);

// ============================================================================
// STRONGLY CONNECTED COMPONENTS (Tarjan's Algorithm)
// ============================================================================

console.log('\n🔗 Finding Strongly Connected Components...');

// Copy PriorityPrime to PriorityFinal
nodes.forEach(node => {
  node.priority = node._priorityPrime;
});

// Tarjan's algorithm for finding SCCs
function findSCCs(nodes, nodeMap) {
  const sccs = [];
  const index = new Map();
  const lowlink = new Map();
  const onStack = new Map();
  const stack = [];
  let currentIndex = 0;

  function strongConnect(nodeId) {
    index.set(nodeId, currentIndex);
    lowlink.set(nodeId, currentIndex);
    currentIndex++;
    stack.push(nodeId);
    onStack.set(nodeId, true);

    const node = nodeMap.get(nodeId);
    if (node && node.depends_on && Array.isArray(node.depends_on)) {
      for (const depId of node.depends_on) {
        if (nodeMap.has(depId)) {
          if (!index.has(depId)) {
            strongConnect(depId);
            lowlink.set(nodeId, Math.min(lowlink.get(nodeId), lowlink.get(depId)));
          } else if (onStack.get(depId)) {
            lowlink.set(nodeId, Math.min(lowlink.get(nodeId), index.get(depId)));
          }
        }
      }
    }

    if (lowlink.get(nodeId) === index.get(nodeId)) {
      const component = [];
      let w;
      do {
        w = stack.pop();
        onStack.set(w, false);
        component.push(w);
      } while (w !== nodeId);
      sccs.push(component);
    }
  }

  for (const node of nodes) {
    if (!index.has(node.id)) {
      strongConnect(node.id);
    }
  }

  return sccs;
}

const sccs = findSCCs(nodes, nodeMap);
const cyclicSCCs = sccs.filter(scc => scc.length > 1);
console.log(`✓ Found ${sccs.length} SCCs (${cyclicSCCs.length} with cycles)`);

// Create SCC index map (nodeId -> sccIndex)
const nodeToSCC = new Map();
sccs.forEach((scc, idx) => {
  scc.forEach(nodeId => nodeToSCC.set(nodeId, idx));
});

// Build SCC DAG (edges between different SCCs)
const sccEdges = new Map();
sccs.forEach((scc, idx) => {
  sccEdges.set(idx, new Set());
});

nodes.forEach(node => {
  const srcSCC = nodeToSCC.get(node.id);
  if (node.depends_on && Array.isArray(node.depends_on)) {
    node.depends_on.forEach(depId => {
      const dstSCC = nodeToSCC.get(depId);
      if (dstSCC !== undefined && srcSCC !== dstSCC) {
        sccEdges.get(srcSCC).add(dstSCC);
      }
    });
  }
});

// ============================================================================
// GUARDRAILS: ANCESTOR OVERRIDE (SCC-AWARE)
// ============================================================================

console.log('\n🔗 Applying SCC-aware Ancestor Override...');

const ancestorGap = flowConfig.ancestor_override_gap;

// Apply ancestor override on the SCC DAG
let iterations = 0;
let changed = true;

while (changed && iterations < 50) {
  changed = false;
  iterations++;

  sccs.forEach((scc, sccIdx) => {
    // For each node in this SCC
    scc.forEach(nodeId => {
      const node = nodeMap.get(nodeId);
      if (!node) return;

      // Check dependencies that are in OTHER SCCs
      if (node.depends_on && Array.isArray(node.depends_on)) {
        node.depends_on.forEach(depId => {
          const depSCC = nodeToSCC.get(depId);
          if (depSCC !== undefined && depSCC !== sccIdx) {
            const ancestor = nodeMap.get(depId);
            if (ancestor) {
              const minAncestorPriority = node.priority - ancestorGap;
              if (ancestor.priority < minAncestorPriority) {
                ancestor.priority = Math.min(100, minAncestorPriority);
                changed = true;
              }
            }
          }
        });
      }
    });
  });
}

console.log(`✓ Ancestor Override converged in ${iterations} iterations`);

// ============================================================================
// GUARDRAILS: NORMALIZE WITHIN SCCs
// ============================================================================

console.log('\n⚖️  Normalizing priorities within SCCs...');

let sccAdjustments = 0;

sccs.forEach(scc => {
  if (scc.length > 1) {
    // Multi-node SCC (has cycles)
    const sccNodes = scc.map(id => nodeMap.get(id)).filter(n => n);
    const hasFoundational = sccNodes.some(n => n.foundational === true);
    const maxPriority = Math.max(...sccNodes.map(n => n.priority));

    if (hasFoundational) {
      // Boost foundational nodes to maxPriority - ancestorGap
      sccNodes.forEach(node => {
        if (node.foundational === true) {
          const targetPriority = Math.max(node.priority, maxPriority - ancestorGap);
          if (node.priority !== targetPriority) {
            node.priority = Math.min(100, targetPriority);
            sccAdjustments++;
          }
        }
      });
    } else {
      // Equalize all nodes to maxPriority
      sccNodes.forEach(node => {
        if (node.priority !== maxPriority) {
          node.priority = maxPriority;
          sccAdjustments++;
        }
      });
    }
  }
});

console.log(`✓ Adjusted ${sccAdjustments} nodes within SCCs`);

// ============================================================================
// OPS BOOTSTRAP BOOST (Applied after SCC normalization)
// ============================================================================

console.log('\n🚀 Applying Ops Bootstrap boost...');

let opsBoostCount = 0;

nodes.forEach(node => {
  if (node.ops_bootstrap === true && flowConfig.operational_boost) {
    const boost = flowConfig.operational_boost.ops_bootstrap;
    node.priority = Math.min(100, node.priority + boost);
    opsBoostCount++;
  }
});

console.log(`✓ Applied ops_bootstrap boost (+${flowConfig.operational_boost.ops_bootstrap}) to ${opsBoostCount} nodes`);

// ============================================================================
// WIP SEQUENCING (SOFT CAP)
// ============================================================================

console.log('\n⏳ Applying WIP Sequencing cap...');

const maxSurgeNodes = flowConfig.wip.max_surge_nodes;
const queuePenalty = flowConfig.wip.queue_penalty;

// Sort nodes by PriorityFinal descending
const sortedNodes = [...nodes].sort((a, b) => b.priority - a.priority);

// Count how many would have Flow > 80
let tempFlows = sortedNodes.map(node => {
  const energyWeight = flowConfig.weights.energy_weight;
  const priorityWeight = flowConfig.weights.priority_weight;
  return energyWeight * node.energy + priorityWeight * node.priority;
});

let surgeCount = tempFlows.filter(f => f > 80).length;

if (surgeCount > maxSurgeNodes) {
  console.log(`  Found ${surgeCount} surge nodes (>${maxSurgeNodes}), applying penalty...`);

  // Apply penalty to nodes beyond the cap (except foundational nodes)
  let penaltyCount = 0;
  sortedNodes.forEach((node, index) => {
    if (tempFlows[index] > 80 && index >= maxSurgeNodes && !node.foundational) {
      node.priority = Math.max(0, node.priority - queuePenalty);
      penaltyCount++;
    }
  });

  console.log(`✓ Applied queue penalty to ${penaltyCount} nodes`);
} else {
  console.log(`✓ Surge count (${surgeCount}) within limit`);
}

// ============================================================================
// FLOW COMPUTATION
// ============================================================================

console.log('\n🌊 Computing final Flow scores...');

const energyWeight = flowConfig.weights.energy_weight;
const priorityWeight = flowConfig.weights.priority_weight;

nodes.forEach(node => {
  // Round priority to whole number for clean display
  node.priority = Math.round(node.priority);

  // Compute flow and round to whole number
  const flow = energyWeight * node.energy + priorityWeight * node.priority;
  node.flow = Math.round(flow);
});

// Apply hard cap to done nodes
console.log('\n🔒 Applying hard cap to done nodes...');
let cappedCount = 0;
const doneNodeCap = 45; // Hard maximum flow for done nodes

nodes.forEach(node => {
  if (node.done === true && node.flow > doneNodeCap) {
    node.flow = doneNodeCap;
    cappedCount++;
  }
});

console.log(`✓ Capped ${cappedCount} done nodes to max flow of ${doneNodeCap}`);

// Clean up temporary fields
nodes.forEach(node => {
  delete node._priorityPrime;
  delete node._directDependentCount;
});

console.log('✓ Flow computed for all nodes');

// ============================================================================
// WRITE BACK TO NODES.JSON
// ============================================================================

console.log('\n💾 Writing results back to nodes.json...');

fs.writeFileSync(NODES_PATH, JSON.stringify(nodes, null, 2), 'utf8');

console.log('✓ nodes.json updated successfully');

// ============================================================================
// SUMMARY STATISTICS
// ============================================================================

console.log('\n📊 Summary Statistics:');
console.log('═'.repeat(60));

const energyStats = {
  min: Math.min(...nodes.map(n => n.energy)),
  max: Math.max(...nodes.map(n => n.energy)),
  avg: nodes.reduce((sum, n) => sum + n.energy, 0) / nodes.length
};

const priorityStats = {
  min: Math.min(...nodes.map(n => n.priority)),
  max: Math.max(...nodes.map(n => n.priority)),
  avg: nodes.reduce((sum, n) => sum + n.priority, 0) / nodes.length
};

const flowStats = {
  min: Math.min(...nodes.map(n => n.flow)),
  max: Math.max(...nodes.map(n => n.flow)),
  avg: nodes.reduce((sum, n) => sum + n.flow, 0) / nodes.length
};

console.log(`Energy:   min=${energyStats.min}, max=${energyStats.max}, avg=${energyStats.avg.toFixed(2)}`);
console.log(`Priority: min=${priorityStats.min.toFixed(2)}, max=${priorityStats.max.toFixed(2)}, avg=${priorityStats.avg.toFixed(2)}`);
console.log(`Flow:     min=${flowStats.min.toFixed(2)}, max=${flowStats.max.toFixed(2)}, avg=${flowStats.avg.toFixed(2)}`);

// Top 10 by Flow
console.log('\n🔥 Top 10 Nodes by Flow:');
const topNodes = [...nodes]
  .sort((a, b) => b.flow - a.flow)
  .slice(0, 10);

topNodes.forEach((node, i) => {
  console.log(`  ${i + 1}. ${node.name || node.id} (Flow: ${node.flow})`);
});

console.log('\n✅ Flow computation complete!');
console.log('═'.repeat(60));

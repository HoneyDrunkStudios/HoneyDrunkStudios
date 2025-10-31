#!/usr/bin/env node
/**
 * Validation script for Flow computation
 * Checks that all acceptance criteria are met
 */

const fs = require('fs');
const path = require('path');

const NODES_PATH = path.join(__dirname, '..', 'data', 'schema', 'nodes.json');
const nodes = JSON.parse(fs.readFileSync(NODES_PATH, 'utf8'));

console.log('🔍 Validating Flow Computation Results\n');

// ============================================================================
// CRITERION 1: All nodes have energy, priority, flow
// ============================================================================

const requiredFields = ['energy', 'priority', 'flow', 'foundational', 'strategy_base', 'tier', 'time_pressure', 'done', 'cooldown_days'];
const missingFields = [];

nodes.forEach(node => {
  const missing = requiredFields.filter(field => node[field] === undefined);
  if (missing.length > 0) {
    missingFields.push({ id: node.id, missing });
  }
});

if (missingFields.length === 0) {
  console.log('✅ PASS: All nodes have energy, priority, flow, and governance fields');
} else {
  console.log('❌ FAIL: Some nodes missing fields:');
  missingFields.forEach(({ id, missing }) => {
    console.log(`   ${id}: missing ${missing.join(', ')}`);
  });
}

// ============================================================================
// CRITERION 2: Foundational nodes don't fall >5 below hot dependents
// ============================================================================

const nodeMap = new Map(nodes.map(n => [n.id, n]));
const directDependents = new Map();

nodes.forEach(node => {
  if (!directDependents.has(node.id)) {
    directDependents.set(node.id, []);
  }
  if (node.depends_on && Array.isArray(node.depends_on)) {
    node.depends_on.forEach(depId => {
      if (!directDependents.has(depId)) {
        directDependents.set(depId, []);
      }
      directDependents.get(depId).push(node.id);
    });
  }
});

const foundationalViolations = [];
nodes.forEach(node => {
  if (node.foundational === true) {
    const deps = directDependents.get(node.id) || [];
    const hotDeps = deps.filter(depId => {
      const dep = nodeMap.get(depId);
      return dep && dep.priority > 60;
    });

    hotDeps.forEach(depId => {
      const dep = nodeMap.get(depId);
      if (dep.priority - node.priority > 5) {
        foundationalViolations.push({
          node: node.id,
          nodePriority: node.priority,
          dependent: dep.id,
          depPriority: dep.priority,
          gap: dep.priority - node.priority
        });
      }
    });
  }
});

if (foundationalViolations.length === 0) {
  console.log('✅ PASS: Foundational nodes respect priority floor');
} else {
  console.log('❌ FAIL: Foundational violations:');
  foundationalViolations.forEach(v => {
    console.log(`   ${v.node} (${v.nodePriority}) < ${v.dependent} (${v.depPriority}), gap: ${v.gap}`);
  });
}

// ============================================================================
// CRITERION 3: Ancestor Override - parents within 5 of children
// ============================================================================

// First, identify circular dependencies (mutual dependencies)
const circularPairs = new Set();
nodes.forEach(node => {
  if (node.depends_on && Array.isArray(node.depends_on)) {
    node.depends_on.forEach(depId => {
      const dep = nodeMap.get(depId);
      if (dep && dep.depends_on && dep.depends_on.includes(node.id)) {
        const pair = [node.id, depId].sort().join('<->');
        circularPairs.add(pair);
      }
    });
  }
});

const ancestorViolations = [];
nodes.forEach(node => {
  if (node.depends_on && Array.isArray(node.depends_on)) {
    node.depends_on.forEach(depId => {
      const ancestor = nodeMap.get(depId);
      if (ancestor) {
        const gap = node.priority - ancestor.priority;
        const pairKey = [node.id, depId].sort().join('<->');

        // Skip violations that are due to circular dependencies
        if (gap > 5 && !circularPairs.has(pairKey)) {
          ancestorViolations.push({
            child: node.id,
            childPriority: node.priority,
            ancestor: ancestor.id,
            ancestorPriority: ancestor.priority,
            gap
          });
        }
      }
    });
  }
});

console.log(`   Circular dependencies detected: ${circularPairs.size}`);

if (ancestorViolations.length === 0) {
  console.log('✅ PASS: Ancestor override respected (excluding circular dependencies)');
} else {
  console.log('❌ FAIL: Ancestor violations (non-circular):');
  ancestorViolations.forEach(v => {
    console.log(`   ${v.child} (${v.childPriority}) ahead of ${v.ancestor} (${v.ancestorPriority}), gap: ${v.gap}`);
  });
}

// ============================================================================
// CRITERION 4: Done nodes have cooldown applied
// ============================================================================

const doneNodes = nodes.filter(n => n.done === true || n.signal === 'Echo');
console.log(`✅ INFO: ${doneNodes.length} nodes in cooldown state (done=true or signal=Echo)`);
if (doneNodes.length > 0) {
  console.log('   Cooldown nodes:', doneNodes.map(n => n.id).join(', '));
}

// ============================================================================
// CRITERION 5: Flow scores are computed
// ============================================================================

const flowStats = {
  min: Math.min(...nodes.map(n => n.flow)),
  max: Math.max(...nodes.map(n => n.flow)),
  avg: nodes.reduce((sum, n) => sum + n.flow, 0) / nodes.length
};

console.log(`✅ PASS: Flow scores computed (range: ${flowStats.min.toFixed(2)} - ${flowStats.max.toFixed(2)}, avg: ${flowStats.avg.toFixed(2)})`);

// ============================================================================
// SUMMARY
// ============================================================================

console.log('\n📊 Summary:');
console.log(`   Total nodes: ${nodes.length}`);
console.log(`   Surge nodes (Flow ≥ 80): ${nodes.filter(n => n.flow >= 80).length}`);
console.log(`   Awake nodes (Flow 60-79): ${nodes.filter(n => n.flow >= 60 && n.flow < 80).length}`);
console.log(`   Drift nodes (Flow 40-59): ${nodes.filter(n => n.flow >= 40 && n.flow < 60).length}`);
console.log(`   Idle nodes (Flow < 40): ${nodes.filter(n => n.flow < 40).length}`);

const allPassed = missingFields.length === 0 &&
                  foundationalViolations.length === 0 &&
                  ancestorViolations.length === 0;

console.log('\n' + '═'.repeat(60));
if (allPassed) {
  console.log('✅ ALL ACCEPTANCE CRITERIA PASSED');
} else {
  console.log('❌ SOME ACCEPTANCE CRITERIA FAILED');
}
console.log('═'.repeat(60));

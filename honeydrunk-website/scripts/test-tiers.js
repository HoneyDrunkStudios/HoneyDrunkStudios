#!/usr/bin/env node
const flowTiersData = require('../data/schema/flow_tiers.json');

function getFlowTierFromScore(flowIndex) {
  const tiers = flowTiersData.tiers;
  const sortedTiers = [...tiers].sort((a, b) => a.priority - b.priority);

  for (const tier of sortedTiers) {
    if (tier.maxScore === 100) {
      if (flowIndex >= tier.minScore && flowIndex <= tier.maxScore) {
        return tier;
      }
    } else {
      if (flowIndex >= tier.minScore && flowIndex < tier.maxScore) {
        return tier;
      }
    }
  }

  return tiers.find(t => t.id === 'future');
}

console.log('Testing tier boundaries:\n');
[100, 80, 79, 60, 59, 40, 39, 20, 19, 0].forEach(flow => {
  const tier = getFlowTierFromScore(flow);
  console.log(`Flow ${String(flow).padStart(3)} → ${tier.id.padEnd(12)} (${tier.minScore}-${tier.maxScore})`);
});

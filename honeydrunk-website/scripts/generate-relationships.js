const fs = require('fs');
const path = require('path');

// Paths
const nodesPath = path.join(__dirname, '../data/schema/nodes.json');
const relationshipsPath = path.join(__dirname, '../data/schema/relationships.json');

// Load data
const nodes = JSON.parse(fs.readFileSync(nodesPath, 'utf8'));
let existingRelationships = [];
if (fs.existsSync(relationshipsPath)) {
  existingRelationships = JSON.parse(fs.readFileSync(relationshipsPath, 'utf8'));
}

// Helper to find a node by ID
const getNode = (id) => nodes.find(n => n.id === id);

// Logic ported and expanded from lib/relationships.ts
function generateReason(dependent, dependency) {
  const depId = dependency.id;
  const depName = dependency.name;
  const depShort = dependency.short || '';
  const dependentShort = dependent.short || '';
  const dependentDesc = dependent.description || '';
  
  const depContext = (dependentShort + ' ' + dependentDesc).toLowerCase();

  // 1. Check for existing manual override
  const existing = existingRelationships.find(r => r.dependency === depId && r.dependent === dependent.id);
  if (existing) return existing.reason;

  // 2. Specific Node Logic (Ported from original TS file)

  // HoneyDrunk.Data
  if (depId === 'honeydrunk-data') {
    if (depContext.includes('persist') || depContext.includes('storage')) {
      return `Requires Data's persistence layer for ${dependentShort.toLowerCase()}`;
    }
    if (depContext.includes('outbox')) {
      return `Uses Data's outbox table for reliable message persistence`;
    }
    if (depContext.includes('migration') || depContext.includes('schema')) {
      return `Depends on Data's migration engine for schema versioning`;
    }
    return `Requires Data's persistence layer for storage guarantees`;
  }

  // HoneyDrunk.Transport
  if (depId === 'honeydrunk-transport') {
    if (depContext.includes('event') || depContext.includes('messaging')) {
      return `Uses Transport's event bus for inter-service communication`;
    }
    if (depContext.includes('outbox')) {
      return `Relies on Transport's outbox pattern for guaranteed delivery`;
    }
    if (depContext.includes('queue') || depContext.includes('async')) {
      return `Uses Transport's message queue infrastructure for async processing`;
    }
    return `Relies on Transport for messaging, events, and inter-node communication`;
  }

  // Pulse
  if (depId === 'pulse') {
    if (depContext.includes('monitor') || depContext.includes('observ')) {
      return `Integrates Pulse for monitoring, metrics, and alerting`;
    }
    if (depContext.includes('trace') || depContext.includes('log')) {
      return `Uses Pulse's distributed tracing and structured logging`;
    }
    if (depContext.includes('health')) {
      return `Reports health checks and liveness probes to Pulse`;
    }
    return `Integrates Pulse for telemetry, observability, and trace correlation`;
  }

  // HoneyDrunk.Auth
  if (depId === 'honeydrunk-auth') {
    if (depContext.includes('api') || depContext.includes('rest')) {
      return `Protects endpoints with Auth's JWT validation and policy enforcement`;
    }
    if (depContext.includes('user') || depContext.includes('identity')) {
      return `Uses Auth for user authentication and identity resolution`;
    }
    if (depContext.includes('permission') || depContext.includes('authz')) {
      return `Enforces Auth's role-based access control and permissions`;
    }
    return `Depends on Auth for identity, permissions, and security context`;
  }

  // Build/Standards/Tools/Pipelines
  if (depId === 'honeydrunk-build') return `Consumes Build conventions for MSBuild targets, versioning, and packaging`;
  if (depId === 'honeydrunk-standards') return `Follows Standards for code style, linting, and formatting rules`;
  if (depId === 'honeydrunk-tools') return `Leverages Tools for CLI utilities and development workflows`;
  if (depId === 'honeydrunk-pipelines') return `Uses Pipelines for CI/CD orchestration and deployment automation`;

  // 3. Generic Fallbacks
  if (dependency.sector === 'Core') {
    return `Builds on ${depName} for core infrastructure capabilities`;
  }
  
  if (dependency.sector === 'Ops') {
    return `Integrates with ${depName} for operational support`;
  }
  
  if (dependency.signal === 'Live') {
    return `Depends on production-ready ${depName} services`;
  }

  return `Requires ${depName} for ${depShort.toLowerCase() || 'functionality'}`;
}

// Main generation loop
const newRelationships = [];

nodes.forEach(node => {
  if (node.depends_on && Array.isArray(node.depends_on)) {
    node.depends_on.forEach(depId => {
      const dependency = getNode(depId);
      if (!dependency) {
        console.warn(`Warning: Node ${node.id} depends on unknown node ${depId}`);
        return;
      }

      const reason = generateReason(node, dependency);
      
      newRelationships.push({
        dependency: depId,
        dependent: node.id,
        reason: reason
      });
    });
  }
});

// Sort for consistency: by dependency, then dependent
newRelationships.sort((a, b) => {
  if (a.dependency !== b.dependency) return a.dependency.localeCompare(b.dependency);
  return a.dependent.localeCompare(b.dependent);
});

// Write output
fs.writeFileSync(relationshipsPath, JSON.stringify(newRelationships, null, 2));
console.log(`Generated ${newRelationships.length} relationships in ${relationshipsPath}`);

/**
 * HoneyDrunk Studios — Node Relationship Matrix
 * Machine-generated synthesis of node dependencies with semantic context
 */

import { getNodes, type Node } from './entities';
import relationshipsData from '@/data/schema/relationships.json';

export interface NodeRelationship {
  targetNode: Node;
  direction: 'upstream' | 'downstream'; // upstream = dependency, downstream = dependent
  integrationDepth: string;
  stabilityTier: string;
  flowScore: number;
  signal: string;
  isFoundational: boolean;
  semanticReason: string; // Why this relationship exists
  impactVector: string;
}

export interface NodeRelationshipMatrix {
  node: Node;
  upstream: NodeRelationship[]; // What this node depends on
  downstream: NodeRelationship[]; // What depends on this node
  roleInGrid: string; // Synthesized description of node's role based on relationships
  criticalityScore: number; // How many nodes depend on this
  foundationScore: number; // How many foundational nodes this depends on
}

interface RelationshipOverride {
  dependency: string;
  dependent: string;
  reason: string;
}

interface RelationshipsSchema {
  nodes: Array<{
    id: string;
    consumes: string[];
    consumed_by: string[];
    consumed_by_planned?: string[]; // Planned but not yet implemented dependents
    blocked_by: string[];
    consumes_detail: Record<string, string[]>; // nodeId -> [contract/package names]
    exposes: {
      contracts: string[];
      packages: string[];
    };
  }>;
  edges: RelationshipOverride[];
}

export interface NodeContractInfo {
  consumes: string[];
  consumed_by: string[];  // All dependents (for backwards compat)
  consumed_by_implemented: string[];  // Live, Echo signals
  consumed_by_in_progress: string[];  // Wiring signal
  consumed_by_planned: string[];      // Seed, Awake signals
  blocked_by: string[];
  consumes_detail: Record<string, string[]>;
  exposes: {
    contracts: string[];
    packages: string[];
  };
}

// Signals that indicate implemented/live dependencies
const IMPLEMENTED_SIGNALS = ['Live', 'Echo'];
// Signals that indicate in-progress dependencies  
const IN_PROGRESS_SIGNALS = ['Wiring'];
// Signals that indicate planned/future dependencies
const PLANNED_SIGNALS = ['Seed', 'Awake'];

/**
 * Get node contract information from relationships.json
 * Categorizes dependents by their signal state (implemented/in-progress/planned)
 */
export function getNodeContractInfo(nodeId: string): NodeContractInfo | null {
  const relationships = relationshipsData as unknown as RelationshipsSchema;
  const nodeContract = relationships.nodes.find(n => n.id === nodeId);
  
  if (!nodeContract) return null;
  
  // Get all nodes to look up signals
  const allNodes = getNodes();
  
  // Categorize dependents by their signal state
  const implemented: string[] = [];
  const inProgress: string[] = [];
  const planned: string[] = [];
  
  for (const depId of nodeContract.consumed_by) {
    const depNode = allNodes.find(n => n.id === depId);
    if (!depNode) continue;
    
    if (IMPLEMENTED_SIGNALS.includes(depNode.signal)) {
      implemented.push(depId);
    } else if (IN_PROGRESS_SIGNALS.includes(depNode.signal)) {
      inProgress.push(depId);
    } else {
      planned.push(depId);
    }
  }
  
  return {
    consumes: nodeContract.consumes,
    consumed_by: nodeContract.consumed_by,
    consumed_by_implemented: implemented,
    consumed_by_in_progress: inProgress,
    consumed_by_planned: planned,
    blocked_by: nodeContract.blocked_by || [],
    consumes_detail: nodeContract.consumes_detail || {},
    exposes: nodeContract.exposes,
  };
}

/**
 * Get node dependencies from relationships.json (single source of truth)
 */
export function getNodeDependencies(nodeId: string): string[] {
  const contractInfo = getNodeContractInfo(nodeId);
  return contractInfo?.consumes || [];
}

/**
 * Get nodes that depend on this node from relationships.json
 */
export function getNodeDependents(nodeId: string): string[] {
  const contractInfo = getNodeContractInfo(nodeId);
  return contractInfo?.consumed_by || [];
}

/**
 * Generate semantic reason for why a dependency exists
 */
function generateDependencyReason(dependent: Node, dependency: Node): string {
  const depName = dependency.name;
  const depShort = dependency.short;
  const depId = dependency.id;
  const dependentId = dependent.id;
  const dependentShort = dependent.short;

  // Check for explicit override in relationships.json
  const relationships = relationshipsData as unknown as RelationshipsSchema;
  const override = relationships.edges.find(
    r => r.dependency === depId && r.dependent === dependentId
  );
  
  if (override) {
    return override.reason;
  }

  // Special case: Kernel is foundational - provide specific reasons per dependent
  if (depId === 'honeydrunk-kernel') {
    // Generic fallback for other Kernel dependents
    return `Uses Kernel's base contracts, DI patterns, and lifecycle primitives`;
  }
  
  // Data-specific relationships
  if (depId === 'honeydrunk-data') {
    if (dependentShort.toLowerCase().includes('persist') || dependentShort.toLowerCase().includes('storage')) {
      return `Requires Data's persistence layer for ${dependentShort.toLowerCase()}`;
    }
    if (dependentShort.toLowerCase().includes('outbox')) {
      return `Uses Data's outbox table for reliable message persistence`;
    }
    if (dependentShort.toLowerCase().includes('migration') || dependentShort.toLowerCase().includes('schema')) {
      return `Depends on Data's migration engine for schema versioning`;
    }
    return `Requires Data's persistence layer for storage guarantees`;
  }
  
  // Transport-specific relationships
  if (depId === 'honeydrunk-transport') {
    if (dependentShort.toLowerCase().includes('event') || dependentShort.toLowerCase().includes('messaging')) {
      return `Uses Transport's event bus for inter-service communication`;
    }
    if (dependentShort.toLowerCase().includes('outbox')) {
      return `Relies on Transport's outbox pattern for guaranteed delivery`;
    }
    if (dependentShort.toLowerCase().includes('queue') || dependentShort.toLowerCase().includes('async')) {
      return `Uses Transport's message queue infrastructure for async processing`;
    }
    return `Relies on Transport for messaging, events, and inter-node communication`;
  }
  
  // Pulse-specific relationships
  if (depId === 'pulse') {
    if (dependentShort.toLowerCase().includes('monitor') || dependentShort.toLowerCase().includes('observ')) {
      return `Integrates Pulse for monitoring, metrics, and alerting`;
    }
    if (dependentShort.toLowerCase().includes('trace') || dependentShort.toLowerCase().includes('log')) {
      return `Uses Pulse's distributed tracing and structured logging`;
    }
    if (dependentShort.toLowerCase().includes('health')) {
      return `Reports health checks and liveness probes to Pulse`;
    }
    return `Integrates Pulse for telemetry, observability, and trace correlation`;
  }
  
  // Vault-specific relationships
  if (depId === 'honeydrunk-vault') {
    return `Uses Vault for secrets, configuration, and sensitive data management`;
  }
  
  // Auth-specific relationships
  if (depId === 'honeydrunk-auth') {
    if (dependentShort.toLowerCase().includes('api') || dependentShort.toLowerCase().includes('rest')) {
      return `Protects endpoints with Auth's JWT validation and policy enforcement`;
    }
    if (dependentShort.toLowerCase().includes('user') || dependentShort.toLowerCase().includes('identity')) {
      return `Uses Auth for user authentication and identity resolution`;
    }
    if (dependentShort.toLowerCase().includes('permission') || dependentShort.toLowerCase().includes('authz')) {
      return `Enforces Auth's role-based access control and permissions`;
    }
    return `Depends on Auth for identity, permissions, and security context`;
  }
  
  // Build/Standards/Tools - build-time dependencies
  if (depId === 'honeydrunk-build') {
    return `Consumes Build conventions for MSBuild targets, versioning, and packaging`;
  }
  
  if (depId === 'honeydrunk-tools') {
    return `Leverages Tools for CLI utilities and development workflows`;
  }
  
  if (depId === 'honeydrunk-pipelines') {
    return `Uses Pipelines for CI/CD orchestration and deployment automation`;
  }

  // Generic fallback based on sector and description
  if (dependency.sector === 'Core') {
    return `Builds on ${depName} for core infrastructure (${depShort.toLowerCase()})`;
  }
  
  if (dependency.sector === 'Ops') {
    return `Integrates with ${depName} for operational capabilities (${depShort.toLowerCase()})`;
  }
  
  if (dependency.signal === 'Live') {
    return `Depends on production-ready ${depName} (${depShort.toLowerCase()})`;
  }
  
  return `Requires ${depName} for ${depShort.toLowerCase()}`;
}

/**
 * Generate role description based on relationships
 * Avoids specific counts to prevent stale data - uses semantic descriptions
 */
function generateRoleInGrid(
  node: Node,
  upstream: NodeRelationship[],
  downstream: NodeRelationship[]
): string {
  const parts: string[] = [];
  
  // Foundation vs Consumer
  if (upstream.length === 0) {
    parts.push(`${node.name} is a foundational node with no internal Grid dependencies`);
  } else if (upstream.filter(u => u.isFoundational).length === upstream.length) {
    parts.push(`Builds directly on foundational infrastructure`);
  } else {
    parts.push(`Integrates multiple upstream nodes`);
  }
  
  // Impact - semantic descriptions without specific counts
  if (downstream.length === 0) {
    parts.push(`no downstream dependents yet`);
  } else if (downstream.length >= 10) {
    parts.push(`critical hub across the Grid`);
  } else if (downstream.length >= 5) {
    parts.push(`widely adopted across the Grid`);
  } else if (downstream.length >= 2) {
    parts.push(`multiple nodes depend on it`);
  } else {
    parts.push(`emerging dependency in the Grid`);
  }
  
  // Integration depth pattern - semantic only
  const deepIntegrations = [...upstream, ...downstream].filter(r => r.integrationDepth === 'deep' || r.integrationDepth === 'high');
  if (deepIntegrations.length >= 3) {
    parts.push(`deep integration with critical systems`);
  }
  
  return `${parts.join('; ')}.`;
}

/**
 * Get relationship matrix for a specific node
 */
export function getNodeRelationshipMatrix(nodeId: string): NodeRelationshipMatrix | null {
  const allNodes = getNodes();
  const node = allNodes.find(n => n.id === nodeId);
  
  if (!node) return null;
  
  // Build upstream relationships (what this node depends on) from relationships.json
  const dependencies = getNodeDependencies(nodeId);
  const upstreamRaw = dependencies
    .map(depId => {
      const depNode = allNodes.find(n => n.id === depId);
      if (!depNode) return null;
      
      const rel: NodeRelationship = {
        targetNode: depNode,
        direction: 'upstream',
        integrationDepth: (node.long_description?.integration_depth as string) || 'medium',
        stabilityTier: (depNode.long_description?.stability_tier as string) || 'beta',
        flowScore: (depNode as any).flow || 0,
        signal: depNode.signal,
        isFoundational: (depNode as any).foundational || false,
        semanticReason: generateDependencyReason(node, depNode),
        impactVector: (depNode.long_description?.impact_vector as string) || 'system stability',
      };
      return rel;
    })
    .filter((r) => r !== null) as NodeRelationship[];
  
  const upstream = upstreamRaw.sort((a, b) => b.flowScore - a.flowScore);
  
  // Build downstream relationships (what depends on this node) from relationships.json
  const dependents = getNodeDependents(nodeId);
  const downstreamRaw = dependents
    .map(depNodeId => {
      const depNode = allNodes.find(n => n.id === depNodeId);
      if (!depNode) return null;
      
      const rel: NodeRelationship = {
        targetNode: depNode,
        direction: 'downstream',
        integrationDepth: (depNode.long_description?.integration_depth as string) || 'medium',
        stabilityTier: (depNode.long_description?.stability_tier as string) || 'beta',
        flowScore: (depNode as any).flow || 0,
        signal: depNode.signal,
        isFoundational: (depNode as any).foundational || false,
        semanticReason: generateDependencyReason(depNode, node),
        impactVector: (depNode.long_description?.impact_vector as string) || 'system stability',
      };
      return rel;
    })
    .filter((r) => r !== null) as NodeRelationship[];
  
  const downstream = downstreamRaw.sort((a, b) => b.flowScore - a.flowScore);
  
  const roleInGrid = generateRoleInGrid(node, upstream, downstream);
  const criticalityScore = downstream.length;
  const foundationScore = upstream.filter(u => u.isFoundational).length;
  
  return {
    node,
    upstream,
    downstream,
    roleInGrid,
    criticalityScore,
    foundationScore,
  };
}

/**
 * Get all nodes sorted by criticality (number of dependents)
 */
export function getNodesByCriticality(): Array<{ node: Node; criticalityScore: number }> {
  const allNodes = getNodes();
  
  return allNodes
    .map(node => {
      const criticalityScore = getNodeDependents(node.id).length;
      return { node, criticalityScore };
    })
    .sort((a, b) => b.criticalityScore - a.criticalityScore);
}

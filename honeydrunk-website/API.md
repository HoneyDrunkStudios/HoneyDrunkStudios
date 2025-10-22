# HoneyDrunk Studios API Documentation

Public API endpoints for accessing node data and project status.

## Base URL
```
https://honeydrunk.studio/api
```

## Endpoints

### 1. Get All Nodes
Get a list of all nodes with optional filtering.

**Endpoint:** `GET /api/nodes`

**Query Parameters:**
- `sector` - Filter by sector (Core, Ops, Creator, Life, Play, Meta)
- `signal` - Filter by signal status (Seed, Awake, Wiring, Live, Echo, Archive)
- `cluster` - Filter by cluster name
- `search` - Search across name, description, and tags

**Examples:**
```bash
# Get all nodes
curl https://honeydrunk.studio/api/nodes

# Get nodes in Core sector
curl https://honeydrunk.studio/api/nodes?sector=Core

# Get nodes with Live status
curl https://honeydrunk.studio/api/nodes?signal=Live

# Search for specific nodes
curl https://honeydrunk.studio/api/nodes?search=infrastructure

# Combine filters
curl https://honeydrunk.studio/api/nodes?sector=Core&signal=Wiring
```

**Response:**
```json
{
  "success": true,
  "count": 4,
  "total": 23,
  "nodes": [
    {
      "id": "honeydrunk-kernel",
      "name": "HoneyDrunk.Kernel",
      "short": "Foundational primitives. Lowest layer.",
      "description": "Core primitives and abstractions...",
      "sector": "Core",
      "signal": "Wiring",
      "cluster": "foundation",
      "energy": 95,
      "priority": 98,
      "tags": ["infrastructure", "primitives", "core"],
      "connections": ["honeydrunk-transport"],
      "links": {
        "repo": "https://github.com/honeydrunk/kernel"
      }
    }
  ]
}
```

---

### 2. Get Single Node
Get detailed information about a specific node and its connections.

**Endpoint:** `GET /api/nodes/[id]`

**Example:**
```bash
curl https://honeydrunk.studio/api/nodes/honeydrunk-kernel
```

**Response:**
```json
{
  "success": true,
  "node": {
    "id": "honeydrunk-kernel",
    "name": "HoneyDrunk.Kernel",
    "short": "Foundational primitives. Lowest layer.",
    "description": "Core primitives and abstractions...",
    "sector": "Core",
    "signal": "Wiring",
    "cluster": "foundation",
    "energy": 95,
    "priority": 98,
    "tags": ["infrastructure", "primitives", "core"],
    "connections": ["honeydrunk-transport"],
    "links": {
      "repo": "https://github.com/honeydrunk/kernel"
    }
  },
  "connected": [
    {
      "id": "honeydrunk-transport",
      "name": "HoneyDrunk.Transport",
      "sector": "Core",
      "signal": "Awake"
    }
  ]
}
```

---

### 3. Get Statistics
Get overview statistics and high-level metrics about all nodes.

**Endpoint:** `GET /api/nodes/stats`

**Example:**
```bash
curl https://honeydrunk.studio/api/nodes/stats
```

**Response:**
```json
{
  "success": true,
  "total": 23,
  "bySignal": {
    "Seed": 11,
    "Awake": 6,
    "Wiring": 4,
    "Live": 1,
    "Echo": 0,
    "Archive": 1
  },
  "bySector": {
    "Core": 7,
    "Ops": 8,
    "Creator": 2,
    "Life": 1,
    "Play": 2,
    "Meta": 3
  },
  "byCluster": {
    "foundation": 6,
    "tooling": 1,
    "infrastructure": 3
  },
  "highPriority": [
    {
      "id": "honeydrunk-build",
      "name": "HoneyDrunk.Build",
      "signal": "Wiring",
      "sector": "Core",
      "priority": 100
    }
  ],
  "active": [
    {
      "id": "honeydrunk-kernel",
      "name": "HoneyDrunk.Kernel",
      "signal": "Wiring",
      "sector": "Core",
      "energy": 95
    }
  ],
  "generated": "2025-10-22T21:55:23.759Z"
}
```

---

## Signal Status Meanings

- **Seed** - Queued/Backlog - Ideas and planned projects
- **Awake** - Planning/Starting - Active planning phase
- **Wiring** - Active Development - Currently being built
- **Live** - Production/Deployed - Available and running
- **Echo** - Maintenance/Iteration - Stable with ongoing improvements
- **Archive** - Retired/Deprecated - No longer active

## Sectors

- **Core** - Foundational infrastructure and primitives
- **Ops** - DevOps, CI/CD, and operational tools
- **Creator** - Content creation and creative tools
- **Life** - Personal productivity and life management
- **Play** - Games and entertainment
- **Meta** - Documentation and ecosystem projects

---

## Usage Examples

### For ChatGPT/AI Assistants

You can ask ChatGPT to analyze your project status:

```
Check https://honeydrunk.studio/api/nodes/stats and tell me:
1. What's my current project status?
2. Which nodes should I prioritize?
3. How many projects are actively being developed?
```

### For Scripts/Automation

```bash
#!/bin/bash
# Get all active projects
curl -s "https://honeydrunk.studio/api/nodes?signal=Wiring" | jq '.nodes[].name'

# Get project count by status
curl -s "https://honeydrunk.studio/api/nodes/stats" | jq '.bySignal'
```

### For Monitoring Dashboards

```javascript
// Fetch stats for dashboard
const stats = await fetch('https://honeydrunk.studio/api/nodes/stats')
  .then(res => res.json());

console.log(`Total Projects: ${stats.total}`);
console.log(`Active: ${stats.active.length}`);
console.log(`High Priority: ${stats.highPriority.length}`);
```

---

## Rate Limiting

Currently no rate limiting is enforced. Please be respectful and avoid excessive requests.

## CORS

CORS is enabled for all origins. You can make requests from any domain.

## Support

For issues or questions, open an issue at: https://github.com/honeydrunkstudios/honeydrunk-website

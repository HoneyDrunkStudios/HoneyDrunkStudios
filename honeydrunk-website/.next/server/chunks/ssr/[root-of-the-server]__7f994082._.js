module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/data/nodes.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("[{\"id\":\"honeydrunk-build\",\"name\":\"HoneyDrunk.Build\",\"short\":\"Central MSBuild & analyzers package\",\"description\":\"Foundational build infrastructure for all HoneyDrunk projects. MSBuild conventions, code analyzers, and quality gates.\",\"sector\":\"Core\",\"signal\":\"Wiring\",\"cluster\":\"foundation\",\"energy\":92,\"priority\":100,\"tags\":[\"infrastructure\",\"build\",\"msbuild\"],\"connections\":[\"honeydrunk-kernel\",\"honeydrunk-pipelines\"],\"links\":{\"repo\":\"https://github.com/honeydrunk/build\"}},{\"id\":\"honeydrunk-pipelines\",\"name\":\"HoneyDrunk.Pipelines\",\"short\":\"Azure DevOps YAML templates library\",\"description\":\"Reusable CI/CD pipeline templates for Azure DevOps. Zero-bloat deployment automation.\",\"sector\":\"Ops\",\"signal\":\"Wiring\",\"cluster\":\"foundation\",\"energy\":88,\"priority\":95,\"tags\":[\"devops\",\"ci-cd\",\"azure\"],\"connections\":[\"honeydrunk-build\"],\"links\":{\"repo\":\"https://github.com/honeydrunk/pipelines\"}},{\"id\":\"honeydrunk-kernel\",\"name\":\"HoneyDrunk.Kernel\",\"short\":\"Foundational primitives. Lowest layer.\",\"description\":\"Core primitives and abstractions that power the entire HoneyDrunk ecosystem. The bedrock upon which everything is built.\",\"sector\":\"Core\",\"signal\":\"Wiring\",\"cluster\":\"foundation\",\"energy\":95,\"priority\":98,\"tags\":[\"infrastructure\",\"primitives\",\"core\"],\"connections\":[\"honeydrunk-transport\",\"honeycore-web-rest\"],\"links\":{\"repo\":\"https://github.com/honeydrunk/kernel\",\"docs\":\"https://docs.honeydrunk.studio/kernel\"}},{\"id\":\"honeydrunk-transport\",\"name\":\"HoneyDrunk.Transport\",\"short\":\"Outbox, messaging abstractions\",\"description\":\"Reliable messaging and transport layer. Outbox pattern, event sourcing primitives, and communication infrastructure.\",\"sector\":\"Core\",\"signal\":\"Awake\",\"cluster\":\"foundation\",\"energy\":75,\"priority\":85,\"tags\":[\"messaging\",\"outbox\",\"events\"],\"connections\":[\"honeydrunk-kernel\"],\"links\":{\"repo\":\"https://github.com/honeydrunk/transport\"}},{\"id\":\"honeycore-web-rest\",\"name\":\"HoneyCore.Web.Rest\",\"short\":\"REST scaffolding & conventions\",\"description\":\"Opinionated REST API conventions and scaffolding. Clean, consistent HTTP interfaces across all HoneyDrunk services.\",\"sector\":\"Core\",\"signal\":\"Awake\",\"cluster\":\"foundation\",\"energy\":70,\"priority\":80,\"tags\":[\"rest\",\"api\",\"web\"],\"connections\":[\"honeydrunk-transport\"],\"links\":{\"repo\":\"https://github.com/honeydrunk/web-rest\"}},{\"id\":\"honeydrunk-testing\",\"name\":\"HoneyDrunk.Testing\",\"short\":\"Shared test helpers, fixtures\",\"description\":\"Common testing utilities, fixtures, and patterns. Making quality assurance as elegant as the code itself.\",\"sector\":\"Core\",\"signal\":\"Awake\",\"cluster\":\"foundation\",\"energy\":68,\"priority\":75,\"tags\":[\"testing\",\"qa\",\"fixtures\"],\"connections\":[],\"links\":{\"repo\":\"https://github.com/honeydrunk/testing\"}},{\"id\":\"honeydrunk-tools\",\"name\":\"HoneyDrunk.Tools\",\"short\":\"Dev CLIs (DACPAC runner, etc)\",\"description\":\"Developer command-line tools. From database migrations to code generation, automating the tedious.\",\"sector\":\"Ops\",\"signal\":\"Awake\",\"cluster\":\"tooling\",\"energy\":65,\"priority\":70,\"tags\":[\"cli\",\"tools\",\"automation\"],\"connections\":[],\"links\":{\"repo\":\"https://github.com/honeydrunk/tools\"}},{\"id\":\"vault\",\"name\":\"Vault\",\"short\":\"Secrets & config manager\",\"description\":\"Secure secrets and configuration management. Zero-trust vault for sensitive data across all environments.\",\"sector\":\"Core\",\"signal\":\"Wiring\",\"cluster\":\"infrastructure\",\"energy\":85,\"priority\":90,\"tags\":[\"security\",\"secrets\",\"config\"],\"connections\":[\"honeydrunk-kernel\"],\"links\":{\"repo\":\"https://github.com/honeydrunk/vault\"}},{\"id\":\"pulse\",\"name\":\"Pulse\",\"short\":\"Observability suite (logs/traces/metrics)\",\"description\":\"Unified observability platform. Logs, traces, and metrics in one clean interface. See the heartbeat of The Hive.\",\"sector\":\"Ops\",\"signal\":\"Awake\",\"cluster\":\"infrastructure\",\"energy\":72,\"priority\":82,\"tags\":[\"observability\",\"monitoring\",\"telemetry\"],\"connections\":[\"vault\"],\"links\":{\"repo\":\"https://github.com/honeydrunk/pulse\"}},{\"id\":\"honey-auth\",\"name\":\"HoneyAuth\",\"short\":\"JWT + Passkeys/MFA\",\"description\":\"Modern authentication system. JWT tokens, passkeys, MFA, and zero-password flows.\",\"sector\":\"Core\",\"signal\":\"Seed\",\"cluster\":\"infrastructure\",\"energy\":60,\"priority\":78,\"tags\":[\"auth\",\"security\",\"jwt\"],\"connections\":[\"vault\"],\"links\":{}},{\"id\":\"ledger\",\"name\":\"Ledger\",\"short\":\"Finance layer\",\"description\":\"Double-entry bookkeeping and financial tracking. Structure meets spreadsheets.\",\"sector\":\"Ops\",\"signal\":\"Seed\",\"cluster\":\"business\",\"energy\":45,\"priority\":60,\"tags\":[\"finance\",\"accounting\",\"ledger\"],\"connections\":[\"invoice\",\"pay\"],\"links\":{}},{\"id\":\"invoice\",\"name\":\"Invoice\",\"short\":\"Invoicing + Stripe/PayPal\",\"description\":\"Professional invoicing with payment integration. Send, track, and get paid.\",\"sector\":\"Ops\",\"signal\":\"Seed\",\"cluster\":\"business\",\"energy\":48,\"priority\":58,\"tags\":[\"invoicing\",\"payments\",\"stripe\"],\"connections\":[\"ledger\",\"pay\"],\"links\":{}},{\"id\":\"crm\",\"name\":\"CRM\",\"short\":\"Lightweight CRM\",\"description\":\"Customer relationship management without the bloat. Contacts, deals, and pipelines that actually make sense.\",\"sector\":\"Ops\",\"signal\":\"Seed\",\"cluster\":\"business\",\"energy\":42,\"priority\":55,\"tags\":[\"crm\",\"contacts\",\"sales\"],\"connections\":[\"invoice\"],\"links\":{}},{\"id\":\"pay\",\"name\":\"Pay\",\"short\":\"Payment portal & subs\",\"description\":\"Customer-facing payment portal. Subscriptions, one-time payments, and receipts.\",\"sector\":\"Ops\",\"signal\":\"Seed\",\"cluster\":\"business\",\"energy\":50,\"priority\":62,\"tags\":[\"payments\",\"portal\",\"subscriptions\"],\"connections\":[\"invoice\",\"subs\"],\"links\":{}},{\"id\":\"subs\",\"name\":\"Subs\",\"short\":\"Subscription & expense tracker\",\"description\":\"Track recurring subscriptions and expenses. Know where every dollar flows.\",\"sector\":\"Ops\",\"signal\":\"Seed\",\"cluster\":\"business\",\"energy\":40,\"priority\":50,\"tags\":[\"subscriptions\",\"expenses\",\"tracking\"],\"connections\":[\"ledger\"],\"links\":{}},{\"id\":\"forge\",\"name\":\"Forge\",\"short\":\"Asset & theme marketplace\",\"description\":\"Marketplace for digital assets, themes, and creator resources. Where craft meets commerce.\",\"sector\":\"Creator\",\"signal\":\"Seed\",\"cluster\":\"marketplace\",\"energy\":55,\"priority\":65,\"tags\":[\"marketplace\",\"assets\",\"themes\"],\"connections\":[],\"links\":{}},{\"id\":\"tether\",\"name\":\"Tether\",\"short\":\"Relationship tracker\",\"description\":\"Maintain meaningful connections. Track conversations, shared moments, and relationship health.\",\"sector\":\"Life\",\"signal\":\"Seed\",\"cluster\":\"personal\",\"energy\":38,\"priority\":45,\"tags\":[\"relationships\",\"personal\",\"crm\"],\"connections\":[],\"links\":{}},{\"id\":\"draft\",\"name\":\"Draft\",\"short\":\"Fantasy media league\",\"description\":\"Fantasy leagues for movies, shows, books, and music. Compete with friends on cultural consumption.\",\"sector\":\"Play\",\"signal\":\"Seed\",\"cluster\":\"gaming\",\"energy\":62,\"priority\":52,\"tags\":[\"fantasy\",\"media\",\"gaming\"],\"connections\":[],\"links\":{}},{\"id\":\"game-prototype\",\"name\":\"Game #1 (TBD)\",\"short\":\"Original IP prototype\",\"description\":\"First original game IP in development. Details TBD. Prototyping the fun.\",\"sector\":\"Play\",\"signal\":\"Awake\",\"cluster\":\"gaming\",\"energy\":75,\"priority\":48,\"tags\":[\"game\",\"prototype\",\"original\"],\"connections\":[],\"links\":{}},{\"id\":\"honeyhub\",\"name\":\"HoneyHub\",\"short\":\"AI-assisted PM/creator platform\",\"description\":\"AI-powered project management and creator coordination platform. Agents amplifying human creativity at scale.\",\"sector\":\"Meta\",\"signal\":\"Seed\",\"cluster\":\"ecosystem\",\"energy\":58,\"priority\":68,\"tags\":[\"ai\",\"pm\",\"platform\"],\"connections\":[\"honeyconnect\"],\"links\":{}},{\"id\":\"honeyconnect\",\"name\":\"HoneyConnect\",\"short\":\"Networking layer\",\"description\":\"Professional networking and collaboration infrastructure. Connect creators, share resources, build together.\",\"sector\":\"Meta\",\"signal\":\"Seed\",\"cluster\":\"ecosystem\",\"energy\":52,\"priority\":64,\"tags\":[\"networking\",\"collaboration\",\"platform\"],\"connections\":[\"honeyhub\"],\"links\":{}},{\"id\":\"grid-visualizer\",\"name\":\"Grid.Visualizer\",\"short\":\"The neon lattice. Visual representation of The Hive.\",\"description\":\"This website! Interactive visualization of The Grid with cyberpunk aesthetics. Real-time node relationships and signal states.\",\"sector\":\"Creator\",\"signal\":\"Live\",\"cluster\":\"visualization\",\"energy\":90,\"priority\":92,\"tags\":[\"visualization\",\"ui\",\"nextjs\"],\"connections\":[\"honeydrunk-kernel\"],\"links\":{\"repo\":\"https://github.com/honeydrunk/grid-visualizer\",\"live\":\"https://honeydrunk.studio\"}},{\"id\":\"archive-legacy\",\"name\":\"Archive.Legacy\",\"short\":\"Lessons learned. Code that taught us.\",\"description\":\"Retired projects and experiments preserved for reference. Every failure is a lesson; every sunset makes room for sunrise.\",\"sector\":\"Meta\",\"signal\":\"Archive\",\"cluster\":\"history\",\"energy\":20,\"priority\":10,\"tags\":[\"archive\",\"legacy\",\"lessons\"],\"connections\":[],\"links\":{\"docs\":\"https://docs.honeydrunk.studio/archive\"}}]"));}),
"[project]/lib/tokens.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * HoneyDrunk Studios — Brand Tokens
 * Centralized design system tokens for cyberpunk aesthetic
 */ // Brand Colors - Cyberpunk Realism × Neon Craft v1.2
__turbopack_context__.s([
    "colors",
    ()=>colors,
    "containers",
    ()=>containers,
    "default",
    ()=>__TURBOPACK__default__export__,
    "fonts",
    ()=>fonts,
    "gradients",
    ()=>gradients,
    "motion",
    ()=>motion,
    "radius",
    ()=>radius,
    "semantic",
    ()=>semantic,
    "shadows",
    ()=>shadows,
    "spacing",
    ()=>spacing,
    "transitions",
    ()=>transitions,
    "zIndex",
    ()=>zIndex
]);
const colors = {
    // Primary & Secondary Accents
    aurumGold: '#F5B700',
    violetFlux: '#7B61FF',
    electricBlue: '#00D1FF',
    neonPink: '#FF2A6D',
    // Backgrounds
    deepSpace: '#0A0E12',
    gunmetal: '#111827',
    graphite: '#1E293B',
    // Text
    offWhite: '#E5E7EB',
    slateLight: '#94A3B8',
    // Signals
    signalGreen: '#22C55E',
    pulseRed: '#F43F5E',
    // Legacy aliases for backward compatibility
    violetCore: '#7B61FF',
    alertGreen: '#22C55E',
    alertRed: '#F43F5E'
};
const semantic = {
    background: colors.deepSpace,
    foreground: colors.offWhite,
    primary: colors.violetFlux,
    secondary: colors.electricBlue,
    accent: colors.aurumGold,
    muted: colors.gunmetal,
    border: colors.graphite
};
const gradients = {
    goldViolet: 'linear-gradient(135deg, #F5B700 0%, #7B61FF 100%)',
    blueViolet: 'linear-gradient(135deg, #00D1FF 0%, #7B61FF 100%)',
    pinkViolet: 'linear-gradient(135deg, #FF2A6D 0%, #7B61FF 100%)',
    pinkBlue: 'linear-gradient(135deg, #FF2A6D 0%, #00D1FF 100%)',
    deepSpaceOverlay: 'rgba(255, 255, 255, 0.03)'
};
const fonts = {
    display: "'Space Grotesk', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace"
};
const spacing = {
    0: '0',
    1: '0.5rem',
    2: '1rem',
    3: '1.5rem',
    4: '2rem',
    6: '3rem',
    8: '4rem',
    12: '6rem',
    16: '8rem'
};
const radius = {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1.25rem',
    xl: '1.5rem',
    full: '9999px'
};
const shadows = {
    neonGold: '0 0 20px rgba(245, 183, 0, 0.35)',
    neonBlue: '0 0 20px rgba(0, 209, 255, 0.35)',
    neonViolet: '0 0 20px rgba(123, 97, 255, 0.35)',
    neonPink: '0 0 20px rgba(255, 42, 109, 0.5)',
    soft: '0 2px 8px rgba(0, 0, 0, 0.15)',
    medium: '0 4px 16px rgba(0, 0, 0, 0.25)',
    hard: '0 8px 32px rgba(0, 0, 0, 0.35)'
};
const transitions = {
    enter: '160ms ease-out',
    exit: '120ms ease-in',
    spring: {
        stiffness: 260,
        damping: 24
    }
};
const containers = {
    sm: '768px',
    md: '1024px',
    lg: '1280px',
    xl: '1536px'
};
const motion = {
    // Particle configs
    particles: {
        count: {
            low: 50,
            medium: 150,
            high: 300
        },
        speed: {
            slow: 0.5,
            medium: 1,
            fast: 2
        }
    },
    // Animation durations
    durations: {
        instant: 100,
        fast: 200,
        normal: 300,
        slow: 500,
        verySlow: 1000
    }
};
const zIndex = {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    toast: 1600
};
const tokens = {
    colors,
    semantic,
    gradients,
    fonts,
    spacing,
    radius,
    shadows,
    transitions,
    containers,
    motion,
    zIndex
};
const __TURBOPACK__default__export__ = tokens;
}),
"[project]/lib/nodes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * HoneyDrunk Studios — Node Data Utilities
 * Functions for loading, filtering, and transforming node data
 */ __turbopack_context__.s([
    "filterNodes",
    ()=>filterNodes,
    "getAllSectors",
    ()=>getAllSectors,
    "getAllSignals",
    ()=>getAllSignals,
    "getAllTags",
    ()=>getAllTags,
    "getConnectedNodes",
    ()=>getConnectedNodes,
    "getFeaturedNodes",
    ()=>getFeaturedNodes,
    "getNodeById",
    ()=>getNodeById,
    "getNodeStats",
    ()=>getNodeStats,
    "getNodes",
    ()=>getNodes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$nodes$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/data/nodes.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tokens.ts [app-ssr] (ecmascript)");
;
;
// Type assertion for imported JSON
const nodes = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$nodes$2e$json__$28$json$29$__["default"];
/**
 * Signal → Visual mapping
 * Each signal state has distinct visual characteristics
 */ const signalVisualsMap = {
    Seed: {
        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight,
        glowIntensity: 0.2,
        pulseSpeed: 3,
        particleCount: 5,
        opacity: 0.4
    },
    Awake: {
        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].violetFlux,
        glowIntensity: 0.5,
        pulseSpeed: 2,
        particleCount: 15,
        opacity: 0.7
    },
    Wiring: {
        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].aurumGold,
        glowIntensity: 0.7,
        pulseSpeed: 1.5,
        particleCount: 25,
        opacity: 0.85
    },
    Live: {
        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neonPink,
        glowIntensity: 0.75,
        pulseSpeed: 1,
        particleCount: 40,
        opacity: 1.0
    },
    Echo: {
        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].electricBlue,
        glowIntensity: 0.4,
        pulseSpeed: 4,
        particleCount: 10,
        opacity: 0.6
    },
    Archive: {
        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].gunmetal,
        glowIntensity: 0.1,
        pulseSpeed: 0,
        particleCount: 0,
        opacity: 0.3
    }
};
/**
 * Sector → Visual mapping
 */ const sectorVisualsMap = {
    Core: {
        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].violetFlux
    },
    Ops: {
        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].electricBlue
    },
    Creator: {
        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].aurumGold
    },
    Life: {
        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].signalGreen
    },
    Play: {
        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neonPink
    },
    Meta: {
        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
    }
};
/**
 * Seeded pseudo-random number generator
 * Ensures consistent positions across renders
 */ class SeededRandom {
    seed;
    constructor(seed){
        this.seed = seed;
    }
    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }
}
/**
 * Generate deterministic position for a node
 * Uses hex-lattice layout with slight variation
 */ function generateNodePosition(node, index) {
    const rng = new SeededRandom(hashString(node.id));
    // Hex lattice parameters - increased spacing for larger nodes
    const cols = 3;
    const hexWidth = 500;
    const hexHeight = 450;
    const col = index % cols;
    const row = Math.floor(index / cols);
    // Hex offset for alternating rows
    const offsetX = row % 2 === 1 ? hexWidth / 2 : 0;
    // Base position
    let x = col * hexWidth + offsetX;
    let y = row * hexHeight;
    // Add slight random variation (±20px)
    x += (rng.next() - 0.5) * 40;
    y += (rng.next() - 0.5) * 40;
    // Z-depth for parallax (based on energy)
    const z = (node.energy || 50) / 100;
    return {
        x,
        y,
        z
    };
}
/**
 * Simple string hash function for seeding
 */ function hashString(str) {
    let hash = 0;
    for(let i = 0; i < str.length; i++){
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}
function getNodes() {
    return nodes.sort((a, b)=>(b.priority || 0) - (a.priority || 0)).map((node, index)=>({
            ...node,
            position: generateNodePosition(node, index),
            signalVisuals: signalVisualsMap[node.signal],
            sectorVisuals: sectorVisualsMap[node.sector]
        }));
}
function getNodeById(id) {
    const allNodes = getNodes();
    return allNodes.find((node)=>node.id === id);
}
function getFeaturedNodes(count) {
    const allNodes = getNodes();
    const activeNodes = allNodes.filter((node)=>node.signal !== 'Seed' && node.signal !== 'Archive');
    return count ? activeNodes.slice(0, count) : activeNodes;
}
function getAllSectors() {
    return [
        'Core',
        'Ops',
        'Creator',
        'Life',
        'Play',
        'Meta'
    ];
}
function getAllSignals() {
    return [
        'Seed',
        'Awake',
        'Wiring',
        'Live',
        'Echo',
        'Archive'
    ];
}
function getAllTags() {
    const tagSet = new Set();
    nodes.forEach((node)=>{
        node.tags?.forEach((tag)=>tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
}
function filterNodes(sectors, signals, search, tags) {
    let filtered = getNodes();
    if (sectors && sectors.length > 0) {
        filtered = filtered.filter((node)=>sectors.includes(node.sector));
    }
    if (signals && signals.length > 0) {
        filtered = filtered.filter((node)=>signals.includes(node.signal));
    }
    if (search && search.trim()) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter((node)=>node.name.toLowerCase().includes(searchLower) || node.short.toLowerCase().includes(searchLower) || node.description?.toLowerCase().includes(searchLower) || node.tags?.some((tag)=>tag.toLowerCase().includes(searchLower)));
    }
    if (tags && tags.length > 0) {
        filtered = filtered.filter((node)=>node.tags?.some((tag)=>tags.includes(tag)));
    }
    return filtered;
}
function getConnectedNodes(nodeId) {
    const node = getNodeById(nodeId);
    if (!node || !node.connections) return [];
    return node.connections.map((id)=>getNodeById(id)).filter((n)=>n !== undefined);
}
function getNodeStats() {
    const allNodes = getNodes();
    return {
        total: allNodes.length,
        live: allNodes.filter((n)=>n.signal === 'Live').length,
        wiring: allNodes.filter((n)=>n.signal === 'Wiring').length,
        awake: allNodes.filter((n)=>n.signal === 'Awake').length,
        seed: allNodes.filter((n)=>n.signal === 'Seed').length,
        archived: allNodes.filter((n)=>n.signal === 'Archive').length,
        bySector: {
            core: allNodes.filter((n)=>n.sector === 'Core').length,
            ops: allNodes.filter((n)=>n.sector === 'Ops').length,
            creator: allNodes.filter((n)=>n.sector === 'Creator').length,
            life: allNodes.filter((n)=>n.sector === 'Life').length,
            play: allNodes.filter((n)=>n.sector === 'Play').length,
            meta: allNodes.filter((n)=>n.sector === 'Meta').length
        }
    };
}
}),
"[project]/components/NeonGridCanvas.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NeonGridCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * NeonGridCanvas — Background particle field
 * WebGL-powered neon grid with floating particles and scanlines
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tokens.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function NeonGridCanvas({ particleCount = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].particles.count.medium, enableMotion = true, className = '' }) {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const particlesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const animationFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const [prefersReducedMotion, setPrefersReducedMotion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        const handleChange = (e)=>{
            setPrefersReducedMotion(e.matches);
        };
        mediaQuery.addEventListener('change', handleChange);
        return ()=>mediaQuery.removeEventListener('change', handleChange);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        // Set canvas size
        const resizeCanvas = ()=>{
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        // Initialize particles
        const initParticles = ()=>{
            const particles = [];
            const actualCount = prefersReducedMotion || !enableMotion ? Math.floor(particleCount * 0.3) : particleCount;
            for(let i = 0; i < actualCount; i++){
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                    opacity: Math.random() * 0.5 + 0.2,
                    color: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].electricBlue,
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neonPink,
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].violetFlux,
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].aurumGold
                    ][Math.floor(Math.random() * 4)]
                });
            }
            particlesRef.current = particles;
        };
        initParticles();
        // Animation loop
        const animate = ()=>{
            if (!ctx || !canvas) return;
            // Clear canvas
            ctx.fillStyle = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].deepSpace;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Draw grid lines (subtle)
            ctx.strokeStyle = `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].gunmetal}40`;
            ctx.lineWidth = 1;
            const gridSize = 80;
            for(let x = 0; x < canvas.width; x += gridSize){
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for(let y = 0; y < canvas.height; y += gridSize){
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
            // Update and draw particles
            particlesRef.current.forEach((particle)=>{
                // Update position
                if (enableMotion && !prefersReducedMotion) {
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    // Wrap around edges
                    if (particle.x < 0) particle.x = canvas.width;
                    if (particle.x > canvas.width) particle.x = 0;
                    if (particle.y < 0) particle.y = canvas.height;
                    if (particle.y > canvas.height) particle.y = 0;
                }
                // Draw particle with glow
                ctx.save();
                ctx.globalAlpha = particle.opacity;
                // Outer glow
                const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 4);
                gradient.addColorStop(0, particle.color);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fillRect(particle.x - particle.size * 4, particle.y - particle.size * 4, particle.size * 8, particle.size * 8);
                // Core particle
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            // Draw connection lines between nearby particles
            if (enableMotion && !prefersReducedMotion) {
                const maxDistance = 150;
                particlesRef.current.forEach((p1, i)=>{
                    particlesRef.current.slice(i + 1).forEach((p2)=>{
                        const dx = p1.x - p2.x;
                        const dy = p1.y - p2.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        if (distance < maxDistance) {
                            ctx.save();
                            ctx.globalAlpha = (1 - distance / maxDistance) * 0.15;
                            ctx.strokeStyle = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].electricBlue;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.stroke();
                            ctx.restore();
                        }
                    });
                });
            }
            animationFrameRef.current = requestAnimationFrame(animate);
        };
        animate();
        return ()=>{
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [
        particleCount,
        enableMotion,
        prefersReducedMotion
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: `fixed inset-0 pointer-events-none ${className}`,
        style: {
            zIndex: 0
        }
    }, void 0, false, {
        fileName: "[project]/components/NeonGridCanvas.tsx",
        lineNumber: 201,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/NodeGlyph.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NodeGlyph
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * NodeGlyph — Individual node representation
 * Displays a single node with energy glow, pulse, and hover effects
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tokens.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function NodeGlyph({ node, isSelected = false, isConnected = false, onClick, onHover }) {
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pulsePhase, setPulsePhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // Pulse animation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (node.signalVisuals.pulseSpeed === 0) return;
        const interval = setInterval(()=>{
            setPulsePhase((prev)=>(prev + 0.1) % (Math.PI * 2));
        }, 50);
        return ()=>clearInterval(interval);
    }, [
        node.signalVisuals.pulseSpeed
    ]);
    const handleMouseEnter = ()=>{
        setIsHovered(true);
        onHover?.(true);
    };
    const handleMouseLeave = ()=>{
        setIsHovered(false);
        onHover?.(false);
    };
    const baseSize = 80 + (node.energy || 50) * 0.8; // 80-160px based on energy
    const pulseScale = 1 + Math.sin(pulsePhase) * 0.05 * node.signalVisuals.glowIntensity;
    const hoverScale = isHovered ? 1.1 : 1;
    const selectedScale = isSelected ? 1.05 : 1;
    const finalScale = pulseScale * hoverScale * selectedScale;
    const glowSize = baseSize * 2 * node.signalVisuals.glowIntensity;
    const glowOpacity = node.signalVisuals.opacity * 0.4;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute cursor-pointer transition-all duration-200",
        style: {
            left: `${node.position.x}px`,
            top: `${node.position.y}px`,
            transform: `translate(-50%, -50%) scale(${finalScale})`,
            opacity: node.signalVisuals.opacity,
            zIndex: isSelected ? 100 : isHovered ? 50 : 10
        },
        onClick: onClick,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        role: "button",
        tabIndex: 0,
        "aria-label": `${node.name}: ${node.short}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 rounded-full blur-xl pointer-events-none",
                style: {
                    width: `${glowSize}px`,
                    height: `${glowSize}px`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: node.signalVisuals.color,
                    opacity: glowOpacity * (isHovered ? 1.5 : 1),
                    transition: 'opacity 200ms ease-out'
                }
            }, void 0, false, {
                fileName: "[project]/components/NodeGlyph.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative rounded-full border-2 flex flex-col items-center justify-center p-4",
                style: {
                    width: `${baseSize}px`,
                    height: `${baseSize}px`,
                    backgroundColor: `${node.signalVisuals.color}20`,
                    borderColor: node.signalVisuals.color,
                    boxShadow: `0 0 ${glowSize / 2}px ${node.signalVisuals.color}`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-1 rounded-full",
                        style: {
                            backgroundColor: node.signalVisuals.color,
                            opacity: (node.energy || 50) / 200
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/NodeGlyph.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 rounded-full",
                        style: {
                            border: `3px solid ${node.sectorVisuals.color}`,
                            opacity: 0.8,
                            boxShadow: `inset 0 0 10px ${node.sectorVisuals.color}40`
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/NodeGlyph.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative z-10 text-center font-display font-bold text-xs leading-tight px-2",
                        style: {
                            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].offWhite,
                            textShadow: `0 0 8px ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].deepSpace}`,
                            maxWidth: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical'
                        },
                        children: node.name
                    }, void 0, false, {
                        fileName: "[project]/components/NodeGlyph.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/NodeGlyph.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this),
            isHovered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-full mt-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-xs font-mono max-w-xs backdrop-blur-sm pointer-events-none",
                style: {
                    backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].deepSpace}f0`,
                    border: `1px solid ${node.sectorVisuals.color}60`,
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].offWhite
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-xs leading-relaxed",
                    children: node.short
                }, void 0, false, {
                    fileName: "[project]/components/NodeGlyph.tsx",
                    lineNumber: 152,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/NodeGlyph.tsx",
                lineNumber: 142,
                columnNumber: 9
            }, this),
            isHovered && node.links && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-14 left-1/2 transform -translate-x-1/2 flex gap-3",
                children: [
                    node.links.repo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: node.links.repo,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "w-10 h-10 rounded-full bg-gunmetal/80 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform border",
                        style: {
                            borderColor: `${node.signalVisuals.color}60`,
                            backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].gunmetal}cc`
                        },
                        onClick: (e)=>e.stopPropagation(),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-base",
                            children: "🔗"
                        }, void 0, false, {
                            fileName: "[project]/components/NodeGlyph.tsx",
                            lineNumber: 173,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/NodeGlyph.tsx",
                        lineNumber: 160,
                        columnNumber: 13
                    }, this),
                    node.links.live && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: node.links.live,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "w-10 h-10 rounded-full bg-gunmetal/80 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform border",
                        style: {
                            borderColor: `${node.signalVisuals.color}60`,
                            backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].gunmetal}cc`
                        },
                        onClick: (e)=>e.stopPropagation(),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-base",
                            children: "🚀"
                        }, void 0, false, {
                            fileName: "[project]/components/NodeGlyph.tsx",
                            lineNumber: 190,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/NodeGlyph.tsx",
                        lineNumber: 177,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/NodeGlyph.tsx",
                lineNumber: 158,
                columnNumber: 9
            }, this),
            isConnected && !isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 rounded-full border-2 border-dashed animate-pulse",
                style: {
                    borderColor: node.signalVisuals.color,
                    width: `${baseSize + 10}px`,
                    height: `${baseSize + 10}px`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                }
            }, void 0, false, {
                fileName: "[project]/components/NodeGlyph.tsx",
                lineNumber: 198,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/NodeGlyph.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/TheGrid.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TheGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * TheGrid — Main node visualization container
 * Manages layout, pan/zoom, and node interactions
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NodeGlyph$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/NodeGlyph.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function TheGrid({ nodes, selectedNodeId, onNodeClick, className = '' }) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [pan, setPan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [isPanning, setIsPanning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [panStart, setPanStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    // Center view on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!containerRef.current || nodes.length === 0) return;
        const container = containerRef.current;
        // Calculate bounds of all nodes
        const minX = Math.min(...nodes.map((n)=>n.position.x));
        const maxX = Math.max(...nodes.map((n)=>n.position.x));
        const minY = Math.min(...nodes.map((n)=>n.position.y));
        const maxY = Math.max(...nodes.map((n)=>n.position.y));
        const nodesWidth = maxX - minX;
        const nodesHeight = maxY - minY;
        // Center horizontally, but position higher vertically (top-aligned with margin)
        const centerX = (container.clientWidth - nodesWidth) / 2 - minX;
        const topMargin = 150; // Add some space from the top
        const centerY = topMargin - minY;
        setPan({
            x: centerX,
            y: centerY
        });
    }, [
        nodes
    ]);
    // Mouse/touch pan handlers
    const handleMouseDown = (e)=>{
        if (e.button !== 0) return; // Only left click
        setIsPanning(true);
        setPanStart({
            x: e.clientX - pan.x,
            y: e.clientY - pan.y
        });
    };
    const handleMouseMove = (e)=>{
        if (!isPanning) return;
        setPan({
            x: e.clientX - panStart.x,
            y: e.clientY - panStart.y
        });
    };
    const handleMouseUp = ()=>{
        setIsPanning(false);
    };
    // Zoom handler
    const handleWheel = (e)=>{
        e.preventDefault();
        const delta = e.deltaY * -0.001;
        setZoom((prev)=>Math.min(Math.max(0.5, prev + delta), 2));
    };
    // Keyboard navigation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (e)=>{
            const step = 50;
            switch(e.key){
                case 'ArrowUp':
                    setPan((prev)=>({
                            ...prev,
                            y: prev.y + step
                        }));
                    e.preventDefault();
                    break;
                case 'ArrowDown':
                    setPan((prev)=>({
                            ...prev,
                            y: prev.y - step
                        }));
                    e.preventDefault();
                    break;
                case 'ArrowLeft':
                    setPan((prev)=>({
                            ...prev,
                            x: prev.x + step
                        }));
                    e.preventDefault();
                    break;
                case 'ArrowRight':
                    setPan((prev)=>({
                            ...prev,
                            x: prev.x - step
                        }));
                    e.preventDefault();
                    break;
                case '0':
                    setZoom(1);
                    e.preventDefault();
                    break;
                case '+':
                case '=':
                    setZoom((prev)=>Math.min(prev + 0.1, 2));
                    e.preventDefault();
                    break;
                case '-':
                    setZoom((prev)=>Math.max(prev - 0.1, 0.5));
                    e.preventDefault();
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return ()=>window.removeEventListener('keydown', handleKeyDown);
    }, []);
    // Get connected node IDs
    const selectedNode = nodes.find((n)=>n.id === selectedNodeId);
    const connectedNodeIds = new Set(selectedNode?.connections || []);
    // Draw connection lines - now showing ALL connections
    const renderConnections = ()=>{
        const drawnConnections = new Set();
        const allConnections = [];
        nodes.forEach((node)=>{
            if (!node.connections) return;
            node.connections.forEach((connectedId)=>{
                const connectedNode = nodes.find((n)=>n.id === connectedId);
                if (!connectedNode) return;
                // Create a unique key for this connection pair (alphabetically sorted to avoid duplicates)
                const connectionKey = [
                    node.id,
                    connectedId
                ].sort().join('-');
                // Skip if we've already drawn this connection
                if (drawnConnections.has(connectionKey)) return;
                drawnConnections.add(connectionKey);
                // Determine if this connection involves the selected node
                const isHighlighted = node.id === selectedNodeId || connectedId === selectedNodeId;
                allConnections.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                    x1: node.position.x,
                    y1: node.position.y,
                    x2: connectedNode.position.x,
                    y2: connectedNode.position.y,
                    stroke: isHighlighted ? node.signalVisuals.color : node.signalVisuals.color,
                    strokeWidth: isHighlighted ? "3" : "2",
                    strokeDasharray: "5,5",
                    opacity: isHighlighted ? "0.8" : "0.4",
                    className: isHighlighted ? "animate-pulse" : ""
                }, `connection-${connectionKey}`, false, {
                    fileName: "[project]/components/TheGrid.tsx",
                    lineNumber: 151,
                    columnNumber: 11
                }, this));
            });
        });
        if (allConnections.length === 0) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            className: "absolute inset-0 pointer-events-none",
            style: {
                width: '100%',
                height: '100%',
                overflow: 'visible'
            },
            children: allConnections
        }, void 0, false, {
            fileName: "[project]/components/TheGrid.tsx",
            lineNumber: 170,
            columnNumber: 7
        }, this);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: `relative w-full h-full overflow-hidden ${className}`,
        onMouseDown: handleMouseDown,
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseUp,
        onWheel: handleWheel,
        style: {
            cursor: isPanning ? 'grabbing' : 'grab'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 transition-transform duration-100",
                style: {
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    transformOrigin: '0 0'
                },
                children: [
                    renderConnections(),
                    nodes.map((node)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NodeGlyph$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            node: node,
                            isSelected: node.id === selectedNodeId,
                            isConnected: connectedNodeIds.has(node.id),
                            onClick: ()=>onNodeClick?.(node)
                        }, node.id, false, {
                            fileName: "[project]/components/TheGrid.tsx",
                            lineNumber: 209,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/TheGrid.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 left-4 px-6 py-4 rounded-lg bg-gunmetal/80 backdrop-blur-sm border border-slate-light/20 text-xs font-mono text-slate-light",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2",
                        children: "Drag to pan • Scroll to zoom • Arrow keys to navigate"
                    }, void 0, false, {
                        fileName: "[project]/components/TheGrid.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "opacity-60",
                        children: "Press 0 to reset zoom • +/- to zoom in/out"
                    }, void 0, false, {
                        fileName: "[project]/components/TheGrid.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/TheGrid.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 right-4 px-5 py-3 rounded-lg bg-gunmetal/80 backdrop-blur-sm border border-slate-light/20 text-xs font-mono text-slate-light",
                children: [
                    Math.round(zoom * 100),
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/components/TheGrid.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/TheGrid.tsx",
        lineNumber: 184,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/NodeDrawer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NodeDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
/**
 * NodeDrawer — Slide-in detail panel for nodes
 * Clear, readable information with proper spacing
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tokens.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function NodeDrawer({ node, onClose, connectedNodes = [] }) {
    // Close on Escape key
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleEscape = (e)=>{
            if (e.key === 'Escape') onClose();
        };
        if (node) {
            window.addEventListener('keydown', handleEscape);
            return ()=>window.removeEventListener('keydown', handleEscape);
        }
    }, [
        node,
        onClose
    ]);
    if (!node) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: onClose,
                style: {
                    animation: 'fadeIn 200ms ease-out'
                },
                className: "jsx-53b87e07ab6d0cb" + " " + "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
            }, void 0, false, {
                fileName: "[project]/components/NodeDrawer.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].deepSpace,
                    borderLeft: `2px solid ${node.sectorVisuals.color}`,
                    animation: 'slideInRight 300ms ease-out'
                },
                className: "jsx-53b87e07ab6d0cb" + " " + "fixed top-0 right-0 h-full w-full md:w-[600px] z-50 overflow-y-auto shadow-2xl animate-slideInRight",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].deepSpace}f0`,
                            borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight}30`
                        },
                        className: "jsx-53b87e07ab6d0cb" + " " + "sticky top-0 z-10 px-10 py-8 border-b backdrop-blur-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-53b87e07ab6d0cb" + " " + "flex items-start justify-between gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-53b87e07ab6d0cb" + " " + "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                backgroundColor: `${node.sectorVisuals.color}20`,
                                                borderWidth: '1px',
                                                borderColor: node.sectorVisuals.color,
                                                color: node.sectorVisuals.color
                                            },
                                            className: "jsx-53b87e07ab6d0cb" + " " + "inline-block px-5 py-2.5 rounded-full text-xs font-mono mb-4",
                                            children: [
                                                node.sector,
                                                " • ",
                                                node.signal
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/NodeDrawer.tsx",
                                            lineNumber: 61,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                color: node.signalVisuals.color,
                                                textShadow: `0 0 20px ${node.signalVisuals.color}40`
                                            },
                                            className: "jsx-53b87e07ab6d0cb" + " " + "text-3xl font-display font-bold mb-3",
                                            children: node.name
                                        }, void 0, false, {
                                            fileName: "[project]/components/NodeDrawer.tsx",
                                            lineNumber: 73,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].offWhite
                                            },
                                            className: "jsx-53b87e07ab6d0cb" + " " + "text-lg leading-relaxed",
                                            children: node.short
                                        }, void 0, false, {
                                            fileName: "[project]/components/NodeDrawer.tsx",
                                            lineNumber: 83,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/NodeDrawer.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    style: {
                                        backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].gunmetal}80`,
                                        borderWidth: '1px',
                                        borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight}40`,
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
                                    },
                                    "aria-label": "Close",
                                    className: "jsx-53b87e07ab6d0cb" + " " + "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110",
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/components/NodeDrawer.tsx",
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/NodeDrawer.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/NodeDrawer.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-53b87e07ab6d0cb" + " " + "px-10 py-10 space-y-8",
                        children: [
                            node.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jsx-53b87e07ab6d0cb",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
                                        },
                                        className: "jsx-53b87e07ab6d0cb" + " " + "text-sm font-mono uppercase tracking-wider mb-4",
                                        children: "Description"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NodeDrawer.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].offWhite
                                        },
                                        className: "jsx-53b87e07ab6d0cb" + " " + "text-base leading-relaxed",
                                        children: node.description
                                    }, void 0, false, {
                                        fileName: "[project]/components/NodeDrawer.tsx",
                                        lineNumber: 118,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/NodeDrawer.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jsx-53b87e07ab6d0cb" + " " + "grid grid-cols-2 gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].gunmetal}60`,
                                            borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight}30`
                                        },
                                        className: "jsx-53b87e07ab6d0cb" + " " + "p-8 rounded-lg border",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
                                                },
                                                className: "jsx-53b87e07ab6d0cb" + " " + "text-xs font-mono uppercase tracking-wider mb-3",
                                                children: "Energy Level"
                                            }, void 0, false, {
                                                fileName: "[project]/components/NodeDrawer.tsx",
                                                lineNumber: 136,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].electricBlue
                                                },
                                                className: "jsx-53b87e07ab6d0cb" + " " + "text-3xl font-display font-bold",
                                                children: [
                                                    node.energy || 50,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/NodeDrawer.tsx",
                                                lineNumber: 142,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/NodeDrawer.tsx",
                                        lineNumber: 129,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].gunmetal}60`,
                                            borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight}30`
                                        },
                                        className: "jsx-53b87e07ab6d0cb" + " " + "p-8 rounded-lg border",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
                                                },
                                                className: "jsx-53b87e07ab6d0cb" + " " + "text-xs font-mono uppercase tracking-wider mb-3",
                                                children: "Priority"
                                            }, void 0, false, {
                                                fileName: "[project]/components/NodeDrawer.tsx",
                                                lineNumber: 154,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].violetCore
                                                },
                                                className: "jsx-53b87e07ab6d0cb" + " " + "text-3xl font-display font-bold",
                                                children: node.priority || 0
                                            }, void 0, false, {
                                                fileName: "[project]/components/NodeDrawer.tsx",
                                                lineNumber: 160,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/NodeDrawer.tsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/NodeDrawer.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            node.links && Object.keys(node.links).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jsx-53b87e07ab6d0cb",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
                                        },
                                        className: "jsx-53b87e07ab6d0cb" + " " + "text-sm font-mono uppercase tracking-wider mb-4",
                                        children: "Links"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NodeDrawer.tsx",
                                        lineNumber: 169,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-53b87e07ab6d0cb" + " " + "space-y-3",
                                        children: [
                                            node.links.repo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: node.links.repo,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                style: {
                                                    backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].gunmetal}60`,
                                                    borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight}30`,
                                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].offWhite
                                                },
                                                className: "jsx-53b87e07ab6d0cb" + " " + "block px-6 py-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-53b87e07ab6d0cb" + " " + "flex items-center gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-53b87e07ab6d0cb" + " " + "text-2xl",
                                                            children: "📦"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/NodeDrawer.tsx",
                                                            lineNumber: 189,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-53b87e07ab6d0cb",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-53b87e07ab6d0cb" + " " + "font-display font-semibold mb-1",
                                                                    children: "Repository"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/NodeDrawer.tsx",
                                                                    lineNumber: 191,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
                                                                    },
                                                                    className: "jsx-53b87e07ab6d0cb" + " " + "text-sm",
                                                                    children: "View source code"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/NodeDrawer.tsx",
                                                                    lineNumber: 192,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/NodeDrawer.tsx",
                                                            lineNumber: 190,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/NodeDrawer.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/NodeDrawer.tsx",
                                                lineNumber: 177,
                                                columnNumber: 19
                                            }, this),
                                            node.links.docs && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: node.links.docs,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                style: {
                                                    backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].gunmetal}60`,
                                                    borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight}30`,
                                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].offWhite
                                                },
                                                className: "jsx-53b87e07ab6d0cb" + " " + "block px-6 py-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-53b87e07ab6d0cb" + " " + "flex items-center gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-53b87e07ab6d0cb" + " " + "text-2xl",
                                                            children: "📚"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/NodeDrawer.tsx",
                                                            lineNumber: 213,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-53b87e07ab6d0cb",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-53b87e07ab6d0cb" + " " + "font-display font-semibold mb-1",
                                                                    children: "Documentation"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/NodeDrawer.tsx",
                                                                    lineNumber: 215,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
                                                                    },
                                                                    className: "jsx-53b87e07ab6d0cb" + " " + "text-sm",
                                                                    children: "Read the docs"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/NodeDrawer.tsx",
                                                                    lineNumber: 216,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/NodeDrawer.tsx",
                                                            lineNumber: 214,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/NodeDrawer.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/NodeDrawer.tsx",
                                                lineNumber: 201,
                                                columnNumber: 19
                                            }, this),
                                            node.links.live && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: node.links.live,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                style: {
                                                    backgroundColor: `${node.signalVisuals.color}20`,
                                                    borderColor: node.signalVisuals.color,
                                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].offWhite
                                                },
                                                className: "jsx-53b87e07ab6d0cb" + " " + "block px-6 py-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-53b87e07ab6d0cb" + " " + "flex items-center gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-53b87e07ab6d0cb" + " " + "text-2xl",
                                                            children: "🚀"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/NodeDrawer.tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-53b87e07ab6d0cb",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-53b87e07ab6d0cb" + " " + "font-display font-semibold mb-1",
                                                                    children: "Live Site"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/NodeDrawer.tsx",
                                                                    lineNumber: 239,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
                                                                    },
                                                                    className: "jsx-53b87e07ab6d0cb" + " " + "text-sm",
                                                                    children: "Visit live deployment"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/NodeDrawer.tsx",
                                                                    lineNumber: 240,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/NodeDrawer.tsx",
                                                            lineNumber: 238,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/NodeDrawer.tsx",
                                                    lineNumber: 236,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/NodeDrawer.tsx",
                                                lineNumber: 225,
                                                columnNumber: 19
                                            }, this),
                                            node.links.board && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: node.links.board,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                style: {
                                                    backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].gunmetal}60`,
                                                    borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight}30`,
                                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].offWhite
                                                },
                                                className: "jsx-53b87e07ab6d0cb" + " " + "block px-6 py-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-53b87e07ab6d0cb" + " " + "flex items-center gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-53b87e07ab6d0cb" + " " + "text-2xl",
                                                            children: "📋"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/NodeDrawer.tsx",
                                                            lineNumber: 261,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jsx-53b87e07ab6d0cb",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-53b87e07ab6d0cb" + " " + "font-display font-semibold mb-1",
                                                                    children: "Project Board"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/NodeDrawer.tsx",
                                                                    lineNumber: 263,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
                                                                    },
                                                                    className: "jsx-53b87e07ab6d0cb" + " " + "text-sm",
                                                                    children: "Track progress"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/NodeDrawer.tsx",
                                                                    lineNumber: 264,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/NodeDrawer.tsx",
                                                            lineNumber: 262,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/NodeDrawer.tsx",
                                                    lineNumber: 260,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/NodeDrawer.tsx",
                                                lineNumber: 249,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/NodeDrawer.tsx",
                                        lineNumber: 175,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/NodeDrawer.tsx",
                                lineNumber: 168,
                                columnNumber: 13
                            }, this),
                            node.tags && node.tags.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jsx-53b87e07ab6d0cb",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
                                        },
                                        className: "jsx-53b87e07ab6d0cb" + " " + "text-sm font-mono uppercase tracking-wider mb-4",
                                        children: "Tags"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NodeDrawer.tsx",
                                        lineNumber: 278,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-53b87e07ab6d0cb" + " " + "flex flex-wrap gap-3",
                                        children: node.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].electricBlue}15`,
                                                    borderWidth: '1px',
                                                    borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].electricBlue}40`,
                                                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].electricBlue
                                                },
                                                className: "jsx-53b87e07ab6d0cb" + " " + "px-5 py-2.5 rounded-full text-sm font-mono",
                                                children: tag
                                            }, tag, false, {
                                                fileName: "[project]/components/NodeDrawer.tsx",
                                                lineNumber: 286,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/NodeDrawer.tsx",
                                        lineNumber: 284,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/NodeDrawer.tsx",
                                lineNumber: 277,
                                columnNumber: 13
                            }, this),
                            connectedNodes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jsx-53b87e07ab6d0cb",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
                                        },
                                        className: "jsx-53b87e07ab6d0cb" + " " + "text-sm font-mono uppercase tracking-wider mb-4",
                                        children: [
                                            "Connected Nodes (",
                                            connectedNodes.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/NodeDrawer.tsx",
                                        lineNumber: 306,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-53b87e07ab6d0cb" + " " + "space-y-3",
                                        children: connectedNodes.map((connected)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].gunmetal}60`,
                                                    borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight}30`
                                                },
                                                className: "jsx-53b87e07ab6d0cb" + " " + "px-8 py-5 rounded-lg border",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            color: connected.signalVisuals.color
                                                        },
                                                        className: "jsx-53b87e07ab6d0cb" + " " + "font-display font-semibold mb-2",
                                                        children: connected.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/NodeDrawer.tsx",
                                                        lineNumber: 322,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
                                                        },
                                                        className: "jsx-53b87e07ab6d0cb" + " " + "text-sm",
                                                        children: connected.short
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/NodeDrawer.tsx",
                                                        lineNumber: 328,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, connected.id, true, {
                                                fileName: "[project]/components/NodeDrawer.tsx",
                                                lineNumber: 314,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/NodeDrawer.tsx",
                                        lineNumber: 312,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/NodeDrawer.tsx",
                                lineNumber: 305,
                                columnNumber: 13
                            }, this),
                            node.cluster && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jsx-53b87e07ab6d0cb",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
                                        },
                                        className: "jsx-53b87e07ab6d0cb" + " " + "text-sm font-mono uppercase tracking-wider mb-4",
                                        children: "Cluster"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NodeDrawer.tsx",
                                        lineNumber: 340,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].gunmetal}60`,
                                            borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight}30`,
                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].offWhite
                                        },
                                        className: "jsx-53b87e07ab6d0cb" + " " + "px-8 py-5 rounded-lg border inline-block",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "jsx-53b87e07ab6d0cb" + " " + "font-mono",
                                            children: node.cluster
                                        }, void 0, false, {
                                            fileName: "[project]/components/NodeDrawer.tsx",
                                            lineNumber: 354,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/NodeDrawer.tsx",
                                        lineNumber: 346,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/NodeDrawer.tsx",
                                lineNumber: 339,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/NodeDrawer.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/NodeDrawer.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "53b87e07ab6d0cb",
                children: "@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes slideInRight{0%{transform:translate(100%)}to{transform:translate(0)}}"
            }, void 0, false, void 0, this)
        ]
    }, void 0, true);
}
}),
"[project]/components/FilterChips.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FilterChips,
    "getSectorColor",
    ()=>getSectorColor,
    "getSignalColor",
    ()=>getSignalColor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * FilterChips — Filter UI for sectors and signals
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tokens.ts [app-ssr] (ecmascript)");
'use client';
;
;
function FilterChips({ options, selected, onChange, getColor, label }) {
    const toggleOption = (option)=>{
        if (selected.includes(option)) {
            onChange(selected.filter((s)=>s !== option));
        } else {
            onChange([
                ...selected,
                option
            ]);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs font-mono uppercase tracking-wider",
                style: {
                    color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/components/FilterChips.tsx",
                lineNumber: 36,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2",
                children: options.map((option)=>{
                    const isSelected = selected.includes(option);
                    const chipColor = getColor?.(option) || __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].electricBlue;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>toggleOption(option),
                        className: "px-5 py-2.5 rounded-full text-xs font-mono transition-all duration-200 hover:scale-105",
                        style: {
                            backgroundColor: isSelected ? `${chipColor}30` : `${chipColor}10`,
                            borderWidth: '1px',
                            borderColor: isSelected ? chipColor : `${chipColor}40`,
                            color: isSelected ? chipColor : `${chipColor}cc`
                        },
                        children: option
                    }, option, false, {
                        fileName: "[project]/components/FilterChips.tsx",
                        lineNumber: 49,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/components/FilterChips.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FilterChips.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
function getSectorColor(sector) {
    const map = {
        Core: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].violetFlux,
        Ops: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].electricBlue,
        Creator: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].aurumGold,
        Life: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].signalGreen,
        Play: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neonPink,
        Meta: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
    };
    return map[sector];
}
function getSignalColor(signal) {
    const map = {
        Seed: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight,
        Awake: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].violetFlux,
        Wiring: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].aurumGold,
        Live: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].neonPink,
        Echo: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].electricBlue,
        Archive: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].gunmetal
    };
    return map[signal];
}
}),
"[project]/app/nodes/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NodesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
/**
 * /nodes — Full Grid view with filters
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nodes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/nodes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NeonGridCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/NeonGridCanvas.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TheGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/TheGrid.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NodeDrawer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/NodeDrawer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FilterChips$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FilterChips.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tokens.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
function NodesContent() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [selectedSectors, setSelectedSectors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedSignals, setSelectedSignals] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [selectedNodeId, setSelectedNodeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])();
    const [showFilters, setShowFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Initialize from URL params
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const sectorsParam = searchParams.get('sectors');
        const signalsParam = searchParams.get('signals');
        const searchParam = searchParams.get('search');
        if (sectorsParam) {
            setSelectedSectors(sectorsParam.split(','));
        }
        if (signalsParam) {
            setSelectedSignals(signalsParam.split(','));
        }
        if (searchParam) {
            setSearchQuery(searchParam);
        }
    }, [
        searchParams
    ]);
    // Update URL when filters change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const params = new URLSearchParams();
        if (selectedSectors.length > 0) {
            params.set('sectors', selectedSectors.join(','));
        }
        if (selectedSignals.length > 0) {
            params.set('signals', selectedSignals.join(','));
        }
        if (searchQuery) {
            params.set('search', searchQuery);
        }
        const newUrl = params.toString() ? `/nodes?${params.toString()}` : '/nodes';
        router.replace(newUrl, {
            scroll: false
        });
    }, [
        selectedSectors,
        selectedSignals,
        searchQuery,
        router
    ]);
    const allSectors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nodes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllSectors"])();
    const allSignals = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nodes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllSignals"])();
    const filteredNodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nodes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["filterNodes"])(selectedSectors.length > 0 ? selectedSectors : undefined, selectedSignals.length > 0 ? selectedSignals : undefined, searchQuery || undefined);
    const selectedNode = selectedNodeId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nodes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNodeById"])(selectedNodeId) : null;
    const connectedNodes = selectedNodeId ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nodes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getConnectedNodes"])(selectedNodeId) : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-screen overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NeonGridCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                particleCount: 200,
                enableMotion: true
            }, void 0, false, {
                fileName: "[project]/app/nodes/page.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "absolute top-0 left-0 right-0 z-30 px-12 py-6 border-b backdrop-blur-sm",
                style: {
                    borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight}20`,
                    backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].deepSpace}90`
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "text-xl font-display font-bold px-4 py-2",
                            style: {
                                background: `linear-gradient(135deg, ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].aurumGold} 0%, ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].violetCore} 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            },
                            children: "← HoneyDrunk"
                        }, void 0, false, {
                            fileName: "[project]/app/nodes/page.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: searchQuery,
                                    onChange: (e)=>setSearchQuery(e.target.value),
                                    placeholder: "Search nodes...",
                                    className: "px-6 py-4 rounded-lg text-sm font-mono focus:outline-none focus:ring-2",
                                    style: {
                                        backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].gunmetal}80`,
                                        borderWidth: '1px',
                                        borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight}40`,
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].offWhite
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/nodes/page.tsx",
                                    lineNumber: 105,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowFilters(!showFilters),
                                    className: "px-6 py-4 rounded-lg text-sm font-mono transition-all duration-200 hover:scale-105 whitespace-nowrap",
                                    style: {
                                        backgroundColor: showFilters ? `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].violetCore}30` : `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].gunmetal}80`,
                                        borderWidth: '1px',
                                        borderColor: showFilters ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].violetCore : `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight}40`,
                                        color: showFilters ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].violetCore : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
                                    },
                                    children: [
                                        showFilters ? '✓ ' : '',
                                        "Filters (",
                                        filteredNodes.length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/nodes/page.tsx",
                                    lineNumber: 121,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/nodes/page.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/nodes/page.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/nodes/page.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            showFilters && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "absolute top-24 left-8 z-30 w-72 p-6 rounded-lg backdrop-blur-sm border space-y-6",
                style: {
                    backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].deepSpace}90`,
                    borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight}30`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FilterChips$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        label: "Sector",
                        options: allSectors,
                        selected: selectedSectors,
                        onChange: setSelectedSectors,
                        getColor: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FilterChips$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSectorColor"]
                    }, void 0, false, {
                        fileName: "[project]/app/nodes/page.tsx",
                        lineNumber: 152,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FilterChips$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        label: "Signal",
                        options: allSignals,
                        selected: selectedSignals,
                        onChange: setSelectedSignals,
                        getColor: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FilterChips$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSignalColor"]
                    }, void 0, false, {
                        fileName: "[project]/app/nodes/page.tsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this),
                    (selectedSectors.length > 0 || selectedSignals.length > 0 || searchQuery) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setSelectedSectors([]);
                            setSelectedSignals([]);
                            setSearchQuery('');
                        },
                        className: "w-full px-5 py-4 rounded-lg text-xs font-mono transition-all duration-200 hover:scale-105",
                        style: {
                            backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].gunmetal}60`,
                            borderWidth: '1px',
                            borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight}40`,
                            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
                        },
                        children: "Clear All Filters"
                    }, void 0, false, {
                        fileName: "[project]/app/nodes/page.tsx",
                        lineNumber: 171,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/nodes/page.tsx",
                lineNumber: 144,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-20 w-full h-full pt-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TheGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    nodes: filteredNodes,
                    selectedNodeId: selectedNodeId,
                    onNodeClick: (node)=>setSelectedNodeId(node.id)
                }, void 0, false, {
                    fileName: "[project]/app/nodes/page.tsx",
                    lineNumber: 194,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/nodes/page.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-24 right-8 z-30 p-6 rounded-lg backdrop-blur-sm border space-y-4",
                style: {
                    backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].deepSpace}90`,
                    borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight}30`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs font-mono uppercase tracking-wider",
                        style: {
                            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
                        },
                        children: "Legend"
                    }, void 0, false, {
                        fileName: "[project]/app/nodes/page.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs font-mono",
                            style: {
                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].slateLight
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "font-semibold mb-3 text-sm",
                                    children: "Signals"
                                }, void 0, false, {
                                    fileName: "[project]/app/nodes/page.tsx",
                                    lineNumber: 219,
                                    columnNumber: 13
                                }, this),
                                allSignals.map((signal)=>{
                                    const descriptions = {
                                        Seed: 'Queued/Backlog',
                                        Awake: 'Planning/Starting',
                                        Wiring: 'Active Development',
                                        Live: 'Production/Deployed',
                                        Echo: 'Maintenance/Iteration',
                                        Archive: 'Retired/Deprecated'
                                    };
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start gap-3 mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-3 h-3 rounded-full mt-0.5 flex-shrink-0",
                                                style: {
                                                    backgroundColor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FilterChips$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSignalColor"])(signal)
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/nodes/page.tsx",
                                                lineNumber: 231,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-semibold",
                                                        style: {
                                                            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["colors"].offWhite
                                                        },
                                                        children: signal
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/nodes/page.tsx",
                                                        lineNumber: 236,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs opacity-75",
                                                        children: descriptions[signal]
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/nodes/page.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/nodes/page.tsx",
                                                lineNumber: 235,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, signal, true, {
                                        fileName: "[project]/app/nodes/page.tsx",
                                        lineNumber: 230,
                                        columnNumber: 17
                                    }, this);
                                })
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/nodes/page.tsx",
                            lineNumber: 218,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/nodes/page.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/nodes/page.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NodeDrawer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                node: selectedNode || null,
                onClose: ()=>setSelectedNodeId(undefined),
                connectedNodes: connectedNodes
            }, void 0, false, {
                fileName: "[project]/app/nodes/page.tsx",
                lineNumber: 249,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/nodes/page.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
function NodesPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-deep-space"
        }, void 0, false, {
            fileName: "[project]/app/nodes/page.tsx",
            lineNumber: 260,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NodesContent, {}, void 0, false, {
            fileName: "[project]/app/nodes/page.tsx",
            lineNumber: 261,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/nodes/page.tsx",
        lineNumber: 260,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7f994082._.js.map
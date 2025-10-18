module.exports = [
"[project]/.next-internal/server/app/signal/page/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/lib/tokens.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/app/signal/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/app/signal/page.tsx'\n\nUnexpected token. Did you mean `{'}'}` or `&rbrace;`?");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
"[project]/app/signal/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/signal/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b73bc9e4._.js.map
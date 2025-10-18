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
"[project]/app/signal/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SignalPage,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tokens.ts [app-rsc] (ecmascript)");
;
;
;
const metadata = {
    title: 'Signal — HoneyDrunk Studios',
    description: 'Devlog and changelog for HoneyDrunk Studios projects.'
};
function SignalPage() {
    // In production, this would pull from commits/releases
    const signals = [
        {
            date: '2025-10-18',
            title: 'The Grid v1.0 — Initial Launch',
            desc: 'Launched The Grid: interactive node visualization with neon cyberpunk aesthetics. Featured 10 initial nodes across Core, Ops, Creator, Life, Play, and Meta sectors.',
            tags: [
                'launch',
                'grid',
                'core'
            ]
        },
        {
            date: '2025-10-17',
            title: 'Signal System Implementation',
            desc: 'Implemented the Signal state system for tracking node lifecycle: Seed → Awake → Wiring → Live → Echo → Archive. Each state has distinct visual characteristics.',
            tags: [
                'feature',
                'visualization'
            ]
        },
        {
            date: '2025-10-16',
            title: 'Brand System Finalized',
            desc: 'Locked in the cyberpunk realism color palette: Aurum Gold, Electric Blue, Violet Core against Deep Space. Zero-bloat typography with Space Grotesk, Inter, and JetBrains Mono.',
            tags: [
                'brand',
                'design'
            ]
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen p-8",
        style: {
            backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["colors"].deepSpace,
            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["colors"].offWhite
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-3xl mx-auto space-y-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "inline-block text-sm font-mono hover:underline",
                            style: {
                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["colors"].electricBlue
                            },
                            children: "← Back to Grid"
                        }, void 0, false, {
                            fileName: "[project]/app/signal/page.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-5xl font-display font-bold",
                            style: {
                                background: `linear-gradient(135deg, ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["colors"].aurumGold} 0%, ${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["colors"].violetCore} 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            },
                            children: "Signal Feed"
                        }, void 0, false, {
                            fileName: "[project]/app/signal/page.tsx",
                            lineNumber: 47,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-lg",
                            style: {
                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["colors"].slateLight
                            },
                            children: "Build-in-public devlog. Every commit tells a story."
                        }, void 0, false, {
                            fileName: "[project]/app/signal/page.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/signal/page.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-6",
                    children: signals.map((signal, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "p-6 rounded-lg border",
                            style: {
                                backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["colors"].gunmetal}60`,
                                borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["colors"].slateLight}30`
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs font-mono mb-2",
                                    style: {
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["colors"].slateLight
                                    },
                                    children: signal.date
                                }, void 0, false, {
                                    fileName: "[project]/app/signal/page.tsx",
                                    lineNumber: 74,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-display font-bold mb-3",
                                    children: signal.title
                                }, void 0, false, {
                                    fileName: "[project]/app/signal/page.tsx",
                                    lineNumber: 81,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mb-4",
                                    style: {
                                        color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["colors"].slateLight
                                    },
                                    children: signal.desc
                                }, void 0, false, {
                                    fileName: "[project]/app/signal/page.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2",
                                    children: signal.tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-3 py-1 rounded-full text-xs font-mono",
                                            style: {
                                                backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["colors"].electricBlue}20`,
                                                borderWidth: '1px',
                                                borderColor: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["colors"].electricBlue,
                                                color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["colors"].electricBlue
                                            },
                                            children: tag
                                        }, tag, false, {
                                            fileName: "[project]/app/signal/page.tsx",
                                            lineNumber: 91,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/signal/page.tsx",
                                    lineNumber: 89,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/app/signal/page.tsx",
                            lineNumber: 66,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/signal/page.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 rounded-lg border text-center",
                    style: {
                        backgroundColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["colors"].gunmetal}40`,
                        borderColor: `${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["colors"].slateLight}20`
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tokens$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["colors"].slateLight
                        },
                        children: "More signals incoming. Subscribe to stay updated."
                    }, void 0, false, {
                        fileName: "[project]/app/signal/page.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/signal/page.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/signal/page.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/signal/page.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
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
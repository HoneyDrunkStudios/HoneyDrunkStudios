/**
 * HoneyDrunk Studios — Brand Tokens
 * Centralized design system tokens for cyberpunk aesthetic
 */

// Brand Colors - Cyberpunk Realism × Neon Craft v1.2
export const colors = {
  // Primary & Secondary Accents
  aurumGold: '#F5B700',        // Aurum Gold - signature HoneyDrunk hue
  violetFlux: '#7B61FF',       // Violet Flux - matches TattedDev link glow
  electricBlue: '#00D1FF',     // Electric Edge - data strokes, active grid beams
  neonPink: '#FF2A6D',         // Neon Pink - cyberpunk accent, hot highlights
  chromeTeal: '#14B8A6',       // Chrome Teal - industrial mech, metallic systems
  synthMagenta: '#D946EF',     // Synth Magenta - AI/digital intelligence, computational
  matrixGreen: '#00FF41',      // Matrix Green - HoneyNet security sector, terminal aesthetic

  // Backgrounds
  deepSpace: '#0A0E12',        // Deep Space - base 950
  gunmetal: '#111827',         // Gunmetal - section contrast / card base
  graphite: '#1E293B',         // Graphite - divider lines, subtle borders

  // Text
  offWhite: '#E5E7EB',         // Off-White - default readable text
  slateLight: '#94A3B8',       // Slate Light - muted secondary text

  // Signals
  signalGreen: '#22C55E',      // Signal Green - online/connected states
  pulseRed: '#F43F5E',         // Pulse Red - critical/error states
  archiveRed: '#FF3B3B',       // Archive Red - bright error red for archived/terminated states

  // Legacy aliases for backward compatibility
  violetCore: '#7B61FF',       // Alias for violetFlux
  alertGreen: '#22C55E',       // Alias for signalGreen
  alertRed: '#F43F5E',         // Alias for pulseRed
} as const;

// Semantic color mappings
export const semantic = {
  background: colors.deepSpace,
  foreground: colors.offWhite,
  primary: colors.violetFlux,
  secondary: colors.electricBlue,
  accent: colors.aurumGold,
  muted: colors.gunmetal,
  border: colors.graphite,
} as const;

// Gradients - unify the neon aesthetic
export const gradients = {
  goldViolet: 'linear-gradient(135deg, #F5B700 0%, #7B61FF 100%)',  // Gold → Violet Flux
  blueViolet: 'linear-gradient(135deg, #00D1FF 0%, #7B61FF 100%)',  // Blue → Violet Flux
  pinkViolet: 'linear-gradient(135deg, #FF2A6D 0%, #7B61FF 100%)',  // Pink → Violet Flux (cyberpunk)
  pinkBlue: 'linear-gradient(135deg, #FF2A6D 0%, #00D1FF 100%)',    // Pink → Blue (electric)
  deepSpaceOverlay: 'rgba(255, 255, 255, 0.03)',                    // Translucent noise + scanlines
} as const;

// Typography
export const fonts = {
  display: "'Space Grotesk', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;

// Layout scale (8pt grid)
export const spacing = {
  0: '0',
  1: '0.5rem',   // 8px
  2: '1rem',     // 16px
  3: '1.5rem',   // 24px
  4: '2rem',     // 32px
  6: '3rem',     // 48px
  8: '4rem',     // 64px
  12: '6rem',    // 96px
  16: '8rem',    // 128px
} as const;

// Border radius
export const radius = {
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1.25rem',
  xl: '1.5rem',
  full: '9999px',
} as const;

// Shadows with neon edge
export const shadows = {
  neonGold: '0 0 20px rgba(245, 183, 0, 0.35)',
  neonBlue: '0 0 20px rgba(0, 209, 255, 0.35)',
  neonViolet: '0 0 20px rgba(123, 97, 255, 0.35)',
  neonPink: '0 0 20px rgba(255, 42, 109, 0.5)',       // Hot pink glow
  neonTeal: '0 0 20px rgba(20, 184, 166, 0.4)',       // Chrome teal glow
  neonMagenta: '0 0 20px rgba(217, 70, 239, 0.4)',    // Synth magenta glow
  neonMatrixGreen: '0 0 20px rgba(0, 255, 65, 0.45)', // Matrix green glow - security
  soft: '0 2px 8px rgba(0, 0, 0, 0.15)',
  medium: '0 4px 16px rgba(0, 0, 0, 0.25)',
  hard: '0 8px 32px rgba(0, 0, 0, 0.35)',
} as const;

// Transitions
export const transitions = {
  enter: '160ms ease-out',
  exit: '120ms ease-in',
  spring: {
    stiffness: 260,
    damping: 24,
  },
} as const;

// Container widths
export const containers = {
  sm: '768px',
  md: '1024px',
  lg: '1280px',
  xl: '1536px',
} as const;

// Motion settings
export const motion = {
  // Particle configs
  particles: {
    count: {
      low: 50,
      medium: 150,
      high: 300,
    },
    speed: {
      slow: 0.5,
      medium: 1,
      fast: 2,
    },
  },
  // Animation durations
  durations: {
    instant: 100,
    fast: 200,
    normal: 300,
    slow: 500,
    verySlow: 1000,
  },
} as const;

// Z-index scale
export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  toast: 1600,
} as const;

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
  zIndex,
};

export default tokens;

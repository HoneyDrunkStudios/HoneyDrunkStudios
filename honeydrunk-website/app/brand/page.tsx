import Header from '@/components/Header';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import { colors } from '@/lib/tokens';

export const metadata = {
  title: 'Brand Kit — HoneyDrunk Studios',
  description: 'Press kit, logos, colors, and brand guidelines for HoneyDrunk Studios.',
};

export default function BrandPage() {
  const brandColors = [
    { name: 'Aurum Gold', hex: colors.aurumGold, desc: 'Signature HoneyDrunk hue - accents, highlights' },
    { name: 'Signal Green', hex: colors.signalGreen, desc: 'Terminal green - Live/operational states' },
    { name: 'Electric Blue', hex: colors.electricBlue, desc: 'Data strokes, active grid beams, links' },
    { name: 'Violet Flux', hex: colors.violetFlux, desc: 'Secondary accent - gradients, glows' },
    { name: 'Neon Pink', hex: colors.neonPink, desc: 'Archive state - retired nodes, hot accents' },
    { name: 'Deep Space', hex: colors.deepSpace, desc: 'Base background (#0A0E12)' },
    { name: 'Gunmetal', hex: colors.gunmetal, desc: 'Section contrast, card backgrounds' },
    { name: 'Slate Light', hex: colors.slateLight, desc: 'Muted secondary text' },
    { name: 'Off-White', hex: colors.offWhite, desc: 'Default readable text' },
  ];

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: colors.deepSpace, color: colors.offWhite }}>
      {/* Background */}
      <div className="fixed inset-0">
        <NeonGridCanvas particleCount={100} enableMotion={true} />
      </div>

      {/* Header */}
      <Header />

      {/* Content */}
      <div className="relative z-10 pt-20 md:pt-32 px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-4xl mx-auto space-y-10 md:space-y-16">
          {/* Page Title */}
          <header className="space-y-4 md:space-y-6">
            <h1
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold py-2 md:py-4"
            style={{
              background: `linear-gradient(135deg, ${colors.aurumGold} 0%, ${colors.violetCore} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Brand Kit
          </h1>
          <p className="text-base md:text-lg px-1 md:px-2" style={{ color: colors.slateLight }}>
            Press kit, logos, color tokens, and usage guidelines.
          </p>
        </header>

        {/* Colors */}
        <section className="space-y-6 md:space-y-8">
          <div>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-3 md:mb-4"
              style={{
                color: colors.electricBlue,
              }}
            >
              Color Palette
            </h2>
            <p className="px-1 md:px-2 text-sm md:text-base" style={{ color: colors.slateLight }}>
              Cyberpunk Realism. Neon glows against deep space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
            {brandColors.map((color) => (
              <div
                key={color.name}
                className="p-5 md:p-8 rounded-lg border"
                style={{
                  backgroundColor: `${colors.gunmetal}60`,
                  borderColor: `${colors.slateLight}30`,
                }}
              >
                <div className="flex items-center gap-4 md:gap-6 mb-3 md:mb-4">
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 flex-shrink-0"
                    style={{
                      backgroundColor: color.hex,
                      borderColor: colors.slateLight,
                    }}
                  />
                  <div>
                    <div className="font-display font-semibold text-base md:text-lg">
                      {color.name}
                    </div>
                    <div className="font-mono text-xs md:text-sm" style={{ color: colors.slateLight }}>
                      {color.hex}
                    </div>
                  </div>
                </div>
                <div className="text-xs md:text-sm" style={{ color: colors.slateLight }}>
                  {color.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-4 md:space-y-6">
          <h2
            className="text-2xl md:text-3xl font-display font-bold mb-4 md:mb-6"
            style={{
              color: colors.electricBlue,
            }}
          >
            Typography
          </h2>

          <div className="space-y-3 md:space-y-4">
            <div
              className="p-5 md:p-6 rounded-lg border"
              style={{
                backgroundColor: `${colors.gunmetal}60`,
                borderColor: `${colors.slateLight}30`,
              }}
            >
              <div className="font-display text-2xl md:text-4xl font-bold mb-2">
                Space Grotesk
              </div>
              <div className="text-xs md:text-sm" style={{ color: colors.slateLight }}>
                Display typography • Weights: 600, 700
              </div>
            </div>

            <div
              className="p-5 md:p-6 rounded-lg border"
              style={{
                backgroundColor: `${colors.gunmetal}60`,
                borderColor: `${colors.slateLight}30`,
              }}
            >
              <div className="text-xl md:text-2xl mb-2">
                Inter
              </div>
              <div className="text-xs md:text-sm" style={{ color: colors.slateLight }}>
                Body/UI typography • Weights: 400, 500, 600
              </div>
            </div>

            <div
              className="p-5 md:p-6 rounded-lg border"
              style={{
                backgroundColor: `${colors.gunmetal}60`,
                borderColor: `${colors.slateLight}30`,
              }}
            >
              <div className="font-mono text-lg md:text-xl mb-2">
                JetBrains Mono
              </div>
              <div className="text-xs md:text-sm" style={{ color: colors.slateLight }}>
                Monospace accents • Weights: 400, 500
              </div>
            </div>
          </div>
        </section>

        {/* Voice & Tone */}
        <section className="space-y-4 md:space-y-6">
          <h2
            className="text-2xl md:text-3xl font-display font-bold mb-4 md:mb-6"
            style={{
              color: colors.electricBlue,
            }}
          >
            Voice & Tone
          </h2>

          <div
            className="p-5 md:p-6 rounded-lg border space-y-4"
            style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${colors.slateLight}30`,
            }}
          >
            <div>
              <div className="font-display font-semibold mb-2">Declarative</div>
              <div style={{ color: colors.slateLight }}>
                Confident, terminal-like. Short lines. Every word earns its keep.
              </div>
            </div>

            <div>
              <div className="font-display font-semibold mb-2">Build-in-Public</div>
              <div style={{ color: colors.slateLight }}>
                Transparent. Honest. Share the process, not just the polish.
              </div>
            </div>

            <div>
              <div className="font-display font-semibold mb-2">Zero-Bloat</div>
              <div style={{ color: colors.slateLight }}>
                Ruthlessly minimal. No fluff. Structure over decoration.
              </div>
            </div>
          </div>
        </section>

        {/* Taglines */}
        <section className="space-y-4 md:space-y-6">
          <h2
            className="text-2xl md:text-3xl font-display font-bold mb-4 md:mb-6"
            style={{
              color: colors.electricBlue,
            }}
          >
            Taglines
          </h2>

          <div className="space-y-2 font-display text-base md:text-xl">
            <div>Boot. Build. Refactor. Evolve.</div>
            <div>Structure meets soul. Code meets art.</div>
            <div>Build-in-Public • Zero-Bloat • Agents Amplify</div>
          </div>
        </section>
        </div>
      </div>
    </div>
  );
}

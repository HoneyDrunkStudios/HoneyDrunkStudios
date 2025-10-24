import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import { colors } from '@/lib/tokens';

export const metadata = {
  title: 'Brand Kit — HoneyDrunk Studios',
  description: 'Press kit, logos, colors, and brand guidelines for HoneyDrunk Studios.',
};

export default function BrandPage() {
  const brandColors = [
    { name: 'Aurum Gold', hex: colors.aurumGold, desc: 'Signature HoneyDrunk hue - accents, highlights' },
    { name: 'Violet Flux', hex: colors.violetFlux, desc: 'Core systems - gradients, glows' },
    { name: 'Electric Blue', hex: colors.electricBlue, desc: 'Operations - data strokes, active grid beams' },
    { name: 'Signal Green', hex: colors.signalGreen, desc: 'Terminal green - Live/operational states' },
    { name: 'Neon Pink', hex: colors.neonPink, desc: 'Play sector - gaming, hot accents' },
    { name: 'Chrome Teal', hex: colors.chromeTeal, desc: 'Mech sector - industrial, metallic, robotics' },
    { name: 'Synth Magenta', hex: colors.synthMagenta, desc: 'AI sector - digital intelligence, computational' },
    { name: 'Deep Space', hex: colors.deepSpace, desc: 'Base background (#0A0E12)' },
    { name: 'Gunmetal', hex: colors.gunmetal, desc: 'Section contrast, card backgrounds' },
    { name: 'Slate Light', hex: colors.slateLight, desc: 'Muted secondary text' },
    { name: 'Off-White', hex: colors.offWhite, desc: 'Default readable text' },
  ];

  const sectorColors = [
    { name: 'Core', hex: colors.violetFlux, desc: 'Foundation systems - kernel, data, transport' },
    { name: 'Ops', hex: colors.electricBlue, desc: 'Operations - pipelines, deploy, monitoring' },
    { name: 'Creator', hex: colors.aurumGold, desc: 'Creative tools - content, marketing, signals' },
    { name: 'Life', hex: colors.signalGreen, desc: 'Personal wellness - relationships, health' },
    { name: 'Play', hex: colors.neonPink, desc: 'Gaming & entertainment - games, media' },
    { name: 'Mech', hex: colors.chromeTeal, desc: 'Robotics & hardware - servos, simulation' },
    { name: 'Meta', hex: colors.slateLight, desc: 'Ecosystem tools - hub, grid, connect' },
    { name: 'AI', hex: colors.synthMagenta, desc: 'Intelligence & agents - AgentKit, automation' },
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
        <div className="max-w-4xl mx-auto space-y-10 md:space-y-12">
          {/* Page Title */}
          <header className="space-y-3 md:space-y-4">
            <h1
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold py-2 md:py-4 holographic-text"
          >
            Brand Kit
          </h1>
          <p className="text-base md:text-lg px-1 md:px-2" style={{ color: colors.slateLight }}>
            Press kit, logos, color tokens, and usage guidelines.
          </p>
        </header>

        {/* Colors */}
        <section className="space-y-5 md:space-y-6">
          <div>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-2 md:mb-3"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-4 md:mt-5">
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
                      boxShadow: `0 0 20px ${color.hex}40`,
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

        {/* Sector Colors */}
        <section className="space-y-5 md:space-y-6">
          <div>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-2 md:mb-3"
              style={{
                color: colors.aurumGold,
              }}
            >
              Sector Colors
            </h2>
            <p className="px-1 md:px-2 text-sm md:text-base" style={{ color: colors.slateLight }}>
              Each sector in The Grid has its own signature color for visual categorization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-4 md:mt-5">
            {sectorColors.map((sector) => (
              <div
                key={sector.name}
                className="p-5 md:p-6 rounded-lg border transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: `${colors.gunmetal}60`,
                  borderColor: sector.hex,
                  borderWidth: '2px',
                  boxShadow: `0 0 15px ${sector.hex}20`,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-full border-2 flex-shrink-0"
                    style={{
                      backgroundColor: sector.hex,
                      borderColor: sector.hex,
                      boxShadow: `0 0 20px ${sector.hex}60, inset 0 0 10px ${sector.hex}40`,
                    }}
                  />
                  <div className="font-display font-bold text-lg" style={{ color: sector.hex }}>
                    {sector.name}
                  </div>
                </div>
                <div className="text-xs" style={{ color: colors.slateLight }}>
                  {sector.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-5 md:space-y-6">
          <div>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-2 md:mb-3"
              style={{
                color: colors.violetFlux,
              }}
            >
              Typography
            </h2>
            <p className="px-1 md:px-2 text-sm md:text-base" style={{ color: colors.slateLight }}>
              Display, body, and monospace fonts for terminal aesthetic.
            </p>
          </div>

          <div className="space-y-3 md:space-y-4 mt-4 md:mt-5">
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
        <section className="space-y-5 md:space-y-6">
          <div>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-2 md:mb-3"
              style={{
                color: colors.neonPink,
              }}
            >
              Voice & Tone
            </h2>
            <p className="px-1 md:px-2 text-sm md:text-base" style={{ color: colors.slateLight }}>
              Declarative. Terminal-like. Every word earns its keep.
            </p>
          </div>

          <div
            className="p-5 md:p-6 rounded-lg border space-y-4 mt-4 md:mt-5"
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
        <section className="space-y-5 md:space-y-6">
          <div>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-2 md:mb-3"
              style={{
                color: colors.signalGreen,
              }}
            >
              Taglines
            </h2>
            <p className="px-1 md:px-2 text-sm md:text-base" style={{ color: colors.slateLight }}>
              Core brand statements and messaging pillars.
            </p>
          </div>

          <div className="space-y-4 font-display text-base md:text-xl mt-4 md:mt-5">
            <div className="p-4 md:p-5 rounded-lg border" style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${colors.slateLight}30`,
            }}>
              Boot. Build. Refactor. Evolve.
            </div>
            <div className="p-4 md:p-5 rounded-lg border" style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${colors.slateLight}30`,
            }}>
              Structure meets soul. Code meets art.
            </div>
            <div className="p-4 md:p-5 rounded-lg border" style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${colors.slateLight}30`,
            }}>
              Build-in-Public • Zero-Bloat • Agents Amplify
            </div>
          </div>
        </section>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <LandingFooter />
      </div>
    </div>
  );
}

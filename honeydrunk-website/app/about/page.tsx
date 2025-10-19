import Header from '@/components/Header';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import { colors } from '@/lib/tokens';

export const metadata = {
  title: 'About — HoneyDrunk Studios',
  description: 'The manifesto, philosophy, and story behind HoneyDrunk Studios.',
};

export default function AboutPage() {
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
        <div className="max-w-3xl mx-auto space-y-10 md:space-y-16">
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
            About The Hive
          </h1>
        </header>

        {/* Manifesto */}
        <section className="space-y-6 md:space-y-8">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 md:mb-6"
            style={{
              color: colors.electricBlue,
            }}
          >
            Manifesto
          </h2>

          <div className="space-y-5 md:space-y-6 text-base md:text-lg leading-relaxed px-1 md:px-2">
            <p>
              HoneyDrunk Studios is a living experiment in structured creativity.
              Every line of code, every system, every decision documented and
              shared. This is build-in-public at its core.
            </p>

            <p>
              The Grid represents our interconnected systems: nodes pulsing with
              energy, linked by purpose, evolving in real-time. Each node is a
              project, a tool, an idea brought to life. Some blaze bright. Some
              rest dormant. All serve the whole.
            </p>

            <p>
              We believe in <strong>zero-bloat architecture</strong>. Every
              dependency must earn its keep. Every feature must justify its
              existence. Ruthless minimalism meets radical clarity.
            </p>

            <p>
              We believe <strong>agents amplify human creativity</strong>, not
              replace it. AI as collaborator. Code as conversation. Systems that
              augment soul, not automate it away.
            </p>

            <p>
              Structure meets soul. Code meets art. This is the way.
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="space-y-6 md:space-y-8">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-display font-bold pt-4 md:pt-8 pb-3 md:pb-4"
            style={{ color: colors.electricBlue }}
          >
            Core Pillars
          </h2>

          <div className="grid gap-5 md:gap-8 px-1 md:px-2">
            {[
              {
                title: 'Build-in-Public',
                desc: 'Transparent development. Every commit, every decision, every lesson shared openly. Progress over perfection.',
              },
              {
                title: 'Zero-Bloat',
                desc: 'Ruthless minimalism. No frameworks for the sake of frameworks. No dependencies without justification. Structure over decoration.',
              },
              {
                title: 'Agents Amplify',
                desc: 'AI as creative collaborator, not replacement. Systems that augment human capability while preserving soul and intention.',
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="p-5 md:p-8 rounded-lg border"
                style={{
                  backgroundColor: `${colors.gunmetal}60`,
                  borderColor: `${colors.slateLight}30`,
                }}
              >
                <h3 className="text-lg md:text-xl font-display font-bold mb-3 md:mb-4">
                  {pillar.title}
                </h3>
                <p className="text-sm md:text-base" style={{ color: colors.slateLight }}>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <section className="space-y-6 md:space-y-8">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-display font-bold pt-4 md:pt-8 pb-3 md:pb-4"
            style={{ color: colors.electricBlue }}
          >
            Philosophy
          </h2>

          <div
            className="p-5 md:p-8 rounded-lg border space-y-5 md:space-y-6"
            style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${colors.slateLight}30`,
            }}
          >
            <blockquote
              className="text-lg md:text-xl font-display italic border-l-4 pl-4 md:pl-6 py-2"
              style={{ borderColor: colors.violetCore }}
            >
              &ldquo;Every line earns its keep. Every system serves the whole. Every
              failure teaches the path forward.&rdquo;
            </blockquote>

            <div className="space-y-3 md:space-y-4 text-xs md:text-sm px-1 md:px-2" style={{ color: colors.slateLight }}>
              <p>
                We don&apos;t chase trends. We build foundations. We don&apos;t add features
                for their own sake. We solve real problems with elegant systems.
              </p>
              <p>
                Code is craft. Systems are art. Infrastructure is poetry when done
                right.
              </p>
            </div>
          </div>
        </section>

        {/* Signal States */}
        <section className="space-y-6 md:space-y-8">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-display font-bold pt-4 md:pt-8 pb-3 md:pb-4"
            style={{ color: colors.electricBlue }}
          >
            The Signal System
          </h2>

          <p className="px-1 md:px-2 text-sm md:text-base" style={{ color: colors.slateLight }}>
            Every node broadcasts its state. Every pulse tells a story.
          </p>

          <div className="grid gap-4 md:gap-6 px-1 md:px-2">
            {[
              { signal: 'Seed', color: colors.slateLight, desc: 'Concept stage. Idea germinating. Potential energy.' },
              { signal: 'Awake', color: colors.violetCore, desc: 'Prototyping. Testing. Finding its form.' },
              { signal: 'Wiring', color: colors.aurumGold, desc: 'Active development. Systems connecting. Energy building.' },
              { signal: 'Live', color: colors.signalGreen, desc: 'Production. Full power. Serving its purpose.' },
              { signal: 'Echo', color: colors.electricBlue, desc: 'Maintenance mode. Stable. Occasional updates.' },
              { signal: 'Archive', color: colors.neonPink, desc: 'Retired. Lessons preserved. Memory honored.' },
            ].map((item) => (
              <div
                key={item.signal}
                className="flex items-start gap-4 md:gap-6 p-4 md:p-6 rounded-lg border"
                style={{
                  backgroundColor: `${colors.gunmetal}40`,
                  borderColor: `${item.color}30`,
                }}
              >
                <div
                  className="font-mono font-bold text-xs md:text-sm min-w-[60px] md:min-w-[80px]"
                  style={{
                    color: item.color,
                    textShadow: `0 0 10px ${item.color}60`,
                  }}
                >
                  {item.signal}
                </div>
                <div className="text-xs md:text-sm" style={{ color: colors.slateLight }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer
          className="pt-8 md:pt-12 border-t text-center font-mono text-xs md:text-sm"
          style={{ borderColor: `${colors.slateLight}30`, color: colors.slateLight }}
        >
          <p className="py-3 md:py-4">Boot. Build. Refactor. Evolve.</p>
        </footer>
        </div>
      </div>
    </div>
  );
}

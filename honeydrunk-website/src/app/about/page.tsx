import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';
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
        <div className="max-w-3xl mx-auto space-y-8 md:space-y-12">
          {/* Page Title */}
          <header className="space-y-3 md:space-y-4 text-center md:text-left">
            <h1
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold py-2 md:py-4 holographic-text"
          >
            About The Hive
          </h1>
        </header>

        {/* Manifesto */}
        <section className="space-y-4 md:space-y-6 text-center md:text-left">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-display font-bold"
            style={{
              color: colors.electricBlue,
              marginBottom: '24px',
            }}
          >
            Manifesto
          </h2>

          <div className="space-y-4 md:space-y-5 text-base md:text-lg leading-relaxed px-1 md:px-2">
            <p>
              HoneyDrunk Studios is a living experiment in structured creativity — a studio, a network, and a movement.
              We build open systems, creative tools, and original worlds that prove you can be disciplined and imaginative.
            </p>

            <p>
              The Grid is our infrastructure and our metaphor — interlinked Nodes pulsing with energy, linked by purpose, evolving in real time.
              Some Nodes are frameworks. Some are apps. Some are games. All feed the Hive.
            </p>

            <p>
              <strong>Our mission is simple:</strong>
              <br />
              Build tools that empower creators. Build experiences that inspire players. Share everything.
            </p>
          </div>
        </section>

        {/* Vision */}
        <section className="space-y-4 md:space-y-6 text-center md:text-left">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-display font-bold pt-2 md:pt-4"
            style={{ color: colors.electricBlue, marginBottom: '24px' }}
          >
            Vision
          </h2>

          <div className="space-y-4 md:space-y-5 text-base md:text-lg leading-relaxed px-1 md:px-2">
            <p>
              HoneyDrunk Studios exists at the intersection of software, art, and autonomy.
            </p>

            <p>
              We develop <strong>open-source technologies</strong> that help indie developers, studios, and creators build smarter, faster, and with purpose.
            </p>

            <p>
              We design <strong>apps and platforms</strong> that turn fragmented workflows into creative ecosystems.
            </p>

            <p>
              We craft <strong>games and simulations</strong> where story, system, and soul converge.
            </p>

            <p>
              We explore <strong>AI as a collaborator</strong>, not a replacement — agents that amplify imagination, not automate it away.
            </p>

            <p>
              Each release, each experiment, each line of code is part of one evolving organism: <strong>The Grid</strong>.
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="space-y-4 md:space-y-6 text-center md:text-left">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-display font-bold pt-2 md:pt-4"
            style={{ color: colors.electricBlue, marginBottom: '24px' }}
          >
            Core Pillars
          </h2>

          <div className="grid gap-4 md:gap-6 px-1 md:px-2">
            {[
              {
                title: 'Build in Public',
                desc: 'Transparent development. Every Node, every decision, every failure shared openly. Visibility breeds accountability; accountability breeds craft.',
              },
              {
                title: 'Zero-Bloat',
                desc: 'Ruthless minimalism. Systems must serve a purpose or be deleted. Architecture over aesthetics. Efficiency as art form.',
              },
              {
                title: 'Agents Amplify',
                desc: 'AI as co-creator. From observability to robotics, agents strengthen human intention, not override it.',
              },
              {
                title: 'Cross-Domain Creativity',
                desc: 'Code, design, music, narrative, and infrastructure coexist here. Our games use the same DNA as our apps — modular, reusable, alive.',
              },
              {
                title: 'Sustainable Independence',
                desc: 'Open-source foundations. Cost-disciplined architecture. Freedom through simplicity — not through venture capital.',
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
        <section className="text-center md:text-left">
          <h2
            className="text-2xl md:text-3xl lg:text-4xl font-display font-bold pt-2 md:pt-4"
            style={{ color: colors.electricBlue, marginBottom: '24px' }}
          >
            Philosophy
          </h2>

          <div
            className="px-5 md:px-8 pt-3 md:pt-4 pb-5 md:pb-8 rounded-lg border"
            style={{
              backgroundColor: `${colors.gunmetal}60`,
              borderColor: `${colors.slateLight}30`,
            }}
          >
            <blockquote
              className="text-lg md:text-xl font-display italic border-l-4 pl-4 md:pl-6 mb-4 md:mb-6"
              style={{ borderColor: colors.violetCore, paddingLeft: '12px' }}
            >
              &ldquo;Every line earns its keep. Every system serves the whole. Every
              failure teaches the path forward.&rdquo;
            </blockquote>

            <div className="space-y-1 md:space-y-1.5 text-sm md:text-base px-1 md:px-2" style={{ color: colors.slateLight }}>
              <p>
                We don&apos;t chase trends. We build foundations.
              </p>
              <p>
                We don&apos;t add noise. We refine the signal.
              </p>
              <p>
                Code is craft. Systems are art. Infrastructure is story.
              </p>
            </div>
          </div>
        </section>

        {/* Signal States */}
        <section className="space-y-4 md:space-y-6 text-center md:text-left">
          <div style={{ marginBottom: '24px' }}>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-display font-bold pt-2 md:pt-4"
              style={{ color: colors.electricBlue, marginBottom: '12px' }}
            >
              The Signal System
            </h2>
            <p className="px-1 md:px-2 text-sm md:text-base" style={{ color: colors.slateLight }}>
              Every Node broadcasts its state. Every pulse tells a story.
            </p>
          </div>

          <div className="grid gap-4 md:gap-6 px-1 md:px-2">
            {[
              { signal: 'Seed', color: colors.slateLight, desc: 'Concept stage — idea germinating, potential energy.' },
              { signal: 'Awake', color: colors.violetCore, desc: 'Prototyping and testing — form emerging.' },
              { signal: 'Wiring', color: colors.aurumGold, desc: 'Active development — systems connecting, energy building.' },
              { signal: 'Live', color: colors.signalGreen, desc: 'In production — serving its purpose.' },
              { signal: 'Echo', color: colors.electricBlue, desc: 'Maintenance — stable, occasional updates.' },
              { signal: 'Archive', color: colors.neonPink, desc: 'Retired — lessons preserved, memory honored.' },
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

        {/* In Short */}
        <section className="space-y-4 md:space-y-6 text-center md:text-left">
          <div
            className="p-6 md:p-8 rounded-lg border-2 text-center space-y-3"
            style={{
              backgroundColor: `${colors.gunmetal}80`,
              borderColor: `${colors.electricBlue}60`,
              boxShadow: `0 0 30px ${colors.electricBlue}20`,
            }}
          >
            <h2
              className="text-2xl md:text-3xl font-display font-bold"
              style={{ color: colors.electricBlue }}
            >
              In Short
            </h2>
            <div className="max-w-2xl mx-auto space-y-3 text-base md:text-lg leading-relaxed">
              <p>
                HoneyDrunk Studios is a <strong>build-in-public cyberpunk collective</strong>.
              </p>
              <p>
                We make systems, tools, and worlds that connect creators, code, and consciousness.
              </p>
              <p>
                Every Node we ship — from SDK to game — strengthens the same Hive.
              </p>
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

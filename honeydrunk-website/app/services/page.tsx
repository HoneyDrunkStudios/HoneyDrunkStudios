import Header from '@/components/Header';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import ServicesList from '@/components/ServicesList';
import { colors } from '@/lib/tokens';
import { getNodes } from '@/lib/nodes';
import type { VisualNode, Sector } from '@/lib/types';

export const metadata = {
  title: 'Services — HoneyDrunk Studios',
  description: 'All HoneyDrunk Studios projects, tools, and systems.',
};

export default function ServicesPage() {
  const allNodes = getNodes();

  // Group by sector
  const nodesBySector = allNodes.reduce((acc, node) => {
    if (!acc[node.sector]) {
      acc[node.sector] = [];
    }
    acc[node.sector].push(node);
    return acc;
  }, {} as Record<Sector, VisualNode[]>);

  const sectorColors: Record<string, string> = {
    Core: colors.violetFlux,
    Ops: colors.electricBlue,
    Creator: colors.aurumGold,
    Life: colors.signalGreen,
    Play: colors.neonPink,
    Meta: colors.slateLight,
  };

  const signalColors: Record<string, string> = {
    Seed: colors.slateLight,
    Awake: colors.violetFlux,
    Wiring: colors.aurumGold,
    Live: colors.signalGreen,
    Echo: colors.electricBlue,
    Archive: colors.neonPink,
  };

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
        <div className="max-w-6xl mx-auto space-y-10 md:space-y-16">
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
              Services & Systems
            </h1>
            <p className="text-base md:text-lg px-1 md:px-2" style={{ color: colors.slateLight }}>
              All projects, tools, and systems in the HoneyDrunk ecosystem.
            </p>
          </header>

          {/* Sectors */}
          <ServicesList 
            nodesBySector={nodesBySector}
            sectorColors={sectorColors}
            signalColors={signalColors}
          />
        </div>
      </div>
    </div>
  );
}

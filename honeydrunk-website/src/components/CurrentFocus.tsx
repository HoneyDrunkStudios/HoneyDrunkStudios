import Link from 'next/link';
import { colors } from '@/lib/tokens';

const projects = [
  { name: 'Pocket Quests', status: 'Mobile app · in development', href: '/nodes/pocket-quests', text: 'Everyday plans become quests in an illustrated adventure journal. The merged field-journal redesign adds a guided first adventure, a layered traveler wardrobe and a full-screen room with earned keepsakes. Daily planning and operator quest tools continue to support V1 development. Pocket Quests is a working name; the app is not publicly released.' },
  { name: 'Magic Shop', status: 'Unity game · in development', href: '/nodes/game-prototype', text: 'Run a magical shop and guild hall: appraise finds, craft goods, and get to know returning adventurers. The latest development build puts an old guild house with a café-like interior in a modern magical city, with a new cast in contemporary clothes and seated guests beside the hearth. The full look still awaits a founder playtest. Working title; no public release announced.' },
  { name: 'A shared fantasy universe', status: 'Worldbuilding · visual development', href: '/sectors/honeyplay', text: 'A connected setting for original games, with elemental powers, peoples, creatures and places. Current work develops the universe’s lore, bestiary and visual language, giving each game a world to draw from.' },
  { name: 'Shared software foundations', status: 'Libraries · engineering tools', href: '/nodes?sector=Core', text: 'Reusable .NET libraries and studio tooling support the apps and games: account services, data access, messaging, secrets, code standards and build workflows. Recent merged work includes the .NET 11 migration, read-only agent operations and a durable memory provider. Published packages, development services and future concepts each have their own status in the Grid.' },
];

export default function CurrentFocus() {
  return (
    <section className="px-8 py-12" aria-labelledby="current-focus-title" style={{ backgroundColor: colors.deepSpace }}>
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-sm" style={{ color: colors.electricBlue, marginBottom: '12px' }}>STUDIO UPDATE · NOVEMBER 13, 2026</p>
        <h1 id="current-focus-title" className="font-display text-3xl font-bold" style={{ color: colors.offWhite, marginBottom: '16px' }}>What we’re working on</h1>
        <p style={{ color: colors.slateLight, marginBottom: '24px' }}>Useful apps, original games, and the worlds and software behind them. Here’s what’s taking shape at HoneyDrunk Studios.</p>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map(project => (
            <Link key={project.name} href={project.href} className="rounded-lg border p-6 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4" style={{ borderColor: `${colors.electricBlue}40`, backgroundColor: colors.gunmetal, outlineColor: colors.electricBlue }}>
              <p className="font-mono text-xs" style={{ color: colors.aurumGold, marginBottom: '8px' }}>{project.status}</p>
              <h2 className="font-display text-xl font-bold" style={{ color: colors.offWhite, marginBottom: '12px' }}>{project.name}</h2>
              <p style={{ color: colors.slateLight }}>{project.text}</p>
            </Link>
          ))}
        </div>
        <p style={{ color: colors.slateLight, marginTop: '24px' }}>Explore the Grid for project details, or read Signal for dated studio updates. Development progress and concept art are shared along the way; public releases are announced separately.</p>
      </div>
    </section>
  );
}

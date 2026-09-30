import Link from 'next/link';
import { colors } from '@/lib/tokens';

const tracks = [
  { name: 'Pocket Quests', status: 'Local implementation', href: '/nodes/pocket-quests', text: 'Personal quests, planning, progression, and profile rewards now have a local app and backend implementation. Full signed-in quest use and native-device testing remain to be verified. Pocket Quests is a working name.' },
  { name: 'Magic Shop', status: 'First playable', href: '/nodes/game-prototype', text: 'A first-person magical shop game with a committed Unity first playable. Appraisal, crafting, and shop management follow the completed game design. Playtest results and player acceptance remain to be confirmed. Magic Shop is a working title.' },
  { name: 'AI learning', status: 'Curriculum ready', href: 'https://github.com/HoneyDrunkStudios/HoneyDrunk.Architecture/tree/main/learning/paths/ai-engineering', text: 'A 32-week path with hands-on experiments and a progress tracker. The aim is to understand, build, and evaluate AI systems; the learning sessions are not yet completed.' },
  { name: 'Hands-on robotics', status: 'Getting started', href: 'https://github.com/HoneyDrunkStudios/HoneyDrunk.Architecture', text: 'Start with the Arduino kit already on hand: identify the kit and its guide, then work through small physical experiments. No robot build has been completed yet.' },
];

export default function CurrentFocus() {
  return (
    <section className="px-8 py-12" aria-labelledby="current-focus-title" style={{ backgroundColor: colors.deepSpace }}>
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-sm" style={{ color: colors.electricBlue, marginBottom: '12px' }}>STUDIO NOTES · SEPTEMBER 30, 2026</p>
        <h2 id="current-focus-title" className="font-display text-3xl font-bold" style={{ color: colors.offWhite, marginBottom: '16px' }}>What we’re working on</h2>
        <p style={{ color: colors.slateLight, marginBottom: '24px' }}>Four tracks for the next chapter: useful products, original worlds, and learning by making. These are current intentions, not promises of shipped features.</p>
        <div className="grid gap-6 md:grid-cols-2">
          {tracks.map(track => (
            <Link key={track.name} href={track.href} className="rounded-lg border p-6" style={{ borderColor: `${colors.electricBlue}40`, backgroundColor: colors.gunmetal }}>
              <p className="font-mono text-xs" style={{ color: colors.aurumGold, marginBottom: '8px' }}>{track.status}</p>
              <h3 className="font-display text-xl font-bold" style={{ color: colors.offWhite, marginBottom: '12px' }}>{track.name}</h3>
              <p style={{ color: colors.slateLight }}>{track.text}</p>
            </Link>
          ))}
        </div>
        <p style={{ color: colors.slateLight, marginTop: '24px' }}>Shared foundations are progressing too: HoneyDrunk.UI source is now public, with a platform-neutral theme contract and reusable native components. Its type checks, lint, and five tests pass; npm packages have not been published. Pocket Quests uses local snapshots pinned to a source revision with file integrity checks, with fourteen app tests and responsive web checks passing. Native and complete signed-in quest use remain to be verified. The shared Identity account service is under review. HoneyHub remains archived.</p>
        <Link href="https://tatteddev.com/blog/i-ran-my-dev-studio-from-the-couch/" className="inline-block font-mono underline" style={{ color: colors.electricBlue, marginTop: '12px' }}>Read the personal devlog: I Ran My Dev Studio From the Couch →</Link>
      </div>
    </section>
  );
}

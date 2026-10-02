import Link from 'next/link';
import { colors } from '@/lib/tokens';

const tracks = [
  { name: 'Pocket Quests', status: 'Product planning', href: '/nodes/pocket-quests', text: 'A virtual self and world shaped by real-life goals, daily quests, and exploration. The repository is configured; app implementation comes next. Pocket Quests is the internal working name.' },
  { name: 'The first game', status: 'Concept planning', href: '/nodes/game-prototype', text: 'An original shared universe, starting with a small playable slice. Genre and scope are still open. Blender scene experiments have proved part of the art workflow; a playable game is still ahead.' },
  { name: 'AI learning', status: 'Curriculum ready', href: 'https://github.com/HoneyDrunkStudios/HoneyDrunk.Studio/tree/main/learning/paths/ai-engineering', text: 'A 32-week path with hands-on experiments and a progress tracker. The aim is to understand, build, and evaluate AI systems; the learning sessions are not yet completed.' },
  { name: 'Hands-on robotics', status: 'Getting started', href: 'https://github.com/HoneyDrunkStudios/HoneyDrunk.Studio', text: 'Start with the Arduino kit already on hand: identify the kit and its guide, then work through small physical experiments. No robot build has been completed yet.' },
];

export default function CurrentFocus() {
  return (
    <section className="px-8 py-12" aria-labelledby="current-focus-title" style={{ backgroundColor: colors.deepSpace }}>
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-sm" style={{ color: colors.electricBlue, marginBottom: '12px' }}>STUDIO NOTES · SEPTEMBER 26, 2026</p>
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
        <p style={{ color: colors.slateLight, marginTop: '24px' }}>Recently completed: 61 public NuGet packages published and verified, downstream upgrades, website security fixes, and review-runner repairs. HoneyHub is archived.</p>
        <Link href="https://tatteddev.com/blog/i-ran-my-dev-studio-from-the-couch/" className="inline-block font-mono underline" style={{ color: colors.electricBlue, marginTop: '12px' }}>Read the personal devlog: I Ran My Dev Studio From the Couch →</Link>
      </div>
    </section>
  );
}

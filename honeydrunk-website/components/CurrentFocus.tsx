import Link from 'next/link';
import { colors } from '@/lib/tokens';

const tracks = [
  { name: 'Pocket Quests', status: 'Prototype approved · app in progress', href: '/nodes/pocket-quests', text: 'A dark, modern fantasy direction in charcoal, cream and gold. A private, session-only prototype explores the character sheet, quests, XP feedback and optional timers. Production implementation is local and in progress; native-device, real-sign-in and dependency acceptance remain open. Pocket Quests is a working name.' },
  { name: 'Magic Shop', status: 'Graybox and engine updates merged', href: '/nodes/game-prototype', text: 'The Unity first playable now has a four-room layout, modernized engine foundations and fixes from a scripted keyboard-and-mouse playtest. Founder assessment of feel, lighting and readability remains open. Magic Shop is a working title.' },
  { name: 'AI engineering', status: 'Curriculum ready', href: '/sectors/AI', text: 'An ordered route with 32 exercise units, practical experiments and evidence-based reviews. The learning tracker records demonstrated work; a prepared curriculum does not mean the courses are complete.' },
  { name: 'Robotics and electronics', status: 'Getting started', href: '/sectors/Cyberware', text: 'Start with the Arduino kit already on hand: identify the board and its guide, then work through small physical experiments. No completed robot build is claimed.' },
  { name: 'Cybersecurity and ethical hacking', status: 'Curriculum ready', href: '/sectors/HoneyNet', text: 'An ordered, hands-on route beginning with networking foundations and authorized practice. Progress requires coursework and practical evidence; no course completion is claimed.' },
];

export default function CurrentFocus() {
  return (
    <section className="px-8 py-12" aria-labelledby="current-focus-title" style={{ backgroundColor: colors.deepSpace }}>
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-sm" style={{ color: colors.electricBlue, marginBottom: '12px' }}>STUDIO NOTES · OCTOBER 3, 2026</p>
        <h2 id="current-focus-title" className="font-display text-3xl font-bold" style={{ color: colors.offWhite, marginBottom: '16px' }}>What we’re working on</h2>
        <p style={{ color: colors.slateLight, marginBottom: '24px' }}>Five tracks for the next chapter: useful products, original worlds, and learning by making. These are current intentions, not promises of shipped features.</p>
        <div className="grid gap-6 md:grid-cols-2">
          {tracks.map(track => (
            <Link key={track.name} href={track.href} className="rounded-lg border p-6" style={{ borderColor: `${colors.electricBlue}40`, backgroundColor: colors.gunmetal }}>
              <p className="font-mono text-xs" style={{ color: colors.aurumGold, marginBottom: '8px' }}>{track.status}</p>
              <h3 className="font-display text-xl font-bold" style={{ color: colors.offWhite, marginBottom: '12px' }}>{track.name}</h3>
              <p style={{ color: colors.slateLight }}>{track.text}</p>
            </Link>
          ))}
        </div>
        <p style={{ color: colors.slateLight, marginTop: '24px' }}>Shared foundations are progressing too. HoneyDrunk.UI has public source, with further accessibility and reusable component work under local review; npm packages remain unpublished. HoneyDrunk.Actions owns the current reusable CI workflows; the older Pipelines project is deprecated. Living product and game documents guide selected work, with review retained and the old ticket-generation pipeline retired. HoneyHub remains archived.</p>
      </div>
    </section>
  );
}

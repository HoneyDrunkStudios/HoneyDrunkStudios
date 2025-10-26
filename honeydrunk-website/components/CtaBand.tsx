'use client';

/**
 * CtaBand — "Join the Hive" email subscription band
 */

// import { useState } from 'react'; // Commented out until newsletter form is enabled
import Link from 'next/link';
import { colors } from '@/lib/tokens';

export default function CtaBand() {
  // Commented out until newsletter form is enabled
  // const [email, setEmail] = useState('');
  // const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //
  //   // TODO: Hook up to email provider
  //   console.log('[Analytics] email_subscribe_attempt', email);
  //
  //   setStatus('submitting');
  //
  //   // Simulate submission
  //   setTimeout(() => {
  //     setStatus('success');
  //     setEmail('');
  //   }, 1000);
  // };

  return (
    <section
      className="w-full py-20 px-8"
      style={{
        backgroundColor: colors.deepSpace,
        borderTop: `2px solid ${colors.aurumGold}30`,
        borderBottom: `2px solid ${colors.aurumGold}30`,
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-2xl md:text-3xl font-display font-bold uppercase tracking-wide"
          style={{
            color: colors.aurumGold,
            textShadow: `0 0 20px ${colors.aurumGold}60`,
            marginBottom: '16px',
          }}
        >
          Boot. Build. Refactor. Evolve.
        </h2>

        <p
          className="text-sm md:text-base font-mono"
          style={{ color: colors.slateLight, marginBottom: '24px' }}
        >
          Get updates as Nodes go live.
        </p>

        {/* Email form - Coming Soon */}
        <div
          className="mb-6 p-6 font-mono text-sm rounded-lg"
          style={{
            color: colors.aurumGold,
            backgroundColor: `${colors.aurumGold}10`,
            border: `2px solid ${colors.aurumGold}40`,
            boxShadow: `0 0 20px ${colors.aurumGold}20`,
          }}
        >
          <div className="text-base mb-2">Coming Soon</div>
          <div style={{ color: colors.slateLight }}>
            Newsletter subscription launching soon. Follow us on X for updates.
          </div>
        </div>
        {/* Email form - Commented out for future use
        {status !== 'success' ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === 'submitting'}
              className="px-6 py-3 font-mono text-sm border-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 min-w-[280px]"
              style={{
                color: colors.offWhite,
                borderColor: colors.aurumGold,
                backgroundColor: `${colors.gunmetal}80`,
                boxShadow: `0 0 15px ${colors.aurumGold}20`,
              }}
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="font-mono font-bold text-sm uppercase tracking-wider px-8 py-3 border-2 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                color: colors.deepSpace,
                borderColor: colors.aurumGold,
                backgroundColor: colors.aurumGold,
                boxShadow: `0 0 25px ${colors.aurumGold}40`,
              }}
              onMouseEnter={(e) => {
                if (status !== 'submitting') {
                  e.currentTarget.style.boxShadow = `0 0 35px ${colors.aurumGold}60`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 25px ${colors.aurumGold}40`;
              }}
            >
              {status === 'submitting' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        ) : (
          <div
            className="mb-6 p-4 font-mono text-sm"
            style={{
              color: colors.signalGreen,
              backgroundColor: `${colors.signalGreen}15`,
              border: `1px solid ${colors.signalGreen}40`,
            }}
          >
            ✓ Subscribed! Welcome to the Hive.
          </div>
        )}
        */}

        {/* Secondary CTA */}
        <Link
          href="/grid"
          className="hidden md:inline-block font-mono text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105"
          style={{
            color: colors.electricBlue,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textShadow = `0 0 15px ${colors.electricBlue}80`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textShadow = 'none';
          }}
        >
          Explore the Grid →
        </Link>
      </div>
    </section>
  );
}

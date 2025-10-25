import Link from 'next/link';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import { colors } from '@/lib/tokens';

export default function NotFound() {
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
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Warning Symbol */}
          <div
            className="text-6xl md:text-8xl font-display font-bold mb-4"
            style={{
              color: colors.alertRed,
              textShadow: `
                0 0 60px ${colors.alertRed}FF,
                0 0 30px ${colors.alertRed}CC,
                0 0 15px ${colors.alertRed}80
              `,
              lineHeight: 1,
            }}
          >
            ⚠
          </div>

          {/* Error Code */}
          <div
            className="text-7xl md:text-9xl font-display font-bold"
            style={{
              color: colors.alertRed,
              textShadow: `
                0 0 80px ${colors.alertRed}FF,
                0 0 40px ${colors.alertRed}CC,
                0 0 20px ${colors.alertRed}80
              `,
              lineHeight: 1,
            }}
          >
            404
          </div>

          {/* Primary Warning */}
          <h1
            className="text-3xl md:text-5xl font-display font-bold uppercase"
            style={{ 
              color: colors.offWhite,
              textShadow: `0 2px 10px rgba(0,0,0,0.8)`,
            }}
          >
            RESTRICTED ZONE
          </h1>

          {/* Secondary Message */}
          <div className="space-y-4">
            <p
              className="text-xl md:text-2xl font-mono font-bold"
              style={{ color: colors.alertRed }}
            >
              YOU ARE ON THE EDGE OF THE WEB
            </p>
            
            <p
              className="text-base md:text-lg font-mono"
              style={{ color: colors.slateLight }}
            >
              This sector is unmapped. Rogue AI patrol these networks.
            </p>
            
            <p
              className="text-base md:text-lg font-mono italic"
              style={{ color: colors.aurumGold }}
            >
              Turn back now while you still can.
            </p>
          </div>

          {/* Warning Box */}
          <div
            className="max-w-2xl mx-auto p-6 md:p-8 border-2"
            style={{
              backgroundColor: `${colors.alertRed}10`,
              borderColor: colors.alertRed,
              boxShadow: `0 0 40px ${colors.alertRed}30`,
            }}
          >
            <p
              className="text-sm md:text-base font-mono leading-relaxed"
              style={{ color: colors.slateLight }}
            >
              <span style={{ color: colors.alertRed, fontWeight: 'bold' }}>[SYSTEM WARNING]</span>
              <br />
              Unauthorized access detected. GridWatch has been notified.
              <br />
              Connection trace initiated...
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/"
              className="font-mono font-bold text-sm uppercase tracking-wider px-8 py-4 border-2 transition-all duration-200 hover:scale-105"
              style={{
                color: colors.signalGreen,
                borderColor: colors.signalGreen,
                backgroundColor: `${colors.signalGreen}15`,
                boxShadow: `0 0 30px ${colors.signalGreen}40`,
              }}
            >
              ← RETURN TO SAFE ZONE
            </Link>

            <Link
              href="/grid"
              className="font-mono font-bold text-sm uppercase tracking-wider px-8 py-4 border-2 transition-all duration-200 hover:scale-105"
              style={{
                color: colors.electricBlue,
                borderColor: colors.electricBlue,
                backgroundColor: `${colors.electricBlue}15`,
                boxShadow: `0 0 30px ${colors.electricBlue}40`,
              }}
            >
              JACK INTO THE GRID →
            </Link>
          </div>

          {/* Footer Note */}
          <div className="pt-12 border-t" style={{ borderColor: `${colors.graphite}60` }}>
            <p
              className="text-xs md:text-sm font-mono"
              style={{ color: colors.slateLight }}
            >
              Need a valid route? Access{' '}
              <Link
                href="/nodes"
                className="underline hover:no-underline"
                style={{ color: colors.aurumGold }}
              >
                Node Registry
              </Link>
              {' '}or monitor{' '}
              <Link
                href="/signal"
                className="underline hover:no-underline"
                style={{ color: colors.aurumGold }}
              >
                Signal Feed
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <LandingFooter />
      </div>
    </div>
  );
}

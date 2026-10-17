'use client';

/**
 * CyberpunkEffects — Global visual effects overlay
 * Adds scanlines, noise, and other cyberpunk aesthetic elements
 */

export default function CyberpunkEffects() {
  return (
    <>
      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.15) 0px,
              rgba(0, 0, 0, 0.15) 1px,
              transparent 1px,
              transparent 2px
            )
          `,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Noise/grain texture */}
      <div
        className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          animation: 'grain 8s steps(10) infinite',
        }}
      />

      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(255, 42, 109, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(255, 42, 109, 0.9));
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }

        @keyframes glitch {
          0% {
            transform: translate(0);
            opacity: 1;
          }
          20% {
            transform: translate(-2px, 2px);
            opacity: 0.8;
          }
          40% {
            transform: translate(-2px, -2px);
            opacity: 0.8;
          }
          60% {
            transform: translate(2px, 2px);
            opacity: 0.8;
          }
          80% {
            transform: translate(2px, -2px);
            opacity: 0.8;
          }
          100% {
            transform: translate(0);
            opacity: 1;
          }
        }

        @keyframes glitch-clip {
          0% {
            clip-path: inset(40% 0 61% 0);
          }
          20% {
            clip-path: inset(92% 0 1% 0);
          }
          40% {
            clip-path: inset(43% 0 1% 0);
          }
          60% {
            clip-path: inset(25% 0 58% 0);
          }
          80% {
            clip-path: inset(54% 0 7% 0);
          }
          100% {
            clip-path: inset(58% 0 43% 0);
          }
        }

        @keyframes borderFlow {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        /* Glitch effect class */
        .glitch-hover {
          position: relative;
        }

        .glitch-hover::before,
        .glitch-hover::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          pointer-events: none;
        }

        .glitch-hover:hover::before {
          animation: glitch-clip 0.3s infinite;
          opacity: 0.8;
          color: #00f0ff;
          left: 2px;
          text-shadow: -2px 0 #ff0080;
        }

        .glitch-hover:hover::after {
          animation: glitch-clip 0.3s infinite reverse;
          opacity: 0.8;
          color: #ff0080;
          left: -2px;
          text-shadow: 2px 0 #00f0ff;
        }

        /* Holographic text effect */
        .holographic-text {
          position: relative;
          background: linear-gradient(
            90deg,
            #ff2a6d 0%,
            #d946ef 20%,
            #00f0ff 40%,
            #d946ef 60%,
            #ff2a6d 80%,
            #00f0ff 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 6s linear infinite;
        }
      `}</style>
    </>
  );
}

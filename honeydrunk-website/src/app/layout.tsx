import type { Metadata } from "next";
import "./globals.css";
import CyberpunkEffects from "@/components/CyberpunkEffects";
import PageTransition from "@/components/PageTransition";
import HiveConsole from "@/components/HiveConsole";
import GridPulse from "@/components/GridPulse";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://honeydrunkstudios.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "HoneyDrunk Studios — The Grid",
  description: "An independent studio building useful apps, original games, a shared fantasy universe, and reusable software. Structure meets soul. Code meets art.",
  keywords: ["honeydrunk", "build-in-public", "agents", "creative-tech", "zero-bloat", "cyberpunk", "indie games", "mobile apps", "worldbuilding", "the grid", "creative coding"],
  authors: [{ name: "HoneyDrunk Studios" }],
  creator: "HoneyDrunk Studios",
  publisher: "HoneyDrunk Studios",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "HoneyDrunk Studios — The Grid",
    description: "An independent studio building useful apps, original games, a shared fantasy universe, and reusable software. Structure meets soul. Code meets art.",
    url: siteUrl,
    siteName: "HoneyDrunk Studios",
    images: [
      {
        url: `${siteUrl}/neoncity-og.png`,
        width: 1200,
        height: 630,
        alt: "HoneyDrunk Studios - Neon cyberpunk cityscape",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HoneyDrunk Studios — The Grid",
    description: "An independent studio building useful apps, original games, a shared fantasy universe, and reusable software. Structure meets soul. Code meets art.",
    images: [`${siteUrl}/neoncity-og.png`],
    creator: "@HoneyDrunkLab",
  },
  verification: {
    // Add your verification tokens here when ready
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HoneyDrunk Studios',
    url: siteUrl,
    logo: `${siteUrl}/neoncity-og.png`,
    description: 'An independent studio building useful apps, original games, a shared fantasy universe, and reusable software. Structure meets soul. Code meets art.',
    sameAs: [
      'https://x.com/HoneyDrunkLab',
      'https://github.com/honeydrunkstudios',
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <CyberpunkEffects />
        <PageTransition />
        <GridPulse />
        {children}
        <HiveConsole />
      </body>
    </html>
  );
}

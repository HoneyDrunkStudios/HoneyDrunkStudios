import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import CyberpunkEffects from "@/components/CyberpunkEffects";
import PageTransition from "@/components/PageTransition";
import HiveConsole from "@/components/HiveConsole";
import GridPulse from "@/components/GridPulse";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://honeydrunkstudios.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "HoneyDrunk Studios — The Grid",
  description: "Building the HoneyDrunk Grid — open systems, tools, games, and cyberware that empower creators. Structure meets soul. Code meets art.",
  keywords: ["honeydrunk", "build-in-public", "agents", "creative-tech", "zero-bloat", "cyberpunk", "cyberware", "the grid", "creative coding"],
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
    description: "Building the HoneyDrunk Grid — open systems, tools, games, and cyberware that empower creators.",
    url: siteUrl,
    siteName: "HoneyDrunk Studios",
    images: [
      {
        url: "/neoncity-og.png",
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
    description: "Building the HoneyDrunk Grid — open systems, tools, games, and cyberware that empower creators.",
    images: ["/neoncity-og.png"],
    creator: "@honeydrunk",
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
    description: 'Building the HoneyDrunk Grid — open systems, tools, games, and cyberware that empower creators.',
    sameAs: [
      'https://twitter.com/honeydrunk',
      'https://github.com/honeydrunkstudios',
    ],
    founder: {
      '@type': 'Person',
      name: 'HoneyDrunk Studios Team',
    },
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
        <Header />
        {children}
        <HiveConsole />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import CyberpunkEffects from "@/components/CyberpunkEffects";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "HoneyDrunk Studios — The Grid",
  description: "Structure meets soul. Code meets art. Build-in-public philosophy powering a network of interconnected systems and creative experiments.",
  keywords: ["honeydrunk", "build-in-public", "agents", "creative-tech", "zero-bloat"],
  authors: [{ name: "HoneyDrunk Studios" }],
  openGraph: {
    title: "HoneyDrunk Studios — The Grid",
    description: "Structure meets soul. Code meets art.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HoneyDrunk Studios — The Grid",
    description: "Structure meets soul. Code meets art.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CyberpunkEffects />
        <PageTransition />
        <Header />
        {children}
      </body>
    </html>
  );
}

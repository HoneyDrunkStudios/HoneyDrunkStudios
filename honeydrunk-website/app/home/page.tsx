import { getFeaturedNodes } from '@/lib/nodes';
import ValueProps from '@/components/ValueProps';
import FeaturedNodes from '@/components/FeaturedNodes';
import Spotlights from '@/components/Spotlights';
import BuildInPublic from '@/components/BuildInPublic';
import CtaBand from '@/components/CtaBand';
import LandingFooter from '@/components/LandingFooter';
import Header from '@/components/Header';

export default function HomePage() {
  const featuredNodes = getFeaturedNodes();

  return (
    <div className="w-full min-h-screen">
      <Header />
      {/* Add top padding to account for absolute positioned header */}
      <div className="pt-24 space-y-16">
        <ValueProps />
        <FeaturedNodes nodes={featuredNodes} />
        <Spotlights />
        <BuildInPublic />
        <CtaBand />
      </div>
      <LandingFooter />
    </div>
  );
}

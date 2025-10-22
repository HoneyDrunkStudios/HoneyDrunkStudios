'use client';

import { useState, useEffect } from 'react';
import { getFeaturedNodes } from '@/lib/nodes';
import ValueProps from '@/components/ValueProps';
import FeaturedNodes from '@/components/FeaturedNodes';
import Spotlights from '@/components/Spotlights';
import BuildInPublic from '@/components/BuildInPublic';
import CtaBand from '@/components/CtaBand';
import LandingFooter from '@/components/LandingFooter';
import Header from '@/components/Header';
import HeroBoot from '@/components/hero/HeroBoot';

const STORAGE_KEY = 'hd.jacked_in';

export default function Home() {
  const featuredNodes = getFeaturedNodes();
  const [hasJackedIn, setHasJackedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user has already jacked in
    const jackedIn = sessionStorage.getItem(STORAGE_KEY) === 'true';
    setHasJackedIn(jackedIn);
    setIsChecking(false);
  }, []);

  // Show nothing while checking to prevent flash
  if (isChecking) {
    return null;
  }

  // Show boot sequence if not jacked in yet
  if (!hasJackedIn) {
    return (
      <HeroBoot
        onBootComplete={() => {
          sessionStorage.setItem(STORAGE_KEY, 'true');
          setHasJackedIn(true);
        }}
        onExploreGrid={() => {
          sessionStorage.setItem(STORAGE_KEY, 'true');
          setHasJackedIn(true);
        }}
      />
    );
  }

  // Show home content after boot
  return (
    <div className="w-full min-h-screen">
      <Header />
      {/* Add top padding to account for absolute positioned header */}
      <div className="pt-24 space-y-0">
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

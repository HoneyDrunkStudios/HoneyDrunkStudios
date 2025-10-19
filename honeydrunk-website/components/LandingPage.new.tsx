'use client';

/**
 * NewLandingPage — Complete cinematic landing experience
 * Gate → Hero Boot Sequence → Value Props → Featured Nodes → Spotlights → Build-in-Public → CTA → Footer
 */

import { useState, useEffect } from 'react';
import { getFeaturedNodes } from '@/lib/nodes';
import EntryGate, { hasJackedIn } from './hero/EntryGate';
import HeroBoot from './hero/HeroBoot';
import ValueProps from './ValueProps';
import FeaturedNodes from './FeaturedNodes';
import Spotlights from './Spotlights';
import BuildInPublic from './BuildInPublic';
import CtaBand from './CtaBand';
import LandingFooter from './LandingFooter';

type ViewState = 'checking' | 'gate' | 'hero' | 'main';

export default function NewLandingPage() {
  const [viewState, setViewState] = useState<ViewState>('checking');
  const featuredNodes = getFeaturedNodes();

  useEffect(() => {
    // Check if user has already jacked in
    const alreadyJackedIn = hasJackedIn();

    if (alreadyJackedIn) {
      // Skip gate and hero, go straight to main content
      setViewState('main');
    } else {
      // Show gate
      setViewState('gate');
    }
  }, []);

  const handleGateComplete = () => {
    setViewState('hero');
  };

  const handleBootComplete = () => {
    setViewState('main');
  };

  const handleExploreGrid = () => {
    // Smooth scroll to featured nodes
    const element = document.getElementById('featured-nodes');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Show nothing while checking to prevent flash
  if (viewState === 'checking') {
    return null;
  }

  // Entry Gate
  if (viewState === 'gate') {
    return <EntryGate onComplete={handleGateComplete} />;
  }

  // Hero Boot Sequence
  if (viewState === 'hero') {
    return (
      <HeroBoot
        onExploreGrid={handleExploreGrid}
        onBootComplete={handleBootComplete}
      />
    );
  }

  // Main landing page content
  return (
    <div className="w-full min-h-screen">
      {/* Page sections */}
      <ValueProps />
      <FeaturedNodes nodes={featuredNodes} />
      <Spotlights />
      <BuildInPublic />
      <CtaBand />
      <LandingFooter />

      {/* Mantra (optional - could be in hero or as a section) */}
      {/* Can add a dedicated section for "Boot. Build. Refactor. Evolve." if needed */}
    </div>
  );
}

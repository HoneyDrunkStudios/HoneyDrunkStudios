'use client';

/**
 * LandingPage — Main landing experience with hero boot and cybercity
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeroBoot from './hero/HeroBoot';
import { useIsMobile } from '@/lib/hooks/useIsMobile';

const STORAGE_KEY = 'hd.jacked_in';

export default function LandingPage() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isChecking, setIsChecking] = useState(true);

  // Check if user has already jacked in (sessionStorage for per-session)
  useEffect(() => {
    // Clean up old localStorage key if it exists
    if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)) {
      localStorage.removeItem(STORAGE_KEY);
    }

    const hasJackedIn = sessionStorage.getItem(STORAGE_KEY) === 'true';

    // If already jacked in, redirect to home
    if (hasJackedIn) {
      router.push('/home');
      return;
    }

    setIsChecking(false);
  }, [isMobile, router]);

  // Expose reset function globally for dev/debugging
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as typeof window & { resetHiveIntro?: () => void }).resetHiveIntro = () => {
        sessionStorage.removeItem(STORAGE_KEY);
        window.location.reload();
      };
    }
  }, []);

  // Show nothing while checking storage to prevent flash
  if (isChecking) {
    return null;
  }

  return (
    <HeroBoot
      onBootComplete={() => {
        sessionStorage.setItem(STORAGE_KEY, 'true');
        router.push('/home');
      }}
      onExploreGrid={() => {
        sessionStorage.setItem(STORAGE_KEY, 'true');
        router.push('/home');
      }}
    />
  );
}

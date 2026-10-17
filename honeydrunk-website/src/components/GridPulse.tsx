'use client';

/**
 * GridPulse — Visual pulse effect for trace.signal
 * Site-wide animated overlay, throttled
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, zIndex } from '@/lib/tokens';

let pulseCallback: (() => void) | null = null;

/**
 * Trigger a grid pulse from anywhere
 */
export function triggerGridPulse() {
  if (pulseCallback) {
    pulseCallback();
  }
}

export default function GridPulse() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    pulseCallback = () => {
      if (isActive) return; // Throttle: don't trigger if already active

      setIsActive(true);

      // Auto-dismiss after animation
      setTimeout(() => {
        setIsActive(false);
      }, 1500);
    };

    return () => {
      pulseCallback = null;
    };
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: zIndex.overlay,
            background: `radial-gradient(circle at center, ${colors.electricBlue}30 0%, transparent 70%)`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          {/* Ripple rings */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${colors.electricBlue}`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: '200vw', height: '200vw', opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${colors.violetFlux}`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: '200vw', height: '200vw', opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.15 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

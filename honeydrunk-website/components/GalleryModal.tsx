'use client';

/**
 * GalleryModal — Cycle through local visual assets
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, zIndex } from '@/lib/tokens';
import Image from 'next/image';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Local gallery assets - all images from /public
const GALLERY_ITEMS = [
  {
    src: '/neoncity.png',
    alt: 'HoneyDrunk Studios — Neon City',
    caption: 'The Grid awakens — cyberpunk cityscape',
  },
  {
    src: '/honeydrunk.png',
    alt: 'HoneyDrunk Studios Logo',
    caption: 'Structure meets soul',
  },
  {
    src: '/thelab.png',
    alt: 'The Lab — HoneyDrunk Studios',
    caption: 'Where the magic happens',
  },
  {
    src: '/hero/city-desktop.webp',
    alt: 'Neon City Desktop View',
    caption: 'Hero visual — full resolution grid',
  },
  {
    src: '/hero/city-tablet.webp',
    alt: 'Neon City Tablet View',
    caption: 'Adaptive grid — tablet layout',
  },
  {
    src: '/hero/city-mobile.webp',
    alt: 'Neon City Mobile View',
    caption: 'Grid on the go — mobile experience',
  },
  {
    src: '/spotlight/cyberware.png',
    alt: 'Cyberware — Neural Enhancements',
    caption: 'Spotlight: Cyberware systems',
  },
  {
    src: '/spotlight/gaming.png',
    alt: 'HoneyPlay Gaming Platform',
    caption: 'Spotlight: Gaming node',
  },
];

export default function GalleryModal({ isOpen, onClose }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((i) => (i - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  const handleNext = () => {
    setCurrentIndex((i) => (i + 1) % GALLERY_ITEMS.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  const currentItem = GALLERY_ITEMS[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{
            zIndex: zIndex.modal,
            backgroundColor: `${colors.deepSpace}f2`,
            backdropFilter: 'blur(8px)',
          }}
          onClick={onClose}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="w-full max-w-4xl border-2 rounded-lg overflow-hidden flex flex-col"
            style={{
              backgroundColor: colors.gunmetal,
              borderColor: colors.electricBlue,
              boxShadow: `0 0 40px ${colors.electricBlue}40`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: colors.graphite }}
            >
              <div className="font-mono text-sm" style={{ color: colors.aurumGold }}>
                VISUAL FEED — {currentIndex + 1} / {GALLERY_ITEMS.length}
              </div>
              <button
                onClick={onClose}
                className="text-xs font-mono px-2 py-1"
                style={{ color: colors.slateLight }}
              >
                [ESC]
              </button>
            </div>

            {/* Image */}
            <div className="relative w-full h-[500px] bg-black flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentItem.src}
                    alt={currentItem.alt}
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              {GALLERY_ITEMS.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                    style={{
                      backgroundColor: `${colors.gunmetal}cc`,
                      color: colors.electricBlue,
                      border: `1px solid ${colors.graphite}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.gunmetal;
                      e.currentTarget.style.borderColor = colors.electricBlue;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${colors.gunmetal}cc`;
                      e.currentTarget.style.borderColor = colors.graphite;
                    }}
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                    style={{
                      backgroundColor: `${colors.gunmetal}cc`,
                      color: colors.electricBlue,
                      border: `1px solid ${colors.graphite}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.gunmetal;
                      e.currentTarget.style.borderColor = colors.electricBlue;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = `${colors.gunmetal}cc`;
                      e.currentTarget.style.borderColor = colors.graphite;
                    }}
                  >
                    →
                  </button>
                </>
              )}
            </div>

            {/* Caption */}
            <div
              className="px-4 py-3 border-t text-center font-mono text-sm"
              style={{
                borderColor: colors.graphite,
                color: colors.slateLight,
              }}
            >
              {currentItem.caption}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

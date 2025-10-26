'use client';

/**
 * EntityCard — Reusable card component for Nodes and Services
 * Provides consistent styling with animated border effects
 */

import Link from 'next/link';
import { colors } from '@/lib/tokens';
import type { ReactNode } from 'react';

interface EntityCardProps {
  id: string;
  name: string;
  signal: string;
  signalColor: string;
  primaryColor: string; // sectorColor for nodes, tierColor for services
  description: string;
  href: string;
  badges?: ReactNode; // For tier/runtime/owner badges or module count
  tags?: string[];
  ctaText?: string;
}

export default function EntityCard({
  id,
  name,
  signal,
  signalColor,
  primaryColor,
  description,
  href,
  badges,
  tags,
  ctaText = 'Open Detail →',
}: EntityCardProps) {
  return (
    <Link
      href={href}
      className="group p-5 md:p-6 rounded-lg border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden block"
      style={{
        backgroundColor: `${colors.gunmetal}60`,
        borderColor: `${primaryColor}40`,
      }}
    >
      {/* Animated border trace on hover */}
      <svg
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ width: '100%', height: '100%' }}
      >
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx="6"
          fill="none"
          stroke={primaryColor}
          strokeWidth="2"
          strokeDasharray="8 4"
          strokeDashoffset="1000"
          style={{
            animation: 'borderFlow 2s linear infinite',
          }}
        />
      </svg>

      {/* Header with name and signal */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg md:text-xl font-display font-bold" style={{ color: colors.offWhite }}>
          {name}
        </h3>
        <span
          className="px-2 md:px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap flex-shrink-0"
          style={{
            backgroundColor: `${signalColor}20`,
            borderWidth: '1px',
            borderColor: signalColor,
            color: signalColor,
          }}
        >
          {signal}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm mb-4 leading-relaxed" style={{ color: colors.slateLight }}>
        {description}
      </p>

      {/* Custom badges (modules, tier/runtime/owner, etc.) */}
      {badges && <div className="mb-4">{badges}</div>}

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded text-xs font-mono"
              style={{
                backgroundColor: `${colors.slateLight}15`,
                color: colors.slateLight,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: `${colors.slateLight}20` }}>
        <span className="text-xs font-mono" style={{ color: primaryColor }}>
          {ctaText}
        </span>
      </div>
    </Link>
  );
}

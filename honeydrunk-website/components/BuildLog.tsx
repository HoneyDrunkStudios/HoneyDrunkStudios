'use client';

/**
 * BuildLog Component
 * Displays recent signal updates filtered by tags/entity
 * Reusable across sector and node detail pages
 */

import Link from 'next/link';
import { colors } from '@/lib/tokens';

interface Signal {
  date: string;
  title: string;
  desc: string;
  tags: string[];
  sector: string;
}

interface BuildLogProps {
  signals: Signal[];
  entityName: string;
  entityId: string;
  accentColor: string;
  viewAllLink?: string;
  maxDisplay?: number;
}

export default function BuildLog({
  signals,
  entityName,
  entityId,
  accentColor,
  viewAllLink,
  maxDisplay = 3,
}: BuildLogProps) {
  const displaySignals = signals.slice(0, maxDisplay);
  const defaultViewAllLink = viewAllLink || `/signal?sector=${entityId}`;

  if (displaySignals.length === 0) {
    return (
      <div className="mt-12">
        <h3 className="text-xl font-mono font-bold" style={{ color: colors.offWhite, marginBottom: '16px' }}>
          Build Log
        </h3>
        <div
          className="p-6 rounded-lg border text-center"
          style={{
            backgroundColor: `${colors.deepSpace}80`,
            borderColor: `${colors.slateLight}30`,
          }}
        >
          <p className="text-base" style={{ color: colors.slateLight }}>
            No signals found for {entityName}. Check back soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-xl font-mono font-bold" style={{ color: colors.offWhite, marginBottom: '16px' }}>
        Build Log
      </h3>
      <div className="space-y-4">
        {displaySignals.map((signal, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border"
            style={{
              backgroundColor: `${colors.deepSpace}80`,
              borderColor: `${accentColor}40`,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className="text-xs font-mono"
                style={{ color: colors.aurumGold }}
              >
                {signal.date}
              </div>
              <div className="flex gap-2 flex-wrap justify-end">
                {signal.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${colors.slateLight}20`,
                      color: colors.slateLight,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h4 className="text-base font-display font-bold mb-2" style={{ color: accentColor }}>
              {signal.title}
            </h4>
            <p className="text-sm" style={{ color: colors.slateLight }}>
              {signal.desc}
            </p>
          </div>
        ))}
      </div>
      <Link
        href={defaultViewAllLink}
        className="inline-block mt-6 text-sm font-mono transition-all hover:underline"
        style={{ color: accentColor }}
      >
        View all {entityName} updates →
      </Link>
    </div>
  );
}

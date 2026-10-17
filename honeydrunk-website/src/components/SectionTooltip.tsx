'use client';

import { useState } from 'react';
import { colors } from '@/lib/tokens';

interface SectionTooltipProps {
  text: string;
  color?: string;
}

export default function SectionTooltip({ text, color = colors.electricBlue }: SectionTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block ml-2">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full border transition-all hover:scale-110"
        style={{
          borderColor: `${color}60`,
          backgroundColor: `${color}15`,
          color: color,
        }}
        aria-label="More information"
      >
        <span className="text-xs font-mono">?</span>
      </button>

      {isVisible && (
        <div
          className="absolute right-0 md:left-0 top-full mt-2 w-64 p-3 rounded-lg border z-50 shadow-lg"
          style={{
            backgroundColor: colors.gunmetal,
            borderColor: `${color}60`,
            color: colors.slateLight,
          }}
        >
          <p className="text-xs leading-relaxed">{text}</p>
          <div
            className="absolute bottom-full right-4 md:left-4 w-0 h-0"
            style={{
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderBottom: `6px solid ${color}60`,
            }}
          />
        </div>
      )}
    </div>
  );
}

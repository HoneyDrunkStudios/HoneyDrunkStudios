'use client';

/**
 * SignalLegend — Explains the signal/status system
 */

import { useState } from 'react';
import { colors } from '@/lib/tokens';
import { useIsMobile } from '@/lib/hooks/useIsMobile';

interface SignalLegendProps {
  signalColors: Record<string, string>;
}

const signalDescriptions: Record<string, string> = {
  Seed: 'Queued/Backlog',
  Awake: 'Planning/Starting',
  Wiring: 'Active Development',
  Live: 'Production/Deployed',
  Echo: 'Maintenance/Iteration',
  Archive: 'Retired/Deprecated',
};

const allSignals = ['Seed', 'Awake', 'Wiring', 'Live', 'Echo', 'Archive'];

export default function SignalLegend({ signalColors }: SignalLegendProps) {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);

  if (isMobile) {
    return (
      <div
        className="w-full rounded-lg border backdrop-blur-sm overflow-hidden"
        style={{
          backgroundColor: `${colors.deepSpace}95`,
          borderColor: `${colors.slateLight}30`,
        }}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between cursor-pointer transition-all duration-200"
          style={{
            backgroundColor: `${colors.gunmetal}40`,
          }}
        >
          <span
            className="text-xs font-mono uppercase tracking-wider font-semibold"
            style={{ color: colors.slateLight }}
          >
            📡 Signal Status Guide
          </span>
          <span
            className="text-sm font-mono transition-transform duration-200"
            style={{
              color: colors.electricBlue,
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            ▼
          </span>
        </button>

        {isExpanded && (
          <div className="px-4 py-3 space-y-2">
            {allSignals.map((signal) => (
              <div key={signal} className="flex items-start gap-2">
                <div
                  className="w-3 h-3 rounded-full mt-0.5 flex-shrink-0"
                  style={{ backgroundColor: signalColors[signal] }}
                />
                <div className="flex-1">
                  <div
                    className="font-mono font-semibold text-xs"
                    style={{ color: colors.offWhite }}
                  >
                    {signal}
                  </div>
                  <div
                    className="text-xs opacity-70 leading-tight"
                    style={{ color: colors.slateLight }}
                  >
                    {signalDescriptions[signal]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop version - floating card
  return (
    <div
      className="w-64 p-4 rounded-lg backdrop-blur-sm border space-y-3"
      style={{
        backgroundColor: `${colors.deepSpace}95`,
        borderColor: `${colors.slateLight}30`,
      }}
    >
      <div
        className="text-xs font-mono uppercase tracking-wider font-semibold"
        style={{ color: colors.slateLight }}
      >
        Signal Status
      </div>

      <div className="space-y-2">
        {allSignals.map((signal) => (
          <div key={signal} className="flex items-start gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full mt-0.5 flex-shrink-0"
              style={{ backgroundColor: signalColors[signal] }}
            />
            <div className="flex-1">
              <div
                className="font-mono font-semibold text-xs"
                style={{ color: colors.offWhite }}
              >
                {signal}
              </div>
              <div
                className="text-xs opacity-70 leading-tight"
                style={{ color: colors.slateLight }}
              >
                {signalDescriptions[signal]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

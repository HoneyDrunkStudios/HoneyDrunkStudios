'use client';

/**
 * FilterChips — Filter UI for sectors and signals
 */

import { colors } from '@/lib/tokens';
import type { Sector, Signal } from '@/lib/types';

interface FilterChipsProps<T extends string> {
  options: T[];
  selected: T[];
  onChange: (selected: T[]) => void;
  getColor?: (option: T) => string;
  label?: string;
}

export default function FilterChips<T extends string>({
  options,
  selected,
  onChange,
  getColor,
  label,
}: FilterChipsProps<T>) {
  const toggleOption = (option: T) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <div
          className="text-xs font-mono uppercase tracking-wider"
          style={{ color: colors.slateLight }}
        >
          {label}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          const chipColor = getColor?.(option) || colors.electricBlue;

          return (
            <button
              key={option}
              onClick={() => toggleOption(option)}
              className="px-5 py-2.5 rounded-full text-xs font-mono cursor-pointer
                       transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: isSelected
                  ? `${chipColor}30`
                  : `${chipColor}10`,
                borderWidth: '1px',
                borderColor: isSelected ? chipColor : `${chipColor}40`,
                color: isSelected ? chipColor : `${chipColor}cc`,
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Sector color mapping
export function getSectorColor(sector: Sector): string {
  const map: Record<Sector, string> = {
    Core: colors.violetFlux,
    Ops: colors.electricBlue,
    Creator: colors.aurumGold,
    Life: colors.signalGreen,
    Play: colors.neonPink,
    Meta: colors.slateLight,
  };
  return map[sector];
}

// Signal color mapping
export function getSignalColor(signal: Signal): string {
  const map: Record<Signal, string> = {
    Seed: colors.slateLight,
    Awake: colors.violetFlux,
    Wiring: colors.aurumGold,
    Live: colors.signalGreen,
    Echo: colors.electricBlue,
    Archive: colors.neonPink,
  };
  return map[signal];
}

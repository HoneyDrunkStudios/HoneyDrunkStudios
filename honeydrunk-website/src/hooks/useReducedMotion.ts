import { useMediaQuery } from './useMediaQuery';

/** Detects the browser's live reduced-motion preference. */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/**
 * Tiny shared helper that returns whether the visitor asked for reduced motion.
 * Reused across every project stage so we never animate against the user's
 * OS-level preference. Matches the pattern already used by Hero, Positions
 * and Stack.
 */
export default function usePrefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

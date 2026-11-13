/**
 * System/Theme/Engine/Python/Sci-Py/General/index.tsx
 * Scientific Theme Engine Python Sci-Py Optimization Module
 * Cubic Bezier easing curves and binary-search WCAG target contrast solver.
 */

export class ThemeEngineSciPyOptimizer {
  public cubicBezier(t: number, p1: number, p2: number): number {
    const u = Math.max(0, Math.min(1, t));
    const inv = 1 - u;
    return 3 * inv * inv * u * p1 + 3 * inv * u * u * p2 + u * u * u;
  }

  /** Solves optimal luminance scale scalar via 32-iteration binary search to meet target WCAG ratio */
  public solveMinimumContrastLuminance(
    bgLum: number,
    targetRatio: number = 4.5,
    preferLighter: boolean = true
  ): number {
    const clampedBg = Math.max(0, Math.min(1, bgLum));
    if (preferLighter) {
      let lo = clampedBg;
      let hi = 1.0;
      for (let i = 0; i < 32; i++) {
        const mid = (lo + hi) * 0.5;
        const ratio = (mid + 0.05) / (clampedBg + 0.05);
        if (ratio >= targetRatio) hi = mid;
        else lo = mid;
      }
      return hi;
    }
    let lo = 0.0;
    let hi = clampedBg;
    for (let i = 0; i < 32; i++) {
      const mid = (lo + hi) * 0.5;
      const ratio = (clampedBg + 0.05) / (mid + 0.05);
      if (ratio >= targetRatio) lo = mid;
      else hi = mid;
    }
    return lo;
  }
}

export const ThemeEngineSciPyInstance = new ThemeEngineSciPyOptimizer();

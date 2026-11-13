/**
 * System/Visuals/Index/Python/Sci-Py/General/index.tsx
 * Exponential Moving Average (EMA) frame pacing estimator and jitter dampener.
 */

export class VisualsIndexSciPyPacing {
  public updateEMAFrameTime(prevEmaMs: number, currentSampleMs: number, alpha: number = 0.1): number {
    const a = Math.max(0.01, Math.min(1.0, alpha));
    return a * currentSampleMs + (1.0 - a) * prevEmaMs;
  }

  public computeEffectiveFPS(emaFrameMs: number): number {
    return emaFrameMs > 1e-4 ? 1000.0 / emaFrameMs : 0;
  }
}

export const VisualsIndexSciPyInstance = new VisualsIndexSciPyPacing();

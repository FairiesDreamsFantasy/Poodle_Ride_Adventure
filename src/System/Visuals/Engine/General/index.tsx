/**
 * Ultra-Precise Visuals Engine Core
 * Zero-spike frame scheduling, double-buffered rendering mathematical helpers, exponential frame rate stabilization, and golden ratio aesthetics.
 */

export interface VisualEngineMetrics {
  targetFPS: number;
  frameDeltaMs: number;
  renderScale: number;
  zeroSpikeSmoothing: boolean;
}

export class VisualEngineCore {
  private targetFPS: number = 60;
  private lastFrameTime: number = 0;
  private deltaHistory: number[] = [];
  private emaDelta: number = 16.666;
  public static readonly GOLDEN_RATIO: number = 1.618033988749895;

  constructor(targetFPS: number = 60) {
    this.targetFPS = targetFPS;
    this.lastFrameTime = performance.now();
  }

  /**
   * Computes a smoothed frame delta using an Exponential Moving Average (EMA) filter
   * combined with a 10-sample moving average window for jitter-free animation stepping.
   * Formula: EMA_t = alpha * rawDelta + (1 - alpha) * EMA_{t-1}
   */
  public computeSmoothDelta(currentTime: number, alpha: number = 0.25): number {
    const rawDelta = currentTime - this.lastFrameTime;
    this.lastFrameTime = currentTime;

    // Filter out huge micro-stutters or background tab spikes (clamped between 1ms and 50ms)
    const clampedDelta = Math.min(Math.max(rawDelta, 1.0), 50.0);
    
    // Update EMA filter
    this.emaDelta = alpha * clampedDelta + (1.0 - alpha) * this.emaDelta;

    this.deltaHistory.push(clampedDelta);
    if (this.deltaHistory.length > 10) {
      this.deltaHistory.shift();
    }

    const sum = this.deltaHistory.reduce((a, b) => a + b, 0);
    const windowAvg = sum / this.deltaHistory.length;

    // Blend window average with EMA filter for optimal phase lag vs smoothing balance
    return 0.5 * windowAvg + 0.5 * this.emaDelta;
  }

  /**
   * Adaptive pixel scale calculation with subpixel precision limits.
   */
  public calculateAdaptivePixelScale(containerWidth: number, targetWidth: number): number {
    if (targetWidth <= 0) return 1.0;
    const ratio = containerWidth / targetWidth;
    return Math.max(0.25, Math.min(16.0, ratio));
  }

  /**
   * Calculates Golden Ratio harmonic viewport dimensions:
   * height = width / phi or width = height * phi
   */
  public calculateGoldenHarmonicDimensions(width: number): { width: number; height: number } {
    const height = width / VisualEngineCore.GOLDEN_RATIO;
    return { width, height };
  }

  /**
   * Quantizes a float value to the nearest discrete pixel or subpixel grid quantum.
   */
  public quantizeToGrid(value: number, quantum: number = 0.5): number {
    return Math.round(value / quantum) * quantum;
  }
}

export const VisualEngine = new VisualEngineCore();


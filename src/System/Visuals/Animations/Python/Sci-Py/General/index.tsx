/**
 * System/Visuals/Animations/Python/Sci-Py/General/index.tsx
 * Damped sinusoidal oscillation envelope and Savitzky-Golay 5-point animation smoothing filter.
 */

export class VisualsAnimationsSciPyEnvelope {
  public dampedSinusoid(tSec: number, amplitude: number, freqHz: number, decayRate: number): number {
    return amplitude * Math.exp(-decayRate * tSec) * Math.sin(2 * Math.PI * freqHz * tSec);
  }

  /** 5-point quadratic/cubic Savitzky-Golay smoothing coefficients [-3, 12, 17, 12, -3] / 35 */
  public smoothKeyframeSeries(values: readonly number[]): number[] {
    if (values.length < 5) return [...values];
    const out = [...values];
    for (let i = 2; i < values.length - 2; i++) {
      out[i] =
        (-3 * values[i - 2] + 12 * values[i - 1] + 17 * values[i] + 12 * values[i + 1] - 3 * values[i + 2]) /
        35.0;
    }
    return out;
  }
}

export const VisualsAnimationsSciPyInstance = new VisualsAnimationsSciPyEnvelope();

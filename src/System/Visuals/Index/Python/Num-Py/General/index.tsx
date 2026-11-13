/**
 * System/Visuals/Index/Python/Num-Py/General/index.tsx
 * Statistical telemetry moments (mean, variance, P99 frame time) across render frames.
 */

export class VisualsIndexNumPyTelemetry {
  public summarizeFrameTimes(samplesMs: readonly number[]): {
    meanMs: number;
    stdDevMs: number;
    p99Ms: number;
  } {
    if (samplesMs.length === 0) return { meanMs: 0, stdDevMs: 0, p99Ms: 0 };
    const n = samplesMs.length;
    const meanMs = samplesMs.reduce((a, b) => a + b, 0) / n;
    const variance = samplesMs.reduce((acc, v) => acc + (v - meanMs) ** 2, 0) / n;
    const sorted = [...samplesMs].sort((a, b) => a - b);
    const p99Idx = Math.min(n - 1, Math.floor(0.99 * n));
    return {
      meanMs,
      stdDevMs: Math.sqrt(variance),
      p99Ms: sorted[p99Idx],
    };
  }
}

export const VisualsIndexNumPyInstance = new VisualsIndexNumPyTelemetry();

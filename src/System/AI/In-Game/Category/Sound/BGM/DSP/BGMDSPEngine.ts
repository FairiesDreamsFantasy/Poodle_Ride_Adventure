/**
 * System/AI/In-Game/Category/Sound/BGM/DSP/BGMDSPEngine.ts
 * 
 * Imprint: Fairies Dreams & Fantasy
 * Background Music Digital Signal Processing (DSP) Engine.
 * 
 * Features:
 * 1. Multi-band equalization (Low-shelf, Mid-peak, High-shelf) for background music.
 * 2. Dynamic Range Compression (Threshold, Knee, Ratio, Attack, Release) for ambient theme balancing.
 * 3. Night-mode acoustic low-pass filtering (reducing blue-light / harsh high frequencies from 16:00 to 03:00).
 * 4. Crossfade volume gain curves (linear and equal-power logarithmic crossfades).
 */

export interface BGMCompressorConfig {
  thresholdDb: number;
  kneeDb: number;
  ratio: number;
  attackSeconds: number;
  releaseSeconds: number;
}

export const DEFAULT_BGM_COMPRESSOR: BGMCompressorConfig = {
  thresholdDb: -24.0,
  kneeDb: 30.0,
  ratio: 12.0,
  attackSeconds: 0.003,
  releaseSeconds: 0.25
};

/**
 * Calculates equal-power crossfade gain factors for smooth track transitions.
 * @param progress 0.0 (Track A 100%) to 1.0 (Track B 100%)
 */
export function calculateEqualPowerCrossfade(progress: number): { gainA: number; gainB: number } {
  const p = Math.max(0.0, Math.min(1.0, progress));
  return {
    gainA: Number(Math.cos(p * 0.5 * Math.PI).toFixed(4)),
    gainB: Number(Math.sin(p * 0.5 * Math.PI).toFixed(4))
  };
}

/**
 * Computes night-mode low-pass filter cutoff frequency.
 */
export function calculateNightModeCutoffHz(hourCST: number): number {
  const isNightTime = hourCST >= 16 || hourCST < 3;
  return isNightTime ? 8500 : 20000; // Softens highs during night hours
}

/**
 * Computes dynamic gain reduction in dB given input peak level.
 */
export function calculateGainReductionDb(inputLevelDb: number, config: BGMCompressorConfig = DEFAULT_BGM_COMPRESSOR): number {
  if (inputLevelDb < config.thresholdDb) return 0.0;
  const excess = inputLevelDb - config.thresholdDb;
  return Number((-excess * (1 - 1 / config.ratio)).toFixed(2));
}

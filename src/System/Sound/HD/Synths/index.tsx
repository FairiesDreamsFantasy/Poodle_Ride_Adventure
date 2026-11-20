/**
 * HD Synthesizers
 * High-definition Yamaha FM synthesis algorithms, multi-operator topologies, and acoustic harmonics.
 */

export interface FMOldOperatorConfig {
  multiplier: number;
  attackRate: number;
  decayRate: number;
  sustainLevel: number;
  releaseRate: number;
  feedback: number;
}

export interface FMAlgorithmTopology {
  id: number;
  name: string;
  description: string;
  carriers: number[];
  modulators: number[];
}

/**
 * Standard Yamaha OPL/DX algorithmic topologies:
 * Algorithm 0: Pure cascade (Modulator 2 -> Modulator 1 -> Carrier)
 * Algorithm 1: Dual modulator parallel to single carrier ([Mod 1, Mod 2] -> Carrier)
 * Algorithm 2: Single modulator split to dual carriers (Mod -> [Carrier 1, Carrier 2])
 * Algorithm 3: Additive dual carriers with independent modulators (Mod 1 -> Carrier 1, Mod 2 -> Carrier 2)
 */
export const YAMAHA_FM_ALGORITHMS: Record<number, FMAlgorithmTopology> = {
  0: {
    id: 0,
    name: 'Serial Cascade',
    description: '3-stage or 2-stage serial modulation producing sharp bell and metallic resonant overtones.',
    carriers: [1],
    modulators: [2]
  },
  1: {
    id: 1,
    name: 'Parallel Modulators',
    description: 'Two modulators summing phase shift into one carrier for rich brass and vocal formants.',
    carriers: [1],
    modulators: [2, 3]
  },
  2: {
    id: 2,
    name: 'Split Modulation',
    description: 'Single modulator modulating multiple carrier voices simultaneously for wide acoustic stereo spread.',
    carriers: [1, 2],
    modulators: [3]
  },
  3: {
    id: 3,
    name: 'Additive Dual Pair',
    description: 'Independent dual carrier-modulator pairs combined additively for full-bodied ensemble synthesis.',
    carriers: [1, 3],
    modulators: [2, 4]
  }
};

/**
 * Calculates theoretical FM sideband distribution using Bessel functions of the first kind J_n(beta).
 * beta = modulation index = modDepth / (freq * modRatio)
 */
export function calculateFMSidebands(
  carrierFreq: number,
  modFreq: number,
  modulationIndex: number,
  maxOrder: number = 4
): { order: number; frequency: number; relativeAmplitude: number }[] {
  const sidebands: { order: number; frequency: number; relativeAmplitude: number }[] = [];
  
  // Approximate Bessel J_n(beta) via power series expansion
  const besselJ = (n: number, x: number): number => {
    let sum = 0;
    const xHalf = x / 2;
    for (let m = 0; m < 12; m++) {
      let denom = 1;
      for (let k = 1; k <= m; k++) denom *= k;
      for (let k = 1; k <= m + n; k++) denom *= k;
      const term = (Math.pow(-1, m) * Math.pow(xHalf, 2 * m + n)) / denom;
      sum += term;
      if (Math.abs(term) < 1e-7) break;
    }
    return sum;
  };

  for (let n = -maxOrder; n <= maxOrder; n++) {
    const f = carrierFreq + n * modFreq;
    if (f > 0 && f < 22050) {
      const jVal = besselJ(Math.abs(n), modulationIndex);
      const sign = n < 0 && Math.abs(n) % 2 === 1 ? -1 : 1;
      sidebands.push({
        order: n,
        frequency: f,
        relativeAmplitude: Math.abs(jVal * sign)
      });
    }
  }

  return sidebands;
}

export const HD_SYNTHS_CONFIG = {
  name: 'HD Yamaha FM Synthesizers',
  version: '2.0.0',
  sampleRate: 48000,
  maxOperators: 4,
  precision: '64-bit IEEE 754 floating point',
  algorithms: YAMAHA_FM_ALGORITHMS
};


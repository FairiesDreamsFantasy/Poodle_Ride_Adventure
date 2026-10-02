/**
 * Scientific Sound Engine Python Sci-Py Convolution & Filtering Core Module
 * Butterworth bandpass filter coefficients, biquad IIR filtering, and Schroeder reverberation delay networks.
 */

export interface BiquadCoefficients {
  b0: number;
  b1: number;
  b2: number;
  a0: number;
  a1: number;
  a2: number;
}

export class SoundSciPyFilter {
  /**
   * Single-pole recursive low-pass filter.
   */
  public applySimpleLowPass(samples: Float32Array, alpha: number = 0.5): Float32Array {
    const out = new Float32Array(samples.length);
    let prev = 0;
    for (let i = 0; i < samples.length; i++) {
      prev = prev + alpha * (samples[i] - prev);
      out[i] = prev;
    }
    return out;
  }

  /**
   * Calculates 2nd-Order Butterworth Low-Pass Filter Biquad Coefficients:
   * Q = 1 / sqrt(2) = 0.7071 (maximally flat passband)
   */
  public calculateButterworthLowPassCoeffs(cutoffHz: number, sampleRate: number = 48000): BiquadCoefficients {
    const omega = (2.0 * Math.PI * Math.max(10, Math.min(sampleRate * 0.49, cutoffHz))) / sampleRate;
    const sinOmega = Math.sin(omega);
    const cosOmega = Math.cos(omega);
    const alpha = sinOmega / (2.0 * 0.7071067811865475); // Q = 1 / sqrt(2)

    const b0 = (1.0 - cosOmega) / 2.0;
    const b1 = 1.0 - cosOmega;
    const b2 = (1.0 - cosOmega) / 2.0;
    const a0 = 1.0 + alpha;
    const a1 = -2.0 * cosOmega;
    const a2 = 1.0 - alpha;

    return { b0, b1, b2, a0, a1, a2 };
  }

  /**
   * Calculates 2nd-Order Butterworth High-Pass Filter Biquad Coefficients.
   */
  public calculateButterworthHighPassCoeffs(cutoffHz: number, sampleRate: number = 48000): BiquadCoefficients {
    const omega = (2.0 * Math.PI * Math.max(10, Math.min(sampleRate * 0.49, cutoffHz))) / sampleRate;
    const sinOmega = Math.sin(omega);
    const cosOmega = Math.cos(omega);
    const alpha = sinOmega / (2.0 * 0.7071067811865475);

    const b0 = (1.0 + cosOmega) / 2.0;
    const b1 = -(1.0 + cosOmega);
    const b2 = (1.0 + cosOmega) / 2.0;
    const a0 = 1.0 + alpha;
    const a1 = -2.0 * cosOmega;
    const a2 = 1.0 - alpha;

    return { b0, b1, b2, a0, a1, a2 };
  }

  /**
   * Processes an audio buffer using a Direct Form I Biquad IIR Filter:
   * y[n] = (b0/a0)*x[n] + (b1/a0)*x[n-1] + (b2/a0)*x[n-2] - (a1/a0)*y[n-1] - (a2/a0)*y[n-2]
   */
  public processBiquad(samples: Float32Array, coeffs: BiquadCoefficients): Float32Array {
    const out = new Float32Array(samples.length);
    const { b0, b1, b2, a0, a1, a2 } = coeffs;
    
    // Normalized coefficients
    const nb0 = b0 / a0;
    const nb1 = b1 / a0;
    const nb2 = b2 / a0;
    const na1 = a1 / a0;
    const na2 = a2 / a0;

    let x1 = 0, x2 = 0;
    let y1 = 0, y2 = 0;

    for (let i = 0; i < samples.length; i++) {
      const x0 = samples[i];
      const y0 = nb0 * x0 + nb1 * x1 + nb2 * x2 - na1 * y1 - na2 * y2;

      out[i] = y0;

      x2 = x1;
      x1 = x0;
      y2 = y1;
      y1 = y0;
    }

    return out;
  }

  /**
   * Schroeder Feedback Comb Filter for architectural acoustic space reverberation:
   * y[n] = x[n - D] + feedback * y[n - D]
   */
  public applyCombFilter(samples: Float32Array, delaySamples: number, feedback: number = 0.75): Float32Array {
    const out = new Float32Array(samples.length);
    const delayBuffer = new Float32Array(delaySamples);
    let bufIndex = 0;

    for (let i = 0; i < samples.length; i++) {
      const delayed = delayBuffer[bufIndex];
      const output = delayed;
      delayBuffer[bufIndex] = samples[i] + delayed * feedback;
      out[i] = output;

      bufIndex = (bufIndex + 1) % delaySamples;
    }

    return out;
  }
}

export const SoundSciPyFilterInstance = new SoundSciPyFilter();


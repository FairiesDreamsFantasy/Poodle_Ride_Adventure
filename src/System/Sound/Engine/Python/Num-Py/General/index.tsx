/**
 * Scientific Sound Engine Python Num-Py Waveform Vectorization Core Module
 * Multi-channel PCM sample arrays, matrix gain scaling, RMS energy, dynamic range compression, and equal-power stereo panning.
 */

export class SoundNumPyWaveform {
  /**
   * Normalizes PCM audio samples to peak amplitude = 1.0.
   */
  public normalizeSamples(samples: Float32Array): Float32Array {
    let max = 0;
    for (let i = 0; i < samples.length; i++) {
      const abs = Math.abs(samples[i]);
      if (abs > max) max = abs;
    }
    if (max <= 0) return samples;
    const out = new Float32Array(samples.length);
    for (let i = 0; i < samples.length; i++) {
      out[i] = samples[i] / max;
    }
    return out;
  }

  /**
   * Calculates Root Mean Square (RMS) energy:
   * RMS = sqrt( (1 / N) * sum(x_i^2) )
   */
  public calculateRMS(samples: Float32Array): number {
    if (samples.length === 0) return 0;
    let sumSquares = 0;
    for (let i = 0; i < samples.length; i++) {
      sumSquares += samples[i] * samples[i];
    }
    return Math.sqrt(sumSquares / samples.length);
  }

  /**
   * Calculates the Crest Factor (Peak-to-RMS ratio) in decibels:
   * CrestFactor_dB = 20 * log10(Peak / RMS)
   */
  public calculateCrestFactorDb(samples: Float32Array): number {
    let peak = 0;
    for (let i = 0; i < samples.length; i++) {
      const abs = Math.abs(samples[i]);
      if (abs > peak) peak = abs;
    }
    const rms = this.calculateRMS(samples);
    if (rms <= 0.0000001 || peak <= 0.0000001) return 0;
    return 20.0 * Math.log10(peak / rms);
  }

  /**
   * Constant-Power (Equal-Power) Stereo Panning Law:
   * pan ranges from -1.0 (hard left) to +1.0 (hard right).
   * L = cos( (pi / 4) * (1 + pan) )
   * R = sin( (pi / 4) * (1 + pan) )
   */
  public calculateEqualPowerGains(pan: number): { leftGain: number; rightGain: number } {
    const clampedPan = Math.max(-1.0, Math.min(1.0, pan));
    // Normalized angle from 0 to pi / 2
    const angle = ((clampedPan + 1.0) / 2.0) * (Math.PI / 2.0);
    return {
      leftGain: Math.cos(angle),
      rightGain: Math.sin(angle),
    };
  }

  /**
   * Applies Soft-Knee Dynamic Range Compression:
   * Threshold and Knee in linear amplitude, Ratio >= 1.0
   */
  public applyCompression(
    samples: Float32Array,
    threshold: number = 0.7,
    ratio: number = 4.0,
    knee: number = 0.1
  ): Float32Array {
    const out = new Float32Array(samples.length);
    const halfKnee = knee / 2.0;

    for (let i = 0; i < samples.length; i++) {
      const input = samples[i];
      const absInput = Math.abs(input);
      const sign = input < 0 ? -1 : 1;

      if (absInput <= threshold - halfKnee) {
        // Below knee threshold - unchanged
        out[i] = input;
      } else if (absInput > threshold + halfKnee) {
        // Above knee threshold - standard ratio attenuation
        const compressed = threshold + (absInput - threshold) / ratio;
        out[i] = sign * compressed;
      } else {
        // Inside soft knee curve (quadratic transition)
        const delta = absInput - threshold + halfKnee;
        const compressed = absInput + ((1.0 / ratio - 1.0) * (delta * delta)) / (2.0 * knee);
        out[i] = sign * compressed;
      }
    }
    return out;
  }
}

export const SoundNumPyWaveformInstance = new SoundNumPyWaveform();


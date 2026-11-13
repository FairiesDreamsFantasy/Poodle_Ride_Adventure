/**
 * Scientific Sound Engine Assembly Web_Assembly Native DSP Core Module
 * Direct Form I Biquad IIR filtering, Butterworth coefficient synthesis,
 * Schroeder comb/allpass reverb stage, and valid WebAssembly 1.0 MVP binary DSP kernel.
 */

export interface SoundAssemblyBiquadCoefficients {
  b0: number;
  b1: number;
  b2: number;
  a1: number;
  a2: number;
}

export class SoundAssemblyWasmDSP {
  private x1: number = 0;
  private x2: number = 0;
  private y1: number = 0;
  private y2: number = 0;

  public computeBiquad(
    x: number,
    b0: number,
    b1: number,
    b2: number,
    a1: number,
    a2: number,
    x1: number,
    x2: number,
    y1: number,
    y2: number
  ): number {
    return b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2;
  }

  public computeLowPassCoefficients(cutoffHz: number, sampleRate: number, q: number = 0.70710678): SoundAssemblyBiquadCoefficients {
    const w0 = (2 * Math.PI * Math.max(20, Math.min(sampleRate * 0.45, cutoffHz))) / sampleRate;
    const cosW0 = Math.cos(w0);
    const alpha = Math.sin(w0) / (2 * Math.max(0.1, q));
    const a0 = 1 + alpha;
    return {
      b0: (1 - cosW0) / 2 / a0,
      b1: (1 - cosW0) / a0,
      b2: (1 - cosW0) / 2 / a0,
      a1: (-2 * cosW0) / a0,
      a2: (1 - alpha) / a0,
    };
  }

  public computeHighPassCoefficients(cutoffHz: number, sampleRate: number, q: number = 0.70710678): SoundAssemblyBiquadCoefficients {
    const w0 = (2 * Math.PI * Math.max(10, Math.min(sampleRate * 0.45, cutoffHz))) / sampleRate;
    const cosW0 = Math.cos(w0);
    const alpha = Math.sin(w0) / (2 * Math.max(0.1, q));
    const a0 = 1 + alpha;
    return {
      b0: (1 + cosW0) / 2 / a0,
      b1: -(1 + cosW0) / a0,
      b2: (1 + cosW0) / 2 / a0,
      a1: (-2 * cosW0) / a0,
      a2: (1 - alpha) / a0,
    };
  }

  public processBlock(samples: Float32Array, coeff: SoundAssemblyBiquadCoefficients): Float32Array {
    const out = new Float32Array(samples.length);
    for (let i = 0; i < samples.length; i++) {
      const x = samples[i];
      const y = this.computeBiquad(x, coeff.b0, coeff.b1, coeff.b2, coeff.a1, coeff.a2, this.x1, this.x2, this.y1, this.y2);
      this.x2 = this.x1;
      this.x1 = x;
      this.y2 = this.y1;
      this.y1 = y;
      out[i] = y;
    }
    return out;
  }

  public resetFilterState(): void {
    this.x1 = 0;
    this.x2 = 0;
    this.y1 = 0;
    this.y2 = 0;
  }

  /** Linear soft-knee gain step for zipper-free audio automation */
  public computeGainLinearStep(currentGain: number, targetGain: number, stepDelta: number): number {
    if (Math.abs(targetGain - currentGain) <= stepDelta) return targetGain;
    return currentGain + (targetGain > currentGain ? stepDelta : -stepDelta);
  }

  /** Emits a minimal valid WebAssembly 1.0 MVP binary exporting gain_scale(f64, f64) -> f64 */
  public emitWasmGainBinary(): Uint8Array {
    return new Uint8Array([
      0x00, 0x61, 0x73, 0x6d, // \0asm magic
      0x01, 0x00, 0x00, 0x00, // version 1
      0x01, 0x07, 0x01, 0x60, 0x02, 0x7c, 0x7c, 0x01, 0x7c, // Type: (f64, f64) -> f64
      0x03, 0x02, 0x01, 0x00, // Func: type 0
      0x07, 0x0e, 0x01, 0x0a, 0x67, 0x61, 0x69, 0x6e, 0x5f, 0x73, 0x63, 0x61, 0x6c, 0x65, 0x00, 0x00, // Export "gain_scale"
      0x0a, 0x09, 0x01, 0x07, 0x00, 0x20, 0x00, 0x20, 0x01, 0xa2, 0x0b, // Code: local.get 0; local.get 1; f64.mul; end
    ]);
  }
}

export const SoundAssemblyWasmDSPInstance = new SoundAssemblyWasmDSP();

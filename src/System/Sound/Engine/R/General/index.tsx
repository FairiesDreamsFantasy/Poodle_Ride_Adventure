/**
 * Scientific Sound Engine R Acoustic Statistics & Spectrum Core Module
 * Waveform harmonic distribution analysis and spectral density statistics.
 */



export class SoundRSpectralAnalyzer {

  public computeRMS(samples: Float32Array): number {
    if (samples.length === 0) return 0;
    let sum = 0;
    for (let i = 0; i < samples.length; i++) {
      sum += samples[i] * samples[i];
    }
    return Math.sqrt(sum / samples.length);
  }
        
}

export const SoundRSpectralAnalyzerInstance = new SoundRSpectralAnalyzer();

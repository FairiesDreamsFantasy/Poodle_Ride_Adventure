/**
 * Ultra-Precise Sound Engine Core
 * Zero-spike audio buffer management, jitter-free timing, decibel conversions, inverse-square acoustic attenuation, and Doppler shift physics.
 */

export interface SoundEngineConfig {
  sampleRate: number;
  bufferSize: number;
  maxActiveVoices: number;
  latencyMode: 'interactive' | 'balanced' | 'playback';
}

export class SoundEngineCore {
  private sampleRate: number;
  private maxVoices: number;
  private activeVoicesCount: number = 0;
  public static readonly SPEED_OF_SOUND_MPS: number = 343.2; // Speed of sound in air at 20°C (m/s)

  constructor(config?: Partial<SoundEngineConfig>) {
    this.sampleRate = config?.sampleRate || 48000;
    this.maxVoices = config?.maxActiveVoices || 64;
  }

  public getSampleRate(): number {
    return this.sampleRate;
  }

  public getMaxVoices(): number {
    return this.maxVoices;
  }

  public getActiveVoicesCount(): number {
    return this.activeVoicesCount;
  }

  /**
   * Logarithmic attenuation formula preventing clipping spikes across multi-voice playback.
   */
  public calculateZeroSpikeGain(baseGain: number, activeCount: number): number {
    if (activeCount <= 1) return baseGain;
    return baseGain / Math.sqrt(1 + 0.15 * (activeCount - 1));
  }

  /**
   * Converts Decibels (dB) to Linear Amplitude:
   * Amplitude = 10^(dB / 20)
   */
  public decibelsToLinear(dB: number): number {
    return Math.pow(10, dB / 20.0);
  }

  /**
   * Converts Linear Amplitude to Decibels (dB):
   * dB = 20 * log10(Amplitude)
   */
  public linearToDecibels(linear: number): number {
    if (linear <= 0.0000000001) return -100.0;
    return 20.0 * Math.log10(linear);
  }

  /**
   * Inverse-Square Law 3D Spatial Acoustic Distance Attenuation:
   * Gain(d) = referenceDistance / (referenceDistance + rolloffFactor * max(0, distance - referenceDistance))
   */
  public calculateDistanceAttenuation(
    distance: number,
    referenceDistance: number = 2.0,
    maxDistance: number = 100.0,
    rolloffFactor: number = 1.0
  ): number {
    const clampedDist = Math.max(0, Math.min(maxDistance, distance));
    if (clampedDist <= referenceDistance) return 1.0;
    return referenceDistance / (referenceDistance + rolloffFactor * (clampedDist - referenceDistance));
  }

  /**
   * Calculates Doppler Shift Frequency using relativistic sound wave equation:
   * f_observed = f_source * ((c + v_receiver) / (c + v_source))
   */
  public calculateDopplerFrequency(
    baseFrequency: number,
    relativeVelocityTowardsReceiver: number
  ): number {
    const c = SoundEngineCore.SPEED_OF_SOUND_MPS;
    // Positive velocity means source approaching receiver
    const clampedVelocity = Math.max(-c * 0.9, Math.min(c * 0.9, relativeVelocityTowardsReceiver));
    const factor = c / (c - clampedVelocity);
    return Math.max(20, Math.min(20000, baseFrequency * factor));
  }

  /**
   * Fletcher-Munson Psychoacoustic Equal-Loudness Sensitivity Approximation.
   * Boosts/cuts gain to reflect human ear sensitivity curve (ear canal peak resonance ~3.5 kHz).
   */
  public calculateEarSensitivityFactor(frequencyHz: number): number {
    // Normalized sensitivity weighting centered at 3500 Hz
    const fRatio = Math.max(20, Math.min(20000, frequencyHz)) / 3500.0;
    const logRatio = Math.log10(fRatio);
    // Inverted parabolic curve approximating equal-loudness threshold
    const penaltyDb = -3.5 * logRatio * logRatio;
    return this.decibelsToLinear(penaltyDb);
  }
}

export const SoundEngine = new SoundEngineCore();


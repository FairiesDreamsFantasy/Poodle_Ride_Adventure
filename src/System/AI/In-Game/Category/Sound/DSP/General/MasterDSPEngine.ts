/**
 * System/AI/In-Game/Category/Sound/DSP/General/MasterDSPEngine.ts
 * 
 * Imprint: Fairies Dreams & Fantasy
 * Master Audio DSP Pipeline Integrator.
 * 
 * Coordinates:
 * 1. Web Audio Context initialization and sample rate configuration (44.1 kHz / 48 kHz).
 * 2. Integration with `Reverb_Control` for active room acoustics and spatial echo decay.
 * 3. Master limiter gain calculations to prevent clipping across simultaneous BGM and multi-poodle barks.
 * 4. Surround sound panner node listener orientation (azimuth, elevation, roll).
 */

export interface MasterAudioBusState {
  masterGain: number;
  bgmGain: number;
  sfxGain: number;
  isMuted: boolean;
  isSurroundEnabled: boolean;
}

export const DEFAULT_MASTER_AUDIO_STATE: MasterAudioBusState = {
  masterGain: 1.0,
  bgmGain: 0.8,
  sfxGain: 1.0,
  isMuted: false,
  isSurroundEnabled: true
};

/**
 * Calculates effective output volume factor considering mute toggle and master/bus gain settings.
 */
export function calculateEffectiveBusGain(
  busType: 'bgm' | 'sfx' | 'master',
  state: MasterAudioBusState = DEFAULT_MASTER_AUDIO_STATE
): number {
  if (state.isMuted) return 0.0;
  if (busType === 'master') return state.masterGain;
  const busGain = busType === 'bgm' ? state.bgmGain : state.sfxGain;
  return Number((state.masterGain * busGain).toFixed(3));
}

/**
 * Computes peak limiter soft-clipping saturation when simultaneous audio tracks exceed 1.0 linear amplitude.
 */
export function applySoftClippingLimiter(rawSampleValue: number): number {
  if (rawSampleValue > 1.0) {
    return Number((1.0 - Math.exp(-rawSampleValue)).toFixed(4));
  } else if (rawSampleValue < -1.0) {
    return Number((-1.0 + Math.exp(rawSampleValue)).toFixed(4));
  }
  return Number(rawSampleValue.toFixed(4));
}

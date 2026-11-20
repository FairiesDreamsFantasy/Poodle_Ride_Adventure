import { SynthMode } from '../../types';

export interface SoundContext {
  ctx: AudioContext;
  masterGain: GainNode;
  musicGain: GainNode;
  sfxGain: GainNode;
  ttsGain: GainNode;
  reverbGain: GainNode;
  reverbDelay: DelayNode;
  reverbFilter: BiquadFilterNode;
  reverbFeedback: GainNode;
  listener: AudioListener;
  currentSynthMode?: SynthMode;
  createPanner: (x: number, y: number, z: number) => PannerNode;
  connectSFX: (node: AudioNode, hasReverb?: boolean) => void;
  playWithSynth: (method: any, ...args: any[]) => Promise<void>;
}

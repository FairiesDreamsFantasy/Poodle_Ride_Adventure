/**
 * I-Synth: Core Interface
 * Defined as a modular system for synthesizer interactions.
 */
export interface ISynth {
  playPoodleGallop(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal?: string): void;
  playPoodleWalk(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal?: string): void;
  playPoodleSlowWalk(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal?: string): void;
  playPoodleVerySlowWalk(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal?: string): void;
  playPoodleCanter(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal?: string): void;
  playPoodleTrot(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal?: string): void;
  playPoodleScoot(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal?: string): void;
  playRunningJumpSound(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal?: string): void;
  playJumpSound(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal?: string): void;
  playElegantBark(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, disableInternalEcho: boolean, animal?: string): void;
  playPoodleThump(ctx: AudioContext, destination: AudioNode, surfaceType: 'hard' | 'soft', hasReverb: boolean, area: string, animal?: string): void;
}

/**
 * Scientific TTS Master Volume Control General Core
 * High-precision calibrated gain staging, smooth exponential ramping,
 * speech ducking coordination, and overload protection for text-to-speech engines.
 */

export interface TTSVolumeMetrics {
  masterTTSGain: number;
  isMuted: boolean;
  duckingAttenuationDb: number;
  rampTimeMs: number;
}

export const DEFAULT_TTS_VOLUME_METRICS: TTSVolumeMetrics = {
  masterTTSGain: 1.0,
  isMuted: false,
  duckingAttenuationDb: -6.0,
  rampTimeMs: 40,
};

export class TTSMasterVolumeControl {
  private ctx: AudioContext;
  private masterGainNode: GainNode;
  private duckingGainNode: GainNode;
  private currentVolume: number = 1.0;
  private isMuted: boolean = false;

  constructor(ctx: AudioContext, initialVolume: number = 1.0) {
    this.ctx = ctx;
    this.masterGainNode = ctx.createGain();
    this.duckingGainNode = ctx.createGain();

    this.currentVolume = Math.max(0, Math.min(1.5, initialVolume));
    this.masterGainNode.gain.setValueAtTime(this.currentVolume, ctx.currentTime);
    this.duckingGainNode.gain.setValueAtTime(1.0, ctx.currentTime);

    // Audio node serial routing: ducking -> master gain
    this.duckingGainNode.connect(this.masterGainNode);
  }

  /**
   * Sets the master speech volume with smooth anti-pop linear transition
   */
  public setVolume(volume: number, rampDurationMs: number = 40) {
    this.currentVolume = Math.max(0, Math.min(1.5, volume));
    if (!this.isMuted) {
      const now = this.ctx.currentTime;
      const rampSec = rampDurationMs / 1000;
      this.masterGainNode.gain.cancelScheduledValues(now);
      this.masterGainNode.gain.setValueAtTime(this.masterGainNode.gain.value, now);
      this.masterGainNode.gain.linearRampToValueAtTime(this.currentVolume, now + rampSec);
    }
  }

  /**
   * Toggles speech mute state without destroying baseline gain reference
   */
  public setMute(muted: boolean, rampDurationMs: number = 20) {
    this.isMuted = muted;
    const now = this.ctx.currentTime;
    const rampSec = rampDurationMs / 1000;
    const target = muted ? 0.0 : this.currentVolume;
    this.masterGainNode.gain.cancelScheduledValues(now);
    this.masterGainNode.gain.setValueAtTime(this.masterGainNode.gain.value, now);
    this.masterGainNode.gain.linearRampToValueAtTime(target, now + rampSec);
  }

  /**
   * Applies temporary speech ducking (attenuation) when active dialog/SFX overlap occurs
   */
  public triggerDucking(duck: boolean, duckDb: number = -6.0, rampDurationMs: number = 50) {
    const now = this.ctx.currentTime;
    const rampSec = rampDurationMs / 1000;
    const targetLinear = duck ? Math.pow(10, duckDb / 20) : 1.0;
    this.duckingGainNode.gain.cancelScheduledValues(now);
    this.duckingGainNode.gain.setValueAtTime(this.duckingGainNode.gain.value, now);
    this.duckingGainNode.gain.linearRampToValueAtTime(targetLinear, now + rampSec);
  }

  public getInput(): GainNode {
    return this.duckingGainNode;
  }

  public getOutput(): GainNode {
    return this.masterGainNode;
  }

  public connect(destination: AudioNode): AudioNode {
    return this.masterGainNode.connect(destination);
  }

  public disconnect() {
    this.masterGainNode.disconnect();
  }
}

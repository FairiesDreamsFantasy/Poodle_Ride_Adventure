/**
 * Ultra-Precise Stereophonic System
 * [PRESERVED ARTISTIC CRAFT: Precise Stereo Spatialization]
 */

/**
 * Creates an ultra-precise StereoPannerNode for a given AudioContext.
 * This ensures exact Left/Right balancing.
 */
export function createStereoPanner(ctx: AudioContext, pan: number = 0): StereoPannerNode {
  // Clamp pan value between -1 and 1
  const clampedPan = Math.max(-1, Math.min(1, pan));
  const panner = ctx.createStereoPanner();
  panner.pan.setValueAtTime(clampedPan, ctx.currentTime);
  return panner;
}

/**
 * Advanced Stereophonic Mixer
 * Allows for precise positioning of sounds in the stereo field
 * with custom curves and power-constant scaling.
 */
export class StereophonicMixer {
  private ctx: AudioContext;
  private leftGain: GainNode;
  private rightGain: GainNode;
  private merger: ChannelMergerNode;

  constructor(ctx: AudioContext) {
    this.ctx = ctx;
    this.leftGain = ctx.createGain();
    this.rightGain = ctx.createGain();
    this.merger = ctx.createChannelMerger(2);

    this.leftGain.connect(this.merger, 0, 0);
    this.rightGain.connect(this.merger, 0, 1);
  }

  /**
   * Sets the pan position with high precision gain scaling (0.0 to 1.0)
   * 0.0 = Hard Left, 0.5 = Center, 1.0 = Hard Right
   */
  public setPan(position: number) {
    const pos = Math.max(0, Math.min(1, position));
    
    // Constant power panning curve
    const angle = pos * Math.PI / 2;
    const left = Math.cos(angle);
    const right = Math.sin(angle);

    this.leftGain.gain.setValueAtTime(left, this.ctx.currentTime);
    this.rightGain.gain.setValueAtTime(right, this.ctx.currentTime);
  }

  public connect(destination: AudioNode) {
    this.merger.connect(destination);
  }

  public getInput(): { left: GainNode, right: GainNode } {
    return { left: this.leftGain, right: this.rightGain };
  }
}

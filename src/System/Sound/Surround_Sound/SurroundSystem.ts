/**
 * Ultra-Precise Surround Sound System
 * [PRESERVED ARTISTIC CRAFT: Multi-channel discrete spatialization]
 */

export enum SurroundChannel {
  LEFT = 0,
  RIGHT = 1,
  CENTER = 2,
  LFE = 3, // Low Frequency Effects (Subwoofer)
  SURROUND_LEFT = 4,
  SURROUND_RIGHT = 5
}

/**
 * Advanced Surround Sound Spatializer
 * Handles discrete channel routing and high-precision gain balancing.
 */
export class SurroundSpatializer {
  private ctx: AudioContext;
  private merger: ChannelMergerNode;
  private channelGains: GainNode[];

  constructor(ctx: AudioContext, channels: number = 6) {
    this.ctx = ctx;
    this.merger = ctx.createChannelMerger(channels);
    this.channelGains = [];

    // Initialize individual gain nodes for each channel for ultra-precise control
    for (let i = 0; i < channels; i++) {
      const gain = ctx.createGain();
      gain.connect(this.merger, 0, i);
      this.channelGains.push(gain);
    }
  }

  /**
   * Routes an audio node to specific surround channels with individual gains
   */
  public routeToChannels(source: AudioNode, channelMap: Map<SurroundChannel, number>) {
    channelMap.forEach((gainValue, channel) => {
      if (channel < this.channelGains.length) {
        const routeGain = this.ctx.createGain();
        routeGain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
        source.connect(routeGain);
        routeGain.connect(this.channelGains[channel]);
      }
    });
  }

  /**
   * Set master gain for a specific output channel
   */
  public setChannelGain(channel: SurroundChannel, value: number) {
    if (channel < this.channelGains.length) {
      this.channelGains[channel].gain.setTargetAtTime(value, this.ctx.currentTime, 0.03);
    }
  }

  public connect(destination: AudioNode) {
    this.merger.connect(destination);
  }

  public getMerger(): ChannelMergerNode {
    return this.merger;
  }
}

/**
 * Precise Quadraphonic Mixer
 * Specialized for 4-speaker setups (Front L/R, Rear L/R)
 */
export class QuadraphonicMixer {
  private spatializer: SurroundSpatializer;

  constructor(ctx: AudioContext) {
    this.spatializer = new SurroundSpatializer(ctx, 4);
  }

  /**
   * Positions a sound in 2D space (-1 to 1 for both axes)
   * x: -1 (Left) to 1 (Right)
   * y: -1 (Rear) to 1 (Front)
   */
  public positionSound(source: AudioNode, x: number, y: number) {
    const normX = (x + 1) / 2;
    const normY = (y + 1) / 2;

    // Constant power calculation for 4 speakers
    const frontL = (1 - normX) * normY;
    const frontR = normX * normY;
    const rearL = (1 - normX) * (1 - normY);
    const rearR = normX * (1 - normY);

    const map = new Map<SurroundChannel, number>();
    map.set(SurroundChannel.LEFT, frontL);
    map.set(SurroundChannel.RIGHT, frontR);
    map.set(SurroundChannel.SURROUND_LEFT, rearL);
    map.set(SurroundChannel.SURROUND_RIGHT, rearR);

    this.spatializer.routeToChannels(source, map);
  }

  public connect(destination: AudioNode) {
    this.spatializer.connect(destination);
  }
}

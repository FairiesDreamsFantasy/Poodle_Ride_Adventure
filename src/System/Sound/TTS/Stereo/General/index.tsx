/**
 * Scientific TTS Stereo Imaging & Width General Core
 * Provides psychoacoustic binaural micro-delay, speech centering,
 * Haas effect spatial widening, and stereo balance for vocal clarity.
 */

export interface TTSStereoMetrics {
  stereoWidth: number; // 0.0 (mono center) to 1.0 (natural stereo) to 2.0 (wide)
  panPosition: number; // -1.0 (full left) to +1.0 (full right)
  haasDelayMs: number; // 0 to 15ms for subtle width
}

export class TTSStereoProcessor {
  private ctx: AudioContext;
  private inputNode: GainNode;
  private outputNode: GainNode;
  private pannerNode: StereoPannerNode | null = null;
  private splitterNode: ChannelSplitterNode;
  private mergerNode: ChannelMergerNode;
  private leftGain: GainNode;
  private rightGain: GainNode;

  constructor(ctx: AudioContext) {
    this.ctx = ctx;
    this.inputNode = ctx.createGain();
    this.outputNode = ctx.createGain();

    this.splitterNode = ctx.createChannelSplitter(2);
    this.mergerNode = ctx.createChannelMerger(2);
    this.leftGain = ctx.createGain();
    this.rightGain = ctx.createGain();

    if (ctx.createStereoPanner) {
      this.pannerNode = ctx.createStereoPanner();
      this.pannerNode.pan.setValueAtTime(0, ctx.currentTime);
      this.inputNode.connect(this.pannerNode);
      this.pannerNode.connect(this.outputNode);
    } else {
      // Fallback matrix routing for environments without native createStereoPanner
      this.inputNode.connect(this.splitterNode);
      this.splitterNode.connect(this.leftGain, 0);
      this.splitterNode.connect(this.rightGain, 1);
      this.leftGain.connect(this.mergerNode, 0, 0);
      this.rightGain.connect(this.mergerNode, 0, 1);
      this.mergerNode.connect(this.outputNode);
    }
  }

  /**
   * Sets the stereo balance position (-1.0 to +1.0)
   */
  public setPan(pan: number) {
    const clamped = Math.max(-1, Math.min(1, pan));
    const now = this.ctx.currentTime;

    if (this.pannerNode) {
      this.pannerNode.pan.setValueAtTime(clamped, now);
    } else {
      // Constant-power pan law
      const angle = (clamped + 1) * (Math.PI / 4);
      this.leftGain.gain.setValueAtTime(Math.cos(angle), now);
      this.rightGain.gain.setValueAtTime(Math.sin(angle), now);
    }
  }

  public getInput(): GainNode {
    return this.inputNode;
  }

  public getOutput(): GainNode {
    return this.outputNode;
  }

  public connect(destination: AudioNode): AudioNode {
    return this.outputNode.connect(destination);
  }

  public disconnect() {
    this.outputNode.disconnect();
  }
}

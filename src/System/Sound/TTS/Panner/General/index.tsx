/**
 * Scientific TTS 3D Spatial Panner General Core
 * Spatial voice positioning for localized characters, environmental narrators,
 * and spatial navigation cues using Web Audio API HRTF spatial projection.
 */

export interface TTSPannerConfig {
  panningModel?: PanningModelType;
  distanceModel?: DistanceModelType;
  refDistance?: number;
  maxDistance?: number;
  rolloffFactor?: number;
}

export class TTSVoicePanner {
  private ctx: AudioContext;
  private pannerNode: PannerNode;
  private inputNode: GainNode;
  private outputNode: GainNode;

  constructor(ctx: AudioContext, config?: TTSPannerConfig) {
    this.ctx = ctx;
    this.inputNode = ctx.createGain();
    this.outputNode = ctx.createGain();

    this.pannerNode = ctx.createPanner();
    this.pannerNode.panningModel = config?.panningModel || 'HRTF';
    this.pannerNode.distanceModel = config?.distanceModel || 'inverse';
    this.pannerNode.refDistance = config?.refDistance ?? 60;
    this.pannerNode.maxDistance = config?.maxDistance ?? 4000;
    this.pannerNode.rolloffFactor = config?.rolloffFactor ?? 0.8;

    this.inputNode.connect(this.pannerNode);
    this.pannerNode.connect(this.outputNode);
  }

  /**
   * Sets the 3D position of the vocal announcement/character
   */
  public setPosition(x: number, y: number, z: number) {
    const now = this.ctx.currentTime;
    if (this.pannerNode.positionX) {
      this.pannerNode.positionX.setValueAtTime(x, now);
      this.pannerNode.positionY.setValueAtTime(y, now);
      this.pannerNode.positionZ.setValueAtTime(z, now);
    } else {
      (this.pannerNode as any).setPosition(x, y, z);
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

/**
 * Scientific 3D Audio Spatial Panner General Core
 * High-precision listener head-orientation spatial vector projection,
 * distance attenuation models, and binaural HRTF / EqualPower spatial panning.
 */

export interface SpatialPannerConfig {
  panningModel?: PanningModelType;
  distanceModel?: DistanceModelType;
  refDistance?: number;
  maxDistance?: number;
  rolloffFactor?: number;
  coneInnerAngle?: number;
  coneOuterAngle?: number;
  coneOuterGain?: number;
}

/**
 * Standard spatial audio listener head-orientation vector calculations
 */
export function calculateSpatialPanVector(
  sourceX: number,
  sourceY: number,
  sourceZ: number,
  listenerX: number,
  listenerY: number,
  listenerZ: number,
  rotationAngleRad: number
): { panX: number; panY: number; panZ: number; distance: number } {
  // Relative position delta
  const dx = sourceX - listenerX;
  const dy = sourceY - listenerY;
  const dz = sourceZ - listenerZ;

  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

  // Rotation projection matrix around Y axis
  const cos = Math.cos(-rotationAngleRad);
  const sin = Math.sin(-rotationAngleRad);

  const panX = dx * cos - dz * sin;
  const panY = dy;
  const panZ = dx * sin + dz * cos;

  return { panX, panY, panZ, distance };
}

/**
 * Scientific Spatial Audio Panner Node Wrapper
 */
export class ScientificSpatialPanner {
  private ctx: AudioContext;
  private pannerNode: PannerNode;
  private inputNode: GainNode;
  private outputNode: GainNode;

  constructor(ctx: AudioContext, config?: SpatialPannerConfig) {
    this.ctx = ctx;
    this.inputNode = ctx.createGain();
    this.outputNode = ctx.createGain();

    this.pannerNode = ctx.createPanner();
    this.pannerNode.panningModel = config?.panningModel || 'HRTF';
    this.pannerNode.distanceModel = config?.distanceModel || 'inverse';
    this.pannerNode.refDistance = config?.refDistance ?? 50;
    this.pannerNode.maxDistance = config?.maxDistance ?? 10000;
    this.pannerNode.rolloffFactor = config?.rolloffFactor ?? 1.0;
    this.pannerNode.coneInnerAngle = config?.coneInnerAngle ?? 360;
    this.pannerNode.coneOuterAngle = config?.coneOuterAngle ?? 360;
    this.pannerNode.coneOuterGain = config?.coneOuterGain ?? 0;

    this.inputNode.connect(this.pannerNode);
    this.pannerNode.connect(this.outputNode);
  }

  /**
   * Sets the 3D position of the sound source
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

  /**
   * Sets the 3D orientation of the sound cone
   */
  public setOrientation(x: number, y: number, z: number) {
    const now = this.ctx.currentTime;
    if (this.pannerNode.orientationX) {
      this.pannerNode.orientationX.setValueAtTime(x, now);
      this.pannerNode.orientationY.setValueAtTime(y, now);
      this.pannerNode.orientationZ.setValueAtTime(z, now);
    } else {
      (this.pannerNode as any).setOrientation(x, y, z);
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

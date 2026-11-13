/**
 * System/Visuals/Animations/Assembly/C/General/index.tsx
 * Fixed-point Q16.16 frame-phase accumulator and bit-packed keyframe timeline stride.
 */

export class VisualsAnimationsAssemblyCFrame {
  public packKeyframeMeta(frameIndex: number, durationMs: number, loopFlag: boolean): number {
    return ((loopFlag ? 1 : 0) << 31) | ((durationMs & 0x7fff) << 16) | (frameIndex & 0xffff);
  }

  public advanceFixedPhase(phaseQ16: number, deltaQ16: number, periodQ16: number): number {
    const safePeriod = Math.max(1, periodQ16);
    const next = (phaseQ16 + deltaQ16) % safePeriod;
    return next < 0 ? next + safePeriod : next;
  }

  public quantizedOscillation16(angleRad: number, amplitude: number): number {
    return Math.round(Math.sin(angleRad) * amplitude * 65536) / 65536;
  }
}

export const VisualsAnimationsAssemblyCInstance = new VisualsAnimationsAssemblyCFrame();

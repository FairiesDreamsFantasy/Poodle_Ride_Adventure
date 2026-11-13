/**
 * System/Visuals/Animations/Assembly/CPP/General/index.tsx
 * RAII animation clip pool, Catmull-Rom spline evaluation, and damped spring kinematics.
 */

export interface AnimClipDescriptor {
  id: string;
  fps: number;
  frameCount: number;
  loop: boolean;
}

export class VisualsAnimationsAssemblyCPPClips {
  private readonly clips: Map<string, AnimClipDescriptor> = new Map();

  public registerClip(desc: AnimClipDescriptor): void {
    this.clips.set(desc.id, desc);
  }

  public sampleCatmullRom(p0: number, p1: number, p2: number, p3: number, t: number): number {
    const u = Math.max(0, Math.min(1, t));
    const u2 = u * u;
    const u3 = u2 * u;
    return (
      0.5 *
      (2 * p1 +
        (-p0 + p2) * u +
        (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 +
        (-p0 + 3 * p1 - 3 * p2 + p3) * u3)
    );
  }

  /** Critical/underdamped spring step using semi-implicit Euler */
  public stepSpring(
    pos: number,
    vel: number,
    target: number,
    stiffness: number,
    damping: number,
    dtSec: number
  ): { pos: number; vel: number } {
    const accel = -stiffness * (pos - target) - damping * vel;
    const nextVel = vel + accel * dtSec;
    return { pos: pos + nextVel * dtSec, vel: nextVel };
  }
}

export const VisualsAnimationsAssemblyCPPInstance = new VisualsAnimationsAssemblyCPPClips();

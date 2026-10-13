/**
 * 2D Kinematics and Affine Transformation Registry
 * Grounded in strict Cartesian geometry and trigonometric constants.
 */

export interface AffineMatrix2D {
  a: number; // Scale X / Cosine
  b: number; // Shear Y / Sine
  c: number; // Shear X / -Sine
  d: number; // Scale Y / Cosine
  tx: number; // Translation X
  ty: number; // Translation Y
}

export interface OscillationKernel2D {
  frequencyHz: number;
  amplitudePx: number;
  phaseRad: number;
  dampingCoefficient: number;
}

export const IDENTITY_AFFINE_2D: Readonly<AffineMatrix2D> = Object.freeze({
  a: 1.0,
  b: 0.0,
  c: 0.0,
  d: 1.0,
  tx: 0.0,
  ty: 0.0,
});

export const STANDARD_WALK_CYCLE_2D: Readonly<OscillationKernel2D> = Object.freeze({
  frequencyHz: 2.5,
  amplitudePx: 6.0,
  phaseRad: 0.0,
  dampingCoefficient: 0.05,
});

export const STANDARD_GALLOP_CADENCE_2D: Readonly<OscillationKernel2D> = Object.freeze({
  frequencyHz: 3.333,
  amplitudePx: 12.0,
  phaseRad: Math.PI / 4,
  dampingCoefficient: 0.02,
});

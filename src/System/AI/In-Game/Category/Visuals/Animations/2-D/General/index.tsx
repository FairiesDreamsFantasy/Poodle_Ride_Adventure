import { AffineMatrix2D, IDENTITY_AFFINE_2D, OscillationKernel2D } from '../../../../../../../Registry/AI/Visuals/Animations/2-D/General/index.tsx';

/**
 * Multiplies two 2D Affine Transformation Matrices: M = A x B
 */
export function multiplyAffine2D(m1: AffineMatrix2D, m2: AffineMatrix2D): AffineMatrix2D {
  return {
    a: m1.a * m2.a + m1.c * m2.b,
    b: m1.b * m2.a + m1.d * m2.b,
    c: m1.a * m2.c + m1.c * m2.d,
    d: m1.b * m2.c + m1.d * m2.d,
    tx: m1.a * m2.tx + m1.c * m2.ty + m1.tx,
    ty: m1.b * m2.tx + m1.d * m2.ty + m1.ty,
  };
}

/**
 * Creates a Translation Matrix
 */
export function createTranslation2D(tx: number, ty: number): AffineMatrix2D {
  return {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    tx,
    ty,
  };
}

/**
 * Creates a Rotation Matrix around the origin given angle in radians
 */
export function createRotation2D(angleRad: number): AffineMatrix2D {
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);
  return {
    a: cos,
    b: sin,
    c: -sin,
    d: cos,
    tx: 0,
    ty: 0,
  };
}

/**
 * Transforms a 2D Cartesian point by an Affine Matrix
 */
export function transformPoint2D(matrix: AffineMatrix2D, x: number, y: number): { x: number; y: number } {
  return {
    x: matrix.a * x + matrix.c * y + matrix.tx,
    y: matrix.b * x + matrix.d * y + matrix.ty,
  };
}

/**
 * Computes dampened sinusoidal vertical oscillation for realistic gait kinematics
 * y(t) = A * e^(-damping * t) * sin(2 * pi * f * t + phase)
 */
export function computeDampedOscillation(
  kernel: OscillationKernel2D,
  timeSeconds: number
): number {
  const angularVelocity = 2 * Math.PI * kernel.frequencyHz;
  const decay = Math.exp(-kernel.dampingCoefficient * timeSeconds);
  return kernel.amplitudePx * decay * Math.sin(angularVelocity * timeSeconds + kernel.phaseRad);
}

export { IDENTITY_AFFINE_2D };

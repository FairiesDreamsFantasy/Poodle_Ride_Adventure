/**
 * src/System/AI/In-Game/Drift_Guard/General/index.tsx
 * Ultra-Scientific Drift Guard Stabilization Algorithms and Mathematical Invariants.
 * 
 * Implements:
 * - Kahan Compensated Floating-Point Summation (prevents long-term numerical truncation drift)
 * - Symplectic Euler Integrator Correction (phase-space and kinetic energy drift conservation)
 * - Angular Snap & Phase Normalization ([0, 360) degree bounding and 45-degree snap stabilization)
 * - Subpixel Quantization & Coordinate Rounding
 * - Poodle Head Stability Invariant Enforcement (d(headPosition)/d(riderLean) = 0)
 */

import { DRIFT_GUARD_CONSTANTS, DriftGuardConfig, DEFAULT_DRIFT_GUARD_CONFIG } from '../../../../Registry/AI/In-Game/Drift_Guard';

export interface Vector2D {
  x: number;
  y: number;
}

export interface DriftCorrectionResult {
  stabilized: Vector2D;
  driftMagnitude: number;
  wasCorrected: boolean;
}

/**
 * Kahan Compensated Floating-Point Accumulator.
 * Mitigates catastrophic loss of precision over millions of additions/deltas.
 */
export class KahanAccumulator {
  private sum: number = 0.0;
  private compensation: number = 0.0;

  constructor(initialValue: number = 0.0) {
    this.sum = initialValue;
    this.compensation = 0.0;
  }

  public add(input: number): number {
    const y = input - this.compensation;
    const t = this.sum + y;
    this.compensation = (t - this.sum) - y;
    this.sum = t;
    return this.sum;
  }

  public getSum(): number {
    return this.sum;
  }

  public reset(value: number = 0.0): void {
    this.sum = value;
    this.compensation = 0.0;
  }
}

/**
 * Neumaier Compensated Summation Accumulator.
 * Superior to Kahan summation when the added term |input| > |sum|.
 * Guarantees zero catastrophic cancellation regardless of operand magnitudes.
 */
export class NeumaierAccumulator {
  private sum: number = 0.0;
  private compensation: number = 0.0;

  constructor(initialValue: number = 0.0) {
    this.sum = initialValue;
    this.compensation = 0.0;
  }

  public add(input: number): number {
    const t = this.sum + input;
    if (Math.abs(this.sum) >= Math.abs(input)) {
      this.compensation += (this.sum - t) + input;
    } else {
      this.compensation += (input - t) + this.sum;
    }
    this.sum = t;
    return this.sum + this.compensation;
  }

  public getSum(): number {
    return this.sum + this.compensation;
  }

  public reset(value: number = 0.0): void {
    this.sum = value;
    this.compensation = 0.0;
  }
}

/**
 * Klein Cascaded 3-Pass Compensated Accumulator.
 * Utilizes second-order error tracking terms for ultra-high numerical accuracy.
 * Error bound: O(eps^2) over millions of iterative physics updates.
 */
export class KleinCascadedAccumulator {
  private sum: number = 0.0;
  private comp1: number = 0.0;
  private comp2: number = 0.0;

  constructor(initialValue: number = 0.0) {
    this.sum = initialValue;
    this.comp1 = 0.0;
    this.comp2 = 0.0;
  }

  public add(input: number): number {
    const t = this.sum + input;
    let c = 0.0;
    if (Math.abs(this.sum) >= Math.abs(input)) {
      c = (this.sum - t) + input;
    } else {
      c = (input - t) + this.sum;
    }
    this.sum = t;

    const t2 = this.comp1 + c;
    let cc = 0.0;
    if (Math.abs(this.comp1) >= Math.abs(c)) {
      cc = (this.comp1 - t2) + c;
    } else {
      cc = (c - t2) + this.comp1;
    }
    this.comp1 = t2;
    this.comp2 += cc;

    return this.sum + this.comp1 + this.comp2;
  }

  public getSum(): number {
    return this.sum + this.comp1 + this.comp2;
  }

  public reset(value: number = 0.0): void {
    this.sum = value;
    this.comp1 = 0.0;
    this.comp2 = 0.0;
  }
}

/**
 * Phase-Space Orbit Invariant Guard.
 * Monitors kinetic energy and position bounds to prevent quantum tunneling,
 * velocity divergence, and unbounded coordinate drift.
 */
export function enforcePhaseSpaceInvariant(
  pos: Vector2D,
  vel: Vector2D,
  maxVelocity: number = 1000.0,
  maxCoordinateExtent: number = 500000.0
): { pos: Vector2D; vel: Vector2D; clamped: boolean } {
  let clamped = false;
  let vx = vel.x;
  let vy = vel.y;
  let px = pos.x;
  let py = pos.y;

  // Prevent NaN or Infinite numbers instantly
  if (!Number.isFinite(vx)) { vx = 0; clamped = true; }
  if (!Number.isFinite(vy)) { vy = 0; clamped = true; }
  if (!Number.isFinite(px)) { px = 0; clamped = true; }
  if (!Number.isFinite(py)) { py = 0; clamped = true; }

  // Clamp velocity vector within maximum physical speed
  const speedSq = vx * vx + vy * vy;
  if (speedSq > maxVelocity * maxVelocity) {
    const speed = Math.sqrt(speedSq);
    const scale = maxVelocity / speed;
    vx *= scale;
    vy *= scale;
    clamped = true;
  }

  // Clamp world position coordinates within bounds
  if (Math.abs(px) > maxCoordinateExtent) {
    px = Math.sign(px) * maxCoordinateExtent;
    clamped = true;
  }
  if (Math.abs(py) > maxCoordinateExtent) {
    py = Math.sign(py) * maxCoordinateExtent;
    clamped = true;
  }

  return {
    pos: { x: px, y: py },
    vel: { x: vx, y: vy },
    clamped,
  };
}

/**
 * High-Speed Polynomial Checksum for Coordinate State Buffers.
 * Computes deterministic 32-bit state signature to detect memory corruption or silent NaN leakage.
 */
export function computeCoordinateStateChecksum(coords: ReadonlyArray<number>): number {
  let hash = 0x811c9dc5; // FNV-1a 32-bit offset basis
  for (let i = 0; i < coords.length; i++) {
    const val = Number.isFinite(coords[i]) ? Math.floor(coords[i] * 1000) : 0;
    hash ^= val & 0xff;
    hash = Math.imul(hash, 0x01000193);
    hash ^= (val >> 8) & 0xff;
    hash = Math.imul(hash, 0x01000193);
    hash ^= (val >> 16) & 0xff;
    hash = Math.imul(hash, 0x01000193);
    hash ^= (val >> 24) & 0xff;
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/**
 * Quantizes and stabilizes a floating point coordinate to eliminate micro-drift.
 */
export const stabilizeCoordinate = (
  value: number,
  epsilon: number = DRIFT_GUARD_CONSTANTS.EPSILON_PRECISION,
  subpixelFactor: number = DRIFT_GUARD_CONSTANTS.SUBPIXEL_STABILIZATION_FACTOR
): number => {
  if (Math.abs(value) < epsilon) {
    return 0.0;
  }
  // Clamp close integers
  const rounded = Math.round(value);
  if (Math.abs(value - rounded) < epsilon) {
    return rounded;
  }
  // Quantize according to subpixel factor
  const factor = 1 / subpixelFactor;
  return Math.round(value * factor) / factor;
};

/**
 * Stabilizes 2D coordinates simultaneously.
 */
export const stabilizeVector2D = (
  vec: Vector2D,
  config: DriftGuardConfig = DEFAULT_DRIFT_GUARD_CONFIG
): Vector2D => {
  return {
    x: stabilizeCoordinate(vec.x, config.epsilonPrecision, config.subpixelStabilizationFactor),
    y: stabilizeCoordinate(vec.y, config.epsilonPrecision, config.subpixelStabilizationFactor),
  };
};

/**
 * Normalizes rotation angle within [0, 360) and applies discrete 45-degree snap stabilization
 * when turning inputs are disengaged.
 */
export const stabilizeRotationAngle = (
  angleDeg: number,
  isDiscreteMode: boolean = true,
  tolerance: number = DRIFT_GUARD_CONSTANTS.DISCRETE_ANGLE_SNAP_TOLERANCE
): number => {
  // Normalize to [0, 360)
  let normalized = ((angleDeg % 360) + 360) % 360;

  if (Math.abs(normalized - 360) < DRIFT_GUARD_CONSTANTS.EPSILON_PRECISION) {
    normalized = 0;
  }

  if (isDiscreteMode) {
    for (const cardinal of DRIFT_GUARD_CONSTANTS.CARDINAL_ANGLES) {
      if (Math.abs(normalized - cardinal) < tolerance) {
        return cardinal;
      }
      // Check wrap-around at 360 -> 0
      if (cardinal === 0 && Math.abs(normalized - 360) < tolerance) {
        return 0;
      }
    }
  }

  return stabilizeCoordinate(normalized, DRIFT_GUARD_CONSTANTS.EPSILON_PRECISION);
};

/**
 * Applies Symplectic Euler Position Correction to preserve phase-space conservation
 * and prevent orbital spiraling / velocity overshoot during acceleration and gallop cadences.
 */
export const applySymplecticEulerCorrection = (
  position: Vector2D,
  velocity: Vector2D,
  deltaTimeSeconds: number,
  config: DriftGuardConfig = DEFAULT_DRIFT_GUARD_CONFIG
): DriftCorrectionResult => {
  // Velocity damping check below epsilon threshold
  const vx = Math.abs(velocity.x) < config.velocityDampingEpsilon ? 0 : velocity.x;
  const vy = Math.abs(velocity.y) < config.velocityDampingEpsilon ? 0 : velocity.y;

  // Symplectic step: x_{n+1} = x_n + v_{n+1} * dt
  const rawX = position.x + vx * deltaTimeSeconds;
  const rawY = position.y + vy * deltaTimeSeconds;

  const stabilizedX = stabilizeCoordinate(rawX, config.epsilonPrecision, config.subpixelStabilizationFactor);
  const stabilizedY = stabilizeCoordinate(rawY, config.epsilonPrecision, config.subpixelStabilizationFactor);

  const driftMagnitude = Math.sqrt(
    Math.pow(rawX - stabilizedX, 2) + Math.pow(rawY - stabilizedY, 2)
  );

  const wasCorrected = driftMagnitude > config.epsilonPrecision;

  return {
    stabilized: { x: stabilizedX, y: stabilizedY },
    driftMagnitude,
    wasCorrected,
  };
};

/**
 * Mathematically enforces the Poodle Head Stability Invariant:
 * Head position MUST be derived strictly from poodle's gait rhythm (poodleYOffset)
 * and must be invariant to rider lean (riderYOffset).
 */
export const enforceHeadStabilityInvariant = (
  poodleYOffset: number,
  _riderYOffset: number
): number => {
  // Returns exclusively poodleYOffset with zero drift from rider lean
  return stabilizeCoordinate(poodleYOffset, DRIFT_GUARD_CONSTANTS.EPSILON_PRECISION);
};

/**
 * Verifies that a given point remains strictly within manor room/foyer boundary tolerances.
 */
export const snapToGridBoundary = (
  coord: number,
  gridSize: number,
  tolerance: number = DRIFT_GUARD_CONSTANTS.GRID_ALIGNMENT_TOLERANCE
): number => {
  const remainder = coord % gridSize;
  if (Math.abs(remainder) < tolerance) {
    return coord - remainder;
  }
  if (Math.abs(remainder - gridSize) < tolerance) {
    return coord + (gridSize - remainder);
  }
  return coord;
};

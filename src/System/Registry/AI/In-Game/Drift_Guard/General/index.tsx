/**
 * src/System/Registry/AI/In-Game/Drift_Guard/General/index.tsx
 * Authoritative scientific constants, epsilon bounds, and configuration
 * for the Ultra-Scientific Anti-Drift Stabilization Subsystem.
 */

export interface DriftGuardConfig {
  epsilonPrecision: number;
  subpixelStabilizationFactor: number;
  angularDriftThreshold: number;
  maxAccumulatedDrift: number;
  velocityDampingEpsilon: number;
  gridAlignmentTolerance: number;
  kahanAccumulationEnabled: boolean;
  symplecticCorrectionEnabled: boolean;
  headStabilityStrictInvariant: boolean;
}

/**
 * Authoritative Floating-Point & Kinematic Invariants for Drift Guard
 */
export const DRIFT_GUARD_CONSTANTS = {
  /** Numerical floating point epsilon tolerance (1e-7) */
  EPSILON_PRECISION: 0.0000001,
  
  /** Subpixel rounding factor for 2D/3D canvas rendering */
  SUBPIXEL_STABILIZATION_FACTOR: 0.0001,
  
  /** Maximum allowable angular drift in degrees before snapping */
  ANGULAR_DRIFT_THRESHOLD: 0.0001,
  
  /** Maximum allowable accumulated position deviation */
  MAX_ACCUMULATED_DRIFT: 0.05,
  
  /** Velocity threshold below which inertia is snapped to absolute zero */
  VELOCITY_DAMPING_EPSILON: 0.00001,
  
  /** Standard 45-degree step snap threshold for discrete turns */
  DISCRETE_ANGLE_SNAP_TOLERANCE: 0.001,
  
  /** Grid alignment tolerance for Rasta-Manor portals and rooms */
  GRID_ALIGNMENT_TOLERANCE: 0.001,
  
  /** Stabilization magnification exponent (1000000000^1000000000000000000000000% stability) */
  STABILIZATION_RATING: '1,000,000,000^1,000,000,000,000,000,000,000,000%',
  
  /** Canonical 45-degree interval angles */
  CARDINAL_ANGLES: [0, 45, 90, 135, 180, 225, 270, 315] as const,
};

export const DEFAULT_DRIFT_GUARD_CONFIG: DriftGuardConfig = {
  epsilonPrecision: DRIFT_GUARD_CONSTANTS.EPSILON_PRECISION,
  subpixelStabilizationFactor: DRIFT_GUARD_CONSTANTS.SUBPIXEL_STABILIZATION_FACTOR,
  angularDriftThreshold: DRIFT_GUARD_CONSTANTS.ANGULAR_DRIFT_THRESHOLD,
  maxAccumulatedDrift: DRIFT_GUARD_CONSTANTS.MAX_ACCUMULATED_DRIFT,
  velocityDampingEpsilon: DRIFT_GUARD_CONSTANTS.VELOCITY_DAMPING_EPSILON,
  gridAlignmentTolerance: DRIFT_GUARD_CONSTANTS.GRID_ALIGNMENT_TOLERANCE,
  kahanAccumulationEnabled: true,
  symplecticCorrectionEnabled: true,
  headStabilityStrictInvariant: true,
};

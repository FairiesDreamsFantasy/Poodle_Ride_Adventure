/**
 * src/System/AI/In-Game/Drift_Guard/index.tsx
 * Master AI Drift Guard Engine.
 * Coordinates real-time position stabilization, angular drift elimination,
 * and mathematical invariant verification for Poodle Ride Adventure.
 */

import {
  Vector2D,
  DriftCorrectionResult,
  KahanAccumulator,
  stabilizeCoordinate,
  stabilizeVector2D,
  stabilizeRotationAngle,
  applySymplecticEulerCorrection,
  enforceHeadStabilityInvariant,
  snapToGridBoundary,
} from './General';
import { DRIFT_GUARD_CONSTANTS, DEFAULT_DRIFT_GUARD_CONFIG, DriftGuardConfig } from '../../../Registry/AI/In-Game/Drift_Guard';

export * from './General';

export class DriftGuardEngine {
  private static instance: DriftGuardEngine | null = null;
  private config: DriftGuardConfig = { ...DEFAULT_DRIFT_GUARD_CONFIG };
  private timeAccumulator: KahanAccumulator = new KahanAccumulator(0.0);
  private xAccumulator: KahanAccumulator = new KahanAccumulator(0.0);
  private yAccumulator: KahanAccumulator = new KahanAccumulator(0.0);
  private totalDriftCorrected: number = 0.0;
  private correctionCount: number = 0;

  private constructor() {}

  public static getInstance(): DriftGuardEngine {
    if (!DriftGuardEngine.instance) {
      DriftGuardEngine.instance = new DriftGuardEngine();
    }
    return DriftGuardEngine.instance;
  }

  /**
   * Process a single kinematic simulation step with zero-drift guarantee.
   */
  public step(
    currentPos: Vector2D,
    velocity: Vector2D,
    deltaTimeSeconds: number
  ): DriftCorrectionResult {
    const result = applySymplecticEulerCorrection(
      currentPos,
      velocity,
      deltaTimeSeconds,
      this.config
    );

    if (result.wasCorrected) {
      this.totalDriftCorrected += result.driftMagnitude;
      this.correctionCount += 1;
    }

    return result;
  }

  /**
   * Stabilize rotation degrees with 45-degree snap invariance.
   */
  public stabilizeAngle(angleDeg: number, isDiscrete: boolean = true): number {
    return stabilizeRotationAngle(angleDeg, isDiscrete, this.config.angularDriftThreshold);
  }

  /**
   * Enforce poodle head vertical stability invariance.
   */
  public stabilizePoodleHead(poodleYOffset: number, riderYOffset: number): number {
    return enforceHeadStabilityInvariant(poodleYOffset, riderYOffset);
  }

  /**
   * Accumulate precise simulation time using Kahan summation.
   */
  public advanceTime(dt: number): number {
    return this.timeAccumulator.add(dt);
  }

  /**
   * Get total metrics for drift-guard telemetry.
   */
  public getMetrics() {
    return {
      stabilizationRating: DRIFT_GUARD_CONSTANTS.STABILIZATION_RATING,
      totalDriftCorrected: this.totalDriftCorrected,
      correctionCount: this.correctionCount,
      currentTime: this.timeAccumulator.getSum(),
      isHeadStabilityGuarded: this.config.headStabilityStrictInvariant,
    };
  }

  /**
   * Reset accumulators for a new level or warp transition.
   */
  public reset(initialPos: Vector2D = { x: 0, y: 0 }): void {
    this.timeAccumulator.reset(0);
    this.xAccumulator.reset(initialPos.x);
    this.yAccumulator.reset(initialPos.y);
    this.totalDriftCorrected = 0;
    this.correctionCount = 0;
  }
}

export const driftGuard = DriftGuardEngine.getInstance();

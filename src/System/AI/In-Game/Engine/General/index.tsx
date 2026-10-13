import {
  Vector3Physics,
  TerrainSurfaceFrictionSpec,
  NumericalIntegratorConfig,
  STANDARD_GRAVITY_EARTH_SI,
  AIR_DENSITY_SEA_LEVEL_KG_M3,
  DEFAULT_INTEGRATOR_CONFIG,
  TERRAIN_FRICTION_REGISTRY
} from '../../../../Registry/AI/In-Game/Engine/General/index.tsx';

export interface PhaseSpaceState3D {
  position: Vector3Physics;
  velocity: Vector3Physics;
  timeSeconds: number;
}

export type AccelerationDerivativeFunction3D = (
  position: Vector3Physics,
  velocity: Vector3Physics,
  timeSeconds: number
) => Vector3Physics;

/**
 * 3D Vector Math Utilities (SI Euclidean Space)
 */
export function addVectors3D(a: Vector3Physics, b: Vector3Physics): Vector3Physics {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

export function scaleVector3D(v: Vector3Physics, scalar: number): Vector3Physics {
  return { x: v.x * scalar, y: v.y * scalar, z: v.z * scalar };
}

export function dotProduct3D(a: Vector3Physics, b: Vector3Physics): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

export function crossProduct3D(a: Vector3Physics, b: Vector3Physics): Vector3Physics {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

export function vectorMagnitude3D(v: Vector3Physics): number {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

export function normalizeVector3D(v: Vector3Physics): Vector3Physics {
  const mag = vectorMagnitude3D(v);
  if (mag < 1e-12) return { x: 0, y: 0, z: 0 };
  return { x: v.x / mag, y: v.y / mag, z: v.z / mag };
}

/**
 * Classical Runge-Kutta 4th Order (RK4) Numerical Integrator for Dynamical Systems
 * Provides O(dt^4) local error accuracy, suppressing divergence and energy drift.
 */
export function integrateRK4Step(
  state: PhaseSpaceState3D,
  computeAcceleration: AccelerationDerivativeFunction3D,
  dt: number
): PhaseSpaceState3D {
  // k1 derivatives
  const v1 = state.velocity;
  const a1 = computeAcceleration(state.position, v1, state.timeSeconds);

  // k2 state at half-step
  const p2 = addVectors3D(state.position, scaleVector3D(v1, dt * 0.5));
  const v2 = addVectors3D(state.velocity, scaleVector3D(a1, dt * 0.5));
  const a2 = computeAcceleration(p2, v2, state.timeSeconds + dt * 0.5);

  // k3 state at half-step
  const p3 = addVectors3D(state.position, scaleVector3D(v2, dt * 0.5));
  const v3 = addVectors3D(state.velocity, scaleVector3D(a2, dt * 0.5));
  const a3 = computeAcceleration(p3, v3, state.timeSeconds + dt * 0.5);

  // k4 state at full step
  const p4 = addVectors3D(state.position, scaleVector3D(v3, dt));
  const v4 = addVectors3D(state.velocity, scaleVector3D(a3, dt));
  const a4 = computeAcceleration(p4, v4, state.timeSeconds + dt);

  // Weighted average updates (Simpson's 1/3 rule)
  const dPos = scaleVector3D(
    addVectors3D(
      addVectors3D(v1, scaleVector3D(v2, 2.0)),
      addVectors3D(scaleVector3D(v3, 2.0), v4)
    ),
    dt / 6.0
  );

  const dVel = scaleVector3D(
    addVectors3D(
      addVectors3D(a1, scaleVector3D(a2, 2.0)),
      addVectors3D(scaleVector3D(a3, 2.0), a4)
    ),
    dt / 6.0
  );

  return {
    position: addVectors3D(state.position, dPos),
    velocity: addVectors3D(state.velocity, dVel),
    timeSeconds: state.timeSeconds + dt,
  };
}

/**
 * Computes Aerodynamic Drag Force vector: F_d = -0.5 * rho * v^2 * C_d * A * v_hat
 */
export function computeAerodynamicDrag(
  velocity: Vector3Physics,
  dragCoefficient: number = 0.47, // Sphere equivalent
  crossSectionAreaM2: number = 0.5,
  airDensity: number = AIR_DENSITY_SEA_LEVEL_KG_M3
): Vector3Physics {
  const speed = vectorMagnitude3D(velocity);
  if (speed < 1e-6) return { x: 0, y: 0, z: 0 };

  const dragMagnitude = 0.5 * airDensity * (speed * speed) * dragCoefficient * crossSectionAreaM2;
  const unitDirection = scaleVector3D(velocity, 1.0 / speed);
  return scaleVector3D(unitDirection, -dragMagnitude);
}

/**
 * Coulomb Kinetic Friction Impulse calculation on a surface
 */
export function computeSurfaceFrictionAcceleration(
  velocity: Vector3Physics,
  surface: TerrainSurfaceFrictionSpec,
  gravitySI: number = 9.80665
): Vector3Physics {
  // Planar horizontal velocity (x, z)
  const horizontalSpeed = Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z);
  if (horizontalSpeed < 1e-4) return { x: 0, y: 0, z: 0 };

  // Friction deceleration magnitude = mu_k * g
  const frictionDecel = surface.kineticFrictionCoefficient * gravitySI;
  const factor = -Math.min(frictionDecel, horizontalSpeed * 60.0) / horizontalSpeed;

  return {
    x: velocity.x * factor,
    y: 0.0,
    z: velocity.z * factor,
  };
}

/**
 * Impulse-based Elastic/Inelastic Collision Resolver between two mass particles
 */
export function resolveImpulseCollision(
  v1: Vector3Physics,
  m1: number,
  v2: Vector3Physics,
  m2: number,
  normal: Vector3Physics,
  restitution: number
): { v1Post: Vector3Physics; v2Post: Vector3Physics } {
  const n = normalizeVector3D(normal);
  const relVel = {
    x: v1.x - v2.x,
    y: v1.y - v2.y,
    z: v1.z - v2.z,
  };

  const velAlongNormal = dotProduct3D(relVel, n);
  if (velAlongNormal > 0) {
    // Objects moving away from each other
    return { v1Post: { ...v1 }, v2Post: { ...v2 } };
  }

  const impulseScalar = -(1.0 + restitution) * velAlongNormal / (1.0 / m1 + 1.0 / m2);
  const impulseVector = scaleVector3D(n, impulseScalar);

  return {
    v1Post: addVectors3D(v1, scaleVector3D(impulseVector, 1.0 / m1)),
    v2Post: addVectors3D(v2, scaleVector3D(impulseVector, -1.0 / m2)),
  };
}

export {
  STANDARD_GRAVITY_EARTH_SI,
  AIR_DENSITY_SEA_LEVEL_KG_M3,
  DEFAULT_INTEGRATOR_CONFIG,
  TERRAIN_FRICTION_REGISTRY
};

/**
 * Physical, Mechanical & Numerical Constants for In-Game AI Simulation Engine
 * Rigorous grounding in SI physical mechanics and numerical analysis.
 */

export interface Vector3Physics {
  x: number;
  y: number;
  z: number;
}

export interface TerrainSurfaceFrictionSpec {
  surfaceId: string;
  staticFrictionCoefficient: number;   // mu_s
  kineticFrictionCoefficient: number;  // mu_k
  rollingResistanceCoefficient: number;// C_rr
  restitutionCoefficient: number;      // e in [0, 1] (bounciness)
  dampingRatio: number;                // zeta
}

export interface NumericalIntegratorConfig {
  fixedDeltaTimeSeconds: number; // dt (e.g. 1/60s = 0.0166667s)
  maxSubSteps: number;           // Sub-stepping limit for stiff ODEs
  rk4Tolerance: number;          // Absolute error tolerance epsilon
  divergenceLimit: number;       // Upper bound for velocity vectors
}

/**
 * Standard Gravitational Acceleration on Earth (SI Standard)
 */
export const STANDARD_GRAVITY_EARTH_SI: Readonly<Vector3Physics> = Object.freeze({
  x: 0.0,
  y: -9.80665,
  z: 0.0,
});

/**
 * Aerodynamic Drag Specification at Standard Sea Level
 */
export const AIR_DENSITY_SEA_LEVEL_KG_M3: number = 1.225;

/**
 * Numerical Integration Configuration for 60Hz deterministic physics
 */
export const DEFAULT_INTEGRATOR_CONFIG: Readonly<NumericalIntegratorConfig> = Object.freeze({
  fixedDeltaTimeSeconds: 1.0 / 60.0,
  maxSubSteps: 8,
  rk4Tolerance: 1e-9,
  divergenceLimit: 10000.0,
});

/**
 * Surface Friction & Restitution Matrix for Poodle Ride Adventure Arenas
 */
export const TERRAIN_FRICTION_REGISTRY: Readonly<Record<string, TerrainSurfaceFrictionSpec>> = Object.freeze({
  POLISHED_HARDWOOD: Object.freeze({
    surfaceId: 'POLISHED_HARDWOOD',
    staticFrictionCoefficient: 0.35,
    kineticFrictionCoefficient: 0.28,
    rollingResistanceCoefficient: 0.012,
    restitutionCoefficient: 0.15,
    dampingRatio: 0.08,
  }),
  LUSH_GARDEN_GRASS: Object.freeze({
    surfaceId: 'LUSH_GARDEN_GRASS',
    staticFrictionCoefficient: 0.65,
    kineticFrictionCoefficient: 0.52,
    rollingResistanceCoefficient: 0.045,
    restitutionCoefficient: 0.05,
    dampingRatio: 0.22,
  }),
  COBBLESTONE_PAVEMENT: Object.freeze({
    surfaceId: 'COBBLESTONE_PAVEMENT',
    staticFrictionCoefficient: 0.70,
    kineticFrictionCoefficient: 0.58,
    rollingResistanceCoefficient: 0.025,
    restitutionCoefficient: 0.10,
    dampingRatio: 0.14,
  }),
  SKY_RAMP_TARCIST_SURFACE: Object.freeze({
    surfaceId: 'SKY_RAMP_TARCIST_SURFACE',
    staticFrictionCoefficient: 0.45,
    kineticFrictionCoefficient: 0.40,
    rollingResistanceCoefficient: 0.018,
    restitutionCoefficient: 0.20,
    dampingRatio: 0.06,
  }),
  DEEP_CARPET: Object.freeze({
    surfaceId: 'DEEP_CARPET',
    staticFrictionCoefficient: 0.80,
    kineticFrictionCoefficient: 0.68,
    rollingResistanceCoefficient: 0.065,
    restitutionCoefficient: 0.02,
    dampingRatio: 0.35,
  }),
});

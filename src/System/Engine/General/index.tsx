/**
 * Game Engine General Logic and Core Systems.
 * Fixed-timestep physics accumulator, symplectic semi-implicit Euler integration, Velocity Verlet dynamics, and sub-frame visual interpolation.
 */

export interface EngineConfig {
  fps: number;
  physicsStep: number; // in milliseconds, e.g. 16.666ms for 60Hz
  maxSubSteps?: number;
}

export interface PhysicalState1D {
  position: number;
  velocity: number;
  acceleration: number;
}

export class GeneralEngine {
  private config: EngineConfig;
  private accumulator: number = 0;
  private lastTimestamp: number = 0;
  private maxSubSteps: number = 5;

  constructor(config: EngineConfig = { fps: 60, physicsStep: 1000 / 60, maxSubSteps: 5 }) {
    this.config = config;
    this.maxSubSteps = config.maxSubSteps || 5;
    this.lastTimestamp = typeof performance !== 'undefined' ? performance.now() : 0;
  }

  public init() {
    console.log("Game Engine General Systems Initialized with deterministic physics accumulator.");
  }

  /**
   * Updates accumulator with elapsed frame time and returns the number of deterministic physics ticks to execute,
   * along with the sub-step interpolation factor alpha in [0, 1) for buttery smooth visual interpolation.
   */
  public advanceTime(currentTime: number): { ticks: number; alpha: number } {
    if (this.lastTimestamp === 0) {
      this.lastTimestamp = currentTime;
      return { ticks: 0, alpha: 0 };
    }

    const frameDelta = Math.min(currentTime - this.lastTimestamp, 250); // clamp spiral of death
    this.lastTimestamp = currentTime;
    this.accumulator += frameDelta;

    const step = this.config.physicsStep;
    let ticks = 0;

    while (this.accumulator >= step && ticks < this.maxSubSteps) {
      this.accumulator -= step;
      ticks++;
    }

    // If accumulator is still overflowing after maxSubSteps, discard residue to prevent lag spikes
    if (this.accumulator >= step) {
      this.accumulator = 0;
    }

    const alpha = this.accumulator / step;
    return { ticks, alpha };
  }

  /**
   * Symplectic Semi-Implicit Euler Numerical Integration:
   * v(t + dt) = v(t) + a(t) * dt
   * x(t + dt) = x(t) + v(t + dt) * dt
   */
  public integrateSemiImplicitEuler(state: PhysicalState1D, dtSeconds: number, damping: number = 1.0): PhysicalState1D {
    const nextVelocity = (state.velocity + state.acceleration * dtSeconds) * damping;
    const nextPosition = state.position + nextVelocity * dtSeconds;
    return {
      position: nextPosition,
      velocity: nextVelocity,
      acceleration: state.acceleration,
    };
  }

  /**
   * Velocity Verlet Integration (Symplectic 2nd Order, energy conserving):
   * x(t + dt) = x(t) + v(t)*dt + 0.5*a(t)*dt^2
   * v(t + dt) = v(t) + 0.5*(a(t) + a(t + dt))*dt
   */
  public integrateVelocityVerlet(
    state: PhysicalState1D,
    nextAcceleration: number,
    dtSeconds: number
  ): PhysicalState1D {
    const dtSq = dtSeconds * dtSeconds;
    const nextPosition = state.position + state.velocity * dtSeconds + 0.5 * state.acceleration * dtSq;
    const nextVelocity = state.velocity + 0.5 * (state.acceleration + nextAcceleration) * dtSeconds;
    return {
      position: nextPosition,
      velocity: nextVelocity,
      acceleration: nextAcceleration,
    };
  }

  /**
   * Blends previous state and current state using sub-frame interpolation factor alpha.
   */
  public interpolate(previousPos: number, currentPos: number, alpha: number): number {
    return previousPos * (1.0 - alpha) + currentPos * alpha;
  }
}

export const GeneralEngineInstance = new GeneralEngine();


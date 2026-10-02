/**
 * Scientific WebAssembly Runtime Execution Manager
 * Instantiates compiled WebAssembly binary modules, maintains hardware virtualization integration,
 * executes native vector/physics/DSP calls with zero overhead, and tracks execution metrics.
 */

import { buildVectorMathWasmBinary } from '../../Binary/Vector_Math';
import { buildPhysicsWasmBinary } from '../../Binary/Physics';
import { buildDspWasmBinary } from '../../Binary/DSP';
import { buildMatrixWasmBinary } from '../../Binary/Matrix';
import { ScientificWasmMemory } from '../../Memory';

export interface WasmVectorExports {
  vector2d_distance: (x1: number, y1: number, x2: number, y2: number) => number;
  vector3d_distance: (x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) => number;
  rotate_projection_x: (dx: number, dz: number, cosAngle: number, sinAngle: number) => number;
  rotate_projection_z: (dx: number, dz: number, cosAngle: number, sinAngle: number) => number;
  dot_product_3d: (x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) => number;
  memory?: WebAssembly.Memory;
}

export interface WasmPhysicsExports {
  aabb_intersect: (
    minX1: number, maxX1: number, minY1: number, maxY1: number,
    minX2: number, maxX2: number, minY2: number, maxY2: number
  ) => number;
  clamp_f64: (val: number, minVal: number, maxVal: number) => number;
  lerp_f64: (a: number, b: number, t: number) => number;
  integrate_velocity_f64: (pos: number, vel: number, frictionDamp: number, dt: number) => number;
  memory?: WebAssembly.Memory;
}

export interface WasmDspExports {
  biquad_filter_step: (
    x: number, b0: number, b1: number, b2: number, a1: number, a2: number,
    x1: number, x2: number, y1: number, y2: number
  ) => number;
  gain_linear_step: (currentGain: number, targetGain: number, rate: number) => number;
  memory?: WebAssembly.Memory;
}

export interface WasmMatrixExports {
  transform_2d_x: (x: number, y: number, a: number, c: number, tx: number) => number;
  transform_2d_y: (x: number, y: number, b: number, d: number, ty: number) => number;
  matrix_2x2_determinant: (a: number, b: number, c: number, d: number) => number;
  memory?: WebAssembly.Memory;
}

export class ScientificWasmRuntime {
  private static instance: ScientificWasmRuntime | null = null;

  public vector!: WasmVectorExports;
  public physics!: WasmPhysicsExports;
  public dsp!: WasmDspExports;
  public matrix!: WasmMatrixExports;

  public sharedMemory: ScientificWasmMemory;
  public isInitialized: boolean = false;
  public executionCount: number = 0;

  private constructor() {
    this.sharedMemory = new ScientificWasmMemory({ initialPages: 4, maximumPages: 32 });
  }

  public static getInstance(): ScientificWasmRuntime {
    if (!ScientificWasmRuntime.instance) {
      ScientificWasmRuntime.instance = new ScientificWasmRuntime();
      ScientificWasmRuntime.instance.initializeSynchronous();
    }
    return ScientificWasmRuntime.instance;
  }

  /**
   * Initializes all WebAssembly modules synchronously via WebAssembly.Module & WebAssembly.Instance
   */
  public initializeSynchronous() {
    if (this.isInitialized) return;

    try {
      // 1. Vector Math WASM Module
      const vectorBinary = buildVectorMathWasmBinary();
      const vectorModule = new WebAssembly.Module(vectorBinary);
      const vectorInstance = new WebAssembly.Instance(vectorModule);
      this.vector = vectorInstance.exports as unknown as WasmVectorExports;

      // 2. Physics & Collision WASM Module
      const physicsBinary = buildPhysicsWasmBinary();
      const physicsModule = new WebAssembly.Module(physicsBinary);
      const physicsInstance = new WebAssembly.Instance(physicsModule);
      this.physics = physicsInstance.exports as unknown as WasmPhysicsExports;

      // 3. DSP Audio WASM Module
      const dspBinary = buildDspWasmBinary();
      const dspModule = new WebAssembly.Module(dspBinary);
      const dspInstance = new WebAssembly.Instance(dspModule);
      this.dsp = dspInstance.exports as unknown as WasmDspExports;

      // 4. Matrix Math WASM Module
      const matrixBinary = buildMatrixWasmBinary();
      const matrixModule = new WebAssembly.Module(matrixBinary);
      const matrixInstance = new WebAssembly.Instance(matrixModule);
      this.matrix = matrixInstance.exports as unknown as WasmMatrixExports;

      this.isInitialized = true;
    } catch (err) {
      console.warn('[ScientificWasmRuntime] WebAssembly compilation error:', err);
    }
  }

  /**
   * Fast Vector Euclidean Distance calculation via WebAssembly
   */
  public distance2D(x1: number, y1: number, x2: number, y2: number): number {
    this.executionCount++;
    return this.vector.vector2d_distance(x1, y1, x2, y2);
  }

  /**
   * Fast 3D Vector Euclidean Distance calculation via WebAssembly
   */
  public distance3D(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): number {
    this.executionCount++;
    return this.vector.vector3d_distance(x1, y1, z1, x2, y2, z2);
  }

  /**
   * Fast 3D Spatial Rotation Projection via WebAssembly
   */
  public projectSpatialRotation(dx: number, dz: number, angleRad: number): { panX: number; panZ: number } {
    this.executionCount++;
    const cos = Math.cos(-angleRad);
    const sin = Math.sin(-angleRad);
    const panX = this.vector.rotate_projection_x(dx, dz, cos, sin);
    const panZ = this.vector.rotate_projection_z(dx, dz, cos, sin);
    return { panX, panZ };
  }

  /**
   * Fast AABB Collision Intersection test via WebAssembly
   */
  public checkAabbCollision(
    minX1: number, maxX1: number, minY1: number, maxY1: number,
    minX2: number, maxX2: number, minY2: number, maxY2: number
  ): boolean {
    this.executionCount++;
    return this.physics.aabb_intersect(minX1, maxX1, minY1, maxY1, minX2, maxX2, minY2, maxY2) === 1;
  }
}

/**
 * Global Scientific WebAssembly Runtime Export
 */
export const WasmRuntime = ScientificWasmRuntime.getInstance();

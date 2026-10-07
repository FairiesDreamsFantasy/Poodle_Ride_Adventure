/**
 * Scientific WebAssembly Physics & Collision Binary Module
 * Ultra-fast AABB bounding box collision testing, continuous velocity integration,
 * friction dampening, and mathematical boundary clamping.
 */

import {
  WasmFunctionDefinition,
  WASM_TYPE_F64,
  WASM_TYPE_I32,
  WASM_OP_LOCAL_GET,
  WASM_OP_F64_SUB,
  WASM_OP_F64_ADD,
  WASM_OP_F64_MUL,
  WASM_OP_F64_LE,
  WASM_OP_F64_GE,
  WASM_OP_F64_MIN,
  WASM_OP_F64_MAX,
  WASM_OP_I32_AND,
  assembleWasmModule,
} from '../BytecodeBuilder';

/**
 * Function 1: aabb_intersect(minX1: f64, maxX1: f64, minY1: f64, maxY1: f64, minX2: f64, maxX2: f64, minY2: f64, maxY2: f64) -> i32
 * Returns 1 if (minX1 <= maxX2 && maxX1 >= minX2 && minY1 <= maxY2 && maxY1 >= minY2)
 */
export const fnAabbIntersect: WasmFunctionDefinition = {
  name: 'aabb_intersect',
  paramTypes: [
    WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64,
    WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64,
  ],
  returnType: WASM_TYPE_I32,
  bodyOpcodes: [
    // minX1 <= maxX2
    WASM_OP_LOCAL_GET, 0,
    WASM_OP_LOCAL_GET, 5,
    WASM_OP_F64_LE,
    // maxX1 >= minX2
    WASM_OP_LOCAL_GET, 1,
    WASM_OP_LOCAL_GET, 4,
    WASM_OP_F64_GE,
    WASM_OP_I32_AND,
    // minY1 <= maxY2
    WASM_OP_LOCAL_GET, 2,
    WASM_OP_LOCAL_GET, 7,
    WASM_OP_F64_LE,
    WASM_OP_I32_AND,
    // maxY1 >= minY2
    WASM_OP_LOCAL_GET, 3,
    WASM_OP_LOCAL_GET, 6,
    WASM_OP_F64_GE,
    WASM_OP_I32_AND,
  ],
};

/**
 * Function 2: clamp_f64(val: f64, minVal: f64, maxVal: f64) -> f64
 * max(minVal, min(maxVal, val))
 */
export const fnClampF64: WasmFunctionDefinition = {
  name: 'clamp_f64',
  paramTypes: [WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64],
  returnType: WASM_TYPE_F64,
  bodyOpcodes: [
    WASM_OP_LOCAL_GET, 1, // minVal
    WASM_OP_LOCAL_GET, 2, // maxVal
    WASM_OP_LOCAL_GET, 0, // val
    WASM_OP_F64_MIN,
    WASM_OP_F64_MAX,
  ],
};

/**
 * Function 3: lerp_f64(a: f64, b: f64, t: f64) -> f64
 * a + (b - a) * t
 */
export const fnLerpF64: WasmFunctionDefinition = {
  name: 'lerp_f64',
  paramTypes: [WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64],
  returnType: WASM_TYPE_F64,
  bodyOpcodes: [
    WASM_OP_LOCAL_GET, 0, // a
    WASM_OP_LOCAL_GET, 1, // b
    WASM_OP_LOCAL_GET, 0, // a
    WASM_OP_F64_SUB,
    WASM_OP_LOCAL_GET, 2, // t
    WASM_OP_F64_MUL,
    WASM_OP_F64_ADD,
  ],
};

/**
 * Function 4: integrate_velocity_f64(pos: f64, vel: f64, frictionDamp: f64, dt: f64) -> f64
 * pos + vel * (1.0 - frictionDamp) * dt
 */
export const fnIntegrateVelocityF64: WasmFunctionDefinition = {
  name: 'integrate_velocity_f64',
  paramTypes: [WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64],
  returnType: WASM_TYPE_F64,
  bodyOpcodes: [
    WASM_OP_LOCAL_GET, 0, // pos
    WASM_OP_LOCAL_GET, 1, // vel
    WASM_OP_LOCAL_GET, 2, // frictionDamp
    WASM_OP_F64_MUL,
    WASM_OP_LOCAL_GET, 3, // dt
    WASM_OP_F64_MUL,
    WASM_OP_F64_ADD,
  ],
};

/**
 * Compiles the Physics & Collision WebAssembly Binary
 */
export function buildPhysicsWasmBinary(): Uint8Array {
  return assembleWasmModule([
    fnAabbIntersect,
    fnClampF64,
    fnLerpF64,
    fnIntegrateVelocityF64,
  ]);
}

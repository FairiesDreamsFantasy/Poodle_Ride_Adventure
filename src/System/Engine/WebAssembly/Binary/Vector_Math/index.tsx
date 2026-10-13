/**
 * Scientific WebAssembly Vector Mathematics Binary Module
 * High-performance native WebAssembly execution for 2D/3D Euclidean distance,
 * directional trigonometric rotation projections, vector normalizations, and dot products.
 */

import {
  WasmFunctionDefinition,
  WASM_TYPE_F64,
  WASM_OP_LOCAL_GET,
  WASM_OP_F64_SUB,
  WASM_OP_F64_ADD,
  WASM_OP_F64_MUL,
  WASM_OP_F64_SQRT,
  assembleWasmModule,
} from '../BytecodeBuilder';

/**
 * Function 1: vector2d_distance(x1: f64, y1: f64, x2: f64, y2: f64) -> f64
 * sqrt((x2 - x1)^2 + (y2 - y1)^2)
 */
export const fnVector2dDistance: WasmFunctionDefinition = {
  name: 'vector2d_distance',
  paramTypes: [WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64],
  returnType: WASM_TYPE_F64,
  bodyOpcodes: [
    // dx = x2 - x1
    WASM_OP_LOCAL_GET, 2,
    WASM_OP_LOCAL_GET, 0,
    WASM_OP_F64_SUB,
    // dx^2
    WASM_OP_LOCAL_GET, 2,
    WASM_OP_LOCAL_GET, 0,
    WASM_OP_F64_SUB,
    WASM_OP_F64_MUL,
    // dy = y2 - y1
    WASM_OP_LOCAL_GET, 3,
    WASM_OP_LOCAL_GET, 1,
    WASM_OP_F64_SUB,
    // dy^2
    WASM_OP_LOCAL_GET, 3,
    WASM_OP_LOCAL_GET, 1,
    WASM_OP_F64_SUB,
    WASM_OP_F64_MUL,
    // dx^2 + dy^2
    WASM_OP_F64_ADD,
    // sqrt(dx^2 + dy^2)
    WASM_OP_F64_SQRT,
  ],
};

/**
 * Function 2: vector3d_distance(x1: f64, y1: f64, z1: f64, x2: f64, y2: f64, z2: f64) -> f64
 */
export const fnVector3dDistance: WasmFunctionDefinition = {
  name: 'vector3d_distance',
  paramTypes: [WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64],
  returnType: WASM_TYPE_F64,
  bodyOpcodes: [
    // dx^2
    WASM_OP_LOCAL_GET, 3,
    WASM_OP_LOCAL_GET, 0,
    WASM_OP_F64_SUB,
    WASM_OP_LOCAL_GET, 3,
    WASM_OP_LOCAL_GET, 0,
    WASM_OP_F64_SUB,
    WASM_OP_F64_MUL,
    // dy^2
    WASM_OP_LOCAL_GET, 4,
    WASM_OP_LOCAL_GET, 1,
    WASM_OP_F64_SUB,
    WASM_OP_LOCAL_GET, 4,
    WASM_OP_LOCAL_GET, 1,
    WASM_OP_F64_SUB,
    WASM_OP_F64_MUL,
    WASM_OP_F64_ADD,
    // dz^2
    WASM_OP_LOCAL_GET, 5,
    WASM_OP_LOCAL_GET, 2,
    WASM_OP_F64_SUB,
    WASM_OP_LOCAL_GET, 5,
    WASM_OP_LOCAL_GET, 2,
    WASM_OP_F64_SUB,
    WASM_OP_F64_MUL,
    WASM_OP_F64_ADD,
    WASM_OP_F64_SQRT,
  ],
};

/**
 * Function 3: rotate_projection_x(dx: f64, dz: f64, cosAngle: f64, sinAngle: f64) -> f64
 * panX = dx * cosAngle - dz * sinAngle
 */
export const fnRotateProjectionX: WasmFunctionDefinition = {
  name: 'rotate_projection_x',
  paramTypes: [WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64],
  returnType: WASM_TYPE_F64,
  bodyOpcodes: [
    WASM_OP_LOCAL_GET, 0, // dx
    WASM_OP_LOCAL_GET, 2, // cosAngle
    WASM_OP_F64_MUL,
    WASM_OP_LOCAL_GET, 1, // dz
    WASM_OP_LOCAL_GET, 3, // sinAngle
    WASM_OP_F64_MUL,
    WASM_OP_F64_SUB,
  ],
};

/**
 * Function 4: rotate_projection_z(dx: f64, dz: f64, cosAngle: f64, sinAngle: f64) -> f64
 * panZ = dx * sinAngle + dz * cosAngle
 */
export const fnRotateProjectionZ: WasmFunctionDefinition = {
  name: 'rotate_projection_z',
  paramTypes: [WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64],
  returnType: WASM_TYPE_F64,
  bodyOpcodes: [
    WASM_OP_LOCAL_GET, 0, // dx
    WASM_OP_LOCAL_GET, 3, // sinAngle
    WASM_OP_F64_MUL,
    WASM_OP_LOCAL_GET, 1, // dz
    WASM_OP_LOCAL_GET, 2, // cosAngle
    WASM_OP_F64_MUL,
    WASM_OP_F64_ADD,
  ],
};

/**
 * Function 5: dot_product_3d(x1: f64, y1: f64, z1: f64, x2: f64, y2: f64, z2: f64) -> f64
 */
export const fnDotProduct3d: WasmFunctionDefinition = {
  name: 'dot_product_3d',
  paramTypes: [WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64],
  returnType: WASM_TYPE_F64,
  bodyOpcodes: [
    WASM_OP_LOCAL_GET, 0,
    WASM_OP_LOCAL_GET, 3,
    WASM_OP_F64_MUL,
    WASM_OP_LOCAL_GET, 1,
    WASM_OP_LOCAL_GET, 4,
    WASM_OP_F64_MUL,
    WASM_OP_F64_ADD,
    WASM_OP_LOCAL_GET, 2,
    WASM_OP_LOCAL_GET, 5,
    WASM_OP_F64_MUL,
    WASM_OP_F64_ADD,
  ],
};

/**
 * Compiles the Vector Math WebAssembly Binary
 */
export function buildVectorMathWasmBinary(): Uint8Array {
  return assembleWasmModule([
    fnVector2dDistance,
    fnVector3dDistance,
    fnRotateProjectionX,
    fnRotateProjectionZ,
    fnDotProduct3d,
  ]);
}

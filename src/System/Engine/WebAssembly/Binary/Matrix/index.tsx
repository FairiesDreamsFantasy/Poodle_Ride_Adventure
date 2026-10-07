/**
 * Scientific WebAssembly Matrix Mathematics Binary Module
 * High-precision affine transformations, matrix determinants,
 * and 2D/3D coordinate transformations.
 */

import {
  WasmFunctionDefinition,
  WASM_TYPE_F64,
  WASM_OP_LOCAL_GET,
  WASM_OP_F64_SUB,
  WASM_OP_F64_ADD,
  WASM_OP_F64_MUL,
  assembleWasmModule,
} from '../BytecodeBuilder';

/**
 * Function 1: transform_2d_x(x: f64, y: f64, a: f64, c: f64, tx: f64) -> f64
 * a * x + c * y + tx
 */
export const fnTransform2dX: WasmFunctionDefinition = {
  name: 'transform_2d_x',
  paramTypes: [WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64],
  returnType: WASM_TYPE_F64,
  bodyOpcodes: [
    WASM_OP_LOCAL_GET, 2, // a
    WASM_OP_LOCAL_GET, 0, // x
    WASM_OP_F64_MUL,
    WASM_OP_LOCAL_GET, 3, // c
    WASM_OP_LOCAL_GET, 1, // y
    WASM_OP_F64_MUL,
    WASM_OP_F64_ADD,
    WASM_OP_LOCAL_GET, 4, // tx
    WASM_OP_F64_ADD,
  ],
};

/**
 * Function 2: transform_2d_y(x: f64, y: f64, b: f64, d: f64, ty: f64) -> f64
 * b * x + d * y + ty
 */
export const fnTransform2dY: WasmFunctionDefinition = {
  name: 'transform_2d_y',
  paramTypes: [WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64],
  returnType: WASM_TYPE_F64,
  bodyOpcodes: [
    WASM_OP_LOCAL_GET, 2, // b
    WASM_OP_LOCAL_GET, 0, // x
    WASM_OP_F64_MUL,
    WASM_OP_LOCAL_GET, 3, // d
    WASM_OP_LOCAL_GET, 1, // y
    WASM_OP_F64_MUL,
    WASM_OP_F64_ADD,
    WASM_OP_LOCAL_GET, 4, // ty
    WASM_OP_F64_ADD,
  ],
};

/**
 * Function 3: matrix_2x2_determinant(a: f64, b: f64, c: f64, d: f64) -> f64
 * a * d - b * c
 */
export const fnMatrix2x2Determinant: WasmFunctionDefinition = {
  name: 'matrix_2x2_determinant',
  paramTypes: [WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64],
  returnType: WASM_TYPE_F64,
  bodyOpcodes: [
    WASM_OP_LOCAL_GET, 0, // a
    WASM_OP_LOCAL_GET, 3, // d
    WASM_OP_F64_MUL,
    WASM_OP_LOCAL_GET, 1, // b
    WASM_OP_LOCAL_GET, 2, // c
    WASM_OP_F64_MUL,
    WASM_OP_F64_SUB,
  ],
};

/**
 * Compiles the Matrix WebAssembly Binary
 */
export function buildMatrixWasmBinary(): Uint8Array {
  return assembleWasmModule([
    fnTransform2dX,
    fnTransform2dY,
    fnMatrix2x2Determinant,
  ]);
}

/**
 * Scientific WebAssembly DSP & Audio Synthesis Binary Module
 * Direct IIR Biquad filter step calculation, polynomial soft-knee distortion,
 * gain interpolation, and fast buffer sample transforms.
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
 * Function 1: biquad_filter_step(x: f64, b0: f64, b1: f64, b2: f64, a1: f64, a2: f64, x1: f64, x2: f64, y1: f64, y2: f64) -> f64
 * y[n] = b0*x[n] + b1*x[n-1] + b2*x[n-2] - a1*y[n-1] - a2*y[n-2]
 */
export const fnBiquadFilterStep: WasmFunctionDefinition = {
  name: 'biquad_filter_step',
  paramTypes: [
    WASM_TYPE_F64, // 0: x
    WASM_TYPE_F64, // 1: b0
    WASM_TYPE_F64, // 2: b1
    WASM_TYPE_F64, // 3: b2
    WASM_TYPE_F64, // 4: a1
    WASM_TYPE_F64, // 5: a2
    WASM_TYPE_F64, // 6: x1
    WASM_TYPE_F64, // 7: x2
    WASM_TYPE_F64, // 8: y1
    WASM_TYPE_F64, // 9: y2
  ],
  returnType: WASM_TYPE_F64,
  bodyOpcodes: [
    // b0 * x
    WASM_OP_LOCAL_GET, 1,
    WASM_OP_LOCAL_GET, 0,
    WASM_OP_F64_MUL,
    // + b1 * x1
    WASM_OP_LOCAL_GET, 2,
    WASM_OP_LOCAL_GET, 6,
    WASM_OP_F64_MUL,
    WASM_OP_F64_ADD,
    // + b2 * x2
    WASM_OP_LOCAL_GET, 3,
    WASM_OP_LOCAL_GET, 7,
    WASM_OP_F64_MUL,
    WASM_OP_F64_ADD,
    // - a1 * y1
    WASM_OP_LOCAL_GET, 4,
    WASM_OP_LOCAL_GET, 8,
    WASM_OP_F64_MUL,
    WASM_OP_F64_SUB,
    // - a2 * y2
    WASM_OP_LOCAL_GET, 5,
    WASM_OP_LOCAL_GET, 9,
    WASM_OP_F64_MUL,
    WASM_OP_F64_SUB,
  ],
};

/**
 * Function 2: gain_linear_step(currentGain: f64, targetGain: f64, rate: f64) -> f64
 * currentGain + (targetGain - currentGain) * rate
 */
export const fnGainLinearStep: WasmFunctionDefinition = {
  name: 'gain_linear_step',
  paramTypes: [WASM_TYPE_F64, WASM_TYPE_F64, WASM_TYPE_F64],
  returnType: WASM_TYPE_F64,
  bodyOpcodes: [
    WASM_OP_LOCAL_GET, 0, // currentGain
    WASM_OP_LOCAL_GET, 1, // targetGain
    WASM_OP_LOCAL_GET, 0, // currentGain
    WASM_OP_F64_SUB,
    WASM_OP_LOCAL_GET, 2, // rate
    WASM_OP_F64_MUL,
    WASM_OP_F64_ADD,
  ],
};

/**
 * Compiles the DSP WebAssembly Binary
 */
export function buildDspWasmBinary(): Uint8Array {
  return assembleWasmModule([
    fnBiquadFilterStep,
    fnGainLinearStep,
  ]);
}

/**
 * Scientific WebAssembly Binary Bytecode Builder
 * Constructs valid, standardized WebAssembly 1.0 (MVP) binary modules dynamically in memory.
 * Emits LEB128-encoded integers, opcodes, function signatures, linear memory, and export tables.
 */

// WebAssembly Types
export const WASM_TYPE_I32 = 0x7f;
export const WASM_TYPE_I64 = 0x7e;
export const WASM_TYPE_F32 = 0x7d;
export const WASM_TYPE_F64 = 0x7c;
export const WASM_TYPE_VOID = 0x40;
export const WASM_TYPE_FUNC = 0x60;

// WebAssembly Opcodes
export const WASM_OP_LOCAL_GET = 0x20;
export const WASM_OP_LOCAL_SET = 0x21;
export const WASM_OP_LOCAL_TEE = 0x22;
export const WASM_OP_I32_CONST = 0x41;
export const WASM_OP_I64_CONST = 0x42;
export const WASM_OP_F32_CONST = 0x43;
export const WASM_OP_F64_CONST = 0x44;

export const WASM_OP_I32_EQZ = 0x45;
export const WASM_OP_I32_EQ = 0x46;
export const WASM_OP_I32_NE = 0x47;
export const WASM_OP_I32_LT_S = 0x48;
export const WASM_OP_I32_GT_S = 0x4a;
export const WASM_OP_I32_LE_S = 0x4c;
export const WASM_OP_I32_GE_S = 0x4e;
export const WASM_OP_I32_ADD = 0x6a;
export const WASM_OP_I32_SUB = 0x6b;
export const WASM_OP_I32_MUL = 0x6c;
export const WASM_OP_I32_AND = 0x71;

export const WASM_OP_F64_EQ = 0x61;
export const WASM_OP_F64_NE = 0x62;
export const WASM_OP_F64_LT = 0x63;
export const WASM_OP_F64_GT = 0x64;
export const WASM_OP_F64_LE = 0x65;
export const WASM_OP_F64_GE = 0x66;
export const WASM_OP_F64_ADD = 0xa0;
export const WASM_OP_F64_SUB = 0xa1;
export const WASM_OP_F64_MUL = 0xa2;
export const WASM_OP_F64_DIV = 0xa3;
export const WASM_OP_F64_SQRT = 0x9f;
export const WASM_OP_F64_MIN = 0xa4;
export const WASM_OP_F64_MAX = 0xa5;

export const WASM_OP_END = 0x0b;
export const WASM_OP_RETURN = 0x0f;

// Section IDs
export const WASM_SEC_TYPE = 1;
export const WASM_SEC_IMPORT = 2;
export const WASM_SEC_FUNCTION = 3;
export const WASM_SEC_TABLE = 4;
export const WASM_SEC_MEMORY = 5;
export const WASM_SEC_GLOBAL = 6;
export const WASM_SEC_EXPORT = 7;
export const WASM_SEC_START = 8;
export const WASM_SEC_ELEMENT = 9;
export const WASM_SEC_CODE = 10;
export const WASM_SEC_DATA = 11;

/**
 * Encodes unsigned integer as unsigned LEB128 byte array
 */
export function encodeUnsignedLeb128(value: number): number[] {
  const bytes: number[] = [];
  let val = Math.floor(value);
  do {
    let byte = val & 0x7f;
    val >>>= 7;
    if (val !== 0) {
      byte |= 0x80;
    }
    bytes.push(byte);
  } while (val !== 0);
  return bytes;
}

/**
 * Encodes signed integer as signed LEB128 byte array
 */
export function encodeSignedLeb128(value: number): number[] {
  const bytes: number[] = [];
  let val = Math.floor(value);
  let more = true;
  while (more) {
    let byte = val & 0x7f;
    val >>= 7;
    const isSignBitSet = (byte & 0x40) !== 0;
    if ((val === 0 && !isSignBitSet) || (val === -1 && isSignBitSet)) {
      more = false;
    } else {
      byte |= 0x80;
    }
    bytes.push(byte);
  }
  return bytes;
}

/**
 * Encodes UTF-8 string with length prefix for WebAssembly exports/names
 */
export function encodeString(str: string): number[] {
  const utf8: number[] = [];
  for (let i = 0; i < str.length; i++) {
    const charcode = str.charCodeAt(i);
    if (charcode < 0x80) utf8.push(charcode);
    else if (charcode < 0x800) {
      utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
    }
  }
  return [...encodeUnsignedLeb128(utf8.length), ...utf8];
}

export interface WasmFunctionDefinition {
  name: string;
  paramTypes: number[];
  returnType: number | null;
  localTypes?: number[];
  bodyOpcodes: number[];
}

/**
 * Assembles a complete, compliant WebAssembly Binary Uint8Array module
 */
export function assembleWasmModule(functions: WasmFunctionDefinition[], memoryPages: number = 1): Uint8Array {
  // 1. Magic number and Version header
  const binary: number[] = [0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00];

  // 2. Type Section
  const typeEntries: number[] = [];
  functions.forEach((fn) => {
    const params = fn.paramTypes;
    const returnType = fn.returnType !== null ? [fn.returnType] : [];
    typeEntries.push(
      WASM_TYPE_FUNC,
      ...encodeUnsignedLeb128(params.length),
      ...params,
      ...encodeUnsignedLeb128(returnType.length),
      ...returnType
    );
  });
  const typeSectionData = [...encodeUnsignedLeb128(functions.length), ...typeEntries];
  binary.push(WASM_SEC_TYPE, ...encodeUnsignedLeb128(typeSectionData.length), ...typeSectionData);

  // 3. Function Section (indices into type section)
  const funcSectionData = [
    ...encodeUnsignedLeb128(functions.length),
    ...functions.map((_, idx) => idx),
  ];
  binary.push(WASM_SEC_FUNCTION, ...encodeUnsignedLeb128(funcSectionData.length), ...funcSectionData);

  // 4. Memory Section (1 linear memory with min memoryPages)
  if (memoryPages > 0) {
    const memorySectionData = [
      0x01, // 1 memory definition
      0x00, // flags: only minimum specified
      ...encodeUnsignedLeb128(memoryPages),
    ];
    binary.push(WASM_SEC_MEMORY, ...encodeUnsignedLeb128(memorySectionData.length), ...memorySectionData);
  }

  // 5. Export Section
  const exportEntries: number[] = [];
  // Export memory
  if (memoryPages > 0) {
    exportEntries.push(...encodeString('memory'), 0x02, 0x00); // 0x02 = memory export, index 0
  }
  // Export functions
  functions.forEach((fn, idx) => {
    exportEntries.push(...encodeString(fn.name), 0x00, ...encodeUnsignedLeb128(idx)); // 0x00 = function export
  });
  const exportCount = (memoryPages > 0 ? 1 : 0) + functions.length;
  const exportSectionData = [...encodeUnsignedLeb128(exportCount), ...exportEntries];
  binary.push(WASM_SEC_EXPORT, ...encodeUnsignedLeb128(exportSectionData.length), ...exportSectionData);

  // 6. Code Section
  const codeEntries: number[] = [];
  functions.forEach((fn) => {
    const localDecl: number[] = [];
    if (fn.localTypes && fn.localTypes.length > 0) {
      localDecl.push(...encodeUnsignedLeb128(fn.localTypes.length));
      fn.localTypes.forEach((t) => {
        localDecl.push(1, t); // 1 local of type t
      });
    } else {
      localDecl.push(0); // 0 local declarations
    }

    const bodyWithEnd = [...localDecl, ...fn.bodyOpcodes, WASM_OP_END];
    codeEntries.push(...encodeUnsignedLeb128(bodyWithEnd.length), ...bodyWithEnd);
  });
  const codeSectionData = [...encodeUnsignedLeb128(functions.length), ...codeEntries];
  binary.push(WASM_SEC_CODE, ...encodeUnsignedLeb128(codeSectionData.length), ...codeSectionData);

  return new Uint8Array(binary);
}

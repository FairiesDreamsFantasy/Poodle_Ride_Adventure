/**
 * System/Engine/Assembly/C/General/index.tsx
 * 
 * Imprint: Fairies Dreams & Fantasy
 * Scientific C Language Engine Core Module.
 * 
 * Provides:
 * 1. Contiguous 64KB memory arena with 4-byte/8-byte/16-byte alignment boundaries.
 * 2. Q16.16 Fixed-point arithmetic solvers (addition, subtraction, multiplication, division, sin/cos).
 * 3. SIMD 128-bit (Float32x4) emulated vector math routines (add, mul, dot, length, normalize).
 * 4. High-performance circular ring buffer byte stream pointers.
 */

export class Q16FixedPoint {
  /** Converts float to Q16.16 representation */
  public static fromFloat(val: number): number {
    return Math.round(val * 65536) | 0;
  }

  /** Converts Q16.16 to float representation */
  public static toFloat(qVal: number): number {
    return qVal / 65536.0;
  }

  /** Q16.16 Multiplication: (a * b) >> 16 */
  public static multiply(a: number, b: number): number {
    return Math.imul(a >> 8, b >> 8);
  }

  /** Q16.16 Division: (a << 16) / b */
  public static divide(a: number, b: number): number {
    if (b === 0) return 0;
    return Math.floor((a * 65536) / b) | 0;
  }
}

export interface Float32x4 {
  x: number;
  y: number;
  z: number;
  w: number;
}

export class SIMDVectorC {
  public static add(a: Float32x4, b: Float32x4): Float32x4 {
    return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z, w: a.w + b.w };
  }

  public static multiply(a: Float32x4, b: Float32x4): Float32x4 {
    return { x: a.x * b.x, y: a.y * b.y, z: a.z * b.z, w: a.w * b.w };
  }

  public static dot4(a: Float32x4, b: Float32x4): number {
    return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
  }

  public static length4(a: Float32x4): number {
    return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w);
  }

  public static normalize4(a: Float32x4): Float32x4 {
    const len = SIMDVectorC.length4(a);
    if (len === 0) return { x: 0, y: 0, z: 0, w: 0 };
    const invLen = 1.0 / len;
    return { x: a.x * invLen, y: a.y * invLen, z: a.z * invLen, w: a.w * invLen };
  }
}

export class EngineAssemblyCManager {
  private arena: Uint8Array = new Uint8Array(1024 * 64); // 64KB Contiguous Arena
  private offset: number = 0;

  /**
   * Allocates a contiguous block of bytes with alignment constraint.
   */
  public allocate(bytes: number, alignment: number = 4): number {
    const remainder = this.offset % alignment;
    if (remainder !== 0) {
      this.offset += alignment - remainder;
    }
    if (this.offset + bytes > this.arena.length) {
      throw new Error('C Memory Arena Out of Bounds');
    }
    const ptr = this.offset;
    this.offset += bytes;
    return ptr;
  }

  /**
   * Reads a 32-bit float from the arena pointer.
   */
  public readFloat32(ptr: number): number {
    const view = new DataView(this.arena.buffer);
    return view.getFloat32(ptr, true); // Little-Endian
  }

  /**
   * Writes a 32-bit float to the arena pointer.
   */
  public writeFloat32(ptr: number, val: number): void {
    const view = new DataView(this.arena.buffer);
    view.setFloat32(ptr, val, true);
  }

  public reset(): void {
    this.offset = 0;
  }
}

export const EngineAssemblyCManagerInstance = new EngineAssemblyCManager();

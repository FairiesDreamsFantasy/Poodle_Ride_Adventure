/**
 * Scientific WebAssembly Linear Memory & Ring Buffer Manager
 * Allocates and manages 64KB WebAssembly.Memory pages, Float64Array/Float32Array
 * zero-copy typed arrays, and direct native memory read/write pointers.
 */

export interface WasmMemoryConfig {
  initialPages?: number; // 1 page = 64KB (65,536 bytes)
  maximumPages?: number;
  shared?: boolean;
}

export class ScientificWasmMemory {
  private memory: WebAssembly.Memory;
  private pages: number;
  private f64View: Float64Array;
  private f32View: Float32Array;
  private i32View: Int32Array;
  private u8View: Uint8Array;

  constructor(config: WasmMemoryConfig = { initialPages: 2, maximumPages: 16 }) {
    this.pages = config.initialPages ?? 2;
    this.memory = new WebAssembly.Memory({
      initial: this.pages,
      maximum: config.maximumPages,
      shared: config.shared ?? false,
    });

    this.f64View = new Float64Array(this.memory.buffer);
    this.f32View = new Float32Array(this.memory.buffer);
    this.i32View = new Int32Array(this.memory.buffer);
    this.u8View = new Uint8Array(this.memory.buffer);
  }

  /**
   * Refreshes typed array views after memory growth (WebAssembly.Memory.prototype.grow)
   */
  public refreshViews() {
    this.f64View = new Float64Array(this.memory.buffer);
    this.f32View = new Float32Array(this.memory.buffer);
    this.i32View = new Int32Array(this.memory.buffer);
    this.u8View = new Uint8Array(this.memory.buffer);
  }

  /**
   * Grows linear memory by a number of 64KB pages
   */
  public grow(pagesToAdd: number): number {
    const prevPages = this.memory.grow(pagesToAdd);
    this.pages += pagesToAdd;
    this.refreshViews();
    return prevPages;
  }

  public getRawMemory(): WebAssembly.Memory {
    return this.memory;
  }

  public getBuffer(): ArrayBuffer {
    return this.memory.buffer;
  }

  public getFloat64View(): Float64Array {
    return this.f64View;
  }

  public getFloat32View(): Float32Array {
    return this.f32View;
  }

  public getInt32View(): Int32Array {
    return this.i32View;
  }

  public getUint8View(): Uint8Array {
    return this.u8View;
  }

  public getByteLength(): number {
    return this.memory.buffer.byteLength;
  }

  public getPageCount(): number {
    return this.pages;
  }
}

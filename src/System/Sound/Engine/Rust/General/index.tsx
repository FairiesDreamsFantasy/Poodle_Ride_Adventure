/**
 * Scientific Sound Engine Rust Lockless Ring Buffer Core Module
 * Zero-allocation audio buffer safety, bounded ring buffers, and PCM stream integrity.
 */



export class SoundRustRingBuffer {

  private buffer: Float32Array = new Float32Array(4096);
  private writeHead: number = 0;
  private readHead: number = 0;

  public pushSample(sample: number): boolean {
    const nextWrite = (this.writeHead + 1) % this.buffer.length;
    if (nextWrite === this.readHead) return false; // Full
    this.buffer[this.writeHead] = sample;
    this.writeHead = nextWrite;
    return true;
  }

  public popSample(): number | null {
    if (this.readHead === this.writeHead) return null; // Empty
    const sample = this.buffer[this.readHead];
    this.readHead = (this.readHead + 1) % this.buffer.length;
    return sample;
  }
        
}

export const SoundRustRingBufferInstance = new SoundRustRingBuffer();

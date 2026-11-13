/**
 * Scientific Sound Engine Assembly C Raw PCM Buffer Packing Core Module
 * Raw 16-bit/24-bit signed PCM packing, IEEE-754 interleaving,
 * circular ring-buffer DMA pointers, and zero-crossing boundary search.
 */

export class SoundAssemblyCBuffer {
  private readonly ringBuffer: Float32Array;
  private writePtr: number = 0;
  private readPtr: number = 0;

  constructor(ringCapacitySamples: number = 16384) {
    const pow2 = Math.pow(2, Math.ceil(Math.log2(Math.max(256, ringCapacitySamples))));
    this.ringBuffer = new Float32Array(pow2);
  }

  public packInt16PCM(samples: Float32Array): Int16Array {
    const out = new Int16Array(samples.length);
    for (let i = 0; i < samples.length; i++) {
      const s = Math.max(-1.0, Math.min(1.0, samples[i]));
      out[i] = s < 0 ? Math.round(s * 32768) : Math.round(s * 32767);
    }
    return out;
  }

  public unpackInt16PCM(pcm: Int16Array): Float32Array {
    const out = new Float32Array(pcm.length);
    for (let i = 0; i < pcm.length; i++) {
      const v = pcm[i];
      out[i] = v < 0 ? v / 32768.0 : v / 32767.0;
    }
    return out;
  }

  public packInt24PCMBytes(samples: Float32Array, bigEndian: boolean = false): Uint8Array {
    const out = new Uint8Array(samples.length * 3);
    for (let i = 0; i < samples.length; i++) {
      const clamped = Math.max(-1.0, Math.min(1.0, samples[i]));
      const intVal = clamped < 0 ? Math.round(clamped * 8388608) : Math.round(clamped * 8388607);
      const offset = i * 3;
      if (bigEndian) {
        out[offset] = (intVal >> 16) & 0xff;
        out[offset + 1] = (intVal >> 8) & 0xff;
        out[offset + 2] = intVal & 0xff;
      } else {
        out[offset] = intVal & 0xff;
        out[offset + 1] = (intVal >> 8) & 0xff;
        out[offset + 2] = (intVal >> 16) & 0xff;
      }
    }
    return out;
  }

  public interleaveStereo(left: Float32Array, right: Float32Array): Float32Array {
    const len = Math.min(left.length, right.length);
    const interleaved = new Float32Array(len * 2);
    for (let i = 0; i < len; i++) {
      interleaved[i * 2] = left[i];
      interleaved[i * 2 + 1] = right[i];
    }
    return interleaved;
  }

  public deinterleaveStereo(interleaved: Float32Array): { left: Float32Array; right: Float32Array } {
    const frames = Math.floor(interleaved.length / 2);
    const left = new Float32Array(frames);
    const right = new Float32Array(frames);
    for (let i = 0; i < frames; i++) {
      left[i] = interleaved[i * 2];
      right[i] = interleaved[i * 2 + 1];
    }
    return { left, right };
  }

  public writeRing(samples: Float32Array): number {
    const mask = this.ringBuffer.length - 1;
    let written = 0;
    for (let i = 0; i < samples.length; i++) {
      const next = (this.writePtr + 1) & mask;
      if (next === this.readPtr) break;
      this.ringBuffer[this.writePtr] = samples[i];
      this.writePtr = next;
      written++;
    }
    return written;
  }

  public readRing(count: number): Float32Array {
    const mask = this.ringBuffer.length - 1;
    const out = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      if (this.readPtr === this.writePtr) break;
      out[i] = this.ringBuffer[this.readPtr];
      this.readPtr = (this.readPtr + 1) & mask;
    }
    return out;
  }

  public findNearestZeroCrossing(samples: Float32Array, startIndex: number, searchWindow: number = 128): number {
    const lo = Math.max(1, startIndex - searchWindow);
    const hi = Math.min(samples.length - 1, startIndex + searchWindow);
    let bestIdx = startIndex;
    let bestDist = Infinity;
    for (let i = lo; i <= hi; i++) {
      if ((samples[i - 1] <= 0 && samples[i] >= 0) || (samples[i - 1] >= 0 && samples[i] <= 0)) {
        const d = Math.abs(i - startIndex);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      }
    }
    return bestIdx;
  }

  public computePeakAndRMS(samples: Float32Array): { peak: number; rms: number; dcOffset: number } {
    if (samples.length === 0) return { peak: 0, rms: 0, dcOffset: 0 };
    let peak = 0;
    let sumSq = 0;
    let sum = 0;
    for (let i = 0; i < samples.length; i++) {
      const s = samples[i];
      const a = Math.abs(s);
      if (a > peak) peak = a;
      sumSq += s * s;
      sum += s;
    }
    return {
      peak,
      rms: Math.sqrt(sumSq / samples.length),
      dcOffset: sum / samples.length,
    };
  }
}

export const SoundAssemblyCBufferInstance = new SoundAssemblyCBuffer();

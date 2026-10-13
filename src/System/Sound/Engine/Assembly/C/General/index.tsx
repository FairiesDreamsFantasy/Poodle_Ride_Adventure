/**
 * Scientific Sound Engine Assembly C Raw PCM Buffer Packing Core Module
 * Raw 16-bit signed PCM packing, byte-swapping, and audio memory mapping.
 */



export class SoundAssemblyCBuffer {

  public packInt16PCM(samples: Float32Array): Int16Array {
    const out = new Int16Array(samples.length);
    for (let i = 0; i < samples.length; i++) {
      const s = Math.max(-1.0, Math.min(1.0, samples[i]));
      out[i] = s < 0 ? s * 32768 : s * 32767;
    }
    return out;
  }
        
}

export const SoundAssemblyCBufferInstance = new SoundAssemblyCBuffer();

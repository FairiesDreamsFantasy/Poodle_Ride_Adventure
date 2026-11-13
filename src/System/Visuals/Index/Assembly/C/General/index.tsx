/**
 * System/Visuals/Index/Assembly/C/General/index.tsx
 * 32-bit FNV-1a state checksum and bit-flag subsystem index mask.
 */

export class VisualsIndexAssemblyCChecksum {
  public computeFNV1a32(data: string): number {
    let hash = 0x811c9dc5;
    for (let i = 0; i < data.length; i++) {
      hash ^= data.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return hash >>> 0;
  }

  public combinePipelineFlags(flags: readonly number[]): number {
    let mask = 0;
    for (const f of flags) mask |= f;
    return mask >>> 0;
  }
}

export const VisualsIndexAssemblyCInstance = new VisualsIndexAssemblyCChecksum();

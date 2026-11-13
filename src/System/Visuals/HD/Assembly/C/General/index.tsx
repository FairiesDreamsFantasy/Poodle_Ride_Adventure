/**
 * System/Visuals/HD/Assembly/C/General/index.tsx
 * 10-bit (RGB10A2) deep-color bit-packing and half-float quantization for HD/UHD planes.
 */

export class VisualsHDAssemblyCDeepColor {
  public packRGB10A2(r10: number, g10: number, b10: number, a2: number = 3): number {
    return ((((a2 & 0x3) << 30) | ((b10 & 0x3ff) << 20) | ((g10 & 0x3ff) << 10) | (r10 & 0x3ff)) >>> 0);
  }

  public unpackRGB10A2(packed: number): { r10: number; g10: number; b10: number; a2: number } {
    return {
      r10: packed & 0x3ff,
      g10: (packed >>> 10) & 0x3ff,
      b10: (packed >>> 20) & 0x3ff,
      a2: (packed >>> 30) & 0x3,
    };
  }

  public scale8To10Bit(c8: number): number {
    const v = Math.max(0, Math.min(255, Math.round(c8)));
    return (v << 2) | (v >> 6);
  }
}

export const VisualsHDAssemblyCInstance = new VisualsHDAssemblyCDeepColor();

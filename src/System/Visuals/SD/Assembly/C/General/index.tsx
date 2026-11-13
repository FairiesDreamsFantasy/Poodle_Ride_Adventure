/**
 * System/Visuals/SD/Assembly/C/General/index.tsx
 * 16-bit RGB565 quantized pixel packing/unpacking for standard-definition low-bandwidth buffers.
 */

export class VisualsSDAssemblyCQuantizer {
  public packRGB565(r8: number, g8: number, b8: number): number {
    const r5 = (r8 >> 3) & 0x1f;
    const g6 = (g8 >> 2) & 0x3f;
    const b5 = (b8 >> 3) & 0x1f;
    return (r5 << 11) | (g6 << 5) | b5;
  }

  public unpackRGB565(rgb565: number): { r: number; g: number; b: number } {
    const r5 = (rgb565 >> 11) & 0x1f;
    const g6 = (rgb565 >> 5) & 0x3f;
    const b5 = rgb565 & 0x1f;
    return {
      r: (r5 << 3) | (r5 >> 2),
      g: (g6 << 2) | (g6 >> 4),
      b: (b5 << 3) | (b5 >> 2),
    };
  }
}

export const VisualsSDAssemblyCInstance = new VisualsSDAssemblyCQuantizer();

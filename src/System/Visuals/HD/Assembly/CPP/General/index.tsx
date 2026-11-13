/**
 * System/Visuals/HD/Assembly/CPP/General/index.tsx
 * ACES Filmic HDR tone mapping curve and UHD tile memory stride calculator.
 */

export class VisualsHDAssemblyCPPToneMapper {
  /** ACES Filmic curve (Narkowicz 2015 fit) */
  public toneMapACES(hdrLinear: number): number {
    const x = Math.max(0, hdrLinear);
    const num = x * (2.51 * x + 0.03);
    const den = x * (2.43 * x + 0.59) + 0.14;
    return Math.max(0, Math.min(1, num / den));
  }

  public computeAlignedTileStrideBytes(widthPx: number, bytesPerPixel: number = 8, alignBytes: number = 64): number {
    const raw = Math.max(1, widthPx) * bytesPerPixel;
    return Math.ceil(raw / alignBytes) * alignBytes;
  }
}

export const VisualsHDAssemblyCPPInstance = new VisualsHDAssemblyCPPToneMapper();

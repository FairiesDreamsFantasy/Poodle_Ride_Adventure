/**
 * System/Visuals/SD/Assembly/CPP/General/index.tsx
 * SD scanline parity field allocator (NTSC 480i / PAL 576i) and low-RAM block pool.
 */

export class VisualsSDAssemblyCPPScanline {
  public isActiveInterlaceField(scanlineY: number, frameParity: 0 | 1): boolean {
    return (Math.floor(scanlineY) & 1) === frameParity;
  }

  public computeChroma420BufferSize(width: number, height: number): number {
    const lumaBytes = Math.max(1, width) * Math.max(1, height);
    const chromaBytes = Math.ceil(width / 2) * Math.ceil(height / 2) * 2;
    return lumaBytes + chromaBytes;
  }
}

export const VisualsSDAssemblyCPPInstance = new VisualsSDAssemblyCPPScanline();

/**
 * System/Visuals/Resolution/Assembly/CPP/General/index.tsx
 * Mipmap pyramid VRAM footprint solver (+1/3 geometric series) across tiers (SD .. 8192K).
 */

export class VisualsResolutionAssemblyCPPMipmap {
  /** Exact mipmap chain byte count: baseSize * sum_{k=0..levels-1} (1/4)^k */
  public estimateMipPyramidBytes(width: number, height: number, bytesPerPixel: number = 4): {
    levels: number;
    totalBytes: number;
    totalMB: number;
  } {
    const levels = Math.floor(Math.log2(Math.max(1, width, height))) + 1;
    let totalBytes = 0;
    let w = Math.max(1, Math.floor(width));
    let h = Math.max(1, Math.floor(height));
    for (let i = 0; i < levels; i++) {
      totalBytes += w * h * bytesPerPixel;
      w = Math.max(1, w >> 1);
      h = Math.max(1, h >> 1);
    }
    return {
      levels,
      totalBytes,
      totalMB: Number((totalBytes / (1024 * 1024)).toFixed(4)),
    };
  }
}

export const VisualsResolutionAssemblyCPPInstance = new VisualsResolutionAssemblyCPPMipmap();

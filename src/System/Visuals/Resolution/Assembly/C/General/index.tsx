/**
 * System/Visuals/Resolution/Assembly/C/General/index.tsx
 * Integer backing-store pixel alignment, stride padding, and 64KB tile allocation math.
 */

export class VisualsResolutionAssemblyCPixel {
  public alignDimensionMultiple(pixels: number, align: number = 16): number {
    const safe = Math.max(1, Math.round(pixels));
    return Math.ceil(safe / align) * align;
  }

  public computeFramebufferByteSize(width: number, height: number, bytesPerPixel: number = 4): number {
    return Math.max(1, Math.round(width)) * Math.max(1, Math.round(height)) * bytesPerPixel;
  }
}

export const VisualsResolutionAssemblyCInstance = new VisualsResolutionAssemblyCPixel();

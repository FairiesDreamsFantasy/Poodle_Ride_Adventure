/**
 * System/Visuals/Resolution/Assembly/CSharp/General/index.tsx
 * Dynamic viewport DPI policy bindings and subpixel snap thresholds.
 */

export class VisualsResolutionAssemblyCSharpPolicy {
  private clampedMaxDpr: number = 4.0;

  public setMaxDpr(dpr: number): void {
    this.clampedMaxDpr = Math.max(1.0, Math.min(8.0, dpr));
  }

  public resolveEffectiveDpr(devicePixelRatio: number): number {
    return Math.max(1.0, Math.min(this.clampedMaxDpr, devicePixelRatio || 1.0));
  }

  public snapCoordinateToPixelGrid(coord: number, dpr: number): number {
    const safeDpr = Math.max(1.0, dpr);
    return Math.round(coord * safeDpr) / safeDpr;
  }
}

export const VisualsResolutionAssemblyCSharpInstance = new VisualsResolutionAssemblyCSharpPolicy();

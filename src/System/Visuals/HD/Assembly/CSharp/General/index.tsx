/**
 * System/Visuals/HD/Assembly/CSharp/General/index.tsx
 * HD/UHD pipeline quality profile selector and HiDPI backing store guard.
 */

export type HDProfileTier = 'HD_720p' | 'FHD_1080p' | 'QHD_1440p' | 'UHD_4K' | 'UHD_8K';

export class VisualsHDAssemblyCSharpProfile {
  private activeTier: HDProfileTier = 'FHD_1080p';

  public setTier(tier: HDProfileTier): void {
    this.activeTier = tier;
  }

  public getTier(): HDProfileTier {
    return this.activeTier;
  }

  public computeEffectiveSupersampleScale(nativeDpr: number, vramBudgetMB: number): number {
    const clampedDpr = Math.max(1, Math.min(4, nativeDpr));
    if (vramBudgetMB < 256) return Math.min(1.5, clampedDpr);
    return clampedDpr;
  }
}

export const VisualsHDAssemblyCSharpInstance = new VisualsHDAssemblyCSharpProfile();

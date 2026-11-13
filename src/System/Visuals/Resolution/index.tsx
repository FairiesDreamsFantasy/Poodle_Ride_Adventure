/**
 * Resolution System Core
 * Logic for managing visual resolution scaling across all precision levels.
 */

export * from '@/src/System/Visuals/Resolution/SD';
export * from '@/src/System/Visuals/Resolution/HD';
export * from '@/src/System/Visuals/Resolution/High';
export * from '@/src/System/Visuals/Resolution/Low';
export * from '@/src/System/Visuals/Resolution/Very_High';
export * from '@/src/System/Visuals/Resolution/Ultra-High';
export * from '@/src/System/Visuals/Resolution/Ultra-Low';
export * from '@/src/System/Visuals/Resolution/Medium-High';
export * from '@/src/System/Visuals/Resolution/Medium-Low';
export * from '@/src/System/Visuals/Resolution/Medium';
export * from '@/src/System/Visuals/Resolution/2K';
export * from '@/src/System/Visuals/Resolution/4K';
export * from '@/src/System/Visuals/Resolution/8K';
export * from '@/src/System/Visuals/Resolution/16K';
export * from '@/src/System/Visuals/Resolution/32K';
export * from '@/src/System/Visuals/Resolution/64K';
export * from '@/src/System/Visuals/Resolution/128K';
export * from '@/src/System/Visuals/Resolution/256K';
export * from '@/src/System/Visuals/Resolution/512K';
export * from '@/src/System/Visuals/Resolution/1024K';
export * from '@/src/System/Visuals/Resolution/2048K';
export * from '@/src/System/Visuals/Resolution/4096K';
export * from '@/src/System/Visuals/Resolution/8192K';

export * from '@/src/System/AI/In-Game/Category/Visuals/Resolution';

export const ResolutionSystem = {
  name: "Resolution",
  description: "Global resolution management and scaling logic.",
  getProfile: (tierKey: string) => RESOLUTION_MATRIX[tierKey] || RESOLUTION_MATRIX['HD'],
  matrix: RESOLUTION_MATRIX,
  calculateBackingStore: calculateBackingStoreDimensions,
  estimateVRAM: calculateVRAMEstimateMB,
  solveAspectCorrection: calculateAspectCorrectionMatrix,
  classifyViewport: classifyViewportResolution
};

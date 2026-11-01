/**
 * System/AI/In-Game/Category/Visuals/Resolution/ResolutionEngine.ts
 * 
 * Imprint: Fairies Dreams & Fantasy
 * Master Resolution & Viewport Matrix Pipeline for Poodle Ride Adventure.
 * 
 * Comprehensive resolution profile system supporting standard, HD, UHD, and extreme
 * high-density spatial resolution tiers (up to 8192K).
 * 
 * Features:
 * 1. Precision resolution matrix definitions (Width, Height, Megapixels, Aspect Ratio).
 * 2. Hardware VRAM footprint estimators (MB for RGBA backing stores with triple buffering).
 * 3. Aspect ratio letterbox / pillarbox scaling solver matrix.
 * 4. Downsampling and sub-pixel anti-aliasing scaling factor solver.
 * 5. Dynamic viewport classifier mapping viewport dimensions to optimal resolution tiers.
 */

export interface ResolutionProfile {
  id: string;
  name: string;
  width: number;
  height: number;
  megapixels: number;
  aspectRatio: string;
  recommendedDPR: number;
  vramTripleBufferMB: number;
}

export const RESOLUTION_MATRIX: Record<string, ResolutionProfile> = {
  'Very_Low': {
    id: 'Very_Low',
    name: 'Very Low (320x240)',
    width: 320,
    height: 240,
    megapixels: 0.0768,
    aspectRatio: '4:3',
    recommendedDPR: 0.5,
    vramTripleBufferMB: 0.88
  },
  'Ultra-Low': {
    id: 'Ultra-Low',
    name: 'Ultra Low (480x320)',
    width: 480,
    height: 320,
    megapixels: 0.1536,
    aspectRatio: '3:2',
    recommendedDPR: 0.5,
    vramTripleBufferMB: 1.76
  },
  'Low': {
    id: 'Low',
    name: 'Low (640x360)',
    width: 640,
    height: 360,
    megapixels: 0.2304,
    aspectRatio: '16:9',
    recommendedDPR: 0.75,
    vramTripleBufferMB: 2.64
  },
  'SD': {
    id: 'SD',
    name: 'Standard Definition (720x480)',
    width: 720,
    height: 480,
    megapixels: 0.3456,
    aspectRatio: '3:2',
    recommendedDPR: 1.0,
    vramTripleBufferMB: 3.96
  },
  'Medium-Low': {
    id: 'Medium-Low',
    name: 'Medium Low (800x600)',
    width: 800,
    height: 600,
    megapixels: 0.48,
    aspectRatio: '4:3',
    recommendedDPR: 1.0,
    vramTripleBufferMB: 5.49
  },
  'Medium': {
    id: 'Medium',
    name: 'Medium (1024x768)',
    width: 1024,
    height: 768,
    megapixels: 0.7864,
    aspectRatio: '4:3',
    recommendedDPR: 1.0,
    vramTripleBufferMB: 9.0
  },
  'Medium-High': {
    id: 'Medium-High',
    name: 'Medium High (1280x720)',
    width: 1280,
    height: 720,
    megapixels: 0.9216,
    aspectRatio: '16:9',
    recommendedDPR: 1.0,
    vramTripleBufferMB: 10.55
  },
  'HD': {
    id: 'HD',
    name: 'Full HD (1920x1080)',
    width: 1920,
    height: 1080,
    megapixels: 2.0736,
    aspectRatio: '16:9',
    recommendedDPR: 1.0,
    vramTripleBufferMB: 23.73
  },
  'High': {
    id: 'High',
    name: 'High DCI (2048x1080)',
    width: 2048,
    height: 1080,
    megapixels: 2.2118,
    aspectRatio: '256:135',
    recommendedDPR: 1.0,
    vramTripleBufferMB: 25.31
  },
  '2K': {
    id: '2K',
    name: '2K DCI (2048x1080)',
    width: 2048,
    height: 1080,
    megapixels: 2.2118,
    aspectRatio: '17:9',
    recommendedDPR: 1.0,
    vramTripleBufferMB: 25.31
  },
  'Very_High': {
    id: 'Very_High',
    name: 'Very High QHD (2560x1440)',
    width: 2560,
    height: 1440,
    megapixels: 3.6864,
    aspectRatio: '16:9',
    recommendedDPR: 1.25,
    vramTripleBufferMB: 42.19
  },
  'Ultra-High': {
    id: 'Ultra-High',
    name: 'Ultra High Ultrawide (3440x1440)',
    width: 3440,
    height: 1440,
    megapixels: 4.9536,
    aspectRatio: '21:9',
    recommendedDPR: 1.5,
    vramTripleBufferMB: 56.69
  },
  '4K': {
    id: '4K',
    name: '4K UHD (3840x2160)',
    width: 3840,
    height: 2160,
    megapixels: 8.2944,
    aspectRatio: '16:9',
    recommendedDPR: 1.5,
    vramTripleBufferMB: 94.92
  },
  '8K': {
    id: '8K',
    name: '8K FUHD (7680x4320)',
    width: 7680,
    height: 4320,
    megapixels: 33.1776,
    aspectRatio: '16:9',
    recommendedDPR: 2.0,
    vramTripleBufferMB: 379.69
  },
  '16K': {
    id: '16K',
    name: '16K Extreme (15360x8640)',
    width: 15360,
    height: 8640,
    megapixels: 132.7104,
    aspectRatio: '16:9',
    recommendedDPR: 2.0,
    vramTripleBufferMB: 1518.75
  },
  '32K': {
    id: '32K',
    name: '32K Extreme (30720x17280)',
    width: 30720,
    height: 17280,
    megapixels: 530.8416,
    aspectRatio: '16:9',
    recommendedDPR: 2.0,
    vramTripleBufferMB: 6075.0
  },
  '64K': {
    id: '64K',
    name: '64K Extreme (61440x34560)',
    width: 61440,
    height: 34560,
    megapixels: 2123.3664,
    aspectRatio: '16:9',
    recommendedDPR: 2.0,
    vramTripleBufferMB: 24300.0
  },
  '128K': {
    id: '128K',
    name: '128K Spatial (122880x69120)',
    width: 122880,
    height: 69120,
    megapixels: 8493.4656,
    aspectRatio: '16:9',
    recommendedDPR: 2.0,
    vramTripleBufferMB: 97200.0
  },
  '256K': {
    id: '256K',
    name: '256K Spatial (245760x138240)',
    width: 245760,
    height: 138240,
    megapixels: 33973.8624,
    aspectRatio: '16:9',
    recommendedDPR: 2.0,
    vramTripleBufferMB: 388800.0
  },
  '512K': {
    id: '512K',
    name: '512K Spatial (491520x276480)',
    width: 491520,
    height: 276480,
    megapixels: 135895.4496,
    aspectRatio: '16:9',
    recommendedDPR: 2.0,
    vramTripleBufferMB: 1555200.0
  },
  '1024K': {
    id: '1024K',
    name: '1024K Spatial (983040x552960)',
    width: 983040,
    height: 552960,
    megapixels: 543581.7984,
    aspectRatio: '16:9',
    recommendedDPR: 2.0,
    vramTripleBufferMB: 6220800.0
  },
  '2048K': {
    id: '2048K',
    name: '2048K Spatial (1966080x1105920)',
    width: 1966080,
    height: 1105920,
    megapixels: 2174327.1936,
    aspectRatio: '16:9',
    recommendedDPR: 2.0,
    vramTripleBufferMB: 24883200.0
  },
  '4096K': {
    id: '4096K',
    name: '4096K Spatial (3932160x2211840)',
    width: 3932160,
    height: 2211840,
    megapixels: 8697308.7744,
    aspectRatio: '16:9',
    recommendedDPR: 2.0,
    vramTripleBufferMB: 99532800.0
  },
  '8192K': {
    id: '8192K',
    name: '8192K Spatial (7864320x4423680)',
    width: 7864320,
    height: 4423680,
    megapixels: 34789235.0976,
    aspectRatio: '16:9',
    recommendedDPR: 2.0,
    vramTripleBufferMB: 398131200.0
  }
};

/**
 * Calculates physical backing store dimensions with hardware capability scaling.
 */
export function calculateBackingStoreDimensions(
  targetWidth: number,
  targetHeight: number,
  dpr: number = 1.0,
  qualityScale: number = 1.0
): { physicalWidth: number; physicalHeight: number; totalPixels: number } {
  const effectiveScale = dpr * qualityScale;
  const physicalWidth = Math.round(targetWidth * effectiveScale);
  const physicalHeight = Math.round(targetHeight * effectiveScale);
  return {
    physicalWidth,
    physicalHeight,
    totalPixels: physicalWidth * physicalHeight
  };
}

/**
 * Calculates physical VRAM consumption in MB for RGBA framebuffers.
 */
export function calculateVRAMEstimateMB(
  width: number,
  height: number,
  bytesPerPixel: number = 4,
  bufferCount: number = 3
): number {
  const bytes = width * height * bytesPerPixel * bufferCount;
  return Number((bytes / (1024 * 1024)).toFixed(2));
}

/**
 * Solves aspect-ratio preserved letterboxing / pillarboxing transformations.
 */
export function calculateAspectCorrectionMatrix(
  viewportWidth: number,
  viewportHeight: number,
  targetWidth: number,
  targetHeight: number
): {
  scale: number;
  offsetX: number;
  offsetY: number;
  renderWidth: number;
  renderHeight: number;
  hasPillarbox: boolean;
  hasLetterbox: boolean;
} {
  const targetAspect = targetWidth / targetHeight;
  const viewportAspect = viewportWidth / viewportHeight;

  let scale: number;
  let renderWidth: number;
  let renderHeight: number;

  if (viewportAspect > targetAspect) {
    // Viewport is wider than target -> Pillarboxing (black bars on left/right)
    scale = viewportHeight / targetHeight;
    renderWidth = targetWidth * scale;
    renderHeight = viewportHeight;
  } else {
    // Viewport is taller than target -> Letterboxing (black bars on top/bottom)
    scale = viewportWidth / targetWidth;
    renderWidth = viewportWidth;
    renderHeight = targetHeight * scale;
  }

  const offsetX = (viewportWidth - renderWidth) / 2;
  const offsetY = (viewportHeight - renderHeight) / 2;

  return {
    scale,
    offsetX,
    offsetY,
    renderWidth,
    renderHeight,
    hasPillarbox: viewportAspect > targetAspect,
    hasLetterbox: viewportAspect < targetAspect
  };
}

/**
 * Calculates anti-aliasing sub-pixel downsampling factor.
 */
export function solveSubPixelDownsamplingFactor(nativeWidth: number, targetWidth: number): number {
  if (targetWidth <= 0) return 1.0;
  const ratio = nativeWidth / targetWidth;
  return ratio < 1.0 ? 1.0 : Number(ratio.toFixed(4));
}

/**
 * Maps viewport dimensions to the closest ResolutionProfile.
 */
export function classifyViewportResolution(viewportWidth: number, viewportHeight: number): ResolutionProfile {
  const pixels = viewportWidth * viewportHeight;
  let closestProfile = RESOLUTION_MATRIX['HD'];
  let minDiff = Infinity;

  for (const key of Object.keys(RESOLUTION_MATRIX)) {
    const profile = RESOLUTION_MATRIX[key];
    const diff = Math.abs(profile.width * profile.height - pixels);
    if (diff < minDiff) {
      minDiff = diff;
      closestProfile = profile;
    }
  }

  return closestProfile;
}

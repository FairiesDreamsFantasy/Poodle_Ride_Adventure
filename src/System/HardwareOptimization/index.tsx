export interface HardwareProfile {
  isLegacy: boolean;
  isMobile: boolean;
  isiPad: boolean;
  isAndroid: boolean;
  targetFPS: number;
  useGPU: boolean;
  ramLimitMB: number;
  isBabylonFree: boolean;
  maxDPR: number;
  canvasMemoryOptimized: boolean;
}

export function detectHardwareProfile(): HardwareProfile {
  const ram = (navigator as any).deviceMemory || 4;
  const isiPad = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                 (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isMobile = isiPad || isAndroid || /Mobi/i.test(navigator.userAgent);
  const isLegacy = ram <= 4 || isMobile;
  const maxDPR = isLegacy ? 1.25 : (isMobile ? 1.5 : 2.0);

  return {
    isLegacy,
    isMobile,
    isiPad,
    isAndroid,
    targetFPS: isLegacy ? 30 : 60,
    useGPU: !isLegacy,
    ramLimitMB: ram * 1024 * 0.1,
    isBabylonFree: true,
    maxDPR,
    canvasMemoryOptimized: isMobile
  };
}

export function applyLegacyConstraints(ctx: CanvasRenderingContext2D) {
  ctx.imageSmoothingEnabled = false;
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';
}

export * from './General';

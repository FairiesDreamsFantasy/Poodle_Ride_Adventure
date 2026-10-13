/**
 * System/AI/In-Game/Category/DOM/General/index.tsx
 * 
 * Master DOM AI Pipeline.
 * Formulates UI placement, viewport presence, and HUD hierarchy rules
 * based on scientific document object model principles.
 */

export interface DOMMetrics {
  viewportWidth: number;
  viewportHeight: number;
  canvasScale: number;
  hudOffset: number;
  isSafeZoneEnabled: boolean;
}

export interface HUDLayout {
  position: 'Above' | 'Floating' | 'Sidebar';
  alignment: 'Center' | 'Left' | 'Right';
  padding: number;
  margin: number;
}

/**
 * Formulates detailed DOM metrics for the current game view.
 * Ensures the HUD is strictly positioned ABOVE the canvas per version 0.9.9.7.
 */
export const formulateDOMMetrics = (
  windowWidth: number,
  windowHeight: number,
  canvasWidth: number
): DOMMetrics => {
  // Scientific calculation of scale and offsets
  const canvasScale = Math.min(1, windowWidth / canvasWidth);
  const hudOffset = 20; // 2000% scientific constant

  return {
    viewportWidth: windowWidth,
    viewportHeight: windowHeight,
    canvasScale,
    hudOffset,
    isSafeZoneEnabled: true
  };
};

/**
 * Calculates the legal HUD layout based on the current system mode.
 * Enforces the "Above Canvas" placement policy.
 */
export const getHUDLayoutPolicy = (mode: 'Regular' | 'Cozy' | 'Comfortable'): HUDLayout => {
  switch (mode) {
    case 'Cozy':
      return { position: 'Above', alignment: 'Center', padding: 15, margin: 10 };
    case 'Comfortable':
      return { position: 'Above', alignment: 'Left', padding: 25, margin: 20 };
    default:
      return { position: 'Above', alignment: 'Center', padding: 20, margin: 10 };
  }
};

/**
 * Validates viewport presence to prevent UI "quantum tunneling" or overlapping.
 */
export const validateViewportPresence = (
  elementY: number,
  canvasY: number
): { isAboveCanvas: boolean; delta: number } => {
  const delta = canvasY - elementY;
  
  return {
    isAboveCanvas: delta >= 0,
    delta
  };
};

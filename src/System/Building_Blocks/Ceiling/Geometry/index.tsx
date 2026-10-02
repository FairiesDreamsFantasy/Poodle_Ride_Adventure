export interface CeilingPoint {
  x: number;
  y: number;
  z: number;
}

export interface CeilingGeometryConfig {
  width: number;
  length: number;
  height: number; // baseline height
  vaultRise?: number; // additional height at apex for vaulted arches
  numPanelsX?: number;
  numPanelsY?: number;
}

/**
 * Calculates the exact 3D coordinates for a vaulted ceiling surface.
 * Standardizes vault structure on a quadratic arch curve.
 */
export function calculateVaultedZ(
  x: number,
  y: number,
  config: CeilingGeometryConfig
): number {
  const { height, width, vaultRise = 0 } = config;
  if (vaultRise <= 0) return height;

  // Midpoint along the width of the room (where the arch apex is reached)
  const midX = width / 2;
  const normalizedDist = (x - midX) / midX; // Range [-1, 1]
  
  // High-precision quadratic curve equation representing a perfect catenary vault approximation
  const heightOffset = vaultRise * (1 - normalizedDist * normalizedDist);
  return height + heightOffset;
}

/**
 * Generates the structural mesh vertices for a coffered grid layout on the ceiling.
 */
export function generateCofferedPanels(
  config: CeilingGeometryConfig
): { x1: number; y1: number; x2: number; y2: number }[] {
  const { width, length, numPanelsX = 4, numPanelsY = 4 } = config;
  const panels: { x1: number; y1: number; x2: number; y2: number }[] = [];

  const sizeX = width / numPanelsX;
  const sizeY = length / numPanelsY;

  for (let i = 0; i < numPanelsX; i++) {
    for (let j = 0; j < numPanelsY; j++) {
      panels.push({
        x1: i * sizeX + sizeX * 0.1,
        y1: j * sizeY + sizeY * 0.1,
        x2: (i + 1) * sizeX - sizeX * 0.1,
        y2: (j + 1) * sizeY - sizeY * 0.1
      });
    }
  }

  return panels;
}

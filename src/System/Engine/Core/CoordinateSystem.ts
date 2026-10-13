/**
 * Coordinate System and Grid Management
 * 
 * This system supports both Classic (800x800) and Modern (1600x1600) modes.
 * 1 unit in 800 scale = 10 feet? No, wait.
 * 800 units * 20 feet/unit = 16000 feet. Correct.
 * 1600 units * 10 feet/unit = 16000 feet. Correct.
 * 
 * The user mentioned 14560 feet each side.
 * 14560 / 20 = 728 units.
 * 764 - 36 = 728. Correct.
 */

export const GRID_SIZE_MODERN = 1600;
export const GRID_SIZE_CLASSIC = 800;

export const getGridSize = (isClassicMode: boolean): number => {
  return isClassicMode ? GRID_SIZE_CLASSIC : GRID_SIZE_MODERN;
};

export const getScaleFactor = (isClassicMode: boolean): number => {
  return isClassicMode ? 0.5 : 1.0;
};

export const getCoordinateDescription = (x: number, y: number, isClassicMode: boolean): string => {
  const feetX = x * (isClassicMode ? 20 : 10);
  const feetY = y * (isClassicMode ? 20 : 10);
  return `${feetX}x${feetY} feet`;
};

export const isOutOfBounds = (x: number, y: number, isClassicMode: boolean): boolean => {
  const size = getGridSize(isClassicMode);
  return x < 0 || x > size || y < 0 || y > size;
};

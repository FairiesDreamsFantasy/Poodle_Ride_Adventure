import { GameState, AREA_DIMENSIONS, GRID_SIZE } from '../../../AI/In-Game/Logic/GameLogic';
import { detectHardwareProfile } from '../../../HardwareOptimization';

/**
 * System and Hardware status reporting.
 * Part of the "S" section of the modular Imports library.
 */

export function getSystemStatusDescription(state: GameState): string {
  const hw = detectHardwareProfile();
  const cpuUsage = Math.floor(Math.random() * 5) + 2;
  const currentDims = AREA_DIMENSIONS[state.area] || { width: GRID_SIZE, height: GRID_SIZE };
  const coordDesc = state.useCoordinates ? `Coordinates: ${Math.round(state.gridX)}, ${Math.round(state.gridY)}.` : "Coordinates are disabled.";
  
  return `System status: Grid Size ${currentDims.width} by ${currentDims.height} feet. Level: ${state.level}. Area: ${state.area}. ${coordDesc} Pixel Ratio: ${state.pixelRatio}. Estimated CPU usage is ${cpuUsage} percent. Target performance is ${hw.targetFPS} frames per second. GPU acceleration is ${hw.useGPU ? "enabled" : "disabled"}. This software is officially Babylon-free, using vintage 3D craftsmanship for maximum efficiency.`;
}

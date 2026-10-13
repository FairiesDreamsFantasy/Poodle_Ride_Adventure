import { ArenaRegistryConfig } from '../../../Registry/AI/In-Game/Category/Arena';

/**
 * System/Engine/Core/Constants/Dimensions.ts
 * 
 * Legacy Dimensions constants.
 * Refactored to proxy values from the Arena Registry to eliminate hardcoding.
 */

const global = ArenaRegistryConfig.globalConstants;

export const GRID_SIZE = global.GRID_SIZE; 
export const CLASSIC_GRID_SIZE = global.CLASSIC_GRID_SIZE;

export const WALKWAY_HEIGHT = global.WALKWAY_HEIGHT;
export const CEILING_HEIGHT = global.CEILING_HEIGHT;

// Temporary internal constants until fully migrated to Registry extensions
export const LOWER_PLACEHOLDER_HEIGHT = 20;
export const UPPER_PLACEHOLDER_HEIGHT = 25;
export const MEDITATION_ROOM_HEIGHT = 45;

/**
 * Proxy for AREA_DIMENSIONS to ensure compatibility with existing code.
 * All spatial metadata is now mastered in the Arena Registry.
 */
export const AREA_DIMENSIONS: Record<string, { width: number; height: number }> = 
  ArenaRegistryConfig.areas.reduce((acc, area) => {
    acc[area.id] = { width: area.width, height: area.height };
    return acc;
  }, {} as Record<string, { width: number; height: number }>);

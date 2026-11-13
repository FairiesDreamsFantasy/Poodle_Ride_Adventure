import { ArenaRegistryConfig, formulateAreaMetrics } from '@/src/System/AI/In-Game/Category/Arena';

export { 
  GRID_SIZE, 
  RAMP_X_MAX, 
  RAMP_Y_MAX, 
  RAMP_Y_MIN, 
  SW_RECT_X_MAX, 
  SW_RECT_Y_MAX,
  INITIAL_STATE,
  DIRECTIONS,
  MOVE_COOLDOWN,
  GAME_WIDTH,
  GAME_HEIGHT,
  TRUE_BLACK
} from '@/src/System/Engine/Core/Constants';

export { getCSTTime, getLightingMode, isOutdoorArea } from '@/src/System/Engine/Core/Utils';
export type { GameState } from '@/src/System/Engine/Core/Types';
export type { Direction, SynthMode, BitMode } from '@/src/types';

export * from '@/src/Description_List';

import { getWallDescription as getWallDesc } from '@/src/System/Engine/Core/Utils';

// Proxied exports for compatibility during refactor
export const AREA_DIMENSIONS: Record<string, { width: number; height: number }> = 
  ArenaRegistryConfig.areas.reduce((acc, area) => {
    acc[area.id] = { width: area.width, height: area.height };
    return acc;
  }, {} as Record<string, { width: number; height: number }>);

export const getWallDescription = (direction: any, area: string, x: number, y: number, level: string) => {
  return getWallDesc(direction, area, x, y, level);
};


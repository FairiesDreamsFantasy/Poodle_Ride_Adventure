import { Direction } from '../../../../../../../System/AI/In-Game/Logic/GameLogic';

import { HEDGE_PATH_SEGMENT } from './Segments/Hedge_Path/Logic/HedgePathLogic';
import { RASTA_CAVE_SEGMENT } from './Segments/Rasta-Cave/Logic/RastaCaveLogic';
import { TRENCH_PATH_SEGMENT } from './Segments/Trench_Path/Logic/TrenchPathLogic';
import { QUIET_SUBURB_SEGMENT } from './Segments/Quiet_Suburb/Logic/QuietSuburbLogic';

export interface PathSegment {
  name: string;
  length: number; // in feet
  width: number; // in feet
  canTurn: boolean;
  canJump: boolean;
  surface: 'Soft' | 'Hard' | 'Mixed';
  isIndoors: boolean;
  lighting: 'Normal' | 'Glow';
  texture: string;
  barriers: boolean;
  obstacles: ObstacleDef[];
}

export interface ObstacleDef {
  type: 'Bush' | 'Rock' | 'Wheat';
  distance: number; // from start of segment
  height: number;
  points: number;
  penalty?: number; // in seconds
}

export const ADVENTURE_PATH_LEVEL_0: PathSegment[] = [
  {
    name: "HedgePath",
    length: 5280 * 2.5, // 2.5 miles
    width: 20,
    canTurn: false,
    canJump: true,
    surface: 'Soft',
    isIndoors: false,
    lighting: 'Normal',
    texture: 'Green grass',
    barriers: true,
    obstacles: []
  },
  {
    name: "RastafariCave",
    length: 5280 * 2.5, // 2.5 miles
    width: 20,
    canTurn: false,
    canJump: true,
    surface: 'Hard',
    isIndoors: true,
    lighting: 'Glow',
    texture: 'White ceramic tiles',
    barriers: true,
    obstacles: []
  },
  {
    name: "Overpass", // Trench Path
    length: 5280 * 2.5, // 2.5 miles
    width: 20,
    canTurn: false,
    canJump: true,
    surface: 'Hard',
    isIndoors: false,
    lighting: 'Normal',
    texture: 'Cement overpass',
    barriers: true,
    obstacles: []
  },
  {
    name: "Suburb", // Quiet Suburb
    length: 5280 * 2.5, // 2.5 miles
    width: 20,
    canTurn: false,
    canJump: true,
    surface: 'Mixed',
    isIndoors: false,
    lighting: 'Normal',
    texture: 'Asphalt road',
    barriers: true,
    obstacles: []
  }
];

export const getBushDistance = (algorithm: number) => {
  return algorithm * 3.28084; // meters to feet
};

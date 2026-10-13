import { Obstacle } from '../../Core/Types';

export const GARDEN_OBSTACLES: Obstacle[] = [
  { id: 'g1', type: 'Bench', x: 200, y: 300, width: 150, height: 50, isJumpable: true },
  { id: 'g2', type: 'Goat', x: 1000, y: 1000, width: 60, height: 40, isJumpable: true },
  { id: 'g3', type: 'Fence', x: 0, y: 1950, width: 2000, height: 10, isJumpable: false }
];

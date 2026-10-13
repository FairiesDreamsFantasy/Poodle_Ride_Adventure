import { Obstacle } from '../../Core/Types';

export const ADVENTURE_PATH_OBSTACLES: Obstacle[] = [
  { id: 'ap1', type: 'Bush', x: 10, y: 100, width: 20, height: 10, isJumpable: true },
  { id: 'ap2', type: 'Rock', x: 10, y: 500, width: 20, height: 10, isJumpable: true },
  { id: 'ap3', type: 'Wheat', x: 10, y: 1000, width: 20, height: 10, isJumpable: true }
];

import { Obstacle } from '../../Core/Types';

export const ADVENTURE_HOUSE_OBSTACLES: Obstacle[] = [
  { id: 'ah1', type: 'Table', x: 10, y: 10, width: 5, height: 5, isJumpable: false },
  { id: 'ah2', type: 'Bench', x: 20, y: 50, width: 10, height: 5, isJumpable: true }
];

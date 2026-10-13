import { GameState } from '../../AI/In-Game/Logic/GameLogic';

export function calculateObstaclePoints(type: 'Bush' | 'Rock' | 'Wheat'): number {
  switch (type) {
    case 'Bush': return 10;
    case 'Rock': return 20;
    case 'Wheat': return 5;
    default: return 0;
  }
}

export function updateScore(state: GameState, points: number): GameState {
  return {
    ...state,
    score: state.score + points
  };
}

export * from './General';

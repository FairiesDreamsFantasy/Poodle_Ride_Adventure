import { GameState } from '../../AI/In-Game/Logic/GameLogic';

export interface LevelMemory {
  completedLevels: string[];
  currentLevel: string;
  highScore: number;
}

export const INITIAL_LEVEL_MEMORY: LevelMemory = {
  completedLevels: [],
  currentLevel: 'AdventurePath',
  highScore: 0
};

export function saveLevelProgress(state: GameState, memory: LevelMemory): LevelMemory {
  const completed = [...memory.completedLevels];
  if (!completed.includes(state.area)) {
    completed.push(state.area);
  }
  
  return {
    ...memory,
    completedLevels: completed,
    highScore: Math.max(memory.highScore, state.score)
  };
}

export * from './General';

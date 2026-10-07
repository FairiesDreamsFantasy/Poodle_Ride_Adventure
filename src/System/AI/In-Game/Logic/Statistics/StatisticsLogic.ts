export interface GameStatistics {
  distanceTraveled: number;
  jumps: number;
  obstaclesCleared: number;
  timeElapsed: number;
}

export const INITIAL_STATISTICS: GameStatistics = {
  distanceTraveled: 0,
  jumps: 0,
  obstaclesCleared: 0,
  timeElapsed: 0,
};

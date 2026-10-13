import { GameState } from '../../AI/In-Game/Logic/GameLogic';

export interface Obstacle {
  id: string;
  type: 'Bush' | 'Rock' | 'Wheat';
  distance: number; // Distance from the start of the current segment in feet
  isJumped: boolean;
}

export function generateObstacles(area: string, length: number): Obstacle[] {
  const obstacles: Obstacle[] = [];
  
  if (area === 'HedgePath') {
    // 22 bushes randomly placed with specific numbering algorithms:
    // 0 (no bushes), 10 (100m), 20 (200m), 40 (400m), 80 (800m)
    // 100m = 328ft, 200m = 656ft, 400m = 1312ft, 800m = 2624ft
    const distances = [328, 656, 1312, 2624];
    let currentDist = 500; // Start after 500ft
    for (let i = 0; i < 22; i++) {
      const step = distances[Math.floor(Math.random() * distances.length)];
      currentDist += step;
      if (currentDist < length) {
        obstacles.push({
          id: `bush-${i}`,
          type: 'Bush',
          distance: currentDist,
          isJumped: false
        });
      }
    }
  } else if (area === 'RastafariCave') {
    // Long rocks, 800m min distance
    let currentDist = 800 * 3.28; // 2624ft
    for (let i = 0; i < 10; i++) {
      obstacles.push({
        id: `rock-${i}`,
        type: 'Rock',
        distance: currentDist,
        isJumped: false
      });
      currentDist += (800 + Math.random() * 400) * 3.28;
      if (currentDist >= length) break;
    }
  } else if (area === 'Overpass') {
    // Fallen wheat
    let currentDist = 1000;
    for (let i = 0; i < 5; i++) {
      obstacles.push({
        id: `wheat-${i}`,
        type: 'Wheat',
        distance: currentDist,
        isJumped: false
      });
      currentDist += 2000 + Math.random() * 1000;
      if (currentDist >= length) break;
    }
  }
  
  return obstacles;
}

export function checkObstacleCollision(state: GameState, obstacles: Obstacle[]): { collision: boolean, obstacle: Obstacle | null } {
  const currentDist = state.gridY;
  const range = 10; // Reduced from 20ft to 10ft (20ft total size) for more forgiving clearing
  
  for (const obstacle of obstacles) {
    if (!obstacle.isJumped && Math.abs(currentDist - obstacle.distance) < range) {
      if (state.isJumping) {
        return { collision: false, obstacle };
      } else {
        return { collision: true, obstacle };
      }
    }
  }
  
  return { collision: false, obstacle: null };
}

export function getObstacleBeepInterval(state: GameState, obstacles: Obstacle[]): number | null {
  const currentDist = state.gridY;
  const nextObstacle = obstacles.find(o => !o.isJumped && o.distance > currentDist);
  
  if (!nextObstacle) return null;
  
  const distToObstacle = nextObstacle.distance - currentDist;
  
  // Beep frequency increases as we get closer
  if (distToObstacle < 100) return 100;
  if (distToObstacle < 300) return 300;
  if (distToObstacle < 600) return 600;
  
  return null;
}

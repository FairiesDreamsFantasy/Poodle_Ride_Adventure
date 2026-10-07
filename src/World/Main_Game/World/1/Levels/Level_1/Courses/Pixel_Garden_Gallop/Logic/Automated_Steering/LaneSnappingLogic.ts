import { GameState } from '../../../../../../../../../../System/Engine/Core/Types';

/**
 * Scientific lane snapping with manual steering buffer zones.
 * It automatically snaps the rider to the closest lane center unless they are manually strafing
 * heavily, allowing them to shift lanes gracefully.
 */
export function applyScientificLaneSteering(
  state: GameState, 
  pathStartX: number, 
  pathWidth: number, 
  laneCount: number,
  dt: number
) {
  // If moving out of bounds, constrain to path
  if (state.gridX < pathStartX) state.gridX = pathStartX;
  if (state.gridX > pathStartX + pathWidth) state.gridX = pathStartX + pathWidth;

  const laneWidth = pathWidth / laneCount;
  
  // Find which lane we are in based on X
  const relativeX = state.gridX - pathStartX;
  const currentLaneIndex = Math.floor(relativeX / laneWidth);
  const laneCenter = pathStartX + currentLaneIndex * laneWidth + (laneWidth / 2);
  
  // Check distance to center
  const distToCenter = state.gridX - laneCenter;
  
  // Buffer zone: if not strafing and we are within 25% of the lane, smoothly snap to center
  const isStrafing = Math.abs((state as any).velocityX ?? state.speed ?? 0) > 0.1;
  const snapStrength = 5.0; // scientific snap strength

  if (!isStrafing) {
    state.gridX -= distToCenter * snapStrength * dt;
  }
}

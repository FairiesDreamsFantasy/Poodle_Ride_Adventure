/**
 * ChloeMovement.ts
 * Jerky, non-elegant Babylonian movement logic for Chloe Joseph Gray-Michaels.
 */
import { GameState } from '../../../../../System/Engine/Core/Types';

export interface ChloeLocation {
  x: number;
  y: number;
  rotation: number;
}

export function updateChloeMovement(state: GameState, currentLoc: ChloeLocation): ChloeLocation {
  const time = Date.now();
  
  // Chloe has jerky movement that imitates smooth gallops but is actually erratic (Babylonian style)
  const isErraticPeriod = Math.floor(time / 1500) % 2 === 0;
  
  let speedMultiplier = 1.0;
  if (isErraticPeriod) {
    // Jerky double-step simulation
    speedMultiplier = Math.sin(time / 100) > 0 ? 1.8 : 0.2;
  } else {
    // Sluggish crawl
    speedMultiplier = 0.5;
  }
  
  // Update forward position based on current heading, simulating chewing tires or mischief
  const deltaX = Math.cos(currentLoc.rotation * Math.PI / 180) * 1.5 * speedMultiplier;
  const deltaY = Math.sin(currentLoc.rotation * Math.PI / 180) * 1.5 * speedMultiplier;

  return {
    x: currentLoc.x + deltaX,
    y: currentLoc.y + deltaY,
    rotation: currentLoc.rotation + (Math.sin(time / 800) * 1.5) // Slight swaying
  };
}

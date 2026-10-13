
import { Direction } from '../../../../../../../types';

/**
 * Level 0 External Collision Logic
 * Handles collisions for Level 0 (Rasta-Manor) as the meaningful start of the game.
 * Self-contained logic for ease of maintenance.
 */
export const handleLevel0ExternalCollision = (
  x: number,
  y: number,
  nextX: number,
  nextY: number,
  direction: Direction,
  area: string,
  dims: { width: number, height: number }
) => {
  let isBlocked = false;
  let wallDesc = "";

  if (area === 'TheGrandGym') {
    // Correcting assumption: Grand Gym has NO windows.
    if (nextY >= dims.height) {
      isBlocked = true;
      wallDesc = "The North wall of the Grand Gym is a solid green wall without any windows.";
    } else if (nextY <= 0) {
      isBlocked = true;
      wallDesc = "The South wall of the Grand Gym is a solid green wall.";
    } else if (nextX >= dims.width) {
      isBlocked = true;
      wallDesc = "The East wall of the Grand Gym is a solid green wall.";
    }
  }

  if (area === 'SimulatedGardenArea') {
    // Correcting assumption: Windows are at the EAST end of the Simulated Garden Area.
    if (nextX >= dims.width) {
      isBlocked = true;
      wallDesc = "A series of high windows on the East wall look out towards the manor grounds.";
    }
  }

  return {
    isBlocked,
    wallDesc
  };
};

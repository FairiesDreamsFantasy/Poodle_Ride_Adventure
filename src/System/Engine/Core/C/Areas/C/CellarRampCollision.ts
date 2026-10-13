import { Direction } from '../../../../../../types';

export const handleCellarRampCollision = (
  nextX: number,
  nextY: number,
  direction: Direction,
  dims: { width: number, height: number }
) => {
  let isBlocked = false;
  let wallDesc = "";
  let isRampStep = (direction === 'North' || direction === 'South');
  let isDescending = direction === 'North';

  // Boundary Check
  if (nextX < 0 || nextX > dims.width) {
    isBlocked = true;
    wallDesc = "You bumped into the brass railing of the cellar ramp.";
    isRampStep = false;
  } else if (nextY < 0) {
    // Let Transitions.ts handle going back to Foyer
  } else if (nextY > dims.height) {
    // Let Transitions.ts handle going to Cellar
  }

  return { isBlocked, wallDesc, isRampStep, isDescending };
};

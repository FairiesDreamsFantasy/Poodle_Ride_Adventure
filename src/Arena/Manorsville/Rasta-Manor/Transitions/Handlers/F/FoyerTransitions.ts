import { Direction, GameState } from '../../../../../../System/Engine/Core/Types';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';
import { handleFrontDoorTransition } from './Archways/FrontDoor';
import { handleSouthDoorTransition } from './Archways/SouthDoor';
import { handleWestArchwayTransitions } from './Archways/WestArchways';
import { handleEastArchwayTransitions } from './Archways/EastArchways';
import { handleCellarDoorTransition } from './Archways/CellarDoor';
import { handleSkyRampTransitions } from './Ramps/SkyRamp';
import { handleCellarRampTransitions } from './Ramps/CellarRamp';

export const handleFoyerTransitions = (
  area: string,
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number },
  isAtNorthDoor: boolean,
  isAtSouthDoor: boolean,
  state: GameState
): TransitionResult | null => {
  // 1. Handle Front Porch to Foyer (South Door re-entry)
  if (area === 'FrontPorch' && direction === 'South' && nextY <= 1) {
    if (doorwayStep === 10) {
      return {
        nextArea: 'Foyer' as any,
        nextX: Math.floor((nextX / currentDims.width) * AREA_DIMENSIONS.Foyer.width),
        nextY: AREA_DIMENSIONS.Foyer.height - 10,
        nextLevel: 'Floor',
        nextDoorwayStep: 0,
        msg: "You pass through the north doors into the grand Foyer.",
        isBlocked: false,
        shouldBark: false,
        barkMsg: "", barkCount: 1, isRampStep: false, isDescending: false
      };
    } else {
      return {
        nextArea: 'FrontPorch' as any,
        nextX, nextY: 1, nextLevel: 'Floor',
        nextDoorwayStep: doorwayStep + 1,
        msg: "", isBlocked: false, shouldBark: true, barkMsg: "The Poodle Barks Elegantly",
        barkCount: 1, isRampStep: false, isDescending: false
      };
    }
  }

  // 2. Delegate to archway handlers
  const northRes = handleFrontDoorTransition(direction, isAtNorthDoor, level, nextX, currentDims, doorwayStep);
  if (northRes) return northRes;

  const southRes = handleSouthDoorTransition(direction, isAtSouthDoor, level, nextX, currentDims, doorwayStep);
  if (southRes) return southRes;

  const westRes = handleWestArchwayTransitions(direction, level, nextX, nextY, doorwayStep);
  if (westRes) return westRes;

  const eastRes = handleEastArchwayTransitions(direction, level, currentDims, nextX, nextY, doorwayStep);
  if (eastRes) return eastRes;

  const cellarDoorRes = handleCellarDoorTransition(direction, level, gridY, nextX, nextY);
  if (cellarDoorRes) return cellarDoorRes;

  // 3. Delegate to ramp handlers
  const skyRampRes = handleSkyRampTransitions(direction, level, gridX, gridY, nextX, nextY, doorwayStep, state);
  if (skyRampRes) return skyRampRes;

  const cellarRampRes = handleCellarRampTransitions(direction, level, gridX, gridY, nextX, nextY, doorwayStep, state);
  if (cellarRampRes) return cellarRampRes;

  return null;
};

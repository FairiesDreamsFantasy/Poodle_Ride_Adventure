import { Direction, GameState } from '../../../../../../../System/Engine/Core/Types';
import { TransitionResult } from '../../../../../../../System/Engine/Transitions';
import {
  CELLAR_FLOOR_WARP_Y_MIN,
  CELLAR_FLOOR_WARP_Y_MAX,
  CELLAR_B1_WARP_Y_MIN,
  CELLAR_B1_WARP_Y_MAX,
  CELLAR_TARCIST_WIDTH as TARCIST_WIDTH
} from '../../../../1st_Floor/Foyer/FoyerConstants';

export const handleCellarRampTransitions = (
  direction: Direction,
  level: string,
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  doorwayStep: number,
  state: GameState
 ): TransitionResult | null => {
  // Floor Foyer -> Cellar (Teleport North)
  const isInFloorWarpZone = level === 'Floor' && nextX <= TARCIST_WIDTH && nextY >= CELLAR_FLOOR_WARP_Y_MIN && nextY <= CELLAR_FLOOR_WARP_Y_MAX;
  
  if (direction === 'North' && isInFloorWarpZone) {
    if (doorwayStep === 10) {
      return {
        nextArea: 'Cellar' as any,
        nextX: nextX,
        nextY: 1950, // Land in Cellar (North part)
        nextLevel: 'Cellar',
        nextDoorwayStep: 0,
        msg: state.hasAnnouncedCellarRampUsed ? "" : "You have used the Tarcist teleportation zone to descend to the Cellar.",
        isBlocked: false,
        shouldBark: false,
        barkMsg: "",
        barkCount: 1,
        isRampStep: false,
        isDescending: false
      };
    } else {
      return {
        nextArea: 'Foyer' as any,
        nextX,
        nextY: 1350, // Hold in zone
        nextLevel: 'Cellar',
        nextDoorwayStep: doorwayStep + 1,
        msg: "",
        isBlocked: false,
        shouldBark: true,
        barkMsg: "The Poodle Barks Elegantly",
        barkCount: 1,
        isRampStep: true,
        isDescending: true
      };
    }
  }

  // Cellar -> Floor Foyer (Teleport South)
  const isInCellarWarpZone = level === 'Cellar' && nextX <= TARCIST_WIDTH && nextY >= CELLAR_B1_WARP_Y_MIN && nextY <= CELLAR_B1_WARP_Y_MAX;

  if (direction === 'South' && isInCellarWarpZone) {
    if (doorwayStep === 10) {
      return {
        nextArea: 'Foyer' as any,
        nextX: nextX,
        nextY: 1325, // Land in Floor Foyer
        nextLevel: 'Floor',
        nextDoorwayStep: 0,
        msg: state.hasAnnouncedCellarRampUsed ? "" : "You have used the Tarcist teleportation zone to return to the Floor Foyer.",
        isBlocked: false,
        shouldBark: false,
        barkMsg: "",
        barkCount: 1,
        isRampStep: false,
        isDescending: false
      };
    } else {
      return {
        nextArea: 'Cellar' as any,
        nextX,
        nextY: 1975, // Hold in zone
        nextLevel: 'Cellar',
        nextDoorwayStep: doorwayStep + 1,
        msg: "",
        isBlocked: false,
        shouldBark: true,
        barkMsg: "The Poodle Barks Elegantly",
        barkCount: 1,
        isRampStep: true,
        isDescending: false
      };
    }
  }

  return null;
};

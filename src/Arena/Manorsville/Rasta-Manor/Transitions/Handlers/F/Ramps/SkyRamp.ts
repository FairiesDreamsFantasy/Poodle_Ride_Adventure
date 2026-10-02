import { Direction, GameState } from '../../../../../../../System/Engine/Core/Types';
import { TransitionResult } from '../../../../../../../System/Engine/Transitions';
import { DiagnosticManager } from '../../../../../../../System/Diagnostics/DiagnosticManager';
import {
  FOYER_FLOOR_WARP_Y_MIN,
  FOYER_FLOOR_WARP_Y_MAX,
  FOYER_SKY_WARP_Y_MIN,
  FOYER_SKY_WARP_Y_MAX,
  SKY_TARCIST_WIDTH as TARCIST_WIDTH
} from '../../../../1st_Floor/Foyer/FoyerConstants';

export const handleSkyRampTransitions = (
  direction: Direction,
  level: string,
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  doorwayStep: number,
  state: GameState
): TransitionResult | null => {
  // Floor Foyer -> Sky Foyer (Teleport South)
  const isInFloorWarpZone = level === 'Floor' && nextX <= TARCIST_WIDTH && nextY >= FOYER_FLOOR_WARP_Y_MIN && nextY <= FOYER_FLOOR_WARP_Y_MAX;
  
  if (isInFloorWarpZone && direction === 'South') {
    DiagnosticManager.log(`TARCIST ZONE (Floor): doorwayStep=${doorwayStep}, nextX=${nextX}, nextY=${nextY}`, 'info');
  }

  if (direction === 'South' && isInFloorWarpZone) {
    if (doorwayStep === 10) {
      return {
        nextArea: 'Foyer' as any,
        nextX: nextX,
        nextY: 1325, // Landing on Sky Foyer
        nextLevel: 'Sky',
        nextDoorwayStep: 0,
        msg: state.hasAnnouncedSkyRampUsed ? "" : "You have used the Tarcist teleportation zone to reach the Sky Foyer.",
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
        nextY: 1975, // Hold in zone center
        nextLevel: 'Floor',
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

  // Sky Foyer -> Floor Foyer (Teleport North)
  const isInSkyWarpZone = level === 'Sky' && nextX <= TARCIST_WIDTH && nextY >= FOYER_SKY_WARP_Y_MIN && nextY <= FOYER_SKY_WARP_Y_MAX;

  if (isInSkyWarpZone && direction === 'North') {
    DiagnosticManager.log(`TARCIST ZONE (Sky): doorwayStep=${doorwayStep}, nextX=${nextX}, nextY=${nextY}`, 'info');
  }

  if (direction === 'North' && isInSkyWarpZone) {
    if (doorwayStep === 10) {
      return {
        nextArea: 'Foyer' as any,
        nextX: nextX,
        nextY: 1990, // Landing on Floor Foyer
        nextLevel: 'Floor',
        nextDoorwayStep: 0,
        msg: state.hasAnnouncedSkyRampUsed ? "" : "You have used the Tarcist teleportation zone to return to the Floor Foyer.",
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
        nextY: 1350, // Hold in zone center
        nextLevel: 'Sky',
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

  return null;
};

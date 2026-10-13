import { Direction } from '../../../../../../../System/Engine/Core/Types';
import { AREA_DIMENSIONS } from '../../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../../System/Engine/Transitions';
import {
  PLAYGROUND_WARP_X_MIN_SKY as PLAYGROUND_WARP_X_MIN,
  PLAYGROUND_WARP_Y_LOW_MIN,
  PLAYGROUND_WARP_Y_LOW_MAX,
  PLAYGROUND_WARP_Y_HIGH_MIN,
  PLAYGROUND_WARP_Y_HIGH_MAX
} from '../../../../1st_Floor/Foyer/FoyerConstants';

export const handlePlaygroundRamps = (
  area: string,
  direction: Direction,
  level: string,
  nextX: number,
  nextY: number,
  doorwayStep: number
): TransitionResult | null => {
  const isInLowZone = nextX >= PLAYGROUND_WARP_X_MIN && nextY >= PLAYGROUND_WARP_Y_LOW_MIN && nextY <= PLAYGROUND_WARP_Y_LOW_MAX;
  const isInHighZone = nextX >= PLAYGROUND_WARP_X_MIN && nextY >= PLAYGROUND_WARP_Y_HIGH_MIN && nextY <= PLAYGROUND_WARP_Y_HIGH_MAX;

  // 1. Floor -> Perimeter Walkway (Sky) [Low Zone, North, 10 Barks]
  if (level === 'Floor' && isInLowZone && direction === 'North') {
    if (doorwayStep === 10) {
      return {
        nextArea: 'TheGrandPlayground' as any,
        nextX: 1990,
        nextY: 1370,
        nextLevel: 'Sky',
        nextDoorwayStep: 0,
        msg: "You have used the Tarcist teleportation zone to reach the perimeter walkway.",
        isBlocked: false,
        shouldBark: false,
        barkMsg: "", barkCount: 1, isRampStep: false, isDescending: false
      };
    } else {
      return {
        nextArea: 'TheGrandPlayground' as any,
        nextX, nextY: 1342, nextLevel: 'Floor',
        nextDoorwayStep: doorwayStep + 1,
        msg: "", isBlocked: false, shouldBark: true, barkMsg: "The Poodle Barks Elegantly",
        barkCount: 1, isRampStep: true, isDescending: false
      };
    }
  }

  // 2. Perimeter Walkway (Sky) -> Floor [High Zone, South, 10 Barks]
  if (area === 'TheGrandPlayground' && level === 'Sky' && isInHighZone && direction === 'South') {
    if (doorwayStep === 10) {
      return {
        nextArea: 'TheGrandPlayground' as any,
        nextX: 1990,
        nextY: 1950,
        nextLevel: 'Floor',
        nextDoorwayStep: 0,
        msg: "You have used the Tarcist teleportation zone to return to the playground floor.",
        isBlocked: false,
        shouldBark: false,
        barkMsg: "", barkCount: 1, isRampStep: false, isDescending: false
      };
    } else {
      return {
        nextArea: 'TheGrandPlayground' as any,
        nextX, nextY: 1978, nextLevel: 'Sky',
        nextDoorwayStep: doorwayStep + 1,
        msg: "", isBlocked: false, shouldBark: true, barkMsg: "The Poodle Barks Elegantly",
        barkCount: 1, isRampStep: true, isDescending: true
      };
    }
  }

  // 3. Perimeter Walkway (Sky) -> 2nd Floor [Low Zone, North, 5 Barks]
  if (area === 'TheGrandPlayground' && level === 'Sky' && isInLowZone && direction === 'North') {
    if (doorwayStep === 5) {
      return {
        nextArea: 'RastaManor2ndFloor' as any,
        nextX: 4000,
        nextY: 10,
        nextLevel: 'Floor',
        nextDoorwayStep: 0,
        msg: "You have used the Tarcist teleportation zone to reach the Rasta Manor Second Floor.",
        isBlocked: false,
        shouldBark: false,
        barkMsg: "", barkCount: 1, isRampStep: false, isDescending: false
      };
    } else {
      return {
        nextArea: 'TheGrandPlayground' as any,
        nextX, nextY: 1342, nextLevel: 'Sky',
        nextDoorwayStep: doorwayStep + 1,
        msg: "", isBlocked: false, shouldBark: true, barkMsg: "The Poodle Barks Elegantly",
        barkCount: 1, isRampStep: true, isDescending: false
      };
    }
  }

  // 4. 2nd Floor -> Perimeter Walkway (Sky) [High Zone, South, 4 Barks]
  if (area === 'RastaManor2ndFloor' && direction === 'South' && nextY <= 1) {
    if (doorwayStep === 4) {
      return {
        nextArea: 'TheGrandPlayground' as any,
        nextX: 1990,
        nextY: 1950,
        nextLevel: 'Sky',
        nextDoorwayStep: 0,
        msg: "You return to the Grand Playground's perimeter walkway via the Tarcist teleportation zone.",
        isBlocked: false,
        shouldBark: false,
        barkMsg: "", barkCount: 1, isRampStep: false, isDescending: false
      };
    } else {
      return {
        nextArea: 'RastaManor2ndFloor' as any,
        nextX, nextY: 1, nextLevel: 'Floor',
        nextDoorwayStep: doorwayStep + 1,
        msg: "", isBlocked: false, shouldBark: true, barkMsg: "The Poodle Barks Elegantly",
        barkCount: 1, isRampStep: true, isDescending: true
      };
    }
  }

  return null;
};

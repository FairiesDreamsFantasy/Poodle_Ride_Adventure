import { Direction } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { AREA_DIMENSIONS } from '../../../../../../System/Engine/Core/Constants';
import { TransitionResult } from '../../../../../../System/Engine/Transitions';
import { handlePlaygroundEastArchways } from './Archways/EastArchways';
import { handlePlaygroundRamps } from './Ramps/PlaygroundRamps';

export const handleGrandPlaygroundTransitions = (
  area: string,
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  direction: Direction,
  doorwayStep: number,
  currentDims: { width: number, height: number }
): TransitionResult | null => {
  // 1. Delegate to archway handlers
  const eastRes = handlePlaygroundEastArchways(direction, level, currentDims, nextX, nextY, doorwayStep);
  if (eastRes) return eastRes;

  // 2. Delegate to ramp handlers
  const rampRes = handlePlaygroundRamps(area, direction, level, nextX, nextY, doorwayStep);
  if (rampRes) return rampRes;

  // West transition to Communal Store (at y=990 to 1010)
  if (direction === 'West' && nextX <= 5 && nextY >= 990 && nextY <= 1010) {
    if (doorwayStep === 6) {
      return {
        nextArea: 'CommunalStore' as any,
        nextX: AREA_DIMENSIONS.CommunalStore.width - 20,
        nextY: nextY,
        nextLevel: 'Floor',
        nextDoorwayStep: 0,
        msg: "The automatic glass sliding doors glide apart beautifully, letting you enter the Communal Store.",
        isBlocked: false,
        shouldBark: false,
        barkMsg: "", barkCount: 1, isRampStep: false, isDescending: false
      };
    } else {
      return {
        nextArea: 'TheGrandPlayground' as any,
        nextX: 5,
        nextY,
        nextLevel: level as any,
        nextDoorwayStep: doorwayStep + 1,
        msg: "",
        isBlocked: false,
        shouldBark: true,
        barkMsg: "The Poodle Barks Elegantly",
        barkCount: 1,
        isRampStep: false,
        isDescending: false
      };
    }
  }

  // 3. Other transitions (South to Arcade)
  if (direction === 'South' && nextY <= 1 && ((nextX >= 1 && nextX <= 10) || (nextX >= 1990 && nextX <= 2000))) {
    return {
      nextArea: 'WestGrandArcade' as any,
      nextX: nextX,
      nextY: AREA_DIMENSIONS.WestGrandArcade.height - 10,
      nextLevel: 'Floor',
      nextDoorwayStep: 0,
      msg: "You enter the West Grand Arcade.",
      isBlocked: false,
      shouldBark: false,
      barkMsg: "", barkCount: 1, isRampStep: false, isDescending: false
    };
  }

  return null;
};

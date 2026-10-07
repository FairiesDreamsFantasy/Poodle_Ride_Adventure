import { Direction } from '../../../../../../../types';
import { GameState } from '../../../../../../../System/Engine/Core/Types';
import { AREA_DIMENSIONS } from '../../../../../../../System/Engine/Core/Constants';
import { isNorthward, isSouthward } from '../../../../../../../System/Engine/Core/Utils/Direction';

export interface TransitionResult {
  nextArea: string;
  nextX: number;
  nextY: number;
  msg: string;
  isBlocked: boolean;
}

export const handleMariaTransitions = (
  area: string,
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  direction: Direction,
  state: GameState
): TransitionResult | null => {
  const currentDims = AREA_DIMENSIONS[area] || { width: 1000, height: 1000 };

  // Maria's Warp Castle
  if (area === 'MariasWarpCastle') {
    // North Wall: Allison's Manor Warp (20x20 floor level picture)
    // 1000ft wide castle, centered at 500. Picture is 20ft wide (490-510)
    if (isNorthward(direction) && nextY >= currentDims.height - 5) {
      if (nextX >= 490 && nextX <= 510) {
        return {
          nextArea: 'AllisonsDecisionZone',
          nextX: 50, // Centered in 100x100
          nextY: 10,
          msg: "TARSIS EFFECT: You ride through the picture of Allison's Manor into a decision zone.",
          isBlocked: false
        };
      }
    }
  }

  // Allison's Decision Zone
  if (area === 'AllisonsDecisionZone') {
    // South: Return to Warp Castle Rug
    if (isSouthward(direction) && nextY <= 1) {
      return {
        nextArea: 'MariasWarpCastle',
        nextX: 500, // Landing on center rug
        nextY: 500,
        msg: "You return to Maria's Warp Castle.",
        isBlocked: false
      };
    }

    // North: Approach gate (5ft proximity logic)
    if (isNorthward(direction) && nextY >= currentDims.height - 5) {
      return {
        nextArea: 'AllisonsPorch', // Starting the level
        nextX: 500,
        nextY: 10,
        msg: "The honeycomb gate opens as you approach. You enter Allison's Manor grounds.",
        isBlocked: false
      };
    }
  }

  return null;
};

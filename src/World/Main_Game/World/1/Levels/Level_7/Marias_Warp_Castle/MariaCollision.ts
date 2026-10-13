import { CollisionResult } from '../../../../../../../System/Engine/Core/C/Collision';
import { GameState } from '../../../../../../../System/Engine/Core/Types';
import { AREA_DIMENSIONS } from '../../../../../../../System/Engine/Core/Constants';

export function handleMariaCollision(
  area: string,
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  direction: string,
  state: GameState
): CollisionResult {
  const dims = AREA_DIMENSIONS[area] || { width: 1000, height: 1000 };
  let isBlocked = false;
  let wallDesc = "";

  if (area === 'MariasWarpCastle') {
    if (nextY >= dims.height) {
      if (nextX < 490 || nextX > 510) {
        isBlocked = true;
        wallDesc = "The North wall of Maria's Warp Castle displays a large picture of Allison's Manor.";
      }
    } else if (nextY <= 0) {
      isBlocked = true;
      wallDesc = "The South wall of Maria's Warp Castle is strong and regal.";
    } else if (nextX <= 0 || nextX >= dims.width) {
      isBlocked = true;
      wallDesc = "The massive walls of the warp castle surround you.";
    }
  }

  if (area === 'AllisonsDecisionZone') {
    if (nextY >= dims.height) {
      // Proximity logic for gate (handled in transitions usually, but can block here if not approaching)
      // msg = "Once pass the gate... logic: open as I approach it by 5 feet from the gate itself."
    } else if (nextY <= 0) {
      // Portal back South
    } else if (nextX <= 0 || nextX >= dims.width) {
      isBlocked = true;
      wallDesc = "A white picket fence encloses the decision zone. Lush trees and bushes grow behind it.";
    }
  }

  return { 
    isBlocked, 
    wallDesc,
    nextArea: area,
    nextLevel: state.level,
    nextDoorwayStep: 0,
    msg: "",
    isRampStep: false,
    isDescending: false,
    shouldBark: false,
    barkMsg: "",
    nextX,
    nextY
  };
}

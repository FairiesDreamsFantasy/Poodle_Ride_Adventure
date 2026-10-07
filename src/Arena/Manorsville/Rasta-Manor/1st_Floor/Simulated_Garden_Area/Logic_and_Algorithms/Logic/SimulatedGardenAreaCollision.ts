import { AREA_DIMENSIONS } from '../../../../../../../System/Engine/Core/Constants';

export function handleSimulatedGardenAreaCollision(
  nextX: number,
  nextY: number,
  isDoorOpen: boolean
): { isBlocked: boolean; wallDesc: string; msg: string } {
  let isBlocked = false;
  let wallDesc = "";
  let msg = "";

  const width = AREA_DIMENSIONS.SimulatedGardenArea.width;
  const height = AREA_DIMENSIONS.SimulatedGardenArea.height;

  // Boundaries for all levels
  if (nextX < 0) {
    // West wall: 100 circular windows
    isBlocked = true;
    wallDesc = "The west wall features 100 circular windows, each 10 feet in diameter and positioned 9 feet high. They have elegant brass trim and overlook the dining room.";
  } else if (nextX > width) {
    // East wall
    isBlocked = true;
    wallDesc = "A glossy blue wall with a finish that shines in the artificial light.";
  } else if (nextY > height) {
    // North wall transitions to Rugged Play Field
    const isAtNorthArchway = nextX >= 990 && nextX <= 1010;
    if (!isAtNorthArchway) {
      isBlocked = true;
      wallDesc = "A pink horizon painted onto the wall, decorated with white roses, pink roses, daisies, sunflowers, and berry bushes. Through the horizontal pink and white striped archway at the center, you can see the Rugged Play Field.";
    } else {
      msg = "A wide doorway 20 feet wide leads North back to the Rugged Play Field.";
    }
  } else if (nextY < 0) {
    // South wall transitions to Meditation Hall via Sliding Doors
    const isAtSouthArchway = nextX >= 990 && nextX <= 1010;
    if (isAtSouthArchway) {
      if (!isDoorOpen) {
        isBlocked = true;
        wallDesc = "The 20-foot wide sliding door to the Meditation Hall is currently closed.";
      } else {
        msg = "The sliding door is open, leading South to the Meditation Hall.";
      }
    } else {
      isBlocked = true;
      wallDesc = "The South wall features 990-foot segments of solid wood on either side of the 20-foot wide archway. The wall is painted with a beautiful garden scene. An archway at the center leads South back to the Meditation Hall.";
    }
  }

  return { isBlocked, wallDesc, msg };
}

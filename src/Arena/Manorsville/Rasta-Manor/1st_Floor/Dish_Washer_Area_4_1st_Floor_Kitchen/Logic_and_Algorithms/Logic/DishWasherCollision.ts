import { AREA_DIMENSIONS } from "../../../../../../../System/Engine/Core/Constants";
import { DISHWASHER_DESCRIPTIONS } from "../../../../../../../Description_List/D/DishWasher";

export function handleDishWasherCollision(nextX: number, nextY: number) {
  let isBlocked = false;
  let wallDesc = "";
  const width = AREA_DIMENSIONS.DishWasherArea.width;
  const height = AREA_DIMENSIONS.DishWasherArea.height;

  // Machine Collisions
  const isMachines = nextY >= 900;
  const isSinks = nextY <= 120;

  if (isMachines) {
    isBlocked = true;
    wallDesc = DISHWASHER_DESCRIPTIONS.EQUIPMENT;
  } else if (isSinks) {
    isBlocked = true;
    wallDesc = "Large commercial sinks for pre-rinsing dishes.";
  }

  // Boundaries
  if (nextX < 0) {
    // Transition back to Kitchen
    wallDesc = "A door leads West back to the Kitchen.";
  } else if (nextX > width) {
    isBlocked = true;
    wallDesc = "The East wall of the Dishwasher Room.";
  } else if (nextY > height) {
    isBlocked = true;
    wallDesc = "The North wall has insulated pipes connected to each dishwasher, featuring a red valve labeled 'Hot water supply On/Off'.";
  } else if (nextY < 0) {
    isBlocked = true;
    wallDesc = "The South wall of the Dishwasher Room.";
  }

  return { isBlocked, wallDesc };
}

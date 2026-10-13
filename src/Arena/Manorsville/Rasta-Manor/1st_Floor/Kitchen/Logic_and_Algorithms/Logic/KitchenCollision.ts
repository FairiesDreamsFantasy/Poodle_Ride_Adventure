import { AREA_DIMENSIONS } from "../../../../../../../System/Engine/Core/Constants";
import { KITCHEN_DESCRIPTIONS } from "../../../../../../../Description_List/K/Kitchen";

export function handleKitchenCollision(nextX: number, nextY: number) {
  let isBlocked = false;
  let wallDesc = "";
  const width = AREA_DIMENSIONS.Kitchen.width;
  const height = AREA_DIMENSIONS.Kitchen.height;

  // Equipment Collisions
  const isOvens = nextX >= 100 && nextX <= 200 && nextY >= 850;
  const isRange = nextX >= 400 && nextX <= 600 && nextY >= 900;
  const isSinks = nextX >= 700 && nextX <= 850 && nextY >= 920;
  const isFreezer = nextX >= 50 && nextX <= 130 && nextY >= 800;
  const isCarts = nextX >= 300 && nextX <= 360 && nextY <= 100;

  // Staff and Cooks Collisions
  const isNearCook = (nextX >= 100 && nextX <= 650) && (nextY >= 410 && nextY <= 480);
  const isNearStaff = ((nextX >= 700 && nextX <= 900) && (nextY >= 400 && nextY <= 450)) || 
                      ((nextX >= 50 && nextX <= 200) && (nextY >= 450 && nextY <= 470)) || 
                      ((nextX >= 300 && nextX <= 400) && (nextY >= 120 && nextY <= 150)) || 
                      ((nextX >= 100 && nextX <= 950) && (nextY >= 80 && nextY <= 250));

  if (isOvens || isRange || isSinks) {
    isBlocked = true;
    wallDesc = KITCHEN_DESCRIPTIONS.EQUIPMENT;
  } else if (isFreezer) {
    isBlocked = true;
    wallDesc = "A large walk-in freezer is located in the corner.";
  } else if (isCarts) {
    isBlocked = true;
    wallDesc = "Food carts are ready for transporting meals.";
  } else if (isNearCook) {
    isBlocked = true;
    wallDesc = "A Rastafarian cook in a vintage white dress and indigo apron is busy preparing food. Her attire is modest and professional, strictly Babylon-Free.";
  } else if (isNearStaff) {
    isBlocked = true;
    wallDesc = "A kitchen staff member is hard at work, maintaining the high standards of Rasta-Manor.";
  }

  // Boundaries
  if (nextX < 0) {
    isBlocked = true;
    wallDesc = "The West wall of the kitchen.";
  } else if (nextX > width) {
    // Transition to Dishwasher Area handled in Transitions
    wallDesc = "A door leads East to the Dishwasher Room.";
  } else if (nextY > height) {
    isBlocked = true;
    wallDesc = "The North wall of the kitchen.";
  } else if (nextY < 0) {
    // Transition to Back Porch handled in Transitions
    wallDesc = "A door leads South to the Back Porch.";
  }

  return { isBlocked, wallDesc };
}

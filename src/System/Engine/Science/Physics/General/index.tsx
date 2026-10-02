import { handleWesternWarpRoomCollision } from '../../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Western_Specific_Warp_Station/WesternWarpRoomCollision';
import { handleGardenWarpRoomCollision } from '../../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Garden_Specific_Warp_Room/GardenWarpRoomCollision';
import { handleSoutheastCoastWarpRoomCollision } from '../../../../../World/Main_Game/World/1/Levels/Level_7/Courses/Allisons_Manor/Manor/1st_Floor/Southeast_Coast_Warp_Room/SoutheastCoastWarpRoomCollision';
import { handleGardenCollision } from '../../../../AI/In-Game/Logic/Garden/GardenCollision';

export { handleGardenCollision };

export const ENGINE_PHYSICS_GENERAL = true;

export function handleWarpRoomCollision(area: string, nextX: number, nextY: number, state: any): any {
  const currentDims = { width: 1000, height: 700 }; // fallback dimensions
  if (area === 'WesternWarpRoom') {
    return handleWesternWarpRoomCollision(nextX, nextY, currentDims);
  }
  if (area === 'GardenWarpRoom') {
    return handleGardenWarpRoomCollision(nextX, nextY, currentDims);
  }
  if (area === 'SoutheastCoastWarpRoom') {
    return handleSoutheastCoastWarpRoomCollision(nextX, nextY, currentDims);
  }
  return null;
}

export function handlePorchCollision(area: string, nextX: number, nextY: number, currentDims?: {width: number, height: number}): any {
  let isBlocked = false;
  let wallDesc = "";

  if (nextX <= 1) {
    isBlocked = true;
    wallDesc = "The Western railing of the porch blocks your path.";
  } else if (nextX >= (currentDims ? currentDims.width - 1 : 999)) {
    isBlocked = true;
    wallDesc = "The Eastern railing of the porch blocks your path.";
  }

  if (nextY <= 1) {
    isBlocked = true;
    wallDesc = "The Southern edge of the porch blocks your path.";
  } else if (nextY >= (currentDims ? currentDims.height - 1 : 149)) {
    isBlocked = false;
  }

  return { isBlocked, wallDesc };
}

export function handleCommunalSpaceCollision(area: string, nextX: number, nextY: number, level: string): any {
  let isBlocked = false;
  let wallDesc = "";

  if (nextX <= 1) {
    isBlocked = true;
    wallDesc = "The solid mahogany West wall of the communal space.";
  } else if (nextX >= 799) {
    isBlocked = true;
    wallDesc = "The glass-paneled East wall of the communal space.";
  }

  if (nextY <= 1) {
    isBlocked = true;
    wallDesc = "The South wall of the communal space decorated with portraits.";
  } else if (nextY >= 599) {
    isBlocked = true;
    wallDesc = "The North wall of the communal space with a decorative fireplace.";
  }

  return { isBlocked, wallDesc };
}

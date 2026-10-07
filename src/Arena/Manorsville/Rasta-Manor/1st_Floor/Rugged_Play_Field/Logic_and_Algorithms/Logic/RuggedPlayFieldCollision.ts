import { Direction } from '../../../../../../../types';
import { GameState } from '../../../../../../../System/AI/In-Game/Logic/GameLogic';
import { AREA_DIMENSIONS } from '../../../../../../../System/Engine/Core/Constants';
import { RUGGED_PLAY_FIELD_DESCRIPTIONS } from '../../../../../../../Description_List/R/RuggedPlayField';

export function handleRuggedPlayFieldCollision(
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  animalName: string
): { isBlocked: boolean; wallDesc: string; msg: string; nextArea?: GameState['area']; nextX_out?: number; nextY_out?: number; nextDirection?: Direction } {
  let isBlocked = false;
  let wallDesc = "";
  let msg = "";
  let nextArea: GameState['area'] | undefined;
  let nextX_out: number | undefined;
  let nextY_out: number | undefined;
  let nextDirection: Direction | undefined;
  
  const width = AREA_DIMENSIONS.RuggedPlayField.width;
  const height = AREA_DIMENSIONS.RuggedPlayField.height;

  // Clamped coordinates
  const clampedX = Math.max(0, Math.min(width, nextX));
  const clampedY = Math.max(0, Math.min(height, nextY));

  // Doorways (Center at 1000, 20 feet wide; Side archways at y990-1010)
  const isAtNorthDoor = clampedX >= 990 && clampedX <= 1010;
  const isAtSouthDoor = clampedX >= 990 && clampedX <= 1010;
  const isAtWestArch = clampedY >= 990 && clampedY <= 1010;
  const isAtEastArch = clampedY >= 990 && clampedY <= 1010;

  // Boundary Checks
  if (clampedY >= height - 0.1 && !isAtNorthDoor) {
    isBlocked = true;
    wallDesc = "The North wall features a massive 2000-foot surface with a green and gold striped archway in the center leading back to the Foyer.";
  } else if (clampedY <= 0.1 && !isAtSouthDoor) {
    isBlocked = true;
    wallDesc = "The South wall features 990-foot segments of wood on either side of the 20-foot wide doorway leading to the Simulated Garden Area.";
  } else if (clampedX <= 0.1) {
    if (isAtWestArch) {
      wallDesc = "Ahead is the West Grand Arcade archway with a sliding glass door.";
    } else {
      isBlocked = true;
      wallDesc = "The West wall is covered in ceramic tiles with forest floor accents and a few patches of dark green ivy.";
    }
  } else if (clampedX >= width - 0.1) {
    if (isAtEastArch) {
      wallDesc = "Ahead is the East Grand Arcade archway with a sliding glass door.";
    } else {
      isBlocked = true;
      wallDesc = "The East wall is covered in ceramic tiles with forest floor accents and a few patches of dark green ivy.";
    }
  }

  // Rounded Rug at Center (1000, 1000)
  const rugX = 1000;
  const rugY = 1000;
  const rugRadius = 300;
  const distToRug = Math.sqrt(Math.pow(nextX - rugX, 2) + Math.pow(nextY - rugY, 2));
  const prevDistToRug = Math.sqrt(Math.pow(gridX - rugX, 2) + Math.pow(gridY - rugY, 2));
  
  if (distToRug <= rugRadius && prevDistToRug > rugRadius) {
    msg = RUGGED_PLAY_FIELD_DESCRIPTIONS.RUG.replace("Abigay", animalName);
  }

  return { isBlocked, wallDesc, msg, nextArea, nextX_out, nextY_out, nextDirection };
}

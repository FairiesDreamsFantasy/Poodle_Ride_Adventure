import { ANIMAL_RIDE_OBSTACLES } from '../../../O/Obstacles';

export const handleAnimalRideMeditationRoomCollision = (
  nextX: number,
  nextY: number,
  dims: { width: number, height: number }
) => {
  let isBlocked = false;
  let wallDesc = "";

  // Check obstacles
  ANIMAL_RIDE_OBSTACLES.forEach(obs => {
    if (nextX >= obs.xMin && nextX <= obs.xMax && nextY >= obs.yMin && nextY <= obs.yMax) {
      isBlocked = true;
      wallDesc = obs.description;
    }
  });

  // Boundary check
  if (nextX < 0 || nextX > dims.width || nextY < 0 || nextY > dims.height) {
    isBlocked = true;
    if (nextY >= dims.height) wallDesc = "You have reached the North wall. Natural light filters in from the roof.";
    else if (nextY <= 1) wallDesc = "You have reached the South wall.";
    else if (nextX >= dims.width) wallDesc = "You have reached the East wall. The door back to the Meditation Hall is here.";
    else if (nextX <= 1) wallDesc = "You have reached the West wall.";
  }

  return { isBlocked, wallDesc };
};

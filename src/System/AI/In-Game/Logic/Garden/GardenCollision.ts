import { GARDEN_OBSTACLES } from '../../../../Engine/Core/O/Obstacles';

export const handleGardenCollision = (
  nextX: number,
  nextY: number,
  dims: { width: number, height: number },
  doorMin: number,
  doorMax: number
) => {
  let isBlocked = false;
  let wallDesc = "";

  GARDEN_OBSTACLES.forEach(obs => {
    if (nextX >= obs.xMin && nextX <= obs.xMax && nextY >= obs.yMin && nextY <= obs.yMax) {
      isBlocked = true;
      wallDesc = obs.description;
    }
  });

  // Boundary Check
  if (nextX < 1 || nextX > dims.width || nextY < 1 || nextY > dims.height) {
    isBlocked = true;
  }

  if (isBlocked && wallDesc === "") {
    if (nextX <= 1) wallDesc = "You have reached the West garden wall. A 4-foot fence lines the perimeter.";
    else if (nextX >= dims.width) wallDesc = "You have reached the East garden wall. A 4-foot fence lines the perimeter.";
    else if (nextY >= dims.height) {
      if (nextX >= doorMin && nextX <= doorMax) wallDesc = "The rainbow glass doors lead back inside the house.";
      else wallDesc = "You have reached the North garden wall, the exterior of the house.";
    } else if (nextY <= 1) wallDesc = "A 40-foot barrier overlooking the railway tracks blocks your path.";
  }

  return { isBlocked, wallDesc };
};

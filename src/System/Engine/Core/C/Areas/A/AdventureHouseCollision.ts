export const handleAdventureHouseCollision = (
  area: string,
  nextX: number,
  nextY: number,
  dims: { width: number, height: number },
  doorMin: number,
  doorMax: number
) => {
  let isBlocked = false;
  let wallDesc = "";

  // Basic boundaries for Adventure House rooms
  if (nextX < 0 || nextX > dims.width || nextY < 0 || nextY > dims.height) {
    isBlocked = true;
    if (nextY >= dims.height) {
      if (nextX >= doorMin && nextX <= doorMax) {
        isBlocked = false; // Allow North door transition
      } else {
        wallDesc = "The North wall is made of solid wood with vertical indigo stripes.";
      }
    } else if (nextY <= 1) {
      if (nextX >= doorMin && nextX <= doorMax) {
        isBlocked = false; // Allow South door transition
      } else {
        wallDesc = "The South wall features artistic carvings of rabbits and flowers.";
      }
    } else if (nextX <= 1) {
      wallDesc = "The West wall is white with colorful circular LED lights.";
    } else if (nextX >= dims.width) {
      wallDesc = "The East wall is white with colorful circular LED lights.";
    }
  }

  return { isBlocked, wallDesc };
};

export const handleExteriorCollision = (
  area: string,
  nextX: number,
  nextY: number,
  dims: { width: number, height: number },
  doorMin: number,
  doorMax: number
) => {
  let isBlocked = false;
  let wallDesc = "";

  if (nextX < 0 || nextX > dims.width || nextY < 0 || nextY > dims.height) {
    isBlocked = true;
    
    if (area === 'FrontPorch') {
      if (nextY >= dims.height && nextX >= doorMin && nextX <= doorMax) {
        isBlocked = false; // To Foyer
      } else if (nextY <= 0) {
        isBlocked = false; // To Sidewalk
      }
    } else if (area === 'BackPorch') {
      if (nextY <= 0 && nextX >= doorMin && nextX <= doorMax) {
        isBlocked = false; // To Garden
      }
    } else if (area === 'Sidewalk' || area === 'Street') {
      isBlocked = false; // Wide open spaces with transitions handled elsewhere
    }

    if (isBlocked && wallDesc === "") {
      if (nextY >= dims.height) wallDesc = "You have reached the North boundary of the porch.";
      else if (nextY <= 0) wallDesc = "You have reached the South boundary of the porch.";
      else if (nextX >= dims.width) wallDesc = "You have reached the East boundary of the porch.";
      else if (nextX <= 0) wallDesc = "You have reached the West boundary of the porch.";
    }
  }

  return { isBlocked, wallDesc };
};

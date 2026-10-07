export const handleWestGrandArcadeCollision = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: string,
  dims: { width: number, height: number }
) => {
  let isBlocked = false;
  let wallDesc = "";

  // Transition boundaries
  if (nextX < 0 || nextX > dims.width || nextY < 0 || nextY > dims.height) {
    const isAtNorthDoor = nextY >= dims.height && nextX >= 1980 && nextX <= 2000;
    const isAtNorthPlayground = nextY >= dims.height && nextX >= 0 && nextX <= 10;
    const isAtSouthDoor = nextY <= 0 && nextX >= 1980 && nextX <= 2000;
    const isAtEastDoor = nextX >= dims.width && nextY >= 990 && nextY <= 1010;

    if (isAtNorthDoor || isAtNorthPlayground || isAtSouthDoor || isAtEastDoor) {
      isBlocked = false;
    } else {
      isBlocked = true;
      if (nextY >= dims.height) wallDesc = "The North wall is solid, except for the archway to the grand indoor playground at the east end and a small opening at the west end.";
      else if (nextY <= 0) wallDesc = "The South wall is solid, except for the archway to the gym at the east end.";
      else if (nextX >= dims.width) wallDesc = "The East wall is solid, with an archway to the rugged play field in the center.";
      else if (nextX <= 0) wallDesc = "The West wall is a solid, elegantly finished surface.";
    }
  }

  // Example: A small ramp or obstacle in the center
  const isOnRamp = nextX >= dims.width / 2 - 50 && nextX <= dims.width / 2 + 50;
  
  return { 
    isBlocked, 
    wallDesc,
    isRampStep: isOnRamp,
    isDescending: false 
  };
};

import { CELLAR_DESCRIPTIONS } from '../../../../../../../Description_List/C/Cellar';

export const handleCellarCollision = (
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  dims: { width: number, height: number }
) => {
  let isBlocked = false;
  let wallDesc = "";
  let msg = "";

  // Landing Square check (Indigo checked pattern)
  // Entry from ramp is at the north-west corner.
  const isAtLanding = nextX <= 20 && nextY >= 1980;
  
  if (isAtLanding) {
    msg = CELLAR_DESCRIPTIONS.RAMP;
  }

  // Boiler Room Door (B2 at B1 level visually)
  // Positioned at X: 3-17, Y: 1000
  const isAtBoilerDoor = nextY >= 995 && nextY <= 1005 && nextX >= 3 && nextX <= 17;
  if (isAtBoilerDoor) {
    isBlocked = true;
    wallDesc = "A locked roll-up gate made of steel and brass. A sign on the right says 'Boiler Room' in yellow text on a black background, with a picture of a boiler. This area is restricted to employees.";
  }

  // Southwest Enclosure (X 0-20, Y 0-1000)
  const inSWEnclosure = nextX <= 20 && nextY <= 1000;
  if (inSWEnclosure && !isAtBoilerDoor) {
    // Check if hitting the north wall of this enclosure (where the door is)
    if (nextY >= 995 && gridY < 995) {
        isBlocked = true;
        wallDesc = "You've reached the northern wall of the southwest machinery area. The boiler room door is centered here.";
    }
  }

  // Boundary Check
  if (nextX < 0 || nextX > dims.width || nextY < 0 || nextY > dims.height) {
    isBlocked = true;
    if (nextX <= 0) {
      if (isAtLanding) {
        // Let Transitions.ts handle going back to CellarRamp
        isBlocked = false;
      } else {
        wallDesc = "You have reached the West wall of the cellar.";
      }
    }
    else if (nextY >= dims.height) wallDesc = "You have reached the North wall of the cellar.";
    else if (nextY <= 0) wallDesc = "You have reached the South wall of the cellar.";
    else if (nextX >= dims.width) wallDesc = "You have reached the East wall of the cellar.";
  }

  return { isBlocked, wallDesc, msg };
};

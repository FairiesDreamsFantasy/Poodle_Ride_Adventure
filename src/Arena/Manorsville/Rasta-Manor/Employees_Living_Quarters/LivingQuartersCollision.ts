import { GameState } from '../../../../System/AI/In-Game/Logic/GameLogic';

export function handleLivingQuartersCollision(
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar',
  state: GameState
): { isBlocked: boolean; wallDesc: string; msg: string } {
  let isBlocked = false;
  let wallDesc = "";
  let msg = "";

  const width = 2000;
  const height = 1000;

  // Boundary Checks
  if (nextX < 0 || nextX > width || nextY < 0 || nextY > height) {
    const isAtWestDoor = nextX <= 0 && nextY >= 490 && nextY <= 510;
    const isAtEastDoor = nextX >= width && nextY >= 495 && nextY <= 505;

    if (isAtWestDoor || isAtEastDoor) {
      const animal = state.ridingAnimal;
      const isRiding = animal && animal !== "";
      
      if (!isRiding) {
        // Human is on foot, can walk through 8-foot doors easily
        isBlocked = false;
      } else {
        // Detailed Poodle Height / Alignment Algorithm
        // - Height at her head: 7.25 feet (e.g. Legacy Poodle)
        // - Either 5 feet at her shoulder or shorter (including some stocky builds).
        // - Head perched forward (Optimal for poodles with a shoulder height of 5 feet at their shoulders)
        // - For poodles with upright heads perched on top of their necks (only 7.25 feet tall, with/without tiara), can go through; and adjust head when a rider leans forward.
        // - If a poodle doesn't have a set implementation to adjust her head as a rider leans forward, or if a poodle is 8 feet tall or taller(with/without tiara); can't go through this door
        // - If a poodle can adjust her head as a rider leans forward, and her head height is 8 feet tall (width/without tiara), can go through
        
        const isLegacy = (animal === "Legacy Poodle" || animal === "legacy");
        const hasAdjustment = isLegacy; // Only the legacy poodle has the built-in implementation to lower/adjust her head
        
        let headHeight = 10.0; // Default for Abigay
        if (animal === 'Anninne-Amelia Rose Julisus') {
          headHeight = 10.5;
        } else if (animal === 'Dymond Daisy Qin-Reynolds') {
          headHeight = 8.5;
        } else if (animal === 'Abigail Marigold Kenyatta') {
          headHeight = 8.0;
        } else if (isLegacy) {
          headHeight = 7.25;
        }

        if (!hasAdjustment) {
          isBlocked = true;
          wallDesc = `The 8-foot doorway is too low. You are riding ${animal}, which keeps her majestic head perched locked and upright at ${headHeight} feet as an intentional form of art. Because she does not adjust her head when you lean forward, she cannot pass.`;
        } else {
          if (state.isLeaning) {
            if (headHeight <= 8.0) {
              isBlocked = false;
              msg = `Your legacy poodle lowers her head as you lean forward, and you pass under the 8-foot doorway.`;
            } else {
              isBlocked = true;
              wallDesc = `Even with head adjustment, your massive legacy poodle at ${headHeight} feet cannot squeeze through this 8-foot doorway.`;
            }
          } else {
            isBlocked = true;
            wallDesc = `The door frame is 8 feet tall. Although your legacy poodle is 7.25 feet tall, you must lean forward (duck) to guide her majestic head through safely.`;
          }
        }
      }
    } else {
      isBlocked = true;
      if (nextY >= height) {
        wallDesc = "This is the North wall of the Employees' Living Quarters, lined with tall elegant windows showing the sky and gardens.";
      } else if (nextY <= 0) {
        wallDesc = "This is the solid South wall of the Employees' Living Quarters, painted in subtle green, yellow, and red brick designs.";
      } else if (nextX <= 0) {
        wallDesc = "The West wall is finished in solid mahogany, connecting to the Grand Ballroom.";
      } else if (nextX >= width) {
        wallDesc = "The East wall has large floor-to-ceiling windows to enjoy the morning sunrise.";
      }
    }
    return { isBlocked, wallDesc, msg };
  }

  // Internal Walls Collision
  // Hallway Corridor is y = 450 to 550
  // Wall separating North rooms (y = 550 to 560), except door openings at x=380-420, x=930-970, x=1330-1370, and Foyer foyer zone x>=1600
  if (nextY >= 550 && nextY <= 560) {
    const isOpening = (nextX >= 380 && nextX <= 420) || (nextX >= 930 && nextX <= 970) || (nextX >= 1330 && nextX <= 1370) || (nextX >= 1590);
    if (!isOpening) {
      isBlocked = true;
      wallDesc = "You bump into the mahogany wood wall paneling flanking the quiet corridor rooms.";
    }
  }

  // Wall separating South rooms (y = 440 to 450), except door openings at x=380-420, x=930-970, x=1330-1370, and Foyer foyer zone x>=1600
  if (nextY >= 440 && nextY <= 450) {
    const isOpening = (nextX >= 380 && nextX <= 420) || (nextX >= 930 && nextX <= 970) || (nextX >= 1330 && nextX <= 1370) || (nextX >= 1590);
    if (!isOpening) {
      isBlocked = true;
      wallDesc = "You bump into the mahogany wood wall paneling separating the hallway from the south living chambers.";
    }
  }

  // Vertical dividing walls between private rooms
  // Wall x = 700 to 710 in both North and South halves
  if (nextX >= 700 && nextX <= 710) {
    const inNorthernRoom = nextY > 560;
    const inSouthernRoom = nextY < 440;
    if (inNorthernRoom || inSouthernRoom) {
      isBlocked = true;
      wallDesc = "The interior partition wall blocks you.";
    }
  }

  // Wall x = 1100 to 1110 in both North and South halves
  if (nextX >= 1100 && nextX <= 1110) {
    const inNorthernRoom = nextY > 560;
    const inSouthernRoom = nextY < 440;
    if (inNorthernRoom || inSouthernRoom) {
      isBlocked = true;
      wallDesc = "The interior partition wall blocks you.";
    }
  }

  // Wall x = 1500 to 1510 in both North and South halves
  if (nextX >= 1500 && nextX <= 1510) {
    const inNorthernRoom = nextY > 560;
    const inSouthernRoom = nextY < 440;
    if (inNorthernRoom || inSouthernRoom) {
      isBlocked = true;
      wallDesc = "The wood partition wall blocks you.";
    }
  }

  return { isBlocked, wallDesc, msg };
}

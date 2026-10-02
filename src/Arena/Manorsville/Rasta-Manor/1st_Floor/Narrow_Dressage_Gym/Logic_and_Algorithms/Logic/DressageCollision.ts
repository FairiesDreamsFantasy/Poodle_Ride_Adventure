import { DRESSAGE_WIDTH, DRESSAGE_HEIGHT, TO_GYM_X, TO_GYM_Y_MIN, TO_GYM_Y_MAX, TO_WEST_X, TO_WEST_Y_MIN, TO_WEST_Y_MAX, DRESSAGE_DESCRIPTIONS } from '../../DressageConstants';

export function handleDressageCollision(
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar'
): { isBlocked: boolean; wallDesc: string; msg: string } {
  let isBlocked = false;
  let wallDesc = "";
  let msg = "";

  // 1st Floor Boundary Checks
  if (nextX < 0 || nextX > DRESSAGE_WIDTH || nextY < 0 || nextY > DRESSAGE_HEIGHT) {
    const isAtGymArch = nextX >= DRESSAGE_WIDTH && nextY >= TO_GYM_Y_MIN && nextY <= TO_GYM_Y_MAX;
    const isAtWestDoor = nextX <= 0 && nextY >= TO_WEST_Y_MIN && nextY <= TO_WEST_Y_MAX;
    
    if (isAtGymArch || isAtWestDoor) {
      isBlocked = false;
    } else {
      isBlocked = true;
      if (nextY >= DRESSAGE_HEIGHT) {
        wallDesc = "The North wall is made of brick. Retractable benches for spectators line the 990-foot segments flanking the pillars.";
      } else if (nextY <= 0) {
        wallDesc = "The South wall is made of brick. Retractable benches for spectators line the 990-foot segments flanking the pillars.";
      } else if (nextX >= DRESSAGE_WIDTH) {
        wallDesc = "The East wall is brick. The thematic equestrian archway to the Grand Gym is in the center.";
      } else if (nextX <= 0) {
        wallDesc = "The West wall features grand windows reaching the ceiling. A 20-foot wide door is in the center.";
      }
    }
  }

  return { isBlocked, wallDesc, msg };
}

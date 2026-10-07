import { GYM_WIDTH, GYM_HEIGHT, TO_ARCADE_X_MIN, TO_ARCADE_X_MAX, TO_ARCADE_Y, TO_DRESSAGE_X, TO_DRESSAGE_Y_MIN, TO_DRESSAGE_Y_MAX, GYM_DESCRIPTIONS } from '../../GymConstants';

export function handleGymCollision(
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: 'Floor' | 'Sky' | 'Cellar'
): { isBlocked: boolean; wallDesc: string; msg: string } {
  let isBlocked = false;
  let wallDesc = "";
  let msg = "";

  // Benches at the South
  if (nextY <= 20) {
    isBlocked = true;
    wallDesc = "Long benches line the south wall, providing a place for viewers to enjoy the gym activities.";
    return { isBlocked, wallDesc, msg };
  }

  // Boundary Checks
  if (nextX < 0 || nextX > GYM_WIDTH || nextY < 0 || nextY > GYM_HEIGHT) {
    const isAtArcadeArch = nextY >= GYM_HEIGHT && nextX >= TO_ARCADE_X_MIN && nextX <= TO_ARCADE_X_MAX;
    const isAtDressageArch = nextX <= 0 && nextY >= TO_DRESSAGE_Y_MIN && nextY <= TO_DRESSAGE_Y_MAX;

    if (isAtArcadeArch || isAtDressageArch) {
      isBlocked = false;
    } else {
      isBlocked = true;
      if (nextY >= GYM_HEIGHT) {
        wallDesc = "You reach the North wall of the gym. It's white with colorful circles. The archway to the arcade is at the far East end.";
      } else if (nextY <= 0) {
        wallDesc = `A 2000-foot row of benches lines the South wall here. Windows above overlook the Meditation Hall's Library.`;
      } else if (nextX >= GYM_WIDTH) {
        wallDesc = "The East wall is a solid white surface with shiny colorful circles, stretching 2000 feet.";
      } else if (nextX <= 0) {
        if (nextY < TO_DRESSAGE_Y_MIN) {
          wallDesc = "This 990-foot segment of the West wall is white with colorful circles. Benches for spectators line the perimeter here.";
        } else if (nextY > TO_DRESSAGE_Y_MAX) {
          wallDesc = "This 990-foot segment of the West wall is white with colorful circles. The archway to the Narrow Dressage Gym is in the center.";
        }
      }
    }
  }

  return { isBlocked, wallDesc, msg };
}

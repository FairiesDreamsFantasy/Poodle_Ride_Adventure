import { 
  LIBRARY_WIDTH, 
  LIBRARY_HEIGHT, 
  EAST_ARCH_Y_MIN, 
  EAST_ARCH_Y_MAX, 
  WEST_ARCH_Y_MIN, 
  WEST_ARCH_Y_MAX,
  LIBRARIAN_DOOR_X_MIN,
  LIBRARIAN_DOOR_X_MAX,
  LIBRARIAN_DOOR_HEIGHT,
  LIBRARIAN_DOOR_MAX_POODLE_HEIGHT
} from '../../LibraryConstants';

export function handleLibraryCollision(
  gridX: number,
  gridY: number,
  nextX: number,
  nextY: number,
  level: string,
  state: any
): { isBlocked: boolean; wallDesc: string; msg: string } {
  let isBlocked = false;
  let wallDesc = "";
  let msg = "";

  // 1st Floor Boundary Checks
  if (nextX < 0 || nextX > LIBRARY_WIDTH || nextY < 0 || nextY > LIBRARY_HEIGHT) {
    const isAtWestArchway = nextX <= 0 && nextY >= WEST_ARCH_Y_MIN && nextY <= WEST_ARCH_Y_MAX;
    const isAtEastArchway = nextX >= LIBRARY_WIDTH && nextY >= EAST_ARCH_Y_MIN && nextY <= EAST_ARCH_Y_MAX;
    const isAtLibrarianDoor = nextY <= 0 && nextX >= LIBRARIAN_DOOR_X_MIN && nextX <= LIBRARIAN_DOOR_X_MAX;

    if (isAtWestArchway || isAtEastArchway) {
      isBlocked = false;
    } else if (isAtLibrarianDoor) {
      // Check poodle height
      // Assuming state.ridingAnimal is used to determine height. 
      // Abigay is 10ft, Anninne is 10.5ft. Both are taller than 7.5ft.
      const isRiding = state.ridingAnimal && state.ridingAnimal !== "";
      if (isRiding) {
        isBlocked = true;
        wallDesc = "The special librarian double steel doors are too low for your massive poodle. Poodles taller than 7.5 feet cannot pass through these 8.5-foot high doors. The doors are protected by a grate, and an LED light above glows softly.";
      } else {
        // People can pass
        isBlocked = false;
      }
    } else {
      isBlocked = true;
      if (nextY >= LIBRARY_HEIGHT) {
        wallDesc = "At the North end of the library, high-quality wood shelves, varnished with a deep shine, line the wall. Each shelf is 8 feet high and holds 10 rows of books arranged like a dictionary. Small 10x10 windows are positioned at 10 feet high from the floor, separated by 5-foot intervals.";
      } else if (nextY <= 0) {
        wallDesc = "The South wall features a series of 10x10 windows positioned at 10 feet high from the floor. Each window is separated by 5-foot intervals, with the first window 10 feet from the west end.";
      } else if (nextX <= 0) {
        if (nextY < WEST_ARCH_Y_MIN) {
          wallDesc = "Along the South segment of the West wall, you see a set of printers, a fax machine, and production paper for creating books and blueprints. The wall has a calming wooden design.";
        } else if (nextY > WEST_ARCH_Y_MAX) {
          wallDesc = "Along the North segment of the West wall, specifically between 490 and 510 feet from the corners, you see a set of computers with multiple gaming monitors grouped together.";
        }
      } else if (nextX >= LIBRARY_WIDTH) {
        wallDesc = "The East wall of the library features a long librarian's desk stretching between y20 and y1000. Strategically arranged shelves nearby allow poodles to ride and explore the library easily.";
      }
    }
  }

  return { isBlocked, wallDesc, msg };
}

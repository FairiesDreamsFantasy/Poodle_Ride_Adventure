export const handleAdventurePathCollision = (
  area: string, 
  nextX: number, 
  nextY: number, 
  dims: { width: number, height: number }
) => {
  let isBlocked = false;
  let wallDesc = "";

  // Adventure Path is mostly linear
  if (nextX < 0 || nextX > dims.width || nextY < 0 || nextY > dims.height) {
    isBlocked = true;
    if (nextY >= dims.height) {
      isBlocked = false; // Transitions handled in Transitions.ts
    } else if (nextY <= 0) {
      isBlocked = false; // Transitions handled in Transitions.ts
    } else if (nextX <= 0) {
      wallDesc = "The thick hedge wall prevents you from leaving the path to the West.";
    } else if (nextX >= dims.width) {
      wallDesc = "The thick hedge wall prevents you from leaving the path to the East.";
    }
  }

  // Specific area blockers
  if (area === 'Overpass') {
    if (nextX < 2 || nextX > dims.width - 2) {
      isBlocked = true;
      wallDesc = "The steep walls of the trench block your path.";
    }
  }

  if (area === 'Suburb') {
    if (nextX < 1 || nextX > dims.width - 1) {
      isBlocked = true;
      wallDesc = "A residential fence blocks your path.";
    }
  }

  return { isBlocked, wallDesc };
};

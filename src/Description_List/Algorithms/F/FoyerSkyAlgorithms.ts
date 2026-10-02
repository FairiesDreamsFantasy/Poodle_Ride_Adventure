/**
 * Foyer Sky Algorithms
 * Specialized description algorithms for the Sky Foyer area in Rasta-Manor.
 */

export const getSkyFoyerWestArchwayDescription = (gridX: number, gridY: number): string => {
  const distance = gridX;
  return `You are at ${gridX}x, ${gridY}y of the Sky Foyer. Facing west. The archway to the grand playground's perimeter is ${distance} feet ahead.`;
};

export const getSkyFoyerGlassBarrierAheadDescription = (direction: string): string => {
  if (direction === 'East') {
    return "A crafted glass barrier is ahead at the 90 feet marker from the west wall.";
  } else if (direction === 'North') {
    return "A crafted glass barrier is ahead at the 90 feet marker from the south wall.";
  } else if (direction === 'West') {
    return "A crafted glass barrier is ahead at the 1910 feet marker from the east wall.";
  } else if (direction === 'South') {
    return "A crafted glass barrier is ahead at the 1910 feet marker from the north wall (precisely 90 feet from the north wall).";
  }
  return "A crafted glass barrier is ahead.";
};

export const getSkyFoyerBoundaryAhead = (type: string): string => {
  if (type === 'South') {
    return "Ahead is a crafted description of the south boundary.";
  } else if (type === 'SouthWall') {
    return "Ahead is a crafted description of the south wall.";
  } else if (type === 'NorthWall') {
    return "A crafted wall that is ahead.";
  }
  return "Ahead is a boundary.";
};

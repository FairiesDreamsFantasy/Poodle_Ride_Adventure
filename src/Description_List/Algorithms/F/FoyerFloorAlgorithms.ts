/**
 * Foyer Floor Algorithms
 * Specialized description algorithms for the Floor Foyer area in Rasta-Manor.
 */

const formatDistance = (val: number): string => {
  const rounded = Math.round(val);
  if (rounded === 0) {
    if (val > 0) {
      const inches = Math.round(val * 12);
      if (inches === 1) return "1 inch";
      if (inches > 0) return `${inches} inches`;
    }
    return "0 feet";
  }
  if (rounded === 1) {
    return "1 Foot";
  }
  return `${rounded} feet`;
};

export const getFloorFoyerSWRectangleDescription = (gridX: number, gridY: number, paces: number): string => {
  return `You are at ${gridX}x, ${gridY}y of the Floor Foyer... inside the southwest rectangle beneath the Sky Foyer. Facing north. The cellar entrance is ${formatDistance(paces)} ahead.`;
};

export const getFloorFoyerNorthDoorsAhead = (paces: number): string => {
  return `The high blue doors are ${formatDistance(paces)} ahead.`;
};

export const getFloorFoyerSouthArchwayAhead = (paces: number): string => {
  return `The green and gold striped archway is ${formatDistance(paces)} ahead.`;
};

export const getFloorFoyerWestArchwayAhead = (paces: number): string => {
  return `The archway to the grand playground floor is ${formatDistance(paces)} ahead.`;
};

export const getFoyerBoundaryAhead = (direction: string, paces: number): string => {
  return `The ${direction} boundary is ${formatDistance(paces)} ahead.`;
};


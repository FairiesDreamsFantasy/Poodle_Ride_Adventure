
export const getPlaygroundDescription = (x: number, y: number, direction: string, level: string): string => {
  const isSky = level === 'Sky';
  const name = isSky ? "Sky Playground Perimeter" : "Grand Indoor Playground";
  return `You are in ${name}. Position: ${x}x, ${y}y. Facing ${direction.toLowerCase()}.`;
};

export const getPlaygroundAhead = (x: number, y: number, direction: string, level: string): string => {
  if (level === 'Floor') {
    if (direction === 'South') {
      if (x <= 10) return "Ahead is an archway to the west grand arcade crafted at the 1 foot marker.";
      if (x >= 1980) return "Ahead is the west grand arcade and archway.";
    }
    if (direction === 'North' && x >= 1980) return "Ahead is a ramp to the grand playground's perimeter walkway (660 feet from the north wall).";
    if (direction === 'East' && y >= 1980) return "The archway to the Floor Foyer is ahead.";
  }
  return `The boundary is ahead.`;
};

export const getArcadeDescription = (name: string, x: number, y: number, direction: string): string => {
  return `You are in the ${name}. Position: ${x}x, ${y}y. Facing ${direction.toLowerCase()}.`;
};

export const getArcadeAhead = (name: string, x: number, y: number, direction: string): string => {
  if (name === 'West Grand Arcade') {
    if (direction === 'South' && x >= 1980) return "The archway to the gym is ahead.";
    if (direction === 'North' && x >= 1980) return "The archway to the grand indoor playground is ahead.";
    if (direction === 'East' && y >= 990 && y <= 1010) return "The archway to the Rugged Play Field is ahead.";
  }
  return `The boundary is ahead.`;
};

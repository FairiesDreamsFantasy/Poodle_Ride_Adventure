
export const getMeditationHallDescription = (x: number, y: number, direction: string): string => {
  if (y <= 10) return "You are at the South wall of the Meditation Hall. Magnificent rainbow glass doors lead to the Garden of Peace.";
  if (y >= 1990) return "You are at the North wall of the Meditation Hall. The Tarsis sliding door leads to the Simulated Garden Area.";
  
  return `You are in the 2000x2000 foot Meditation Hall. Position: ${x}x, ${y}y. Facing ${direction.toLowerCase()}.`;
};

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

export const getMeditationHallAhead = (x: number, y: number, direction: string): string => {
  if (direction === 'North') {
    const dist = 2000 - y;
    if (x >= 990 && x <= 1010) return `The Simulated Garden Area is ${formatDistance(dist)} ahead.`;
    return `The North wall is ${formatDistance(dist)} ahead.`;
  }
  if (direction === 'South') {
    if (x >= 990 && x <= 1010) return `The Back Porch and Garden are ${formatDistance(y)} ahead.`;
    return `The South wall is ${formatDistance(y)} ahead.`;
  }
  if (direction === 'East') return `The East boundary is ${formatDistance(2000 - x)} ahead.`;
  if (direction === 'West') {
    if (y >= 1 && y <= 20) return `The archway leading to the Meditation Hall's Library is ${formatDistance(x)} ahead.`;
    return `The West boundary is ${formatDistance(x)} ahead.`;
  }
  return "";
};

export const getLibraryDescription = (x: number, y: number, direction: string): string => {
  return `You are in the Meditation Hall's Library, a 200x480 space. Position: ${x}x, ${y}y. Facing ${direction.toLowerCase()}. Polished wood shelves line the North wall.`;
};

export const getLibraryAhead = (x: number, y: number, direction: string): string => {
  if (direction === 'East') {
    if (y >= 1 && y <= 20) return `The archway back to the Meditation Hall is ${formatDistance(200 - x)} ahead.`;
  }
  if (direction === 'West') return `The West boundary towards the Lobby is ${formatDistance(x)} ahead.`;
  return `The boundary is ahead.`;
};

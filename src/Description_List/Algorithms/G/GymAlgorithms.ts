
export const getGymDescription = (name: string, x: number, y: number, direction: string): string => {
  return `You are in ${name}. Position: ${x}x, ${y}y. Facing ${direction.toLowerCase()}.`;
};

export const getGymAhead = (name: string, x: number, y: number, direction: string): string => {
  if (name === 'The Grand Gym') {
    if (direction === 'North' && x >= 1980) return "The west grand arcade archway is ahead.";
    if (direction === 'West' && y >= 990 && y <= 1010) return "The archway leading to narrow dressage gym is ahead.";
  }
  if (name === 'Narrow Dressage Gym') {
    if (direction === 'East' && y >= 990 && y <= 1010) return "The grand gym archway is ahead.";
    if (direction === 'West' && y >= 990 && y <= 1010) return "The door to the west side brick path is ahead.";
  }
  return `The barrier is ahead.`;
};

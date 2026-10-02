
export const getSimulatedGardenAreaDescription = (x: number, y: number, direction: string): string => {
  if (x <= 10) return "You are at the West wall of the Simulated Garden Area. The walls are beautifully decorated with garden scene paintings.";
  if (x >= 1990) return "You are at the East wall of the Simulated Garden Area. 100 circular windows with brass trim overlook the manor's dining facilities.";
  if (y <= 10) return "You are at the South wall of the Simulated Garden Area. The 20-foot wide sliding door with Japanese and Ethiopian windows leads to the Meditation Hall.";
  if (y >= 1990) return "You are at the North wall of the Simulated Garden Area. The pink and white striped archway leads to the Rugged Play Field.";
  
  return `You are in the 2000x2000 foot Simulated Garden Area. Position: ${x}x, ${y}y. Facing ${direction.toLowerCase()}.`;
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

export const getSimulatedGardenAreaAhead = (x: number, y: number, direction: string): string => {
  if (direction === 'North') {
    const dist = 2000 - y;
    if (x >= 990 && x <= 1010) return `The pink and white archway to the Rugged Play Field is ${formatDistance(dist)} ahead.`;
    return `The North wall is ${formatDistance(dist)} ahead.`;
  }
  if (direction === 'South') {
    if (x >= 990 && x <= 1010) return `The sliding door to the Meditation Hall is ${formatDistance(y)} ahead.`;
    return `The South wall is ${formatDistance(y)} ahead.`;
  }
  if (direction === 'East') return `The East boundary is ${formatDistance(2000 - x)} ahead.`;
  if (direction === 'West') return `The West boundary is ${formatDistance(x)} ahead.`;
  return "";
};

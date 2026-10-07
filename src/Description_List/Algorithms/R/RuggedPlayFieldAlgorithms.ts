
import { FOYER_DESCRIPTIONS, RUGGED_PLAY_FIELD_DESCRIPTIONS } from '../../../System/AI/In-Game/Logic/GameLogic';

export const getRuggedPlayFieldDescription = (x: number, y: number, direction: string): string => {
  if (x <= 10) return "You are at the West wall of the Rugged Play Field.";
  if (x >= 1990) return "You are at the East wall of the Rugged Play Field.";
  if (y <= 10) return "You are at the South wall of the Rugged Play Field. The pink and white archway to the Simulated Garden Area is here.";
  if (y >= 1990) return "You are at the North wall of the Rugged Play Field. The green and gold striped archway leads back to the Foyer.";
  
  return `You are in the 2000x2000 foot Rugged Play Field. Position: ${x}x, ${y}y. Facing ${direction.toLowerCase()}. ${RUGGED_PLAY_FIELD_DESCRIPTIONS.MAIN || ""}`;
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

export const getRuggedPlayFieldAhead = (x: number, y: number, direction: string): string => {
  if (direction === 'North') {
    const dist = 2000 - y;
    if (x >= 990 && x <= 1010) return `The archway back to the Foyer is ${formatDistance(dist)} ahead.`;
    return `The North wall is ${formatDistance(dist)} ahead.`;
  }
  if (direction === 'South') {
    if (x >= 990 && x <= 1010) return `The pink and white archway to the Simulated Garden Area is ${formatDistance(y)} ahead.`;
    return `The South wall is ${formatDistance(y)} ahead.`;
  }
  if (direction === 'East') return `The East boundary is ${formatDistance(2000 - x)} ahead.`;
  if (direction === 'West') return `The West boundary is ${formatDistance(x)} ahead.`;
  return "";
};

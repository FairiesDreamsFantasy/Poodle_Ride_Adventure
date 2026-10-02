
/**
 * Poodle Tail Specs Registry
 */
export interface TailMetadata {
  length: number; // inches
  hasBallTip: boolean;
  ballTipDiameter?: number; // inches
}

export const POODLE_TAIL_MAP: Record<string, TailMetadata> = {
  'Abigay Rose Kone': {
    length: 36, // 3 feet
    hasBallTip: true,
    ballTipDiameter: 12 // estimated
  },
  'Anninne-Amelia Rose Julisus': {
    length: 36, // 3 feet
    hasBallTip: true,
    ballTipDiameter: 12
  },
  'Abigail Marigold Kenyatta': {
    length: 36, // 3 feet
    hasBallTip: true
  },
  'Dymond Daisy Qin-Reynolds': {
    length: 38,
    hasBallTip: true,
    ballTipDiameter: 24
  }
};

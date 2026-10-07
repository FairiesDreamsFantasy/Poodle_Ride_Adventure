
/**
 * Poodle Tail Ball-Tip Registry
 */
export const POODLE_BALL_TIP_MAP: Record<string, boolean> = {
  'Abigay Rose Kone': true,
  'Anninne-Amelia Rose Julisus': true,
  'Abigail Marigold Kenyatta': true,
  'Dymond Daisy Qin-Reynolds': true,
  'Classic White Poodle': false,
  'Olga-Olivia': false,
  'Chloe Joseph Gray-Michaels': false
};

export function hasBallTip(name: string): boolean {
  return POODLE_BALL_TIP_MAP[name] || false;
}

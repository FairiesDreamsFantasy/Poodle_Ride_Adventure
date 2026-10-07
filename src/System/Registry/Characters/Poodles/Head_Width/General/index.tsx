
/**
 * Poodle Head Width Registry
 * Strictly excludes ears.
 */
export const POODLE_HEAD_WIDTH_MAP: Record<string, number> = {
  'Abigay Rose Kone': 24, // inches
  'Anninne-Amelia Rose Julisus': 22, // inches
  'Dymond Daisy Qin-Reynolds': 45, // inches
  'Abigail Marigold Kenyatta': 20, // inches
  'Olga-Olivia': 14.4,
  'Chloe Joseph Gray-Michaels': 13.2
};

export function getPoodleHeadWidth(name: string): number | null {
  return POODLE_HEAD_WIDTH_MAP[name] || null;
}

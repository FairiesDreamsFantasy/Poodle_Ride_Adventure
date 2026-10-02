
/**
 * Poodle Head Height Registry
 * Strictly excludes ears.
 */
export const POODLE_HEAD_HEIGHT_MAP: Record<string, number> = {
  'Abigay Rose Kone': 25, // inches (approx based on 25% larger than typical)
  'Anninne-Amelia Rose Julisus': 20, // inches
  'Dymond Daisy Qin-Reynolds': 40, // inches
  'Abigail Marigold Kenyatta': 20 // inches
};

export function getPoodleHeadHeight(name: string): number | null {
  return POODLE_HEAD_HEIGHT_MAP[name] || null;
}

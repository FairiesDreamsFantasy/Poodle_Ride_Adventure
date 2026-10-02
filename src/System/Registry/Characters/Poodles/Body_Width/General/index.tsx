
/**
 * Poodle Body Width Registry
 */
export const POODLE_BODY_WIDTH_MAP: Record<string, number> = {
  'Abigay Rose Kone': 50, // inches
  'Anninne-Amelia Rose Julisus': 56, // inches
  'Dymond Daisy Qin-Reynolds': 45 // inches
};

export function getPoodleBodyWidth(name: string): number | null {
  return POODLE_BODY_WIDTH_MAP[name] || null;
}


/**
 * Poodle Body Length Registry
 * Strictly excludes head and tail measurements.
 */
export const POODLE_LENGTH_MAP: Record<string, number> = {
  'Abigay Rose Kone': 8, // feet
  'Anninne-Amelia Rose Julisus': 8, // feet
  'Abigail Marigold Kenyatta': 8, // feet (implied)
  'Dymond Daisy Qin-Reynolds': 7, // feet
  'Olga-Olivia': 4,
  'Chloe Joseph Gray-Michaels': 3.8
};

export function getPoodleLength(name: string): number | null {
  return POODLE_LENGTH_MAP[name] || null;
}

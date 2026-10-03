
/**
 * Poodle Fur Thickness Registry
 * Focused on body fur/spheres.
 */
export enum FurThickness {
  THICK = 'THICK',
  THICKENED_LEGS = 'THICKENED_LEGS',
  STANDARD = 'STANDARD'
}

export const POODLE_FUR_THICKNESS_MAP: Record<string, FurThickness> = {
  'Abigay Rose Kone': FurThickness.THICKENED_LEGS,
  'Anninne-Amelia Rose Julisus': FurThickness.THICK,
  'Abigail Marigold Kenyatta': FurThickness.STANDARD,
  'Dymond Daisy Qin-Reynolds': FurThickness.THICKENED_LEGS,
  'Olga-Olivia': FurThickness.STANDARD,
  'Chloe Joseph Gray-Michaels': FurThickness.STANDARD
};

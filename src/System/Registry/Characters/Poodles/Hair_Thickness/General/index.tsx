
/**
 * Poodle Hair Thickness Registry
 * Focused on head hair/manes.
 */
export enum HairThickness {
  THICK = 'THICK',
  SIGNIFICANTLY_THICKENED = 'SIGNIFICANTLY_THICKENED',
  STANDARD = 'STANDARD'
}

export const POODLE_HAIR_THICKNESS_MAP: Record<string, HairThickness> = {
  'Abigay Rose Kone': HairThickness.SIGNIFICANTLY_THICKENED,
  'Anninne-Amelia Rose Julisus': HairThickness.THICK,
  'Abigail Marigold Kenyatta': HairThickness.STANDARD,
  'Dymond Daisy Qin-Reynolds': HairThickness.STANDARD
};

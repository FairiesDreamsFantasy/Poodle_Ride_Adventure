
/**
 * Poodle Skin Color System
 * Scientific categorization of skin tones.
 */
export enum PoodleSkinColor {
  REFINED_PEACH = 'REFINED_PEACH',
  REFINED_SHINY_PEACH = 'REFINED_SHINY_PEACH',
  PEACH = 'PEACH',
  PEACH_WITH_YELLOWISH_UNDERTONE = 'PEACH_WITH_YELLOWISH_UNDERTONE',
  SHINY_TAN = 'SHINY_TAN',
  TAN = 'TAN'
}

export const POODLE_SKIN_COLOR_MAP: Record<string, PoodleSkinColor> = {
  'Abigay Rose Kone': PoodleSkinColor.REFINED_PEACH,
  'Anninne-Amelia Rose Julisus': PoodleSkinColor.SHINY_TAN,
  'Abigail Marigold Kenyatta': PoodleSkinColor.PEACH,
  'Dymond Daisy Qin-Reynolds': PoodleSkinColor.PEACH_WITH_YELLOWISH_UNDERTONE,
  'Classic White Poodle': PoodleSkinColor.REFINED_SHINY_PEACH
};

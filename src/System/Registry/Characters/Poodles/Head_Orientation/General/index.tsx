
/**
 * Poodle Head Orientation Registry
 */
export enum HeadOrientation {
  PERCHED_ON_TOP_OF_NECK = 'PERCHED_ON_TOP_OF_NECK',
  STANDARD = 'STANDARD'
}

export const POODLE_HEAD_ORIENTATION_MAP: Record<string, HeadOrientation> = {
  'Abigay Rose Kone': HeadOrientation.PERCHED_ON_TOP_OF_NECK,
  'Anninne-Amelia Rose Julisus': HeadOrientation.STANDARD, // Can lean forward but head stable
  'Abigail Marigold Kenyatta': HeadOrientation.STANDARD,
  'Dymond Daisy Qin-Reynolds': HeadOrientation.PERCHED_ON_TOP_OF_NECK
};

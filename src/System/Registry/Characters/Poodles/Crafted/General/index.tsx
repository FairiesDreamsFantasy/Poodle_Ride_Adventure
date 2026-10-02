import { PoodleClass } from '../../Disambiguation';

/**
 * Crafted Poodle Registry - General Data
 * Protected data for primary masterpiece characters.
 */
export const CRAFTED_POODLES = [
  'Abigay Rose Kone',
  'Anninne-Amelia Rose Julisus',
  'Abigail Marigold Kenyatta',
  'Dymond Daisy Qin-Reynolds'
];

export interface CraftedPoodleMetadata {
  name: string;
  class: PoodleClass;
  gallopRhythm: number; // ms
  barkType: 'BOW' | 'CLASSIC_ELEGANT';
  hasStandardizedJump: boolean;
}

export const CRAFTED_POODLE_METADATA: Record<string, CraftedPoodleMetadata> = {
  'Abigay Rose Kone': {
    name: 'Abigay Rose Kone',
    class: PoodleClass.CRAFTED,
    gallopRhythm: 400,
    barkType: 'BOW',
    hasStandardizedJump: true
  },
  'Anninne-Amelia Rose Julisus': {
    name: 'Anninne-Amelia Rose Julisus',
    class: PoodleClass.CRAFTED,
    gallopRhythm: 400,
    barkType: 'BOW',
    hasStandardizedJump: true
  },
  'Abigail Marigold Kenyatta': {
    name: 'Abigail Marigold Kenyatta',
    class: PoodleClass.CRAFTED,
    gallopRhythm: 300,
    barkType: 'BOW',
    hasStandardizedJump: true
  },
  'Dymond Daisy Qin-Reynolds': {
    name: 'Dymond Daisy Qin-Reynolds',
    class: PoodleClass.CRAFTED,
    gallopRhythm: 300,
    barkType: 'BOW',
    hasStandardizedJump: true
  }
};

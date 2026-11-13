/**
 * POODLE SOUNDS
 * Sound directory for Anninne-Amelia Rose Julisus.
 * [PRESERVED ARTISTIC CRAFT: DO NOT ALTER WITHOUT PERMISSION]
 */

import { ANNINNE_AMELIA_GALLOP, ANNINNE_AMELIA_NYHABINGHI_WALK } from '@/src/Characters/Poodles/Anninne-Amelia_Rose_Julisus/Movements/MovementPowerhouse';
import { playGallop } from '@/src/Characters/Poodles/Anninne-Amelia_Rose_Julisus/Sounds/Gallop_Sound/GallopLogic';
import { playWalk } from '@/src/Characters/Poodles/Anninne-Amelia_Rose_Julisus/Sounds/Walking_Sound/WalkingLogic';

import { playElegantBark, playEcholocationPulse } from '@/src/Characters/Poodles/Anninne-Amelia_Rose_Julisus/Sounds/Elegant_Bark';
export { playElegantBark };
export const playAnninneAmeliaBark = playElegantBark;
export const playAnninneAmeliaEcholocationPulse = playEcholocationPulse;
export const playAnninneAmeliasGallop = playGallop;
export const playAnninneAmeliaWalk = playWalk;

// Aliases for the sound manager
export const playPoodleGallop = playGallop;
export const playPoodleWalk = playWalk;

export { playCanter as playPoodleCanter } from '@/src/Characters/Poodles/Anninne-Amelia_Rose_Julisus/Sounds/Canter_Sound/CanterLogic';
export { playTrot as playPoodleTrot } from '@/src/Characters/Poodles/Anninne-Amelia_Rose_Julisus/Sounds/Trot_Sounds/TrotLogic';

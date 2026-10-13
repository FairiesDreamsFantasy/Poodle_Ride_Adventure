/**
 * PoodleSounds.ts
 * Sound directory for Abigail Marigold Kenyatta.
 * [PRESERVED ARTISTIC CRAFT]
 */

import { playElegantBark } from './Sounds/Elegant_Bark';
import { playAbigailGallopLogic } from './Sounds/Gallop_Sounds/AbigailGallopLogic';

export { playElegantBark };
export { playElegantBark as playAbigailBark };
// Aliases for the sound manager/poodle core
export const playPoodleBark = playElegantBark;

/**
 * Abigail's specialized 300ms gallop sound logic.
 * [Standardization AA]
 */
export async function playAbigailGallop(
    ctx: AudioContext,
    sfxConnector: (node: AudioNode, hasReverb: boolean) => void,
    surfaceType: 'hard' | 'soft',
    hasReverb: boolean,
    area: string
) {
    playAbigailGallopLogic(ctx, sfxConnector, surfaceType, hasReverb, area);
}

export const playPoodleGallop = playAbigailGallop;

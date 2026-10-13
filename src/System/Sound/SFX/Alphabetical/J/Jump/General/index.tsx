import { playJumpSound, playRunningJumpSound } from '../../../../../../Registry/Sound/SFX/Poodle/Movement';
import { disambiguatePoodle } from '../../../../../../Registry/Characters/Poodles/Disambiguation';

/**
 * Standardized Jump Sound Registry
 * Protected Master Logic for Primary Crafted Poodles.
 */
export async function playStandardizedJump(
  contextState: any,
  x: number = 0,
  y: number = 0,
  z: number = 0,
  area: string = 'Foyer',
  animal: string = 'Abigay Rose Kone',
  isRunning: boolean = false
) {
  try {
    contextState.init();
    const { ctx, sfxGain } = contextState;
    
    const pData = disambiguatePoodle(animal);
    if (!pData || !pData.isElegant) {
      // Zero-Fallback Enforcement: Only allow Elegant characters to use this jump system
      return; 
    }

    const sfxConnector = (node: AudioNode, hasReverb: boolean) => {
      node.connect(contextState.createPanner(x, y, z)).connect(sfxGain);
      if (hasReverb && contextState.reverbDelay) {
        node.connect(contextState.reverbDelay);
      }
    };

    const profile = contextState.currentReverbProfile;
    const hasReverb = !!profile;

    if (isRunning) {
      playRunningJumpSound(ctx, sfxConnector, hasReverb);
    } else {
      playJumpSound(ctx, sfxConnector, hasReverb);
    }
  } catch (e) {
    console.error("playStandardizedJump failed:", e);
  }
}

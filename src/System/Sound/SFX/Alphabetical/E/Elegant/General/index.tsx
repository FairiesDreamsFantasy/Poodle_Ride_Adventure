import { 
  NO_REVERB
} from "../../../../../Reverberation_Effects_List";
import {
  getReverbProfileForArea,
  shouldResetReverbForArea,
  getEffectiveEchoState,
  isMeditationArea,
  isInternalReverbEnabled
} from "../../../../../Reverberation_Effects_List/Algorithms";
import { playModularElegantEcho } from "../../../../../../Engine/Audio/General";
import * as AbigaySynth from "../../../../../../../Characters/Poodles/Abigay_Rose_Kone/Sounds/Synthesizer";
import * as AnninneAmeliaSynth from "../../../../../../../Characters/Poodles/Anninne-Amelia_Rose_Julisus/Sounds/Synthesizer";
import * as AbigailSynth from "../../../../../../../Characters/Poodles/Abigail_Marigold_Kenyatta/Sounds/Synthesizer";
import * as DymondSynth from "../../../../../../../Characters/Poodles/Dymond_Daisy_Qin-Reynolds/Sounds/Synthesizer";
import * as ClassicWhitePoodleSynth from "../../../../../../../Characters/Poodles/Classic/White_Poodle/Sounds/Synthesizer";
import { play64BitElegantBark } from "../../../Classic";
import { disambiguatePoodle, PoodleClass } from "../../../../../../Registry/Characters/Poodles/Disambiguation";

/**
 * Standardized Elegant Sound Registry
 * Protected Master Logic for Primary Crafted Poodles.
 */
export async function playStandardizedElegantBark(
  contextState: any, 
  x: number = 0, 
  y: number = 0, 
  z: number = 0, 
  area: string = 'Foyer', 
  animal: string = 'Abigay Rose Kone', 
  barkType: string = 'Generic'
) {
    try {
      contextState.init();
      const { ctx, sfxGain, reverbDelay } = contextState;
      
      const pData = disambiguatePoodle(animal);
      if (!pData || !pData.isElegant) {
        // Zero-Fallback: Non-elegant or unrecognized characters cannot use this system.
        return;
      }

      const profile = getReverbProfileForArea(area);
      const hasReverb = profile && profile !== NO_REVERB;
      const disableInternalEcho = profile.disableInternalEcho || false;
      
      if (hasReverb) {
        contextState.setReverbProfile(profile);
      } else if (shouldResetReverbForArea(area)) {
        contextState.setReverbProfile(null);
      }

      const isSpecificMeditationArea = isMeditationArea(area);
      const effectiveDisableInternalEcho = getEffectiveEchoState(area, disableInternalEcho);

      const barkGain = ctx.createGain();
      barkGain.connect(sfxGain);
      if (hasReverb) {
        barkGain.connect(reverbDelay);
      }

      const internalReverbEnabled = isInternalReverbEnabled(area, isSpecificMeditationArea);
      const disableDescendingPitch = false; 

      if (contextState.currentBitMode === '64-bit' || contextState.currentBitMode === '64BIT') {
        play64BitElegantBark(
          ctx,
          barkGain,
          (pX, pY, pZ) => contextState.createPanner(pX, pY, pZ),
          x, y, z,
          animal,
          true,
          internalReverbEnabled,
          barkType as any,
          disableDescendingPitch
        );
      } else {
        const synthMap: Record<string, any> = {
          'Anninne-Amelia Rose Julisus': AnninneAmeliaSynth,
          'Abigail Marigold Kenyatta': AbigailSynth,
          'Dymond Daisy Qin-Reynolds': DymondSynth,
          'Classic White Poodle': ClassicWhitePoodleSynth,
          'Abigay Rose Kone': AbigaySynth
        };
        
        // Zero-Fallback Enforcement
        const synthModule = synthMap[animal];
        if (!synthModule) {
           throw new Error(`Animal "${animal}" not recognized in Elegant Sound Registry.`);
        }
        
        const synthFn = synthModule.playElegantBark;
        synthFn(ctx, barkGain, (pX, pY, pZ) => contextState.createPanner(pX, pY, pZ), x, y, z, true, internalReverbEnabled, barkType as any, disableDescendingPitch);
      }

      if (!effectiveDisableInternalEcho) {
        playModularElegantEcho(() => {}, internalReverbEnabled);
      }
    } catch (e) {
      console.error("playStandardizedElegantBark failed:", e);
    }
}

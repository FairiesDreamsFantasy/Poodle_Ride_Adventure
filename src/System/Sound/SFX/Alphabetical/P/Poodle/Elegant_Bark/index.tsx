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

export async function playPoodleBark(contextState: any, x: number = 0, y: number = 0, z: number = 0, area: string = 'Foyer', animal: string = 'Abigay Rose Kone', barkType: string = 'Generic') {
    try {
      contextState.init();
      const { ctx, sfxGain, reverbDelay } = contextState;
      
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
        // Use the new ultra-precise, modular 64-bit synthesis engine
        play64BitElegantBark(
          ctx,
          barkGain,
          (pX, pY, pZ) => contextState.createPanner(pX, pY, pZ),
          x, y, z,
          animal,
          true, // disableInternalEcho (always disabled for primary bark per original comments)
          internalReverbEnabled,
          barkType as any,
          disableDescendingPitch
        );
      } else {
        // Fallback to dynamic lookup of original synthesizers
        const synthMap: Record<string, any> = {
          'Anninne-Amelia Rose Julisus': AnninneAmeliaSynth,
          'Abigail Marigold Kenyatta': AbigailSynth,
          'Dymond Daisy Qin-Reynolds': DymondSynth,
          'Classic White Poodle': ClassicWhitePoodleSynth,
          'White Poodle': ClassicWhitePoodleSynth,
          'Abigay Rose Kone': AbigaySynth
        };
        
        // SCIENTIFIC MANDATE: ZERO-FALLBACK Policy
        const synthModule = synthMap[animal];
        if (!synthModule) {
          // If the animal is not recognized as an elegant character, do not play an elegant bark.
          // This prevents Babylonian characters from using elegant synthesis.
          return;
        }

        const isClassic = animal.includes('Classic') || animal === 'White Poodle';
        const effectiveBarkType = isClassic && (barkType === 'Generic' || barkType === 'BOW') ? 'Classic_A' : barkType;

        const synthFn = synthModule.playElegantBark;

        // 1. Play the Primary Bark (Always disable internal echo here to use the modular system instead)
        synthFn(ctx, barkGain, (pX, pY, pZ) => contextState.createPanner(pX, pY, pZ), x, y, z, true, internalReverbEnabled, effectiveBarkType as any, disableDescendingPitch);
      }

      // 2. Play Modular Echoes if enabled for this area
      if (!effectiveDisableInternalEcho) {
        playModularElegantEcho((delay, volMult) => {
          // Note: In a future step, we will update synthFn to accept delay/volMult for precise echo control.
          // For now, we rely on the fact that these are synthesized sounds.
          // To maintain artistic integrity, we should ensure the synthFn can handle a delayed start.
          // However, for this turn, we are switching OFF the built-in ones as requested.
        }, internalReverbEnabled);
      }
    } catch (e) {
      console.error("playPoodleBark failed:", e);
    }
}

export * from './BOW';
export * from './Classic';

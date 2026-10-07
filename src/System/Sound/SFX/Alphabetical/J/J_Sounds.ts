
import { SoundContext } from '../../../SoundContext';
import * as AbigaySynth from "../../../../../Characters/Poodles/Abigay_Rose_Kone/Sounds/Synthesizer";
import * as AnninneAmeliaSynth from "../../../../../Characters/Poodles/Anninne-Amelia_Rose_Julisus/Sounds/Synthesizer";
import * as DymondSynth from "../../../../../Characters/Poodles/Dymond_Daisy_Qin-Reynolds/Sounds/Synthesizer";
import * as AbigailSynth from "../../../../../Characters/Poodles/Abigail_Marigold_Kenyatta/Sounds/Synthesizer";
import { playJumpSound as playJump, playRunningJumpSound as playRunningJump } from "../../../../Registry/Sound/SFX/Poodle/Movement";
import { disambiguatePoodle, PoodleClass } from "../../../../Registry/Characters/Poodles/Disambiguation";

export const J_Sounds = {
  async playJumpSound(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    const { ctx, connectSFX } = context;
    const hasReverb = area === 'Foyer' || area === 'Meditation Hall';
    
    const pData = disambiguatePoodle(animal);
    if (!pData) return;

    if (animal === 'Abigay Rose Kone') {
      AbigaySynth.playJumpSound(ctx, connectSFX, hasReverb);
    } else if (animal === 'Anninne-Amelia Rose Julisus') {
      AnninneAmeliaSynth.playJumpSound(ctx, connectSFX, hasReverb);
    } else if (animal === 'Dymond Daisy Qin-Reynolds') {
      DymondSynth.playJumpSound(ctx, connectSFX, hasReverb);
    } else if (animal === 'Abigail Marigold Kenyatta' || animal === 'Abigail Marigold_Kenyatta') {
      AbigailSynth.playJumpSound(ctx, connectSFX, hasReverb);
    } else if (pData.className === PoodleClass.CLASSIC) {
      // Classic White Poodles use the shared jump system logic
      playJump(ctx, connectSFX, hasReverb);
    }
  },

  async playRunningJumpSound(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    const { ctx, connectSFX } = context;
    const hasReverb = area === 'Foyer' || area === 'Meditation Hall';
    
    const pData = disambiguatePoodle(animal);
    if (!pData) return;

    if (animal === 'Abigay Rose Kone') {
      AbigaySynth.playRunningJumpSound(ctx, connectSFX, hasReverb);
    } else if (animal === 'Anninne-Amelia Rose Julisus') {
      AnninneAmeliaSynth.playRunningJumpSound(ctx, connectSFX, hasReverb);
    } else if (animal === 'Dymond Daisy Qin-Reynolds') {
      DymondSynth.playRunningJumpSound(ctx, connectSFX, hasReverb);
    } else if (animal === 'Abigail Marigold Kenyatta' || animal === 'Abigail Marigold_Kenyatta') {
      AbigailSynth.playRunningJumpSound(ctx, connectSFX, hasReverb);
    } else if (pData.className === PoodleClass.CLASSIC) {
      playRunningJump(ctx, connectSFX, hasReverb);
    }
  },

  async playHopSound(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    const { ctx, connectSFX } = context;
    const hasReverb = area === 'Foyer' || area === 'Meditation Hall';
    
    const pData = disambiguatePoodle(animal);
    if (!pData) return;

    if (animal === 'Abigay Rose Kone') {
      AbigaySynth.playHopSound(ctx, connectSFX, hasReverb);
    } else if (animal === 'Anninne-Amelia Rose Julisus') {
      AnninneAmeliaSynth.playHopSound(ctx, connectSFX, hasReverb);
    } else if (animal === 'Dymond Daisy Qin-Reynolds') {
      DymondSynth.playHopSound(ctx, connectSFX, hasReverb);
    } else if (animal === 'Abigail Marigold Kenyatta' || animal === 'Abigail Marigold_Kenyatta') {
      AbigailSynth.playHopSound(ctx, connectSFX, hasReverb);
    } else if (pData.className === PoodleClass.CLASSIC) {
      // For classic white poodles, hop defaults to jump logic if specific hop not defined
      playJump(ctx, connectSFX, hasReverb);
    }
  }
};


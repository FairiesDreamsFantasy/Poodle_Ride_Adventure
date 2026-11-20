
import { SoundContext } from '../../../SoundContext';
import * as AbigaySynth from "../../../../../Characters/Poodles/Abigay_Rose_Kone/Sounds/Synthesizer";
import * as AnninneAmeliaSynth from "../../../../../Characters/Poodles/Anninne-Amelia_Rose_Julisus/Sounds/Synthesizer";
import * as DymondSynth from "../../../../../Characters/Poodles/Dymond_Daisy_Qin-Reynolds/Sounds/Synthesizer";
import * as AbigailSynth from "../../../../../Characters/Poodles/Abigail_Marigold_Kenyatta/Sounds/Synthesizer";
import { playJumpSound as playJump, playRunningJumpSound as playRunningJump } from "../../../../Registry/Sound/SFX/Poodle/Movement";
import { disambiguatePoodle, PoodleClass } from "../../../../Registry/Characters/Poodles/Disambiguation";

export const J_Sounds = {
  async playJumpSound(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    const { ctx, connectSFX, currentSynthMode } = context;
    const hasReverb = area === 'Foyer' || area === 'Meditation Hall';
    const normalizedAnimal = animal === 'Abigail Marigold_Kenyatta' ? 'Abigail Marigold Kenyatta' : animal;

    const pData = disambiguatePoodle(normalizedAnimal);
    if (!pData || pData.className === PoodleClass.BABYLONIAN) return;

    const mode = currentSynthMode || 'Classic';
    const isAdvanced = mode === 'Advanced' || mode === 'Advanced Yamaha' || mode === 'ADVANCED';
    const isMix = mode === 'Mix';

    if (pData.className === PoodleClass.CLASSIC) {
      if (isAdvanced) {
        await context.playWithSynth('playJumpSound', area, x, y, z, normalizedAnimal);
        return;
      }
      playJump(ctx, connectSFX, hasReverb);
      if (isMix) {
        await context.playWithSynth('playJumpSound', area, x, y, z, normalizedAnimal);
      }
      return;
    }

    if (isAdvanced || isMix) {
      await context.playWithSynth('playJumpSound', area, x, y, z, normalizedAnimal);
      return;
    }

    if (normalizedAnimal === 'Abigay Rose Kone') {
      AbigaySynth.playJumpSound(ctx, connectSFX, hasReverb);
    } else if (normalizedAnimal === 'Anninne-Amelia Rose Julisus') {
      AnninneAmeliaSynth.playJumpSound(ctx, connectSFX, hasReverb);
    } else if (normalizedAnimal === 'Dymond Daisy Qin-Reynolds') {
      DymondSynth.playJumpSound(ctx, connectSFX, hasReverb);
    } else if (normalizedAnimal === 'Abigail Marigold Kenyatta') {
      AbigailSynth.playJumpSound(ctx, connectSFX, hasReverb);
    }
  },

  async playRunningJumpSound(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    const { ctx, connectSFX, currentSynthMode } = context;
    const hasReverb = area === 'Foyer' || area === 'Meditation Hall';
    const normalizedAnimal = animal === 'Abigail Marigold_Kenyatta' ? 'Abigail Marigold Kenyatta' : animal;

    const pData = disambiguatePoodle(normalizedAnimal);
    if (!pData || pData.className === PoodleClass.BABYLONIAN) return;

    const mode = currentSynthMode || 'Classic';
    const isAdvanced = mode === 'Advanced' || mode === 'Advanced Yamaha' || mode === 'ADVANCED';
    const isMix = mode === 'Mix';

    if (pData.className === PoodleClass.CLASSIC) {
      if (isAdvanced) {
        await context.playWithSynth('playRunningJumpSound', area, x, y, z, normalizedAnimal);
        return;
      }
      playRunningJump(ctx, connectSFX, hasReverb);
      if (isMix) {
        await context.playWithSynth('playRunningJumpSound', area, x, y, z, normalizedAnimal);
      }
      return;
    }

    if (isAdvanced || isMix) {
      await context.playWithSynth('playRunningJumpSound', area, x, y, z, normalizedAnimal);
      return;
    }

    if (normalizedAnimal === 'Abigay Rose Kone') {
      AbigaySynth.playRunningJumpSound(ctx, connectSFX, hasReverb);
    } else if (normalizedAnimal === 'Anninne-Amelia Rose Julisus') {
      AnninneAmeliaSynth.playRunningJumpSound(ctx, connectSFX, hasReverb);
    } else if (normalizedAnimal === 'Dymond Daisy Qin-Reynolds') {
      DymondSynth.playRunningJumpSound(ctx, connectSFX, hasReverb);
    } else if (normalizedAnimal === 'Abigail Marigold Kenyatta') {
      AbigailSynth.playRunningJumpSound(ctx, connectSFX, hasReverb);
    }
  },

  async playHopSound(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    const { ctx, connectSFX, currentSynthMode } = context;
    const hasReverb = area === 'Foyer' || area === 'Meditation Hall';
    const normalizedAnimal = animal === 'Abigail Marigold_Kenyatta' ? 'Abigail Marigold Kenyatta' : animal;

    const pData = disambiguatePoodle(normalizedAnimal);
    if (!pData || pData.className === PoodleClass.BABYLONIAN) return;

    const mode = currentSynthMode || 'Classic';
    const isAdvanced = mode === 'Advanced' || mode === 'Advanced Yamaha' || mode === 'ADVANCED';
    const isMix = mode === 'Mix';

    if (isAdvanced || isMix) {
      await context.playWithSynth('playJumpSound', area, x, y, z, normalizedAnimal);
      return;
    }

    if (normalizedAnimal === 'Abigay Rose Kone') {
      AbigaySynth.playHopSound(ctx, connectSFX, hasReverb);
    } else if (normalizedAnimal === 'Anninne-Amelia Rose Julisus') {
      AnninneAmeliaSynth.playHopSound(ctx, connectSFX, hasReverb);
    } else if (normalizedAnimal === 'Dymond Daisy Qin-Reynolds') {
      DymondSynth.playHopSound(ctx, connectSFX, hasReverb);
    } else if (normalizedAnimal === 'Abigail Marigold Kenyatta') {
      AbigailSynth.playHopSound(ctx, connectSFX, hasReverb);
    } else if (pData.className === PoodleClass.CLASSIC) {
      // For classic white poodles, hop defaults to jump logic if specific hop not defined
      playJump(ctx, connectSFX, hasReverb);
    }
  }
};


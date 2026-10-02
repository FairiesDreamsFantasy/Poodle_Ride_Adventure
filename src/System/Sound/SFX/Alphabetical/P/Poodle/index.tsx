import { SoundContext } from '../../../../SoundContext';
import * as AbigaySynth from "../../../../../../Characters/Poodles/Abigay_Rose_Kone/Sounds/Synthesizer";
import * as AnninneAmeliaSynth from "../../../../../../Characters/Poodles/Anninne-Amelia_Rose_Julisus/Sounds/Synthesizer";
import * as AbigailSynth from "../../../../../../Characters/Poodles/Abigail_Marigold_Kenyatta/Sounds/Synthesizer";
import * as DymondSynth from "../../../../../../Characters/Poodles/Dymond_Daisy_Qin-Reynolds/Sounds/Synthesizer";

export async function playPetSound(context: SoundContext, x: number = 0, y: number = 0, z: number = 0, volumeMultiplier: number = 1.0, animal: string = 'Abigay Rose Kone') {
    const { ctx, sfxGain, createPanner } = context;
    if (animal === 'Anninne-Amelia Rose Julisus') {
      AnninneAmeliaSynth.playPetSound(ctx, sfxGain, createPanner, x, y, z, volumeMultiplier);
    } else if (animal === 'Dymond Daisy Qin-Reynolds') {
      DymondSynth.playPetSound(ctx, sfxGain, createPanner, x, y, z, volumeMultiplier);
    } else if (animal === 'Abigail Marigold Kenyatta') {
      AbigailSynth.playPetSound(ctx, sfxGain, createPanner, x, y, z, volumeMultiplier);
    } else {
      AbigaySynth.playPetSound(ctx, sfxGain, createPanner, x, y, z, volumeMultiplier);
    }
}

export * from './Elegant_Bark';
export * from './Movement';

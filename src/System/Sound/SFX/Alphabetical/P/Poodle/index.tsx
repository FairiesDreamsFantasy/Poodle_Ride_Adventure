import { SoundContext } from '../../../../SoundContext';
import * as AbigaySynth from "../../../../../../Characters/Poodles/Abigay_Rose_Kone/Sounds/Synthesizer";
import * as AnninneAmeliaSynth from "../../../../../../Characters/Poodles/Anninne-Amelia_Rose_Julisus/Sounds/Synthesizer";
import * as AbigailSynth from "../../../../../../Characters/Poodles/Abigail_Marigold_Kenyatta/Sounds/Synthesizer";
import * as DymondSynth from "../../../../../../Characters/Poodles/Dymond_Daisy_Qin-Reynolds/Sounds/Synthesizer";
import * as ChloeSynth from "../../../../../../Characters/Poodles/Chloe_Joseph_Gray-Michaels/Sounds/Synthesizer";
import * as OlgaSynth from "../../../../../../Characters/Poodles/Olga-Olivia_Jospehs/Sounds/Synthesizer";

export async function playPetSound(context: SoundContext, x: number = 0, y: number = 0, z: number = 0, volumeMultiplier: number = 1.0, animal: string = 'Abigay Rose Kone') {
    const { ctx, sfxGain, createPanner } = context;
    
    // SCIENTIFIC MANDATE: ZERO-FALLBACK Policy (No generic defaults)
    const synthMap: Record<string, any> = {
      'Abigay Rose Kone': AbigaySynth,
      'Anninne-Amelia Rose Julisus': AnninneAmeliaSynth,
      'Dymond Daisy Qin-Reynolds': DymondSynth,
      'Abigail Marigold Kenyatta': AbigailSynth,
      'Chloe Joseph Gray-Michaels': ChloeSynth,
      'Olga-Olivia': OlgaSynth
    };

    const synth = synthMap[animal];
    if (synth) {
      synth.playPetSound(ctx, sfxGain, createPanner, x, y, z, volumeMultiplier);
    } else {
      console.warn(`[Zero-Fallback Alert] No pet sound synthesis found for animal: ${animal}`);
    }
}

export * from './Elegant_Bark';
export * from './Movement';

import { SoundContext } from '../../../../../../../SoundContext';

export async function playPoodleGallop400ms(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
  await context.playWithSynth('playPoodleGallop', area, x, y, z, animal);
}

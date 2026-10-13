import { SoundContext } from '../../../../../../SoundContext';

export async function playPoodleCanter(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
  await context.playWithSynth('playPoodleCanter', area, x, y, z, animal);
}

import { SoundContext } from '../../../../../../../SoundContext';

export async function playPoodleVerySlowWalk(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
  await context.playWithSynth('playPoodleVerySlowWalk', area, x, y, z, animal);
}

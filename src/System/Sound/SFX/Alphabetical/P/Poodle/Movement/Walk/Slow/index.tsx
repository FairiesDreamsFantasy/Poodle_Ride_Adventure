import { SoundContext } from '../../../../../../../SoundContext';

export async function playPoodleSlowWalk(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
  await context.playWithSynth('playPoodleSlowWalk', area, x, y, z, animal);
}

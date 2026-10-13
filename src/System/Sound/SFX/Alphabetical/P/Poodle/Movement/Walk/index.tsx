export * from './Slow';
export * from './Very_Slow';

import { SoundContext } from '../../../../../../SoundContext';

export async function playPoodleWalk(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
  await context.playWithSynth('playPoodleWalk', area, x, y, z, animal);
}

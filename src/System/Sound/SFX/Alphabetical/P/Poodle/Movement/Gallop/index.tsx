export * from './400ms';
export * from './300ms';

import { SoundContext } from '../../../../../../SoundContext';

export async function playPoodleGallop(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
  await context.playWithSynth('playPoodleGallop', area, x, y, z, animal);
}

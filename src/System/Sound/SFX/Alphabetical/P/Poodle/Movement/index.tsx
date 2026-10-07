export * from './Gallop';
export * from './Canter';
export * from './Trot';
export * from './Walk';

import { SoundContext } from '../../../../../SoundContext';

export async function playPoodleScoot(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
  await context.playWithSynth('playPoodleScoot', area, x, y, z, animal);
}

export async function playPoodleThump(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
  await context.playWithSynth('playPoodleThump', area, x, y, z, animal);
}

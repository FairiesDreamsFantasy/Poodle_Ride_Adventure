import { playPoodleBark } from '../index';

export async function playPoodleBarkBOW(contextState: any, x: number = 0, y: number = 0, z: number = 0, area: string = 'Foyer', animal: string = 'Abigay Rose Kone') {
  return playPoodleBark(contextState, x, y, z, area, animal, 'BOW');
}

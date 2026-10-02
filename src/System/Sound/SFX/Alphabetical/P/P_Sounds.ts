
import { SoundContext } from '../../../SoundContext';
import * as Poodle from './Poodle';
import * as Points from './Points';
import * as Book from './Book';
import { playProximityBeep } from './Proximity_Beep';

export const P_Sounds = {
  async playPoodleBark(contextState: any, x: number = 0, y: number = 0, z: number = 0, area: string = 'Foyer', animal: string = 'Abigay Rose Kone', barkType: string = 'Generic') {
    return Poodle.playPoodleBark(contextState, x, y, z, area, animal, barkType);
  },

  async playPianoMusic(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    const { GenericPianoShort } = await import('../../../BGM/Instrument_Sample/Piano/Short/Generic');
    return GenericPianoShort.playPianoMusic(context, x, y, z);
  },

  async playPointEarned(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    return Points.playPointEarned(context, x, y, z);
  },

  async playPetSound(context: SoundContext, x: number = 0, y: number = 0, z: number = 0, volumeMultiplier: number = 1.0, animal: string = 'Abigay Rose Kone') {
    return Poodle.playPetSound(context, x, y, z, volumeMultiplier, animal);
  },

  async playPointDing(context: SoundContext, count: number = 1, x: number = 0, y: number = 0, z: number = 0) {
    return Points.playPointDing(context, count, x, y, z);
  },

  async playPassSound(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    return (await import('../S/Subway')).playPassSound(context, x, y, z);
  },

  playProximityBeep,

  async playPoodleGallop(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    return Poodle.playPoodleGallop(context, area, x, y, z, animal);
  },

  async playPoodleWalk(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    return Poodle.playPoodleWalk(context, area, x, y, z, animal);
  },

  async playPoodleSlowWalk(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    return Poodle.playPoodleSlowWalk(context, area, x, y, z, animal);
  },

  async playPoodleVerySlowWalk(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    return Poodle.playPoodleVerySlowWalk(context, area, x, y, z, animal);
  },

  async playPoodleCanter(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    return Poodle.playPoodleCanter(context, area, x, y, z, animal);
  },

  async playPoodleTrot(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    return Poodle.playPoodleTrot(context, area, x, y, z, animal);
  },

  async playPoodleScoot(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    return Poodle.playPoodleScoot(context, area, x, y, z, animal);
  },

  async playPoodleThump(context: SoundContext, area: string = 'Foyer', x: number = 0, y: number = 0, z: number = 0, animal: string = 'Abigay Rose Kone') {
    return Poodle.playPoodleThump(context, area, x, y, z, animal);
  },

  async playPageTurn(context: SoundContext, x: number = 0, y: number = 0, z: number = 0) {
    return Book.playPageTurn(context, x, y, z);
  }
};


import { playClassicMonophonicChime } from './Classic';
import { playPolyphonicChimes } from './Garden_Tea_Party_Themed';
import { drawWindChimes } from './Animations';

/**
 * Wind Chimes Main Registry Object
 */
export const WindChimes = {
  Classic: {
    play: playClassicMonophonicChime,
  },
  GardenTeaParty: {
    play: playPolyphonicChimes,
  },
  draw: drawWindChimes,
};

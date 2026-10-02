import { GameState } from '../../../../../../../types';

export const getJumpQuestion = (prev: GameState): string | null => {
  return "Would you like to have a tea party, or go on an adventure?";
};

export const getRideQuestion = (prev: GameState): string | null => {
  return "Do you want to ride an opossum?";
};

import React from 'react';
import { General } from './General';
import { GameState } from '../../Engine/Core/Types';

interface AnimalSelectionMenuProps {
  state: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  speak: (msg: string) => void;
  audio: any;
}

export const AnimalSelectionMenu: React.FC<AnimalSelectionMenuProps> = (props) => {
  return <General {...props} />;
};

export { PoodleSelectionMenu } from './Poodle';

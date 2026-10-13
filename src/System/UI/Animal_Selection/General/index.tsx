import React from 'react';
import { PoodleSelectionMenu } from '../Poodle';
import { GameState } from '../../../Engine/Core/Types';

interface AnimalSelectionMenuProps {
  state: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  speak: (msg: string) => void;
  audio: any;
}

export const General: React.FC<AnimalSelectionMenuProps> = (props) => {
  return <PoodleSelectionMenu {...props} />;
};

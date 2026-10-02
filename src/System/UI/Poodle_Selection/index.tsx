import React from 'react';
import { General } from './General';
import { GameState } from '../../Engine/Core/Types';

interface PoodleSelectionMenuProps {
  state: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  speak: (msg: string) => void;
  audio: any;
}

export const PoodleSelectionMenu: React.FC<PoodleSelectionMenuProps> = (props) => {
  return <General {...props} />;
};

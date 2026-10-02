import React from 'react';
import { GameView } from '../../../../Registry/UI/Play_Area/Game_View';
import { GameState } from '../../../../AI/In-Game/Logic/GameLogic';

interface GameViewProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  gameState: GameState;
  isEmbedded: boolean;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  onTogglePause: () => void;
  onToyRideChoice: (choice: boolean) => void;
  isNearToy: boolean;
  gameWidth: number;
  gameHeight: number;
}

export const PlayAreaGameViewContainer: React.FC<GameViewProps> = (props) => {
  return (
    <div id="play-area-game-view-container" className="w-full relative">
      <GameView {...props} />
    </div>
  );
};

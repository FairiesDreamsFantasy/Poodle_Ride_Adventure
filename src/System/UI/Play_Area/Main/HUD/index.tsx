import React from 'react';
import { GeneralHUDStats } from './General';
import { GameState } from '../../../../AI/In-Game/Logic/GameLogic';

interface MainHUDProps {
  gameState: GameState;
}

export const MainPlayAreaHUD: React.FC<MainHUDProps> = ({ gameState }) => {
  return (
    <div id="main-play-area-hud" className="w-full mb-4 bg-zinc-950 border border-zinc-800 p-3 rounded-lg flex justify-between items-center">
      <div id="hud-left-info" className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
        Livity HUD Display
      </div>
      <GeneralHUDStats 
        score={gameState.score} 
        level={gameState.level} 
        coins={gameState.inventory?.coins || 0} 
      />
    </div>
  );
};

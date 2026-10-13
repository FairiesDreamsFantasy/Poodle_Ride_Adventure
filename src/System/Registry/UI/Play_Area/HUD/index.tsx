import React from 'react';
import { GameState } from '../../../../AI/In-Game/Logic/GameLogic';
import { ClassicCraftedHUD } from '../../../../UI/Play_Area/Main/HUD/Classic_Crafted_HUD';

interface HUDProps {
  gameState: GameState;
}

export const HUD: React.FC<HUDProps> = ({ gameState }) => {
  return <ClassicCraftedHUD gameState={gameState} />;
};

import React from 'react';
import { GameState } from '../../../Engine/Core/Types';
import { ClassicCraftedHUD } from '../../../UI/Play_Area/Main/HUD/Classic_Crafted_HUD';

export interface HUDGeneralProps {
  gameState: GameState;
  className?: string;
}

export const HUDGeneral: React.FC<HUDGeneralProps> = ({ gameState, className }) => {
  return (
    <div id="system-components-hud-general" className={className || "w-full"}>
      <ClassicCraftedHUD gameState={gameState} />
    </div>
  );
};

export default HUDGeneral;

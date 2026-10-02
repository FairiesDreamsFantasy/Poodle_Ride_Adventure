import React from 'react';
import { GameState } from '../../../../../Engine/Core/Types';
import { ClassicCraftedHUD } from '../../../../../UI/Play_Area/Main/HUD/Classic_Crafted_HUD';

export interface HUDDarkRegularGeneralProps {
  gameState: GameState;
  className?: string;
}

export const HUDDarkRegularGeneral: React.FC<HUDDarkRegularGeneralProps> = ({ gameState, className }) => {
  return (
    <div id="system-components-hud-dark-regular-general" className={className || "w-full"}>
      <ClassicCraftedHUD gameState={gameState} />
    </div>
  );
};

export default HUDDarkRegularGeneral;

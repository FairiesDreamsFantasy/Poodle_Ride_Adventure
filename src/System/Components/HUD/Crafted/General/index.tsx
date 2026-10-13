import React from 'react';
import { GameState } from '../../../../Engine/Core/Types';
import { ClassicCraftedHUD } from '../../../../UI/Play_Area/Main/HUD/Classic_Crafted_HUD';

export interface HUDCraftedGeneralProps {
  gameState: GameState;
  className?: string;
}

export const HUDCraftedGeneral: React.FC<HUDCraftedGeneralProps> = ({ gameState, className }) => {
  return (
    <div id="system-components-hud-crafted-general" className={className || "w-full"}>
      <ClassicCraftedHUD gameState={gameState} />
    </div>
  );
};

export default HUDCraftedGeneral;

import React from 'react';
import { GameState } from '../../../../../Engine/Core/Types';
import { ClassicCraftedHUD } from '../../../../../UI/Play_Area/Main/HUD/Classic_Crafted_HUD';

export interface HUDDarkCozyGeneralProps {
  gameState: GameState;
  className?: string;
}

export const HUDDarkCozyGeneral: React.FC<HUDDarkCozyGeneralProps> = ({ gameState, className }) => {
  return (
    <div id="system-components-hud-dark-cozy-general" className={className || "w-full"}>
      <ClassicCraftedHUD gameState={gameState} />
    </div>
  );
};

export default HUDDarkCozyGeneral;

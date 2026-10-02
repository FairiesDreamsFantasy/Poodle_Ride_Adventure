import React from 'react';
import { GameState } from '../../../../Engine/Core/Types';
import { HUDDarkRegularGeneral } from '../Regular/General';

export interface HUDDarkGeneralProps {
  gameState: GameState;
  className?: string;
}

export const HUDDarkGeneral: React.FC<HUDDarkGeneralProps> = ({ gameState, className }) => {
  return (
    <div id="system-components-hud-dark-general" className={className || "w-full"}>
      <HUDDarkRegularGeneral gameState={gameState} />
    </div>
  );
};

export default HUDDarkGeneral;

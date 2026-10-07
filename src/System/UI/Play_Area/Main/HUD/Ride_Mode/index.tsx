import React from 'react';
import { GameState } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { RIDE_PACES, RidePace } from './General';

interface RideModeProps {
  gameState: GameState;
}

export const RideMode: React.FC<RideModeProps> = ({ gameState }) => {
  // Safe fallback if rideMode is not explicitly defined on gameState
  const activePace: RidePace = (gameState as any).ridePace || 'Walk';
  const paceDetails = RIDE_PACES[activePace] || RIDE_PACES['Walk'];

  return (
    <div id="hud-ride-mode" className="font-mono text-xs text-zinc-400 bg-black/40 border border-zinc-800/50 rounded px-2.5 py-1.5 backdrop-blur-sm flex items-center gap-2">
      <span className="text-zinc-600 font-bold uppercase tracking-wider text-[10px]">Pace:</span>
      <div id="hud-ride-mode-badge" className="bg-indigo-950/40 border border-indigo-800/40 text-indigo-400 px-2 py-0.5 rounded text-[11px] font-bold">
        {paceDetails.pace}
      </div>
      <span className="text-zinc-700 text-[9px] hidden md:inline">({paceDetails.rhythmDescription})</span>
    </div>
  );
};

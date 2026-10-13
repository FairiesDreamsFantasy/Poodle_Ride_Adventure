import React from 'react';
import { GameState } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { getDirectionLabel } from './General';

interface CompassProps {
  gameState: GameState;
}

export const Compass: React.FC<CompassProps> = ({ gameState }) => {
  const rot = gameState.poodleRotation ?? 0;
  const label = getDirectionLabel(rot);

  return (
    <div id="hud-compass" className="font-mono text-xs text-zinc-400 bg-black/40 border border-zinc-800/50 rounded px-2.5 py-1.5 backdrop-blur-sm flex items-center gap-2">
      <span className="text-zinc-600 font-bold uppercase tracking-wider text-[10px]">Heading:</span>
      <div id="hud-compass-value-group" className="flex items-center gap-1.5 bg-zinc-900/50 px-2 py-0.5 rounded border border-zinc-850">
        <span className="text-emerald-400 font-bold text-[11px]">{label}</span>
        <span className="text-zinc-500">|</span>
        <span className="text-zinc-200">{Math.round(rot)}°</span>
      </div>
    </div>
  );
};

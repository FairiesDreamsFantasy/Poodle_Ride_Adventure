import React from 'react';
import { GameState } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { DEFAULT_POSITION_CONFIG } from './General';

interface PositionInformationProps {
  gameState: GameState;
}

export const PositionInformation: React.FC<PositionInformationProps> = ({ gameState }) => {
  const x = gameState.poodleX?.toFixed(DEFAULT_POSITION_CONFIG.precision) ?? '0.00';
  const y = gameState.poodleY?.toFixed(DEFAULT_POSITION_CONFIG.precision) ?? '0.00';
  const rotation = gameState.poodleRotation ?? 0;

  return (
    <div id="hud-position-info" className="font-mono text-xs text-zinc-400 bg-black/40 border border-zinc-800/50 rounded px-2.5 py-1.5 backdrop-blur-sm flex items-center gap-4">
      <div id="hud-pos-x-group" className="flex gap-1">
        <span className="text-zinc-600 font-bold">X:</span>
        <span className="text-zinc-200">{x}</span>
      </div>
      <div id="hud-pos-y-group" className="flex gap-1">
        <span className="text-zinc-600 font-bold">Y:</span>
        <span className="text-zinc-200">{y}</span>
      </div>
      <div id="hud-pos-rot-group" className="flex gap-1 border-l border-zinc-850 pl-3">
        <span className="text-zinc-600 font-bold">ROT:</span>
        <span className="text-zinc-200">{rotation.toFixed(0)}°</span>
      </div>
    </div>
  );
};

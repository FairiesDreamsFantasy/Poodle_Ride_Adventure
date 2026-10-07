import React from 'react';
import { GameState } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { DEFAULT_SPEEDOMETER_CONFIG } from './General';

interface SpeedometerProps {
  gameState: GameState;
}

export const Speedometer: React.FC<SpeedometerProps> = ({ gameState }) => {
  const speed = gameState.poodleSpeed ?? 0;
  const percentage = Math.min(100, (speed / DEFAULT_SPEEDOMETER_CONFIG.maxSpeed) * 100);

  return (
    <div id="hud-speedometer" className="font-mono text-xs text-zinc-400 bg-black/40 border border-zinc-800/50 rounded px-2.5 py-1.5 backdrop-blur-sm flex flex-col gap-1 min-w-[120px]">
      <div id="hud-speedometer-label-group" className="flex justify-between items-center">
        <span className="text-zinc-600 font-bold uppercase tracking-wider text-[10px]">Speed</span>
        <span className="text-zinc-200 font-bold">{speed.toFixed(1)} {DEFAULT_SPEEDOMETER_CONFIG.unit}</span>
      </div>
      <div id="hud-speedometer-bar-bg" className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
        <div 
          id="hud-speedometer-bar-fill" 
          className="h-full bg-indigo-500 rounded-full transition-all duration-100 shadow-[0_0_8px_rgba(99,102,241,0.5)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

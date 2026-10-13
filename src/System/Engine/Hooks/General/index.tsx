import React from 'react';
import { GameState } from '../../../AI/In-Game/Logic/GameLogic';
import { GameMovementSystem } from '../../Movement';

/**
 * Engine Hooks General Systems.
 */

export function useEngine() {
  // Placeholder for engine hooks
}

interface GameLoopProps {
  gameState: GameState;
}

export const GameLoopSystem: React.FC<GameLoopProps> = ({ gameState }) => {
  const isRunning = gameState.isPlaying && !gameState.isPaused;
  const loopMode = gameState.isBetaEnabled ? 'Beta Physics' : 'Stable Frame-Lock';

  return (
    <div id="game-loop-system-panel" className="bg-zinc-950 border border-zinc-850 p-4 rounded-xl space-y-4 shadow-xl">
      <div id="loop-header" className="flex justify-between items-center border-b border-zinc-800 pb-2">
        <h3 id="loop-system-title" className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold font-mono">Engine Game Loop</h3>
        <span 
          id="loop-status-badge" 
          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
            isRunning ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30' : 'bg-red-950/40 text-red-400 border border-red-500/30'
          }`}
        >
          {isRunning ? 'RUNNING' : 'STOPPED'}
        </span>
      </div>
      
      <div id="loop-stats-rows" className="space-y-1.5 text-xs font-mono text-zinc-400">
        <div id="loop-mode-row" className="flex justify-between">
          <span>Loop Mode:</span>
          <span id="val-loop-mode" className="text-zinc-200 font-bold">{loopMode}</span>
        </div>
        <div id="loop-fps-row" className="flex justify-between">
          <span>Target Rate:</span>
          <span id="val-loop-rate" className="text-zinc-200">60 FPS</span>
        </div>
      </div>

      <div id="loop-movement-wrapper">
        <GameMovementSystem gameState={gameState} />
      </div>
    </div>
  );
};

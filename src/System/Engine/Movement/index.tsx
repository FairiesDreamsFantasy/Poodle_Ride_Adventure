import React from 'react';
import { GameState } from '../../AI/In-Game/Logic/GameLogic';

/**
 * Movement Engine Systems.
 */

interface GameMovementProps {
  gameState: GameState;
}

export * from './Collision';
export const GameMovementSystem: React.FC<GameMovementProps> = ({ gameState }) => {
  const mode = gameState.movementMode || 'Walk';
  const speed = gameState.speed || 0;
  const rotation = gameState.rotation || 0;
  const facingDir = gameState.direction || 'North';

  return (
    <div id="game-movement-hud" className="bg-zinc-950/80 border border-zinc-800 p-4 rounded-xl space-y-2">
      <h3 id="movement-system-title" className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Movement Mechanics</h3>
      <div id="movement-specs-grid" className="grid grid-cols-2 gap-2 text-xs font-mono">
        <div id="move-spec-mode" className="text-zinc-400">
          Mode: <span id="val-move-mode" className="text-pink-500 font-bold">{mode}</span>
        </div>
        <div id="move-spec-speed" className="text-zinc-400">
          Speed: <span id="val-move-speed" className="text-emerald-400 font-bold">{speed.toFixed(1)}</span>
        </div>
        <div id="move-spec-pos" className="text-zinc-400 col-span-2">
          Position: <span id="val-move-coords" className="text-amber-400 font-bold">({gameState.gridX.toFixed(1)}, {gameState.gridY.toFixed(1)})</span>
        </div>
        <div id="move-spec-rot" className="text-zinc-400">
          Rotation: <span id="val-move-rot" className="text-indigo-400 font-bold">{rotation.toFixed(0)}°</span>
        </div>
        <div id="move-spec-facing" className="text-zinc-400">
          Facing: <span id="val-move-facing" className="text-sky-400 font-bold">{facingDir}</span>
        </div>
      </div>
    </div>
  );
};

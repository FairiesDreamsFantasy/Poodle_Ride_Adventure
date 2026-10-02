import React from 'react';
import { GameState } from '../../../../../Engine/Core/Types';
import { DIRECTIONS } from '../../../../../Engine/Core/Constants';
import { getSpeedDescription, getMeasurementDescription } from '../../../../../Engine/Science/Physics/Measurements';

interface ClassicCraftedHUDProps {
  gameState: GameState;
}

export const ClassicCraftedHUD: React.FC<ClassicCraftedHUDProps> = ({ gameState }) => {
  const m = (val: number, type: 'distance' | 'longDistance' | 'smallDistance' | 'height') => 
    getMeasurementDescription(val, gameState.measurementSystem, type);

  const scientificSpeed = getSpeedDescription(gameState.speed, gameState.measurementSystem);

  return (
    <div id="classic-crafted-hud" className="bg-stone-900/80 border-2 border-stone-700 p-4 rounded-xl mb-4 font-mono text-xs space-y-1 w-full max-w-4xl mx-auto shadow-2xl backdrop-blur-md">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <p className="text-stone-500 uppercase text-[10px]">Location</p>
          <p className="text-white font-bold">{gameState.area}</p>
        </div>
        <div className="space-y-1">
          <p className="text-stone-500 uppercase text-[10px]">Position (X, Y)</p>
          <p className="text-white font-bold">
            {m(Math.round(gameState.gridX), 'distance')}, {m(Math.round(gameState.gridY), 'distance')}
          </p>
        </div>
        <div className="space-y-1 relative">
          <p className="text-stone-500 uppercase text-[10px]">Speed / Movement</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-600 font-bold">0</span>
            <div className="h-1 flex-1 bg-stone-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-pink-500"
                style={{ width: `${Math.min((gameState.speed / 600) * 100, 100)}%` }}
              />
            </div>
            <p className="text-white font-bold whitespace-nowrap">{scientificSpeed}</p>
          </div>
          <p className="text-[10px] text-stone-400 italic">{gameState.isStrafingEnabled ? 'Strafe' : 'Ride'} Mode</p>
        </div>
        <div className="space-y-1">
          <p className="text-stone-500 uppercase text-[10px]">Facing</p>
          <p className="text-white font-bold">{DIRECTIONS[Math.round(gameState.rotation / 45) % 8] || 'North'}</p>
        </div>
      </div>
      {gameState.showDiagnostics && (
        <div className="mt-4 pt-2 border-t border-white/5 grid grid-cols-2 md:grid-cols-3 gap-2 opacity-60">
           <p>State: {gameState.isPaused ? 'PAUSED' : 'ACTIVE'}</p>
           <p>Units: {gameState.measurementSystem}</p>
           <p>Layout: {gameState.keyboardLayout}</p>
        </div>
      )}
    </div>
  );
};

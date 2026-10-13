import React from 'react';

export const BlackOwnedStatement: React.FC = () => {
  return (
    <div 
      className="mt-4 p-4 border-2 border-stone-800 rounded-lg flex items-center gap-4 bg-stone-900/30"
      role="img"
      aria-label="Black-developed Game - Officially Rastafarian by design as a work of art"
      id="black-owned-statement"
    >
      <div className="flex flex-col w-8 h-12 border border-stone-700 overflow-hidden rounded-sm shrink-0">
        <div className="flex-1 bg-[#E70000]"></div>
        <div className="flex-1 bg-[#FFD700]"></div>
        <div className="flex-1 bg-[#008542]"></div>
      </div>
      <div>
        <p className="text-stone-300 font-bold">Black-developed Game</p>
        <p className="text-stone-500 text-xs italic">This game is officially Rastafarian by design as a work of art.</p>
      </div>
    </div>
  );
};

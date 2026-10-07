import React from 'react';


export function GeneralHeader({ 
  setGameState,
  onGoToLanding 
}: { 
  setGameState?: (updater: (prev: any) => any) => void;
  onGoToLanding?: () => void;
}) {
  const handleClick = () => {
    if (onGoToLanding) {
      onGoToLanding();
    } else if (setGameState) {
      setGameState(prev => ({ ...prev, isPlaying: false, area: 'Level_0' }));
    }
  };

  return (
    <div id="general-header-inner" className="flex items-center gap-4">

      <div id="header-text-container">
        <h1 id="header-game-title" className="text-3xl font-bold tracking-tight">
          <button 
            id="header-title-button"
            onClick={handleClick}
            className="text-pink-500 hover:text-pink-400 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500 rounded px-1"
            title="Return to Landing Page"
          >
            Poodle Ride Adventure
          </button>
        </h1>
        <div id="header-badge-container" className="flex items-center gap-2">
          <span id="header-babylon-badge" className="px-2 py-0.5 bg-emerald-900/30 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/20 tracking-widest uppercase">
            Babylon-Free
          </span>
        </div>
      </div>
    </div>
  );
}

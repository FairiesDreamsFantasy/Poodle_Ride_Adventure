import React from 'react';
import { Eye, Keyboard } from 'lucide-react';
import { GameState } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { VIEW_OPTIONS } from './General';

interface ViewMenuProps {
  gameState: GameState;
  showGrid: boolean;
  onToggleGrid: () => void;
  onToggleCoordinates: () => void;
  onOpenKeyboardModal: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
  onUpdateGameState?: (updater: (prev: GameState) => GameState) => void;
}

export const ViewMenu: React.FC<ViewMenuProps> = ({
  gameState,
  showGrid,
  onToggleGrid,
  onToggleCoordinates,
  onOpenKeyboardModal,
  isOpen,
  onToggleOpen,
  onUpdateGameState
}) => {
  return (
    <div id="menu-view-container" className="relative">
      <button
        id="menu-view-btn"
        onClick={onToggleOpen}
        className={`px-3 py-1 text-xs font-mono rounded border transition-all uppercase flex items-center gap-1.5 ${
          isOpen
            ? 'bg-zinc-800 border-zinc-600 text-white'
            : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
        }`}
        aria-expanded={isOpen}
      >
        <Eye size={12} id="menu-view-icon" />
        <span>View</span>
      </button>

      {isOpen && (
        <div id="menu-view-dropdown" className="absolute top-[120%] left-0 w-60 bg-black border border-zinc-800 shadow-2xl z-50 py-1.5 rounded-md animate-in fade-in duration-100">
          <button
            id="menu-view-opt-keyboard"
            onClick={() => { onOpenKeyboardModal(); onToggleOpen(); }}
            className="w-full text-left px-3 py-2 hover:bg-zinc-900 text-xs font-mono text-zinc-300 flex items-center gap-2 uppercase tracking-wide"
          >
            <Keyboard size={12} className="text-zinc-500" />
            <span>Keyboard Commands</span>
          </button>

          <div id="menu-view-sep" className="border-t border-zinc-800 my-1" />
          <button
            id="menu-view-opt-header"
            onClick={() => {
              if (onUpdateGameState) {
                onUpdateGameState(prev => ({ ...prev, isHeaderVisible: !prev.isHeaderVisible }));
              }
              onToggleOpen();
            }}
            className={`w-full text-left px-3 py-2 hover:bg-zinc-900 text-xs font-mono flex justify-between items-center uppercase tracking-wide ${
              gameState.isHeaderVisible ? 'text-white font-bold' : 'text-zinc-500'
            }`}
          >
            <span>Header</span>
            {gameState.isHeaderVisible && <div id="menu-view-header-indicator" className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />}
          </button>

          <button
            id="menu-view-opt-map"
            onClick={() => { onToggleGrid(); onToggleOpen(); }}
            className={`w-full text-left px-3 py-2 hover:bg-zinc-900 text-xs font-mono flex justify-between items-center uppercase tracking-wide ${
              showGrid ? 'text-white font-bold' : 'text-zinc-500'
            }`}
          >
            <span>Map</span>
            {showGrid && <div id="menu-view-map-indicator" className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />}
          </button>

          <button
            id="menu-view-opt-coordinates"
            onClick={() => { onToggleCoordinates(); onToggleOpen(); }}
            className={`w-full text-left px-3 py-2 hover:bg-zinc-900 text-xs font-mono flex justify-between items-center uppercase tracking-wide ${
              gameState.useCoordinates ? 'text-white font-bold' : 'text-zinc-500'
            }`}
          >
            <span>X,Y</span>
            {gameState.useCoordinates && <div id="menu-view-coords-indicator" className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />}
          </button>
        </div>
      )}
    </div>
  );
};

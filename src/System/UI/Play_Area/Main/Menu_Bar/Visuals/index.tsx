import React from 'react';
import { Monitor } from 'lucide-react';
import { GameState } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { VISUAL_OPTIONS } from './General';

interface VisualsMenuProps {
  gameState: GameState;
  onUpdateVisualPrefs: (pref: GameState['visualPrefs']) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const VisualsMenu: React.FC<VisualsMenuProps> = ({
  gameState,
  onUpdateVisualPrefs,
  isOpen,
  onToggleOpen
}) => {
  return (
    <div id="menu-visuals-container" className="relative">
      <button
        id="menu-visuals-btn"
        onClick={onToggleOpen}
        className={`px-3 py-1 text-xs font-mono rounded border transition-all uppercase flex items-center gap-1.5 ${
          isOpen
            ? 'bg-zinc-800 border-zinc-600 text-white'
            : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
        }`}
        aria-expanded={isOpen}
      >
        <Monitor size={12} id="menu-visuals-icon" />
        <span>Visuals Mode</span>
      </button>

      {isOpen && (
        <div id="menu-visuals-dropdown" className="absolute top-[120%] left-0 w-60 bg-black border border-zinc-800 shadow-2xl z-50 py-1.5 rounded-md animate-in fade-in duration-100">
          {VISUAL_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              id={`menu-visual-opt-${opt.key}`}
              onClick={() => { onUpdateVisualPrefs(opt.key as any); onToggleOpen(); }}
              className={`w-full text-left px-3 py-2 hover:bg-zinc-900 text-xs font-mono flex justify-between items-center uppercase tracking-wide ${
                gameState.visualPrefs === opt.key ? 'text-white font-bold' : 'text-zinc-500'
              }`}
            >
              <span>{opt.label}</span>
              {gameState.visualPrefs === opt.key && (
                <div id={`menu-visual-indicator-${opt.key}`} className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Keyboard } from 'lucide-react';
import { GameState } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { LAYOUT_OPTIONS } from './General';

interface LayoutsMenuProps {
  gameState: GameState;
  onUpdateKeyboardLayout: (layout: GameState['keyboardLayout']) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const LayoutsMenu: React.FC<LayoutsMenuProps> = ({
  gameState,
  onUpdateKeyboardLayout,
  isOpen,
  onToggleOpen
}) => {
  return (
    <div id="menu-layouts-container" className="relative">
      <button
        id="menu-layouts-btn"
        onClick={onToggleOpen}
        className={`px-3 py-1 text-xs font-mono rounded border transition-all uppercase flex items-center gap-1.5 ${
          isOpen
            ? 'bg-zinc-800 border-zinc-600 text-white'
            : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
        }`}
        aria-expanded={isOpen}
      >
        <Keyboard size={12} id="menu-layouts-icon" />
        <span>Layouts</span>
      </button>

      {isOpen && (
        <div id="menu-layouts-dropdown" className="absolute top-[120%] left-0 w-60 bg-black border border-zinc-800 shadow-2xl z-50 py-1.5 rounded-md animate-in fade-in duration-100">
          {LAYOUT_OPTIONS.map((layout) => (
            <button
              key={layout.id}
              id={`menu-layout-opt-${layout.id.replace(/\s+/g, '-')}`}
              onClick={() => { onUpdateKeyboardLayout(layout.id as any); onToggleOpen(); }}
              className={`w-full text-left px-3 py-2 hover:bg-zinc-900 text-xs font-mono flex justify-between items-center uppercase tracking-wide ${
                gameState.keyboardLayout === layout.id ? 'text-white font-bold' : 'text-zinc-500'
              }`}
            >
              <span>{layout.name}</span>
              {gameState.keyboardLayout === layout.id && (
                <div id={`menu-layout-indicator-${layout.id.replace(/\s+/g, '-')}`} className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

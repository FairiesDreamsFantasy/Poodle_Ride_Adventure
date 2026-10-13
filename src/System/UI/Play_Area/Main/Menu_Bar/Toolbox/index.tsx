import React, { useState } from 'react';
import { Activity, Key, Palette, RefreshCw } from 'lucide-react';
import { GameState } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { CaptureScreenshotUtility } from './Capture_Screenshot';
import { InsertAIModal } from './Insert_AI_Modal';
import { ThemeSwitcherModal } from '../../../../../Modal/Theme_Switcher';
import { CheckForUpdatesModal } from './Check_For_Updates_Modal';

interface ToolboxMenuProps {
  gameState: GameState;
  onToggleDiagnostics: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const ToolboxMenu: React.FC<ToolboxMenuProps> = ({
  gameState,
  onToggleDiagnostics,
  isOpen,
  onToggleOpen
}) => {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isUpdatesModalOpen, setIsUpdatesModalOpen] = useState(false);
  const hasAIKey = !!localStorage.getItem('GEMINI_API_KEY');

  return (
    <div id="menu-toolbox-container" className="relative">
      <button
        id="menu-toolbox-btn"
        onClick={onToggleOpen}
        className={`px-3 py-1 text-xs font-mono rounded border transition-all uppercase flex items-center gap-1.5 ${
          isOpen
            ? 'bg-zinc-800 border-zinc-600 text-white shadow-[0_0_12px_rgba(255,255,255,0.05)]'
            : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
        }`}
        aria-expanded={isOpen}
      >
        <Activity size={12} id="menu-toolbox-icon" />
        <span>Toolbox</span>
      </button>

      {isOpen && (
        <div id="menu-toolbox-dropdown" className="absolute top-[120%] left-0 w-64 bg-black border border-zinc-800 shadow-2xl z-50 py-2 rounded-md animate-in fade-in duration-100 flex flex-col gap-1.5">
          <div id="toolbox-diagnostics-section" className="px-1 border-b border-zinc-900 pb-1.5">
            <button
              id="menu-toolbox-opt-diagnostics"
              onClick={() => { onToggleDiagnostics(); onToggleOpen(); }}
              className={`w-full text-left px-3 py-2 rounded hover:bg-zinc-900 text-xs font-mono flex justify-between items-center uppercase tracking-wide transition-colors ${
                gameState.showDiagnostics ? 'text-white font-bold' : 'text-zinc-500'
              }`}
            >
              <span>Diagnostics Hide/Show</span>
              {gameState.showDiagnostics && (
                <div id="menu-toolbox-diagnostics-indicator" className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              )}
            </button>
          </div>

          <div id="toolbox-updates-section" className="px-1 border-b border-zinc-900 pb-1.5">
            <button
              id="menu-toolbox-opt-check-updates"
              onClick={() => { setIsUpdatesModalOpen(true); onToggleOpen(); }}
              className="w-full text-left px-3 py-2 rounded hover:bg-zinc-900 text-xs font-mono flex justify-between items-center uppercase tracking-wide transition-colors text-cyan-400 hover:text-cyan-300"
            >
              <div className="flex items-center gap-2">
                <RefreshCw size={12} />
                <span>Check For Updates</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-bold">ARCADE</span>
            </button>
          </div>

          <div id="toolbox-theme-section" className="px-1 border-b border-zinc-900 pb-1.5">
            <button
              id="menu-toolbox-opt-switch-theme"
              onClick={() => { setIsThemeModalOpen(true); onToggleOpen(); }}
              className="w-full text-left px-3 py-2 rounded hover:bg-zinc-900 text-xs font-mono flex justify-between items-center uppercase tracking-wide transition-colors text-amber-400 hover:text-amber-300"
            >
              <div className="flex items-center gap-2">
                <Palette size={12} />
                <span>Switch Theme</span>
              </div>
            </button>
          </div>

          <div id="toolbox-ai-section" className="px-1 border-b border-zinc-900 pb-1.5">
            <button
              id="menu-toolbox-opt-insert-ai"
              onClick={() => { setIsAIModalOpen(true); onToggleOpen(); }}
              className="w-full text-left px-3 py-2 rounded hover:bg-zinc-900 text-xs font-mono flex justify-between items-center uppercase tracking-wide transition-colors text-emerald-400 hover:text-emerald-300"
            >
              <div className="flex items-center gap-2">
                <Key size={12} />
                <span>{hasAIKey ? 'Edit AI' : 'Insert AI'}</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-bold">
                {hasAIKey ? 'SET' : 'OPTIONAL'}
              </span>
            </button>
          </div>

          <div id="toolbox-screenshot-section" className="px-1">
            <CaptureScreenshotUtility />
          </div>
        </div>
      )}

      <CheckForUpdatesModal
        isOpen={isUpdatesModalOpen}
        onClose={() => setIsUpdatesModalOpen(false)}
      />

      <InsertAIModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
      />

      <ThemeSwitcherModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />
    </div>
  );
};


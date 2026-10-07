import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { GameState } from '../../../AI/In-Game/Logic/GameLogic';
import { SynthMode } from '../../../../types';

// Import modular components
import { LayoutsMenu } from '../../../UI/Play_Area/Main/Menu_Bar/Layouts';
import { SoundMenu } from '../../../UI/Play_Area/Main/Menu_Bar/Sound';
import { AccessibilityMenu } from '../../../UI/Play_Area/Main/Menu_Bar/Accessibility';
import { Rabbit as DogIcon } from 'lucide-react';
import { VisualsMenu } from '../../../UI/Play_Area/Main/Menu_Bar/Visuals';
import { ViewMenu } from '../../../UI/Play_Area/Main/Menu_Bar/View';
import { ToolboxMenu } from '../../../UI/Play_Area/Main/Menu_Bar/Toolbox';

interface PlayAreaMenuBarProps {
  gameState: GameState;
  onToggleMute: () => void;
  selectedSynth: SynthMode;
  onUpdateSynth: (synth: SynthMode) => void;
  onUpdateNotifications: (notifs: GameState['notifications']) => void;
  onUpdateVisualPrefs: (pref: GameState['visualPrefs']) => void;
  onUpdateKeyboardLayout: (layout: GameState['keyboardLayout']) => void;
  onToggleCoordinates: () => void;
  onToggleDiagnostics: () => void;
  showGrid: boolean;
  setGameState?: (updater: (prev: GameState) => GameState) => void;
  onGoToLanding?: () => void;
  isHeaderVisible?: boolean;
  onToggleGrid: () => void;
  onOpenKeyboardModal: () => void;
  onToggleSurroundSound: () => void;
}

export const PlayAreaMenuBar: React.FC<PlayAreaMenuBarProps> = ({
  gameState,
  onToggleMute,
  selectedSynth,
  onUpdateSynth,
  onUpdateNotifications,
  onUpdateVisualPrefs,
  onUpdateKeyboardLayout,
  onToggleCoordinates,
  onToggleDiagnostics,
  showGrid,
  onToggleGrid,
  onOpenKeyboardModal,
  onToggleSurroundSound,
  setGameState,
  onGoToLanding,
  isHeaderVisible,
}) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  if (!isExpanded) {
    return (
      <div id="collapsed-menu-trigger" className="relative mt-4 ml-4 z-[100] mb-[3%]">
        <button
          id="expand-menu-btn"
          onClick={() => setIsExpanded(true)}
          className="p-3 bg-black/85 border border-zinc-850 text-zinc-400 hover:text-white rounded-lg backdrop-blur-sm transition-all active:scale-95 flex items-center gap-2 group shadow-lg"
          aria-label="Expand Control Hub"
        >
          <ChevronDown size={18} className="-rotate-90 group-hover:translate-x-0.5 transition-transform" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest pr-1">Control Hub</span>
        </button>
      </div>
    );
  }

  return (
    <div id="play-area-menu-bar" className="relative w-full h-14 bg-black/70 backdrop-blur-md text-white z-50 border-b border-zinc-800/60 font-sans select-none flex items-center justify-center mb-[3%]">
      <div id="menu-bar-inner-flex" className="flex items-center gap-3 px-4 py-2">
        
        {!isHeaderVisible && (
          <button
            onClick={onGoToLanding}
            className="w-8 h-8 mr-2 bg-pink-600 hover:bg-pink-500 rounded-full flex items-center justify-center border-2 border-white transition-transform active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-500"
            title="Return to Landing Page"
            aria-label="Return to Landing Page"
          >
            <DogIcon className="text-white w-5 h-5" />
          </button>
        )}

        {/* Collapse Toggle */}
        <button 
          id="collapse-menu-btn"
          onClick={() => setIsExpanded(false)}
          className="p-2 text-zinc-500 hover:text-white transition-colors mr-1"
          aria-label="Collapse Menu"
        >
          <ChevronDown size={16} className="rotate-180" />
        </button>

        {/* Layouts Menu */}
        <LayoutsMenu 
          gameState={gameState} 
          onUpdateKeyboardLayout={onUpdateKeyboardLayout} 
          isOpen={openMenu === 'layouts'}
          onToggleOpen={() => toggleMenu('layouts')}
        />

        {/* Sound Menu */}
        <SoundMenu 
          gameState={gameState}
          onToggleMute={onToggleMute}
          selectedSynth={selectedSynth}
          onUpdateSynth={onUpdateSynth}
          onToggleSurroundSound={onToggleSurroundSound}
          isOpen={openMenu === 'sound'}
          onToggleOpen={() => toggleMenu('sound')}
        />

        {/* Accessibility Menu */}
        <AccessibilityMenu 
          gameState={gameState}
          onUpdateNotifications={onUpdateNotifications}
          onUpdateGameState={setGameState}
          isOpen={openMenu === 'accessibility'}
          onToggleOpen={() => toggleMenu('accessibility')}
        />

        {/* Visuals Menu */}
        <VisualsMenu 
          gameState={gameState}
          onUpdateVisualPrefs={onUpdateVisualPrefs}
          isOpen={openMenu === 'visuals'}
          onToggleOpen={() => toggleMenu('visuals')}
        />

        {/* View Menu */}
        <ViewMenu 
          gameState={gameState}
          showGrid={showGrid}
          onToggleGrid={onToggleGrid}
          onToggleCoordinates={onToggleCoordinates}
          onOpenKeyboardModal={onOpenKeyboardModal}
          onUpdateGameState={setGameState}
          isOpen={openMenu === 'view'}
          onToggleOpen={() => toggleMenu('view')}
        />

        {/* Toolbox Menu */}
        <ToolboxMenu 
          gameState={gameState}
          onToggleDiagnostics={onToggleDiagnostics}
          isOpen={openMenu === 'toolbox'}
          onToggleOpen={() => toggleMenu('toolbox')}
        />

      </div>
    </div>
  );
};

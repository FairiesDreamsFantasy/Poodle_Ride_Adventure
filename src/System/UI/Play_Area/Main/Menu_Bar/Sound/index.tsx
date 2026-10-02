import React from 'react';
import { Volume2 } from 'lucide-react';
import { GameState } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { SynthMode } from '../../../../../../types';
import { SYNTH_MODES } from './General';

interface SoundMenuProps {
  gameState: GameState;
  onToggleMute: () => void;
  selectedSynth: SynthMode;
  onUpdateSynth: (synth: SynthMode) => void;
  onToggleSurroundSound: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const SoundMenu: React.FC<SoundMenuProps> = ({
  gameState,
  onToggleMute,
  selectedSynth,
  onUpdateSynth,
  onToggleSurroundSound,
  isOpen,
  onToggleOpen
}) => {
  return (
    <div id="menu-sound-container" className="relative">
      <button
        id="menu-sound-btn"
        onClick={onToggleOpen}
        className={`px-3 py-1 text-xs font-mono rounded border transition-all uppercase flex items-center gap-1.5 ${
          isOpen
            ? 'bg-zinc-800 border-zinc-600 text-white'
            : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
        }`}
        aria-expanded={isOpen}
      >
        <Volume2 size={12} id="menu-sound-icon" />
        <span>Sound</span>
      </button>

      {isOpen && (
        <div id="menu-sound-dropdown" className="absolute top-[120%] left-0 w-64 bg-black border border-zinc-800 shadow-2xl z-50 py-2 rounded-md animate-in fade-in duration-100 flex flex-col gap-1">
          <div id="menu-sound-audio-toggles" className="px-3 py-1 flex flex-col gap-1.5 border-b border-zinc-800 pb-2 mb-1.5">
            <button
              id="menu-sound-opt-mute"
              onClick={() => { onToggleMute(); onToggleOpen(); }}
              className={`w-full text-left px-3 py-1.5 rounded text-xs font-mono flex justify-between items-center uppercase tracking-wider font-bold transition-all ${
                gameState.isMuted
                  ? 'bg-yellow-400 text-black'
                  : 'bg-indigo-700 text-white border border-blue-500'
              }`}
            >
              <span>Audio Mute</span>
              <span id="menu-sound-val-mute" className="text-[10px]">{gameState.isMuted ? 'ON' : 'OFF'}</span>
            </button>

            <button
              id="menu-sound-opt-surround"
              onClick={() => { onToggleSurroundSound(); onToggleOpen(); }}
              className={`w-full text-left px-3 py-1.5 rounded text-xs font-mono flex justify-between items-center uppercase tracking-wider font-bold transition-all ${
                gameState.isSurroundSoundEnabled
                  ? 'bg-yellow-400 text-black'
                  : 'bg-indigo-700 text-white border border-blue-500'
              }`}
            >
              <span>Surround Sound</span>
              <span id="menu-sound-val-surround" className="text-[10px]">{gameState.isSurroundSoundEnabled ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          <div id="menu-sound-synth-title" className="px-3 pb-1 text-[9px] text-zinc-500 uppercase tracking-widest font-bold font-mono">Synthesizer Engine</div>
          {SYNTH_MODES.map((mode) => (
            <button
              key={mode.id}
              id={`menu-sound-opt-synth-${mode.id.replace(/\s+/g, '-')}`}
              onClick={() => { onUpdateSynth(mode.id); onToggleOpen(); }}
              className={`w-full text-left px-4 py-1.5 hover:bg-zinc-900 text-xs font-mono flex justify-between items-center uppercase tracking-wide ${
                selectedSynth === mode.id ? 'text-white font-bold' : 'text-zinc-500'
              }`}
            >
              <span>{mode.label}</span>
              {selectedSynth === mode.id && (
                <div id={`menu-sound-synth-indicator-${mode.id.replace(/\s+/g, '-')}`} className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { 
  ChevronDown, 
  Music, 
  Monitor, 
  Settings, 
  Keyboard,
  Bell,
  Map as MapIcon
} from 'lucide-react';
import { GameState } from '../../../../InputTypes';
import { SynthMode } from '../../../../AI/In-Game/Logic/GameLogic';

const MenuBarItem: React.FC<{ 
  label: string; 
  icon?: React.ReactNode; 
  isOpen: boolean; 
  onClick: () => void; 
  children: React.ReactNode 
}> = ({ label, icon, isOpen, onClick, children }) => (
  <div className="relative h-full flex items-center">
    <button 
      onClick={onClick}
      className={`px-4 py-1.5 rounded-md border transition-all uppercase text-[10px] font-bold tracking-widest flex items-center gap-2 ${
        isOpen 
          ? 'bg-zinc-800 border-zinc-600 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
          : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
      }`}
      aria-expanded={isOpen}
      aria-label={`${label} Menu`}
    >
      {label}
      <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    {isOpen && (
      <div className="absolute top-[120%] left-0 w-64 bg-black border border-zinc-800 shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2">
        <div className="px-4 py-2 border-b border-zinc-800 text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">
          {label} Preferences
        </div>
        {children}
      </div>
    )}
  </div>
);

interface PlayAreaMenuBarProps {
  gameState: GameState;
  onToggleMute: () => void;
  selectedSynth: SynthMode;
  onUpdateSynth: (synth: SynthMode) => void;
  onUpdateNotifications: (notifs: GameState['notifications']) => void;
  onUpdateVisualPrefs: (pref: GameState['visualPrefs']) => void;
  onUpdateKeyboardLayout: (layout: GameState['keyboardLayout']) => void;
  onToggleCoordinates: () => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  onOpenKeyboardModal: () => void;
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
  showGrid,
  onToggleGrid,
  onOpenKeyboardModal
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  if (!isExpanded) {
    return (
      <div className="relative mt-4 ml-4 z-[100] mb-[3%]">
        <button
          onClick={() => setIsExpanded(true)}
          className="p-3 bg-black/80 border border-zinc-800 text-zinc-400 hover:text-white rounded-lg backdrop-blur-sm transition-all active:scale-95 flex items-center gap-2 group"
          aria-label="Expand Control Hub"
        >
          <ChevronDown size={18} className="-rotate-90 group-hover:translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-widest pr-2">Control Hub</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-14 bg-black/60 backdrop-blur-md text-white z-50 border-b border-zinc-800/50 font-sans select-none flex items-center justify-center mb-[3%]">
      <div className="flex items-center gap-2 px-4 py-2">
        
        {/* Collapse Toggle */}
        <button 
          onClick={() => setIsExpanded(false)}
          className="p-2 text-zinc-600 hover:text-white transition-colors mr-2"
          aria-label="Collapse Menu"
        >
          <ChevronDown size={16} className="rotate-180" />
        </button>

        {/* Layouts Menu */}
        <MenuBarItem label="Layouts" isOpen={openMenu === 'layouts'} onClick={() => toggleMenu('layouts')}>
          {(['Cedella', 'Standard', 'Arden Denis'] as any[]).map(l => (
            <button 
              key={l} 
              onClick={() => { onUpdateKeyboardLayout(l); setOpenMenu(null); }} 
              className={`w-full text-left px-4 py-2 hover:bg-zinc-900 text-[11px] flex justify-between items-center uppercase tracking-wider ${gameState.keyboardLayout === l ? 'text-white font-bold' : 'text-zinc-500'}`}
            >
              <span>{l} Profile</span>
              {gameState.keyboardLayout === l && <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />}
            </button>
          ))}
        </MenuBarItem>

        {/* Synthesizer Menu */}
        <MenuBarItem label="Synthesizer" isOpen={openMenu === 'synth'} onClick={() => toggleMenu('synth')}>
          {(['Classic', 'Advanced Yamaha', 'Mix'] as any[]).map(s => (
            <button 
              key={s} 
              onClick={() => { onUpdateSynth(s); setOpenMenu(null); }} 
              className={`w-full text-left px-4 py-2 hover:bg-zinc-900 text-[11px] flex justify-between items-center uppercase tracking-wider ${selectedSynth === s ? 'text-white font-bold' : 'text-zinc-500'}`}
            >
              <span>{s} Engine</span>
              {selectedSynth === s && <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />}
            </button>
          ))}
        </MenuBarItem>

        {/* Notifications Menu */}
        <MenuBarItem label="Notifications" isOpen={openMenu === 'notifs'} onClick={() => toggleMenu('notifs')}>
          <button 
            onClick={() => onUpdateNotifications({ ...gameState.notifications, bark: !gameState.notifications.bark })} 
            className="w-full text-left px-4 py-2 hover:bg-zinc-900 text-[11px] flex justify-between items-center uppercase tracking-wider"
          >
            <span>Bark Alerts (Shift-1)</span>
            <span className={gameState.notifications.bark ? 'text-emerald-500' : 'text-zinc-600'}>{gameState.notifications.bark ? 'ENABLED' : 'DISABLED'}</span>
          </button>
          <button 
            onClick={() => onUpdateNotifications({ ...gameState.notifications, jump: !gameState.notifications.jump })} 
            className="w-full text-left px-4 py-2 hover:bg-zinc-900 text-[11px] flex justify-between items-center uppercase tracking-wider"
          >
            <span>Jump Alerts (Shift-2)</span>
            <span className={gameState.notifications.jump ? 'text-emerald-500' : 'text-zinc-600'}>{gameState.notifications.jump ? 'ENABLED' : 'DISABLED'}</span>
          </button>
        </MenuBarItem>

        {/* Visuals Menu */}
        <MenuBarItem label="Visuals" icon={<Monitor size={14} />} isOpen={openMenu === 'visual'} onClick={() => toggleMenu('visual')}>
          {[
            { key: 'Auto', label: 'Auto Sense (3D/2D)' },
            { key: '2D', label: '2D Mode' },
            { key: 'Simulated3D', label: 'Simulated 3D' },
            { key: '3D', label: '3D (Lightweight)' },
            { key: 'Hybrid', label: '3D Hybrid' },
            { key: '3DPlus', label: '3D+' },
            { key: 'Super3D', label: 'Super 3D (16GB+ RAM)' },
            { key: 'Active3D', label: 'Active 3D (Masterpiece)' }
          ].map(({ key, label }) => (
            <button 
              key={key} 
              onClick={() => { onUpdateVisualPrefs(key as any); setOpenMenu(null); }} 
              className={`w-full text-left px-4 py-2 hover:bg-zinc-900 text-[11px] flex justify-between items-center uppercase tracking-wider ${gameState.visualPrefs === key ? 'text-white font-bold' : 'text-zinc-500'}`}
              aria-label={`Select ${label} Rendering`}
            >
              <span>{label}</span>
              {gameState.visualPrefs === key && <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />}
            </button>
          ))}
        </MenuBarItem>

        {/* View Menu */}
        <MenuBarItem label="View" isOpen={openMenu === 'view'} onClick={() => toggleMenu('view')}>
          <button 
            onClick={() => { onOpenKeyboardModal(); setOpenMenu(null); }} 
            className="w-full text-left px-4 py-2 hover:bg-zinc-900 text-[11px] flex items-center gap-2 uppercase tracking-wider"
          >
            <Keyboard size={12} className="text-zinc-500" />
            <span>Keyboard Commands</span>
          </button>
          <div className="border-t border-zinc-800 my-1" />
          <button 
            onClick={() => { onToggleMute(); setOpenMenu(null); }} 
            className="w-full text-left px-4 py-2 hover:bg-zinc-900 text-[11px] flex justify-between items-center uppercase tracking-wider"
          >
            <span>Audio Mute</span>
            <span className={gameState.isMuted ? 'text-red-500' : 'text-zinc-600'}>{gameState.isMuted ? 'ON' : 'OFF'}</span>
          </button>
        </MenuBarItem>

        {/* Action Set */}
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={onToggleGrid}
            className={`px-4 py-1.5 rounded-md border text-[10px] font-bold tracking-widest uppercase transition-all ${
              showGrid 
                ? 'bg-zinc-800 border-emerald-500/50 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]' 
                : 'bg-black border-zinc-800 text-zinc-500 hover:border-zinc-700'
            }`}
          >
            Map
          </button>
          <button
            onClick={onToggleCoordinates}
            className={`px-6 py-1.5 rounded-md border text-[10px] font-bold tracking-widest uppercase transition-all ${
              gameState.useCoordinates 
                ? 'bg-zinc-800 border-emerald-500/50 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]' 
                : 'bg-black border-zinc-800 text-zinc-500 hover:border-zinc-700'
            }`}
          >
            X,Y
          </button>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { Accessibility } from 'lucide-react';
import { GameState } from '../../../../../../System/AI/In-Game/Logic/GameLogic';
import { NOTIFICATION_OPTIONS } from './General';

interface AccessibilityMenuProps {
  gameState: GameState;
  onUpdateNotifications: (notifs: GameState['notifications']) => void;
  onUpdateGameState?: (updater: (prev: GameState) => GameState) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({
  gameState,
  onUpdateNotifications,
  onUpdateGameState,
  isOpen,
  onToggleOpen
}) => {
  return (
    <div id="menu-accessibility-container" className="relative">
      <button
        id="menu-accessibility-btn"
        onClick={onToggleOpen}
        className={`px-3 py-1 text-xs font-mono rounded border transition-all uppercase flex items-center gap-1.5 ${
          isOpen
            ? 'bg-zinc-800 border-zinc-600 text-white'
            : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
        }`}
        aria-expanded={isOpen}
      >
        <Accessibility size={12} id="menu-accessibility-icon" />
        <span>Accessibility</span>
      </button>

      {isOpen && (
        <div id="menu-accessibility-dropdown" className="absolute top-[120%] left-0 w-72 bg-black border border-zinc-800 shadow-2xl z-50 py-1.5 rounded-md animate-in fade-in duration-100 max-h-[80vh] overflow-y-auto">
          
          <div className="px-3 py-1 text-[10px] uppercase text-zinc-500 font-bold tracking-widest border-b border-zinc-800/50 mb-1">TTS</div>
          
          <button
            onClick={() => onUpdateGameState && onUpdateGameState(prev => ({ ...prev, isTTSEnabled: true, isLocalTTSEnabled: false }))}
            className="w-full text-left px-3 py-2 hover:bg-zinc-900 text-xs font-mono flex justify-between items-center uppercase tracking-wide text-zinc-400 hover:text-zinc-200"
          >
            <span>ON</span>
            <span className={gameState.isTTSEnabled && !gameState.isLocalTTSEnabled ? 'text-emerald-500 font-bold' : 'text-zinc-600'}>
              {gameState.isTTSEnabled && !gameState.isLocalTTSEnabled ? 'SELECTED' : ''}
            </span>
          </button>
          <button
            onClick={() => onUpdateGameState && onUpdateGameState(prev => ({ ...prev, isTTSEnabled: true, isLocalTTSEnabled: true }))}
            className="w-full text-left px-3 py-2 hover:bg-zinc-900 text-xs font-mono flex justify-between items-center uppercase tracking-wide text-zinc-400 hover:text-zinc-200"
          >
            <span>ON (as local TTS)</span>
            <span className={gameState.isTTSEnabled && gameState.isLocalTTSEnabled ? 'text-emerald-500 font-bold' : 'text-zinc-600'}>
              {gameState.isTTSEnabled && gameState.isLocalTTSEnabled ? 'SELECTED' : ''}
            </span>
          </button>
          <button
            onClick={() => onUpdateGameState && onUpdateGameState(prev => ({ ...prev, isTTSEnabled: false, isLocalTTSEnabled: false }))}
            className="w-full text-left px-3 py-2 hover:bg-zinc-900 text-xs font-mono flex justify-between items-center uppercase tracking-wide text-zinc-400 hover:text-zinc-200"
          >
            <span>OFF</span>
            <span className={!gameState.isTTSEnabled ? 'text-emerald-500 font-bold' : 'text-zinc-600'}>
              {!gameState.isTTSEnabled ? 'SELECTED' : ''}
            </span>
          </button>

          {gameState.isTTSEnabled && (
            <>
              <div className="px-3 py-1 mt-2 text-[10px] uppercase text-zinc-500 font-bold tracking-widest border-b border-zinc-800/50 mb-1">Notifications</div>
              <button
                id="menu-notification-opt-auto-turning"
                onClick={() => {
                  onUpdateNotifications({
                    ...gameState.notifications,
                    automatedTurning: !gameState.notifications.automatedTurning
                  });
                }}
                className="w-full text-left px-3 py-2 hover:bg-zinc-900 text-xs font-mono flex justify-between items-center uppercase tracking-wide text-zinc-400 hover:text-zinc-200"
              >
                <span>Announce Automated Turning</span>
                <span className={gameState.notifications.automatedTurning ? 'text-emerald-500 font-bold' : 'text-zinc-600'}>
                  {gameState.notifications.automatedTurning ? 'ON' : 'OFF'}
                </span>
              </button>

              {gameState.notifications.automatedTurning && (
                <div className="pl-3 pr-1 py-1 bg-zinc-950 border-l border-zinc-800 my-1">
                  <div className="px-2 py-1 text-[9px] uppercase text-zinc-500 font-bold tracking-wider">Turning Granularity</div>
                  {(['4-Direction', '8-Direction', '16-Direction', 'Full'] as const).map(gran => (
                    <button
                      key={gran}
                      onClick={() => {
                        onUpdateNotifications({
                          ...gameState.notifications,
                          turningGranularity: gran
                        });
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-zinc-900 text-[11px] font-mono flex justify-between items-center text-zinc-400 hover:text-zinc-200"
                    >
                      <span>{gran}</span>
                      <span className={gameState.notifications.turningGranularity === gran ? 'text-emerald-500 font-bold' : 'text-zinc-600'}>
                        {gameState.notifications.turningGranularity === gran ? '✓' : ''}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {NOTIFICATION_OPTIONS.map((opt) => {
                const isEnabled = gameState.notifications[opt.id];
                return (
                  <button
                    key={opt.id}
                    id={`menu-notification-opt-${opt.id}`}
                    onClick={() => {
                      onUpdateNotifications({
                        ...gameState.notifications,
                        [opt.id]: !isEnabled
                      });
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-zinc-900 text-xs font-mono flex justify-between items-center uppercase tracking-wide text-zinc-400 hover:text-zinc-200"
                  >
                    <span>{opt.label}</span>
                    <span className={isEnabled ? 'text-emerald-500 font-bold' : 'text-zinc-600'}>
                      {isEnabled ? 'ON' : 'OFF'}
                    </span>
                  </button>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};

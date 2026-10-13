import React from 'react';
import { GameState } from '../../../../System/InputTypes';
import { DiagnosticManager } from '../../../../System/Diagnostics/DiagnosticManager';

interface GameFooterProps {
  state?: GameState;
  setGameState?: React.Dispatch<React.SetStateAction<GameState>>;
}

export const GameFooter: React.FC<GameFooterProps> = ({ state, setGameState }) => {
  const toggleDiagnostics = () => {
    if (setGameState) {
      setGameState(prev => ({
        ...prev,
        showDiagnostics: !prev.showDiagnostics
      }));
    }
  };

  const copyLogsToClipboard = () => {
    const logs = DiagnosticManager.getLogs().join('\n');
    navigator.clipboard.writeText(logs).then(() => {
      // Logic remained clean
    }).catch(err => {
      console.error("Failed to copy logs:", err);
    });
  };

  const downloadLogs = () => {
    const logs = DiagnosticManager.getLogs().join('\n');
    const blob = new Blob([logs], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `poodle_adventure_log_${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {state?.showDiagnostics && (
        <div className="w-full bg-black/95 border-t border-red-500/50 p-4 font-mono text-[10px] text-red-400 z-50 fixed bottom-0 left-0 right-0 max-h-64 flex flex-col">
          <div className="flex justify-between items-start mb-2 shrink-0">
            <div className="flex items-center gap-4">
              <span className="font-bold uppercase tracking-widest text-red-500">System Diagnostics</span>
              <div className="flex gap-2">
                <button 
                  onClick={copyLogsToClipboard}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 px-2 py-0.5 rounded transition-colors text-[9px]"
                >
                  Copy All
                </button>
                <button 
                  onClick={downloadLogs}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 px-2 py-0.5 rounded transition-colors text-[9px]"
                >
                  Save .txt
                </button>
              </div>
            </div>
            <span>FPS: {DiagnosticManager.getFPS()}</span>
          </div>
          <div className="overflow-y-auto space-y-1 grow min-h-[120px] max-h-48 border border-red-500/10 p-2 bg-black/50">
            {DiagnosticManager.getLogs().map((log, i) => (
              <div key={i} className="opacity-80 break-words border-b border-red-500/5 pb-0.5">{log}</div>
            ))}
          </div>
        </div>
      )}
      <footer className="pt-8 border-t border-white/10 flex flex-col items-center">
        {state?.showDiagnostics && (
          <div className="bg-stone-900 p-4 rounded-xl border border-white/5 text-center max-w-md w-full mb-4">
            <div className="flex justify-center gap-4">
              <button 
                onClick={toggleDiagnostics}
                className="bg-red-500/20 text-red-500 border border-red-500/50 px-3 py-1 rounded text-[10px] uppercase tracking-wider font-bold"
              >
                Disable Diagnostics
              </button>
            </div>
          </div>
        )}
      </footer>
      <div className="pt-4 flex justify-between items-center text-[8px] uppercase tracking-[0.2em] font-bold text-stone-600">
        <span>Babylon-Free Production</span>
        <span>GPL V3 | CC BY-SA 4.0</span>
      </div>
    </>
  );
};

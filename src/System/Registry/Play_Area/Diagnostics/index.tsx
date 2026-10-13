import React, { useEffect, useState } from 'react';
import { GameState } from '../../../Engine/Core/Types';
import { DiagnosticManager } from '../../../Diagnostics/DiagnosticManager';

interface DiagnosticsProps {
  gameState: GameState;
}

export const Diagnostics: React.FC<DiagnosticsProps> = ({ gameState }) => {
  const [fps, setFps] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFps(DiagnosticManager.getFPS());
      setLogs(DiagnosticManager.getLogs().slice(-5));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const copyLogsToClipboard = () => {
    const fullLogs = DiagnosticManager.getLogs().join('\n');
    navigator.clipboard.writeText(fullLogs).then(() => {
      DiagnosticManager.log('Logs copied to clipboard', 'info');
    });
  };

  const downloadLogs = () => {
    const fullLogs = DiagnosticManager.getLogs().join('\n');
    const blob = new Blob([fullLogs], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `poodle_ride_log_${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!gameState.showDiagnostics) return null;

  return (
    <div className="fixed top-20 right-4 z-[100] w-72 bg-black/90 border border-zinc-700 rounded-lg shadow-2xl p-4 font-mono text-[10px] text-emerald-400 backdrop-blur-md select-none">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
        <div className="flex flex-col">
          <span className="font-bold text-zinc-500 uppercase tracking-widest text-[9px]">System Diagnostics</span>
          <div className="flex gap-2 mt-1">
            <button 
              onClick={copyLogsToClipboard}
              className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-[8px] text-zinc-300 rounded border border-zinc-600 transition-colors pointer-events-auto cursor-pointer"
            >
              Copy All
            </button>
            <button 
              onClick={downloadLogs}
              className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-[8px] text-zinc-300 rounded border border-zinc-600 transition-colors pointer-events-auto cursor-pointer"
            >
              Save Log
            </button>
          </div>
        </div>
        <span className={fps < 30 ? "text-red-500" : "text-emerald-400"}>{fps} FPS</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-zinc-500">POSITION:</span>
          <span>{gameState.gridX.toFixed(1)}, {gameState.gridY.toFixed(1)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">ROTATION:</span>
          <span>{gameState.rotation.toFixed(1)}° ({gameState.direction})</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">AREA:</span>
          <span>{gameState.area}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">SPEED:</span>
          <span>{gameState.speed.toFixed(1)} / {gameState.targetSpeed}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">LAYOUT:</span>
          <span>{gameState.keyboardLayout}</span>
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-zinc-800">
        <div className="text-zinc-600 mb-1 uppercase tracking-tighter">Recent Logs</div>
        <div className="space-y-1 h-24 overflow-hidden opacity-80">
          {logs.map((log, i) => (
            <div key={i} className="truncate whitespace-nowrap text-[8px] leading-tight">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

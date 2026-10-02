import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, ShieldCheck, Globe } from 'lucide-react';
import { checkForGameUpdates, VersionCheckResult, CURRENT_GAME_VERSION, PRODUCTION_ARCADE_URL } from '../../../../../Maintenance/Updates/Version_Check';
import { pingProductionServer } from '../../../../../Maintenance/Updates/Ping';

interface CheckForUpdatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckForUpdatesModal: React.FC<CheckForUpdatesModalProps> = ({ isOpen, onClose }) => {
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<VersionCheckResult | null>({
    currentVersion: CURRENT_GAME_VERSION,
    latestVersion: CURRENT_GAME_VERSION,
    hasUpdate: false,
    isUpToDate: true,
    statusMessage: 'Your game is up to date.',
    lastChecked: Date.now(),
  });
  const [latency, setLatency] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCheck = async () => {
    setIsChecking(true);
    try {
      const [res, pingRes] = await Promise.all([
        checkForGameUpdates(),
        pingProductionServer(),
      ]);
      setResult(res);
      setLatency(pingRes.latencyMs);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div id="check-updates-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div id="check-updates-modal-card" className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-2xl text-white font-mono flex flex-col gap-5">
        <div id="check-updates-header" className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2.5">
            <RefreshCw size={18} className="text-emerald-400" />
            <h2 className="text-sm font-bold tracking-wider uppercase">Check For Updates</h2>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-bold">
            v{CURRENT_GAME_VERSION}
          </span>
        </div>

        <div id="check-updates-body" className="flex flex-col gap-4 text-xs">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-3.5 flex flex-col gap-2">
            <div className="flex items-center justify-between text-zinc-400">
              <span>Production Server:</span>
              <span className="text-zinc-200 flex items-center gap-1">
                <Globe size={11} className="text-blue-400" />
                arcade.fairiesdreamsfantasy.com
              </span>
            </div>
            <div className="flex items-center justify-between text-zinc-400">
              <span>Installed Client Version:</span>
              <span className="text-white font-bold">{CURRENT_GAME_VERSION}</span>
            </div>
            {latency !== null && (
              <div className="flex items-center justify-between text-zinc-400">
                <span>Server Latency:</span>
                <span className="text-emerald-400 font-bold">{latency}ms</span>
              </div>
            )}
          </div>

          <div id="check-updates-status" className="bg-black/60 border border-zinc-850 rounded-lg p-3.5 flex items-center gap-3">
            {result?.isUpToDate ? (
              <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
            ) : (
              <ShieldCheck size={20} className="text-amber-400 shrink-0" />
            )}
            <div className="flex flex-col">
              <span className="font-bold text-zinc-100">
                {result?.statusMessage || 'Your game is up to date.'}
              </span>
              <span className="text-[11px] text-zinc-500">
                {result?.isUpToDate
                  ? 'All assets and game systems are synchronized with production.'
                  : 'A new release is available on the arcade server.'}
              </span>
            </div>
          </div>
        </div>

        <div id="check-updates-footer" className="flex items-center justify-between gap-3 pt-2 border-t border-zinc-900">
          <button
            id="btn-recheck-updates"
            onClick={handleCheck}
            disabled={isChecking}
            className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded text-xs font-mono transition-colors flex items-center gap-1.5"
          >
            <RefreshCw size={12} className={isChecking ? 'animate-spin' : ''} />
            <span>{isChecking ? 'Checking...' : 'Check Again'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              id="btn-update-now"
              disabled={result?.isUpToDate || isChecking}
              className={`px-4 py-2 rounded text-xs font-mono font-bold uppercase transition-all ${
                result?.isUpToDate
                  ? 'bg-zinc-800/50 text-zinc-500 cursor-not-allowed border border-zinc-800'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
              }`}
            >
              Update Now
            </button>
            <button
              id="btn-close-updates-modal"
              onClick={onClose}
              className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded text-xs font-mono transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckForUpdatesModal;

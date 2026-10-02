import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Monitor, Globe, FileJson, ShieldCheck } from 'lucide-react';

interface OfflineDownloadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfflineDownloadsModal: React.FC<OfflineDownloadsModalProps> = ({ isOpen, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadText, setDownloadText] = useState("Compile & Download Web Bundle");
  const [activePlatform, setActivePlatform] = useState<string | null>(null);

  const downloadOptions = [
    {
      id: 'windows',
      title: 'Windows Desktop Edition (Standalone)',
      description: 'Pre-packaged Windows desktop bundle featuring the start-windows.bat local launcher script and high-performance canvas engine for playing offline on Windows.',
      icon: Monitor,
      type: 'Windows (.zip)',
      size: 'Auto-Compiled',
      color: 'blue',
      ariaLabel: 'Compile and download Windows desktop package'
    },
    {
      id: 'mac',
      title: 'macOS Desktop Edition (Standalone)',
      description: 'Mac desktop bundle with start-mac.command executable launcher for immediate execution and smooth offline play on macOS.',
      icon: Monitor,
      type: 'macOS (.zip)',
      size: 'Auto-Compiled',
      color: 'emerald',
      ariaLabel: 'Compile and download macOS desktop package'
    },
    {
      id: 'linux',
      title: 'Linux Desktop Edition (Standalone)',
      description: 'Linux desktop bundle with start-linux.sh launcher script supporting xdg-open, Firefox, and Chromium browsers across Linux distributions.',
      icon: Monitor,
      type: 'Linux (.zip)',
      size: 'Auto-Compiled',
      color: 'orange',
      ariaLabel: 'Compile and download Linux desktop package'
    },
    {
      id: 'freedos',
      title: 'FreeDOS / DOS Desktop Edition',
      description: 'FreeDOS and DOS compatible desktop package featuring the START.BAT batch launcher and READ_DOS.TXT guide.',
      icon: Monitor,
      type: 'FreeDOS (.zip)',
      size: 'Auto-Compiled',
      color: 'amber',
      ariaLabel: 'Compile and download FreeDOS desktop package'
    },
    {
      id: 'web',
      title: 'Universal Web Server Bundle (Production)',
      description: 'The optimized production static files (dist folder) ready for hosting on Apache, Nginx, Node.js, or any web server.',
      icon: Globe,
      type: 'Web Server (.zip)',
      size: 'Auto-Compiled',
      color: 'teal',
      ariaLabel: 'Compile and download universal web server production ZIP'
    },
    {
      id: 'source',
      title: 'Full Developer Source Code (TypeScript)',
      description: 'Complete uncompiled TypeScript source files, custom 3D renderers, sound engines, and project build configurations for backup.',
      icon: FileJson,
      type: 'Source Backup',
      size: 'Immediate Download',
      color: 'purple',
      ariaLabel: 'Download complete developer source code backup'
    }
  ];

  const getApiEndpoint = (endpoint: string) => {
    const pathname = window.location.pathname;
    const basePath = pathname.endsWith('/')
      ? pathname
      : pathname.substring(0, pathname.lastIndexOf('/') + 1);
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    return basePath + cleanEndpoint;
  };

  const handleDownloadPlatform = (platformId: string) => {
    if (isDownloading) return;

    if (platformId === 'source') {
      window.location.href = getApiEndpoint('/api/download-source');
      return;
    }

    setIsDownloading(true);
    setActivePlatform(platformId);
    setDownloadText(`Compiling for ${platformId.toUpperCase()}...`);

    // Trigger forced rebuild to ensure we have the absolute latest version
    fetch(getApiEndpoint('/api/build-production-trigger?force=true')).catch(console.error);

    const interval = setInterval(async () => {
      try {
        const res = await fetch(getApiEndpoint('/api/build-production-status'));
        if (!res.ok) return;
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          if (data.zipExists && !data.isBuilding && data.progress === 'ready') {
            clearInterval(interval);
            setIsDownloading(false);
            setActivePlatform(null);
            setDownloadText("Compile & Download Web Bundle");
            window.location.href = getApiEndpoint(`/api/download-production?platform=${platformId}`);
          } else if (data.progress === 'failed') {
            clearInterval(interval);
            setIsDownloading(false);
            setActivePlatform(null);
            setDownloadText("Build failed");
            console.error("Build failed: " + data.error);
          }
        } catch (e) {
          // ignore invalid json from proxy during dev server restarts
        }
      } catch (e) {
        // network error
      }
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" 
          id="downloads-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="downloads-modal-title"
          aria-describedby="downloads-modal-desc"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-5xl bg-[#111] border border-[#333] rounded-3xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col max-h-[95vh]"
            id="downloads-modal-container"
          >
            {/* Header */}
            <div className="p-8 border-b border-[#333] flex items-center justify-between bg-gradient-to-r from-[#1a1a1a] to-[#111]" id="downloads-modal-header">
              <div>
                <h2 
                  className="text-3xl font-black text-white tracking-tight mb-2 flex items-center gap-3"
                  id="downloads-modal-title"
                >
                  <Download className="text-emerald-500" size={32} aria-hidden="true" />
                  Offline Downloads & Platform Packages
                </h2>
                <p 
                  className="text-gray-400 font-medium"
                  id="downloads-modal-desc"
                >
                  Compile, package, and download ready-to-play desktop builds for Windows, Mac, Linux, FreeDOS, Web servers, or full source code.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                id="downloads-modal-close"
                aria-label="Close offline downloads dialog"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="p-8 overflow-y-auto space-y-8" id="downloads-modal-body" style={{ maxHeight: 'calc(95vh - 240px)' }}>
              {/* Central Direct Compilation Prompt */}
              <div className="p-6 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                    Live Engine Package Compiler
                  </h3>
                  <p className="text-gray-400 text-sm max-w-2xl">
                    Run a live compilation of your game engine. Select any desktop OS target below to download an instant, ready-to-play package equipped with platform launchers and offline web assets.
                  </p>
                </div>
                <button
                  onClick={() => handleDownloadPlatform('web')}
                  disabled={isDownloading}
                  className={`w-full md:w-auto px-8 py-4 ${isDownloading ? 'bg-zinc-700 text-zinc-400' : 'bg-emerald-600 hover:bg-emerald-500 text-white'} font-black text-base uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-500 flex items-center justify-center gap-3`}
                  aria-label="Compile and Download Production ZIP file"
                >
                  <Download size={20} aria-hidden="true" />
                  {downloadText}
                </button>
              </div>

              <div>
                <h3 className="text-white font-extrabold text-xl tracking-tight mb-4 uppercase text-zinc-400 text-xs tracking-widest">
                  Select your target operating system or package:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {downloadOptions.map((opt) => {
                    const IconComponent = opt.icon;
                    const isCurrentActive = activePlatform === opt.id;
                    return (
                      <div
                        key={opt.id}
                        className="flex flex-col p-6 bg-[#1a1a1a] rounded-2xl border border-[#333] hover:border-zinc-700 transition-all group relative overflow-hidden"
                      >
                        <div className="flex gap-4 items-start mb-4">
                          <div className="p-3 bg-zinc-800/80 rounded-xl w-fit">
                            <IconComponent className="text-emerald-400 w-6 h-6" aria-hidden="true" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold">
                              {opt.type}
                            </span>
                            <h4 className="text-white font-bold text-base mt-0.5">{opt.title}</h4>
                          </div>
                        </div>
                        
                        <p className="text-gray-400 text-xs leading-relaxed mb-6 flex-grow">{opt.description}</p>
                        
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#222]">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                            Package: {opt.size}
                          </span>
                          <button 
                            onClick={() => handleDownloadPlatform(opt.id)} 
                            disabled={isDownloading}
                            className={`px-4 py-2 ${isCurrentActive ? 'bg-emerald-700 text-white' : 'bg-zinc-800 hover:bg-emerald-600 text-white'} text-xs font-bold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 flex items-center gap-1.5`}
                            aria-label={opt.ariaLabel}
                          >
                            <Download size={14} aria-hidden="true" />
                            <span>{isCurrentActive ? 'Compiling...' : opt.id === 'source' ? 'Download' : 'Compile & Get'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-[#1a1a1a] border-t border-[#333] flex flex-wrap gap-6 items-center justify-between" id="downloads-modal-footer">
              <div className="flex items-center gap-3 text-gray-400">
                <ShieldCheck size={18} className="text-emerald-500/50" aria-hidden="true" />
                <span className="text-xs">Desktop-First Build Engine • Windows, Mac, Linux & FreeDOS • Clean Production Assets</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-transparent text-gray-400 font-bold hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 rounded-lg"
                  aria-label="Cancel and close offline downloads"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownloadPlatform('web')}
                  disabled={isDownloading}
                  className={`px-8 py-2 ${isDownloading ? 'bg-zinc-700 text-zinc-400' : 'bg-emerald-600 hover:bg-emerald-500 text-white'} font-bold rounded-xl transition-all transform active:scale-95 shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                  aria-label="Generate Production ZIP"
                >
                  {isDownloading ? "Compiling..." : "Compile & Download"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

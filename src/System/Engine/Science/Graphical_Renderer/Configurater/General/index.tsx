import React from 'react';

/**
 * Graphical Renderer Configurater General Systems.
 */

export interface VisualConfig {
  mode: '2D' | '3D' | '3DPlus';
  label: string;
}

export const VISUAL_MODES: VisualConfig[] = [
  { mode: '2D', label: 'Classic 2-D Shaded' },
  { mode: '3D', label: 'Standard 3-D Perspective' },
  { mode: '3DPlus', label: 'Immersive 3-D Plus (with Radial Glow)' }
];

interface VisualConfiguraterProps {
  currentMode: '2D' | '3D' | '3DPlus';
  onChangeMode: (mode: '2D' | '3D' | '3DPlus') => void;
}

export const VisualConfigurater: React.FC<VisualConfiguraterProps> = ({ currentMode, onChangeMode }) => {
  return (
    <div id="visual-configurater-panel" className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl space-y-2">
      <h3 id="visual-config-title" className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Visual Rendering Mode</h3>
      <div id="visual-config-buttons-container" className="flex flex-col gap-1">
        {VISUAL_MODES.map((modeConfig) => (
          <button
            key={modeConfig.mode}
            id={`visual-mode-btn-${modeConfig.mode}`}
            onClick={() => onChangeMode(modeConfig.mode)}
            className={`w-full text-left px-3 py-1.5 rounded text-xs font-mono transition-all ${
              currentMode === modeConfig.mode
                ? 'bg-pink-600 text-white font-bold shadow-[0_0_10px_rgba(236,72,153,0.3)]'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
            }`}
          >
            {modeConfig.label}
          </button>
        ))}
      </div>
    </div>
  );
};

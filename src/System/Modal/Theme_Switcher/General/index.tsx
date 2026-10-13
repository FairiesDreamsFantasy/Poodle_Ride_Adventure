import React, { useState } from 'react';
import { Palette, Check, X } from 'lucide-react';
import { useThemeEngine, ThemeType, SubThemeType } from '../../../Theme/Engine';

/**
 * System/Modal/Theme_Switcher/General/index.tsx
 * Modal dialogue box for switching application themes cleanly.
 */

export interface ThemeSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeSwitcherGeneral: React.FC<ThemeSwitcherModalProps> = ({ isOpen, onClose }) => {
  const { themeConfig, setTheme } = useThemeEngine();
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>(themeConfig.theme);
  const [selectedSubTheme, setSelectedSubTheme] = useState<SubThemeType>(themeConfig.subTheme);

  if (!isOpen) return null;

  const handleSave = () => {
    setTheme(selectedTheme, selectedSubTheme);
    onClose();
  };

  const handleGoBack = () => {
    // Discard local selection and reset to active
    setSelectedTheme(themeConfig.theme);
    setSelectedSubTheme(themeConfig.subTheme);
    onClose();
  };

  return (
    <div
      id="theme-switcher-modal-backdrop"
      className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="theme-switcher-title"
    >
      <div
        id="theme-switcher-dialog-box"
        className="w-full max-w-md bg-stone-900 border border-stone-700 rounded-xl p-6 shadow-2xl text-stone-100 space-y-6"
      >
        <div id="theme-switcher-header" className="flex items-center gap-3 border-b border-stone-800 pb-4">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
            <Palette className="w-5 h-5" />
          </div>
          <h2 id="theme-switcher-title" className="text-xl font-bold uppercase tracking-wider text-emerald-400">
            Switch Theme
          </h2>
        </div>

        <p id="theme-switcher-intro" className="text-sm text-stone-300 leading-relaxed">
          Choose a theme by using the selection below.
        </p>

        <div id="theme-selection-group" className="space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-stone-400">Main Theme:</div>
          <div className="grid grid-cols-3 gap-2">
            <button
              id="theme-btn-dark"
              onClick={() => setSelectedTheme('Dark')}
              className={`px-3 py-2 text-xs font-mono uppercase rounded-lg border transition-all flex flex-col items-center gap-1 ${
                selectedTheme === 'Dark'
                  ? 'bg-emerald-600 border-emerald-400 text-white font-bold shadow-lg shadow-emerald-950/40'
                  : 'bg-stone-800 border-stone-700 text-stone-300 hover:border-stone-500'
              }`}
            >
              <span>Dark</span>
              {selectedTheme === 'Dark' && <Check className="w-3 h-3 text-emerald-200" />}
            </button>

            <button
              id="theme-btn-cozy"
              onClick={() => setSelectedTheme('Cozy')}
              className={`px-3 py-2 text-xs font-mono uppercase rounded-lg border transition-all flex flex-col items-center gap-1 ${
                selectedTheme === 'Cozy'
                  ? 'bg-emerald-600 border-emerald-400 text-white font-bold shadow-lg shadow-emerald-950/40'
                  : 'bg-stone-800 border-stone-700 text-stone-300 hover:border-stone-500'
              }`}
            >
              <span>Cozy</span>
              {selectedTheme === 'Cozy' && <Check className="w-3 h-3 text-emerald-200" />}
            </button>

            <button
              id="theme-btn-comfortable"
              onClick={() => setSelectedTheme('Comfortable')}
              className={`px-3 py-2 text-xs font-mono uppercase rounded-lg border transition-all flex flex-col items-center gap-1 ${
                selectedTheme === 'Comfortable'
                  ? 'bg-emerald-600 border-emerald-400 text-white font-bold shadow-lg shadow-emerald-950/40'
                  : 'bg-stone-800 border-stone-700 text-stone-300 hover:border-stone-500'
              }`}
            >
              <span>Comfortable</span>
              {selectedTheme === 'Comfortable' && <Check className="w-3 h-3 text-emerald-200" />}
            </button>
          </div>

          {selectedTheme === 'Dark' && (
            <div id="subtheme-selection-group" className="pt-2 space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-stone-400">Sub Theme:</div>
              <div className="flex gap-2">
                <button
                  id="subtheme-btn-regular"
                  onClick={() => setSelectedSubTheme('Regular')}
                  className={`px-4 py-1.5 text-xs font-mono uppercase rounded-md border transition-all ${
                    selectedSubTheme === 'Regular'
                      ? 'bg-emerald-700 border-emerald-500 text-white font-bold'
                      : 'bg-stone-800 border-stone-700 text-stone-400'
                  }`}
                >
                  Regular
                </button>
              </div>
            </div>
          )}
        </div>

        <div id="theme-switcher-footer-actions" className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
          <button
            id="theme-btn-go-back"
            onClick={handleGoBack}
            className="px-4 py-2 text-xs font-mono uppercase font-bold tracking-wider bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 rounded-lg transition-all flex items-center gap-1.5"
          >
            <X className="w-3.5 h-3.5" />
            <span>Go Back</span>
          </button>

          <button
            id="theme-btn-save"
            onClick={handleSave}
            className="px-5 py-2 text-xs font-mono uppercase font-bold tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-all shadow-md shadow-emerald-900/30 flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};

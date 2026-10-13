import React from 'react';
import { Home } from 'lucide-react';

/**
 * System/Components/Menu_Bars/Crafted/Cozy/General/index.tsx
 * Cozy theme floating menu bar with icon support, accessibility alt tags, and landing page poodle button.
 */

export interface CozyMenuBarProps {
  children?: React.ReactNode;
  onOpenLandingPage?: () => void;
}

export const CozyMenuBarGeneral: React.FC<CozyMenuBarProps> = ({ children, onOpenLandingPage }) => {
  return (
    <div
      id="crafted-cozy-menu-bar"
      className="w-full flex items-center justify-between px-4 py-2 bg-stone-900/95 border border-amber-600/30 rounded-xl shadow-2xl backdrop-blur-md"
      role="menubar"
      aria-label="Cozy Navigation Menu"
    >
      <div className="flex items-center gap-3">
        {onOpenLandingPage && (
          <button
            id="cozy-poodle-landing-btn"
            onClick={onOpenLandingPage}
            className="flex items-center gap-2 px-3 py-1.5 bg-amber-900/40 hover:bg-amber-800/60 border border-amber-500/40 text-amber-200 text-xs font-mono font-bold rounded-lg transition-all shadow-md group"
            title="Poodle Ride Adventure Landing Page"
            aria-label="Open Poodle Ride Adventure Landing Page"
          >
            <div className="w-5 h-5 rounded-full overflow-hidden bg-amber-950 border border-amber-400/50 flex items-center justify-center p-0.5">
              <img
                src="/Assets/Images/AI_Gold_Poodle.png"
                alt="Poodle Ride Adventure Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <span>Poodle Ride</span>
            <Home className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
          </button>
        )}
      </div>

      <div id="cozy-menu-children" className="flex items-center gap-2">
        {children}
      </div>
    </div>
  );
};

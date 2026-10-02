import React from 'react';

export interface WorldCityProps {
  cityName?: string;
  width?: number;
  height?: number;
  showStreets?: boolean;
}

/**
 * General City Renderer providing architectural layout structure for cities.
 */
export const GeneralCityRenderer: React.FC<WorldCityProps> = ({
  cityName = 'Rasta City Central',
  width = 800,
  height = 600,
  showStreets = true
}) => {
  return (
    <div 
      className="relative w-full h-full bg-slate-900 border border-slate-700/50 rounded-lg p-4 text-slate-100 overflow-hidden"
      id={`city-renderer-${cityName.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
        <h3 className="font-semibold text-amber-400 text-sm tracking-wide">{cityName}</h3>
        <span className="text-xs px-2 py-0.5 bg-slate-800 rounded text-slate-400">City Block</span>
      </div>
      {showStreets && (
        <div className="w-full h-48 bg-slate-950 border border-slate-800/80 rounded relative flex items-center justify-center">
          <div className="absolute inset-x-0 h-1 border-t border-b border-dashed border-amber-500/40" />
          <span className="text-xs text-slate-500 z-10 bg-slate-950 px-2">Main Thoroughfare</span>
        </div>
      )}
    </div>
  );
};

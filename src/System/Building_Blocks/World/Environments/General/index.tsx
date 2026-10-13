import React from 'react';

export interface EnvironmentProps {
  environmentName?: string;
  theme?: 'foyer' | 'garden' | 'porch' | 'courtyard';
}

/**
 * General Environment Renderer managing background ambient aesthetics.
 */
export const GeneralEnvironmentRenderer: React.FC<EnvironmentProps> = ({
  environmentName = 'Rasta Manor Courtyard',
  theme = 'courtyard'
}) => {
  return (
    <div className="p-4 bg-stone-900 border border-stone-800 rounded-lg text-stone-200">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-amber-300 text-sm">{environmentName}</h4>
        <span className="text-xs px-2 py-0.5 bg-amber-950/60 text-amber-400 border border-amber-800/40 rounded capitalize">
          {theme}
        </span>
      </div>
      <p className="text-xs text-stone-400">
        A tranquil, high-precision environment structured with majestic acoustics and natural light.
      </p>
    </div>
  );
};

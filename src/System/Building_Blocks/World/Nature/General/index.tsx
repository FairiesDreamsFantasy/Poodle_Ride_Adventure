import React from 'react';

export interface NatureRendererProps {
  biomeType?: string;
  density?: 'low' | 'medium' | 'high';
}

/**
 * General Nature Renderer providing natural terrain and flora visualization.
 */
export const GeneralNatureRenderer: React.FC<NatureRendererProps> = ({
  biomeType = 'Meadow Woodland',
  density = 'medium'
}) => {
  return (
    <div className="p-4 bg-emerald-950/50 border border-emerald-800/40 rounded-lg text-emerald-100">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-emerald-300 text-sm">{biomeType}</h4>
        <span className="text-xs px-2 py-0.5 bg-emerald-900/60 text-emerald-400 rounded">
          Density: {density}
        </span>
      </div>
      <div className="h-20 bg-emerald-900/20 border border-emerald-800/30 rounded flex items-center justify-center text-xs text-emerald-500">
        Organic Nature Biome Mesh
      </div>
    </div>
  );
};

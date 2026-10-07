import React from 'react';

/**
 * General Plants Renderer.
 */
export const GeneralPlantsRenderer: React.FC = () => {
  return (
    <div className="p-2 border border-emerald-800/30 bg-emerald-950/20 rounded">
      <div className="h-10 w-full bg-emerald-900/40 rounded animate-sway" />
    </div>
  );
};

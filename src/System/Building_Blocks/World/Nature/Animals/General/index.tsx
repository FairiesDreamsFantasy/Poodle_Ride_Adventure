import React from 'react';

/**
 * General Animals Renderer.
 */
export const GeneralAnimalsRenderer: React.FC = () => {
  return (
    <div className="p-2 bg-amber-950/20 border border-amber-800/20 rounded">
      <div className="w-4 h-4 bg-amber-600/40 rounded-full animate-bounce" />
    </div>
  );
};

import React from 'react';

/**
 * General Sunny Renderer depicting bright sunlight.
 */
export const GeneralSunnyRenderer: React.FC = () => {
  return (
    <div className="w-full h-full bg-yellow-400/10 flex items-center justify-center pointer-events-none">
      <div className="w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl animate-pulse" />
    </div>
  );
};

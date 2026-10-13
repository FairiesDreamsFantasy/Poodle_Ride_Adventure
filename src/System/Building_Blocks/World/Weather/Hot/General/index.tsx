import React from 'react';

/**
 * General Hot Renderer depicting heat distortion.
 */
export const GeneralHotRenderer: React.FC = () => {
  return (
    <div className="w-full h-full bg-orange-500/5 animate-pulse pointer-events-none" />
  );
};

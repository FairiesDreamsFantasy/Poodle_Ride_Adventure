import React from 'react';

/**
 * General Foggy Renderer depicting low visibility mist.
 */
export const GeneralFoggyRenderer: React.FC = () => {
  return (
    <div className="w-full h-full bg-slate-400/20 backdrop-blur-[2px] pointer-events-none" />
  );
};

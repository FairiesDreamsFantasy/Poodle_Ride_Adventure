import React from 'react';

/**
 * General Water Renderer.
 */
export const GeneralWaterRenderer: React.FC = () => {
  return (
    <div className="w-full h-full bg-blue-600/30 relative">
      <div className="absolute inset-0 bg-white/10 animate-ripple" />
    </div>
  );
};

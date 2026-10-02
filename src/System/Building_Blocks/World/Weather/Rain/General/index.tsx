import React from 'react';

/**
 * General Rain Renderer depicting falling raindrops.
 */
export const GeneralRainRenderer: React.FC = () => {
  return (
    <div className="w-full h-full relative overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-blue-400/40 w-0.5 h-4 animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}%`,
            animationDuration: `${0.5 + Math.random() * 0.5}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

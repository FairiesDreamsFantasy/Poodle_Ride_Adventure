import React from 'react';

/**
 * General Windy Renderer depicting air motion.
 */
export const GeneralWindyRenderer: React.FC = () => {
  return (
    <div className="w-full h-full relative overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white/5 w-32 h-0.5 rounded-full blur-[2px] animate-wind"
          style={{
            left: `-40%`,
            top: `${20 + Math.random() * 60}%`,
            animationDuration: `${1 + Math.random() * 1}s`,
            animationDelay: `${Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );
};

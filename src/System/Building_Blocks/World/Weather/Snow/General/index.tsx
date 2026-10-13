import React from 'react';

/**
 * General Snow Renderer depicting falling snowflakes.
 */
export const GeneralSnowRenderer: React.FC = () => {
  return (
    <div className="w-full h-full relative overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white/60 w-2 h-2 rounded-full blur-[1px] animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: 0.3 + Math.random() * 0.5
          }}
        />
      ))}
    </div>
  );
};

import React from 'react';

interface StartGameTriggerProps {
  onClick: () => void;
}

export const StartGameTrigger: React.FC<StartGameTriggerProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="px-10 py-4 bg-pink-600 hover:bg-pink-500 text-white rounded-full font-bold text-xl transition-all shadow-lg shadow-pink-600/20 active:scale-95"
      id="start-game-btn"
    >
      Start Game
    </button>
  );
};

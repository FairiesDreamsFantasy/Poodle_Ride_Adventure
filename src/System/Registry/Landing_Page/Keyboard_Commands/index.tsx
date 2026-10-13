import React from 'react';

interface KeyboardCommandsTriggerProps {
  onClick: () => void;
}

export const KeyboardCommandsTrigger: React.FC<KeyboardCommandsTriggerProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="px-10 py-4 bg-stone-700 hover:bg-stone-600 text-white rounded-full font-bold text-xl transition-all shadow-lg shadow-stone-600/20 active:scale-95 text-center"
      id="footer-keyboard-btn"
    >
      List of Keyboard Commands
    </button>
  );
};

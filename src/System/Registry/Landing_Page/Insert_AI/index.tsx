import React from 'react';

interface InsertAITriggerProps {
  onClick: () => void;
}

export const InsertAITrigger: React.FC<InsertAITriggerProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-8 py-3 bg-black hover:bg-stone-950 text-amber-400 font-extrabold text-lg uppercase tracking-wider transition-all border-[3px] border-red-600 rounded-2xl active:scale-95 shadow-lg shadow-red-900/10"
      id="footer-ai-btn"
    >
      Insert AI
    </button>
  );
};

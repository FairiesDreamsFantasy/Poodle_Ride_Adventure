import React from 'react';

interface MultipleChoiceOverlayProps {
  choices: string[] | null;
  onSelect: (choice: string, index: number) => void;
}

export const MultipleChoiceOverlay: React.FC<MultipleChoiceOverlayProps> = ({ choices, onSelect }) => {
  if (!choices) return null;
  
  // Logic for showing on touch devices or fine pointer (mouse)
  const shouldShow = typeof window !== 'undefined' && (window.matchMedia("(pointer: fine)").matches || window.matchMedia("(orientation: portrait)").matches);
  if (!shouldShow) return null;

  return (
    <div className="bg-stone-950 border border-white/5 p-6 rounded-2xl space-y-4">
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-500">Touch Interface / Multiple Choice</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto">
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => onSelect(choice, index)}
            className="aspect-square flex items-center justify-center bg-stone-900 border-2 border-white/5 rounded-2xl text-2xl font-black text-white hover:bg-white hover:text-black hover:border-white transition-all active:scale-95 shadow-lg"
            aria-label={`Option ${index + 1}: ${choice}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

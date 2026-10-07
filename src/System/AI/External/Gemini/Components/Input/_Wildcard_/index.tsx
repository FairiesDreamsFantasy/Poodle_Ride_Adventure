import React from 'react';

/**
 * System/AI/External/Gemini/Components/Input/_Wildcard_/index.tsx
 * Wildcard input prompt processor for AI generation.
 */

export interface WildcardInputProps {
  placeholder?: string;
  onSendPrompt?: (prompt: string) => void;
}

export const WildcardInput: React.FC<WildcardInputProps> = ({
  placeholder = 'Enter prompt for dynamic arena/character creation...',
  onSendPrompt,
}) => {
  const [value, setValue] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && onSendPrompt) {
      onSendPrompt(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-stone-900 border border-stone-700 px-3 py-1.5 text-xs text-stone-100 rounded focus:outline-none focus:border-amber-500 font-mono"
      />
      <button
        type="submit"
        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs uppercase font-bold rounded"
      >
        Generate
      </button>
    </form>
  );
};

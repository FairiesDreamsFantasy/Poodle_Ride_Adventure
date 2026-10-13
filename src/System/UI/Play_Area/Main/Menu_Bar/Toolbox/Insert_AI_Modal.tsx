import React, { useState, useEffect } from 'react';
import { Key, Check, X } from 'lucide-react';

interface InsertAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InsertAIModal: React.FC<InsertAIModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const existingKey = localStorage.getItem('GEMINI_API_KEY') || '';
      setApiKey(existingKey);
      setSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('GEMINI_API_KEY', apiKey.trim());
      (window as unknown as { GEMINI_API_KEY?: string }).GEMINI_API_KEY = apiKey.trim();
    } else {
      localStorage.removeItem('GEMINI_API_KEY');
      delete (window as unknown as { GEMINI_API_KEY?: string }).GEMINI_API_KEY;
    }
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-lg max-w-md w-full p-6 text-white shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-4 text-emerald-400">
          <Key size={20} />
          <h2 className="text-sm font-mono font-bold uppercase tracking-wider">
            {localStorage.getItem('GEMINI_API_KEY') ? 'Edit AI API Key' : 'Insert AI API Key'}
          </h2>
        </div>

        <p className="text-xs font-mono text-zinc-400 mb-4 leading-relaxed">
          Provide your Gemini API Key to unlock West Gate 2 in the Selector House and access AI-Generated gameplay features.
        </p>

        <div className="space-y-3">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500"
          />

          <div className="flex gap-2 justify-end pt-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-mono rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 text-xs font-mono font-bold rounded bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5"
            >
              {saved ? (
                <>
                  <Check size={14} /> Saved!
                </>
              ) : (
                'Save & Unlock'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

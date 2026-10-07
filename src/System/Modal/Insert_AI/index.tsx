import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Key, Save, AlertCircle, Info } from 'lucide-react';

interface InsertAIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InsertAIModal: React.FC<InsertAIModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('GEMINI_API_KEY_OVERRIDE', apiKey);
      setIsSaving(false);
      onClose();
      window.location.reload();
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" id="ai-modal-overlay">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-md bg-[#1a1a1a] border border-[#333] rounded-2xl overflow-hidden shadow-2xl"
            id="ai-modal-container"
          >
            <div className="p-6 border-b border-[#333] flex items-center justify-between bg-[#222]" id="ai-modal-header">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Cpu className="text-purple-400 w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white leading-none">External AI Settings</h2>
                  <p className="text-gray-400 text-xs mt-1">Configure your Gemini API access</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                id="ai-modal-close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6" id="ai-modal-body">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 flex items-center gap-2">
                  <Key size={14} className="text-purple-400" />
                  Gemini API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Paste your API key here..."
                  className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors shadow-inner"
                />
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex gap-4" id="ai-modal-warning">
                <AlertCircle className="text-yellow-400 w-5 h-5 flex-shrink-0" />
                <p className="text-xs text-yellow-200/80 leading-relaxed">
                  Your API key is stored locally in your browser. It is never sent to our servers. Be careful when sharing your screen or device.
                </p>
              </div>

              <div className="p-4 bg-[#222] border border-[#333] rounded-xl flex gap-4" id="ai-modal-info">
                <Info className="text-gray-400 w-5 h-5 flex-shrink-0" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Why add a key?</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Adding your own key allows the Poodle Ride AI features to run without platform quotas or limitations.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#222] border-t border-[#333] flex gap-3" id="ai-modal-footer">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-transparent border border-[#444] text-gray-300 font-bold rounded-xl hover:bg-white/5 transition-colors"
                id="ai-modal-cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || !apiKey}
                className="flex-1 px-4 py-2 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20"
                id="ai-modal-save"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

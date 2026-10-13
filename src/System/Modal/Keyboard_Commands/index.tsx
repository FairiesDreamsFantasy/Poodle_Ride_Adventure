import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, Info } from 'lucide-react';

interface KeyboardCommandsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardCommandsModal: React.FC<KeyboardCommandsModalProps> = ({ isOpen, onClose }) => {
  const commands = [
    { keys: ['↑'], action: 'Move Forward' },
    { keys: ['↓'], action: 'Move Backward' },
    { keys: ['←'], action: 'Turn Left (Discrete)' },
    { keys: ['→'], action: 'Turn Right (Discrete)' },
    { keys: ['S'], action: 'Elegant Bark' },
    { keys: ['Space'], action: 'Jump' },
    { keys: ['P'], action: 'Pet Poodle' },
    { keys: ['T'], action: 'View Mode (Rider/POV)' },
    { keys: ['L'], action: 'Lean Forward' },
    { keys: ['C'], action: 'Grasp Collar' },
    { keys: ['H'], action: 'Show Love' },
    { keys: ['E', 'Y', 'Enter'], action: 'Interact' },
    { keys: ['V'], action: 'Visual Descriptions' },
    { keys: ['I', 'K', 'J'], action: 'Inventory (Layout Dep.)' },
    { keys: ['3'], action: 'HUD Readout' },
    { keys: ['4'], action: 'Metric/Imperial' },
    { keys: ['Shift', '1'], action: 'Bark Notifications' },
    { keys: ['Shift', '2'], action: 'Jump Notifications' },
    { keys: ['Shift', '3'], action: 'Running Jump Notif.' },
    { keys: ['Shift', '4'], action: 'Toggle Diagnostics' },
    { keys: ['Shift', '8'], action: 'Pause Game' },
    { keys: ['Shift', '0'], action: 'CST Clock' },
    { keys: ['Shift', 'M'], action: 'System Status' },
    { keys: ['Ctrl', 'Shift', '4'], action: 'Turning Mode' },
    { keys: ['4', '6'], action: 'Smooth Rotation (Cedella)' },
    { keys: ['8', '2'], action: 'Movement (Cedella)' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" id="keyboard-modal-overlay">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-2xl bg-[#1a1a1a] border border-[#333] rounded-2xl overflow-hidden shadow-2xl"
            id="keyboard-modal-container"
          >
            <div className="p-6 border-b border-[#333] flex items-center justify-between bg-[#222]" id="keyboard-modal-header">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Keyboard className="text-blue-400 w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white leading-none">Keyboard Commands</h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                id="keyboard-modal-close"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar" id="keyboard-modal-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commands.map((cmd, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-[#222] rounded-xl border border-[#333] hover:border-blue-500/50 transition-colors group">
                    <span className="text-gray-300 group-hover:text-white transition-colors">{cmd.action}</span>
                    <div className="flex gap-1">
                      {cmd.keys.map((key, kIdx) => (
                        <kbd key={kIdx} className="px-2 py-1 bg-[#333] border-b-2 border-black rounded text-xs font-mono text-white min-w-[30px] text-center shadow-inner">
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 flex gap-4" id="keyboard-modal-tip">
                <div className="p-2 bg-blue-500/20 rounded-lg self-start">
                  <Info className="text-blue-400 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-1">Pro Tip: Numpad Support</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Use the numeric keypad (4 and 6) for **smooth, continuous rotation** (180°/sec). Standard arrow keys provide discrete 45° snaps with directional announcements.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#222] border-t border-[#333] flex justify-end" id="keyboard-modal-footer">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all transform active:scale-95 shadow-lg"
                id="keyboard-modal-close-btn"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

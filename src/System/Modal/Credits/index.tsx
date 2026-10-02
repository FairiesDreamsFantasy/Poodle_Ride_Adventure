import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="credits-title"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-stone-900 border-2 border-pink-500 rounded-3xl p-8 shadow-2xl overflow-hidden"
          >
            <div 
              className="absolute top-4 right-4 text-stone-500 hover:text-white cursor-pointer transition-colors" 
              onClick={onClose}
              role="button"
              aria-label="Close Credits"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onClose()}
            >
              <X size={32} />
            </div>
            
            <h2 id="credits-title" className="text-4xl font-black text-pink-500 uppercase italic mb-8 tracking-tighter">Poodle Ride Credits</h2>
            
            <div className="space-y-6 text-stone-300 overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
              <section>
                <h3 className="text-pink-400 font-bold uppercase text-sm mb-2">Development & Concept</h3>
                <p className="text-lg">Fairies Dreams & Fantasy Arcade Staff</p>
                <p className="text-stone-500 italic">"Poodle Ride Adventure is a work of art, a Rastafarian dream, and an exercise in pure craftsmanship."</p>
              </section>

              <section>
                <h3 className="text-pink-400 font-bold uppercase text-sm mb-2">Lead Characters</h3>
                <ul className="space-y-1">
                  <li><span className="text-white font-bold">Abigay Rose Kone</span> — The Majestic Massive White Poodle</li>
                  <li><span className="text-white font-bold">Fairy-Rider</span> — The Protagonist</li>
                </ul>
              </section>

              <section>
                <h3 className="text-pink-400 font-bold uppercase text-sm mb-2">Visuals & Animation</h3>
                <p>Bespoke 2D/3D Hybrid Rendering Engine</p>
                <p className="text-stone-500 text-xs italic">All character designs and animations are original handcrafted works.</p>
              </section>

              <section>
                <h3 className="text-pink-400 font-bold uppercase text-sm mb-2">Soundtrack & Audio</h3>
                <p>Procedural Soundscapes & System Announcements</p>
                <p className="text-stone-500 text-xs italic">Ambient recordings from Rasta Manor surroundings.</p>
              </section>

              <section>
                <h3 className="text-pink-400 font-bold uppercase text-sm mb-2">License</h3>
                <p>Licensed under Creative Commons BY-SA 4.0</p>
                <p>Source Code under GNU GPL v3.0</p>
              </section>
            </div>
            
            <div className="mt-10 pt-6 border-t border-white/10 flex justify-center">
              <button 
                onClick={onClose}
                className="px-12 py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-full transition-all active:scale-95 shadow-lg shadow-pink-600/20"
              >
                Close Credits
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

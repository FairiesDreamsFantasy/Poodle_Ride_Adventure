import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

/**
 * System/UI/Play_Area/Thanks_4_Playing/index.tsx
 * Post-adventure appreciation screen.
 */

export const ThanksForPlaying: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  return (
    <div className="absolute inset-0 z-[70] bg-black flex flex-col items-center justify-center text-white p-8">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <Heart className="w-16 h-16 text-pink-500 fill-pink-500 mx-auto mb-8 animate-pulse" />
        <h2 className="text-5xl font-bold mb-4 tracking-tighter">Thanks for Playing!</h2>
        <p className="text-zinc-500 max-w-md mx-auto mb-12 text-sm leading-relaxed">
          We treat our games as art. Every moment in this adventure was crafted with care and dedication.
        </p>
        <button 
          onClick={onExit}
          className="bg-white text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-zinc-200 transition-all shadow-xl shadow-white/5"
        >
          Fulljoy
        </button>
      </motion.div>
    </div>
  );
};

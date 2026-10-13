import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star, RefreshCcw, Home } from 'lucide-react';

/**
 * System/UI/Play_Area/Final_Score/index.tsx
 * A friendly alternative to the Game Over screen.
 */

interface FinalScoreProps {
  score: number;
  onRestart: () => void;
  onHome: () => void;
}

export const FinalScore: React.FC<FinalScoreProps> = ({ score, onRestart, onHome }) => {
  return (
    <div className="absolute inset-0 z-[60] bg-black/90 flex flex-col items-center justify-center text-white p-8">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-zinc-900 border-2 border-emerald-500/30 rounded-3xl p-12 max-w-md w-full text-center shadow-[0_0_50px_rgba(16,185,129,0.1)]"
      >
        <div className="mb-8 flex justify-center">
          <div className="p-6 bg-emerald-500/10 rounded-full border-2 border-emerald-500/20">
            <Trophy className="w-16 h-16 text-emerald-400" />
          </div>
        </div>

        <h2 className="text-4xl font-bold tracking-tight mb-2">Final Score</h2>
        <p className="text-emerald-400/60 font-mono uppercase tracking-[0.2em] text-xs mb-8">Adventure Completed</p>

        <div className="text-7xl font-bold mb-12 flex items-center justify-center gap-4">
          <span className="text-emerald-400">{score}</span>
          <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onRestart}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 py-4 rounded-xl font-bold transition-all"
          >
            <RefreshCcw size={20} />
            Try Again
          </button>
          <button 
            onClick={onHome}
            className="flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 py-4 rounded-xl font-bold transition-all border border-white/5"
          >
            <Home size={20} />
            Exit
          </button>
        </div>
      </motion.div>
    </div>
  );
};

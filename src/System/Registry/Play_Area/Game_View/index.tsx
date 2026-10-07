import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pause, Play, X } from 'lucide-react';
import { GameState } from '../../../AI/In-Game/Logic/GameLogic';
import FloorFoyerGrid from '../../../Engine/Mathematics/Grid/Floor_Foyer_Grid';

interface GameViewProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  gameState: GameState;
  isEmbedded: boolean;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  onTogglePause: () => void;
  onToyRideChoice: (choice: boolean) => void;
  isNearToy: boolean;
  gameWidth: number;
  gameHeight: number;
}

export const GameView: React.FC<GameViewProps> = ({
  canvasRef,
  gameState,
  isEmbedded,
  showGrid,
  setShowGrid,
  onTogglePause,
  onToyRideChoice,
  isNearToy,
  gameWidth,
  gameHeight
}) => {
  return (
    <div role="application" aria-label="Poodle Ride Adventure Game Content" className={`${isEmbedded ? 'w-full h-full' : 'rounded-2xl overflow-hidden border-4 border-pink-900 bg-black aspect-[4/3] shadow-[0_0_50px_rgba(236,72,153,0.1)]'} relative flex items-center justify-center`}>
      <canvas 
        id="game-canvas"
        ref={canvasRef} 
        width={gameWidth} 
        height={gameHeight} 
        role="application"
        className="w-full h-full object-contain focus:outline-none" 
        style={{
          filter: gameState.visualPrefs === '3DPlus' 
            ? 'drop-shadow(0 0 10px rgba(255, 120, 180, 0.45)) saturate(1.05) brightness(1.02)' 
            : undefined
        }}
        tabIndex={0}
        aria-label="Poodle Ride Adventure Play Area" 
      />

      {gameState.isPaused && (
        <div className="absolute inset-0 z-[60] bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-900 border-4 border-emerald-600 p-12 rounded-[3rem] shadow-2xl text-center max-w-sm"
          >
            <div className="mb-8 flex justify-center">
              <div className="p-6 bg-emerald-600/20 rounded-full">
                <Pause className="w-16 h-16 text-emerald-500" />
              </div>
            </div>
            <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">Game Paused</h2>
            <p className="text-emerald-400 font-bold uppercase tracking-[0.2em] mb-8">Shift-8 to Resume</p>
            <button 
              onClick={onTogglePause}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-500 transition-all active:scale-95 shadow-lg shadow-emerald-900/40"
            >
              <Play className="w-6 h-6 fill-current" />
              Resume Adventure
            </button>
            <p className="mt-6 text-stone-500 text-[10px] uppercase font-bold tracking-widest">
               Livity always matter in this babylon-free world
            </p>
          </motion.div>
        </div>
      )}

      {gameState.isToyReady && !gameState.isRidingToy && (
        <div className="absolute inset-x-0 bottom-12 flex flex-col items-center gap-4 z-40">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/90 backdrop-blur px-8 py-6 rounded-3xl border-2 border-pink-500 shadow-2xl text-center max-w-sm mx-4"
          >
            <p className="text-white font-bold text-lg mb-6 leading-relaxed">
              {isNearToy ? "HOP ON THIS TOY (requires to complete at least 7 courses). Would you like to ride it?" : "There is a story book here on a stand. Would you like to read it?"}
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => onToyRideChoice(true)}
                className="px-8 py-3 bg-[#ff5722] text-white rounded-full font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                Yes
              </button>
              <button 
                onClick={() => onToyRideChoice(false)}
                className="px-8 py-3 bg-[#add8e6] text-black rounded-full font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                No
              </button>
            </div>
            <p className="mt-4 text-stone-500 text-[10px] uppercase tracking-widest font-bold">Press Y for Yes, N for No</p>
          </motion.div>
        </div>
      )}

      <AnimatePresence>
        {showGrid && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <div className="relative">
              <button 
                onClick={() => setShowGrid(false)}
                className="absolute -top-4 -right-4 w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-pink-500 transition-colors z-[60]"
              >
                <X className="w-5 h-5" />
              </button>
              <FloorFoyerGrid 
                playerX={gameState.gridX} 
                playerY={gameState.gridY} 
                area={gameState.area} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

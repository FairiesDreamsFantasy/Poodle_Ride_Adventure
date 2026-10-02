import React from 'react';

export interface FloorFoyerGridProps {
  playerX: number;
  playerY: number;
  area: string;
}

export const FloorFoyerGrid: React.FC<FloorFoyerGridProps> = ({ playerX, playerY, area }) => {
  if (area !== 'Foyer') return null;

  const GRID_SIZE = 800;
  const SCALE = 0.8; // Scale to fit screen
  const OFFSET = 40;

  return (
    <div className="relative bg-white p-8 rounded-xl shadow-2xl border border-black/10 overflow-hidden" id="system-floor-foyer-grid-container">
      <h2 className="text-2xl font-serif italic text-center mb-4 uppercase tracking-widest" id="system-grid-title">floor foyer</h2>
      
      <div 
        className="relative mx-auto border-4 border-black"
        style={{ 
          width: GRID_SIZE * SCALE, 
          height: GRID_SIZE * SCALE,
          backgroundColor: '#4B0082' // Indigo
        }}
        id="system-grid-canvas"
      >
        {/* Labels */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-bold text-black uppercase" id="system-label-north">North</div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-bold text-black uppercase" id="system-label-south">South</div>
        <div className="absolute top-1/2 -left-12 -translate-y-1/2 font-bold text-black uppercase -rotate-90" id="system-label-west">West</div>
        <div className="absolute top-1/2 -right-12 -translate-y-1/2 font-bold text-black uppercase rotate-90" id="system-label-east">East</div>

        {/* Ramp Access Area (Green) */}
        <div 
          className="absolute bg-green-600 border border-white/20"
          style={{
            left: 0,
            top: 0,
            width: 8 * SCALE,
            height: 8 * SCALE
          }}
          id="system-ramp-access-area"
        />

        {/* Ramp Rectangle (Orange) */}
        <div 
          className="absolute bg-orange-500 border border-white/20"
          style={{
            left: 0,
            top: 8 * SCALE,
            width: 8 * SCALE,
            height: 40 * SCALE
          }}
          id="system-ramp-rectangle"
        >
          {/* Ramp Railing (Black Dotted Line) */}
          <div 
            className="absolute right-0 top-0 h-full border-r-2 border-dotted border-black"
            id="system-ramp-railing"
          />
          {/* Rhino Barrier (Top Railing) */}
          <div 
            className="absolute left-0 top-0 w-full border-t-2 border-dashed border-red-500"
            id="system-rhino-barrier"
            title="Rhino Safety Barrier"
          />
        </div>

        {/* Origin Label '0' */}
        <div className="absolute -bottom-6 -left-6 text-[10px] font-mono text-black font-bold" id="system-label-origin">0</div>

        {/* Grand Tapestry Interaction (Yellow) */}
        <div 
          className="absolute bg-yellow-400 w-2 h-2 rounded-full shadow-[0_0_10px_rgba(255,255,0,0.8)]"
          style={{
            left: 800 * SCALE - 4,
            top: (800 - 760) * SCALE - 4
          }}
          id="system-tapestry-point"
        />

        {/* North Doors (Dark Blue) */}
        <div 
          className="absolute bg-blue-900 h-1"
          style={{
            left: 398 * SCALE,
            top: -2,
            width: 6 * SCALE
          }}
          id="system-north-doors"
        />

        {/* South Doors (Light Blue) */}
        <div 
          className="absolute bg-blue-300 h-1"
          style={{
            left: 398 * SCALE,
            bottom: -2,
            width: 6 * SCALE
          }}
          id="system-south-doors"
        />

        {/* Player Marker */}
        <div 
          className="absolute w-3 h-3 bg-white rounded-full border-2 border-black z-10 transition-all duration-300 shadow-lg"
          style={{
            left: playerX * SCALE - 6,
            top: (GRID_SIZE - playerY) * SCALE - 6
          }}
          id="system-player-marker"
        />

        {/* Grid Numbers (Horizontal) */}
        <div className="absolute -bottom-6 left-0 w-full flex justify-between text-[10px] font-mono text-black/60 px-1" id="system-grid-numbers-h">
          <span>1</span>
          <span>200</span>
          <span>400</span>
          <span>600</span>
          <span>800</span>
        </div>

        {/* Grid Numbers (Vertical) */}
        <div className="absolute top-0 -left-6 h-full flex flex-col justify-between text-[10px] font-mono text-black/60 py-1" id="system-grid-numbers-v">
          <span>800</span>
          <span>600</span>
          <span>400</span>
          <span>200</span>
          <span>1</span>
        </div>
      </div>

      <div className="mt-6 text-center font-mono text-xs text-black/40" id="system-grid-coords">
        Current Position: {playerX}x, {playerY}y
      </div>
    </div>
  );
};

export default FloorFoyerGrid;

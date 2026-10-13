import React, { useEffect, useRef, useState } from 'react';
import { drawPoodleRiderView } from '../../../../Characters/Poodles/Abigay_Rose_Kone';
import { drawPoodlePOV } from '../../../../Characters/Riders/Fairy-Rider/POV';

interface GraphicsDisplayProps {
  viewMode: 'Rider' | 'POV';
  onViewModeChange: (mode: 'Rider' | 'POV') => void;
}

export const GraphicsDisplay: React.FC<GraphicsDisplayProps> = ({ viewMode, onViewModeChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    const render = (time: number) => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      if (viewMode === 'Rider') {
        drawPoodleRiderView(ctx, canvas.width, canvas.height, false, false, time / 1000);
      } else {
        drawPoodlePOV(ctx, canvas.width, canvas.height, false, false, false, time / 1000);
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render(0);
    return () => cancelAnimationFrame(animationFrameId);
  }, [viewMode]);

  return (
    <div 
      id="POV-Demonstration"
      className="w-[95%] mx-auto my-8 border-4 rounded-2xl overflow-hidden bg-stone-900 aspect-video flex flex-col items-center justify-center relative group"
      style={{ borderColor: '#FF6347' }}
    >
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={600} 
        className="w-full h-full object-contain"
        aria-label={viewMode === 'Rider' 
          ? "A 3rd-person view of me riding Abigay, a massive white poodle standing 6 feet tall at the shoulder (10 feet total height including her enlarged tiara perched on top of her iconic larger head), 8 feet long and 50 inches wide. My legs are fused into her thick white fur as we ride together."
          : "A 1st-person point of view from the rider's seat, looking down at Abigay's massive white head, her pink collar with white diamonds, and her pink button nose. My hands in blue onesie sleeves are visible reaching forward."}
      />
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-2 rounded-full backdrop-blur-sm">
        <button 
          onClick={() => onViewModeChange('Rider')}
          className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${viewMode === 'Rider' ? 'bg-pink-600 text-white' : 'bg-stone-800 text-stone-400 hover:bg-stone-700'}`}
        >
          Rider View
        </button>
        <button 
          onClick={() => onViewModeChange('POV')}
          className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${viewMode === 'POV' ? 'bg-pink-600 text-white' : 'bg-stone-800 text-stone-400 hover:bg-stone-700'}`}
        >
          POV View
        </button>
      </div>
    </div>
  );
};

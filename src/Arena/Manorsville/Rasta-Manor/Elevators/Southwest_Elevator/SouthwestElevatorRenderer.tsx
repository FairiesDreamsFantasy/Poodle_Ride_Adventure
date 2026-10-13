/**
 * SouthwestElevatorRenderer.tsx
 * Rendering logic for the Southwest Elevator in Rasta-Manor.
 */
import React from 'react';

interface SouthwestElevatorRendererProps {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  isNight: boolean;
  isOpen: boolean;
  floor: 'Floor' | 'Mezzanine' | 'Cellar';
}

export const renderSouthwestElevator = (props: SouthwestElevatorRendererProps) => {
  const { ctx, width, height, isNight, isOpen, floor } = props;
  
  // Elevator Body (Steel Finish)
  ctx.fillStyle = isNight ? '#333344' : '#777788';
  ctx.fillRect(0, 0, width, height);
  
  // Doors
  const doorWidth = width * 0.45;
  const offset = isOpen ? doorWidth * 0.9 : 0;
  
  ctx.fillStyle = isNight ? '#444455' : '#888899';
  // Left Door
  ctx.fillRect(5 - offset, 5, doorWidth, height - 10);
  // Right Door
  ctx.fillRect(width / 2 + offset / 2, 5, doorWidth, height - 10);
  
  // Frame
  ctx.strokeStyle = '#aaaaaa';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, width - 4, height - 4);
  
  // Indicator Beep Light
  ctx.fillStyle = floor === 'Mezzanine' ? '#ffff00' : '#00ff00';
  ctx.beginPath();
  ctx.arc(width / 2, 15, 5, 0, Math.PI * 2);
  ctx.fill();
};

export const SouthwestElevatorWidget: React.FC<{ isOpen: boolean; floor: any }> = ({ isOpen, floor }) => {
  return (
    <div className="p-4 bg-slate-800 border-2 border-slate-600 rounded-lg">
      <div className="text-white text-xs font-mono mb-2">SOUTHWEST ELEVATOR: {floor}</div>
      <div className={`w-16 h-24 border-2 border-slate-400 relative overflow-hidden ${isOpen ? 'bg-slate-900' : 'bg-slate-700'}`}>
        <div className={`absolute top-0 left-0 w-1/2 h-full bg-slate-500 transition-transform duration-1000 ${isOpen ? '-translate-x-full' : ''}`} />
        <div className={`absolute top-0 right-0 w-1/2 h-full bg-slate-500 transition-transform duration-1000 ${isOpen ? 'translate-x-full' : ''}`} />
      </div>
    </div>
  );
};

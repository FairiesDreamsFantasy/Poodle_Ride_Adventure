import React from 'react';
import { drawSky, drawMoon } from '../index';

export interface SkyProps {
  mode?: 'Day' | 'Night' | 'Dusk' | 'Dawn';
  width?: number;
  height?: number;
}

/**
 * General Sky Renderer drawing dynamic celestial background gradients and moon phases.
 */
export const GeneralSkyRenderer: React.FC<SkyProps> = ({
  mode = 'Day',
  width = 400,
  height = 200
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    drawSky(ctx, width, height, mode);
    if (mode === 'Night' || mode === 'Dusk') {
      drawMoon(ctx, width - 60, 60, 0.2);
    }
  }, [mode, width, height]);

  return (
    <div className="p-2 bg-slate-950 border border-slate-800 rounded">
      <div className="text-xs text-slate-400 mb-1 font-mono">Sky Canvas ({mode})</div>
      <canvas ref={canvasRef} width={width} height={height} className="rounded block" />
    </div>
  );
};

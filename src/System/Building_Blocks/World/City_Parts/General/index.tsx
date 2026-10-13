import React from 'react';
import { CITY_PARTS, CityPart, drawCityPart } from '../index';

export interface CityPartRendererProps {
  part?: CityPart;
  width?: number;
  height?: number;
}

/**
 * General City Parts component rendering individual city infrastructure elements.
 */
export const GeneralCityPartsRenderer: React.FC<CityPartRendererProps> = ({
  part = CITY_PARTS[0],
  width = 200,
  height = 150
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    // Draw centered part preview
    const scalePart = {
      ...part,
      x: 10,
      y: 10,
      width: Math.min(part.width, width - 20),
      height: Math.min(part.height, height - 20)
    };
    drawCityPart(ctx, scalePart);
  }, [part, width, height]);

  return (
    <div className="p-2 bg-slate-900 border border-slate-800 rounded">
      <div className="text-xs text-slate-400 mb-1 font-mono">{part.type}</div>
      <canvas ref={canvasRef} width={width} height={height} className="rounded bg-slate-950 block" />
    </div>
  );
};

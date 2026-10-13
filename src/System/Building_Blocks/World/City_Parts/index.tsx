export interface CityPart {
  type: 'Railway' | 'Lamp' | 'Building' | 'Park' | 'Windmill';
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export const CITY_PARTS: CityPart[] = [
  { type: 'Railway', x: 0, y: 1950, width: 2000, height: 50, color: '#333' },
  { type: 'Lamp', x: 100, y: 1900, width: 10, height: 100, color: '#FFD700' },
  { type: 'Building', x: 500, y: 1500, width: 300, height: 500, color: '#808080' },
  { type: 'Park', x: 1000, y: 1000, width: 500, height: 500, color: '#228B22' },
  { type: 'Windmill', x: 1600, y: 1200, width: 100, height: 200, color: '#FFF' }
];

export const drawCityPart = (ctx: CanvasRenderingContext2D, part: CityPart) => {
  ctx.fillStyle = part.color;
  ctx.fillRect(part.x, part.y, part.width, part.height);
  
  if (part.type === 'Lamp') {
    // Draw light glow
    const gradient = ctx.createRadialGradient(part.x + 5, part.y, 0, part.x + 5, part.y, 50);
    gradient.addColorStop(0, 'rgba(255, 215, 0, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(part.x + 5, part.y, 50, 0, Math.PI * 2);
    ctx.fill();
  }
};

export * from './General';
export * from './Animations';

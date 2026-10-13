export const drawSky = (ctx: CanvasRenderingContext2D, width: number, height: number, mode: 'Day' | 'Night' | 'Dusk' | 'Dawn') => {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  
  if (mode === 'Day') {
    gradient.addColorStop(0, '#87CEEB'); // Sky blue
    gradient.addColorStop(1, '#E0F6FF');
  } else if (mode === 'Night') {
    gradient.addColorStop(0, '#000000'); // Ultra Black
    gradient.addColorStop(1, '#050505');
  } else if (mode === 'Dusk') {
    gradient.addColorStop(0, '#2C3E50');
    gradient.addColorStop(1, '#FD746C');
  } else if (mode === 'Dawn') {
    gradient.addColorStop(0, '#1A2980');
    gradient.addColorStop(1, '#26D0CE');
  }

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
};

export const drawMoon = (ctx: CanvasRenderingContext2D, x: number, y: number, phase: number) => {
  ctx.fillStyle = '#F4F1C9'; // Moon color
  ctx.beginPath();
  ctx.arc(x, y, 40, 0, Math.PI * 2);
  ctx.fill();
  
  // Simple phase shading
  if (phase > 0) {
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(x + (phase * 20), y, 40, 0, Math.PI * 2);
    ctx.fill();
  }
};

export * from './General';
export * from './Animations';

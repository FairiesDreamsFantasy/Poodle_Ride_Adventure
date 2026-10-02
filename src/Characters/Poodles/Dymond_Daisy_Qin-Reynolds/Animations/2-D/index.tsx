/**
 * POODLE RENDERER (2-D)
 * Centralized canvas rendering logic for Dymond Daisy Qin-Reynolds.
 */

import { GameState } from '../../../../../System/Engine/Core/Types';

export function drawDymondRiderView(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const scale = Math.min(width, height) / 100;
  ctx.save();
  ctx.translate(width / 2, height / 2 + 20 * scale);

  const gallopTime = (time * 1000) % 400;
  const gallopBounce = Math.sin((gallopTime / 400) * Math.PI) * 7;
  const leanOffset = state.isLeaning ? 50 : 0;
  const breathing = Math.sin(time / 1000) * 1.5;

  const poodleYOffset = gallopBounce;
  const riderYOffset = leanOffset + gallopBounce;

  ctx.translate(0, poodleYOffset);

  ctx.fillStyle = '#fffff0'; 
  ctx.beginPath();
  ctx.arc(-10 * scale, 0, 15 * scale + breathing, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.save();
  ctx.translate(-25 * scale, -5 * scale);
  const tailWagSpeed = state.isPetting ? 12 : 5;
  const tailAngle = Math.PI / 4 + Math.sin(time / 1000 * tailWagSpeed) * 0.2;
  ctx.rotate(tailAngle);
  ctx.fillRect(0, 0, -8 * scale, 2 * scale);
  ctx.beginPath();
  ctx.arc(-8 * scale, 1 * scale, 5 * scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  ctx.arc(10 * scale, -5 * scale, 18 * scale + breathing, 0, Math.PI * 2);
  ctx.fill();

  const riderY = -25 * scale + (riderYOffset - poodleYOffset); 
  if (state.isPetting) {
    const petDuration = 0.7;
    const elapsedTime = time / 1000 - (state.lastPetTime / 1000);
    const progress = Math.min(elapsedTime / petDuration, 1);
    
    const startY = riderY - 10 * scale; 
    const endY = riderY + 15 * scale;
    const currentY = startY + (endY - startY) * progress;
    
    ctx.fillStyle = "#3b2219";
    ctx.beginPath();
    ctx.arc(8 * scale, currentY, 5 * scale, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(-5 * scale, riderY + 5 * scale, 4 * scale, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = "#3b2219"; 
    ctx.beginPath();
    ctx.arc(-5 * scale, riderY + 5 * scale, 4 * scale, 0, Math.PI * 2);
    ctx.arc(5 * scale, riderY + 5 * scale, 4 * scale, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.fillStyle = "#00008b"; 
  ctx.beginPath();
  ctx.ellipse(0, riderY, 15 * scale, 22 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#3b2219"; 
  ctx.beginPath();
  ctx.arc(0, riderY - 25 * scale, 10 * scale, 0, Math.PI * 2);
  ctx.fill();

  ctx.translate(20 * scale, -25 * scale);
  ctx.fillStyle = '#fffff0';
  ctx.beginPath();
  ctx.arc(0, 0, 12 * scale, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#228B22'; 
  ctx.beginPath();
  ctx.arc(-4 * scale, -2 * scale, 2 * scale, 0, Math.PI * 2);
  ctx.arc(4 * scale, -2 * scale, 2 * scale, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(-3.5 * scale, -2.5 * scale, 0.5 * scale, 0, Math.PI * 2);
  ctx.arc(4.5 * scale, -2.5 * scale, 0.5 * scale, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ff1493'; 
  ctx.beginPath();
  ctx.ellipse(0, 3 * scale, 3 * scale, 2 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  const gradient = ctx.createRadialGradient(-1*scale, 2*scale, 0.5*scale, 0, 3*scale, 2*scale);
  gradient.addColorStop(0, 'rgba(255,255,255,0.8)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.fillStyle = '#fffff0';
  ctx.beginPath();
  ctx.ellipse(-10 * scale, 0, 6 * scale, 15 * scale, 0.2, 0, Math.PI * 2);
  ctx.ellipse(10 * scale, 0, 6 * scale, 15 * scale, -0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#00ffff'; 
  ctx.beginPath();
  ctx.moveTo(0, 15 * scale);
  ctx.lineTo(5 * scale, 18 * scale);
  ctx.lineTo(0, 21 * scale);
  ctx.lineTo(-5 * scale, 18 * scale);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

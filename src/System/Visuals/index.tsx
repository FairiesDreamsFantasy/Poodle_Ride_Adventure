/**
 * System Visuals Core
 * Centralized entry point for the refined visuals system.
 */

import { PixelRenderer, PixelGrid } from './Animations/Pixelations';

export * from './Resolution';
export * from './Engine';
export * from './Animations/2-D';
export * from './Animations/3-D';
export * from './Animations/Pixelations';

// Central visual logic
export const Visuals = {
  graphicsManager: true,
  pixelLogic: true,
};

// Graphics Manager
export class GraphicsManager {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  constructor(canvasId?: string) {
    if (canvasId) {
      this.setCanvas(canvasId);
    }
  }

  setCanvas(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
    }
  }

  clear() {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  drawTexture(texture: PixelGrid, x: number, y: number, size: number = 4) {
    if (this.ctx) {
      PixelRenderer.render(this.ctx, texture, x, y, size);
    }
  }

  drawRect(x: number, y: number, width: number, height: number, color: string) {
    if (this.ctx) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(x, y, width, height);
    }
  }

  drawCircle(x: number, y: number, radius: number, color: string) {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fillStyle = color;
      this.ctx.fill();
    }
  }
}

// Character Rendering
export const drawGirlOnOpossum = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  const hopOffset = Math.sin(Date.now() / 200) * 10; // Hopping animation
  const tailWag = Math.sin(Date.now() / 150) * 15; // Tail wagging
  const animatedY = y + hopOffset;

  // Draw Opossum
  ctx.fillStyle = '#A9A9A9'; // Gray
  ctx.beginPath();
  ctx.ellipse(x, animatedY - 20, 40, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Opossum Head
  ctx.fillStyle = '#D3D3D3';
  ctx.beginPath();
  ctx.arc(x + 35, animatedY - 30, 12, 0, Math.PI * 2);
  ctx.fill();
  
  // Opossum Nose
  ctx.fillStyle = 'pink';
  ctx.beginPath();
  ctx.arc(x + 45, animatedY - 30, 3, 0, Math.PI * 2);
  ctx.fill();
  
  // Opossum Eyes
  ctx.fillStyle = 'green';
  ctx.beginPath();
  ctx.arc(x + 40, animatedY - 33, 2, 0, Math.PI * 2);
  ctx.fill();
  
  // Opossum Tail (Wagging)
  ctx.strokeStyle = 'pink';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x - 40, animatedY - 20);
  ctx.quadraticCurveTo(x - 60 + tailWag, animatedY - 40, x - 50, animatedY - 10);
  ctx.stroke();

  // Draw Girl
  // Puffy Dress (Violet)
  ctx.fillStyle = '#8A2BE2';
  ctx.beginPath();
  ctx.moveTo(x - 25, animatedY - 30);
  ctx.quadraticCurveTo(x, animatedY - 100, x + 25, animatedY - 30);
  ctx.fill();
  
  // Shoulder Puffs
  ctx.beginPath();
  ctx.arc(x - 15, animatedY - 85, 12, 0, Math.PI * 2);
  ctx.arc(x + 15, animatedY - 85, 12, 0, Math.PI * 2);
  ctx.fill();
  
  // Tan Skin
  ctx.fillStyle = '#D2B48C';
  ctx.beginPath();
  ctx.arc(x, animatedY - 105, 12, 0, Math.PI * 2);
  ctx.fill();
  
  // Red Hair
  ctx.fillStyle = '#FF4500';
  ctx.beginPath();
  ctx.arc(x, animatedY - 110, 15, Math.PI, 0);
  ctx.fill();
};

export const drawRabbit = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string = 'white') => {
  // Body
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x + 25, y - 25, 30, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  // Head
  ctx.beginPath();
  ctx.arc(x + 50, y - 45, 15, 0, Math.PI * 2);
  ctx.fill();
  // Ears
  ctx.beginPath();
  ctx.ellipse(x + 45, y - 65, 5, 15, 0, 0, Math.PI * 2);
  ctx.ellipse(x + 55, y - 65, 5, 15, 0, 0, Math.PI * 2);
  ctx.fill();
  // Nose
  ctx.fillStyle = 'pink';
  ctx.beginPath();
  ctx.arc(x + 62, y - 45, 3, 0, Math.PI * 2);
  ctx.fill();
  // Tail
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x - 5, y - 25, 8, 0, Math.PI * 2);
  ctx.fill();
};

export const drawGirlOnRabbit = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  const hopOffset = Math.sin(Date.now() / 200) * 10;
  const animatedY = y + hopOffset;
  
  drawRabbit(ctx, x, animatedY, 'white');
  
  // Draw Girl on top
  const girlX = x + 25;
  const girlY = animatedY - 25;
  
  // Puffy Dress (Violet)
  ctx.fillStyle = '#8A2BE2';
  ctx.beginPath();
  ctx.moveTo(girlX - 25, girlY - 5);
  ctx.quadraticCurveTo(girlX, girlY - 75, girlX + 25, girlY - 5);
  ctx.fill();
  
  // Shoulder Puffs
  ctx.beginPath();
  ctx.arc(girlX - 15, girlY - 60, 12, 0, Math.PI * 2);
  ctx.arc(girlX + 15, girlY - 60, 12, 0, Math.PI * 2);
  ctx.fill();
  
  // Tan Skin
  ctx.fillStyle = '#D2B48C';
  ctx.beginPath();
  ctx.arc(girlX, girlY - 80, 12, 0, Math.PI * 2);
  ctx.fill();
  
  // Red Hair
  ctx.fillStyle = '#FF4500';
  ctx.beginPath();
  ctx.arc(girlX, girlY - 85, 15, Math.PI, 0);
  ctx.fill();
};

export const drawOpossum = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  const tailWag = Math.sin(Date.now() / 150) * 15;
  
  // Draw Opossum
  ctx.fillStyle = '#A9A9A9'; // Gray
  ctx.beginPath();
  ctx.ellipse(x, y - 20, 40, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Opossum Head
  ctx.fillStyle = '#D3D3D3';
  ctx.beginPath();
  ctx.arc(x + 35, y - 30, 12, 0, Math.PI * 2);
  ctx.fill();
  
  // Opossum Nose
  ctx.fillStyle = 'pink';
  ctx.beginPath();
  ctx.arc(x + 45, y - 30, 3, 0, Math.PI * 2);
  ctx.fill();
  
  // Opossum Eyes
  ctx.fillStyle = 'green';
  ctx.beginPath();
  ctx.arc(x + 40, y - 33, 2, 0, Math.PI * 2);
  ctx.fill();
  
  // Opossum Tail (Wagging)
  ctx.strokeStyle = 'pink';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x - 40, y - 20);
  ctx.quadraticCurveTo(x - 60 + tailWag, y - 40, x - 50, y - 10);
  ctx.stroke();
};

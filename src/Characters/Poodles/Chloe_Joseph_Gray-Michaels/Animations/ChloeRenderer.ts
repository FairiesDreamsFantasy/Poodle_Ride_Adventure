import { GameState } from '../../../../System/Engine/Core/Types';

/**
 * ChloeRenderer.ts
 * Crafted animation/rendering logic for Chloe Joseph Gray-Michaels.
 * [PRESERVED ARTISTIC CRAFT: Chloe is an antagonist, short/stocky yellow, brown eyes, brown conventional nose]
 */
export function drawChloe(ctx: CanvasRenderingContext2D, x: number, y: number, state: GameState, isBarking: boolean) {
  const time = Date.now();
  const bounce = Math.sin(time / 140) * 4; // Jerky/vain bounce

  ctx.save();
  ctx.translate(x, y + bounce);

  // 1. Stocky Yellow Body (Darker shade of yellow)
  ctx.fillStyle = '#d3a625'; // Darker shade of yellow
  ctx.beginPath();
  ctx.ellipse(0, 0, 12, 11, 0, 0, Math.PI * 2); // Stocky shape
  ctx.fill();

  // 2. Neck & Head
  ctx.fillStyle = '#e5c050'; // Slightly lighter yellow head
  ctx.beginPath();
  ctx.ellipse(8, -10, 8, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // 3. Brown Eyes
  ctx.fillStyle = '#5c4033'; // Dark brown
  ctx.beginPath();
  ctx.arc(10, -12, 1.8, 0, Math.PI * 2);
  ctx.fill();

  // 4. Brown Conventional Nose (Not a button nose)
  ctx.fillStyle = '#8b5a2b'; // Brown nose
  ctx.beginPath();
  // Rounded triangle for conventional nose
  ctx.moveTo(15, -10);
  ctx.lineTo(19, -11);
  ctx.lineTo(16, -7);
  ctx.closePath();
  ctx.fill();

  // 5. Tail (No ball tip - standard tail)
  ctx.strokeStyle = '#d3a625';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(-11, -3);
  ctx.quadraticCurveTo(-18, -12, -15, -20);
  ctx.stroke();

  // 6. Pink and White Collar with Diamonds (Charm Absent)
  ctx.fillStyle = '#ff69b4'; // Pink collar base
  ctx.fillRect(3, -4, 8, 4);
  
  // White diamond highlights
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(5, -2); ctx.lineTo(7, -4); ctx.lineTo(9, -2); ctx.lineTo(7, 0); ctx.closePath(); ctx.fill();

  // 7. Paws with Brown Pads
  // Front paw
  ctx.fillStyle = '#d3a625';
  ctx.fillRect(4, 10, 5, 5);
  ctx.fillStyle = '#5c4033'; // Brown pads underneath
  ctx.fillRect(4, 14, 5, 1.5);

  // Rear paw
  ctx.fillStyle = '#d3a625';
  ctx.fillRect(-8, 10, 5, 5);
  ctx.fillStyle = '#5c4033'; // Brown pads underneath
  ctx.fillRect(-8, 14, 5, 1.5);

  ctx.restore();
}

/**
 * drawChloe3D
 * Standardized Babylonian shortcut 3D renderer for Chloe.
 */
export function drawChloe3D(ctx: CanvasRenderingContext2D, x: number, y: number, state: GameState) {
  // Nintendo Super Mario 64 style 3D shortcut
  ctx.save();
  ctx.translate(x, y);

  // Simple polygon-mesh textured look for stocky yellow poodle body
  ctx.fillStyle = '#c6951a';
  ctx.beginPath();
  ctx.moveTo(-15, 10);
  ctx.lineTo(15, 15);
  ctx.lineTo(20, -10);
  ctx.lineTo(0, -20);
  ctx.lineTo(-20, -15);
  ctx.closePath();
  ctx.fill();

  // Head cube
  ctx.fillStyle = '#e0bd43';
  ctx.fillRect(5, -30, 18, 18);

  // Collar
  ctx.fillStyle = '#ff69b4';
  ctx.fillRect(4, -15, 20, 4);

  // Conventional brown nose
  ctx.fillStyle = '#7a4a1f';
  ctx.fillRect(20, -22, 6, 5);

  ctx.restore();
}

/**
 * Philip: 2-D Rendering
 * Ally character rendering logic.
 */

import { DiagnosticManager } from '../../../../System/Diagnostics/DiagnosticManager';

let lastLogTime = 0;
const LOG_INTERVAL = 5000;

/**
 * Renders Philip in 2-D View
 */
export function drawPhilip2D(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number
) {
  const centerX = width / 2;
  const centerY = height / 2;
  
  ctx.save();

  // Simple bounce
  const bounce = Math.sin(time * 2) * 5;
  
  // Log presence
  const now = Date.now();
  if (now - lastLogTime > LOG_INTERVAL) {
    DiagnosticManager.logGraphics('PhilipRenderer', 'Rendering Philip 2-D');
    lastLogTime = now;
  }

  // Philip's distinct form (Artistic Placeholder for ally character)
  // Base body
  const bodyWidth = 100;
  const bodyHeight = 120;
  const bodyY = centerY + bounce;
  
  const bodyGrad = ctx.createLinearGradient(centerX - bodyWidth/2, bodyY, centerX + bodyWidth/2, bodyY);
  bodyGrad.addColorStop(0, "#4682b4"); // Steel Blue
  bodyGrad.addColorStop(1, "#5f9ea0"); // Cadet Blue
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.ellipse(centerX, bodyY, bodyWidth/2, bodyHeight/2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Head
  const headRadius = 35;
  const headY = bodyY - bodyHeight/2 - 20;
  ctx.fillStyle = "#3b2219";
  ctx.beginPath();
  ctx.arc(centerX, headY, headRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

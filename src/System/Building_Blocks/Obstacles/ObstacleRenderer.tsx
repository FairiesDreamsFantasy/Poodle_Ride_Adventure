
import React from 'react';
import { GameState } from '../../AI/In-Game/Logic/GameLogic';
import { GLASS_BARRIER } from '../../../Arena/Manorsville/Rasta-Manor/Mezzanine_For_1st_Floor/Sky_Foyer/Glass Barriers';
import { RHINO_BARRIER } from './Areas/Foyer/RampBarrier';
import { GRAND_TAPESTRY } from '../../Items/Wall_Decor';

/**
 * Obstacle Renderer
 * 
 * Handles drawing of the glass barrier, ramp barrier (rhino), and grand tapestry.
 */

export const drawGlassBarrier = (ctx: CanvasRenderingContext2D, width: number, height: number, walkwayWidth: number) => {
  ctx.save();
  ctx.strokeStyle = "#d4af37"; // Brass
  ctx.lineWidth = 4;
  
  // Draw the four sides of the perimeter based on the coordinates
  // x36 y36 to x764 y764
  // We scale these to the visual walkway
  const scaleX = (width - 2 * walkwayWidth) / 728;
  const scaleY = (height - 2 * walkwayWidth) / 728;

  ctx.strokeRect(walkwayWidth, walkwayWidth, width - 2 * walkwayWidth, height - 2 * walkwayWidth);
  
  // Glass effect
  ctx.fillStyle = "rgba(173, 216, 230, 0.1)";
  ctx.fillRect(walkwayWidth, walkwayWidth, width - 2 * walkwayWidth, height - 2 * walkwayWidth);
  ctx.restore();
};

export const drawRhinoBarrier = (ctx: CanvasRenderingContext2D, walkwayWidth: number, gridSize: number) => {
  ctx.save();
  // Horizontal part: y=992, x=1-8 (North side of ramp opening)
  // Vertical part: x=8, y=992-772 (East side of ramp opening)
  const barrierX = walkwayWidth * (1/36); // Start at x=1
  const barrierY = walkwayWidth * (992/gridSize); // Scale y=992
  const barrierEndX = walkwayWidth * (8/36); // End at x=8
  const barrierEndY = walkwayWidth * (772/gridSize); // End at y=772
  
  ctx.strokeStyle = "#d4af37"; // Brass frame
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(barrierX, barrierY);
  ctx.lineTo(barrierEndX, barrierY); // Horizontal
  ctx.lineTo(barrierEndX, barrierEndY); // Vertical
  ctx.stroke();
  
  // Diamond pattern with rhino
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(barrierX, barrierY - 10, barrierEndX - barrierX, 20); // Horizontal panel
  ctx.fillRect(barrierEndX - 10, barrierEndY, 20, barrierY - barrierEndY); // Vertical panel
  
  // Rhino icon
  ctx.fillStyle = "#ffffff";
  ctx.font = "10px serif";
  ctx.fillText("🦏", barrierEndX - 5, (barrierY + barrierEndY) / 2);
  ctx.restore();
};

export const drawGrandTapestry = (ctx: CanvasRenderingContext2D, width: number, horizon: number) => {
  ctx.save();
  const tapX = width / 2 - 150;
  const tapY = horizon - 200;
  const tapW = 300;
  const tapH = 350;

  // Tapestry background
  ctx.fillStyle = "#4a2c2a";
  ctx.fillRect(tapX, tapY, tapW, tapH);

  // Artistic patterns
  ctx.strokeStyle = "#d4af37"; // Gold
  ctx.lineWidth = 2;
  for (let i = 0; i < 5; i++) {
      ctx.strokeRect(tapX + 10 + i * 10, tapY + 10 + i * 10, tapW - 20 - i * 20, tapH - 20 - i * 20);
  }
  
  // Text hint
  ctx.fillStyle = "#ffffff";
  ctx.font = "italic 12px serif";
  ctx.fillText("History of Ghana & New Kinxton", tapX + 50, tapY + tapH / 2);
  ctx.restore();
};

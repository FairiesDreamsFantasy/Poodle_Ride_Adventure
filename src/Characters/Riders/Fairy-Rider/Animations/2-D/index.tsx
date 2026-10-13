/**
 * Fairy-Rider 2-D Animations
 * Logic for 2D character rendering and sprite management.
 */

/**
 * Draws the rider's legs fused into the poodle's fur
 */
export function drawRiderLegs(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  bottomY: number,
  leanOffset: number
) {
  const legGrad = ctx.createLinearGradient(centerX - 80, bottomY - 140 + leanOffset, centerX - 20, bottomY - 20 + leanOffset);
  legGrad.addColorStop(0, "#ffffff");
  legGrad.addColorStop(1, "#d0d0d0");
  ctx.fillStyle = legGrad;
  
  // Left leg fusion
  ctx.beginPath();
  ctx.ellipse(centerX - 50, bottomY - 80 + leanOffset, 30, 60, Math.PI / 8, 0, Math.PI * 2);
  ctx.fill();
  
  // Right leg fusion
  ctx.beginPath();
  ctx.ellipse(centerX + 50, bottomY - 80 + leanOffset, 30, 60, -Math.PI / 8, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Draws the rider's hands grasping the collar
 */
export function drawRiderHands(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  bottomY: number,
  leanOffset: number
) {
  // Hands (Shaded for 3D volume - Darker skin tone as specified)
  const handGrad = ctx.createRadialGradient(centerX - 85, bottomY - 135 + leanOffset, 5, centerX - 80, bottomY - 130 + leanOffset, 22);
  handGrad.addColorStop(0, "#3b2219");
  handGrad.addColorStop(1, "#2a1811");
  ctx.fillStyle = handGrad;
  
  // Left hand
  ctx.beginPath();
  ctx.arc(centerX - 80, bottomY - 130 + leanOffset, 22, 0, Math.PI * 2);
  ctx.fill();
  
  // Right hand
  ctx.beginPath();
  ctx.arc(centerX + 80, bottomY - 130 + leanOffset, 22, 0, Math.PI * 2);
  ctx.fill();
}

export const Rider2D = {
  name: "Fairy-Rider 2-D",
  type: "Sprite/Canvas",
};

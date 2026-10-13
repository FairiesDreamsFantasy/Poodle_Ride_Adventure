import { GameState } from '../../../../System/Engine/Core/Types';

/**
 * PRISCILLA RIDER RENDERER: DISTINCT POV & RIDER VISUALS
 * This file contains the drawing routines for Priscilla riding Olga-Olivia,
 * completely separate from the Fairy-Rider & Abigay Rose Kone visuals.
 * No Babylonian shortcuts, but fully honoring the chaotic, vain, and non-elegant Babylonian theme.
 */

// Simple helper for generating static-looking mottled fur texture
const MOTTLED_TEXTURE_OFFSETS_X = [
  -30, 20, -50, 45, -15, 35, -25, 10, -40, 5, 25, -5, -35, 15, -45, 30, -20, 40, -10, 50
];
const MOTTLED_TEXTURE_OFFSETS_Y = [
  -10, 25, 40, -35, -15, 20, 30, -45, -5, -20, 15, 45, -30, 10, 5, -25, -40, 35, 20, -15
];

/**
 * Draws Priscilla's black jeans and yellow shoes sticking out under her vanity dress.
 */
export function drawPriscillaJeansAndShoes(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  bottomY: number,
  leanOffset: number
) {
  // Black jeans legs stretching down
  ctx.fillStyle = "#111111"; // Black jeans

  // Left Leg
  ctx.beginPath();
  ctx.ellipse(centerX - 35, bottomY - 32 + leanOffset, 11, 25, Math.PI / 15, 0, Math.PI * 2);
  ctx.fill();

  // Right Leg
  ctx.beginPath();
  ctx.ellipse(centerX + 35, bottomY - 32 + leanOffset, 11, 25, -Math.PI / 15, 0, Math.PI * 2);
  ctx.fill();

  // Yellow shoes
  ctx.fillStyle = "#f39c12"; // Yellow shoes matching her theme
  ctx.strokeStyle = "#b77c0f";
  ctx.lineWidth = 1.5;

  // Left Shoe
  ctx.beginPath();
  ctx.ellipse(centerX - 38, bottomY - 8 + leanOffset, 16, 7, Math.PI / 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Right Shoe
  ctx.beginPath();
  ctx.ellipse(centerX + 38, bottomY - 8 + leanOffset, 16, 7, -Math.PI / 24, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

/**
 * Draws Priscilla's elegant vanity dress skirt draped over Olga-Olivia's back.
 * Styled in high-contrast yellow with gray and purple borders, and slanted brown stripes.
 */
export function drawPriscillaDressSkirt(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  bottomY: number,
  leanOffset: number
) {
  ctx.save();

  // Define the skirt outline for clipping or custom filling
  const createSkirtPath = () => {
    ctx.beginPath();
    ctx.moveTo(centerX - 24, bottomY - 142 + leanOffset);
    ctx.bezierCurveTo(
      centerX - 75, bottomY - 115 + leanOffset,
      centerX - 92, bottomY - 82 + leanOffset,
      centerX - 88, bottomY - 48 + leanOffset
    );
    ctx.bezierCurveTo(
      centerX - 45, bottomY - 40 + leanOffset,
      centerX + 45, bottomY - 40 + leanOffset,
      centerX + 88, bottomY - 48 + leanOffset
    );
    ctx.bezierCurveTo(
      centerX + 92, bottomY - 82 + leanOffset,
      centerX + 75, bottomY - 115 + leanOffset,
      centerX + 24, bottomY - 142 + leanOffset
    );
    ctx.closePath();
  };

  createSkirtPath();
  
  // Fill base color: Rich Yellow vanity dress color
  ctx.fillStyle = "#ffd54f"; // Bright golden yellow
  ctx.fill();

  // Clip to the skirt path to draw slanted brown stripes elegantly
  ctx.save();
  ctx.clip();

  ctx.strokeStyle = "#5d4037"; // Slanted brown lines
  ctx.lineWidth = 2.5;
  for (let xOffset = -180; xOffset < 180; xOffset += 24) {
    ctx.beginPath();
    ctx.moveTo(centerX + xOffset - 40, bottomY - 200 + leanOffset);
    ctx.lineTo(centerX + xOffset + 40, bottomY - 20 + leanOffset);
    ctx.stroke();
  }

  ctx.restore(); // Exit clipping region

  // Gray and Purple Borders at the bottom hem curve
  ctx.lineWidth = 3.5;

  // Gray hem border
  ctx.strokeStyle = "#7f8c8d"; // Gray line
  ctx.beginPath();
  ctx.moveTo(centerX - 87, bottomY - 51 + leanOffset);
  ctx.bezierCurveTo(
    centerX - 45, bottomY - 43 + leanOffset,
    centerX + 45, bottomY - 43 + leanOffset,
    centerX + 87, bottomY - 51 + leanOffset
  );
  ctx.stroke();

  // Purple hem border (placed slightly below gray border)
  ctx.strokeStyle = "#7b1fa2"; // Purple line
  ctx.beginPath();
  ctx.moveTo(centerX - 88, bottomY - 48 + leanOffset);
  ctx.bezierCurveTo(
    centerX - 45, bottomY - 40 + leanOffset,
    centerX + 45, bottomY - 40 + leanOffset,
    centerX + 88, bottomY - 48 + leanOffset
  );
  ctx.stroke();

  ctx.restore();
}

/**
 * Draws Priscilla's POV arms and hands (Yellow vanity dress sleeves with gray/purple accents, biscuit skin hands)
 */
export function drawPriscillaPOVHands(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  isGraspingCollar: boolean,
  isPetting: boolean = false,
  lastPetTime: number = 0,
  time: number = 0
) {
  let leftHandY = isGraspingCollar ? centerY - 90 : centerY + 60;
  const rightHandY = isGraspingCollar ? centerY - 90 : centerY + 60;

  if (isPetting) {
    const petDuration = 0.8;
    const elapsedTime = Math.max(0, time - (lastPetTime / 1000));
    const progress = Math.min(elapsedTime / petDuration, 1);
    const startY = leftHandY;
    const peakY = centerY - 180; // Behind ears level for Olga-Olivia
    const strokeEndY = centerY - 90;

    if (progress < 0.25) {
      leftHandY = startY + (peakY - startY) * (progress / 0.25);
    } else {
      const strokeProgress = (progress - 0.25) / 0.75;
      leftHandY = peakY + (strokeEndY - peakY) * strokeProgress;
    }
  }

  // Shaded biscuit skin hands (#ffe4c4)
  const leftHandGrad = ctx.createRadialGradient(
    centerX - 90, leftHandY + 20, 5,
    centerX - 87, leftHandY + 25, 25
  );
  leftHandGrad.addColorStop(0, "#ffe4c4");
  leftHandGrad.addColorStop(1, "#ebd0b0");

  const rightHandGrad = ctx.createRadialGradient(
    centerX + 85, rightHandY + 20, 5,
    centerX + 88, rightHandY + 25, 25
  );
  rightHandGrad.addColorStop(0, "#ffe4c4");
  rightHandGrad.addColorStop(1, "#ebd0b0");

  // Left Arm
  ctx.fillStyle = leftHandGrad;
  ctx.fillRect(centerX - 108, leftHandY, 40, 100);

  // Right Arm
  ctx.fillStyle = rightHandGrad;
  ctx.fillRect(centerX + 68, rightHandY, 40, 100);

  // Yellow Vanity Dress Sleeves with slanted brown lines
  const sleeveWidth = 60;
  const sleeveHeight = 150;

  // Left Sleeve
  ctx.save();
  ctx.beginPath();
  ctx.rect(centerX - 118, leftHandY + 45, sleeveWidth, sleeveHeight);
  ctx.clip();
  ctx.fillStyle = "#ffd54f"; // Yellow base
  ctx.fill();
  // Slanted brown stripes
  ctx.strokeStyle = "#5d4037";
  ctx.lineWidth = 2;
  for (let offset = -40; offset < 100; offset += 20) {
    ctx.beginPath();
    ctx.moveTo(centerX - 118 + offset - 20, leftHandY + 40);
    ctx.lineTo(centerX - 118 + offset + 20, leftHandY + 200);
    ctx.stroke();
  }
  ctx.restore();

  // Right Sleeve
  ctx.save();
  ctx.beginPath();
  ctx.rect(centerX + 58, rightHandY + 45, sleeveWidth, sleeveHeight);
  ctx.clip();
  ctx.fillStyle = "#ffd54f"; // Yellow base
  ctx.fill();
  // Slanted brown stripes
  ctx.strokeStyle = "#5d4037";
  ctx.lineWidth = 2;
  for (let offset = -40; offset < 100; offset += 20) {
    ctx.beginPath();
    ctx.moveTo(centerX + 58 + offset - 20, rightHandY + 40);
    ctx.lineTo(centerX + 58 + offset + 20, rightHandY + 200);
    ctx.stroke();
  }
  ctx.restore();

  // Gray and Purple Border lines at the cuff hems of the sleeves
  ctx.lineWidth = 3;

  // Left cuff borders
  ctx.strokeStyle = "#7f8c8d"; // Gray border
  ctx.beginPath();
  ctx.moveTo(centerX - 118, leftHandY + 47);
  ctx.lineTo(centerX - 58, leftHandY + 47);
  ctx.stroke();

  ctx.strokeStyle = "#7b1fa2"; // Purple border
  ctx.beginPath();
  ctx.moveTo(centerX - 118, leftHandY + 50);
  ctx.lineTo(centerX - 58, leftHandY + 50);
  ctx.stroke();

  // Right cuff borders
  ctx.strokeStyle = "#7f8c8d"; // Gray border
  ctx.beginPath();
  ctx.moveTo(centerX + 58, rightHandY + 47);
  ctx.lineTo(centerX + 118, rightHandY + 47);
  ctx.stroke();

  ctx.strokeStyle = "#7b1fa2"; // Purple border
  ctx.beginPath();
  ctx.moveTo(centerX + 58, rightHandY + 50);
  ctx.lineTo(centerX + 118, rightHandY + 50);
  ctx.stroke();

  // Static/irregular stitch lines for sleeves (Babylonian/un-elegant)
  ctx.strokeStyle = "rgba(0, 0, 0, 0.35)";
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 2; i++) {
    ctx.beginPath();
    ctx.moveTo(centerX - 110 + i * 15, leftHandY + 55);
    ctx.lineTo(centerX - 110 + i * 15, leftHandY + 180);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX + 75 + i * 15, rightHandY + 55);
    ctx.lineTo(centerX + 75 + i * 15, rightHandY + 180);
    ctx.stroke();
  }
}

/**
 * Draws Olga-Olivia from Priscilla's First Person POV
 */
export function drawPriscillaPOV(
  ctx: CanvasRenderingContext2D,
  GAME_WIDTH: number,
  GAME_HEIGHT: number,
  isJumping: boolean,
  isLeaning: boolean,
  isGraspingCollar: boolean,
  time: number,
  isPetting: boolean = false,
  lastPetTime: number = 0
) {
  ctx.save();
  const centerX = GAME_WIDTH / 2;
  // Jerky/chaotic bobbing offset instead of smooth gallop
  const bobbingTime = (time * 1000) % 300;
  const bobbingOffset = Math.sin((bobbingTime / 300) * Math.PI) * 6; // Coarser bounce

  const centerY = GAME_HEIGHT - 90 + (isJumping ? -35 : 0) + (isLeaning ? 40 : 0);
  const poodleYOffset = (isJumping ? -35 : 0) + bobbingOffset;

  // 1. Olga-Olivia body sphere (Mottled Dark Grey)
  const breathing = Math.sin(time * 4) * 3; // Chaotic/fast breathing
  const bodyGrad = ctx.createRadialGradient(
    centerX - 20, centerY + 30 + poodleYOffset, 10,
    centerX, centerY + 45 + poodleYOffset, 100 + breathing
  );
  bodyGrad.addColorStop(0, "#555555");
  bodyGrad.addColorStop(1, "#333333");
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.ellipse(centerX, centerY + 45 + poodleYOffset, 90 + breathing * 0.4, 75 + breathing * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Draw mottled static speckles on her body (coarse texture)
  ctx.fillStyle = "rgba(10, 10, 10, 0.45)";
  for (let i = 0; i < MOTTLED_TEXTURE_OFFSETS_X.length; i++) {
    const px = centerX + MOTTLED_TEXTURE_OFFSETS_X[i] * 1.5;
    const py = centerY + 45 + poodleYOffset + MOTTLED_TEXTURE_OFFSETS_Y[i] * 1.2;
    ctx.fillRect(px, py, 3, 3);
  }

  // 2. Neck & Head
  const neckWidth = 65;
  const neckGrad = ctx.createLinearGradient(centerX - neckWidth / 2, centerY - 130 + poodleYOffset, centerX + neckWidth / 2, centerY - 130 + poodleYOffset);
  neckGrad.addColorStop(0, "#3a3a3a");
  neckGrad.addColorStop(0.5, "#505050");
  neckGrad.addColorStop(1, "#3a3a3a");
  ctx.fillStyle = neckGrad;
  ctx.fillRect(centerX - neckWidth / 2, centerY - 130 + poodleYOffset, neckWidth, 90);

  // Head (Mottled dark grey, slightly smaller than Abigay, standing around 4ft)
  const headRadius = 65;
  const headY = centerY - 165 + poodleYOffset;
  const headGrad = ctx.createRadialGradient(centerX - 15, headY - 10, 5, centerX, headY, headRadius);
  headGrad.addColorStop(0, "#5a5a5a");
  headGrad.addColorStop(1, "#404040");
  ctx.fillStyle = headGrad;
  ctx.beginPath();
  ctx.arc(centerX, headY, headRadius, 0, Math.PI * 2);
  ctx.fill();

  // Shorter "Babylonian Static" hair strands surrounding the head (Short and rushed)
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 2.5;
  const headHairSway = Math.sin(time * 5) * 0.08;
  for (let i = 0; i < 360; i += 24) {
    const angle = (i * Math.PI / 180) + headHairSway;
    ctx.beginPath();
    ctx.moveTo(centerX + Math.cos(angle) * headRadius, headY + Math.sin(angle) * headRadius);
    ctx.lineTo(centerX + Math.cos(angle) * (headRadius + 14), headY + Math.sin(angle) * (headRadius + 14));
    ctx.stroke();
  }

  // 3. Eyebrows (Easy to see, thick, dark, and slightly furrowed/vain)
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3.5;
  const browOffset = isPetting ? -2 : 0;
  // Left Brow
  ctx.beginPath();
  ctx.moveTo(centerX - 28, headY - 18 + browOffset);
  ctx.lineTo(centerX - 10, headY - 22 + browOffset);
  ctx.stroke();
  // Right Brow
  ctx.beginPath();
  ctx.moveTo(centerX + 10, headY - 22 + browOffset);
  ctx.lineTo(centerX + 28, headY - 18 + browOffset);
  ctx.stroke();

  // Eyes (Simple dark eyes)
  ctx.fillStyle = '#111111';
  ctx.beginPath();
  ctx.arc(centerX - 18, headY - 5, 6, 0, Math.PI * 2);
  ctx.arc(centerX + 18, headY - 5, 6, 0, Math.PI * 2);
  ctx.fill();

  // Eye reflection (Dull highlight)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.beginPath();
  ctx.arc(centerX - 16, headY - 7, 2, 0, Math.PI * 2);
  ctx.arc(centerX + 20, headY - 7, 2, 0, Math.PI * 2);
  ctx.fill();

  // 4. Wet Nose (Standardization C: Cold and Wet Nose)
  // Very wet and glossy look with standard circles
  const noseY = headY + 15;
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(centerX, noseY, 11, 0, Math.PI * 2);
  ctx.fill();

  // Large gloss highlight for the wetness
  ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
  ctx.beginPath();
  ctx.arc(centerX - 3, noseY - 3, 4, 0, Math.PI * 2);
  ctx.fill();

  // 5. Dull Gray Collar & Charm (Charm is absent of shine - Pure Babylonian style)
  const collarY = centerY - 80 + poodleYOffset;
  ctx.fillStyle = '#3a3a3a'; // Dull, dark gray collar
  ctx.fillRect(centerX - 35, collarY, 70, 18);

  // Dull Gray Charm (Absent of shine, simple flat geometry)
  const charmY = collarY + 23;
  ctx.fillStyle = '#666666';
  ctx.fillRect(centerX - 8, charmY - 5, 16, 16);
  // Simple border, no highlights
  ctx.strokeStyle = '#444444';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(centerX - 8, charmY - 5, 16, 16);

  // 6. Draw Priscilla's hands/arms in POV
  drawPriscillaPOVHands(ctx, centerX, centerY, isGraspingCollar, isPetting, lastPetTime, time);

  ctx.restore();
}

/**
 * Draws Priscilla riding Olga-Olivia from 3rd-person Rider's View (Side/Rear POV)
 */
export function drawPriscillaRiderView(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  isLeaning: boolean,
  isGraspingCollar: boolean,
  time: number,
  isPetting: boolean = false,
  lastPetTime: number = 0
) {
  const centerX = width / 2;
  const bottomY = height - 50;

  ctx.save();

  // Jerky/erratic bobbing bounce for the Babylonian ride feel
  const bobbingTime = (time * 1000) % 300;
  const bobbingOffset = Math.sin((bobbingTime / 300) * Math.PI) * 6;

  const leanOffset = isLeaning ? 40 : 0;
  const poodleYOffset = bobbingOffset;
  const riderYOffset = leanOffset + bobbingOffset;

  // 1. Olga-Olivia's Body (Two mottled dark grey spheres, smaller and stockier)
  const breathing = Math.sin(time * 4) * 4;

  // Front body sphere
  const frontGrad = ctx.createRadialGradient(
    centerX - 30, bottomY - 140 + poodleYOffset, 15,
    centerX, bottomY - 130 + poodleYOffset, 110 + breathing
  );
  frontGrad.addColorStop(0, "#505050");
  frontGrad.addColorStop(1, "#333333");
  ctx.fillStyle = frontGrad;
  ctx.beginPath();
  ctx.ellipse(centerX, bottomY - 130 + poodleYOffset, 95 + breathing * 0.4, 85 + breathing * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Rear body sphere
  const backGrad = ctx.createRadialGradient(
    centerX - 20, bottomY - 110 + poodleYOffset, 15,
    centerX, bottomY - 100 + poodleYOffset, 100 + breathing
  );
  backGrad.addColorStop(0, "#484848");
  backGrad.addColorStop(1, "#2b2b2b");
  ctx.fillStyle = backGrad;
  ctx.beginPath();
  ctx.ellipse(centerX, bottomY - 100 + poodleYOffset, 85 + breathing * 0.35, 75 + breathing * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();

  // Mottled dark grey skin details and static hair dashes
  ctx.strokeStyle = "rgba(15, 15, 15, 0.4)";
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 40; i++) {
    // Distribute randomly across rear/front offset layers
    const lx = centerX + MOTTLED_TEXTURE_OFFSETS_X[i % 20] * 1.6;
    const ly = bottomY + (i < 20 ? -130 : -100) + poodleYOffset + MOTTLED_TEXTURE_OFFSETS_Y[i % 20] * 1.1;
    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.lineTo(lx + 4, ly + 4);
    ctx.stroke();
  }

  // 2. Draw black jeans legs and yellow shoes beneath her dress hem
  drawPriscillaJeansAndShoes(ctx, centerX, bottomY, riderYOffset);

  // 3. Draw Priscilla's dress bodice (Yellow, with slanted brown stripes, gray/purple border at neck/belt)
  const riderY = bottomY - 175 + riderYOffset;
  const riderWidth = 65;
  const riderHeight = 85;

  // Bodice outline
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(centerX, riderY, riderWidth / 2, riderHeight / 2, 0, 0, Math.PI * 2);
  ctx.clip();

  // Fill yellow bodice
  ctx.fillStyle = "#ffd54f";
  ctx.fill();

  // Slanted brown stripes on bodice
  ctx.strokeStyle = "#5d4037";
  ctx.lineWidth = 2;
  for (let sx = -40; sx < 80; sx += 18) {
    ctx.beginPath();
    ctx.moveTo(centerX + sx - 15, riderY - 50);
    ctx.lineTo(centerX + sx + 15, riderY + 50);
    ctx.stroke();
  }
  ctx.restore();

  // Waist belt / border with purple and gray borders
  ctx.fillStyle = "#7f8c8d"; // Gray line
  ctx.fillRect(centerX - 24, riderY + 15, 48, 3);
  ctx.fillStyle = "#7b1fa2"; // Purple line
  ctx.fillRect(centerX - 24, riderY + 18, 48, 3);

  // Priscilla's Head (Back/Side view - Biscuit skin tone)
  ctx.fillStyle = "#ffe4c4";
  ctx.beginPath();
  ctx.arc(centerX, riderY - 55, 18, 0, Math.PI * 2);
  ctx.fill();

  // Brown bob cut hair ("Karen bob hair")
  // Feathers out to the sides, asymmetrical and sharply cut at the ears
  ctx.fillStyle = "#5d4037"; // Rich Brown hair
  ctx.beginPath();
  // Crown of the hair
  ctx.arc(centerX, riderY - 58, 22, Math.PI, 0, false);
  // Extends down to sides to form a strong flared bob/Karen cut
  ctx.lineTo(centerX + 26, riderY - 42); // Flared side point
  ctx.lineTo(centerX + 18, riderY - 38);
  ctx.quadraticCurveTo(centerX, riderY - 48, centerX - 18, riderY - 38); // Back of the neck shingle line
  ctx.lineTo(centerX - 26, riderY - 42); // Left flared side point
  ctx.closePath();
  ctx.fill();

  // Highlight stroke on the bob cut to show the layered feathered look
  ctx.strokeStyle = "#8d6e63";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(centerX - 10, riderY - 74);
  ctx.quadraticCurveTo(centerX, riderY - 71, centerX + 10, riderY - 74);
  ctx.stroke();

  // Vanity dress skirt drawing (representing her yellow vanity dress skirt draped over Olga-Olivia)
  drawPriscillaDressSkirt(ctx, centerX, bottomY, riderYOffset);

  // 4. Olga-Olivia's Head at Front (Un-elegant proportions, 4 feet high)
  const headY = bottomY - 260 + poodleYOffset;
  const headRadius = 55;
  const headGrad = ctx.createRadialGradient(centerX - 10, headY - 10, 5, centerX, headY, headRadius);
  headGrad.addColorStop(0, "#555555");
  headGrad.addColorStop(1, "#3c3c3c");
  ctx.fillStyle = headGrad;
  ctx.beginPath();
  ctx.arc(centerX, headY, headRadius, 0, Math.PI * 2);
  ctx.fill();

  // Hard spikes (static hair) instead of wavy fluffy locks
  ctx.strokeStyle = '#2d2d2d';
  ctx.lineWidth = 2.5;
  for (let i = 0; i < 360; i += 30) {
    const angle = i * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(centerX + Math.cos(angle) * headRadius, headY + Math.sin(angle) * headRadius);
    ctx.lineTo(centerX + Math.cos(angle) * (headRadius + 12), headY + Math.sin(angle) * (headRadius + 12));
    ctx.stroke();
  }

  // Thick eyebrows (Easy to see)
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(centerX - 22, headY - 15); ctx.lineTo(centerX - 6, headY - 18);
  ctx.moveTo(centerX + 6, headY - 18); ctx.lineTo(centerX + 22, headY - 15);
  ctx.stroke();

  // Wet black nose (Warm and Wet - Standardization C)
  const noseY = headY + 18;
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(centerX, noseY, 10, 0, Math.PI * 2);
  ctx.fill();

  // Shine highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.beginPath();
  ctx.arc(centerX - 3, noseY - 3, 3, 0, Math.PI * 2);
  ctx.fill();

  // Dull gray collar & dull charm
  const collarY = bottomY - 185 + poodleYOffset;
  ctx.fillStyle = '#3a3a3a';
  ctx.fillRect(centerX - 30, collarY, 60, 16);

  const charmY = collarY + 22;
  ctx.fillStyle = '#666666';
  ctx.fillRect(centerX - 7, charmY - 4, 14, 14);

  // 5. Short non-elegant tail (No ball tip, standard thin straight-ish tail)
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(centerX + 80, bottomY - 100 + poodleYOffset);
  // Jerky sway
  const tailSway = Math.sin(time * 6) * 12;
  ctx.quadraticCurveTo(centerX + 110, bottomY - 120 + poodleYOffset, centerX + 125, bottomY - 150 + tailSway + poodleYOffset);
  ctx.stroke();

  ctx.restore();
}


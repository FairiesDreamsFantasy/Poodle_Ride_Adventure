/**
 * Fairy-Rider Point of View (POV)
 * Logic for first-person and rider-centric perspectives.
 */
import { ABIGAY_FUR_RANDOM as FUR_RANDOM_VALUES } from '../../../Poodles/Abigay_Rose_Kone/Animations/2-D';

/**
 * Draws the rider's hands and arms from the POV perspective
 */
export function drawRiderPOV(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  isGraspingCollar: boolean,
  isPetting: boolean = false,
  lastPetTime: number = 0,
  time: number = 0,
  ridingAnimal: string = 'Abigay Rose Kone'
) {
  let leftHandY = isGraspingCollar ? centerY - 100 : centerY + 50;
  const rightHandY = isGraspingCollar ? centerY - 100 : centerY + 50;

  if (isPetting) {
    const petDuration = 0.7;
    const elapsedTime = Math.max(0, time - (lastPetTime / 1000));
    const progress = Math.min(elapsedTime / petDuration, 1);
    
    const startY = leftHandY;
    // Default values (Standardized for Abigay/Anninne-Amelia)
    let peakY = centerY - 280; // Top of head / Tiara
    let strokeEndY = centerY - 150; // Neck area in POV
    
    // Abigail and Dymond start behind ears
    if (ridingAnimal === 'Abigail Marigold Kenyatta' || ridingAnimal === 'Dymond Daisy Qin-Reynolds') {
      peakY = centerY - 210; // Behind ears level
      strokeEndY = centerY - 100; // Lower neck
    }

    if (progress < 0.2) {
      // Move hand from start (lap/collar) to peak
      leftHandY = startY + (peakY - startY) * (progress / 0.2);
    } else {
      // Stroke down from peak to end
      const strokeProgress = (progress - 0.2) / 0.8;
      leftHandY = peakY + (strokeEndY - peakY) * strokeProgress;
    }
  }
  
  // Hands (Shaded for 3D volume - Darker skin tone as specified)
  const leftHandGrad = ctx.createRadialGradient(centerX - 90, leftHandY + 20, 5, centerX - 87, leftHandY + 25, 30);
  leftHandGrad.addColorStop(0, "#3b2219");
  leftHandGrad.addColorStop(1, "#2a1811");
  
  const rightHandGrad = ctx.createRadialGradient(centerX + 85, rightHandY + 20, 5, centerX + 88, rightHandY + 25, 30);
  rightHandGrad.addColorStop(0, "#3b2219");
  rightHandGrad.addColorStop(1, "#2a1811");

  // Left Arm
  ctx.fillStyle = leftHandGrad;
  ctx.fillRect(centerX - 110, leftHandY, 45, 110);
  
  // Right Arm
  ctx.fillStyle = rightHandGrad;
  ctx.fillRect(centerX + 65, rightHandY, 45, 110);
  
  // Blue onesie sleeves (Shaded for 3D depth)
  const leftSleeveGrad = ctx.createLinearGradient(centerX - 120, leftHandY + 50, centerX - 55, leftHandY + 50);
  leftSleeveGrad.addColorStop(0, "#00008b");
  leftSleeveGrad.addColorStop(0.5, "#0000ff");
  leftSleeveGrad.addColorStop(1, "#00008b");

  const rightSleeveGrad = ctx.createLinearGradient(centerX + 55, rightHandY + 50, centerX + 120, rightHandY + 50);
  rightSleeveGrad.addColorStop(0, "#00008b");
  rightSleeveGrad.addColorStop(0.5, "#0000ff");
  rightSleeveGrad.addColorStop(1, "#00008b");

  ctx.fillStyle = leftSleeveGrad;
  ctx.fillRect(centerX - 120, leftHandY + 50, 65, 160);
  
  ctx.fillStyle = rightSleeveGrad;
  ctx.fillRect(centerX + 55, rightHandY + 50, 65, 160);
  
  // Subtle sleeve texture
  ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
  ctx.lineWidth = 1;
  for(let i=0; i<3; i++) {
    ctx.beginPath();
    ctx.moveTo(centerX - 115 + i*10, leftHandY + 60);
    ctx.lineTo(centerX - 115 + i*10, leftHandY + 200);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX + 70 + i*10, rightHandY + 60);
    ctx.lineTo(centerX + 70 + i*10, rightHandY + 200);
    ctx.stroke();
  }
}

/**
 * Renders the Poodle from the player's point of view (First-person view)
 * This is the core POV renderer for the Fairy-Rider.
 */
export function drawPoodlePOV(
  ctx: CanvasRenderingContext2D, 
  GAME_WIDTH: number, 
  GAME_HEIGHT: number, 
  isJumping: boolean, 
  isLeaning: boolean,
  isGraspingCollar: boolean,
  time: number,
  ridingAnimal: string = 'Abigay Rose Kone',
  isPetting: boolean = false,
  lastPetTime: number = 0
) {
  ctx.save();
  const centerX = GAME_WIDTH / 2;
  const centerY = GAME_HEIGHT - 100 + (isJumping ? -50 : 0) + (isLeaning ? 50 : 0);
  
  const isAnninneAmelia = ridingAnimal === 'Anninne-Amelia Rose Julisus';
  
  // Dynamic scaling for immersion (Head feels closer when leaning)
  const headScale = isLeaning ? 1.1 : 1.0;
  const headOffset = isLeaning ? 20 : 0;
  
  // Custom colors for Anninne-Amelia
  const headColor = isAnninneAmelia ? "#ffffff" : "#ffffff"; // Both are white
  const earColor = isAnninneAmelia ? "#ff8c00" : "#f5f5f5"; // Orange wavy hair for Anninne-Amelia
  const tiaraColor = isAnninneAmelia ? "#ffd700" : "#c71585"; // Gold tiara for Anninne-Amelia
  const noseColor = isAnninneAmelia ? "#ff6347" : "#ffc0cb"; // Darker pink/orange nose for Anninne-Amelia
  const collarColor = isAnninneAmelia ? "#ffd700" : "#c71585"; // Gold collar for Anninne-Amelia

  // Iconic 1-2-3 Gallop Rhythm Bounce (Subtle idle movement)
  const gallopTime = (time * 1000) % 400;
  const gallopBounce = Math.sin((gallopTime / 400) * Math.PI) * 3;
  
  // SEPARATION OF CRAFTSMANSHIP: 
  // Poodle Offset: Steady rhythmic movement.
  // Camera/Rider Offset: Combined posture (leaning) and rhythm.
  const poodleYOffset = (isJumping ? -50 : 0) + gallopBounce;
  // const riderYOffset = (isJumping ? -50 : 0) + (isLeaning ? 50 : 0) + gallopBounce;

  // Poodle Body (Front sphere visible in POV - 3D Shaded)
  const breathing = Math.sin(time * 3) * 2;
  const bodyGrad = ctx.createRadialGradient(centerX - 30, centerY + 30 + poodleYOffset, 10, centerX, centerY + 50 + poodleYOffset, 120 + breathing);
  bodyGrad.addColorStop(0, "#ffffff");
  bodyGrad.addColorStop(1, "#e0e0e0");
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.ellipse(centerX, centerY + 50 + poodleYOffset, 100 + breathing * 0.5, 80 + breathing * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Fur Shimmer (Subtle 3D highlights)
  const shimmer = Math.sin(time * 2) * 0.1 + 0.5;
  ctx.strokeStyle = `rgba(255, 255, 255, ${shimmer})`;
  ctx.lineWidth = 1.5;
  for(let i=0; i<40; i++) {
    const { angle, r2 } = FUR_RANDOM_VALUES[i % 100];
    ctx.beginPath();
    ctx.moveTo(centerX + Math.cos(angle) * r2, centerY + 50 + poodleYOffset + Math.sin(angle) * r2);
    ctx.lineTo(centerX + Math.cos(angle) * (r2+12), centerY + 50 + poodleYOffset + Math.sin(angle) * (r2+12));
    ctx.stroke();
  }

  // Poodle Head (3D Shaded - Iconic Larger Head)
  // Neck (Shaded Cylinder - Sturdy and majestic)
  const neckWidth = 80 * headScale;
  const neckGrad = ctx.createLinearGradient(centerX - neckWidth/2, centerY - 160 + headOffset + poodleYOffset, centerX + neckWidth/2, centerY - 160 + headOffset + poodleYOffset);
  neckGrad.addColorStop(0, "#e0e0e0");
  neckGrad.addColorStop(0.5, "#ffffff");
  neckGrad.addColorStop(1, "#e0e0e0");
  ctx.fillStyle = neckGrad;
  ctx.fillRect(centerX - neckWidth/2, centerY - 160 + headOffset + poodleYOffset, neckWidth, 110 * headScale);
  
  // Head (Shaded Sphere - Iconic larger girl-like head form)
  const headRadius = 85 * headScale;
  const headY = centerY - 210 + headOffset + poodleYOffset;
  const headGrad = ctx.createRadialGradient(centerX - 20 * headScale, headY - 15 * headScale, 5 * headScale, centerX, headY, headRadius);
  headGrad.addColorStop(0, headColor);
  headGrad.addColorStop(1, isAnninneAmelia ? "#f5f5f5" : "#f0f0f0");
  ctx.fillStyle = headGrad;
  ctx.beginPath();
  ctx.arc(centerX, headY, headRadius, 0, Math.PI * 2);
  ctx.fill();
  
  // Ear Sway (Subtle movement for immersion)
  const earSway = Math.sin(time * 2) * 0.05 + (isJumping ? Math.sin(time * 10) * 0.1 : 0);
  
  // Thicker hair (3D Shaded - Iconic and voluminous)
  // Left ear/hair
  const leftEarX = centerX - 85 * headScale;
  const leftEarY = centerY - 190 + headOffset + poodleYOffset;
  const leftEarGrad = ctx.createRadialGradient(leftEarX, leftEarY, 5 * headScale, leftEarX, leftEarY, 95 * headScale);
  leftEarGrad.addColorStop(0, earColor);
  leftEarGrad.addColorStop(1, isAnninneAmelia ? "#e67e22" : "#f5f5f5");
  ctx.fillStyle = leftEarGrad;
  ctx.beginPath();
  ctx.ellipse(leftEarX, leftEarY, 40 * headScale, 90 * headScale, Math.PI / 12 + earSway, 0, Math.PI * 2);
  ctx.fill();
  
  // Right ear/hair
  const rightEarX = centerX + 85 * headScale;
  const rightEarY = centerY - 190 + headOffset + poodleYOffset;
  const rightEarGrad = ctx.createRadialGradient(rightEarX, rightEarY, 5 * headScale, rightEarX, rightEarY, 95 * headScale);
  rightEarGrad.addColorStop(0, earColor);
  rightEarGrad.addColorStop(1, isAnninneAmelia ? "#e67e22" : "#f5f5f5");
  ctx.fillStyle = rightEarGrad;
  ctx.beginPath();
  ctx.ellipse(rightEarX, rightEarY, 40 * headScale, 90 * headScale, -Math.PI / 12 - earSway, 0, Math.PI * 2);
  ctx.fill();
 
  // Tiara (3D Shiny Update - Reaching 10 feet total height)
  const tiaraWidth = 55 * headScale;
  const tiaraY = centerY - 270 + headOffset + poodleYOffset;
  const tiaraGrad = ctx.createLinearGradient(centerX - tiaraWidth, tiaraY - 50 * headScale, centerX + tiaraWidth, tiaraY);
  tiaraGrad.addColorStop(0, tiaraColor);
  tiaraGrad.addColorStop(0.5, isAnninneAmelia ? "#fffacd" : "#ff69b4");
  tiaraGrad.addColorStop(1, tiaraColor);
  ctx.fillStyle = tiaraGrad;
  ctx.beginPath();
  ctx.moveTo(centerX - tiaraWidth, tiaraY);
  ctx.lineTo(centerX, tiaraY - 50 * headScale);
  ctx.lineTo(centerX + tiaraWidth, tiaraY);
  ctx.fill();
  
  // Tiara Highlight (Shiny and majestic)
  ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
  ctx.lineWidth = 2 * headScale;
  ctx.stroke();
 
  // Heart/Diamond gem (Faceted 3D - Hardened Spec: 4 inches wide)
  const gemPulse = Math.sin(time * 4) * 0.5;
  const gemY = tiaraY - 30 * headScale;
  const gemRadius = 3.2 * headScale; // Scaled to ~4 inches wide relative to the 9-foot head
  
  if (isAnninneAmelia) {
    // Vertical Diamond Gem for Anninne-Amelia
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(centerX, gemY - 20 * headScale - gemPulse);
    ctx.lineTo(centerX + 12 * headScale, gemY);
    ctx.lineTo(centerX, gemY + 20 * headScale + gemPulse);
    ctx.lineTo(centerX - 12 * headScale, gemY);
    ctx.closePath();
    ctx.fill();
  } else {
    // Heart gem for Abigay
    const gemGrad = ctx.createRadialGradient(centerX - 1 * headScale, gemY - 1 * headScale, 0.5 * headScale, centerX, gemY, (gemRadius + gemPulse));
    gemGrad.addColorStop(0, "#ff69b4");
    gemGrad.addColorStop(1, "#ff1493");
    ctx.fillStyle = gemGrad;
    ctx.beginPath();
    ctx.arc(centerX, gemY, gemRadius, 0, Math.PI * 2);
    ctx.fill();
  }
 
  // Eyes (Shiny blue eyes - Full of life)
  const blink = Math.sin(time * 0.5) > 0.98 ? 0.1 : 1.0; 
  ctx.fillStyle = '#0000ff';
  ctx.beginPath();
  ctx.ellipse(centerX - 25 * headScale, centerY - 220 + headOffset + poodleYOffset, 8 * headScale, 8 * headScale * blink, 0, 0, Math.PI * 2);
  ctx.ellipse(centerX + 25 * headScale, centerY - 220 + headOffset + poodleYOffset, 8 * headScale, 8 * headScale * blink, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Eye highlights
  if (blink > 0.5) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(centerX - 28 * headScale, centerY - 223 + headOffset + poodleYOffset, 3 * headScale, 0, Math.PI * 2);
    ctx.arc(centerX + 22 * headScale, centerY - 223 + headOffset + poodleYOffset, 3 * headScale, 0, Math.PI * 2);
    ctx.fill();
  }
 
  // Pink button nose (No nostrils, warm and dry - Enhanced 3D Rounded Form)
  const noseY = centerY - 200 + headOffset + poodleYOffset;
  const noseWidth = 12 * headScale;
  const noseHeight = 8 * headScale;
  const noseGrad = ctx.createRadialGradient(centerX - 3 * headScale, noseY - 2 * headScale, 2 * headScale, centerX, noseY, noseWidth);
  noseGrad.addColorStop(0, noseColor);
  noseGrad.addColorStop(0.7, isAnninneAmelia ? "#ff7f50" : "#ffb6c1");
  noseGrad.addColorStop(1, isAnninneAmelia ? "#ff4500" : "#ff69b4");
  ctx.fillStyle = noseGrad;
  ctx.beginPath();
  ctx.ellipse(centerX, noseY, noseWidth, noseHeight, 0, 0, Math.PI * 2);
  ctx.fill();
 
  // Add "Dry Shine" highlights to nose for 3D depth
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.beginPath();
  ctx.ellipse(centerX - 4 * headScale, noseY - 3 * headScale, 5 * headScale, 3 * headScale, -Math.PI / 6, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.beginPath();
  ctx.arc(centerX + 4 * headScale, noseY + 2 * headScale, 2 * headScale, 0, Math.PI * 2);
  ctx.fill();
 
  // Pink Collar with white diamonds and diamond charm (3D Shaded)
  const collarY = centerY - 110 + headOffset * 0.5 + poodleYOffset;
  const collarGrad = ctx.createLinearGradient(centerX - 45 * headScale, collarY, centerX - 45 * headScale, collarY + 25 * headScale);
  collarGrad.addColorStop(0, collarColor);
  collarGrad.addColorStop(0.5, isAnninneAmelia ? "#fffacd" : "#ff69b4");
  collarGrad.addColorStop(1, collarColor);
  ctx.fillStyle = collarGrad;
  ctx.fillRect(centerX - 45 * headScale, collarY, 90 * headScale, 25 * headScale);
  
  // White diamonds (Shiny and precisely placed)
  const sparkle = Math.sin(time * 5) * 0.2 + 0.8;
  ctx.fillStyle = `rgba(255, 255, 255, ${sparkle})`;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(centerX - (30 - i * 30) * headScale, collarY + 12 * headScale);
    ctx.lineTo(centerX - (25 - i * 30) * headScale, collarY + 6 * headScale);
    ctx.lineTo(centerX - (20 - i * 30) * headScale, collarY + 12 * headScale);
    ctx.lineTo(centerX - (25 - i * 30) * headScale, collarY + 18 * headScale);
    ctx.closePath();
    ctx.fill();
  }
 
  // Diamond Charm (Faceted 3D - A symbol of love and partnership)
  const charmY = collarY + 35 * headScale;
  const charmSparkle = Math.cos(time * 4) * 0.3 + 0.7;
  const charmGrad = ctx.createRadialGradient(centerX - 5 * headScale, charmY - 5 * headScale, 2 * headScale, centerX, charmY, 15 * headScale);
  charmGrad.addColorStop(0, `rgba(255, 255, 255, ${charmSparkle})`);
  charmGrad.addColorStop(0.5, isAnninneAmelia ? "#e0ffff" : "#e0ffff");
  charmGrad.addColorStop(1, isAnninneAmelia ? "#afeeee" : "#afeeee");
  ctx.fillStyle = charmGrad;
  
  if (isAnninneAmelia) {
    // Horizontal Diamond Charm for Anninne-Amelia
     ctx.beginPath();
     ctx.moveTo(centerX - 25 * headScale, charmY);
     ctx.lineTo(centerX, charmY - 15 * headScale);
     ctx.lineTo(centerX + 25 * headScale, charmY);
     ctx.lineTo(centerX, charmY + 15 * headScale);
     ctx.closePath();
     ctx.fill();
  } else {
    // Vertical-ish Diamond Charm for Abigay
    ctx.beginPath();
    ctx.moveTo(centerX, charmY - 10 * headScale);
    ctx.lineTo(centerX - 15 * headScale, charmY + 5 * headScale);
    ctx.lineTo(centerX, charmY + 20 * headScale);
    ctx.lineTo(centerX + 15 * headScale, charmY + 5 * headScale);
    ctx.closePath();
    ctx.fill();
  }
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 1;
  ctx.stroke();
 
  // Rider (Hands/Arms in POV - Shaded for 3D depth)
  // Rider vertical position is affected by lean
  drawRiderPOV(ctx, centerX, centerY, isGraspingCollar, isPetting, lastPetTime, time, ridingAnimal);

  ctx.restore();
}

export const RiderPOV = {
  name: "Fairy-Rider POV",
  type: "Perspective",
};

/**
 * POODLE RENDERER (2-D)
 * Centralized canvas rendering logic for Abigay Rose Kone.
 */

import { drawRiderLegs, drawRiderHands } from '../../../../Riders/Fairy-Rider/Animations/2-D';
import { DiagnosticManager } from '../../../../../System/Diagnostics/DiagnosticManager';

let lastLogTime = 0;
const LOG_INTERVAL = 5000;

// Pre-calculate random values for fur texture to save memory
export const FUR_RANDOM_VALUES = Array.from({ length: 100 }, () => ({
  angle: Math.random() * Math.PI * 2,
  r: 40 + Math.random() * 25,
  r2: 70 + Math.random() * 25
}));
export const ABIGAY_FUR_RANDOM = FUR_RANDOM_VALUES;

// Paws at the bottom corners (Shaded)
const drawPaw = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  const pawGrad = ctx.createRadialGradient(x - 5, y - 5, 5, x, y, 25);
  pawGrad.addColorStop(0, "#ffffff");
  pawGrad.addColorStop(1, "#dcdcdc");
  ctx.fillStyle = pawGrad;
  ctx.beginPath();
  ctx.arc(x, y, 25, 0, Math.PI * 2);
  ctx.fill();
  // Pink pads (Shaded)
  const padGrad = ctx.createRadialGradient(x, y, 2, x, y, 12);
  padGrad.addColorStop(0, "#ffc0cb");
  padGrad.addColorStop(1, "#ffb6c1");
  ctx.fillStyle = padGrad;
  ctx.beginPath();
  ctx.arc(x, y, 12, 0, Math.PI * 2);
  ctx.fill();
  // Toes (Shaded)
  ctx.fillStyle = "#ffffff";
  for(let i=0; i<3; i++) {
    ctx.beginPath();
    ctx.arc(x - 15 + i * 15, y - 15, 8, 0, Math.PI * 2);
    ctx.fill();
  }
};

/**
 * Renders the Poodle from a 3rd-person perspective (Rider View)
 */
export function drawPoodleRiderView(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  isLeaning: boolean,
  isGraspingCollar: boolean,
  time: number,
  isUmbrellaEquipped: boolean = false,
  isUmbrellaOpen: boolean = false,
  isPetting: boolean = false,
  lastPetTime: number = 0
) {
  const centerX = width / 2;
  const bottomY = height - 50;
  
  ctx.save();
  
  // Umbrella Drawing
  if (isUmbrellaEquipped) {
    const umbrellaY = bottomY - 380 + (isLeaning ? 50 : 0);
    const umbrellaX = centerX - 40;
    
    // Shaft
    ctx.strokeStyle = "#silver";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(umbrellaX, umbrellaY);
    ctx.lineTo(umbrellaX, umbrellaY - 150);
    ctx.stroke();
    
    if (isUmbrellaOpen) {
       // Canopy
       const canopyWidth = 200;
       const canopyHeight = 80;
       const umbrellaGrad = ctx.createLinearGradient(umbrellaX - canopyWidth/2, umbrellaY - 150, umbrellaX + canopyWidth/2, umbrellaY - 150);
       umbrellaGrad.addColorStop(0, "#white");
       umbrellaGrad.addColorStop(0.5, "#ffc0cb");
       umbrellaGrad.addColorStop(1, "#white");
       
       ctx.fillStyle = umbrellaGrad;
       ctx.beginPath();
       ctx.ellipse(umbrellaX, umbrellaY - 150, canopyWidth/2, canopyHeight/2, 0, Math.PI, 0); 
       ctx.fill();
       
       // Ribs
       ctx.strokeStyle = "rgba(0,0,0,0.1)";
       ctx.lineWidth = 1;
       for(let i=-2; i<=2; i++) {
         ctx.beginPath();
         ctx.moveTo(umbrellaX, umbrellaY - 150);
         ctx.lineTo(umbrellaX + (i * 40), umbrellaY - 150 + canopyHeight/4);
         ctx.stroke();
       }
    } else {
       // Closed Umbrella
       ctx.fillStyle = "#ffc0cb";
       ctx.beginPath();
       ctx.ellipse(umbrellaX, umbrellaY - 170, 15, 60, 0, 0, Math.PI * 2);
       ctx.fill();
    }
  }

  // Iconic 1-2-3 Gallop Rhythm Bounce
  const gallopTime = (time * 1000) % 400;
  const gallopBounce = Math.sin((gallopTime / 400) * Math.PI) * 5;
  const leanOffset = isLeaning ? 50 : 0;
  
  const poodleYOffset = gallopBounce;
  const riderYOffset = leanOffset + gallopBounce;
  
  const now = Date.now();
  if (now - lastLogTime > LOG_INTERVAL) {
    DiagnosticManager.logGraphics('PoodleRenderer (2-D)', `Rendering Abigay 2-D View. Bounce: ${poodleYOffset.toFixed(1)}, Lean: ${isLeaning}`);
    lastLogTime = now;
  }

  const breathing = Math.sin(time * 3) * 5;
  
  // Front Sphere
  const frontGrad = ctx.createRadialGradient(centerX - 40, bottomY - 180 + poodleYOffset, 20, centerX, bottomY - 160 + poodleYOffset, 150 + breathing);
  frontGrad.addColorStop(0, "#ffffff");
  frontGrad.addColorStop(1, "#e0e0e0");
  ctx.fillStyle = frontGrad;
  ctx.beginPath();
  ctx.ellipse(centerX, bottomY - 160 + poodleYOffset, 120 + breathing * 0.5, 110 + breathing * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Back Sphere
  const backGrad = ctx.createRadialGradient(centerX - 30, bottomY - 140 + poodleYOffset, 20, centerX, bottomY - 120 + poodleYOffset, 140 + breathing);
  backGrad.addColorStop(0, "#ffffff");
  backGrad.addColorStop(1, "#d0d0d0");
  ctx.fillStyle = backGrad;
  ctx.beginPath();
  ctx.ellipse(centerX, bottomY - 120 + poodleYOffset, 110 + breathing * 0.4, 100 + breathing * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Fur Shimmer
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 1.5;
  for(let i=0; i<80; i++) {
    const { angle, r } = FUR_RANDOM_VALUES[i % 100];
    const offsetY = i < 40 ? -160 : -120;
    ctx.beginPath();
    ctx.moveTo(centerX + Math.cos(angle) * r, bottomY + offsetY + poodleYOffset + Math.sin(angle) * r);
    ctx.lineTo(centerX + Math.cos(angle) * (r+15), bottomY + offsetY + poodleYOffset + Math.sin(angle) * (r+15));
    ctx.stroke();
  }

  // Draw Rider
  const riderY = bottomY - 220 + riderYOffset;
  const riderWidth = 80;
  const riderHeight = 100;
  const riderGrad = ctx.createLinearGradient(centerX - riderWidth/2, riderY, centerX + riderWidth/2, riderY);
  riderGrad.addColorStop(0, "#00008b");
  riderGrad.addColorStop(0.5, "#0000ff");
  riderGrad.addColorStop(1, "#00008b");
  ctx.fillStyle = riderGrad;
  ctx.beginPath();
  ctx.ellipse(centerX, riderY, riderWidth/2, riderHeight/2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#3b2219";
  ctx.beginPath();
  ctx.arc(centerX, riderY - 65, 22, 0, Math.PI * 2);
  ctx.fill();

  drawRiderLegs(ctx, centerX, bottomY, riderYOffset);

  // Poodle Head
  const headScale = 1.25;
  const headY = bottomY - 340 + poodleYOffset;
  const headRadius = 75 * headScale; // Excludes ears (precision update)
  const headGrad = ctx.createRadialGradient(centerX - 20 * headScale, headY - 20 * headScale, 10 * headScale, centerX, headY, headRadius);
  headGrad.addColorStop(0, "#ffffff");
  headGrad.addColorStop(1, "#f0f0f0");
  ctx.fillStyle = headGrad;
  ctx.beginPath();
  ctx.arc(centerX, headY, headRadius, 0, Math.PI * 2);
  ctx.fill();

  // Ears/Hair
  const earSway = Math.sin(time * 2) * 0.05;
  const earWidth = 45 * headScale;
  const earHeight = 100 * headScale;
  
  ctx.fillStyle = "#f5f5f5";
  ctx.beginPath();
  ctx.ellipse(centerX - 80 * headScale, headY + 20, earWidth, earHeight, Math.PI / 12 + earSway, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(centerX + 80 * headScale, headY + 20, earWidth, earHeight, -Math.PI / 12 - earSway, 0, Math.PI * 2);
  ctx.fill();

  // Eyes
  ctx.fillStyle = "#0000ff";
  ctx.beginPath();
  ctx.ellipse(centerX - 25 * headScale, headY - 10, 8 * headScale, 10 * headScale, 0, 0, Math.PI * 2);
  ctx.ellipse(centerX + 25 * headScale, headY - 10, 8 * headScale, 10 * headScale, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(centerX - 28 * headScale, headY - 13, 3 * headScale, 0, Math.PI * 2);
  ctx.arc(centerX + 22 * headScale, headY - 13, 3 * headScale, 0, Math.PI * 2);
  ctx.fill();

  // Pink button nose
  const noseY = headY + 25;
  const noseWidth = 14 * headScale;
  const noseHeight = 9 * headScale;
  const noseGrad = ctx.createRadialGradient(centerX - 3 * headScale, noseY - 2 * headScale, 2 * headScale, centerX, noseY, noseWidth);
  noseGrad.addColorStop(0, "#ffc0cb");
  noseGrad.addColorStop(0.7, "#ffb6c1");
  noseGrad.addColorStop(1, "#ff69b4");
  ctx.fillStyle = noseGrad;
  ctx.beginPath();
  ctx.ellipse(centerX, noseY, noseWidth, noseHeight, 0, 0, Math.PI * 2);
  ctx.fill();

  // Nose Highlights
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.beginPath();
  ctx.ellipse(centerX - 5 * headScale, noseY - 3 * headScale, 6 * headScale, 3 * headScale, -Math.PI / 6, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.beginPath();
  ctx.arc(centerX - 7 * headScale, noseY - 4 * headScale, 1.5 * headScale, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.beginPath();
  ctx.ellipse(centerX + 4 * headScale, noseY + 2 * headScale, 3 * headScale, 1.5 * headScale, Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();

  // Tiara
  const tiaraWidth = 55 * headScale;
  const tiaraY = headY - 90;
  const tiaraGrad = ctx.createLinearGradient(centerX - tiaraWidth, tiaraY - 50, centerX + tiaraWidth, tiaraY);
  tiaraGrad.addColorStop(0, "#ff1493");
  tiaraGrad.addColorStop(0.5, "#ff69b4");
  tiaraGrad.addColorStop(1, "#ff1493");
  ctx.fillStyle = tiaraGrad;
  ctx.beginPath();
  ctx.moveTo(centerX - tiaraWidth, tiaraY);
  ctx.lineTo(centerX, tiaraY - 50);
  ctx.lineTo(centerX + tiaraWidth, tiaraY);
  ctx.closePath();
  ctx.fill();
  
  const gemPulse = Math.sin(time * 4) * 0.5;
  const gemRadius = 4;
  const gemGrad = ctx.createRadialGradient(centerX - 1, tiaraY - 32, 0.5, centerX, tiaraY - 30, gemRadius + gemPulse);
  gemGrad.addColorStop(0, "#ffffff");
  gemGrad.addColorStop(0.3, "#ff1493");
  gemGrad.addColorStop(1, "#8b0000");
  ctx.fillStyle = gemGrad;
  ctx.beginPath();
  ctx.arc(centerX, tiaraY - 30, gemRadius + gemPulse, 0, Math.PI * 2);
  ctx.fill();

  // Tail
  const tailWagSpeed = isPetting ? 12 : 5;
  const tailWagRange = isPetting ? 0.4 : 0.2;
  const tailAngle = -Math.PI / 4 + Math.sin(time * tailWagSpeed) * tailWagRange; 
  const tailX = centerX + 100;
  const tailY = bottomY - 120 + poodleYOffset;
  
  const stemGrad = ctx.createLinearGradient(tailX - 5, tailY, tailX + 5, tailY);
  stemGrad.addColorStop(0, "#d0d0d0");
  stemGrad.addColorStop(0.5, "#ffffff");
  stemGrad.addColorStop(1, "#d0d0d0");
  ctx.strokeStyle = stemGrad;
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.moveTo(tailX, tailY);
  ctx.lineTo(tailX + Math.cos(tailAngle) * 90, tailY + Math.sin(tailAngle) * 90);
  ctx.stroke();
  
  const ballSize = 38; 
  const ballGrad = ctx.createRadialGradient(tailX + Math.cos(tailAngle) * 90 - 8, tailY + Math.sin(tailAngle) * 90 - 8, 8, tailX + Math.cos(tailAngle) * 90, tailY + Math.sin(tailAngle) * 90, ballSize);
  ballGrad.addColorStop(0, "#ffffff");
  ballGrad.addColorStop(1, "#e0e0e0");
  ctx.fillStyle = ballGrad;
  ctx.beginPath();
  ctx.arc(tailX + Math.cos(tailAngle) * 90, tailY + Math.sin(tailAngle) * 90, ballSize, 0, Math.PI * 2);
  ctx.fill();

  // Hands & Collar
  if (isGraspingCollar) {
    drawRiderHands(ctx, centerX, bottomY, riderYOffset);
    
    const collarY = bottomY - 145 + poodleYOffset;
    const collarGrad = ctx.createLinearGradient(centerX - 70, collarY, centerX - 70, collarY + 25);
    collarGrad.addColorStop(0, "#c71585");
    collarGrad.addColorStop(0.5, "#ff69b4");
    collarGrad.addColorStop(1, "#c71585");
    ctx.fillStyle = collarGrad;
    ctx.fillRect(centerX - 70, collarY, 140, 25);
    
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    for(let i=0; i<5; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX - 55 + i * 28, collarY + 12);
        ctx.lineTo(centerX - 50 + i * 28, collarY + 6);
        ctx.lineTo(centerX - 45 + i * 28, collarY + 12);
        ctx.lineTo(centerX - 50 + i * 28, collarY + 18);
        ctx.closePath();
        ctx.fill();
    }
    
    const charmShimmer = Math.sin(time * 3) * 0.5 + 0.5;
    const charmGrad = ctx.createRadialGradient(centerX - 5, collarY + 35, 2, centerX, collarY + 40, 15 + charmShimmer * 2);
    charmGrad.addColorStop(0, "#ffffff");
    charmGrad.addColorStop(0.5, "#e0ffff");
    charmGrad.addColorStop(1, "#afeeee");
    ctx.fillStyle = charmGrad;
    ctx.beginPath();
    ctx.moveTo(centerX, collarY + 25);
    ctx.lineTo(centerX - 15, collarY + 40);
    ctx.lineTo(centerX, collarY + 55);
    ctx.lineTo(centerX + 15, collarY + 40);
    ctx.closePath();
    ctx.fill();
  } else if (isPetting) {
    const petDuration = 0.7;
    const elapsedTime = time - (lastPetTime / 1000);
    const progress = Math.min(elapsedTime / petDuration, 1);
    
    const startY = tiaraY;
    const endY = headY + 40;
    const currentY = startY + (endY - startY) * progress;
    
    const handX = centerX - 45;
    const handGrad = ctx.createRadialGradient(handX - 5, currentY - 5, 5, handX, currentY, 25);
    handGrad.addColorStop(0, "#3b2219");
    handGrad.addColorStop(1, "#2a1811");
    ctx.fillStyle = handGrad;
    ctx.beginPath();
    ctx.arc(handX, currentY, 22, 0, Math.PI * 2);
    ctx.fill();
    
    const handY = bottomY - 110 + riderYOffset;
    ctx.fillStyle = "#3b2219";
    ctx.beginPath();
    ctx.arc(centerX + 50, handY, 18, 0, Math.PI * 2);
    ctx.fill();
  } else {
    const handY = bottomY - 110 + riderYOffset;
    const handGrad = ctx.createRadialGradient(centerX - 55, handY, 5, centerX - 50, handY + 5, 20);
    handGrad.addColorStop(0, "#3b2219");
    handGrad.addColorStop(1, "#2a1811");
    ctx.fillStyle = handGrad;
    ctx.beginPath();
    ctx.arc(centerX - 50, handY, 18, 0, Math.PI * 2);
    ctx.arc(centerX + 50, handY, 18, 0, Math.PI * 2);
    ctx.fill();
  }

  drawPaw(ctx, centerX - 100, bottomY - 20 + poodleYOffset);
  drawPaw(ctx, centerX + 100, bottomY - 20 + poodleYOffset);

  ctx.restore();
}

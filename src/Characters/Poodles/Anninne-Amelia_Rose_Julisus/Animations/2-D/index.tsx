/**
 * ANNINNE-AMELIA RENDERER (2-D)
 * Centralized canvas rendering logic for Anninne-Amelia Rose Julisus.
 */

import { drawRiderLegs, drawRiderHands } from '../../../../Riders/Fairy-Rider/Animations/2-D';
import { DiagnosticManager } from '../../../../../System/Diagnostics/DiagnosticManager';

// Fur texture random values
export const FUR_RANDOM_VALUES_AA = Array.from({ length: 150 }, () => ({
  angle: Math.random() * Math.PI * 2,
  r: 45 + Math.random() * 30,
  r2: 80 + Math.random() * 30
}));

let lastLogTime = 0;
const LOG_INTERVAL = 5000;

const drawAnninneAmeliaPaw = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  const pawGrad = ctx.createRadialGradient(x - 5, y - 5, 5, x, y, 30);
  pawGrad.addColorStop(0, "#ff7f50"); 
  pawGrad.addColorStop(1, "#ff4500");
  ctx.fillStyle = pawGrad;
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.beginPath();
  ctx.ellipse(x - 8, y - 8, 12, 6, -Math.PI/4, 0, Math.PI * 2);
  ctx.fill();
  
  const padGrad = ctx.createRadialGradient(x, y, 2, x, y, 15);
  padGrad.addColorStop(0, "#8b0000"); 
  padGrad.addColorStop(1, "#ff4500");
  ctx.fillStyle = padGrad;
  ctx.beginPath();
  ctx.arc(x, y, 15, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = "#ff4500";
  for(let i=0; i<3; i++) {
    ctx.beginPath();
    ctx.arc(x - 18 + i * 18, y - 18, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    ctx.beginPath();
    ctx.arc(x - 20 + i * 18, y - 20, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ff4500";
  }
};

export function drawAnninneAmeliaRiderView(
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
  
  if (isUmbrellaEquipped) {
    const umbrellaY = bottomY - 420 + (isLeaning ? 60 : 0);
    const umbrellaX = centerX - 45;
    
    ctx.strokeStyle = "#silver";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(umbrellaX, umbrellaY);
    ctx.lineTo(umbrellaX, umbrellaY - 160);
    ctx.stroke();
    
    if (isUmbrellaOpen) {
       const canopyWidth = 220;
       const canopyHeight = 90;
       const umbrellaGrad = ctx.createLinearGradient(umbrellaX - canopyWidth/2, umbrellaY - 160, umbrellaX + canopyWidth/2, umbrellaY - 160);
       umbrellaGrad.addColorStop(0, "#white");
       umbrellaGrad.addColorStop(0.5, "#ffc0cb");
       umbrellaGrad.addColorStop(1, "#white");
       
       ctx.fillStyle = umbrellaGrad;
       ctx.beginPath();
       ctx.ellipse(umbrellaX, umbrellaY - 160, canopyWidth/2, canopyHeight/2, 0, Math.PI, 0); 
       ctx.fill();
    } else {
       ctx.fillStyle = "#ffc0cb";
       ctx.beginPath();
       ctx.ellipse(umbrellaX, umbrellaY - 180, 18, 70, 0, 0, Math.PI * 2);
       ctx.fill();
    }
  }

  const gallopTime = (time * 1000) % 400;
  const gallopBounce = Math.sin((gallopTime / 400) * Math.PI) * 7;
  const leanOffset = isLeaning ? 60 : 0;
  
  const poodleYOffset = gallopBounce;
  const riderYOffset = leanOffset + gallopBounce;

  const breathing = Math.sin(time * 2.5) * 6;

  const now = Date.now();
  if (now - lastLogTime > LOG_INTERVAL) {
    DiagnosticManager.logGraphics('AnninneAmeliaRenderer (2-D)', `Rendering Anninne-Amelia 2-D. Bounce: ${poodleYOffset.toFixed(1)}`);
    lastLogTime = now;
  }
  
  const frontGrad = ctx.createRadialGradient(centerX - 50, bottomY - 200 + poodleYOffset, 25, centerX, bottomY - 180 + poodleYOffset, 180 + breathing);
  frontGrad.addColorStop(0, "#ff7f50");
  frontGrad.addColorStop(1, "#ff4500");
  ctx.fillStyle = frontGrad;
  ctx.beginPath();
  ctx.ellipse(centerX, bottomY - 180 + poodleYOffset, 140 + breathing * 0.5, 125 + breathing * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
  ctx.beginPath();
  ctx.ellipse(centerX - 60, bottomY - 220 + poodleYOffset, 40, 20, -Math.PI/6, 0, Math.PI * 2);
  ctx.fill();
  
  const backGrad = ctx.createRadialGradient(centerX - 40, bottomY - 160 + poodleYOffset, 25, centerX, bottomY - 140 + poodleYOffset, 170 + breathing);
  backGrad.addColorStop(0, "#ff6347");
  backGrad.addColorStop(1, "#ff4500");
  ctx.fillStyle = backGrad;
  ctx.beginPath();
  ctx.ellipse(centerX, bottomY - 140 + poodleYOffset, 130 + breathing * 0.4, 120 + breathing * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 127, 80, 0.5)";
  ctx.lineWidth = 2;
  for(let i=0; i<120; i++) {
    const { angle, r } = FUR_RANDOM_VALUES_AA[i % 150];
    const offsetY = i < 60 ? -180 : -140;
    ctx.beginPath();
    ctx.moveTo(centerX + Math.cos(angle) * r, bottomY + offsetY + poodleYOffset + Math.sin(angle) * r);
    ctx.lineTo(centerX + Math.cos(angle) * (r+18), bottomY + offsetY + poodleYOffset + Math.sin(angle) * (r+18));
    ctx.stroke();
  }

  const riderY = bottomY - 250 + riderYOffset;
  const riderWidth = 85;
  const riderHeight = 110;
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
  ctx.arc(centerX, riderY - 70, 24, 0, Math.PI * 2);
  ctx.fill();

  drawRiderLegs(ctx, centerX, bottomY, riderYOffset);

  const headW = 100; // Excludes ears (precision update)
  const headH = 95; // Excludes ears (precision update)
  const headY = bottomY - 380 + poodleYOffset;
  
  const headGrad = ctx.createRadialGradient(centerX - 30, headY - 30, 15, centerX, headY, headW * 1.2);
  headGrad.addColorStop(0, "#ff8c00");
  headGrad.addColorStop(1, "#ff4500");
  ctx.fillStyle = headGrad;
  ctx.beginPath();
  ctx.ellipse(centerX, headY, headW, headH, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ff7f50"; 
  for (let i = 0; i < 14; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const verticalSpread = Math.floor(i / 2);
    const wave = Math.sin(time * 2 + verticalSpread) * 8;
    const horizontalOpening = (verticalSpread === 0) ? 20 : 0;
    const x = centerX + (side * (85 + horizontalOpening)) + wave;
    const y = headY + (verticalSpread * 35) + 5;
    ctx.beginPath();
    ctx.ellipse(x, y, 77, 105, (side * Math.PI / 10) + (wave * 0.02), 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.beginPath();
    ctx.ellipse(x - (side * 20), y - 30, 22, 44, side * Math.PI/10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ff7f50";
  }

  ctx.fillStyle = "#0000ff";
  ctx.beginPath();
  ctx.ellipse(centerX - 35, headY - 15, 12, 16, 0, 0, Math.PI * 2);
  ctx.ellipse(centerX + 35, headY - 15, 12, 16, 0, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.beginPath();
  ctx.arc(centerX - 40, headY - 22, 6, 0, Math.PI * 2);
  ctx.arc(centerX + 30, headY - 22, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.beginPath();
  ctx.arc(centerX - 32, headY - 8, 3, 0, Math.PI * 2);
  ctx.arc(centerX + 38, headY - 8, 3, 0, Math.PI * 2);
  ctx.fill();

  const noseY = headY + 35;
  const noseGrad = ctx.createRadialGradient(centerX - 5, noseY - 4, 3, centerX, noseY, 20);
  noseGrad.addColorStop(0, "#ff6347");
  noseGrad.addColorStop(1, "#8b0000");
  ctx.fillStyle = noseGrad;
  ctx.beginPath();
  ctx.ellipse(centerX, noseY, 20, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.beginPath();
  ctx.ellipse(centerX - 6, noseY - 4, 8, 4, -Math.PI / 8, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.beginPath();
  ctx.arc(centerX - 9, noseY - 6, 2, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.beginPath();
  ctx.ellipse(centerX + 6, noseY + 4, 4, 2, Math.PI / 6, 0, Math.PI * 2);
  ctx.fill();

  const tiaraY = headY - 110;
  const tiaraGrad = ctx.createLinearGradient(centerX - 60, tiaraY - 60, centerX + 60, tiaraY);
  tiaraGrad.addColorStop(0, "#ffd700");
  tiaraGrad.addColorStop(0.5, "#fffacd");
  tiaraGrad.addColorStop(1, "#ffd700");
  ctx.fillStyle = tiaraGrad;
  ctx.beginPath();
  ctx.moveTo(centerX - 65, tiaraY);
  ctx.lineTo(centerX, tiaraY - 70);
  ctx.lineTo(centerX + 65, tiaraY);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.beginPath();
  ctx.moveTo(centerX - 12, tiaraY - 55);
  ctx.lineTo(centerX, tiaraY - 75);
  ctx.lineTo(centerX + 12, tiaraY - 55);
  ctx.fill();
  
  const gemPulse = Math.sin(time * 5) * 1;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(centerX, tiaraY - 55 - gemPulse);
  ctx.lineTo(centerX + 15, tiaraY - 33);
  ctx.lineTo(centerX, tiaraY - 11 + gemPulse);
  ctx.lineTo(centerX - 15, tiaraY - 33);
  ctx.closePath();
  ctx.fill();

  const tailWagSpeed = isPetting ? 12 : 4;
  const tailWagRange = isPetting ? 0.3 : 0.1;
  const tailAngle = -Math.PI / 4 + Math.sin(time * tailWagSpeed) * tailWagRange; 
  const tailX = centerX + 120;
  const tailY = bottomY - 140 + poodleYOffset;
  
  ctx.strokeStyle = "#ff7f50";
  ctx.lineWidth = 15;
  ctx.beginPath();
  ctx.moveTo(tailX, tailY);
  ctx.lineTo(tailX + Math.cos(tailAngle) * 120, tailY + Math.sin(tailAngle) * 120);
  ctx.stroke();
  
  const ballX = tailX + Math.cos(tailAngle) * 120;
  const ballY = tailY + Math.sin(tailAngle) * 120;
  const ballGrad = ctx.createRadialGradient(ballX - 10, ballY - 10, 10, ballX, ballY, 45);
  ballGrad.addColorStop(0, "#ff8c00");
  ballGrad.addColorStop(1, "#ff4500");
  ctx.fillStyle = ballGrad;
  ctx.beginPath();
  ctx.arc(ballX, ballY, 45, 0, Math.PI * 2);
  ctx.fill();

  if (isGraspingCollar) {
    drawRiderHands(ctx, centerX, bottomY, riderYOffset);
    const collarY = bottomY - 165 + poodleYOffset;
    ctx.fillStyle = "#ffd700";
    ctx.fillRect(centerX - 80, collarY, 160, 30);
    for(let i=0; i<5; i++) {
        const x = centerX - 65 + i * 32;
        ctx.fillStyle = i % 2 === 0 ? "#00ff00" : "#ff0000";
        ctx.beginPath();
        ctx.moveTo(x, collarY + 15);
        ctx.lineTo(x + 10, collarY + 5);
        ctx.lineTo(x + 20, collarY + 15);
        ctx.lineTo(x + 10, collarY + 25);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.stroke();
    }
    ctx.fillStyle = "#e0ffff";
    ctx.beginPath();
    ctx.moveTo(centerX - 25, collarY + 50);
    ctx.lineTo(centerX, collarY + 35);
    ctx.lineTo(centerX + 25, collarY + 50);
    ctx.lineTo(centerX, collarY + 65);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.beginPath();
    ctx.arc(centerX - 5, collarY + 45, 4, 0, Math.PI * 2);
    ctx.fill();
  } else if (isPetting) {
    const petDuration = 0.7;
    const elapsedTime = time - (lastPetTime / 1000);
    const progress = Math.min(elapsedTime / petDuration, 1);
    const startY = tiaraY;
    const endY = headY + 50; 
    const currentY = startY + (endY - startY) * progress;
    const handX = centerX - 40;
    const handGrad = ctx.createRadialGradient(handX - 5, currentY - 5, 5, handX, currentY, 25);
    handGrad.addColorStop(0, "#3b2219");
    handGrad.addColorStop(1, "#2a1811");
    ctx.fillStyle = handGrad;
    ctx.beginPath();
    ctx.arc(handX, currentY, 25, 0, Math.PI * 2);
    ctx.fill();
    const rightHandY = bottomY - 120 + riderYOffset;
    ctx.fillStyle = "#3b2219";
    ctx.beginPath();
    ctx.arc(centerX + 60, rightHandY, 20, 0, Math.PI * 2);
    ctx.fill();
  } else {
    const handY = bottomY - 120 + riderYOffset;
    ctx.fillStyle = "#3b2219";
    ctx.beginPath();
    ctx.arc(centerX - 60, handY, 20, 0, Math.PI * 2);
    ctx.arc(centerX + 60, handY, 20, 0, Math.PI * 2);
    ctx.fill();
  }

  drawAnninneAmeliaPaw(ctx, centerX - 120, bottomY - 25 + poodleYOffset);
  drawAnninneAmeliaPaw(ctx, centerX + 120, bottomY - 25 + poodleYOffset);

  ctx.restore();
}

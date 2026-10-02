/**
 * Abigail Marigold Kenyatta: 2nd-Rendering
 * Featuring refined craftsmanship for the ally character.
 */

import { DiagnosticManager } from '../../../../../System/Diagnostics/DiagnosticManager';

let lastLogTime = 0;
const LOG_INTERVAL = 5000;

export const ABIGAIL_FUR_RANDOM = Array.from({ length: 80 }, () => ({
  angle: Math.random() * Math.PI * 2,
  r: 35 + Math.random() * 20
}));

export const ABIGAIL_DIMENSIONS = {
    shoulderHeightFeet: 5.25, 
    totalHeightFeet: 8.0, 
    tiaraHeightFeet: 9.0, 
    headWidth: 100.8, // Excludes ears (precision update)
    headHeight: 86.4, // Excludes ears (precision update) 
    headScale: 1.15,
    neckWidth: 65,
    description: "Elegant, slender, and athletic build finalized via scientific precision."
};

export function drawAbigailRiderView(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  isLeaning: boolean,
  time: number,
  isPetting: boolean = false,
  lastPetTime: number = 0
) {
  const centerX = width / 2;
  const bottomY = height - 50;
  
  ctx.save();

  const tailWagSpeed = isPetting ? 15 : 6;
  const tailWagRange = isPetting ? 0.3 : 0.1;
  const gallopTime = (time * 1000) % 300;
  const gallopBounce = Math.sin((gallopTime / 300) * Math.PI) * 4;
  const leanOffset = isLeaning ? 45 : 0;
  
  const poodleYOffset = gallopBounce;
  const riderYOffset = leanOffset + gallopBounce;
  
  const now = Date.now();
  if (now - lastLogTime > LOG_INTERVAL) {
    DiagnosticManager.logGraphics('AbigailRenderer', `Rendering Abigail. Gallop (300ms) Bounce: ${poodleYOffset.toFixed(1)}`);
    lastLogTime = now;
  }

  const breathing = Math.sin(time * 3.5) * 4;
  
  const bodyY = bottomY - 150 + poodleYOffset;
  const bodyRadius = 110 + breathing * 0.4;
  const bodyGradFront = ctx.createRadialGradient(centerX - 35, bodyY - 20, 15, centerX, bodyY, bodyRadius);
  bodyGradFront.addColorStop(0, "#fffaf0"); 
  bodyGradFront.addColorStop(1, "#fdf5e6"); 
  ctx.fillStyle = bodyGradFront;
  ctx.beginPath();
  ctx.ellipse(centerX, bodyY, bodyRadius, 100 + breathing * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();

  const backY = bodyY + 30; 
  const backRadius = 100 + breathing * 0.3;
  const bodyGradBack = ctx.createRadialGradient(centerX - 30, backY - 15, 10, centerX, backY, backRadius);
  bodyGradBack.addColorStop(0, "#fffaf0");
  bodyGradBack.addColorStop(1, "#f5f5dc"); 
  ctx.fillStyle = bodyGradBack;
  ctx.beginPath();
  ctx.ellipse(centerX, backY, backRadius, 90 + breathing * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 200; i++) {
    const isFront = i < 120;
    const angle = (i / 200) * Math.PI * 2;
    const currentY = isFront ? bodyY : backY;
    const currentRadius = isFront ? bodyRadius : backRadius;
    const r = currentRadius * (0.1 + Math.random() * 0.9);
    const fx = centerX + Math.cos(angle) * r;
    const fy = currentY + Math.sin(angle) * r * 0.9;
    ctx.beginPath();
    ctx.moveTo(fx, fy);
    ctx.lineTo(fx + Math.cos(angle) * 5, fy + Math.sin(angle) * 5);
    ctx.stroke();
  }

  const riderY = bottomY - 210 + riderYOffset;
  const riderWidth = 70; 
  const riderHeight = 90;
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
  ctx.arc(centerX, riderY - 60, 20, 0, Math.PI * 2);
  ctx.fill();

  const legFusionDepth = 25; 
  ctx.save();
  ctx.translate(0, legFusionDepth);
  
  const legGrad = ctx.createLinearGradient(centerX - 80, bottomY - 140 + riderYOffset, centerX - 20, bottomY - 20 + riderYOffset);
  legGrad.addColorStop(0, "#00008b");
  legGrad.addColorStop(1, "#000044"); 
  ctx.fillStyle = legGrad;
  
  ctx.beginPath();
  ctx.ellipse(centerX - 42, bottomY - 80 + riderYOffset, 25, 55, Math.PI / 8, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.beginPath();
  ctx.ellipse(centerX + 42, bottomY - 80 + riderYOffset, 25, 55, -Math.PI / 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const headRadiusX = ABIGAIL_DIMENSIONS.headWidth / 2;
  const headRadiusY = ABIGAIL_DIMENSIONS.headHeight / 2;
  const headY = bottomY - 187.2 + poodleYOffset; 
  const hScale = ABIGAIL_DIMENSIONS.headScale;

  ctx.save();
  ctx.strokeStyle = "rgba(253, 245, 230, 0.8)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 60; i++) {
    const hairX = centerX - 90 + Math.random() * 180;
    const hairY = headY - 40 + Math.random() * 20;
    const hairLen = 120 + Math.random() * 40;
    ctx.beginPath();
    ctx.moveTo(hairX, hairY);
    ctx.bezierCurveTo(hairX + 20, hairY + hairLen / 2, hairX - 20, hairY + hairLen, hairX, hairY + hairLen);
    ctx.stroke();
  }
  ctx.restore();
  
  const headGrad = ctx.createRadialGradient(centerX - 15 * hScale, headY - 15 * hScale, 10 * hScale, centerX, headY, headRadiusX);
  headGrad.addColorStop(0, "#fffaf0");
  headGrad.addColorStop(1, "#faf0e6"); 
  ctx.fillStyle = headGrad;
  ctx.beginPath();
  ctx.ellipse(centerX, headY, headRadiusX, headRadiusY, 0, 0, Math.PI * 2);
  ctx.fill();

  const tiaraY = headY - headRadiusY - 15; 
  ctx.fillStyle = "#b76e79"; 
  ctx.beginPath();
  ctx.moveTo(centerX - 60, tiaraY);
  ctx.quadraticCurveTo(centerX, tiaraY - 40, centerX + 60, tiaraY);
  ctx.lineTo(centerX + 60, tiaraY + 15);
  ctx.quadraticCurveTo(centerX, tiaraY - 25, centerX - 60, tiaraY + 15);
  ctx.closePath();
  ctx.fill();

  for (let i = -2; i <= 2; i++) {
    const fx = centerX + i * 25;
    const fy = tiaraY - 5 - (Math.abs(i) === 0 ? 10 : 0);
    ctx.fillStyle = "#fffaf0"; 
    for (let p = 0; p < 5; p++) {
        const pa = (p / 5) * Math.PI * 2;
        ctx.beginPath();
        ctx.arc(fx + Math.cos(pa) * 6, fy + Math.sin(pa) * 6, 5, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.fillStyle = "#ffdb58"; 
    ctx.beginPath();
    ctx.arc(fx, fy, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  const gemRadius = 25.5; 
  const fx = centerX;
  const fy = tiaraY - 15;
  
  ctx.fillStyle = "#ffb6c1"; 
  for (let p = 0; p < 6; p++) {
    const pa = (p / 6) * Math.PI * 2;
    ctx.beginPath();
    ctx.ellipse(fx + Math.cos(pa) * 15, fy + Math.sin(pa) * 15, 12, 8, pa, 0, Math.PI * 2);
    ctx.fill();
  }
  
  const gemGrad = ctx.createRadialGradient(fx - 5, fy - 5, 2, fx, fy, 15);
  gemGrad.addColorStop(0, "#ffffff");
  gemGrad.addColorStop(0.3, "#ff69b4");
  gemGrad.addColorStop(1, "#c71585");
  ctx.fillStyle = gemGrad;
  ctx.beginPath();
  ctx.arc(fx, fy, 12, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.beginPath();
  ctx.arc(fx - 4, fy - 4, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255, 165, 0, 0.15)"; 
  ctx.beginPath();
  ctx.ellipse(centerX + 20, headY - 30, 40, 20, Math.PI/4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#4169e1"; 
  ctx.beginPath();
  ctx.arc(centerX - 25 * hScale, headY - 5, 7 * hScale, 0, Math.PI * 2);
  ctx.arc(centerX + 25 * hScale, headY - 5, 7 * hScale, 0, Math.PI * 2);
  ctx.fill();

  const noseY = headY + 25;
  const noseWidth = 14 * hScale;
  const noseHeight = 9 * hScale;
  const noseGrad = ctx.createRadialGradient(centerX - 3 * hScale, noseY - 2 * hScale, 2 * hScale, centerX, noseY, noseWidth);
  noseGrad.addColorStop(0, "#ffc0cb");
  noseGrad.addColorStop(0.7, "#ffb6c1");
  noseGrad.addColorStop(1, "#ff69b4");
  ctx.fillStyle = noseGrad;
  ctx.beginPath();
  ctx.ellipse(centerX, noseY, noseWidth, noseHeight, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.beginPath();
  ctx.ellipse(centerX - 5 * hScale, noseY - 3 * hScale, 6 * hScale, 3 * hScale, -Math.PI / 6, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.beginPath();
  ctx.arc(centerX - 7 * hScale, noseY - 4 * hScale, 1.5 * hScale, 0, Math.PI * 2);
  ctx.fill();

  const collarY = bottomY - 135 + poodleYOffset;
  ctx.fillStyle = "#b76e79"; 
  ctx.beginPath();
  // @ts-ignore
  if (ctx.roundRect) {
    // @ts-ignore
    ctx.roundRect(centerX - 65, collarY, 130, 25, 5);
  } else {
    ctx.rect(centerX - 65, collarY, 130, 25);
  }
  ctx.fill();
  
  ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    const dx = centerX - 50 + i * 25;
    ctx.beginPath();
    ctx.moveTo(dx, collarY + 5);
    ctx.lineTo(dx + 10, collarY + 12.5);
    ctx.lineTo(dx, collarY + 20);
    ctx.lineTo(dx - 10, collarY + 12.5);
    ctx.closePath();
    ctx.stroke();
    
    ctx.fillStyle = "rgba(224, 255, 255, 0.9)"; 
    ctx.beginPath();
    ctx.moveTo(dx, collarY + 8);
    ctx.lineTo(dx + 5, collarY + 12.5);
    ctx.lineTo(dx, collarY + 17);
    ctx.lineTo(dx - 5, collarY + 12.5);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(dx - 2, collarY + 10, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  if (isPetting) {
    const petDuration = 0.7;
    const elapsedTime = time - (lastPetTime / 1000);
    const progress = Math.min(elapsedTime / petDuration, 1);
    
    const startY = headY + 20; 
    const endY = headY + 120; 
    const currentY = startY + (endY - startY) * progress;
    
    const handX = centerX - 55;
    const handGrad = ctx.createRadialGradient(handX - 5, currentY - 5, 5, handX, currentY, 25);
    handGrad.addColorStop(0, "#3b2219");
    handGrad.addColorStop(1, "#2a1811");
    ctx.fillStyle = handGrad;
    ctx.beginPath();
    ctx.arc(handX, currentY, 24, 0, Math.PI * 2);
    ctx.fill();
    
    const rightHandY = bottomY - 100 + riderYOffset;
    ctx.fillStyle = "#3b2219";
    ctx.beginPath();
    ctx.arc(centerX + 60, rightHandY, 20, 0, Math.PI * 2);
    ctx.fill();
  } else {
    const handY = bottomY - 100 + riderYOffset;
    ctx.fillStyle = "#3b2219";
    ctx.beginPath();
    ctx.arc(centerX - 60, handY, 20, 0, Math.PI * 2);
    ctx.arc(centerX + 60, handY, 20, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

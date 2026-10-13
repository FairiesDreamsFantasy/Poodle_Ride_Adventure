import { GameState } from '../../../../System/Engine/Core/Types';

export function drawOlgaOlivia(ctx: CanvasRenderingContext2D, x: number, y: number, state: GameState, isBarking: boolean) {
  // Olga-Olivia: Priscilla's poodle partner.
  // [CRAFTED BABYLONIAN DESIGN]
  const time = Date.now();
  const bobbing = Math.sin(time / 150) * 5; // Chaotic bobbing
  
  ctx.save();
  ctx.translate(x, y + bobbing);
  
  // 1. Babylonian Body (Mottled Dark Grey)
  ctx.fillStyle = '#444444';
  ctx.beginPath();
  ctx.ellipse(0, 0, 14, 10, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // 2. Head with short "Babylonian static" hair
  ctx.save();
  if (isBarking) {
    ctx.rotate(-0.15);
    ctx.translate(0, -3);
  }
  
  // Head Circle
  ctx.fillStyle = '#555555';
  ctx.beginPath();
  ctx.arc(12, -8, 8, 0, Math.PI * 2);
  ctx.fill();
  
  // Babylonian Static Hair (Short and rushed)
  ctx.strokeStyle = '#333333';
  ctx.lineWidth = 1.5;
  for(let i=0; i<360; i+=30) {
    const angle = i * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(12 + Math.cos(angle) * 8, -8 + Math.sin(angle) * 8);
    ctx.lineTo(12 + Math.cos(angle) * 12, -8 + Math.sin(angle) * 12);
    ctx.stroke();
  }
  
  // 3. Eyebrows (Easy to see)
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(5, -14); ctx.lineTo(11, -16); // Left
  ctx.moveTo(13, -16); ctx.lineTo(19, -14); // Right
  ctx.stroke();
  
  // 4. Wet Nose (Shiny but dark)
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(19, -6, 3, 0, Math.PI * 2);
  ctx.fill();
  // Wet highlight
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.beginPath();
  ctx.arc(20, -7, 1, 0, Math.PI * 2);
  ctx.fill();

  // 5. Dull Charm (Gray, no shine)
  ctx.fillStyle = '#666';
  ctx.fillRect(8, 2, 5, 5);
  
  ctx.restore();
  
  // 6. Babylonian Paws (Accurate poodle shape but jerky)
  const pawOffset = Math.sin(time / 100) * 4;
  ctx.fillStyle = '#333';
  // Front Paws
  ctx.fillRect(8, 10 + pawOffset, 6, 6);
  ctx.fillRect(-2, 10 - pawOffset, 6, 6);
  // Back Paws
  ctx.fillRect(-12, 10 + pawOffset, 6, 6);
  
  // Turned Squares Detection (Visual Hitbox)
  if (false) { // BitMode not currently active
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(-18, -20, 40, 40);
  }

  ctx.restore();
}

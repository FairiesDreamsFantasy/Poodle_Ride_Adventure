import { GameState } from '../../../../../System/Engine/Core/Types';
import { playSlidingDoor } from '../../../../../System/Sound/SFX/Alphabetical/D/Door';

export interface ArenaStartProps {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  state: GameState;
  time: number;
}

export function drawArenaStart(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number): void {
  const scaleX = width / 500;
  const scaleY = height / 500;

  // 500ft x 500ft Start Courtyard
  ctx.fillStyle = '#263238'; // Dark slate start courtyard
  ctx.fillRect(0, 0, width, height);

  // Sub-buffer courtyard marking
  ctx.fillStyle = '#37474F';
  ctx.fillRect(20 * scaleX, 20 * scaleY, 460 * scaleX, 460 * scaleY);

  // 20ft wide x 20ft high Sliding Start Gates (Each leaf 10ft wide)
  // Decorated with Rainbow, Green Horizon, and Blue Sky picture
  const gateX = 230 * scaleX;
  const gateY = 10 * scaleY;
  const gateW = 40 * scaleX;
  const gateH = 20 * scaleY;

  // Blue Sky Background on Gate
  ctx.fillStyle = '#29B6F6';
  ctx.fillRect(gateX, gateY, gateW, gateH);

  // Rainbow Arches on Gate
  const rainbowColors = ['#FF2A2A', '#FF9F00', '#FFFC00', '#00E600', '#00BFFF', '#8A2BE2'];
  rainbowColors.forEach((color, idx) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2 * scaleX;
    ctx.beginPath();
    ctx.arc(gateX + gateW / 2, gateY + gateH, (18 - idx * 2.5) * scaleX, Math.PI, 0);
    ctx.stroke();
  });

  // Green Horizon at bottom of Gate Picture
  ctx.fillStyle = '#4CAF50';
  ctx.fillRect(gateX, gateY + gateH - 4 * scaleY, gateW, 4 * scaleY);

  // Gate Leaf Divider Line
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(gateX + gateW / 2, gateY);
  ctx.lineTo(gateX + gateW / 2, gateY + gateH);
  ctx.stroke();

  // Text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `${Math.max(10, Math.floor(12 * scaleX))}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText("ARENA START GATE (20% AMPLIFIED SOUND)", 250 * scaleX, 60 * scaleY);
}

export function triggerGateOpeningSound(): void {
  // 20% Amplified Sliding Door Sound for Start Gate
  playSlidingDoor({ amplified: true, volumeMultiplier: 1.2, duration: 1.2 });
}

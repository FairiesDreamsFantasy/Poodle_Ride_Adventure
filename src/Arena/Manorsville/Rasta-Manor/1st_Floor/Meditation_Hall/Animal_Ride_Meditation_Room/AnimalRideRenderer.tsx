import { GameState } from '../../../../../../System/Engine/Core/Types';

export function drawAnimalRideMeditationRoom(ctx: CanvasRenderingContext2D, width: number, height: number, horizon: number, state: GameState) {
  // Floor
  ctx.fillStyle = "#e6e6fa"; // Lavender floor
  ctx.fillRect(0, horizon, width, height - horizon);

  // Rug at center
  ctx.fillStyle = "#ff69b4"; // Hot pink rug
  ctx.beginPath();
  ctx.ellipse(width/2, horizon + (height-horizon)/2, width*0.3, (height-horizon)*0.3, 0, 0, Math.PI*2);
  ctx.fill();

  // Natural light from roof (Sun rays)
  ctx.save();
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = "#ffffcc";
  ctx.beginPath();
  ctx.moveTo(width * 0.2, 0);
  ctx.lineTo(width * 0.8, 0);
  ctx.lineTo(width * 0.9, height);
  ctx.lineTo(width * 0.1, height);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Toy Animals along the wall
  const animals = [
    { type: 'Rabbit', colors: ['white', 'red', 'pink', 'blue', 'yellow'] },
    { type: 'Cat', colors: ['white', 'orange', 'red', 'pink', 'yellow-orange'] },
    { type: 'Poodle', colors: ['white', 'pink', 'red-orange', 'green', 'yellow', 'orange', 'magenta', 'violet'] },
    { type: 'Mouse', colors: ['white'] }
  ];

  // Draw some placeholder toy animals
  ctx.save();
  animals.forEach((animal, i) => {
    const x = 50 + i * 150;
    const y = horizon + 50;
    ctx.fillStyle = animal.colors[0];
    ctx.fillRect(x, y, 40, 40);
    ctx.fillStyle = "#000";
    ctx.font = "10px Arial";
    ctx.fillText(animal.type, x, y - 5);
  });
  ctx.restore();

  // Tea party tables
  ctx.fillStyle = "#8b4513";
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(width * 0.7, horizon + 100 + i * 100, 60, 40);
  }

  // Plants
  ctx.fillStyle = "#228b22";
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(50 + i * 100, height - 50, 20, 0, Math.PI * 2);
    ctx.fill();
  }
}

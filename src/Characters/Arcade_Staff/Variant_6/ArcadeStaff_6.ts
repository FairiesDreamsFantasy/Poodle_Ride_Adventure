export const metadata = {
  variantId: 6,
  name: "Kenzo Shinto",
  gender: "Male",
  heightFeet: 5.5,
  religion: "Shintoist-Buddhist-Hindu Mix (Babylon-Free)",
  attire: "Clean white Shinto style wrap shirt with gold arcade patterns, dark blue trousers"
};

export const drawVariant6 = (ctx: CanvasRenderingContext2D, scale: number, time: number) => {
  const bob = Math.cos(time * 0.005) * 2;
  ctx.save();
  ctx.scale(scale, scale);

  // Geta sandals
  ctx.fillStyle = "#8b4513";
  ctx.fillRect(-8, -5 + bob, 5, 5);
  ctx.fillRect(3, -5 + bob, 5, 5);

  // Deep indigo solid trousers
  ctx.fillStyle = "#121f3d";
  ctx.fillRect(-7, -32 + bob, 4, 27);
  ctx.fillRect(3, -32 + bob, 4, 27);

  // Shinto Haori top (white & gold)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-12, -70 + bob, 24, 38);
  ctx.strokeStyle = "#ffd700"; // Gold trim
  ctx.lineWidth = 1.5;
  ctx.strokeRect(-12, -70 + bob, 24, 38);

  // Sash (Red Shinto/Hindu style)
  ctx.fillStyle = "#cc0000";
  ctx.fillRect(-13, -52 + bob, 26, 4);

  // Head
  ctx.fillStyle = "#ffd1a4"; // Asian-olive skin tone
  ctx.beginPath();
  ctx.arc(0, -80 + bob, 9, 0, Math.PI * 2);
  ctx.fill();

  // Purple/White prayer hat (Buddhist/Shinto)
  ctx.fillStyle = "#483d8b";
  ctx.fillRect(-7, -93 + bob, 14, 4);
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.moveTo(0, -93 + bob);
  ctx.lineTo(-4, -89 + bob);
  ctx.lineTo(4, -89 + bob);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
};

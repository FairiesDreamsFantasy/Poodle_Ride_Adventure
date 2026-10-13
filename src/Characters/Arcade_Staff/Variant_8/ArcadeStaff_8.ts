export const metadata = {
  variantId: 8,
  name: "Little Rahula",
  gender: "Male",
  heightFeet: 2.0, // 24 inches (very small but dedicated staff)
  religion: "Buddhist-Hindu-Rastafarian Mix (Babylon-Free)",
  attire: "Tiny crimson monk's tunic styled after arcade neon lights"
};

export const drawVariant8 = (ctx: CanvasRenderingContext2D, scale: number, time: number) => {
  const bob = Math.cos(time * 0.008) * 1.5;
  ctx.save();
  ctx.scale(scale, scale);

  // Tiny slippers
  ctx.fillStyle = "#ff5500";
  ctx.fillRect(-4, -2 + bob, 3, 2);
  ctx.fillRect(1, -2 + bob, 3, 2);

  // Tiny legs
  ctx.fillStyle = "#f3d2b2";
  ctx.fillRect(-3, -8 + bob, 2, 6);
  ctx.fillRect(1, -8 + bob, 2, 6);

  // Monk's tunic (Crimson)
  ctx.fillStyle = "#a80000";
  ctx.fillRect(-6, -24 + bob, 12, 16);

  // Bright yellow sash belt
  ctx.fillStyle = "#ffea00";
  ctx.fillRect(-6.5, -16 + bob, 13, 3);

  // Head
  ctx.fillStyle = "#e0ac69"; // Light golden-tan skin
  ctx.beginPath();
  ctx.arc(0, -29 + bob, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // Orange small wrap hat
  ctx.fillStyle = "#ff6600";
  ctx.beginPath();
  ctx.arc(0, -33 + bob, 4.5, Math.PI, 0);
  ctx.fill();

  ctx.restore();
};

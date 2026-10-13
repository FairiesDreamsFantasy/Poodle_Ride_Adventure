export const metadata = {
  variantId: 4,
  name: "Chandra Priya",
  gender: "Female",
  heightFeet: 6.9,
  religion: "Buddhist-Hindu-Rastafarian",
  attire: "Modest crimson sari-wrap with gold circuitry stitching and neon accents"
};

export const drawVariant4 = (ctx: CanvasRenderingContext2D, scale: number, time: number) => {
  const bob = Math.cos(time * 0.006) * 2.5;
  ctx.save();
  ctx.scale(scale, scale);

  // Slippers (Gold)
  ctx.fillStyle = "#ffd700";
  ctx.fillRect(-7, -4 + bob, 5, 4);
  ctx.fillRect(2, -4 + bob, 5, 4);

  // Crimson modest sari legs
  ctx.fillStyle = "#990000";
  ctx.fillRect(-8, -30 + bob, 5, 26);
  ctx.fillRect(3, -30 + bob, 5, 26);

  // Elegant modest sari fold (wrap)
  ctx.beginPath();
  ctx.moveTo(-14, -30 + bob);
  ctx.lineTo(14, -30 + bob);
  ctx.lineTo(10, -80 + bob);
  ctx.lineTo(-10, -80 + bob);
  ctx.closePath();
  ctx.fill();

  // Gold circuit sash lines
  ctx.strokeStyle = "#ffd700";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-10, -50 + bob);
  ctx.lineTo(10, -65 + bob);
  ctx.stroke();

  // Head
  ctx.fillStyle = "#c58f5d"; // Indian-peachy skin tone
  ctx.beginPath();
  ctx.arc(0, -90 + bob, 9, 0, Math.PI * 2);
  ctx.fill();

  // Emerald head wrap
  ctx.fillStyle = "#097969";
  ctx.beginPath();
  ctx.ellipse(0, -100 + bob, 11, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};

export const metadata = {
  variantId: 2,
  name: "Zola Amelia",
  gender: "Female",
  heightFeet: 7.5, // Female up to 8ft
  religion: "Rastafarian-Buddhist",
  attire: "Clean orange sash with neon blue arcade graphics over Babylon-Free stocking-pants"
};

export const drawVariant2 = (ctx: CanvasRenderingContext2D, scale: number, time: number) => {
  const bob = Math.cos(time * 0.005) * 3;
  ctx.save();
  ctx.scale(scale, scale);

  // Shoes
  ctx.fillStyle = "#222222";
  ctx.fillRect(-9, -6 + bob, 6, 6);
  ctx.fillRect(3, -6 + bob, 6, 6);

  // Stockings
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-8, -40 + bob, 4, 34);
  ctx.fillRect(4, -40 + bob, 4, 34);

  // Dress (Orange & Yellow Buddhist arcade theme)
  ctx.fillStyle = "#ff6600";
  ctx.beginPath();
  ctx.moveTo(-16, -40 + bob);
  ctx.lineTo(16, -40 + bob);
  ctx.lineTo(12, -85 + bob);
  ctx.lineTo(-12, -85 + bob);
  ctx.closePath();
  ctx.fill();

  // Sash (Neon blue)
  ctx.fillStyle = "#00ffff";
  ctx.fillRect(-13, -65 + bob, 26, 5);

  // Head
  ctx.fillStyle = "#8d5524"; // Beautiful rich deep skin tone
  ctx.beginPath();
  ctx.arc(0, -96 + bob, 10, 0, Math.PI * 2);
  ctx.fill();

  // Violet Hairwrap
  ctx.fillStyle = "#8a2be2";
  ctx.beginPath();
  ctx.ellipse(0, -106 + bob, 11, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};

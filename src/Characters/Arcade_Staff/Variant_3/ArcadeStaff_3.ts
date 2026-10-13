export const metadata = {
  variantId: 3,
  name: "Nesta Shoshana",
  gender: "Female",
  heightFeet: 5.8,
  religion: "Shintoist-Rastafarian",
  attire: "Jade green robe with traditional Japanese waves and red arcade button accents"
};

export const drawVariant3 = (ctx: CanvasRenderingContext2D, scale: number, time: number) => {
  const bob = Math.sin(time * 0.004) * 3;
  ctx.save();
  ctx.scale(scale, scale);

  // Wooden sandals (Geta)
  ctx.fillStyle = "#8b4513";
  ctx.fillRect(-8, -5 + bob, 6, 3);
  ctx.fillRect(2, -5 + bob, 6, 3);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-6, -8 + bob, 3, 3);
  ctx.fillRect(4, -8 + bob, 3, 3);

  // Jade Robe (Full length to feet)
  ctx.fillStyle = "#00a86b"; // Jade
  ctx.beginPath();
  ctx.moveTo(-15, -8 + bob);
  ctx.lineTo(15, -8 + bob);
  ctx.lineTo(11, -75 + bob);
  ctx.lineTo(-11, -75 + bob);
  ctx.closePath();
  ctx.fill();

  // Red button symbols on robe
  ctx.fillStyle = "#ff3333";
  ctx.beginPath();
  ctx.arc(-4, -50 + bob, 2, 0, Math.PI * 2);
  ctx.arc(4, -35 + bob, 2, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.fillStyle = "#ffdbac"; // Warm light skin
  ctx.beginPath();
  ctx.arc(0, -84 + bob, 9, 0, Math.PI * 2);
  ctx.fill();

  // White Shinto Crown Headwrap
  ctx.fillStyle = "#fcfdf2";
  ctx.beginPath();
  ctx.moveTo(-9, -92 + bob);
  ctx.lineTo(9, -92 + bob);
  ctx.lineTo(0, -104 + bob);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
};

export const metadata = {
  variantId: 1,
  name: "Althea Rose",
  gender: "Female",
  heightFeet: 6.2,
  religion: "Rastafarian-Shintoist",
  attire: "Retro neon arcade kimono styled vest over Babylon-Free protective trousers"
};

export const drawVariant1 = (ctx: CanvasRenderingContext2D, scale: number, time: number) => {
  const bob = Math.sin(time * 0.005) * 3;
  ctx.save();
  ctx.scale(scale, scale);

  // Shoes (Black sneakers)
  ctx.fillStyle = "#111111";
  ctx.fillRect(-8, -6 + bob, 6, 6);
  ctx.fillRect(2, -6 + bob, 6, 6);

  // Trousers (Neon Emerald)
  ctx.fillStyle = "#00ff66";
  ctx.fillRect(-8, -35 + bob, 5, 29);
  ctx.fillRect(3, -35 + bob, 5, 29);

  // Vest/Shintoist Top (Deep Indigo with Ruby trim)
  ctx.fillStyle = "#4b0082";
  ctx.fillRect(-12, -75 + bob, 24, 40);
  ctx.fillStyle = "#ff0055"; // Ruby sash
  ctx.fillRect(-13, -55 + bob, 26, 6);

  // Head
  ctx.fillStyle = "#f5d0a9"; // Peach complexion
  ctx.beginPath();
  ctx.arc(0, -88 + bob, 10, 0, Math.PI * 2);
  ctx.fill();

  // Rastafarian Golden Wrap (Turban)
  ctx.fillStyle = "#ffd700";
  ctx.beginPath();
  ctx.ellipse(0, -98 + bob, 12, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};

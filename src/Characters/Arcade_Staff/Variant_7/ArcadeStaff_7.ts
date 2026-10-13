export const metadata = {
  variantId: 7,
  name: "Bhalendra Dev",
  gender: "Male",
  heightFeet: 8.0, // male up to 8ft
  religion: "Hindu-Buddhist-Rastafarian Mix (Babylon-Free)",
  attire: "Clean saffron and gold robe mix with neon arcade highlights"
};

export const drawVariant7 = (ctx: CanvasRenderingContext2D, scale: number, time: number) => {
  const bob = Math.sin(time * 0.003) * 3;
  ctx.save();
  ctx.scale(scale, scale);

  // Flat gold slippers
  ctx.fillStyle = "#cca300";
  ctx.fillRect(-10, -5 + bob, 6, 5);
  ctx.fillRect(4, -5 + bob, 6, 5);

  // Saffron Robe length
  ctx.fillStyle = "#ff9933"; // Saffron
  ctx.beginPath();
  ctx.moveTo(-16, -5 + bob);
  ctx.lineTo(16, -5 + bob);
  ctx.lineTo(12, -90 + bob);
  ctx.lineTo(-12, -90 + bob);
  ctx.closePath();
  ctx.fill();

  // Orange & Gold patterned sash
  ctx.fillStyle = "#ff4500";
  ctx.fillRect(-13, -60 + bob, 26, 6);
  ctx.strokeStyle = "#ffd700";
  ctx.strokeRect(-13, -60 + bob, 26, 6);

  // Head
  ctx.fillStyle = "#8d5c32"; // Dark bronze skin
  ctx.beginPath();
  ctx.arc(0, -102 + bob, 10, 0, Math.PI * 2);
  ctx.fill();

  // Tall white turban styled headwrap
  ctx.fillStyle = "#eeeeee";
  ctx.beginPath();
  ctx.ellipse(0, -114 + bob, 12, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};

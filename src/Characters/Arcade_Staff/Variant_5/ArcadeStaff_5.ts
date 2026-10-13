export const metadata = {
  variantId: 5,
  name: "Marcus Jah-B",
  gender: "Male",
  heightFeet: 3.0, // 36 inches tall
  religion: "Rastafarian-Buddhist-Hindu Mix (Babylon-Free)",
  attire: "Rasta colors knit vest, Buddhist prayer beads, and Babylon-Free trousers"
};

export const drawVariant5 = (ctx: CanvasRenderingContext2D, scale: number, time: number) => {
  const bob = Math.sin(time * 0.007) * 2;
  ctx.save();
  ctx.scale(scale, scale);

  // Small black boots
  ctx.fillStyle = "#1e1e1e";
  ctx.fillRect(-6, -5 + bob, 4, 5);
  ctx.fillRect(2, -5 + bob, 4, 5);

  // Grey humble trousers
  ctx.fillStyle = "#555555";
  ctx.fillRect(-6, -20 + bob, 4, 15);
  ctx.fillRect(2, -20 + bob, 4, 15);

  // Rasta-vest (Red, Gold, Green)
  ctx.fillStyle = "#228b22"; // Green
  ctx.fillRect(-9, -42 + bob, 18, 22);
  ctx.fillStyle = "#ffd700"; // Gold
  ctx.fillRect(-9, -34 + bob, 18, 5);
  ctx.fillStyle = "#ff2222"; // Red
  ctx.fillRect(-9, -39 + bob, 18, 5);

  // Buddhist prayer beads around neck
  ctx.strokeStyle = "#8b5a2b";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, -42 + bob, 6, 0, Math.PI);
  ctx.stroke();

  // Head
  ctx.fillStyle = "#5c4033"; // Rich brown skin
  ctx.beginPath();
  ctx.arc(0, -50 + bob, 6.5, 0, Math.PI * 2);
  ctx.fill();

  // Green/Yellow wrap (turban)
  ctx.fillStyle = "#ffd700";
  ctx.beginPath();
  ctx.ellipse(0, -58 + bob, 8, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};

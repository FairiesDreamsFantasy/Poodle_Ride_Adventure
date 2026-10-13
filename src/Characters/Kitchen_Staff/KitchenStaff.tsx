import React from 'react';

/**
 * Draws a kitchen cook character.
 * 8 female cooks wearing vintage white dresses with indigo aprons, white stockings, 
 * industrial white boots, and a protective onesie beneath their dresses.
 * Attire is non-sexualized ("Babylon-Free").
 * Ethnicity: White women.
 * Religion: Rastafarian (represented by headwraps/turbans).
 */
export const drawKitchenCook = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, time: number) => {
  ctx.save();
  ctx.translate(x, y);
  
  const bob = Math.sin(time * 0.005) * 2;
  
  // Industrial White Boots
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-12 * scale, -10 * scale + bob, 10 * scale, 10 * scale); // Left boot
  ctx.fillRect(2 * scale, -10 * scale + bob, 10 * scale, 10 * scale);  // Right boot
  ctx.strokeStyle = '#cccccc';
  ctx.lineWidth = 1;
  ctx.strokeRect(-12 * scale, -10 * scale + bob, 10 * scale, 10 * scale);
  ctx.strokeRect(2 * scale, -10 * scale + bob, 10 * scale, 10 * scale);

  // White Stockings (Legs)
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(-10 * scale, -30 * scale + bob, 6 * scale, 20 * scale);
  ctx.fillRect(4 * scale, -30 * scale + bob, 6 * scale, 20 * scale);

  // Vintage White Dress (Full length, modest)
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(-20 * scale, -30 * scale + bob);
  ctx.lineTo(20 * scale, -30 * scale + bob);
  ctx.lineTo(15 * scale, -80 * scale + bob);
  ctx.lineTo(-15 * scale, -80 * scale + bob);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#eeeeee';
  ctx.stroke();

  // Indigo Apron
  ctx.fillStyle = '#4b0082'; // Indigo
  ctx.fillRect(-12 * scale, -70 * scale + bob, 24 * scale, 40 * scale);
  // Apron strings/detail
  ctx.strokeStyle = '#3a0063';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-12 * scale, -70 * scale + bob);
  ctx.lineTo(-15 * scale, -75 * scale + bob);
  ctx.moveTo(12 * scale, -70 * scale + bob);
  ctx.lineTo(15 * scale, -75 * scale + bob);
  ctx.stroke();

  // Head (White woman)
  ctx.fillStyle = '#ffe4e1'; // Fair skin tone
  ctx.beginPath();
  ctx.arc(0, -95 * scale + bob, 12 * scale, 0, Math.PI * 2);
  ctx.fill();

  // Rastafarian Headwrap (Turban style)
  ctx.fillStyle = '#ffffff'; // Matching the dress
  ctx.beginPath();
  ctx.ellipse(0, -105 * scale + bob, 15 * scale, 10 * scale, 0, 0, Math.PI * 2);
  ctx.fill();
  // Turban folds
  ctx.strokeStyle = '#dddddd';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(-10 * scale, -105 * scale + bob);
  ctx.quadraticCurveTo(0, -110 * scale + bob, 10 * scale, -105 * scale + bob);
  ctx.stroke();

  ctx.restore();
};

/**
 * Draws a general kitchen staff member.
 */
export const drawKitchenStaff = (ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, time: number) => {
  ctx.save();
  ctx.translate(x, y);
  
  const bob = Math.cos(time * 0.004) * 2;

  // Boots
  ctx.fillStyle = '#333333';
  ctx.fillRect(-10 * scale, -8 * scale + bob, 8 * scale, 8 * scale);
  ctx.fillRect(2 * scale, -8 * scale + bob, 8 * scale, 8 * scale);

  // Uniform pants (White)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-10 * scale, -40 * scale + bob, 8 * scale, 32 * scale);
  ctx.fillRect(2 * scale, -40 * scale + bob, 8 * scale, 32 * scale);

  // Uniform shirt (White)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-15 * scale, -85 * scale + bob, 30 * scale, 45 * scale);
  ctx.strokeStyle = '#dddddd';
  ctx.strokeRect(-15 * scale, -85 * scale + bob, 30 * scale, 45 * scale);

  // Head
  ctx.fillStyle = '#d2b48c'; // Tan skin tone
  ctx.beginPath();
  ctx.arc(0, -98 * scale + bob, 10 * scale, 0, Math.PI * 2);
  ctx.fill();

  // Chef/Staff Hat
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-8 * scale, -115 * scale + bob, 16 * scale, 10 * scale);

  ctx.restore();
};

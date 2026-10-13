import React, { useEffect, useRef } from 'react';

/**
 * System/Theme/Interstitial_Ad_Specific/Poodles_and_Tea_Party/General/index.tsx
 * Canvas renderer for the Poodles and Tea Party interstitial ad background.
 */

export const PoodlesAndTeaPartyCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Indigo Sky
    ctx.fillStyle = '#080820';
    ctx.fillRect(0, 0, w, h);

    // Room Background
    ctx.fillStyle = '#f5f5dc';
    ctx.fillRect(0, 0, w, h);

    // Windows
    ctx.fillStyle = '#080820';
    ctx.fillRect(w * 0.1, h * 0.1, w * 0.2, h * 0.4);
    ctx.fillRect(w * 0.7, h * 0.1, w * 0.2, h * 0.4);

    // White Carpet with Colored Dots
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, h * 0.6, w, h * 0.4);
    for (let i = 0; i < 200; i++) {
      ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
      ctx.beginPath();
      ctx.arc(Math.random() * w, h * 0.6 + Math.random() * (h * 0.4), 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Table
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(w * 0.2, h * 0.75, w * 0.6, h * 0.1);

    // Tatami Mats
    ctx.fillStyle = '#d2b48c';
    ctx.fillRect(w * 0.1, h * 0.85, w * 0.15, h * 0.05);
    ctx.fillRect(w * 0.425, h * 0.85, w * 0.15, h * 0.05);
    ctx.fillRect(w * 0.75, h * 0.85, w * 0.15, h * 0.05);

    const drawPoodle = (x: number, y: number, color: string, dress: string, apron: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fill();
      // Dress
      ctx.fillStyle = dress;
      ctx.fillRect(x - 30, y + 20, 60, 40);
      // Apron
      ctx.fillStyle = apron;
      ctx.fillRect(x - 20, y + 25, 40, 30);
      // Tea, Scones, Veg
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(x, h * 0.74, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#d2691e';
      ctx.fillRect(x - 5, h * 0.73, 10, 5);
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(x - 8, h * 0.72, 5, 5);
    };

    drawPoodle(w * 0.2, h * 0.65, '#ffffff', '#ff69b4', '#ffffff');
    drawPoodle(w * 0.5, h * 0.65, '#ffffcc', '#add8e6', '#0000ff');
    drawPoodle(w * 0.8, h * 0.65, '#fffaf0', '#008000', '#ff0000');

    // Speech Balloons
    const drawSpeech = (x: number, y: number, text: string) => {
      ctx.fillStyle = 'white';
      ctx.beginPath();
      if ('roundRect' in ctx && typeof ctx.roundRect === 'function') {
        ctx.roundRect(x, y, 180, 80, 10);
      } else {
        ctx.rect(x, y, 180, 80);
      }
      ctx.fill();
      ctx.fillStyle = 'black';
      ctx.font = 'bold 10px sans-serif';
      const words = text.split(' ');
      let line = '';
      let ty = y + 15;
      for (const word of words) {
        if ((line + word).length > 25) {
          ctx.fillText(line, x + 5, ty);
          line = word + ' ';
          ty += 12;
        } else {
          line += word + ' ';
        }
      }
      ctx.fillText(line, x + 5, ty);
    };

    drawSpeech(w * 0.05, h * 0.4, "Livity always matter because, there are ways to have a tea party without Babylonian trickery.");
    drawSpeech(w * 0.35, h * 0.4, "'Babylon' is a world of oppression, not to be confused with an ancient city of Babylon.");
    drawSpeech(w * 0.65, h * 0.4, "Materialism in families is not cool at all! BIG MOUTH can lead to trouble. No love in hypocrite families.");
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="absolute inset-0 w-full h-full object-cover -z-10 opacity-70 pointer-events-none"
    />
  );
};

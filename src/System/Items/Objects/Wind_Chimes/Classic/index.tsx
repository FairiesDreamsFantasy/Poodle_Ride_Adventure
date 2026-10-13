import React from 'react';

/**
 * Classic Monophonic Wind Chimes
 * [PRESERVED ARTISTIC CRAFT: Original Monophonic Synthesis]
 */

export interface WindChimeProps {
  x: number;
  y: number;
  scale?: number;
  flicker?: number;
}

/**
 * Monophonic Wind Chime Synthesizer
 * Plays a single sweet bell-like chime.
 */
export function playClassicMonophonicChime(
  ctx: AudioContext,
  sfxGain: GainNode,
  createPanner: (x: number, y: number, z: number) => PannerNode,
  x: number = 0,
  y: number = 0,
  z: number = 0,
  volume: number = 0.05
) {
  const now = ctx.currentTime;
  const freq = 1200 + Math.random() * 800; // Single frequency
  const duration = 2.0 + Math.random() * 0.5;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const panner = createPanner(x, y, z);
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, now);
  
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  
  osc.connect(gain);
  gain.connect(panner);
  panner.connect(sfxGain);
  
  osc.start(now);
  osc.stop(now + duration);
  
  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
    panner.disconnect();
  };
}

/**
 * 2D Canvas Renderer for Classic Wind Chimes
 */
export const drawClassicWindChime = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  time: number,
  flicker: number = 1.0,
  scale: number = 1.0
) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  
  ctx.strokeStyle = "#d4af37"; // Golden string
  ctx.lineWidth = 1.5;
  
  // Hanging string
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 30);
  ctx.stroke();
  
  // Circular top plate
  ctx.fillStyle = "#8a6d3b";
  ctx.beginPath();
  ctx.ellipse(0, 30, 15, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  
  // Single Chime pipe (Monophonic representation)
  const h = 50 + Math.sin(time / 300) * 8 * flicker;
  ctx.fillStyle = "#silver";
  ctx.fillRect(-3, 35, 6, h);
  
  // Clapper string
  ctx.strokeStyle = "#8a6d3b";
  ctx.beginPath();
  ctx.moveTo(0, 35);
  ctx.lineTo(0, 60);
  ctx.stroke();
  
  // Clapper
  ctx.fillStyle = "#d4af37";
  ctx.beginPath();
  ctx.arc(0, 60, 4, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
};

export const ClassicWindChime: React.FC<WindChimeProps> = ({ x, y, scale = 1.0, flicker = 1.0 }) => {
  // This is a logic component, actual rendering happens in the Canvas loop
  return null;
};

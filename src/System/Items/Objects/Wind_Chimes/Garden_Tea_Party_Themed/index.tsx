import React from 'react';

/**
 * Garden Tea Party Themed Wind Chimes
 * [PRESERVED ARTISTIC CRAFT: Polyphonic Synthesis]
 */

export interface WindChimeProps {
  x: number;
  y: number;
  scale?: number;
  flicker?: number;
}

/**
 * Polyphonic Wind Chime Synthesizer
 * Uses a pentatonic scale for a beautiful, harmonious breeze sound.
 */
export function playPolyphonicChimes(
  ctx: AudioContext,
  sfxGain: GainNode,
  createPanner: (x: number, y: number, z: number) => PannerNode,
  x: number = 0,
  y: number = 0,
  z: number = 0,
  volume: number = 0.06
) {
  const now = ctx.currentTime;
  
  // Polyphonic wind chime frequencies: beautiful pentatonic scale
  const chimePipes = [1200, 1350, 1500, 1800, 2025, 2250, 2700];
  
  // Choose 3 or 4 chimes to strike almost simultaneously during this breeze
  const strikesCount = 3 + Math.floor(Math.random() * 2);
  
  const selectedFrequencies: number[] = [];
  const tempPipes = [...chimePipes];
  for (let i = 0; i < strikesCount; i++) {
    if (tempPipes.length === 0) break;
    const idx = Math.floor(Math.random() * tempPipes.length);
    selectedFrequencies.push(tempPipes.splice(idx, 1)[0]);
  }
  
  selectedFrequencies.forEach((freq, index) => {
    const delay = index * (0.05 + Math.random() * 0.12); 
    const strikeTime = now + delay;
    const chimeDuration = 3.0 + Math.random() * 1.5; 
    
    const primaryOsc = ctx.createOscillator();
    const overtoneOsc = ctx.createOscillator();
    const primaryGain = ctx.createGain();
    const overtoneGain = ctx.createGain();
    
    const panner = createPanner(x, y, z);
    
    // Fundamental tone
    primaryOsc.type = 'sine';
    primaryOsc.frequency.setValueAtTime(freq, strikeTime);
    primaryOsc.frequency.linearRampToValueAtTime(freq + (Math.random() * 4 - 2), strikeTime + chimeDuration);
    
    primaryGain.gain.setValueAtTime(0, strikeTime);
    primaryGain.gain.linearRampToValueAtTime(volume * 0.8, strikeTime + 0.01);
    primaryGain.gain.exponentialRampToValueAtTime(0.0001, strikeTime + chimeDuration);
    
    // High metallic overtone
    const overtoneFreq = freq * 2.76;
    overtoneOsc.type = 'sine';
    overtoneOsc.frequency.setValueAtTime(overtoneFreq, strikeTime);
    
    overtoneGain.gain.setValueAtTime(0, strikeTime);
    overtoneGain.gain.linearRampToValueAtTime(volume * 0.25, strikeTime + 0.005);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, strikeTime + 0.8);
    
    primaryOsc.connect(primaryGain);
    primaryGain.connect(panner);
    overtoneOsc.connect(overtoneGain);
    overtoneGain.connect(panner);
    panner.connect(sfxGain);
    
    primaryOsc.start(strikeTime);
    overtoneOsc.start(strikeTime);
    primaryOsc.stop(strikeTime + chimeDuration);
    overtoneOsc.stop(strikeTime + 0.8);
    
    primaryOsc.onended = () => {
      primaryOsc.disconnect();
      overtoneOsc.disconnect();
      primaryGain.disconnect();
      overtoneGain.disconnect();
      panner.disconnect();
    };
  });
}

/**
 * 2D Canvas Renderer for Polyphonic Wind Chimes
 * Features multiple pipes and a more ornate design.
 */
export const drawPolyphonicWindChime = (
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
  
  // Ornate top plate (Tea Party theme - floral or detailed)
  ctx.fillStyle = "#8b4513"; // Wood/Copper
  ctx.beginPath();
  ctx.moveTo(-20, 20);
  ctx.lineTo(20, 20);
  ctx.lineTo(15, 30);
  ctx.lineTo(-15, 30);
  ctx.closePath();
  ctx.fill();
  
  // Multiple pipes (Polyphonic representation)
  const pipeCount = 5;
  for (let i = 0; i < pipeCount; i++) {
    const offsetX = (i - (pipeCount - 1) / 2) * 10;
    const h = 40 + (i * 10) + Math.sin(time / 250 + i) * 12 * flicker;
    
    // String for each pipe
    ctx.strokeStyle = "#silver";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(offsetX, 30);
    ctx.lineTo(offsetX, 40);
    ctx.stroke();
    
    // Pipe itself
    ctx.fillStyle = i % 2 === 0 ? "#silver" : "#c0c0c0";
    ctx.fillRect(offsetX - 3, 40, 6, h);
    
    // Reflective shine
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fillRect(offsetX - 1, 40, 1, h);
  }
  
  // Center clapper
  ctx.strokeStyle = "#8b4513";
  ctx.beginPath();
  ctx.moveTo(0, 30);
  ctx.lineTo(0, 70);
  ctx.stroke();
  
  ctx.fillStyle = "#d4af37";
  ctx.beginPath();
  ctx.arc(0, 70, 6, 0, Math.PI * 2);
  ctx.fill();
  
  // Floral accent (Tea Party Theme)
  ctx.fillStyle = "#ffb6c1"; // Light pink
  for (let j = 0; j < 5; j++) {
    const angle = (j / 5) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(Math.cos(angle) * 10, 25 + Math.sin(angle) * 3, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  
  ctx.restore();
};

export const PolyphonicWindChime: React.FC<WindChimeProps> = ({ x, y, scale = 1.0, flicker = 1.0 }) => {
  return null;
};

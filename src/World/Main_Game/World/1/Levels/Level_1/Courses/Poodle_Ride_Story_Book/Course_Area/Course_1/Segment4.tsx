import { GameState } from '../../../../../../../../../../System/Engine/Core/Types';

/**
 * Course Segment 4: Tunnel, Meadow, Bridge, Palace
 */
export function drawCourse1Segment4(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const scale = height / 50;
  
  // This segment is divided into sub-sections based on gridX progress
  const progress = state.gridX % 1000; // Assuming segment is 1000ft long
  
  if (progress < 250) {
    // Tunnel with gentle glow
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, width, height);
    
    // Lights with gentle glow
    for (let i = 0; i < 5; i++) {
       const lx = ((i * 100 - state.gridX * 10) % width + width) % width;
       ctx.fillStyle = 'rgba(255, 255, 150, 0.5)';
       ctx.beginPath();
       ctx.arc(lx, 5 * scale, 10 * scale, 0, Math.PI * 2);
       ctx.fill();
       ctx.fillStyle = '#ffffcc';
       ctx.beginPath();
       ctx.arc(lx, 5 * scale, 2 * scale, 0, Math.PI * 2);
       ctx.fill();
    }
    
    // Path
    ctx.fillStyle = '#444';
    ctx.fillRect(0, 15 * scale, width, 20 * scale);
    
  } else if (progress < 500) {
    // Meadow with berms (high sides)
    ctx.fillStyle = '#7cfc00';
    ctx.fillRect(0, 0, width, height);
    
    // Berms (darker/shaded sides)
    ctx.fillStyle = '#458b00';
    ctx.fillRect(0, 0, width, 10 * scale);
    ctx.fillRect(0, 40 * scale, width, 10 * scale);
    
    // Stone path snaking
    ctx.fillStyle = '#708090';
    ctx.fillRect(0, 15 * scale, width, 20 * scale);
    
  } else if (progress < 750) {
    // Bridge over subway tracks
    ctx.fillStyle = '#222'; // Trench
    ctx.fillRect(0, 0, width, height);
    
    // Tracks
    ctx.strokeStyle = '#555';
    for (let y = 10 * scale; y < 45 * scale; y += 10 * scale) {
       ctx.beginPath();
       ctx.moveTo(0, y);
       ctx.lineTo(width, y);
       ctx.stroke();
    }
    
    // Bridge
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(0, 15 * scale, width, 20 * scale);
    ctx.fillStyle = '#ffffff'; // Rails
    ctx.fillRect(0, 15 * scale, width, 1 * scale);
    ctx.fillRect(0, 34 * scale, width, 1 * scale);
    
  } else {
    // Palace 1st Floor
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, width, height);
    
    // Pillars
    ctx.fillStyle = '#ddd';
    for (let i = 0; i < 4; i++) {
       const px = ((i * 100 - state.gridX * 10) % width + width) % width;
       ctx.fillRect(px, 0, 10 * scale, height);
    }
    
    // Polished Stone Path
    ctx.fillStyle = '#708090';
    ctx.fillRect(0, 20 * scale, width, 10 * scale);
  }
}

import { GameState } from '../../../../../../../System/Engine/Core/Types';
import { PORTAL_TUNNEL_DIMENSIONS } from './Dimensions/PortalTunnelDimensions';

export function drawPortalTunnel(ctx: CanvasRenderingContext2D, width: number, height: number, state: GameState, time: number) {
  const scale = width / PORTAL_TUNNEL_DIMENSIONS.width;
  const tunnelWidth = PORTAL_TUNNEL_DIMENSIONS.width;
  const tunnelHeight = PORTAL_TUNNEL_DIMENSIONS.height;
  
  // 1. Floor: White Tiles
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  
  // Draw tile lines
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = 1;
  for (let y = 0; y < tunnelHeight; y += 2) {
    ctx.beginPath();
    ctx.moveTo(0, y * scale);
    ctx.lineTo(width, y * scale);
    ctx.stroke();
  }
  for (let x = 0; x < tunnelWidth; x += 2) {
    ctx.beginPath();
    ctx.moveTo(x * scale, 0);
    ctx.lineTo(x * scale, height);
    ctx.stroke();
  }

  // 2. Red Carpet (9ft wide)
  const carpetX = (tunnelWidth - PORTAL_TUNNEL_DIMENSIONS.carpetWidth) / 2;
  ctx.fillStyle = '#b22222'; // Firebrick Red
  ctx.fillRect(carpetX * scale, 0, PORTAL_TUNNEL_DIMENSIONS.carpetWidth * scale, height);
  
  // Carpet texture (gentle noise or pattern)
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  for (let y = 0; y < tunnelHeight; y += 1) {
    if (y % 2 === 0) {
      ctx.fillRect(carpetX * scale, y * scale, PORTAL_TUNNEL_DIMENSIONS.carpetWidth * scale, 0.5 * scale);
    }
  }

  // 3. Walls: Mirrors
  // Mirror effect: Reflect floor colors with glass overlay
  // Left wall
  ctx.fillStyle = 'rgba(173, 216, 230, 0.3)'; // Light blue glass
  ctx.fillRect(0, 0, 0.5 * scale, height);
  // Right wall
  ctx.fillRect((tunnelWidth - 0.5) * scale, 0, 0.5 * scale, height);

  // 4. Ceiling LED Lighting (Gentle Glow)
  const pulse = Math.sin(time / 1000) * 0.1 + 0.9;
  ctx.shadowBlur = 20 * pulse;
  ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
  ctx.fillStyle = 'white';
  
  // LED strips along the top of side walls
  ctx.fillRect(0.4 * scale, 1 * scale, 0.2 * scale, height - 2 * scale);
  ctx.fillRect((tunnelWidth - 0.6) * scale, 1 * scale, 0.2 * scale, height - 2 * scale);
  
  ctx.shadowBlur = 0;

  // 5. Teleportation Zone (Last 50ft)
  const zoneStartY = tunnelHeight - PORTAL_TUNNEL_DIMENSIONS.teleportZoneDepth;
  if (state.gridY >= zoneStartY - 20) {
     const gradient = ctx.createLinearGradient(0, zoneStartY * scale, 0, tunnelHeight * scale);
     gradient.addColorStop(0, 'rgba(147, 112, 219, 0)'); // MediumPurple transparent
     gradient.addColorStop(0.5, 'rgba(147, 112, 219, 0.3)');
     gradient.addColorStop(1, 'rgba(147, 112, 219, 0.8)');
     ctx.fillStyle = gradient;
     ctx.fillRect(0, zoneStartY * scale, width, PORTAL_TUNNEL_DIMENSIONS.teleportZoneDepth * scale);
     
     // 30 degree ramp effect (visual indicators)
     ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
     ctx.lineWidth = 2;
     for (let r = zoneStartY; r < tunnelHeight; r += 5) {
       ctx.beginPath();
       ctx.moveTo(0, r * scale);
       ctx.lineTo(width, r * scale);
       ctx.stroke();
     }
  }

  // Rainbow portal entry effect if at the beginning
  if (state.gridY < 20) {
    const rainbowGradient = ctx.createLinearGradient(0, 0, 0, 10 * scale);
    ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'].forEach((color, i) => {
        rainbowGradient.addColorStop(i / 6, color);
    });
    ctx.fillStyle = rainbowGradient;
    ctx.globalAlpha = 1 - (state.gridY / 20);
    ctx.fillRect(0, 0, width, 10 * scale);
    ctx.globalAlpha = 1.0;
  }
}

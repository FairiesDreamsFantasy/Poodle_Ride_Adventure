import { SIMULATED_GARDEN_DOOR_DIMENSIONS } from '../Description/Dimensions';

export interface SimulatedGardenDoorProps {
  x: number;
  y: number;
  width: number;
  height: number;
  openProgress: number; // 0 to 1
}

export const renderSimulatedGardenDoors = (
  ctx: CanvasRenderingContext2D,
  props: SimulatedGardenDoorProps
) => {
  const { x, y, width, height, openProgress } = props;
  const { colors } = SIMULATED_GARDEN_DOOR_DIMENSIONS;
  const panelWidth = width / 2;
  const leftOffset = -panelWidth * openProgress;
  const rightOffset = panelWidth * openProgress;
  const doorOpacity = Math.max(0, 1 - openProgress * 0.85);

  ctx.save();

  // Outer Steel Frame
  ctx.strokeStyle = colors.frame;
  ctx.lineWidth = Math.max(4, width * 0.02);
  ctx.strokeRect(x, y, width, height);

  // Open backdrop
  ctx.fillStyle = '#000000';
  ctx.fillRect(x, y, width, height);

  if (doorOpacity > 0.02) {
    ctx.globalAlpha = doorOpacity;

    // LEFT PANEL (Ethiopian Window Motif)
    const lDoorX = x + leftOffset;
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(lDoorX, y, panelWidth, height);
    ctx.strokeStyle = colors.trim; // Brass trim
    ctx.lineWidth = 3;
    ctx.strokeRect(lDoorX, y, panelWidth, height);

    // Ethiopian Window Insert
    const winMargin = 8;
    const winW = panelWidth - winMargin * 2;
    const winH = height * 0.45;
    const lWinX = lDoorX + winMargin;
    const lWinY = y + winMargin;
    ctx.fillStyle = colors.leftWin;
    ctx.fillRect(lWinX, lWinY, winW, winH);
    ctx.strokeStyle = colors.leftLattice;
    ctx.strokeRect(lWinX, lWinY, winW, winH);
    // Ethiopian Cross/Grid Motif
    ctx.beginPath();
    ctx.moveTo(lWinX + winW / 2, lWinY);
    ctx.lineTo(lWinX + winW / 2, lWinY + winH);
    ctx.moveTo(lWinX, lWinY + winH / 2);
    ctx.lineTo(lWinX + winW, lWinY + winH / 2);
    ctx.stroke();

    // RIGHT PANEL (Japanese Shoji Motif)
    const rDoorX = x + panelWidth + rightOffset;
    ctx.fillStyle = '#4a5568';
    ctx.fillRect(rDoorX, y, panelWidth, height);
    ctx.strokeStyle = colors.trim;
    ctx.lineWidth = 3;
    ctx.strokeRect(rDoorX, y, panelWidth, height);

    // Japanese Window Insert
    const rWinX = rDoorX + winMargin;
    const rWinY = y + winMargin;
    ctx.fillStyle = colors.rightWin;
    ctx.fillRect(rWinX, rWinY, winW, winH);
    ctx.strokeStyle = colors.rightLattice;
    ctx.strokeRect(rWinX, rWinY, winW, winH);
    // Shoji Lattice Grids
    ctx.beginPath();
    for (let g = 1; g < 4; g++) {
      ctx.moveTo(rWinX + (winW / 4) * g, rWinY);
      ctx.lineTo(rWinX + (winW / 4) * g, rWinY + winH);
      ctx.moveTo(rWinX, rWinY + (winH / 4) * g);
      ctx.lineTo(rWinX + winW, rWinY + (winH / 4) * g);
    }
    ctx.stroke();
  }

  ctx.restore();
};

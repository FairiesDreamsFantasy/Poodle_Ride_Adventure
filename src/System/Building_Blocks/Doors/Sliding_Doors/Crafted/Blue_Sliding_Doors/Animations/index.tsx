import { BLUE_DOOR_DIMENSIONS } from '../Description/Dimensions';

export interface BlueSlidingDoorProps {
  x: number;
  y: number;
  width: number;
  height: number;
  openProgress: number; // 0 to 1
  doorColor?: string;
  accentColor?: string;
}

export const renderBlueSlidingDoors = (
  ctx: CanvasRenderingContext2D,
  props: BlueSlidingDoorProps
) => {
  const {
    x,
    y,
    width,
    height,
    openProgress,
    doorColor = BLUE_DOOR_DIMENSIONS.colors.door,
    accentColor = BLUE_DOOR_DIMENSIONS.colors.accent,
  } = props;

  const panelWidth = width / 2;
  const leftOffset = -panelWidth * openProgress;
  const rightOffset = panelWidth * openProgress;
  const doorOpacity = Math.max(0, 1 - openProgress * 0.9);

  ctx.save();

  // 1. Archway / Portal Frame (Gold / Brass Header & Jambs)
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = Math.max(4, width * 0.02);
  ctx.strokeRect(x, y, width, height);

  // 2. Open passage backdrop behind sliding doors
  ctx.fillStyle = '#000000';
  ctx.fillRect(x, y, width, height);

  if (doorOpacity > 0.02) {
    ctx.globalAlpha = doorOpacity;

    // LEFT BLUE PANEL
    const leftPanelX = x + leftOffset;
    const lGrad = ctx.createLinearGradient(leftPanelX, y, leftPanelX + panelWidth, y);
    lGrad.addColorStop(0, '#002266');
    lGrad.addColorStop(0.5, doorColor);
    lGrad.addColorStop(1, '#001a4d');

    ctx.fillStyle = lGrad;
    ctx.fillRect(leftPanelX, y, panelWidth, height);
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(leftPanelX, y, panelWidth, height);

    // Left Panel Ornate Recessed Moldings
    ctx.strokeRect(leftPanelX + 6, y + 8, panelWidth - 12, height * 0.4);
    ctx.strokeRect(leftPanelX + 6, y + height * 0.5 + 4, panelWidth - 12, height * 0.42);

    // Left Handle / Pull Bar
    ctx.fillStyle = accentColor;
    ctx.fillRect(leftPanelX + panelWidth - 8, y + height * 0.45, 5, height * 0.12);

    // RIGHT BLUE PANEL
    const rightPanelX = x + panelWidth + rightOffset;
    const rGrad = ctx.createLinearGradient(rightPanelX, y, rightPanelX + panelWidth, y);
    rGrad.addColorStop(0, '#001a4d');
    rGrad.addColorStop(0.5, doorColor);
    rGrad.addColorStop(1, '#002266');

    ctx.fillStyle = rGrad;
    ctx.fillRect(rightPanelX, y, panelWidth, height);
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 3;
    ctx.strokeRect(rightPanelX, y, panelWidth, height);

    // Right Panel Ornate Recessed Moldings
    ctx.strokeRect(rightPanelX + 6, y + 8, panelWidth - 12, height * 0.4);
    ctx.strokeRect(rightPanelX + 6, y + height * 0.5 + 4, panelWidth - 12, height * 0.42);

    // Right Handle / Pull Bar
    ctx.fillStyle = accentColor;
    ctx.fillRect(rightPanelX + 3, y + height * 0.45, 5, height * 0.12);
  }

  ctx.restore();
};

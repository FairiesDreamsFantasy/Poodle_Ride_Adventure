import { RAINBOW_GLASS_DOOR_DIMENSIONS } from '../Description/Dimensions';

export interface RainbowSlidingDoorProps {
  x: number;
  y: number;
  width: number;
  height: number;
  openProgress: number; // 0 = closed, 1 = fully open in wall
  frameColor?: string;
  glassColor?: string;
  alpha?: number;
}

export const renderRainbowSlidingDoors = (
  ctx: CanvasRenderingContext2D,
  props: RainbowSlidingDoorProps
) => {
  const { x, y, width, height, openProgress, frameColor = RAINBOW_GLASS_DOOR_DIMENSIONS.colors.frame, glassColor, alpha = 0.6 } = props;
  const { colors } = RAINBOW_GLASS_DOOR_DIMENSIONS;
  const panelWidth = width / 2;
  const leftOffset = -panelWidth * openProgress;
  const rightOffset = panelWidth * openProgress;
  const doorOpacity = Math.max(0, 1 - openProgress * 0.9);

  // 1. Surrounding Magenta Frame (Stationary Archway / Doorway Header and Jambs)
  ctx.save();
  ctx.strokeStyle = frameColor;
  ctx.lineWidth = Math.max(4, width * 0.02);
  ctx.strokeRect(x, y, width, height);

  // 2. Open Tunnel / Passage backdrop behind glass
  ctx.fillStyle = '#000000';
  ctx.fillRect(x, y, width, height);

  if (doorOpacity > 0.02) {
    ctx.globalAlpha = alpha * doorOpacity;

    // LEFT PANEL (10 feet wide, slides left into wall)
    const leftPanelX = x + leftOffset;
    if (glassColor) {
      ctx.fillStyle = glassColor;
    } else {
      const leftGrad = ctx.createLinearGradient(leftPanelX, y, leftPanelX + panelWidth, y + height);
      colors.rainbow.forEach((c, idx) => {
        leftGrad.addColorStop(idx / (colors.rainbow.length - 1), c);
      });
      ctx.fillStyle = leftGrad;
    }
    ctx.fillRect(leftPanelX, y, panelWidth, height);

    // Left Panel Border & Handle
    ctx.strokeStyle = frameColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(leftPanelX, y, panelWidth, height);
    // Vertical steel center grip
    ctx.fillStyle = frameColor;
    ctx.fillRect(leftPanelX + panelWidth - 6, y + height * 0.4, 4, height * 0.2);

    // RIGHT PANEL (10 feet wide, slides right into wall)
    const rightPanelX = x + panelWidth + rightOffset;
    if (glassColor) {
      ctx.fillStyle = glassColor;
    } else {
      const rightGrad = ctx.createLinearGradient(rightPanelX, y, rightPanelX + panelWidth, y + height);
      colors.rainbow.forEach((c, idx) => {
        rightGrad.addColorStop(idx / (colors.rainbow.length - 1), c);
      });
      ctx.fillStyle = rightGrad;
    }
    ctx.fillRect(rightPanelX, y, panelWidth, height);

    // Right Panel Border & Handle
    ctx.strokeStyle = frameColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(rightPanelX, y, panelWidth, height);
    // Vertical steel center grip
    ctx.fillStyle = frameColor;
    ctx.fillRect(rightPanelX + 2, y + height * 0.4, 4, height * 0.2);
  }

  ctx.restore();
};

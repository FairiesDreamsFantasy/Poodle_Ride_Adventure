import { AREA_DIMENSIONS, isOutdoorArea } from '../../../../Logic/GameLogic';

export interface WorldBounds {
  width: number;
  height: number;
  isOutdoor: boolean;
  name: string;
}

export const getWorldAreaBoundsAI = (areaName: string): WorldBounds => {
  const dims = AREA_DIMENSIONS[areaName] || { width: 1000, height: 1000 };
  return {
    width: dims.width,
    height: dims.height,
    isOutdoor: isOutdoorArea(areaName),
    name: areaName,
  };
};

export const checkWorldBoundaryCollisionAI = (
  x: number,
  y: number,
  areaName: string,
  margin: number = 20
): { isClamped: boolean; clampedX: number; clampedY: number } => {
  const bounds = getWorldAreaBoundsAI(areaName);
  let clampedX = x;
  let clampedY = y;
  let isClamped = false;

  if (x < margin) {
    clampedX = margin;
    isClamped = true;
  } else if (x > bounds.width - margin) {
    clampedX = bounds.width - margin;
    isClamped = true;
  }

  if (y < margin) {
    clampedY = margin;
    isClamped = true;
  } else if (y > bounds.height - margin) {
    clampedY = bounds.height - margin;
    isClamped = true;
  }

  return { isClamped, clampedX, clampedY };
};

import React from 'react';
import { Point2D } from '../3-D';
import { DEFAULT_POLYGON_STYLE, PolygonStyle } from './General';

export function drawPolygon(
  ctx: CanvasRenderingContext2D,
  points: Point2D[],
  style: PolygonStyle = DEFAULT_POLYGON_STYLE
) {
  if (points.length < 2) return;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();

  if (style.fillColor && style.fillColor !== 'transparent') {
    ctx.fillStyle = style.fillColor;
    ctx.fill();
  }

  if (style.strokeColor) {
    ctx.strokeStyle = style.strokeColor;
    ctx.lineWidth = style.lineWidth ?? 1;
    ctx.lineJoin = style.lineJoin ?? 'round';
    ctx.stroke();
  }
}

export const RendererPolygons: React.FC = () => {
  return null;
};

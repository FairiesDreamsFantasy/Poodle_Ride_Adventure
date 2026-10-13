/** Polygons path definition */
export const Polygons = {
  name: "Polygon Path",
  points: [] as { x: number; y: number }[],
  draw: (ctx: CanvasRenderingContext2D, points: { x: number; y: number }[]) => {
    if (points.length === 0) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
    ctx.fill();
  }
};

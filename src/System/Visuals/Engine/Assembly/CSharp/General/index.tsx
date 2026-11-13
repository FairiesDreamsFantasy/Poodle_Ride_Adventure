/**
 * Scientific Visuals Engine Assembly CSharp Visual Layout Tree Core Module
 * Visual component layout bounds, aspect-ratio containment, DPI-aligned snapping,
 * and HUD-above-canvas vertical partition invariant solver (v0.9.9.7).
 */

export interface LayoutRect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export class VisualsAssemblyCSharpLayout {
  public computeBounds(x: number, y: number, w: number, h: number): LayoutRect {
    return { left: x, right: x + w, top: y, bottom: y + h };
  }

  public intersectRects(a: LayoutRect, b: LayoutRect): LayoutRect | null {
    const left = Math.max(a.left, b.left);
    const top = Math.max(a.top, b.top);
    const right = Math.min(a.right, b.right);
    const bottom = Math.min(a.bottom, b.bottom);
    if (right <= left || bottom <= top) return null;
    return { left, right, top, bottom };
  }

  /** Fits target aspect ratio strictly inside container while preserving pixel alignment */
  public fitAspectContain(
    containerW: number,
    containerH: number,
    contentAspect: number,
    dpr: number = 1
  ): { x: number; y: number; width: number; height: number } {
    const safeW = Math.max(1, containerW);
    const safeH = Math.max(1, containerH);
    const safeAspect = Math.max(0.1, contentAspect);
    let width = safeW;
    let height = width / safeAspect;
    if (height > safeH) {
      height = safeH;
      width = height * safeAspect;
    }
    const snap = (v: number) => Math.round(v * dpr) / dpr;
    const snappedW = snap(width);
    const snappedH = snap(height);
    return {
      x: snap((safeW - snappedW) / 2),
      y: snap((safeH - snappedH) / 2),
      width: snappedW,
      height: snappedH,
    };
  }

  /** Enforces v0.9.9.7 HUD-strictly-above-canvas vertical partition */
  public partitionHudAboveCanvas(
    viewportH: number,
    hudHeight: number
  ): { hudTop: number; hudHeight: number; canvasTop: number; canvasHeight: number } {
    const clampedHudH = Math.max(40, Math.min(viewportH * 0.35, hudHeight));
    return {
      hudTop: 0,
      hudHeight: clampedHudH,
      canvasTop: clampedHudH,
      canvasHeight: Math.max(120, viewportH - clampedHudH),
    };
  }
}

export const VisualsAssemblyCSharpLayoutInstance = new VisualsAssemblyCSharpLayout();

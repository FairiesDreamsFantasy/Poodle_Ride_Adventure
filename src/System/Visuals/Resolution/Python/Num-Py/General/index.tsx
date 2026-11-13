/**
 * System/Visuals/Resolution/Python/Num-Py/General/index.tsx
 * Aspect correction Jacobian scale matrix and orthographic projection bounds.
 */

export class VisualsResolutionNumPyMatrix {
  public buildAspectScaleMatrix(srcW: number, srcH: number, dstW: number, dstH: number): [number, number] {
    const srcAspect = srcW / Math.max(1, srcH);
    const dstAspect = dstW / Math.max(1, dstH);
    if (dstAspect > srcAspect) {
      return [srcAspect / dstAspect, 1.0];
    }
    return [1.0, dstAspect / srcAspect];
  }
}

export const VisualsResolutionNumPyInstance = new VisualsResolutionNumPyMatrix();

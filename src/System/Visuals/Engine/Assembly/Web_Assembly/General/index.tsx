/**
 * Scientific Visuals Engine Assembly Web_Assembly Transform Matrix Core Module
 * Native WebAssembly 2D affine matrix point transformation and determinants.
 */



export class VisualsAssemblyWasmTransform {

  public transformPoint2D(x: number, y: number, a: number, b: number, c: number, d: number, tx: number, ty: number): [number, number] {
    return [a * x + c * y + tx, b * x + d * y + ty];
  }
        
}

export const VisualsAssemblyWasmTransformInstance = new VisualsAssemblyWasmTransform();

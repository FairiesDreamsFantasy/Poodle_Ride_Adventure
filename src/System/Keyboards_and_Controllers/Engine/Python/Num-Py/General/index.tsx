/**
 * Scientific Keyboards & Controllers Python Num-Py Axis Normalization Core Module
 * Multi-axis vector normalization and deadzone tensor thresholding.
 */



export class ControllerNumPyAxis {

  public normalize2DVector(x: number, y: number): [number, number] {
    const len = Math.sqrt(x * x + y * y);
    if (len === 0) return [0, 0];
    return [x / len, y / len];
  }
        
}

export const ControllerNumPyAxisInstance = new ControllerNumPyAxis();

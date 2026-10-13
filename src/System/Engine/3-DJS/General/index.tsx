/**
 * Scientific Engine 3-DJS Scene Graph & Camera Matrix Core Module
 * Scene graph transformations, projection matrices, and 3D camera calculations.
 */



export class Engine3DJSGraph {

  public createPerspectiveMatrix(fovRad: number, aspect: number, near: number, far: number): Float64Array {
    const out = new Float64Array(16);
    const f = 1.0 / Math.tan(fovRad / 2);
    out[0] = f / aspect;
    out[5] = f;
    out[10] = (far + near) / (near - far);
    out[11] = -1;
    out[14] = (2 * far * near) / (near - far);
    return out;
  }

  public multiplyVec4(m: Float64Array, v: [number, number, number, number]): [number, number, number, number] {
    return [
      m[0]*v[0] + m[4]*v[1] + m[8]*v[2] + m[12]*v[3],
      m[1]*v[0] + m[5]*v[1] + m[9]*v[2] + m[13]*v[3],
      m[2]*v[0] + m[6]*v[1] + m[10]*v[2] + m[14]*v[3],
      m[3]*v[0] + m[7]*v[1] + m[11]*v[2] + m[15]*v[3],
    ];
  }
        
}

export const Engine3DJSGraphInstance = new Engine3DJSGraph();

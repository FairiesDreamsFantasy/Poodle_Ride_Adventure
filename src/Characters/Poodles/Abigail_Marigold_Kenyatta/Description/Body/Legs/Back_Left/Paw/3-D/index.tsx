/** 3-D projection logic */
export const ThreeD = {
  name: "3-D Projection",
  project: (x: number, y: number, z: number, options?: any) => {
    return { x, y, scale: 1 };
  }
};

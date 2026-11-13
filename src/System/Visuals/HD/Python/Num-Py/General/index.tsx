/**
 * System/Visuals/HD/Python/Num-Py/General/index.tsx
 * ITU-R BT.2020 <-> BT.709 wide-gamut linear matrix transform.
 */

export class VisualsHDNumPyGamut {
  public bt709ToBt2020(r: number, g: number, b: number): [number, number, number] {
    return [
      0.627404 * r + 0.329283 * g + 0.043313 * b,
      0.069097 * r + 0.919540 * g + 0.011362 * b,
      0.016391 * r + 0.088013 * g + 0.895595 * b,
    ];
  }

  public bt2020ToBt709(r: number, g: number, b: number): [number, number, number] {
    return [
      1.660491 * r - 0.587641 * g - 0.072850 * b,
      -0.124550 * r + 1.132899 * g - 0.008349 * b,
      -0.018151 * r - 0.100579 * g + 1.118730 * b,
    ];
  }
}

export const VisualsHDNumPyInstance = new VisualsHDNumPyGamut();

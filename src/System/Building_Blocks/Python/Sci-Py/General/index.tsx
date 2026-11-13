/**
 * System/Building_Blocks/Python/Sci-Py/General/index.tsx
 * Scientific Building Blocks Python Sci-Py Architectural Acoustics Module
 * Sabine RT60 room reverberation time solver and inverse-square air attenuation.
 */

export class BuildingBlocksSciPyAcoustics {
  /** Sabine equation (imperial feet units): RT60 = 0.049 * V / A */
  public computeSabineRT60Feet(
    widthFt: number,
    depthFt: number,
    heightFt: number,
    meanAbsorptionCoeff: number
  ): number {
    const volume = Math.max(1, widthFt * depthFt * heightFt);
    const surfaceArea = 2 * (widthFt * depthFt + widthFt * heightFt + depthFt * heightFt);
    const sabins = Math.max(0.01, surfaceArea * Math.max(0.01, Math.min(0.99, meanAbsorptionCoeff)));
    return (0.049 * volume) / sabins;
  }

  public computeEchoWetDryRatio(rt60Seconds: number): number {
    return Math.max(0.05, Math.min(0.65, rt60Seconds * 0.22));
  }
}

export const BuildingBlocksSciPyInstance = new BuildingBlocksSciPyAcoustics();

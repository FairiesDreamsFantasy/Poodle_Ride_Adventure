/**
 * System/Building_Blocks/Assembly/CSharp/General/index.tsx
 * Scientific Building Blocks Assembly CSharp Core Module
 * Material acoustic reflectance, kinetic friction lookup, and doorway threshold policies.
 */

export type StructuralSurfaceMaterial =
  | 'polished_hardwood'
  | 'garden_grass'
  | 'cobblestone'
  | 'tarcist_sky_ramp'
  | 'deep_carpet'
  | 'brass_arcade';

export interface StructuralMaterialPhysics {
  frictionCoeff: number;
  restitution: number;
  acousticAbsorption: number;
}

export class BuildingBlocksAssemblyCSharpMaterials {
  private readonly materialTable: Record<StructuralSurfaceMaterial, StructuralMaterialPhysics> = {
    polished_hardwood: { frictionCoeff: 0.32, restitution: 0.15, acousticAbsorption: 0.12 },
    garden_grass: { frictionCoeff: 0.68, restitution: 0.08, acousticAbsorption: 0.55 },
    cobblestone: { frictionCoeff: 0.72, restitution: 0.10, acousticAbsorption: 0.08 },
    tarcist_sky_ramp: { frictionCoeff: 0.45, restitution: 0.12, acousticAbsorption: 0.18 },
    deep_carpet: { frictionCoeff: 0.85, restitution: 0.04, acousticAbsorption: 0.65 },
    brass_arcade: { frictionCoeff: 0.28, restitution: 0.22, acousticAbsorption: 0.04 },
  };

  public getMaterialPhysics(surface: StructuralSurfaceMaterial): StructuralMaterialPhysics {
    return this.materialTable[surface];
  }

  public isWithinDoorwayThreshold(distFeet: number, thresholdFeet: number = 35): boolean {
    return distFeet <= Math.max(1, thresholdFeet);
  }
}

export const BuildingBlocksAssemblyCSharpInstance = new BuildingBlocksAssemblyCSharpMaterials();

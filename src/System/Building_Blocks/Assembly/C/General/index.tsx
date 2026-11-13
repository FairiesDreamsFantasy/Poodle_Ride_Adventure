/**
 * System/Building_Blocks/Assembly/C/General/index.tsx
 * Scientific Building Blocks Assembly C Core Module
 * Q16.16 fixed-point structural coordinates, integer AABB overlap test,
 * and doorway access bitmask flags (North/South/East/West + threshold bounds).
 */

export interface FixedAABB {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export class BuildingBlocksAssemblyCGeometry {
  public static readonly DOOR_NORTH = 1 << 0;
  public static readonly DOOR_SOUTH = 1 << 1;
  public static readonly DOOR_EAST = 1 << 2;
  public static readonly DOOR_WEST = 1 << 3;

  public floatToQ16(feet: number): number {
    return Math.round(feet * 65536);
  }

  public q16ToFloat(q16: number): number {
    return q16 / 65536.0;
  }

  public testAABBOverlap(a: FixedAABB, b: FixedAABB): boolean {
    return a.minX <= b.maxX && a.maxX >= b.minX && a.minY <= b.maxY && a.maxY >= b.minY;
  }

  public containsPointAABB(box: FixedAABB, x: number, y: number): boolean {
    return x >= box.minX && x <= box.maxX && y >= box.minY && y <= box.maxY;
  }
}

export const BuildingBlocksAssemblyCInstance = new BuildingBlocksAssemblyCGeometry();

/**
 * System/Registry/AI/In-Game/Category/World/Levels/General/index.tsx
 * 
 * Master Registry Definitions for World Levels.
 */

export interface LevelRegistryDefinition {
  levelNumber: number;
  name: string;
  isStartingPoint: boolean;
  teleportZoneWidthFt?: number;
}

export const WorldLevelsRegistryConfig: Record<number, LevelRegistryDefinition> = {
  0: {
    levelNumber: 0,
    name: 'Rasta-Manor / Porter-Manor',
    isStartingPoint: true,
    teleportZoneWidthFt: 19.5,
  },
};

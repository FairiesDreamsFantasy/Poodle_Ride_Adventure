// Crafted Obstacles Building Block
export interface CraftedObstacleItem {
  id: string;
  name: string;
  category: 'Furniture' | 'Barrier' | 'Special_Device';
  solid: boolean;
}

export const CRAFTED_OBSTACLES: Record<string, CraftedObstacleItem> = {
  DishwasherInsulatedPipe: {
    id: 'dishwasher_insulated_pipe',
    name: 'North Wall Insulated Hot Water Pipe with Red Valve',
    category: 'Special_Device',
    solid: true,
  },
  SkyRampTarcistZone: {
    id: 'sky_ramp_tarcist_zone',
    name: '19.5ft Tarcist Teleportation Sky Ramp Zone',
    category: 'Barrier',
    solid: false,
  },
};

export default CRAFTED_OBSTACLES;

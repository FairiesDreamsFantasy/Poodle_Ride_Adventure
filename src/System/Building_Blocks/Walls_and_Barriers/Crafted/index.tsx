// Crafted Walls and Barriers
export interface CraftedWallDefinition {
  id: string;
  name: string;
  material: 'Rainbow_Glass' | 'Solid_Wood_990' | 'Glass_Barrier' | 'Steel_Framed';
  color: string;
  description: string;
}

export const CRAFTED_WALLS: Record<string, CraftedWallDefinition> = {
  FoyerRainbowWall: {
    id: 'foyer_rainbow_wall',
    name: 'Foyer Rainbow Striped Wall',
    material: 'Rainbow_Glass',
    color: '#ff00ff',
    description: 'Rainbow striped aesthetic wall for grand foyers and meditation spaces.',
  },
  MeditationWoodWall: {
    id: 'meditation_wood_wall',
    name: '990ft Solid Wood Wall Segment',
    material: 'Solid_Wood_990',
    color: '#4b2e19',
    description: '990-foot segment of solid polished mahogany flanking the 20ft central sliding doors.',
  },
};

export default CRAFTED_WALLS;

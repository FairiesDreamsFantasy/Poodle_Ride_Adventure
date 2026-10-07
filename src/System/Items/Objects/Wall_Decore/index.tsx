export interface WallDecor {
  id: string;
  name: string;
  type: 'Tapestry' | 'Painting' | 'Mirror';
  location?: string;
}

export const WALL_DECORE_REGISTRY: WallDecor[] = [
  {
    id: 'grand_tapestry_foyer',
    name: 'The Grand Tapestry',
    type: 'Tapestry',
    location: 'Foyer East Wall'
  }
];

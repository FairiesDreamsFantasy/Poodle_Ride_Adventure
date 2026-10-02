export interface Furniture {
  id: string;
  name: string;
  material: string;
  category: 'Table' | 'Chair' | 'Bed' | 'Storage';
}

export const FURNITURE_REGISTRY: Furniture[] = [
  {
    id: 'grand_dining_table_1',
    name: 'Grand Dining Table (Oak)',
    material: 'Oak Wood',
    category: 'Table'
  }
];

export interface Rug {
  id: string;
  name: string;
  shape: 'Rectangle' | 'Round' | 'Oval';
  color: string;
  pattern?: string;
}

export const RUGS: Rug[] = [
  {
    id: 'garden_rug_pink',
    name: 'Garden Rug (Pink)',
    shape: 'Round',
    color: '#F8BBD0',
    pattern: 'White Roses'
  },
  {
    id: 'central_rug_green',
    name: 'Central Rug (Forest Green)',
    shape: 'Round',
    color: '#228B22',
    pattern: 'Daisy Border'
  }
];

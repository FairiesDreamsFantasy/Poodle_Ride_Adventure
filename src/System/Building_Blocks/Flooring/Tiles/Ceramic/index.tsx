export interface Tile {
  id: string;
  name: string;
  color: string;
  size: number; // inches
  material: 'Ceramic' | 'Porcelain' | 'Marble';
}

export const CERAMIC_TILES: Tile[] = [
  {
    id: 'ceramic_tile_pink',
    name: 'Ceramic Tile (Pink)',
    color: '#FCE4EC',
    size: 24,
    material: 'Ceramic'
  },
  {
    id: 'ceramic_tile_white',
    name: 'Ceramic Tile (White)',
    color: '#FFFFFF',
    size: 24,
    material: 'Ceramic'
  },
  {
    id: 'ceramic_tile_gold_line',
    name: 'Ceramic Tile (Gold Line)',
    color: '#FFFDE7',
    size: 24,
    material: 'Ceramic'
  }
];

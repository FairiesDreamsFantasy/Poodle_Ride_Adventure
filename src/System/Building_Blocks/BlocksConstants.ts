export interface BuildingBlock {
  type: 'Brick' | 'Glass' | 'Metal' | 'Panel' | 'Tile';
  id: string;
  dimensions: { width: number, height: number, depth: number };
  material: string;
  color?: string;
}

export const BRICKS: BuildingBlock[] = [
  { type: 'Brick', id: 'standard_brick', dimensions: { width: 0.5, height: 0.2, depth: 0.1 }, material: 'Clay', color: '#b35d4d' },
  { type: 'Brick', id: 'gray_brick', dimensions: { width: 0.5, height: 0.2, depth: 0.1 }, material: 'Stone', color: '#808080' },
  { type: 'Brick', id: 'white_brick', dimensions: { width: 0.5, height: 0.2, depth: 0.1 }, material: 'Glazed Ceramic', color: '#f5f5f5' },
];

export const GLASS_BLOCKS: BuildingBlock[] = [
  { type: 'Glass', id: 'glass_cube_1x1', dimensions: { width: 1, height: 1, depth: 1 }, material: 'Tempered Glass', color: 'rgba(200, 230, 255, 0.3)' },
  { type: 'Glass', id: 'glass_square_2x2', dimensions: { width: 2, height: 2, depth: 0.1 }, material: 'Shatter-Resistant Glass', color: 'rgba(255, 255, 255, 0.4)' },
  { type: 'Glass', id: 'rainbow_glass', dimensions: { width: 1, height: 3, depth: 0.2 }, material: 'Stained Glass', color: 'rgba(255, 100, 255, 0.5)' },
];

export const METAL_BARS: BuildingBlock[] = [
  { type: 'Metal', id: 'brass_bar_10ft', dimensions: { width: 0.1, height: 10, depth: 0.1 }, material: 'Brass', color: '#ffd700' },
  { type: 'Metal', id: 'iron_bar_10ft', dimensions: { width: 0.1, height: 10, depth: 0.1 }, material: 'Iron', color: '#444444' },
  { type: 'Metal', id: 'gold_rail', dimensions: { width: 0.2, height: 1, depth: 0.2 }, material: 'Polished Gold', color: '#FFD700' },
];

export const WALL_PANELS: BuildingBlock[] = [
  { type: 'Panel', id: 'wood_panel_8ft', dimensions: { width: 4, height: 8, depth: 0.2 }, material: 'Polished Mahogany', color: '#4a2c2a' },
  { type: 'Panel', id: 'padded_panel_gym', dimensions: { width: 10, height: 10, depth: 0.5 }, material: 'Foam Padding', color: '#ffffff' },
  { type: 'Panel', id: 'acoustic_panel', dimensions: { width: 2, height: 2, depth: 0.3 }, material: 'Acoustic Foam', color: '#333333' },
];

export const TILES: BuildingBlock[] = [
  { type: 'Tile', id: 'ceramic_tile_pink', dimensions: { width: 2, height: 2, depth: 0.05 }, material: 'Ceramic', color: '#ffb7c5' },
  { type: 'Tile', id: 'ceramic_tile_white', dimensions: { width: 2, height: 2, depth: 0.05 }, material: 'Ceramic', color: '#ffffff' },
  { type: 'Tile', id: 'ceramic_tile_forest', dimensions: { width: 2, height: 2, depth: 0.1 }, material: 'Ceramic', color: '#228B22' },
  { type: 'Tile', id: 'ceramic_tile_checkered', dimensions: { width: 2, height: 2, depth: 0.05 }, material: 'Ceramic', color: '#000000' },
  { type: 'Tile', id: 'hardwood_plank', dimensions: { width: 1, height: 8, depth: 0.1 }, material: 'Polished Hardwood', color: '#5d3a1a' },
  { type: 'Tile', id: 'marble_tile', dimensions: { width: 4, height: 4, depth: 0.1 }, material: 'Marble', color: '#e0e0e0' },
];

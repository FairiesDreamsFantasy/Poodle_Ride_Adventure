/**
 * Scientific Visuals Engine XL Pixel Matrix & Tile Grid Core Module
 * 2D pixel grid spreadsheet mapping and tile map matrix calculations.
 */



export class VisualsXLTileMatrix {

  public getTileCoord(index: number, columns: number, tileSize: number): { x: number; y: number } {
    const col = index % columns;
    const row = Math.floor(index / columns);
    return { x: col * tileSize, y: row * tileSize };
  }
        
}

export const VisualsXLTileMatrixInstance = new VisualsXLTileMatrix();

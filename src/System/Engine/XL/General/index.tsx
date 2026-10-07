/**
 * Scientific Engine XL Spreadsheet Calculation Engine Core Module
 * Cell formula dependencies, dynamic range evaluations, and tabular matrix modeling.
 */



export class EngineXLGridEngine {

  private cells: Map<string, number | string> = new Map();

  public setCell(coord: string, val: number | string): void {
    this.cells.set(coord.toUpperCase(), val);
  }

  public getCell(coord: string): number | string {
    return this.cells.get(coord.toUpperCase()) ?? 0;
  }
        
}

export const EngineXLGridEngineInstance = new EngineXLGridEngine();

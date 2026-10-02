/**
 * Scientific Visuals Engine R Palette Distribution & Histograms Core Module
 * Color palette frequency distributions and pixel luminosity histograms.
 */



export class VisualsRPaletteAnalyzer {

  public computeLuminosity(r: number, g: number, b: number): number {
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }
        
}

export const VisualsRPaletteAnalyzerInstance = new VisualsRPaletteAnalyzer();

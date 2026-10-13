/**
 * Scientific Visuals Engine XML SVG Sprite Sheet Parser Core Module
 * SVG path parsing and sprite coordinate manifest extraction.
 */



export class VisualsXMLSpriteParser {

  public parseSVGViewBox(svg: string): { width: number; height: number } {
    const match = /viewBox="[0-9.]+\s+[0-9.]+\s+([0-9.]+)\s+([0-9.]+)"/.exec(svg);
    return {
      width: match ? parseFloat(match[1]) : 800,
      height: match ? parseFloat(match[2]) : 600,
    };
  }
        
}

export const VisualsXMLSpriteParserInstance = new VisualsXMLSpriteParser();

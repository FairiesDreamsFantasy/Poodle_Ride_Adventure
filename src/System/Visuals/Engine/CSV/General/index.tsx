/**
 * Scientific Visuals Engine CSV Keyframe Animation Parser Core Module
 * Keyframe timeline coordinate sequences (frame, x, y, scale, rotation).
 */



export class VisualsCSVKeyframeParser {

  public parseKeyframes(csv: string): Array<{ frame: number; x: number; y: number; rot: number }> {
    return csv.trim().split("\n").map(l => {
      const [f, x, y, r] = l.split(",");
      return { frame: parseInt(f) || 0, x: parseFloat(x) || 0, y: parseFloat(y) || 0, rot: parseFloat(r) || 0 };
    });
  }
        
}

export const VisualsCSVKeyframeParserInstance = new VisualsCSVKeyframeParser();

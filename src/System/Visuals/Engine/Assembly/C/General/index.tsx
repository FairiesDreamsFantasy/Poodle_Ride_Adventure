/**
 * Scientific Visuals Engine Assembly C Direct Pixel Blitting Core Module
 * Direct 32-bit RGBA pixel manipulation and color channel bit shifts.
 */



export class VisualsAssemblyCBlitter {

  public packRGBA(r: number, g: number, b: number, a: number = 255): number {
    return ((a & 0xff) << 24) | ((b & 0xff) << 16) | ((g & 0xff) << 8) | (r & 0xff);
  }
        
}

export const VisualsAssemblyCBlitterInstance = new VisualsAssemblyCBlitter();

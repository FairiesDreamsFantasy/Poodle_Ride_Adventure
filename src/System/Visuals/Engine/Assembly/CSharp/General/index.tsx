/**
 * Scientific Visuals Engine Assembly CSharp Visual Layout Tree Core Module
 * Visual component layout trees and declarative data-binding coordinates.
 */



export class VisualsAssemblyCSharpLayout {

  public computeBounds(x: number, y: number, w: number, h: number) {
    return { left: x, right: x + w, top: y, bottom: y + h };
  }
        
}

export const VisualsAssemblyCSharpLayoutInstance = new VisualsAssemblyCSharpLayout();

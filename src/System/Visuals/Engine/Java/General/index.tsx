/**
 * Scientific Visuals Engine Java Double-Buffered Render Loop Core Module
 * Double-buffered canvas rendering lifecycle and frame rate pacing.
 */



export class VisualsJavaRenderLoop {

  private isRendering: boolean = false;

  public startLoop(): void {
    this.isRendering = true;
  }

  public stopLoop(): void {
    this.isRendering = false;
  }

  public getStatus(): boolean {
    return this.isRendering;
  }
        
}

export const VisualsJavaRenderLoopInstance = new VisualsJavaRenderLoop();

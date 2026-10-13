import { GameState } from '../InputTypes';

/**
 * DiagnosticManager provides tools for monitoring game performance,
 * validating state integrity, and identifying runtime issues.
 */
export class DiagnosticManager {
  private static logs: string[] = [];
  private static maxLogs = 2000;
  private static frameTimes: number[] = [];
  
  /**
   * Logs a system event with a timestamp.
   */
  static log(message: string, type: 'info' | 'warning' | 'error' | 'movement' | 'collision' | 'graphics' | 'interaction' = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${type.toUpperCase()}] ${message}`;
    this.logs.push(logEntry);
    
    // Keep a large historical buffer
    if (this.logs.length > this.maxLogs) {
       this.logs.shift();
    }
    
    if (type === 'error') console.error(logEntry);
  }

  /**
   * Specialized graphical logging.
   */
  static logGraphics(renderer: string, details: string) {
    this.log(`RENDER [${renderer}]: ${details}`, 'graphics');
  }

  /**
   * Specialized movement logging.
   */
  static logMovement(x: number, y: number, area: string, speed: number) {
    this.log(`Entity moved to (${x.toFixed(2)}, ${y.toFixed(2)}) in ${area} at speed ${speed.toFixed(2)}`, 'movement');
  }

  /**
   * Specialized collision logging.
   */
  static logCollision(x: number, y: number, area: string, wallDesc: string) {
    this.log(`COLLISION at (${x.toFixed(2)}, ${y.toFixed(2)}) in ${area}: ${wallDesc}`, 'collision');
  }

  /**
   * Records a frame duration for FPS calculation.
   */
  static recordFrame(duration: number) {
    this.frameTimes.push(duration);
    if (this.frameTimes.length > 60) this.frameTimes.shift();
  }

  /**
   * Returns current average FPS.
   */
  static getFPS(): number {
    if (this.frameTimes.length === 0) return 0;
    const avg = this.frameTimes.reduce((a, b) => a + b, 0) / this.frameTimes.length;
    return Math.round(1000 / avg);
  }

  /**
   * Validates that the important properties of the game state are within bounds.
   */
  static checkStateIntegrity(state: GameState): { healthy: boolean; issues: string[] } {
    const issues: string[] = [];
    
    if (isNaN(state.gridX) || isNaN(state.gridY)) {
      issues.push("Player coordinates are NaN");
    }
    
    if (state.rotation < 0 || state.rotation >= 360) {
      issues.push("Rotation is outside [0, 360) range");
    }

    return {
      healthy: issues.length === 0,
      issues
    };
  }

  /**
   * Specialized interaction logging.
   */
  static logInteraction(interaction: string, details?: string) {
    this.log(`INTERACTION: ${interaction}${details ? ` - ${details}` : ''}`, 'interaction');
  }

  /**
   * Retrieves the system logs.
   */
  static getLogs(): string[] {
    return [...this.logs];
  }
}

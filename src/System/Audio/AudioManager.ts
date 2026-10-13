/**
 * AudioManager serves as the system-level orchestrator for sound.
 * It manages volume levels and coordinates between the SoundManager and the game loop.
 */
export class AudioManager {
  private static volumes: Record<string, number> = {
    master: 1.0,
    sfx: 0.8,
    music: 0.5,
    speech: 1.0
  };

  /**
   * Adjusts the volume of a specific bus.
   */
  static setVolume(bus: 'master' | 'sfx' | 'music' | 'speech', value: number) {
    this.volumes[bus] = Math.max(0, Math.min(2.0, value));
  }

  static getVolume(bus: 'master' | 'sfx' | 'music' | 'speech'): number {
    return this.volumes[bus] * this.volumes.master;
  }

  /**
   * Helper to determine if a sound should be muffled (e.g. when menu is open).
   */
  static isMuffled(): boolean {
    return false; // To be dynamic based on game state
  }

  /**
   * Plays a UI sound effect.
   */
  static playUISound(soundName: string, audioInstance: any) {
    // This connects to the instantiated SoundManager
    if (audioInstance && typeof audioInstance.play === 'function') {
      audioInstance.play(soundName, this.getVolume('sfx'));
    }
  }
}

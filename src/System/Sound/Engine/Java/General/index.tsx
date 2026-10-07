/**
 * Scientific Sound Engine Java Concurrent Audio Mixer Core Module
 * Priority voice execution queue and synchronized audio mixer thread.
 */



export class SoundJavaMixer {

  private maxPolyphony: number = 32;

  public canAllocateVoice(currentCount: number): boolean {
    return currentCount < this.maxPolyphony;
  }
        
}

export const SoundJavaMixerInstance = new SoundJavaMixer();

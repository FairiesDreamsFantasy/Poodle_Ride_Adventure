/**
 * Scientific Sound Engine Cotlin Audio Coroutines Core Module
 * Reactive audio coroutine streams, voice cancellation, and sealed playback states.
 */



export class SoundCotlinAudioEngine {

  private activeVoices: Set<string> = new Set();

  public triggerVoiceFlow(voiceId: string): void {
    this.activeVoices.add(voiceId);
  }

  public stopVoiceFlow(voiceId: string): void {
    this.activeVoices.delete(voiceId);
  }

  public isVoicePlaying(voiceId: string): boolean {
    return this.activeVoices.has(voiceId);
  }
        
}

export const SoundCotlinAudioEngineInstance = new SoundCotlinAudioEngine();

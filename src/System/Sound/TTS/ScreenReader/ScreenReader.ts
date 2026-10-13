import { GameState } from '../../../InputTypes';
import { TTSLanguage } from '../../../../types';

/**
 * ScreenReader system for coordinating announcements and speech.
 * Centralized inside System/Sound/TTS/ScreenReader to eliminate scattering and ensure consistent accessibility.
 */
export class ScreenReader {
  private static lastAnnouncement: string = "";
  private static lastAnnouncementTime: number = 0;

  /**
   * Dispatches an announcement to the ARIA live region and/or TTS.
   * @param text The text to announce.
   * @param speakFn The primary speech function (usually from props).
   * @param announceFn The ARIA announcement function.
   * @param options Configuration for timing, priority, and voice variant.
   */
  static announce(
    text: string, 
    speakFn: (t: string, l: string) => void,
    announceFn: (t: string) => void,
    options: { force?: boolean; lang?: TTSLanguage | string; priority?: 'polite' | 'assertive' } = {}
  ) {
    const now = Date.now();
    const isDuplicate = text === this.lastAnnouncement && now - this.lastAnnouncementTime < 1000;

    if (options.force || !isDuplicate) {
      this.lastAnnouncement = text;
      this.lastAnnouncementTime = now;

      // Primary Speech (TTS) - defaults to English RP Female Announcer
      speakFn(text, options.lang || 'EN_En-RP');
      
      // Screen Reader (Visual/Accessibility Layer)
      announceFn(text);
    }
  }

  /**
   * Helper to describe the current state for blind players.
   */
  static describeEnvironment(gameState: GameState, announceFn: (t: string) => void) {
    const msg = `You are at ${gameState.area || 'Foyer'}. Rotation is ${Math.round(gameState.rotation)} degrees.`;
    announceFn(msg);
  }
}

import { ITTSEngine } from "../types";
import { getLanguageConfig, DEFAULT_ANNOUNCER_CONFIG } from "../Languages";
import { ChromeVoiceEngine } from "../Chrome/ChromeVoiceEngine";
import { FirefoxVoiceEngine } from "../Firefox/FirefoxVoiceEngine";

/**
 * NativeTTSEngine uses the browser's built-in SpeechSynthesis API.
 * Defaults the female announcer voice to English Received Pronunciation (EN_En-RP).
 */
export class NativeTTSEngine implements ITTSEngine {
  private synth: SpeechSynthesis;

  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null as any;
  }

  isAvailable(): boolean {
    return !!this.synth;
  }

  async speak(text: string, language: string = 'EN_En-RP'): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isAvailable()) {
        reject(new Error("SpeechSynthesis not available"));
        return;
      }

      // Stop current speech to prevent overlapping
      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);
      const config = getLanguageConfig(language || 'EN_En-RP');
      
      utterance.lang = config.lang;
      utterance.pitch = config.pitch;
      utterance.rate = config.rate;
      
      const isFirefox = typeof navigator !== 'undefined' && /firefox/i.test(navigator.userAgent);
      const isChrome = typeof navigator !== 'undefined' && /chrome|chromium|crios/i.test(navigator.userAgent) && !/edge|edg/i.test(navigator.userAgent);

      if (isFirefox) {
        FirefoxVoiceEngine.selectBestFirefoxVoice(utterance, language);
      } else if (isChrome) {
        ChromeVoiceEngine.selectBestChromeVoice(utterance, language);
      } else {
        // Universal voice selection
        const voices = this.synth.getVoices();
        let voice: SpeechSynthesisVoice | undefined;

        if (config.preferredVoices && config.preferredVoices.length > 0) {
          for (const prefName of config.preferredVoices) {
            voice = voices.find(v => v.name.includes(prefName));
            if (voice) break;
          }
        }

        if (!voice && config.voiceName) {
          voice = voices.find(v => v.name.includes(config.voiceName!));
        }

        if (!voice) {
          voice = voices.find(v => v.lang === config.lang || v.lang.startsWith(config.lang.substring(0, 2)));
        }

        if (voice) {
          utterance.voice = voice;
        }
      }

      utterance.onstart = () => {};
      utterance.onend = () => resolve();
      utterance.onerror = (event: any) => {
        // Resolve on normal interrupts to prevent blocking
        resolve();
      };

      this.synth.speak(utterance);
    });
  }

  stop(): void {
    if (this.isAvailable()) {
      this.synth.cancel();
    }
  }
}

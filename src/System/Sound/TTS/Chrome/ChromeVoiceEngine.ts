import {
  enUsConfig,
  enRastafariConfig,
  enJpUkConfig,
  enJpUsConfig,
  japaneseConfig,
  enRpConfig,
  femaleRPConfig
} from "../Languages";

export interface ChromeVoicePreset {
  lang: string;
  rate: number;
  pitch: number;
  preferredVoices: string[];
}

/**
 * ChromeVoiceEngine - Handles specialized voice tuning, rate, and pitch corrections
 * specifically for Chrome (Chromium-based) browsers. Chrome supports high-quality
 * cloud-based natural voices which are loaded asynchronously.
 */
export class ChromeVoiceEngine {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;

  /**
   * Waits for the browser to asynchronously load Chrome's built-in voices.
   */
  public static async waitForVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
      if (!this.synth) {
        resolve([]);
        return;
      }

      const voices = this.synth.getVoices();
      if (voices.length > 0) {
        resolve(voices);
        return;
      }

      const onVoicesChanged = () => {
        const updatedVoices = this.synth!.getVoices();
        if (updatedVoices.length > 0) {
          this.synth!.onvoiceschanged = null;
          resolve(updatedVoices);
        }
      };

      this.synth.onvoiceschanged = onVoicesChanged;
      setTimeout(() => {
        if (this.synth!.onvoiceschanged === onVoicesChanged) {
          this.synth!.onvoiceschanged = null;
          resolve(this.synth!.getVoices());
        }
      }, 500);
    });
  }

  /**
   * Retrieves specific voice config maps tuned for the Chrome browser.
   * Defaults to English RP Female Announcer.
   */
  public static getChromePreset(language: string = 'EN_En-RP'): ChromeVoicePreset {
    let baseConfig = femaleRPConfig;
    let preferredVoices: string[] = femaleRPConfig.preferredVoices || ["Google UK English Female", "Microsoft Hazel Desktop", "Serena", "Victoria", "Samantha"];

    switch (language) {
      case 'EN_En-RP':
        baseConfig = enRpConfig;
        preferredVoices = ["Google UK English Female", "Microsoft Hazel Desktop", "Serena", "Victoria", "Samantha", "English United Kingdom"];
        break;
      case 'EN_US':
        baseConfig = enUsConfig;
        preferredVoices = ["Google US English", "Microsoft Zira Desktop", "Samantha", "Victoria", "English United States"];
        break;
      case 'En_Rastafari':
        baseConfig = enRastafariConfig;
        preferredVoices = ["Google UK English Female", "Microsoft Hazel Desktop", "Serena", "Samantha", "English United Kingdom"];
        break;
      case 'En_JP_UK':
        baseConfig = enJpUkConfig;
        preferredVoices = ["Google UK English Female", "Microsoft Hazel Desktop", "Serena", "Victoria", "English United Kingdom"];
        break;
      case 'En_JP_US':
        baseConfig = enJpUsConfig;
        preferredVoices = ["Google US English", "Microsoft Zira Desktop", "Samantha", "Victoria", "English United States"];
        break;
      case 'Japanese':
        baseConfig = japaneseConfig;
        preferredVoices = ["Google 日本語", "Microsoft Haruka Desktop", "Kyoko", "Japanese"];
        break;
    }

    return {
      lang: baseConfig.lang,
      rate: Math.min(baseConfig.rate * 1.05, 1.4),
      pitch: baseConfig.pitch,
      preferredVoices
    };
  }

  /**
   * Fine-tunes and assigns the highest quality available Chrome voice to an utterance,
   * strictly prioritizing female announcer voices.
   */
  public static selectBestChromeVoice(utterance: SpeechSynthesisUtterance, language: string = 'EN_En-RP'): void {
    if (!this.synth) return;

    const voices = this.synth.getVoices();
    const preset = this.getChromePreset(language);

    utterance.lang = preset.lang;
    utterance.rate = preset.rate;
    utterance.pitch = preset.pitch;

    // 1. Check explicit preferred voice list in order
    for (const name of preset.preferredVoices) {
      const match = voices.find(v => v.name.includes(name) && v.lang.startsWith(preset.lang.substring(0, 2)));
      if (match) {
        utterance.voice = match;
        return;
      }
    }

    // 2. Female voice keywords search within the language family
    const femaleKeywords = ['female', 'hazel', 'serena', 'victoria', 'samantha', 'zira', 'catherine', 'susan', 'emma', 'amy', 'libby', 'sonia', 'haruka', 'kyoko', 'eva', 'jenny', 'aria'];
    const matchingLangVoices = voices.filter(v => v.lang === preset.lang || v.lang.startsWith(preset.lang.substring(0, 2)));
    
    const femaleMatch = matchingLangVoices.find(v => {
      const lower = v.name.toLowerCase();
      return femaleKeywords.some(k => lower.includes(k));
    });

    if (femaleMatch) {
      utterance.voice = femaleMatch;
      return;
    }

    // 3. Fallback to first matching language voice
    if (matchingLangVoices.length > 0) {
      utterance.voice = matchingLangVoices[0];
    }
  }
}

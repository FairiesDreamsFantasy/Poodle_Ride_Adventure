import {
  enUsConfig,
  enRastafariConfig,
  enJpUkConfig,
  enJpUsConfig,
  japaneseConfig,
  enRpConfig,
  femaleRPConfig
} from "../Languages";

export interface FirefoxVoicePreset {
  lang: string;
  rate: number;
  pitch: number;
  preferredVoices: string[];
}

/**
 * FirefoxVoiceEngine - Handles specialized voice tuning, rate, and pitch corrections
 * specifically for Firefox browsers.
 */
export class FirefoxVoiceEngine {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;

  /**
   * Retrieves specific voice config maps tuned specifically for Firefox's native speed curve.
   * Defaults to English RP Female Announcer.
   */
  public static getFirefoxPreset(language: string = 'EN_En-RP'): FirefoxVoicePreset {
    let baseConfig = femaleRPConfig;
    let preferredVoices: string[] = femaleRPConfig.preferredVoices || ["Microsoft Hazel", "Serena", "Victoria", "Samantha", "English United Kingdom"];

    switch (language) {
      case 'EN_En-RP':
        baseConfig = enRpConfig;
        preferredVoices = ["Microsoft Hazel", "Serena", "Victoria", "Samantha", "Google UK English Female", "Microsoft Zira", "English United Kingdom"];
        break;
      case 'EN_US':
        baseConfig = enUsConfig;
        preferredVoices = ["Microsoft Zira", "Samantha", "Victoria", "Google US English", "English United States"];
        break;
      case 'En_Rastafari':
        baseConfig = enRastafariConfig;
        preferredVoices = ["Microsoft Hazel", "Serena", "Samantha", "Microsoft Zira", "English United Kingdom"];
        break;
      case 'En_JP_UK':
        baseConfig = enJpUkConfig;
        preferredVoices = ["Microsoft Hazel", "Serena", "Victoria", "English United Kingdom"];
        break;
      case 'En_JP_US':
        baseConfig = enJpUsConfig;
        preferredVoices = ["Microsoft Zira", "Samantha", "Victoria", "English United States"];
        break;
      case 'Japanese':
        baseConfig = japaneseConfig;
        preferredVoices = ["Microsoft Haruka", "Kyoko", "Google 日本語", "Japanese"];
        break;
    }

    return {
      lang: baseConfig.lang,
      rate: Math.max(0.85, Math.min(baseConfig.rate * 0.95, 1.25)),
      pitch: Math.max(0.8, Math.min(baseConfig.pitch, 1.2)),
      preferredVoices
    };
  }

  /**
   * Fine-tunes and assigns the highest quality local system voice on Firefox to an utterance,
   * strictly prioritizing female announcer voices.
   */
  public static selectBestFirefoxVoice(utterance: SpeechSynthesisUtterance, language: string = 'EN_En-RP'): void {
    if (!this.synth) return;

    const voices = this.synth.getVoices();
    const preset = this.getFirefoxPreset(language);

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

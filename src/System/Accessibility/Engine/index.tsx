// Accessibility Engine Architecture
// Centralizes TTS narration, high-contrast visual filters, keyboard focus assist, and descriptive speech flags

export interface AccessibilitySettings {
  ttsMode: 'ON' | 'ON_LOCAL' | 'OFF';
  speechRate: number;
  speechPitch: number;
  highContrast: boolean;
  largeText: boolean;
  screenReaderDescriptions: {
    petting: boolean;
    collarGrasp: boolean;
    leaningForward: boolean;
    loveLogic: boolean;
    doorways: boolean;
  };
}

export const defaultAccessibilitySettings: AccessibilitySettings = {
  ttsMode: 'ON',
  speechRate: 1.0,
  speechPitch: 1.0,
  highContrast: false,
  largeText: false,
  screenReaderDescriptions: {
    petting: true,
    collarGrasp: true,
    leaningForward: true,
    loveLogic: true,
    doorways: true,
  },
};

class AccessibilityEngineClass {
  private settings: AccessibilitySettings = { ...defaultAccessibilitySettings };

  public getSettings(): AccessibilitySettings {
    return { ...this.settings };
  }

  public updateSettings(partial: Partial<AccessibilitySettings>): void {
    this.settings = { ...this.settings, ...partial };
  }

  public speak(text: string, category?: keyof AccessibilitySettings['screenReaderDescriptions']): void {
    if (this.settings.ttsMode === 'OFF') return;
    if (category && !this.settings.screenReaderDescriptions[category]) return;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = this.settings.speechRate;
      utterance.pitch = this.settings.speechPitch;
      window.speechSynthesis.speak(utterance);
    }
  }
}

export const AccessibilityEngine = new AccessibilityEngineClass();
export default AccessibilityEngine;

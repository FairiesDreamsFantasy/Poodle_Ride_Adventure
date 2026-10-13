import { ITTSEngine } from "../types";
import { NativeTTSEngine } from "../Native/NativeTTSEngine";
import { GeminiTTSEngine } from "../Gemini/GeminiTTSEngine";

/**
 * TTSManager handles switching between different TTS engines (Native, Gemini).
 * Defaults speech language to 'EN_En-RP' (English Received Pronunciation Female Announcer).
 */
export class TTSManager {
  private ctx: AudioContext;
  private ttsGain: GainNode;
  private nativeEngine: NativeTTSEngine;
  private geminiEngine: GeminiTTSEngine;
  private currentEngine: ITTSEngine;

  constructor(ctx: AudioContext, ttsGain: GainNode) {
    this.ctx = ctx;
    this.ttsGain = ttsGain;
    this.nativeEngine = new NativeTTSEngine();
    this.geminiEngine = new GeminiTTSEngine(ctx, ttsGain);
    this.currentEngine = this.nativeEngine; // Default to native
  }

  setEngine(type: 'native' | 'gemini') {
    if (type === 'gemini' && this.geminiEngine.isAvailable()) {
      this.currentEngine = this.geminiEngine;
    } else {
      this.currentEngine = this.nativeEngine;
    }
  }

  async speak(text: string, language: string = 'EN_En-RP'): Promise<void> {
    try {
      await this.currentEngine.speak(text, language || 'EN_En-RP');
    } catch (e) {
      console.error("TTSManager: speak failed", e);
      if (this.currentEngine === this.geminiEngine) {
        await this.nativeEngine.speak(text, language || 'EN_En-RP');
      }
    }
  }

  stop(): void {
    this.currentEngine.stop();
  }
}

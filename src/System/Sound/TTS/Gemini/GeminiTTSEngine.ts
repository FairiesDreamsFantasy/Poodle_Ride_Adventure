import { Modality } from "@google/genai";
import { ITTSEngine } from "../types";
import { ai, isGeminiAvailable, GEMINI_MODEL_TTS, AISafetyFilter } from "../../../AI/External";

/**
 * GeminiTTSEngine uses the cloud-based Gemini API for high-quality speech.
 * This is "network-dependent" but provides superior quality.
 */
export class GeminiTTSEngine implements ITTSEngine {
  private ctx: AudioContext;
  private ttsGain: GainNode;

  private currentSource: AudioBufferSourceNode | null = null;

  constructor(ctx: AudioContext, ttsGain: GainNode) {
    this.ctx = ctx;
    this.ttsGain = ttsGain;
  }

  isAvailable(): boolean {
    return isGeminiAvailable;
  }

  async speak(text: string, language: string): Promise<void> {
    if (!this.isAvailable() || !ai) {
      throw new Error("Gemini API key not found");
    }

    this.stop();

    // Check prompt safety before initiating network/TTS generation
    const safetyCheck = AISafetyFilter.evaluate(text);
    if (!safetyCheck.safe) {
      console.warn(`[TTS SAFETY BLOCKED] Category: ${safetyCheck.category}. Reason: ${safetyCheck.reason}`);
      text = `This request has been filtered under Zion category regulations. Category: ${safetyCheck.category}.`;
    }

    let accentPrompt = "";

    let voiceName = "Kore"; // Default female voice

    if (language.includes("Japanese")) {
      accentPrompt = "with a Japanese accent (English JP)";
    } else if (language.includes("Rastafarian")) {
      accentPrompt = "with a Rastafarian accent";
    } else {
      accentPrompt = "with a US accent";
    }

    console.log(`GeminiTTSEngine: Speaking "${text.substring(0, 20)}..." in ${language}`);
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL_TTS,
      contents: [{ parts: [{ text: `Say in a friendly, descriptive female voice ${accentPrompt}: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      console.log(`GeminiTTSEngine: Received audio data, decoding...`);
      const audioData = Uint8Array.from(atob(base64Audio), c => c.charCodeAt(0)).buffer;
      let buffer: AudioBuffer;
      try {
        buffer = await this.ctx.decodeAudioData(audioData);
      } catch (e) {
        console.warn("GeminiTTSEngine: decodeAudioData failed, attempting raw PCM parsing (24kHz, 16-bit)...", e);
        // Fallback: Assume raw 16-bit PCM at 24kHz
        const int16Data = new Int16Array(audioData);
        const float32Data = new Float32Array(int16Data.length);
        for (let i = 0; i < int16Data.length; i++) {
          float32Data[i] = int16Data[i] / 32768.0;
        }
        buffer = this.ctx.createBuffer(1, float32Data.length, 24000);
        buffer.copyToChannel(float32Data, 0);
      }
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(this.ttsGain);
      this.currentSource = source;
      
      console.log(`GeminiTTSEngine: Speech started`);
      source.start();
      
      // Wait for audio to finish
      return new Promise((resolve) => {
        source.onended = () => {
          console.log(`GeminiTTSEngine: Speech ended`);
          if (this.currentSource === source) this.currentSource = null;
          resolve();
        };
      });
    } else {
      console.error("GeminiTTSEngine: No audio data in response");
      throw new Error("No audio data in response");
    }
  }

  stop(): void {
    if (this.currentSource) {
      try {
        this.currentSource.stop();
      } catch (e) {
        // Already stopped
      }
      this.currentSource = null;
    }
  }
}

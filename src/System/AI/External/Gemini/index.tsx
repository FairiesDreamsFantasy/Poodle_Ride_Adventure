import { GoogleGenAI } from "@google/genai";
import { AISafetyFilter } from "./Safety";

export * from "./General";
export * from "./Safety";
export * from "./Components";
export * from "./Arena";

/**
 * GeminiService handles AI-powered interactions for the Poodle Ride Adventure.
 * This can be used for dynamic area descriptions, character dialogues, or smart hints.
 */
export class GeminiService {
  private static ai: GoogleGenAI | null = null;

  static initialize() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.ai = new GoogleGenAI({ apiKey });
    }
  }

  /**
   * Generates a descriptive expansion for a scene based on game state.
   */
  static async generateDescription(context: string): Promise<string> {
    // Run safety checks prior to firing any generation request
    const safetyCheck = AISafetyFilter.evaluate(context);
    if (!safetyCheck.safe) {
      console.warn(`[AI SAFETY INTRUSION BLOCKED] Category: ${safetyCheck.category}. Reason: ${safetyCheck.reason}`);
      return `[Zion Safeguard] Request filtered due to category safety regulations (${safetyCheck.category}).`;
    }

    if (!this.ai) return "AI System is initializing...";

    try {
      const prompt = `You are a storyteller for the "Poodle Ride Adventure". 
      Describe the following scene with high artistic craftsmanship: ${context}`;
      
      const result = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });
      
      let finalResponse = result.text || "A mysterious fog obscures the details...";
      if (safetyCheck.disclaimer) {
        finalResponse = `${safetyCheck.disclaimer}\n\n[Description]: ${finalResponse}`;
      }
      return finalResponse;
    } catch (error) {
      console.error("AI Generation failed:", error);
      return "The air feels thick with mystery...";
    }
  }
}

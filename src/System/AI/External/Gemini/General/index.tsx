import { GoogleGenAI } from "@google/genai";
import { AISafetyFilter } from "../Safety";

const apiKey = typeof process !== 'undefined' && process.env ? process.env.GEMINI_API_KEY : undefined;

export const ai: GoogleGenAI | null = apiKey ? new GoogleGenAI({ apiKey }) : null;
export const isGeminiAvailable = !!apiKey;
export const GEMINI_MODEL_TTS = "gemini-2.5-flash-preview-tts";

export const generateGameDialogue = async (prompt: string) => {
  // Pre-validate inputs to protect against abusive prompts and resource degradation
  const safetyCheck = AISafetyFilter.evaluate(prompt);
  if (!safetyCheck.safe) {
    console.warn(`[AI SAFETY INTRUSION BLOCKED] Category: ${safetyCheck.category}. Reason: ${safetyCheck.reason}`);
    return `[Zion Safeguard Alert] Conversation blocked due to safety guidelines (${safetyCheck.category}).`;
  }

  if (!ai) {
    return null;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    
    let resultText = response.text || "";
    if (safetyCheck.disclaimer && resultText) {
      resultText = `${safetyCheck.disclaimer}\n\n[Dialogue]: ${resultText}`;
    }
    return resultText;
  } catch (error) {
    console.error("Error generating dialogue:", error);
    return null;
  }
};

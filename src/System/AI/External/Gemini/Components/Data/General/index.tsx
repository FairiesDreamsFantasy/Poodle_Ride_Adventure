/**
 * System/AI/External/Gemini/Components/Data/General/index.tsx
 * Gemini AI Component Data definitions.
 */

export interface GeminiComponentData {
  id: string;
  type: string;
  source: 'AI_Generated';
  timestamp: number;
}

export const DEFAULT_GEMINI_COMPONENT_DATA: GeminiComponentData = {
  id: 'gemini-comp-001',
  type: 'Generic_Component',
  source: 'AI_Generated',
  timestamp: Date.now(),
};

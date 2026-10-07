/**
 * System/AI/External/Gemini/Components/Characters/_Wildcard_/Data/index.tsx
 * Wildcard character dynamic AI data definitions.
 */

export interface WildcardCharacterData {
  wildcardTag: string;
  dynamicPrompt: string;
}

export const DEFAULT_WILDCARD_CHAR_DATA: WildcardCharacterData = {
  wildcardTag: 'wildcard-npc',
  dynamicPrompt: 'Generate unique NPC character parameters',
};

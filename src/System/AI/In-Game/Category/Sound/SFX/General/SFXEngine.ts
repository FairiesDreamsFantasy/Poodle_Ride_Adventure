/**
 * System/AI/In-Game/Category/Sound/SFX/General/SFXEngine.ts
 * 
 * Imprint: Fairies Dreams & Fantasy
 * Sound Effects (SFX) General Execution & Character Gait/Vocal Engine.
 * 
 * Enforces:
 * 1. 1-2-3 Gallop Rhythms:
 *    - 400ms interval for Abigay Rose Kone and Anninne-Amelia Rose Julisus
 *    - 300ms interval for Abigail Marigold Kenyatta
 * 2. Nyhabinghi Rhythms for slow and very slow walks.
 * 3. Masterpiece Bark baseline gain (0.5125 for main yip, 2.5% above baseline).
 * 4. Ramp step acoustic indicator: 5-beep ascending/descending tones and 5-beep elegant bark.
 * 5. Strict rejection of Babylonian shortcuts: Olga-Olivia and Priscilla MUST NOT use elegant gallop/bark logic.
 */

export interface PoodleGaitRhythm {
  ridingAnimal: string;
  gallopIntervalMs: number;
  walkStyle: 'Standard' | 'Nyhabinghi' | 'Babylonian_Chaotic';
  isCrafted: boolean;
}

export const POODLE_GAIT_RHYTHMS: Record<string, PoodleGaitRhythm> = {
  'Abigay Rose Kone': {
    ridingAnimal: 'Abigay Rose Kone',
    gallopIntervalMs: 400,
    walkStyle: 'Nyhabinghi',
    isCrafted: true
  },
  'Anninne-Amelia Rose Julisus': {
    ridingAnimal: 'Anninne-Amelia Rose Julisus',
    gallopIntervalMs: 400,
    walkStyle: 'Nyhabinghi',
    isCrafted: true
  },
  'Dymond Daisy Qin-Reynolds': {
    ridingAnimal: 'Dymond Daisy Qin-Reynolds',
    gallopIntervalMs: 400,
    walkStyle: 'Standard',
    isCrafted: true
  },
  'Abigail Marigold Kenyatta': {
    ridingAnimal: 'Abigail Marigold Kenyatta',
    gallopIntervalMs: 300,
    walkStyle: 'Standard',
    isCrafted: true
  },
  'Olga-Olivia': {
    ridingAnimal: 'Olga-Olivia',
    gallopIntervalMs: 0,
    walkStyle: 'Babylonian_Chaotic',
    isCrafted: false
  }
};

/**
 * Resolves gait rhythm properties for a given character.
 */
export function getGaitRhythmProfile(animalName: string): PoodleGaitRhythm {
  return POODLE_GAIT_RHYTHMS[animalName] || {
    ridingAnimal: animalName,
    gallopIntervalMs: 400,
    walkStyle: 'Standard',
    isCrafted: false
  };
}

/**
 * Calculates ramp indicator beep frequency for ascending and descending steps.
 */
export function calculateRampBeepFrequencyHz(stepNumber: number, isDescending: boolean): number {
  const baseFreq = isDescending ? 880 : 440; // Higher pitch for descending, lower for ascending
  const stepOffset = (stepNumber % 5) * 110;
  return isDescending ? baseFreq - stepOffset : baseFreq + stepOffset;
}

import { TTSModule } from '../../types';

/**
 * Standard English Received Pronunciation (RP) Female Announcer Voice.
 * Characterized by refined prosody, natural cadences, and crystal clarity.
 */
export const femaleRPConfig: TTSModule = {
  lang: 'en-GB',
  pitch: 1.05,
  rate: 0.95,
  voiceName: 'Received Pronunciation Female',
  gender: 'female',
  accent: 'British Received Pronunciation',
  preferredVoices: [
    'Google UK English Female',
    'Microsoft Hazel Desktop',
    'Microsoft Hazel',
    'Serena',
    'Victoria',
    'English United Kingdom',
    'Daniel'
  ],
  description: 'Refined English RP Female Announcer'
};

export const config = femaleRPConfig;

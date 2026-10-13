import { TTSModule, LanguageVariant } from '../types';

export const config: TTSModule = {
  lang: 'en-GB', // Use UK as base for Rastafari
  pitch: 0.8,
  rate: 0.9,
  voiceName: 'Rastafari',
  accent: 'Rastafari / Jamaican English',
  preferredVoices: [
    'Google UK English Female',
    'Google UK English Male',
    'Microsoft Hazel Desktop',
    'English United Kingdom'
  ],
  description: 'Rastafari cadence and resonance'
};

export const En_Rastafari_Variant: LanguageVariant = {
  id: 'En_Rastafari',
  name: 'English (Rastafari Dialect)',
  defaultConfig: config,
  voices: {
    female: config,
    male: config,
    standard: config
  }
};

import { TTSModule, LanguageVariant } from '../types';

export const config: TTSModule = {
  lang: 'ja-JP',
  pitch: 1.0,
  rate: 1.0,
  voiceName: 'Japanese',
  preferredVoices: [
    'Google 日本語',
    'Microsoft Ichiro',
    'Microsoft Haruka Desktop',
    'Kyoko'
  ],
  description: 'Native Japanese Speech'
};

export const Japanese_Variant: LanguageVariant = {
  id: 'Japanese',
  name: 'Japanese (日本語)',
  defaultConfig: config,
  voices: {
    female: config,
    male: config,
    standard: config
  }
};

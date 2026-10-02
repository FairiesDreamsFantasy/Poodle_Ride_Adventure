import { TTSModule } from '../../types';

export const femaleUSConfig: TTSModule = {
  lang: 'en-US',
  pitch: 1.05,
  rate: 1.0,
  voiceName: 'US English Female',
  gender: 'female',
  accent: 'General American',
  preferredVoices: [
    'Google US English',
    'Microsoft Zira Desktop',
    'Samantha',
    'Victoria',
    'English United States'
  ],
  description: 'General American Female Voice'
};

export const config = femaleUSConfig;

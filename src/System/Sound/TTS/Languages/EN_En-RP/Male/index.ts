import { TTSModule } from '../../types';

export const maleRPConfig: TTSModule = {
  lang: 'en-GB',
  pitch: 0.95,
  rate: 0.95,
  voiceName: 'Received Pronunciation Male',
  gender: 'male',
  accent: 'British Received Pronunciation',
  preferredVoices: [
    'Google UK English Male',
    'Microsoft George Desktop',
    'Microsoft Jonathon',
    'Daniel',
    'Oliver'
  ],
  description: 'Refined English RP Male Voice'
};

export const config = maleRPConfig;

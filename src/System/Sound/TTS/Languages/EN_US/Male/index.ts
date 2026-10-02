import { TTSModule } from '../../types';

export const maleUSConfig: TTSModule = {
  lang: 'en-US',
  pitch: 0.95,
  rate: 1.0,
  voiceName: 'US English Male',
  gender: 'male',
  accent: 'General American',
  preferredVoices: [
    'Microsoft David Desktop',
    'Google US English',
    'Alex',
    'Fred'
  ],
  description: 'General American Male Voice'
};

export const config = maleUSConfig;

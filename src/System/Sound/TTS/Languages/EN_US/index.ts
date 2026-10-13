import { TTSModule, LanguageVariant } from '../types';
import { femaleUSConfig } from './Female';
import { maleUSConfig } from './Male';

export * from './Female';
export * from './Male';

export const config: TTSModule = {
  lang: 'en-US',
  pitch: 1,
  rate: 1,
  preferredVoices: femaleUSConfig.preferredVoices
};

export const EN_US_Variant: LanguageVariant = {
  id: 'EN_US',
  name: 'English (United States)',
  defaultConfig: config,
  voices: {
    female: femaleUSConfig,
    male: maleUSConfig,
    standard: config
  }
};

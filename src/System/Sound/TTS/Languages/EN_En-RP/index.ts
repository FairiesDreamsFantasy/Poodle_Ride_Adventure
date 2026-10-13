import { TTSModule, LanguageVariant } from '../types';
import { femaleRPConfig } from './Female';
import { maleRPConfig } from './Male';

export * from './Female';
export * from './Male';

export const config: TTSModule = femaleRPConfig;

export const EN_En_RP_Variant: LanguageVariant = {
  id: 'EN_En-RP',
  name: 'English (Received Pronunciation - Female Announcer)',
  defaultConfig: femaleRPConfig,
  voices: {
    female: femaleRPConfig,
    male: maleRPConfig,
    standard: femaleRPConfig
  }
};

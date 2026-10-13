import { TTSModule, LanguageVariant } from '../types';
import { config as ukConfig } from './UK';
import { config as usConfig } from './US';

export { ukConfig, usConfig };
export const config: TTSModule = ukConfig;

export const En_JP_Variant: LanguageVariant = {
  id: 'En_JP',
  name: 'English (Japanese Inflection)',
  defaultConfig: ukConfig,
  voices: {
    female: ukConfig,
    male: usConfig,
    standard: ukConfig
  }
};

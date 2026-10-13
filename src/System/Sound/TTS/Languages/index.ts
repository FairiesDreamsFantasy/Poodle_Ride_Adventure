import { TTSModule, LanguageVariant } from './types';
import { config as enRpConfig, EN_En_RP_Variant, femaleRPConfig, maleRPConfig } from './EN_En-RP';
import { config as enUsConfig, EN_US_Variant, femaleUSConfig, maleUSConfig } from './EN_US';
import { config as enJpUkConfig } from './En_JP/UK';
import { config as enJpUsConfig } from './En_JP/US';
import { config as enRastafariConfig, En_Rastafari_Variant } from './En_Rastafari';
import { config as japaneseConfig, Japanese_Variant } from './Japanese';

export * from './types';
export {
  enRpConfig,
  femaleRPConfig,
  maleRPConfig,
  enUsConfig,
  femaleUSConfig,
  maleUSConfig,
  enJpUkConfig,
  enJpUsConfig,
  enRastafariConfig,
  japaneseConfig,
  EN_En_RP_Variant,
  EN_US_Variant,
  En_Rastafari_Variant,
  Japanese_Variant
};

export * as EN_En_RP from './EN_En-RP';
export * as EN_US from './EN_US';
export * as En_JP from './En_JP';
export * as En_Rastafari from './En_Rastafari';
export * as Japanese from './Japanese';

export const LANGUAGE_REGISTRY: Record<string, TTSModule> = {
  'EN_En-RP': enRpConfig,
  'EN_US': enUsConfig,
  'En_JP_UK': enJpUkConfig,
  'En_JP_US': enJpUsConfig,
  'En_Rastafari': enRastafariConfig,
  'Japanese': japaneseConfig,
};

export const LANGUAGE_VARIANTS: Record<string, LanguageVariant> = {
  'EN_En-RP': EN_En_RP_Variant,
  'EN_US': EN_US_Variant,
  'En_Rastafari': En_Rastafari_Variant,
  'Japanese': Japanese_Variant,
};

/**
 * Standard default female announcer configuration: English RP (Received Pronunciation)
 */
export const DEFAULT_ANNOUNCER_CONFIG: TTSModule = femaleRPConfig;

export const getLanguageConfig = (lang: string = 'EN_En-RP'): TTSModule => {
  return LANGUAGE_REGISTRY[lang] || DEFAULT_ANNOUNCER_CONFIG;
};

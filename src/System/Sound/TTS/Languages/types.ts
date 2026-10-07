export interface TTSModule {
  lang: string;
  pitch: number;
  rate: number;
  voiceName?: string;
  gender?: 'female' | 'male' | 'neutral';
  accent?: string;
  preferredVoices?: string[];
  description?: string;
}

export interface LanguageVariant {
  id: string;
  name: string;
  defaultConfig: TTSModule;
  voices: {
    female?: TTSModule;
    male?: TTSModule;
    standard?: TTSModule;
  };
}

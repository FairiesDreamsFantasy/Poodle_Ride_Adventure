
export type TTSLanguage = 'EN_US' | 'En_Rastafari' | 'En_JP_UK' | 'En_JP_US' | 'Japanese' | 'EN_En-RP';

export interface TTSConfig {
  pitch: number;
  rate: number;
  volume: number;
  voiceName?: string;
  lang?: string;
}

const configs: Record<TTSLanguage, TTSConfig> = {
  'EN_US': { pitch: 1, rate: 1, volume: 1, lang: 'en-US' },
  'En_Rastafari': { pitch: 0.9, rate: 0.9, volume: 1, lang: 'en-GB' }, // Emulated with UK voice
  'En_JP_UK': { pitch: 1.1, rate: 1, volume: 1, lang: 'en-GB' },
  'En_JP_US': { pitch: 1.1, rate: 1, volume: 1, lang: 'en-US' },
  'Japanese': { pitch: 1, rate: 1, volume: 1, lang: 'ja-JP' },
  'EN_En-RP': { pitch: 1, rate: 0.95, volume: 1, lang: 'en-GB' }
};

export const speak = (text: string, language: TTSLanguage = 'EN_US') => {
  if (!window.speechSynthesis) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const config = configs[language];

  utterance.pitch = config.pitch;
  utterance.rate = config.rate;
  utterance.volume = config.volume;
  if (config.lang) utterance.lang = config.lang;

  // Find a suitable voice if possible
  const voices = window.speechSynthesis.getVoices();
  if (config.voiceName) {
    const voice = voices.find(v => v.name.includes(config.voiceName!));
    if (voice) utterance.voice = voice;
  } else if (config.lang) {
    const voice = voices.find(v => v.lang.startsWith(config.lang!));
    if (voice) utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
};

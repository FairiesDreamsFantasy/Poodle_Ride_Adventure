import { useCallback } from 'react';

export type VoiceLanguage = 'EN_US' | 'EN_GB' | 'JA_JP';

export const useSpeechSynthesis = (isTTSEnabled: boolean) => {
  const speak = useCallback((text: string, lang: VoiceLanguage = 'EN_US') => {
    if (!isTTSEnabled) return;
    
    // Check for browser support
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map internal language codes to BCP 47
    const langMap: Record<VoiceLanguage, string> = {
      'EN_US': 'en-US',
      'EN_GB': 'en-GB',
      'JA_JP': 'ja-JP'
    };
    
    utterance.lang = langMap[lang] || 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0; // Ensure 100% volume

    window.speechSynthesis.speak(utterance);
  }, [isTTSEnabled]);

  return { speak };
};

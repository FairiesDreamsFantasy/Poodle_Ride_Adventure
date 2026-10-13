import { GameState } from '../../../InputTypes';
import { TTSLanguage } from '../../../../types';

export interface ScreenReaderAnnouncementOptions {
  force?: boolean;
  lang?: TTSLanguage | string;
  priority?: 'polite' | 'assertive';
}

export type AnnounceFunction = (text: string) => void;
export type SpeakFunction = (text: string, lang: string) => void;

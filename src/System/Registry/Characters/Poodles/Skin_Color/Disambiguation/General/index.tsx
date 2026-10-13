
import { POODLE_SKIN_COLOR_MAP, PoodleSkinColor } from '../../General';

/**
 * Skin Color Disambiguation Logic
 */
export function getPoodleSkinColor(name: string): PoodleSkinColor | null {
  return POODLE_SKIN_COLOR_MAP[name] || null;
}

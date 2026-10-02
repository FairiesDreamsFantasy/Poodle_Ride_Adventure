
import { POODLE_FUR_COLOR_MAP, PoodleFurColor } from '../../General';

/**
 * Color Disambiguation Logic
 * ZERO-FALLBACK: Returns null if not recognized.
 */
export function getPoodleFurColor(name: string): PoodleFurColor | null {
  return POODLE_FUR_COLOR_MAP[name] || null;
}

export function isFurColorMatch(name: string, color: PoodleFurColor): boolean {
  return getPoodleFurColor(name) === color;
}

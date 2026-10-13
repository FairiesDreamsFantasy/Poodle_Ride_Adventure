
import { POODLE_NOSE_COLOR_MAP } from '../../General';

/**
 * Nose Color Disambiguation Logic
 */
export function getPoodleNoseColor(name: string): string | null {
  return POODLE_NOSE_COLOR_MAP[name] || null;
}

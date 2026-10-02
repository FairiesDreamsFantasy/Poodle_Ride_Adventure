
import { POODLE_FUR_THICKNESS_MAP, FurThickness } from '../../General';

/**
 * Fur Thickness Disambiguation Logic
 */
export function getPoodleFurThickness(name: string): FurThickness | null {
  return POODLE_FUR_THICKNESS_MAP[name] || null;
}

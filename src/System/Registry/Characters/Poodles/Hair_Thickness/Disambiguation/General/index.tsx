
import { POODLE_HAIR_THICKNESS_MAP, HairThickness } from '../../General';

/**
 * Hair Thickness Disambiguation Logic
 */
export function getPoodleHairThickness(name: string): HairThickness | null {
  return POODLE_HAIR_THICKNESS_MAP[name] || null;
}

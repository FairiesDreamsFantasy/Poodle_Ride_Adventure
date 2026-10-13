
import { POODLE_HEIGHT_MAP, HeightMetadata } from '../../General';

/**
 * Height Disambiguation Logic
 */
export function getPoodleHeightMetadata(name: string): HeightMetadata | null {
  return POODLE_HEIGHT_MAP[name] || null;
}

export function getShoulderHeight(name: string): number | null {
  return getPoodleHeightMetadata(name)?.shoulder || null;
}

export function getTotalHeight(name: string): number | null {
  return getPoodleHeightMetadata(name)?.total || null;
}
